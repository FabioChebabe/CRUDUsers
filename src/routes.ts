import { Router } from 'express';
import UserController from './app/controller/UserController';

const router = Router();

router.get('/', UserController.index);
router.get('/user/:id', UserController.show);

router.post('/', UserController.store);

router.put('/user/:id', UserController.update);

router.delete('/user/:id', UserController.delete);

export default router;
