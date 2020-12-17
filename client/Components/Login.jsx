import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Input } from "@chakra-ui/react";
import '../styles/login.scss'

function Login() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    
    const handleSubmit = (event) => {
        
        event.preventDefault();
        axios({
            method: 'POST',
            url: '/users/signin',
            data: {
                email: email,
                pass: password
            }
        })
        //.then check for status 200 if true redirect to main using react router link
        .then((response) => {
            console.log('the response from signin is', response)
            if (response.status === 200) {
                console.log("we've reached the response status 200");
                //redirect to Main using react route link
                setIsLoggedIn(true);
            }
        })
        .catch(err => {
            if (err) {
                setErrorMsg('Email address or password did not match');
                setEmail('');
                setPassword('');
            }
        })
    }

    return (
        <div className='login'>
            {/* is loggedIn === true --> redirect */}
            {isLoggedIn === true ? 
                <Redirect to="/main" /> : 
                <h1>Log in</h1>
            }
            <form onSubmit={handleSubmit}>
                <label className='label email'>Email:
                    <Input className='input' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }}></Input>
                </label>
                <label className='label'>Password:
                    <Input className='input' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}></Input>
                </label>
                <Input className='submit' type="submit" value="Sign In">
                </Input>
            </form>
            <Link to="/signup" className='signUpLink'>Sign Up</Link>
            <p>{errorMsg}</p>
        </div>
    )
}

export default Login;

