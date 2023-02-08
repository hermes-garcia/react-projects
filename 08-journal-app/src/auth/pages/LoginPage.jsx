import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import {Alert, Button, Grid, Link, TextField, Typography} from '@mui/material';
import {Google} from '@mui/icons-material';
import {useForm} from '../../hooks';
import {AuthLayout} from '../layout/AuthLayout';
import {checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword} from '../../store/auth';

const formData = {
    email: '',
    password: '',
};
export const LoginPage = () => {

    const {status, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const {email, password, handleInputChange} = useForm(formData);

    const isAuthenticating = useMemo( () => status === 'checking', [status] );

    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(startLoginWithEmailPassword({email, password}));
    }

    const handleGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={ handleSubmit } className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="name@email.com"
                            fullWidth
                            name="email"
                            value={ email }
                            onChange={ handleInputChange }
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Password"
                            fullWidth
                            autoComplete="on"
                            name="password"
                            value={ password }
                            onChange={ handleInputChange }
                        />
                    </Grid>

                    <Grid
                        container
                        display={ !!errorMessage ? '' : 'none' }
                        sx={{mt:1}}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{mb:2, mt:1}}>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={isAuthenticating}
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={ handleGoogleSignIn }
                                disabled={isAuthenticating}
                            >
                                <Google />
                                <Typography sx={{ml:1}}>Google</Typography>
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Link component={RouterLink} color="inherit" to="/auth/register">
                            Create account
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    );
};