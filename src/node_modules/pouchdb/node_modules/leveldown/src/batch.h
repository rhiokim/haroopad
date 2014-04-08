#ifndef LD_BATCH_H
#define LD_BATCH_H

#include <vector>
#include <node.h>

#include <leveldb/write_batch.h>

#include "database.h"

namespace leveldown {

class Batch : public node::ObjectWrap {
public:
  static void Init();
  static v8::Handle<v8::Value> NewInstance (
      v8::Handle<v8::Object> database
    , v8::Handle<v8::Object> optionsObj
  );

  Batch  (leveldown::Database* database, bool sync);
  ~Batch ();
  leveldb::Status Write ();

private:
  leveldown::Database* database;
  leveldb::WriteOptions* options;
  leveldb::WriteBatch* batch;
  bool hasData; // keep track of whether we're writing data or not
  bool written;

  static NAN_METHOD(New);
  static NAN_METHOD(Put);
  static NAN_METHOD(Del);
  static NAN_METHOD(Clear);
  static NAN_METHOD(Write);
};

} // namespace leveldown

#endif
