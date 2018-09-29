'use strict';

class Response {
  static success (data, pagination = undefined, sort = undefined) {
    let obj = {data: {}};

    if (Array.isArray(data)) {
      obj.data.items = data;
      if (pagination) {
        obj.data.offset = pagination.offset;
        obj.data.limit = pagination.limit;
        obj.data.count = pagination.count;
      }
      if (sort) {
        obj.data.sort_column = sort.column;
        obj.data.sort_order = sort.order;
      }
    } else if (data && typeof data === 'object') {
      Object.assign(obj.data, data);
    } else {
      obj.data.value = data; // todo: should we?
    }

    return obj;
  }

  static error (code, message, errors = null) {
    let obj = {
      error: {
        code: code,
        message: message
      }
    };

    if (errors != null) { // allow anything here, not just Arrays
      obj.errors = errors;
    }

    return obj;
  }
}

module.exports = Response;
