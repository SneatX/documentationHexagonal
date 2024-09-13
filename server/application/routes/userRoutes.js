// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const UserController = require('../controllers/userController');
const UserValidator = require('../validator/userValidator');
const { authenticateToken } = require('../middlewares/authToken');
const sessionAuth = require("../middlewares/sessionLogin");
const versionMiddleware = require('../middlewares/version');

const router = express.Router({mergeParams: true});
const userController = new UserController();
const userValidator = new UserValidator();

router.post('/', userValidator.validateUserData(), (req, res) => userController.createUser(req, res));
router.post('/login',versionMiddleware("1.0.0"),  sessionAuth, userValidator.validateUserLogin(), (req, res) => userController.verifyUser(req, res));

router.get('/:id',authenticateToken,  userValidator.validateUserId(), (req, res) => userController.getUser(req, res));
// router.put('/:id', userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));
// router.delete('/:id', userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));
// router.get('/search', (req, res) => userController.searchUsers(req, res));


module.exports = router;