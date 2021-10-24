const { body } = require('express-validator');

const validateField = (method) => {
    switch (method) {
        case 'user-create': {
            // console.log(req.body.length, 'req.body.length');
            // for (let i = 0; i < req.body.length; i++) {
            return [
                body(['*.email'], "email_id doesn't exists").exists().bail()
                    .isEmail().bail().withMessage('Invalid email address')
                    .isLowercase().withMessage('Email id sholud be in lowercase').bail(),

                body('*.phone', 'phone number cannot be blank').exists().trim().bail()
                    .isNumeric().bail().withMessage('Phone number should not be string')
                    .isLength({ min: 10, max: 10 })
                    .withMessage('Phone number sholud be of length 10').bail(),
                body('*.firstName', 'First Name cannot be blank').exists().trim().bail()
                    .isLength({ min: 3 })
                    .withMessage('First Name must be atleast 3 chars long').exists().trim().bail(),
                body('*.lastName', 'Last Name cannot be blank').exists().trim().bail()
                    .isLength({ min: 3 })
                    .withMessage('Last Name must be atleast 3 chars long').exists().trim().bail(),
                body('*.introduction', 'Introduction cannot be blank').exists().trim().bail()
                    .isLength({ min: 20 })
                    .withMessage('Introduction must be atleast 20 chars long').exists().trim().bail(),
                body('*.achievements', 'achievements cannot be blank').exists().trim().bail()
                    .isLength({ min: 10 })
                    .withMessage('achievements must be atleast 10 chars long').exists().trim().bail(),
                body('*.experience', 'experience cannot be blank').exists().trim().bail()
                    .isNumeric().bail().withMessage('experience  should not be string')
                    .isLength({ min: 1, max: 2 })
                    .bail(),
            ];
        }
    }
}


module.exports = {
    validateField
};