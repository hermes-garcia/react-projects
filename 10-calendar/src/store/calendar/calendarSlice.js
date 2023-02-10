import {createSlice} from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvent: null,
    },
    reducers: {
        handleSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload;
        },
        handleAddNewEvent: (state, {payload}) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        handleUpdateEvent: (state, {payload}) => {
            state.events = state.events.map(event => {
                return (event.id === payload.id) ? payload : event;
            });
        },
        handleDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        handleLoadEvents: (state, {payload = []}) => {
            state.isLoadingEvents = false;
            //state.events = payload;
            payload.forEach( event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event);
                }
            });
        },
        handleLogoutCalendar: (state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        },
    }
});

export const {
    handleSetActiveEvent,
    handleAddNewEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    handleLoadEvents,
    handleLogoutCalendar,
} = calendarSlice.actions;