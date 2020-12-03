import { Redirect, Link } from "react-router-dom";
// import React, { useState, useEffect, useContext } from 'react';  //? to use with react context
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import '../App.css';
import Button from './Button';
import LoginInput from './LoginInput';
import Logo from './Logo';
import Card from './Card';
import ErrorMessage from './ErrorMessage';

// import authContext from '../auth-context'; //? to use with react context

const LogoContainer = styled.div`
    margin-bottom: 50px;
    padding-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledLogo = styled(Logo)`
    display: none;

    @media(min-width: 375px){
        display: inline;
    }
`;

const Name = styled.h1`
    font-size: 60px;
    font-family: "Permanent";
    color: rgb(109, 104, 255);
    margin: 0 0 0 10px;
`;

const StyledSpan = styled.span`
    font-size: 18px;
    color: rgb(22, 30, 46);
`;

const StyledLink = styled(Link)`
    color: rgb(109, 104, 255);
    font-weight: bold;
    text-decoration: none;
`;

interface props {
    setToken: Function
}

const Login = ({setToken}:props) => {

    const [disable, setDisable] = useState(true);
    const [email, setEmail] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [waitingResponse, setWaitingResponse] = useState(false);
    // const {token, setToken, clearLocalStorage} = useContext(authContext); //? to use with react context

    interface ServerResponse {
        newToken: string
    }

    const checkLoginButton = () => setDisable((email.length && password.length) ? false : true);
    const updateEmail = (e: string) => setEmail(e);
    const updatePassword = (e: string) => setPassword(e);
    const checkInputs = () => {
        if (checkEmail() && checkPassword()) requestUser()
    };

    const checkEmail = () => {
        const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (emailRegEx.test(email)) {
            setEmailErrorMessage('');
            return true;
        } else {
            setEmailErrorMessage('Must be an email: email@domain')
            return false;
        }
    }

    const checkPassword = () => {
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

        if (passwordRegEx.test(password)) {
            setPasswordErrorMessage('');
            return true;
        } else {
            setPasswordErrorMessage('Conditions: 8 char long, 1 lowercase, 1 uppercase, 1 number & 1 special character.')
            return false;
        }
    }

    const requestUser = () => {
        setWaitingResponse(true);
        setDisable(true);

        new Promise((resolve, reject) => {

                const mockResponse = {
                    newToken: 'ahdGFr59HfYn4j8S'
                }

                setTimeout(() => {
                    if (email === 'admin@email.com') password === 'Pa$$w0rd' ? resolve(mockResponse) : reject('pwd');
                    else reject('user');
                }, 1250);
            })
            .then((e: any) => handleResponse(e))
            .catch(e => handleServerError(e));
    }

    const handleResponse = ({ newToken }: ServerResponse) => {
        setToken(newToken);
        setWaitingResponse(false);
        setDisable(false);
        setRedirect(true);
    }

    const handleServerError = (message: string) => {
        if (message === 'user') setEmailErrorMessage('User not found.');
        else if (message === 'pwd') setPasswordErrorMessage('Sorry, wrong password.');
        else console.log(message);

        setWaitingResponse(false);
        setDisable(false);
    }

    useEffect(() => {
        checkLoginButton();
        // let isMounted = true;
        // if(isMounted) checkLoginButton();
        // return () =>{ isMounted = false};    //* This function is executed when component unmounts
    }, [email, password])

    return (
        <div className = "App">
            <header className = "App-header">
                { redirect && <Redirect to="/" /> }
                <Card
                    width = { 410 }
                    padding = { 50 }
                >
                    <LogoContainer>
                        <StyledLogo
                            size = { 75 }
                        />
                        <Name>ukiyo</Name>
                    </LogoContainer>
                    <LoginInput
                        hide = { false }
                        placeholder = 'Email'
                        parentFunction = { updateEmail }
                    />
                    <ErrorMessage
                        message = { emailErrorMessage }
                    />
                    <LoginInput
                        hide = { true }
                        placeholder = 'Password'
                        parentFunction = { updatePassword }
                    />
                    <ErrorMessage
                    message = { passwordErrorMessage }
                    />
                    <Button
                        disabled = { disable }
                        content = 'Login'
                        buttonAction = { checkInputs }
                        isLoading = { waitingResponse }
                    />
                </Card>
                <Card
                    width = { 410 }
                    padding = { 20 }
                >
                    <StyledSpan>New user? <StyledLink to = "/signup">Register here</StyledLink></StyledSpan>
                </Card>
            </header>
        </div>
    );
}

export default Login;