import fetchData from './fetchData.js'

const getTodos = async () => {
  const response = await fetchData('/todos', {
    method: 'GET'
  })

  return response;
}

const addTodo = async (todo) => {
  const response = await fetchData('/todos/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })

  return response;
}

const updateTodo = async (todoId, updatedTodo) => {
  const response = await fetchData(`/todos/update/${todoId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTodo)
  })

  return response;
}

const completeTodo = async (todoId) => {
  const response = await fetchData(`/todos/complete/${todoId}`, {
    method: 'POST'
  })

  return response;
}

const deleteTodo = async (todoId) => {
  const response = await fetchData(`/todos/delete/${todoId}`, {
    method: 'DELETE'
  })

  return response;
}

export {
  getTodos,
  addTodo,
  updateTodo,
  completeTodo,
  deleteTodo
}

