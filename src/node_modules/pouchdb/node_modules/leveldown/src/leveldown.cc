/* Copyright (c) 2012-2014 LevelDOWN contributors
 * See list at <https://github.com/rvagg/node-leveldown#contributing>
 * MIT License <https://github.com/rvagg/node-leveldown/blob/master/LICENSE.md>
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

  NanUtf8String* location = new NanUtf8String(args[0]);

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

  NanUtf8String* location = new NanUtf8String(args[0]);

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
