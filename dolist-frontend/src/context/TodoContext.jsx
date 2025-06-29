import { createContext, useState, useContext } from 'react'
import * as todosApi from '../api/todos.js'

export const todoContext = createContext(null);

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTodos = async () => {
    setLoading(true);
    const response = await todosApi.getTodos();
    if (response?.data) setTodos(response.data);
    setLoading(false);
    return response;
  }

  const addTodo = async (todo) => {
    setLoading(true);
    const response = await todosApi.addTodo(todo);
    setLoading(false);
    return response;
  }

  const updateTodo = async (todoId, updateTodo) => {
    setLoading(true);
    const response = await todosApi.updateTodo(todoId, updateTodo);
    setLoading(false);
    return response;
  }

  const completeTodo = async (todoId) => {
    setLoading(true);
    const response = await todosApi.completeTodo(todoId);
    setLoading(false);
    return response;
  }

  const deleteTodo = async (todoId) => {
    setLoading(true);
    const response = await todosApi.deleteTodo(todoId);
    setLoading(false);
    return response;
  }

  return (
    <todoContext.Provider value={{
      todos, setTodos, loading, getTodos, addTodo, updateTodo, completeTodo, deleteTodo
    }}>
      {children}
    </todoContext.Provider>
  )
}

export default TodoContextProvider;

export const useTodo = () => {
  return useContext(todoContext);
}
