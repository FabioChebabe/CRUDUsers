const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

router.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});

router.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});

module.exports = router;
