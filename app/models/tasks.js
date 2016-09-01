var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var taskSchema = new Schema({
  title: { type: String },
  date: { type: String },
  type: {
    type: String,
    enum: ['pending', 'overdue'],
    required: true
  },
  priority: { type: Number },
}, {
  toObject: {
    virtuals: true
  },
  versionKey: false
});

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;
