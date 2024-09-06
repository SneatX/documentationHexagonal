const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class UserValidator {
    validateUserData = () => {
        return [
            body('cedula').notEmpty().isNumeric().withMessage('The cedula is mandatory'),
            body('names').notEmpty().isString().withMessage('The name is mandatory'),
            body('surnames').isString().withMessage('send the last name'),
            body('nick').notEmpty().isString().withMessage('Send the nickname you will have in the system'),
            body('email').notEmpty().isEmail().withMessage('Send the email'),
            body('phone').isString().withMessage('Send the phone'),
            body('role', 'The role was not sent').notEmpty().exists().custom((value) => {
                if (value && !['Usuario Estandar', 'Usuario VIP', 'Administrador'].includes(value)) {
                    throw new Error(`There are only three roles available 'Usuario Estandar', 'Usuario VIP', 'Administrador'`);
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateUserDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateUserId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    validateUserUpdateDataById = () => {
        return [   
            body('cedula').notEmpty().isNumeric().withMessage('The cedula is mandatory'),
            body('names').notEmpty().isString().withMessage('The name is mandatory'),
            body('surnames').isString().withMessage('send the last name'),
            body('nick').notEmpty().isString().withMessage('Send the nickname you will have in the system'),
            body('email').notEmpty().isEmail().withMessage('Send the email'),
            body('phone').isString().withMessage('Send the phone'),
            body('role', 'The role was not sent').notEmpty().exists().custom((value) => {
                if (value && !['Usuario Estandar', 'Usuario VIP', 'Administrador'].includes(value)) {
                    throw new Error(`There are only three roles available 'Usuario Estandar', 'Usuario VIP', 'Administrador'`);
                }
                return true;
            }),
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };
}

module.exports = UserValidator;
