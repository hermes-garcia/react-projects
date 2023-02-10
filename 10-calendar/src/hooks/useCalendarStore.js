import {useDispatch, useSelector} from 'react-redux';
import {
    handleAddNewEvent,
    handleDeleteEvent,
    handleLoadEvents,
    handleSetActiveEvent,
    handleUpdateEvent
} from '../store';
import {calendarApi} from '../apis';
import {convertEventsToDateEvents} from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {

    const {events, activeEvent} = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(handleSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(calendarEvent) => {
        try {
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(handleUpdateEvent({...calendarEvent, user}));
                return;
            }
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(handleAddNewEvent({...calendarEvent, id: data.event.id, user }));
        } catch (error) {
            console.error(error)
            Swal.fire('Error on saving event', error.response.data.msg, 'error')
        }
    }

    const startDeletingEvent = async() => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(handleDeleteEvent());
        } catch (error) {
            console.error(error)
            Swal.fire('Error on deleting event', error.response.data.msg, 'error')
        }
    }

    const startLoadingEvents = async() => {
        try {
            const {data} = await calendarApi.get('events');
            const events = convertEventsToDateEvents(data.events);
            dispatch( handleLoadEvents(events) );
        } catch (error) {
            console.error('Error loading events');
            console.error(error);
        }
    }

    return {
        // Properties
        events,
        activeEvent,
        hasEventSelected: !! activeEvent,

        // Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    };
};
