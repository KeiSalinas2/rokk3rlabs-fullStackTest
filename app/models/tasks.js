var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var taskSchema = new Schema({
  name: { type: String },
  dueDate: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  priority: { type: Number },
}, {
  toObject: {
    virtuals: true
  },
  versionKey: false
});

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;
