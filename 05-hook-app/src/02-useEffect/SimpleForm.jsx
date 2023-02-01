import {useEffect, useState} from 'react';
import {Message} from './Message';

export const SimpleForm = () => {

    const [formState, setFormState] = useState({
        username: 'hermes',
        email: 'hermes@hermesgarcia.com'
    });

    const {username, email} = formState;

    const handleInputChange = ({target}) => {
        const {name, value} = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    useEffect(() => {
        //console.log('useEffect called')
    },[])

    useEffect(() => {
        //console.log('formState changed')
    },[formState])

    useEffect(() => {
        //console.log('email changed')
    },[email])

    return (
        <>
            <h1>Simple Form</h1>
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

            {
                username === 'hermes2' &&<Message />
            }
        </>
    );
};