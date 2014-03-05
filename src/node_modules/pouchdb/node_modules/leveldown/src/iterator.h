/* Copyright (c) 2012-2013 LevelDOWN contributors
 * See list at <https://github.com/rvagg/node-leveldown#contributing>
 * MIT +no-false-attribs License <https://github.com/rvagg/node-leveldown/blob/master/LICENSE>
 */

#ifndef LD_ITERATOR_H
#define LD_ITERATOR_H

#include <node.h>

#include "nan.h"
#include "leveldown.h"
#include "database.h"
#include "async.h"

namespace leveldown {

class Database;
class AsyncWorker;

class Iterator : public node::ObjectWrap {
public:
  static void Init ();
  static v8::Local<v8::Object> NewInstance (
      v8::Local<v8::Object> database
    , v8::Local<v8::Number> id
    , v8::Local<v8::Object> optionsObj
  );

  Iterator (
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
  );

  ~Iterator ();

  bool IteratorNext (std::string& key, std::string& value);
  leveldb::Status IteratorStatus ();
  void IteratorEnd ();
  void Release ();

private:
  Database* database;
  uint32_t id;
  leveldb::Iterator* dbIterator;
  leveldb::ReadOptions* options;
  leveldb::Slice* start;
  std::string* end;
  bool reverse;
  bool keys;
  bool values;
  int limit;
  std::string* lt;
  std::string* lte;
  std::string* gt;
  std::string* gte;
  int count;

public:
  bool keyAsBuffer;
  bool valueAsBuffer;
  bool nexting;
  bool ended;
  AsyncWorker* endWorker;

private:
  v8::Persistent<v8::Object> persistentHandle;

  bool GetIterator ();

  static NAN_METHOD(New);
  static NAN_METHOD(Next);
  static NAN_METHOD(End);
};

} // namespace leveldown

#endif
