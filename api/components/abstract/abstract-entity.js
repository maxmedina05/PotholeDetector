const mongoose                  = require('mongoose');

function AbstractEntitySchema() {
  Schema.apply(this, arguments);
  this.add({
    created: Date, default: Date.now,
    createdBy: String,
    updated: Date,
    updatedBy: String,
  });
}

util.inherits(AbstractEntitySchema, Schema);
