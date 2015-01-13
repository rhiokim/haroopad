/* Copyright (c) 2012-2013 LevelDOWN contributors
 * See list at <https://github.com/rvagg/node-leveldown#contributing>
 * MIT +no-false-attribs License <https://github.com/rvagg/node-leveldown/blob/master/LICENSE>
 */

#include <node.h>

#include "leveldown.h"
#include "database.h"
#include "iterator.h"
#include "batch.h"
#include "leveldown_async.h"

namespace leveldown {

NAN_METHOD(DestroyDB) {
  NanScope();

  if (args.Length() < 2) {
    return NanThrowError("destroy() requires `location` and `callback` arguments");
  }

  if (!args[0]->IsString()) {
    return NanThrowError("destroy() requires a location string argument");
  }

  if (!args[1]->IsFunction()) {
    return NanThrowError("destroy() requires a callback function argument");
  }

  char* location = NanCString(args[0].As<v8::Object>(), NULL, NULL, 0, v8::String::NO_OPTIONS);

  NanCallback* callback = new NanCallback(
      v8::Local<v8::Function>::Cast(args[1]));

  DestroyWorker* worker = new DestroyWorker(
      location
    , callback
  );

  NanAsyncQueueWorker(worker);

  NanReturnUndefined();
}

NAN_METHOD(RepairDB) {
  NanScope();

  if (args.Length() < 2) {
    return NanThrowError("repair() requires `location` and `callback` arguments");
  }

  if (!args[0]->IsString()) {
    return NanThrowError("repair() requires a location string argument");
  }

  if (!args[1]->IsFunction()) {
    return NanThrowError("repair() requires a callback function argument");
  }

  char* location = NanCString(args[0].As<v8::Object>(), NULL, NULL, 0, v8::String::NO_OPTIONS);

 NanCallback* callback = new NanCallback(
      v8::Local<v8::Function>::Cast(args[1]));

  RepairWorker* worker = new RepairWorker(
      location
    , callback
  );

  NanAsyncQueueWorker(worker);

  NanReturnUndefined();
}

void Init (v8::Handle<v8::Object> target) {
  Database::Init();
  leveldown::Iterator::Init();
  leveldown::Batch::Init();

  v8::Local<v8::Function> leveldown =
      NanNew<v8::FunctionTemplate>(LevelDOWN)->GetFunction();

  leveldown->Set(
      NanNew("destroy")
    , NanNew<v8::FunctionTemplate>(DestroyDB)->GetFunction()
  );

  leveldown->Set(
      NanNew("repair")
    , NanNew<v8::FunctionTemplate>(RepairDB)->GetFunction()
  );

  target->Set(NanNew("leveldown"), leveldown);
}

NODE_MODULE(leveldown, Init)

} // namespace leveldown
