import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import {Alert, Button, Grid, Link, TextField, Typography} from '@mui/material';
import {AuthLayout} from '../layout/AuthLayout';
import {useForm} from '../../hooks';
import {startCreatingUserWithEmailPassword} from '../../store/auth';

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [ (value) => value.includes('@') , 'Email must have an @'],
    password: [ (value) => value.length >= 6 , 'Password must have more than 5 characters'],
    displayName: [ (value) => value.length >= 1 , 'Name is required'],
};

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {status, errorMessage} = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

    const {
        formState, displayName, email, password, handleInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid,
    } = useForm(formData, formValidations);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setFormSubmitted(true);
        if ( !isFormValid ) return;

        dispatch( startCreatingUserWithEmailPassword(formState) )
    };

    return (
        <AuthLayout title="Register">
            <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Full name"
                            type="text"
                            placeholder="Your name"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={handleInputChange}
                            error={ !!displayNameValid && formSubmitted }
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="name@email.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            error={ !!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Password"
                            autoComplete="on"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            error={ !!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb:2, mt:1}}>
                        <Grid
                            item
                            xs={12}
                            display={ !!errorMessage ? '' : 'none' }
                        >
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={isCheckingAuthentication}
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{mr:1}}>Do you have an account?</Typography>
                        <Link component={RouterLink} color="inherit" to="/auth/login">
                            Login
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    );
};