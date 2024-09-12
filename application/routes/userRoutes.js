// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const UserController = require('../controllers/userController');
const UserValidator = require('../validator/userValidator');
const { authenticateToken } = require('../middlewares/authToken');

const router = express.Router();
const userController = new UserController();
const userValidator = new UserValidator();

router.post('/', userValidator.validateUserData(), (req, res) => userController.createUser(req, res));
router.post('/login', userValidator.validateUserLogin(), (req, res) => userController.verifyUser(req, res));

router.get('/:id',authenticateToken,  userValidator.validateUserId(), (req, res) => userController.getUser(req, res));
// router.put('/:id', userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));
// router.delete('/:id', userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));
// router.get('/search', (req, res) => userController.searchUsers(req, res));


module.exports = router;