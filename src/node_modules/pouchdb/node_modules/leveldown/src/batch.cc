#include <node.h>
#include <node_buffer.h>


#include "nan.h"
#include "database.h"
#include "batch_async.h"
#include "batch.h"

namespace leveldown {

static v8::Persistent<v8::FunctionTemplate> batch_constructor;

Batch::Batch (leveldown::Database* database, bool sync) : database(database) {
  options = new leveldb::WriteOptions();
  options->sync = sync;
  batch = new leveldb::WriteBatch();
  hasData = false;
  written = false;
}

Batch::~Batch () {
  delete options;
  delete batch;
}

leveldb::Status Batch::Write () {
  return database->WriteBatchToDatabase(options, batch);
}

void Batch::Init () {
  v8::Local<v8::FunctionTemplate> tpl = v8::FunctionTemplate::New(Batch::New);
  NanAssignPersistent(v8::FunctionTemplate, batch_constructor, tpl);
  tpl->SetClassName(NanSymbol("Batch"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  NODE_SET_PROTOTYPE_METHOD(tpl, "put", Batch::Put);
  NODE_SET_PROTOTYPE_METHOD(tpl, "del", Batch::Del);
  NODE_SET_PROTOTYPE_METHOD(tpl, "clear", Batch::Clear);
  NODE_SET_PROTOTYPE_METHOD(tpl, "write", Batch::Write);
}

NAN_METHOD(Batch::New) {
  NanScope();

  Database* database = node::ObjectWrap::Unwrap<Database>(args[0]->ToObject());
  v8::Local<v8::Object> optionsObj;

  if (args.Length() > 1 && args[1]->IsObject()) {
    optionsObj = v8::Local<v8::Object>::Cast(args[1]);
  }

  bool sync = NanBooleanOptionValue(optionsObj, NanSymbol("sync"));

  Batch* batch = new Batch(database, sync);
  batch->Wrap(args.This());

  NanReturnValue(args.This());
}

v8::Handle<v8::Value> Batch::NewInstance (
        v8::Handle<v8::Object> database
      , v8::Handle<v8::Object> optionsObj
    ) {

  NanScope();

  v8::Local<v8::Object> instance;

  v8::Local<v8::FunctionTemplate> constructorHandle =
      NanPersistentToLocal(batch_constructor);

  if (optionsObj.IsEmpty()) {
    v8::Handle<v8::Value> argv[1] = { database };
    instance = constructorHandle->GetFunction()->NewInstance(1, argv);
  } else {
    v8::Handle<v8::Value> argv[2] = { database, optionsObj };
    instance = constructorHandle->GetFunction()->NewInstance(2, argv);
  }

  return scope.Close(instance);
}

NAN_METHOD(Batch::Put) {
  NanScope();

  Batch* batch = ObjectWrap::Unwrap<Batch>(args.Holder());

  if (batch->written)
    return NanThrowError("write() already called on this batch");

  v8::Handle<v8::Function> callback; // purely for the error macros

  LD_CB_ERR_IF_NULL_OR_UNDEFINED(args[0], key)
  LD_CB_ERR_IF_NULL_OR_UNDEFINED(args[1], value)

  v8::Local<v8::Value> keyBuffer = args[0];
  v8::Local<v8::Value> valueBuffer = args[1];
  LD_STRING_OR_BUFFER_TO_SLICE(key, keyBuffer, key)
  LD_STRING_OR_BUFFER_TO_SLICE(value, valueBuffer, value)

  batch->batch->Put(key, value);
  if (!batch->hasData)
    batch->hasData = true;

  DisposeStringOrBufferFromSlice(keyBuffer, key);
  DisposeStringOrBufferFromSlice(valueBuffer, value);

  NanReturnValue(args.Holder());
}

NAN_METHOD(Batch::Del) {
  NanScope();

  Batch* batch = ObjectWrap::Unwrap<Batch>(args.Holder());

  if (batch->written)
    return NanThrowError("write() already called on this batch");

  v8::Handle<v8::Function> callback; // purely for the error macros

  LD_CB_ERR_IF_NULL_OR_UNDEFINED(args[0], key)

  v8::Local<v8::Value> keyBuffer = args[0];
  LD_STRING_OR_BUFFER_TO_SLICE(key, keyBuffer, key)

  batch->batch->Delete(key);
  if (!batch->hasData)
    batch->hasData = true;

  DisposeStringOrBufferFromSlice(keyBuffer, key);

  NanReturnValue(args.Holder());
}

NAN_METHOD(Batch::Clear) {
  NanScope();

  Batch* batch = ObjectWrap::Unwrap<Batch>(args.Holder());

  if (batch->written)
    return NanThrowError("write() already called on this batch");

  batch->batch->Clear();
  batch->hasData = false;

  NanReturnValue(args.Holder());
}

NAN_METHOD(Batch::Write) {
  NanScope();

  Batch* batch = ObjectWrap::Unwrap<Batch>(args.Holder());

  if (batch->written)
    return NanThrowError("write() already called on this batch");
  
  if (args.Length() == 0)
    return NanThrowError("write() requires a callback argument");

  batch->written = true;

  if (batch->hasData) {
    NanCallback *callback =
        new NanCallback(v8::Local<v8::Function>::Cast(args[0]));
    BatchWriteWorker* worker  = new BatchWriteWorker(batch, callback);
    // persist to prevent accidental GC
    v8::Local<v8::Object> _this = args.This();
    worker->SavePersistent("batch", _this);
    NanAsyncQueueWorker(worker);
  } else {
    LD_RUN_CALLBACK(v8::Local<v8::Function>::Cast(args[0]), 0, NULL);
  }

  NanReturnUndefined();
}

} // namespace leveldown
