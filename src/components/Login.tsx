import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import Button from './Button';
import { checkEmail, checkPassword, mockedApiResponse } from '../helpers'
import cityImage from "../assets/img/cityImage.svg"
import Card from './Card';
import ErrorMessage from './ErrorMessage';
import Input from './Input';
import { MainWrapper, ImageWrapper, FormWrapper, LogoContainer, StyledLogo, Name, StyledSpan, StyledLink, StyledLink2 } from './styles/LoginStyles';

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

    interface ServerResponse {
        newToken: string
    }

    useEffect(() => {
        setDisable((email.length && password.length) ? false : true);
    }, [email, password]);

    const updateEmail = (value: string) => setEmail(value);
    const updatePassword = (value: string) => setPassword(value);
    const handleLoginClick = () => {
        if (checkEmail(email, setEmailErrorMessage) && checkPassword(password, setPasswordErrorMessage)){
            setWaitingResponse(true);
            setDisable(true);
            mockedApiResponse(email, password)
                .then((data: any) => handleResponse(data))
                .catch(err => handleServerError(err))
                .finally(() => {
                    setWaitingResponse(false);
                    setDisable(false);
                })
        }
    };

    const handleResponse = ({ newToken }: ServerResponse) => {
        setToken(newToken);
        setRedirect(true);
    }

    const handleServerError = (message: string) => {
        if (message === 'user') setEmailErrorMessage('User not found.');
        else if (message === 'pwd') setPasswordErrorMessage('Sorry, wrong password.');
    }

    return redirect ? <Redirect to="/" data-testid="1"/> : (
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