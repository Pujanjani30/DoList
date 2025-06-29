import * as todoControllers from '../controllers/todo.controllers.js'
import { verifyToken } from '../middlewares/auth.middleware.js';

const todoRoutes = (api) => {
  api.get('/todos', verifyToken, todoControllers.getAllTodos);

  api.post('/todos/add', verifyToken, todoControllers.addTodo);
  api.post('/todos/update/:id', verifyToken, todoControllers.updateTodo);
  api.post('/todos/complete/:id', verifyToken, todoControllers.completeTodo);

  api.delete('/todos/delete/:id', verifyToken, todoControllers.deleteTodo);
}

export default todoRoutes;