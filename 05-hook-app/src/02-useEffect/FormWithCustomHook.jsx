import {useForm} from '../hooks/useForm';

export const FormWithCustomHook = () => {

    const {username, email, password, handleInputChange, handleResetForm} = useForm({
        username: '',
        email: '',
        password: ''
    });


    return (
        <>
            <h1>Form With Custom Hook</h1>
            <hr/>

            <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleInputChange}
            />

            <input
                type="email"
                className="form-control mt-2 mb-2"
                placeholder="test@example.com"
                name="email"
                value={email}
                onChange={handleInputChange}
            />

            <input
                type="password"
                className="form-control mt-2 mb-2"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
            />

            <button className="btn btn-primary" onClick={handleResetForm}>Reset</button>

        </>
    );
};