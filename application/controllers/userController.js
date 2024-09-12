// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const UserService = require('../services/userService');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async getUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async verifyUser(req, res) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const user = await this.userService.verifyUserByNick(req.body)
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if(!isMatch) throw new Error(JSON.stringify({status: 401, message: 'contraseña incorrecta'}));

            delete user.password
            delete user._id
            
            const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "60s"})
            res.status(200).json(token);

        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            
            let pwd = await bcrypt.hash(req.body.password, 10)

            req.body.password = pwd

            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);

        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.userService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.userService.deleteUser(req.params.id);
            // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
            res.status(204).json(user);
            // En algunos casos, 200 OK también puede ser utilizado si la respuesta incluye información adicional o confirmación sobre la eliminación. Sin embargo, 204 No Content es la opción más estándar para indicar que un recurso ha sido eliminado y no hay contenido adicional en la respuesta.
            // res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    
    async searchUsers(req, res) {
        try {
            const users = await this.userService.searchUsersByName(req.query.name);
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;