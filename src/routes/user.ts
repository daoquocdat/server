import {Router} from 'express';
const router = Router();

import {getUsers, createUser, deleteUser} from '../controllers/Users'

router.get('/', getUsers);
router.post('/createUser', createUser);
router.delete('/deleteUser/:id', deleteUser)

export default router;