import { Redirect } from "react-router-dom";
import cityImage from "../assets/img/cityImage.svg"
// import React, { useState, useEffect, useContext } from 'react';  //? to use with react context
import React, { useState, useEffect } from 'react';
import {MainWrapper, ImageWrapper, FormWrapper, LogoContainer, StyledLogo, Name, StyledSpan, StyledLink, StyledLink2} from './styles/LoginStyles';
// import '../App.css';
import Button from './Button';
import Card from './Card';
import ErrorMessage from './ErrorMessage';
import Input from './Input';
import { EMAIL, PASSWORD, TOKEN } from '../constants'

// import authContext from '../auth-context'; //? to use with react context


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

    const updateEmail = (e: string) => setEmail(e);
    const updatePassword = (e: string) => setPassword(e);
    const handleLoginClick = () => {
        if (checkEmail() && checkPassword()) mockedApiResponse()
    };

    const checkEmail = () => {
        const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (emailRegEx.test(email)) {
            setEmailErrorMessage('');
            return true;
        }
        setEmailErrorMessage('Must be an email: email@domain')
        return false;
    }

    const checkPassword = () => {
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

        if (passwordRegEx.test(password)) {
            setPasswordErrorMessage('');
            return true;
        }
        setPasswordErrorMessage('Conditions: 8 char long, 1 lowercase, 1 uppercase, 1 number & 1 special character.')
        return false;
    }

    const mockedApiResponse = () => {
        setWaitingResponse(true);
        setDisable(true);

        new Promise((resolve, reject) => {

                const mockResponse = {
                    newToken: TOKEN
                }

                setTimeout(() => {
                    if (email === EMAIL) password === PASSWORD ? resolve(mockResponse) : reject('pwd');
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
        setDisable((email.length && password.length) ? false : true);
        // setLoginButtonAvailability();
        // let isMounted = true;
        // if(isMounted) setLoginButtonAvailability();
        // return () =>{ isMounted = false};    //* This function is executed when component unmounts
    }, [email, password])

    return (
        <MainWrapper>
            <ImageWrapper>
                <h3>all your needs in one place</h3>
                <img
                    src= {cityImage}
                    alt="City connected"
                    width = "100%"
                />
            </ImageWrapper>
            <FormWrapper>
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
                        <Input
                            hide = { false }
                            placeholder = 'Email'
                            updateValue = { updateEmail }
                        />
                        <ErrorMessage
                            message = { emailErrorMessage }
                        />
                        <Input
                            hide = { true }
                            placeholder = 'Password'
                            updateValue = { updatePassword }
                        />
                        <ErrorMessage
                        message = { passwordErrorMessage }
                        />
                        <Button
                            isDisabled = { disable }
                            buttonText = 'Login'
                            onClick = { handleLoginClick }
                            isLoading = { waitingResponse }
                        />
                        <StyledLink2 to = "/forgotten">Forgot password?</StyledLink2>
                    </Card>
                    <Card
                        width = { 410 }
                        padding = { 20 }
                    >
                        <StyledSpan>New user? <StyledLink to = "/signup">Register here</StyledLink></StyledSpan>
                    </Card>
            </FormWrapper>
        </MainWrapper>
    );
}

export default Login;