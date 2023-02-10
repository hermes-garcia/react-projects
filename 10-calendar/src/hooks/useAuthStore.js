import {useDispatch, useSelector} from 'react-redux';
import calendarApi from '../apis/calendarApi';
import {clearErrorMessage, handleChecking, handleLogin, handleLogout, handleLogoutCalendar} from '../store';

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch(handleChecking());
        try {
            const {data} = await calendarApi.post('/auth',{ email, password });
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date', `${new Date().getTime()}`);
            dispatch(handleLogin({name: data.name, uid: data.uid}));
        } catch (error) {
            dispatch( handleLogout('Incorrect credentials') );
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const startRegister = async({name, email, password}) => {
        dispatch(handleChecking());

        try {
            const {data} = await calendarApi.post('/auth/new',{ name, email, password });
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date', `${new Date().getTime()}`);
            dispatch(handleLogin({name: data.name, uid: data.uid}));
        } catch (error) {
            console.error(error)
            dispatch( handleLogout(error.response?.data?.msg || 'Try again later...') );
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(handleLogout());

        try {
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date', `${new Date().getTime()}`);
            dispatch(handleLogin({name: data.name, uid: data.uid}));
        } catch (error) {
            console.error(error)
            localStorage.clear();
            dispatch(handleLogout());
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch( handleLogout() );
        dispatch( handleLogoutCalendar() );
    };


    return {
        // Properties
        status,
        user,
        errorMessage,

        // Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    };
};
