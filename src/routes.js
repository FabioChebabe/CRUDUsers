const { Router } = require('express');

const router = Router();
const UserController = require('./app/controller/UserController');
const UserRepository = require('./app/repositories/UserRepository');
const db = require('./db/database');

router.get('/', UserController.index);

router.post('/', (req, res) => {
  const query = `INSERT INTO users (
        firstName,
        lastName,
        email,
        image
    ) VALUES (?, ?, ?, ?);
  `;
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.image,
  ];

  db.run(query, values, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log('funcionou');
  });
  res.send(req.body);
});

router.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});

router.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});

module.exports = router;
