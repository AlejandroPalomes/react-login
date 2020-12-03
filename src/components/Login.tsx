import { Redirect, Link } from "react-router-dom";
import Connect from "../assets/img/connect.svg"
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

const MainWrapper = styled.div`
width: 100vw;
min-height: 100vh;
display: flex;
justify-content: space-between;
align-items: center;
`;

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    z-index: -1;
    position: absolute;
    max-width: 100vw;
    flex-grow: 1;
    height: 100vh;
    opacity: 0.3;

    h3{
        display: none;
        font-family: "Permanent";
        font-size: 68px;
        color: rgb(109, 104, 255);
        text-align: center;
    }

    img{
        width: 1500px;
        margin-bottom: 0;
    }

    @media (min-width: 992px){
        justify-content: center;
        margin-left: 50px;
        opacity: 1;
        position: relative;

        h3{
            display: block;
        }

        img{
            display: none;
        }
    }

    @media (min-width: 1211px){
        justify-content: space-between;

        h3{
            font-size: 100px;
            margin: 100px 0 0 0;
        }

        img{
            display: block;
            width: 100%;
            margin-bottom: 10px;
        }
    }
`;

const FormWrapper = styled.div`
    width: 100%;
    min-width: 355px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 992px){
        width: 30%;
        align-items: space-between;
        margin: 0 50px;
    }
`;

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
    text-align: center;
`;

const StyledLink = styled(Link)`
    color: rgb(109, 104, 255);
    font-weight: bold;
    text-decoration: none;
`;

const StyledLink2 = styled(Link)`
    margin-top: 15px;
    color: rgb(109, 104, 255);
    font-weight: light;
    font-size: 12px;
    text-align: center;
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
        <MainWrapper>
            <ImageWrapper>
                <h3>all your needs in one place</h3>
                <img
                    src= {Connect}
                    alt="City connected"
                    width = "100%"
                />
            </ImageWrapper>
            <FormWrapper>
                { redirect && <Redirect to="/" /> }
                {/* <div> */}
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
                        <StyledLink2 to = "/forgotten">Forgot password?</StyledLink2>
                    </Card>
                    <Card
                        width = { 410 }
                        padding = { 20 }
                    >
                        <StyledSpan>New user? <StyledLink to = "/signup">Register here</StyledLink></StyledSpan>
                    </Card>
                {/* </div> */}
            </FormWrapper>
        </MainWrapper>
    );
}

export default Login;