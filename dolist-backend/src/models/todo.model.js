import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  todo_title: {
    type: String,
    required: true,
    trim: true
  },
  todo_isCompleted: {
    type: Boolean,
    required: true
  },
  todo_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

export default mongoose.model('Todo', todoSchema);