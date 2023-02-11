/**
 * Events Routes
 * host + /api/events
 */

const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const {fieldValidator} = require('../middlewares/field-validator');
const {jwtValidator} = require('../middlewares/jwt-validator')
const {getEvents, createEvent, updateEvent, deleteEvent} = require('./../controllers/events')
const {isDate} = require('../helpers/isDate');

router.use(jwtValidator);

router.get('/', getEvents);

router.post('/', [
    check('title','Event title is required').not().isEmpty(),
    check('start','Start date is required').custom( isDate ),
    check('end','End date is required').custom( isDate ),
    fieldValidator
], createEvent);

router.put('/:id', [
    check('title','Event title is required').not().isEmpty(),
    check('start','Start date is required').custom( isDate ),
    check('end','End date is required').custom( isDate ),
    fieldValidator
], updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;