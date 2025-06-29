import * as todoServices from '../services/todo.services.js'
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const getAllTodos = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const response = await todoServices.getAllTodos(userId);

    return successResponse({
      res,
      message: "Todos fetched successfully.",
      data: response
    })

  } catch (error) {
    return errorResponse(req, res, error)
  }
}
const addTodo = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const todo = req.body;

    const response = await todoServices.addTodo(todo, userId);

    return successResponse({
      res,
      message: "Todo added successfully.",
      data: response
    })
  } catch (error) {
    return errorResponse(req, res, error)
  }

}
const updateTodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const updatedTodo = req.body;

    const response = await todoServices.updateTodo(todoId, updatedTodo);

    return successResponse({
      res,
      message: "Todo updated successfully.",
      data: response
    })
  } catch (error) {
    return errorResponse(req, res, error)
  }
}

const completeTodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const { isCompleted } = await todoServices.completeTodo(todoId);

    return successResponse({
      res,
      message: isCompleted ? "Todo marked completed." : "Todo marked uncompleted."
    })
  } catch (error) {
    return errorResponse(req, res, error)
  }
}

const deleteTodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;

    await todoServices.deleteTodo(todoId);

    return successResponse({
      res,
      message: "Todo deleted successfully."
    })
  } catch (error) {
    return errorResponse(req, res, error)
  }
}

export {
  getAllTodos,
  addTodo,
  updateTodo,
  completeTodo,
  deleteTodo
}