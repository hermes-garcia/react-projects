import {AppRouter} from './router/AppRouter';
import {AuthProvider} from './auth';

export const HeroesApp = () => {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
};