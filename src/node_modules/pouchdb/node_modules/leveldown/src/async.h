/* Copyright (c) 2012-2013 LevelDOWN contributors
 * See list at <https://github.com/rvagg/node-leveldown#contributing>
 * MIT +no-false-attribs License <https://github.com/rvagg/node-leveldown/blob/master/LICENSE>
 */

#ifndef LD_ASYNC_H
#define LD_ASYNC_H

#include <node.h>
#include "nan.h"
#include "database.h"

namespace leveldown {

class Database;

/* abstract */ class AsyncWorker : public NanAsyncWorker {
public:
  AsyncWorker (
      leveldown::Database* database
    , NanCallback *callback
  ) : NanAsyncWorker(callback), database(database) {
    NanScope();
    v8::Local<v8::Object> obj = v8::Object::New();
    NanAssignPersistent(v8::Object, persistentHandle, obj);
  }

protected:
  void SetStatus(leveldb::Status status) {
    this->status = status;
    if (!status.ok())
      this->errmsg = strdup(status.ToString().c_str());
  }
  Database* database;
private:
  leveldb::Status status;
};

} // namespace leveldown

#endif
