import express from 'express';

import authRoutes from '../../routes/auth.routes.js';
import todoRoutes from '../../routes/todo.routes.js';

const createApi = () => {
  const api = express.Router();

  authRoutes(api);
  todoRoutes(api);

  return api;
}

export default createApi;