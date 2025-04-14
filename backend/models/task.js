const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  dueDate: Date,
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  category: String,
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', taskSchema);
