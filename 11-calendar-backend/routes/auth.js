/**
 * Auth Routes
 * host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const {fieldValidator} = require('../middlewares/field-validator');
const {jwtValidator} = require('../middlewares/jwt-validator')
const {createUser, loginUser, revalidateToken} = require('./../controllers/auth')

router.post(
    '/new',
    [
        check('name', 'Name is required!').not().isEmpty(),
        check('email', 'Email is required!').isEmail(),
        check('password', 'Password must have at least 6 characters!').isLength({min: 6}),
        fieldValidator
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'Email is required!').isEmail(),
        check('password', 'Password must have at least 6 characters!').isLength({min: 6}),
        fieldValidator
    ],
    loginUser
);

router.get('/renew', [
    jwtValidator
], revalidateToken);

module.exports = router;