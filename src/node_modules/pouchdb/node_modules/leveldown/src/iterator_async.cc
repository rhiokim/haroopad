/* Copyright (c) 2012-2013 LevelDOWN contributors
 * See list at <https://github.com/rvagg/node-leveldown#contributing>
 * MIT +no-false-attribs License <https://github.com/rvagg/node-leveldown/blob/master/LICENSE>
 */

#include <node.h>
#include <node_buffer.h>

#include "database.h"
#include "leveldown.h"
#include "async.h"
#include "iterator_async.h"

namespace leveldown {

/** NEXT-MULTI WORKER **/

NextWorker::NextWorker (
    Iterator* iterator
  , NanCallback *callback
  , void (*localCallback)(Iterator*)
) : AsyncWorker(NULL, callback)
  , iterator(iterator)
  , localCallback(localCallback)
{};

NextWorker::~NextWorker () {}

void NextWorker::Execute () {
  ok = iterator->IteratorNext(result);
  if (!ok)
    SetStatus(iterator->IteratorStatus());
}

void NextWorker::HandleOKCallback () {
  size_t idx = 0;
  v8::Local<v8::Array> returnArray;
  if (ok)
    returnArray = NanNew<v8::Array>(result.size());
  else {
    // make room and add for a null-value at the end,
    // signaling that we're at the end
    returnArray = NanNew<v8::Array>(result.size() + 1);
    returnArray->Set(
        NanNew<v8::Integer>(static_cast<int>(result.size()))
      , NanNull()
    );

  }

  for(idx = 0; idx < result.size(); ++idx) {
    std::pair<std::string, std::string> row = result[idx];
    std::string key = row.first;
    std::string value = row.second;

    v8::Local<v8::Value> returnKey;
    if (iterator->keyAsBuffer) {
      returnKey = NanNewBufferHandle((char*)key.data(), key.size());
    } else {
      returnKey = NanNew<v8::String>((char*)key.data(), key.size());
    }

    v8::Local<v8::Value> returnValue;
    if (iterator->valueAsBuffer) {
      returnValue = NanNewBufferHandle((char*)value.data(), value.size());
    } else {
      returnValue = NanNew<v8::String>((char*)value.data(), value.size());
    }

    v8::Local<v8::Object> returnObject = NanNew<v8::Object>();
    returnObject->Set(NanNew("key"), returnKey);
    returnObject->Set(NanNew("value"), returnValue);
    returnArray->Set(NanNew<v8::Integer>(static_cast<int>(idx)), returnObject);
  }

  // clean up & handle the next/end state see iterator.cc/checkEndCallback
  localCallback(iterator);

  v8::Local<v8::Value> argv[] = {
      NanNull()
    , returnArray
  };
  callback->Call(2, argv);
}

/** END WORKER **/

EndWorker::EndWorker (
    Iterator* iterator
  , NanCallback *callback
) : AsyncWorker(NULL, callback)
  , iterator(iterator)
{};

EndWorker::~EndWorker () {}

void EndWorker::Execute () {
  iterator->IteratorEnd();
}

void EndWorker::HandleOKCallback () {
  iterator->Release();
  callback->Call(0, NULL);
}

} // namespace leveldown
