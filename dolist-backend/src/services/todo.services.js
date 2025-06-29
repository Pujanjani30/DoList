import Todos from '../models/todo.model.js'
import mongoose from 'mongoose'

const getAllTodos = async (userId) => {
  return await Todos.find({ todo_user: userId });
}

const addTodo = async (todo, userId) => {
  const newTodo = {
    ...todo,
    todo_user: userId
  }

  return await Todos.create(newTodo);
}

const updateTodo = async (todoId, updatedTodo) => {
  const todo = await Todos.findById(todoId);
  if (!todo)
    throw { type: 'TODO_NOT_EXISTS' }

  updateTodo.todo_isCompleted = todo.todo_isCompleted;

  return await Todos.findOneAndUpdate({ _id: todoId }, updatedTodo, { new: true });
}

const completeTodo = async (todoId) => {
  const todo = await Todos.findById(todoId);
  if (!todo)
    throw { type: 'TODO_NOT_EXISTS' }

  console.log(todo)

  todo.todo_isCompleted = !todo.todo_isCompleted;
  await todo.save();

  return { isCompleted: todo.todo_isCompleted }
}

const deleteTodo = async (todoId) => {
  const todo = await Todos.findById(todoId);
  if (!todo)
    throw { type: 'TODO_NOT_EXISTS' }

  return await Todos.deleteOne({ _id: todoId })
}

export {
  getAllTodos,
  addTodo,
  updateTodo,
  completeTodo,
  deleteTodo
}