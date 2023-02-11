const {response} = require('express');
const Event = require('../models/EventModel');

const getEvents = async(req, res = response) => {

    const events = await Event.find().populate('user','name');

    res.status(200).json({
        ok: true,
        events
    });
};

const createEvent = async(req, res = response) => {

    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const savedEvent = await event.save();

        res.status(200).json({
            ok: true,
            event: savedEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Internal server error"
        });
    }
};

const updateEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found with id'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Event forbidden'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        res.status(200).json({
            ok: true,
            event: updatedEvent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: true,
            msg: 'Internal server error 2'
        });
    }
};

const deleteEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found with id'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Event forbidden'
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            ok: true,
            eventId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: true,
            msg: 'Internal server error 2'
        });
    }

};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}