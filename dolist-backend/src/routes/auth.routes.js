import * as authControllers from '../controllers/auth.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const authRoutes = (api) => {
  api.get('/auth/me', verifyToken, authControllers.getUser);

  api.post('/auth/signup', authControllers.signUp)
  api.post('/auth/login', authControllers.login)
  api.post('/auth/logout', verifyToken, authControllers.logout);
  // api.post('/auth/refresh-token', authControllers.refreshAccessToken);
}

export default authRoutes;