/* Copyright (c) 2012-2014 LevelDOWN contributors
 * See list at <https://github.com/rvagg/node-leveldown#contributing>
 * MIT License <https://github.com/rvagg/node-leveldown/blob/master/LICENSE.md>
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
  , size_t highWaterMark
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
  , highWaterMark(highWaterMark)
  , keyAsBuffer(keyAsBuffer)
  , valueAsBuffer(valueAsBuffer)
{
  NanScope();

  v8::Local<v8::Object> obj = NanNew<v8::Object>();
  if (!startHandle.IsEmpty())
    obj->Set(NanNew("start"), startHandle);
  NanAssignPersistent(persistentHandle, obj);

  options    = new leveldb::ReadOptions();
  options->fill_cache = fillCache;
  // get a snapshot of the current state
  options->snapshot = database->NewSnapshot();
  dbIterator = NULL;
  count      = 0;
  nexting    = false;
  ended      = false;
  endWorker  = NULL;
};

Iterator::~Iterator () {
  delete options;
  if (!persistentHandle.IsEmpty())
    NanDisposePersistent(persistentHandle);
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

bool Iterator::Read (std::string& key, std::string& value) {
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

bool Iterator::IteratorNext (std::vector<std::pair<std::string, std::string> >& result) {
  size_t size = 0;
  while(true) {
    std::string key, value;
    bool ok = Read(key, value);

    if (ok) {
      result.push_back(std::make_pair(key, value));
      size = size + key.size() + value.size();

      if (size > highWaterMark)
        return true;

    } else {
      return false;
    }
  }
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

  v8::Local<v8::Function> callback = args[0].As<v8::Function>();

  NextWorker* worker = new NextWorker(
      iterator
    , new NanCallback(callback)
    , checkEndCallback
  );
  // persist to prevent accidental GC
  v8::Local<v8::Object> _this = args.This();
  worker->SaveToPersistent("iterator", _this);
  iterator->nexting = true;
  NanAsyncQueueWorker(worker);

  NanReturnValue(args.Holder());
}

NAN_METHOD(Iterator::End) {
  NanScope();

  Iterator* iterator = node::ObjectWrap::Unwrap<Iterator>(args.This());

  v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(args[0]);

  EndWorker* worker = new EndWorker(
      iterator
    , new NanCallback(callback)
  );
  // persist to prevent accidental GC
  v8::Local<v8::Object> _this = args.This();
  worker->SaveToPersistent("iterator", _this);
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
      NanNew<v8::FunctionTemplate>(Iterator::New);
  NanAssignPersistent(iterator_constructor, tpl);
  tpl->SetClassName(NanNew("Iterator"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  NODE_SET_PROTOTYPE_METHOD(tpl, "next", Iterator::Next);
  NODE_SET_PROTOTYPE_METHOD(tpl, "end", Iterator::End);
}

v8::Local<v8::Object> Iterator::NewInstance (
        v8::Local<v8::Object> database
      , v8::Local<v8::Number> id
      , v8::Local<v8::Object> optionsObj
    ) {

  NanEscapableScope();

  v8::Local<v8::Object> instance;
  v8::Local<v8::FunctionTemplate> constructorHandle =
      NanNew<v8::FunctionTemplate>(iterator_constructor);

  if (optionsObj.IsEmpty()) {
    v8::Handle<v8::Value> argv[2] = { database, id };
    instance = constructorHandle->GetFunction()->NewInstance(2, argv);
  } else {
    v8::Handle<v8::Value> argv[3] = { database, id, optionsObj };
    instance = constructorHandle->GetFunction()->NewInstance(3, argv);
  }

  return NanEscapeScope(instance);
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
  // default highWaterMark from Readble-streams
  size_t highWaterMark = 16 * 1024;

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

    reverse = NanBooleanOptionValue(optionsObj, NanNew("reverse"));

    if (optionsObj->Has(NanNew("start"))
        && (node::Buffer::HasInstance(optionsObj->Get(NanNew("start")))
          || optionsObj->Get(NanNew("start"))->IsString())) {

      startHandle = optionsObj->Get(NanNew("start")).As<v8::Object>();

      // ignore start if it has size 0 since a Slice can't have length 0
      if (StringOrBufferLength(startHandle) > 0) {
        LD_STRING_OR_BUFFER_TO_SLICE(_start, startHandle, start)
        start = new leveldb::Slice(_start.data(), _start.size());
      }
    }

    if (optionsObj->Has(NanNew("end"))
        && (node::Buffer::HasInstance(optionsObj->Get(NanNew("end")))
          || optionsObj->Get(NanNew("end"))->IsString())) {

      v8::Local<v8::Value> endBuffer = optionsObj->Get(NanNew("end"));

      // ignore end if it has size 0 since a Slice can't have length 0
      if (StringOrBufferLength(endBuffer) > 0) {
        LD_STRING_OR_BUFFER_TO_SLICE(_end, endBuffer, end)
        end = new std::string(_end.data(), _end.size());
      }
    }

    if (!optionsObj.IsEmpty() && optionsObj->Has(NanNew("limit"))) {
      limit = v8::Local<v8::Integer>::Cast(optionsObj->Get(
          NanNew("limit")))->Value();
    }

    if (optionsObj->Has(NanNew("highWaterMark"))) {
      highWaterMark = v8::Local<v8::Integer>::Cast(optionsObj->Get(
            NanNew("highWaterMark")))->Value();
    }

    if (optionsObj->Has(NanNew("lt"))
        && (node::Buffer::HasInstance(optionsObj->Get(NanNew("lt")))
          || optionsObj->Get(NanNew("lt"))->IsString())) {

      v8::Local<v8::Value> ltBuffer = optionsObj->Get(NanNew("lt"));

      // ignore end if it has size 0 since a Slice can't have length 0
      if (StringOrBufferLength(ltBuffer) > 0) {
        LD_STRING_OR_BUFFER_TO_SLICE(_lt, ltBuffer, lt)
        lt = new std::string(_lt.data(), _lt.size());
        if (reverse)
          start = new leveldb::Slice(_lt.data(), _lt.size());
      }
    }

    if (optionsObj->Has(NanNew("lte"))
        && (node::Buffer::HasInstance(optionsObj->Get(NanNew("lte")))
          || optionsObj->Get(NanNew("lte"))->IsString())) {

      v8::Local<v8::Value> lteBuffer = optionsObj->Get(NanNew("lte"));

      // ignore end if it has size 0 since a Slice can't have length 0
      if (StringOrBufferLength(lteBuffer) > 0) {
        LD_STRING_OR_BUFFER_TO_SLICE(_lte, lteBuffer, lte)
        lte = new std::string(_lte.data(), _lte.size());
        if (reverse)
          start = new leveldb::Slice(_lte.data(), _lte.size());
      }
    }

    if (optionsObj->Has(NanNew("gt"))
        && (node::Buffer::HasInstance(optionsObj->Get(NanNew("gt")))
          || optionsObj->Get(NanNew("gt"))->IsString())) {

      v8::Local<v8::Value> gtBuffer = optionsObj->Get(NanNew("gt"));

      // ignore end if it has size 0 since a Slice can't have length 0
      if (StringOrBufferLength(gtBuffer) > 0) {
        LD_STRING_OR_BUFFER_TO_SLICE(_gt, gtBuffer, gt)
        gt = new std::string(_gt.data(), _gt.size());
        if (!reverse)
          start = new leveldb::Slice(_gt.data(), _gt.size());
      }
    }

    if (optionsObj->Has(NanNew("gte"))
        && (node::Buffer::HasInstance(optionsObj->Get(NanNew("gte")))
          || optionsObj->Get(NanNew("gte"))->IsString())) {

      v8::Local<v8::Value> gteBuffer = optionsObj->Get(NanNew("gte"));

      // ignore end if it has size 0 since a Slice can't have length 0
      if (StringOrBufferLength(gteBuffer) > 0) {
        LD_STRING_OR_BUFFER_TO_SLICE(_gte, gteBuffer, gte)
        gte = new std::string(_gte.data(), _gte.size());
        if (!reverse)
          start = new leveldb::Slice(_gte.data(), _gte.size());
      }
    }

  }

  bool keys = NanBooleanOptionValue(optionsObj, NanNew("keys"), true);
  bool values = NanBooleanOptionValue(optionsObj, NanNew("values"), true);
  bool keyAsBuffer = NanBooleanOptionValue(
      optionsObj
    , NanNew("keyAsBuffer")
    , true
  );
  bool valueAsBuffer = NanBooleanOptionValue(
      optionsObj
    , NanNew("valueAsBuffer")
    , true
  );
  bool fillCache = NanBooleanOptionValue(optionsObj, NanNew("fillCache"));

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
    , highWaterMark
  );
  iterator->Wrap(args.This());

  NanReturnValue(args.This());
}

} // namespace leveldown
