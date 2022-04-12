import {Router} from 'express';
const router = Router();

import {getUsers, register, deleteUser, login} from '../controllers/Users'
import {requireAuth} from '../middlewares/userMiddleware'



router.get('/', getUsers);
router.get('/users', getUsers);
router.post('/register', register);
router.post('/login', login);
router.delete('/deleteUser/:id',requireAuth, deleteUser)

export default router;