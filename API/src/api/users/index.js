const { Router } = require('express');
const { create, deleteDB, login, index, showMe, editUser } = require('./controller');
const password = require('../../middlewares/password');
const token = require('../../middlewares/token');
const router = Router();

router.post('/signup', create);
router.get('/me', token, showMe);
router.post('/login', password, login);
router.patch('/me/options', token, editUser);

//dev 
router.delete('/:id', deleteDB)
router.get('/', token, index);

module.exports = router;