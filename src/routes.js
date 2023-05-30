const { Router } = require('express');

const router = Router();
const UserController = require('./app/controller/UserController');
const UserRepository = require('./app/repositories/UserRepository');
const db = require('./db/database');

router.get('/', UserController.index);
router.get('/user/:id', UserController.show);

router.post('/', UserController.store);

router.put('/user/:id', UserController.update);

router.delete('/user/:id', UserController.delete);

module.exports = router;
