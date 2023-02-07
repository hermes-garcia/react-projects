import {AuthContext} from './AuthContext';
import {useReducer} from 'react';
import {authReducer} from './authReducer';
import {types} from '../types/types';

const initialState = {
    logged: false,
};

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        logged: !!user,
        user,
    };
};

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, initialState, init);

    const handleLogin = (name = '') => {
        const action = {
            type: types.login,
            payload: {
                id: 'ABC',
                name
            }
        }
        localStorage.setItem('user', JSON.stringify(action.payload));
        dispatch( action );
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        const action = { type: types.logout };
        dispatch( action );
    };

    return (
        <AuthContext.Provider value={{
            ...authState,
            login: handleLogin,
            logout: handleLogout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};