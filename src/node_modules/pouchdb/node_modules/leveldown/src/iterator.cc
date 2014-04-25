/* Copyright (c) 2012-2013 LevelDOWN contributors
 * See list at <https://github.com/rvagg/node-leveldown#contributing>
 * MIT +no-false-attribs License <https://github.com/rvagg/node-leveldown/blob/master/LICENSE>
 */

#include <node.h>
#include <node_buffer.h>

#include "database.h"
#include "iterator.h"
#include "iterator_async.h"

namespace leveldown {

static v8::Persistent<v8::FunctionTemplate> iterator_constructor;

Iterator::Iterator (
    Database* database
  , uint32_t id
  , leveldb::Slice* start
  , std::string* end
  , bool reverse
  , bool keys
  , bool values
  , int limit
  , std::string* lt
  , std::string* lte
  , std::string* gt
  , std::string* gte
  , bool fillCache
  , bool keyAsBuffer
  , bool valueAsBuffer
  , v8::Local<v8::Object> &startHandle
) : database(database)
  , id(id)
  , start(start)
  , end(end)
  , reverse(reverse)
  , keys(keys)
  , values(values)
  , limit(limit)
  , lt(lt)
  , lte(lte)
  , gt(gt)
  , gte(gte)
  , keyAsBuffer(keyAsBuffer)
  , valueAsBuffer(valueAsBuffer)
{
  NanScope();

  v8::Local<v8::Object> obj = v8::Object::New();
  if (!startHandle.IsEmpty())
    obj->Set(NanSymbol("start"), startHandle);
  NanAssignPersistent(v8::Object, persistentHandle, obj);

  options    = new leveldb::ReadOptions();
  options->fill_cache = fillCache;
  dbIterator = NULL;
  count      = 0;
  nexting    = false;
  ended      = false;
  endWorker  = NULL;
};

Iterator::~Iterator () {
  delete options;
  if (!persistentHandle.IsEmpty())
    NanDispose(persistentHandle);
  if (start != NULL)
    delete start;
  if (end != NULL)
    delete end;
};

bool Iterator::GetIterator () {
  if (dbIterator == NULL) {
    dbIterator = database->NewIterator(options);

    if (start != NULL) {
      dbIterator->Seek(*start);

      if (reverse) {
        if (!dbIterator->Valid()) {
          // if it's past the last key, step back
          dbIterator->SeekToLast();
        } else {
          std::string key_ = dbIterator->key().ToString();

          if (lt != NULL) {
            if (lt->compare(key_) <= 0)
              dbIterator->Prev();
          } else if (lte != NULL) {
            if (lte->compare(key_) < 0)
              dbIterator->Prev();
          } else if (start != NULL) {
            if (start->compare(key_))
              dbIterator->Prev();
          }
        }

        if (dbIterator->Valid() && lt != NULL) {
          if (lt->compare(dbIterator->key().ToString()) <= 0)
            dbIterator->Prev();
        }
      } else {
        if (dbIterator->Valid() && gt != NULL
            && gt->compare(dbIterator->key().ToString()) == 0)
          dbIterator->Next();
      }
    } else if (reverse) {
      dbIterator->SeekToLast();
    } else {
      dbIterator->SeekToFirst();
    }

    return true;
  }
  return false;
}

bool Iterator::IteratorNext (std::string& key, std::string& value) {
  // if it's not the first call, move to next item.
  if (!GetIterator()) {
    if (reverse)
      dbIterator->Prev();
    else
      dbIterator->Next();
  }

  // now check if this is the end or not, if not then return the key & value
  if (dbIterator->Valid()) {
    std::string key_ = dbIterator->key().ToString();
    int isEnd = end == NULL ? 1 : end->compare(key_);

    if ((limit < 0 || ++count <= limit)
      && (end == NULL
          || (reverse && (isEnd <= 0))
          || (!reverse && (isEnd >= 0)))
      && ( lt  != NULL ? (lt->compare(key_) > 0)
         : lte != NULL ? (lte->compare(key_) >= 0)
         : true )
      && ( gt  != NULL ? (gt->compare(key_) < 0)
         : gte != NULL ? (gte->compare(key_) <= 0)
         : true )
    ) {
      if (keys)
        key.assign(dbIterator->key().data(), dbIterator->key().size());
      if (values)
        value.assign(dbIterator->value().data(), dbIterator->value().size());
      return true;
    }
  }

  return false;
}

leveldb::Status Iterator::IteratorStatus () {
  return dbIterator->status();
}

void Iterator::IteratorEnd () {
  //TODO: could return it->status()
  delete dbIterator;
  dbIterator = NULL;
}

void Iterator::Release () {
  database->ReleaseIterator(id);
}

void checkEndCallback (Iterator* iterator) {
  iterator->nexting = false;
  if (iterator->endWorker != NULL) {
    NanAsyncQueueWorker(iterator->endWorker);
    iterator->endWorker = NULL;
  }
}

NAN_METHOD(Iterator::Next) {
  NanScope();

  Iterator* iterator = node::ObjectWrap::Unwrap<Iterator>(args.This());

  if (args.Length() == 0 || !args[0]->IsFunction())
    return NanThrowError("next() requires a callback argument");

  v8::Local<v8::Function> callback = args[0].As<v8::Function>();

  if (iterator->ended) {
    LD_RETURN_CALLBACK_OR_ERROR(callback, "cannot call next() after end()")
  }

  if (iterator->nexting) {
    LD_RETURN_CALLBACK_OR_ERROR(callback, "cannot call next() before previous next() has completed")
  }

  NextWorker* worker = new NextWorker(
      iterator
    , new NanCallback(callback)
    , checkEndCallback
  );
  // persist to prevent accidental GC
  v8::Local<v8::Object> _this = args.This();
  worker->SavePersistent("iterator", _this);
  iterator->nexting = true;
  NanAsyncQueueWorker(worker);

  NanReturnValue(args.Holder());
}

NAN_METHOD(Iterator::End) {
  NanScope();

  Iterator* iterator = node::ObjectWrap::Unwrap<Iterator>(args.This());

  if (args.Length() == 0 || !args[0]->IsFunction())
    return NanThrowError("end() requires a callback argument");

  v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(args[0]);

  if (iterator->ended) {
    LD_RETURN_CALLBACK_OR_ERROR(callback, "end() already called on iterator")
  }

  EndWorker* worker = new EndWorker(
      iterator
    , new NanCallback(callback)
  );
  // persist to prevent accidental GC
  v8::Local<v8::Object> _this = args.This();
  worker->SavePersistent("iterator", _this);
  iterator->ended = true;

  if (iterator->nexting) {
    // waiting for a next() to return, queue the end
    iterator->endWorker = worker;
  } else {
    NanAsyncQueueWorker(worker);
  }

  NanReturnValue(args.Holder());
}

void Iterator::Init () {
  v8::Local<v8::FunctionTemplate> tpl =
      v8::FunctionTemplate::New(Iterator::New);
  NanAssignPersistent(v8::FunctionTemplate, iterator_constructor, tpl);
  tpl->SetClassName(NanSymbol("Iterator"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  NODE_SET_PROTOTYPE_METHOD(tpl, "next", Iterator::Next);
  NODE_SET_PROTOTYPE_METHOD(tpl, "end", Iterator::End);
}

v8::Local<v8::Object> Iterator::NewInstance (
        v8::Local<v8::Object> database
      , v8::Local<v8::Number> id
      , v8::Local<v8::Object> optionsObj
    ) {

  NanScope();

  v8::Local<v8::Object> instance;
  v8::Local<v8::FunctionTemplate> constructorHandle =
      NanPersistentToLocal(iterator_constructor);

  if (optionsObj.IsEmpty()) {
    v8::Handle<v8::Value> argv[2] = { database, id };
    instance = constructorHandle->GetFunction()->NewInstance(2, argv);
  } else {
    v8::Handle<v8::Value> argv[3] = { database, id, optionsObj };
    instance = constructorHandle->GetFunction()->NewInstance(3, argv);
  }

  return instance;
}

NAN_METHOD(Iterator::New) {
  NanScope();

  Database* database = node::ObjectWrap::Unwrap<Database>(args[0]->ToObject());

  //TODO: remove this, it's only here to make LD_STRING_OR_BUFFER_TO_SLICE happy
  v8::Handle<v8::Function> callback;

  v8::Local<v8::Object> startHandle;
  leveldb::Slice* start = NULL;
  std::string* end = NULL;
  int limit = -1;

  v8::Local<v8::Value> id = args[1];

  v8::Local<v8::Object> optionsObj;

  v8::Local<v8::Object> ltHandle;
  v8::Local<v8::Object> lteHandle;
  v8::Local<v8::Object> gtHandle;
  v8::Local<v8::Object> gteHandle;

  std::string* lt = NULL;
  std::string* lte = NULL;
  std::string* gt = NULL;
  std::string* gte = NULL;

  //default to forward.
  bool reverse = false;

  if (args.Length() > 1 && args[2]->IsObject()) {
    optionsObj = v8::Local<v8::Object>::Cast(args[2]);

    reverse = NanBooleanOptionValue(optionsObj, NanSymbol("reverse"));

    if (optionsObj->Has(NanSymbol("start"))
        && (node::Buffer::HasInstance(optionsObj->Get(NanSymbol("start")))
          || optionsObj->Get(NanSymbol("start"))->IsString())) {

      startHandle = optionsObj->Get(NanSymbol("start")).As<v8::Object>();

      // ignore start if it has size 0 since a Slice can't have length 0
      if (StringOrBufferLength(startHandle) > 0) {
        LD_STRING_OR_BUFFER_TO_SLICE(_start, startHandle, start)
        start = new leveldb::Slice(_start.data(), _start.size());
      }
    }

    if (optionsObj->Has(NanSymbol("end"))
        && (node::Buffer::HasInstance(optionsObj->Get(NanSymbol("end")))
          || optionsObj->Get(NanSymbol("end"))->IsString())) {

      v8::Local<v8::Value> endBuffer =
          NanNewLocal<v8::Value>(optionsObj->Get(NanSymbol("end")));

      // ignore end if it has size 0 since a Slice can't have length 0
      if (StringOrBufferLength(endBuffer) > 0) {
        LD_STRING_OR_BUFFER_TO_SLICE(_end, endBuffer, end)
        end = new std::string(_end.data(), _end.size());
      }
    }

    if (!optionsObj.IsEmpty() && optionsObj->Has(NanSymbol("limit"))) {
      limit = v8::Local<v8::Integer>::Cast(optionsObj->Get(
          NanSymbol("limit")))->Value();
    }

    if (optionsObj->Has(NanSymbol("lt"))
        && (node::Buffer::HasInstance(optionsObj->Get(NanSymbol("lt")))
          || optionsObj->Get(NanSymbol("lt"))->IsString())) {

      v8::Local<v8::Value> ltBuffer =
          NanNewLocal<v8::Value>(optionsObj->Get(NanSymbol("lt")));

      // ignore end if it has size 0 since a Slice can't have length 0
      if (StringOrBufferLength(ltBuffer) > 0) {
        LD_STRING_OR_BUFFER_TO_SLICE(_lt, ltBuffer, lt)
        lt = new std::string(_lt.data(), _lt.size());
        if (reverse)
          start = new leveldb::Slice(_lt.data(), _lt.size());
      }
    }

    if (optionsObj->Has(NanSymbol("lte"))
        && (node::Buffer::HasInstance(optionsObj->Get(NanSymbol("lte")))
          || optionsObj->Get(NanSymbol("lte"))->IsString())) {

      v8::Local<v8::Value> lteBuffer =
          NanNewLocal<v8::Value>(optionsObj->Get(NanSymbol("lte")));

      // ignore end if it has size 0 since a Slice can't have length 0
      if (StringOrBufferLength(lteBuffer) > 0) {
        LD_STRING_OR_BUFFER_TO_SLICE(_lte, lteBuffer, lte)
        lte = new std::string(_lte.data(), _lte.size());
        if (reverse)
          start = new leveldb::Slice(_lte.data(), _lte.size());
      }
    }

    if (optionsObj->Has(NanSymbol("gt"))
        && (node::Buffer::HasInstance(optionsObj->Get(NanSymbol("gt")))
          || optionsObj->Get(NanSymbol("gt"))->IsString())) {

      v8::Local<v8::Value> gtBuffer =
          NanNewLocal<v8::Value>(optionsObj->Get(NanSymbol("gt")));

      // ignore end if it has size 0 since a Slice can't have length 0
      if (StringOrBufferLength(gtBuffer) > 0) {
        LD_STRING_OR_BUFFER_TO_SLICE(_gt, gtBuffer, gt)
        gt = new std::string(_gt.data(), _gt.size());
        if (!reverse)
          start = new leveldb::Slice(_gt.data(), _gt.size());
      }
    }

    if (optionsObj->Has(NanSymbol("gte"))
        && (node::Buffer::HasInstance(optionsObj->Get(NanSymbol("gte")))
          || optionsObj->Get(NanSymbol("gte"))->IsString())) {

      v8::Local<v8::Value> gteBuffer =
          NanNewLocal<v8::Value>(optionsObj->Get(NanSymbol("gte")));

      // ignore end if it has size 0 since a Slice can't have length 0
      if (StringOrBufferLength(gteBuffer) > 0) {
        LD_STRING_OR_BUFFER_TO_SLICE(_gte, gteBuffer, gte)
        gte = new std::string(_gte.data(), _gte.size());
        if (!reverse)
          start = new leveldb::Slice(_gte.data(), _gte.size());
      }
    }

  }

  bool keys = NanBooleanOptionValue(optionsObj, NanSymbol("keys"), true);
  bool values = NanBooleanOptionValue(optionsObj, NanSymbol("values"), true);
  bool keyAsBuffer = NanBooleanOptionValue(
      optionsObj
    , NanSymbol("keyAsBuffer")
    , true
  );
  bool valueAsBuffer = NanBooleanOptionValue(
      optionsObj
    , NanSymbol("valueAsBuffer")
    , true
  );
  bool fillCache = NanBooleanOptionValue(optionsObj, NanSymbol("fillCache"));

  Iterator* iterator = new Iterator(
      database
    , (uint32_t)id->Int32Value()
    , start
    , end
    , reverse
    , keys
    , values
    , limit
    , lt
    , lte
    , gt
    , gte
    , fillCache
    , keyAsBuffer
    , valueAsBuffer
    , startHandle
  );
  iterator->Wrap(args.This());

  NanReturnValue(args.This());
}

} // namespace leveldown
