
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Login from '../Login';

describe('Login Component test suite', () => {


    const getter = 'property';
    const setter = jest.fn();
    const defaultProps = [getter, setter];
    const component = (
        <Router>
            <Login setToken={defaultProps}/>
        </Router>
    )
    const setup = () => render(component);

    it('Renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(component, div);
        ReactDOM.unmountComponentAtNode(div)
    })

    it('Should match snapshot', () => {
        const { container } = setup();
        expect(container).toMatchSnapshot();
    })

    it('Should return error message on email when it is not an email', async ()=>{
        const { getByText, getByPlaceholderText } = setup();
        const loginButton = getByText('Login');
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        fireEvent.change(emailInput, { target: { value: '23' } })
        fireEvent.change(passwordInput, { target: { value: '23' } })
        fireEvent.click(loginButton)

        expect(getByText('Must be an email: email@domain')).toBeDefined();
    })

    it('Should return error message on password when it does not match all conditions', async ()=>{
        const { getByText, getByPlaceholderText } = setup();
        const loginButton = getByText('Login');
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        fireEvent.change(emailInput, { target: { value: 'admin@email.com' } })
        fireEvent.change(passwordInput, { target: { value: '23' } })
        fireEvent.click(loginButton)

        expect(getByText('Conditions: 8 char long, 1 lowercase, 1 uppercase, 1 number & 1 special character.')).toBeDefined();
    })

    it('Should return error message on email when user not found', async ()=>{

        const { getByText, getByPlaceholderText } = setup();
        const loginButton = getByText('Login');
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'user@email.com' } })
        fireEvent.change(passwordInput, { target: { value: 'Pa$$w0rd' } })
        fireEvent.click(loginButton)

        await waitFor(()=>{
            expect(getByText('User not found.')).toBeDefined();
        }, {timeout: 2000})
    })

    it('Should return error message on password when user found but password is not correct', async ()=>{

        const { getByText, getByPlaceholderText } = setup();
        const loginButton = getByText('Login');
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'admin@email.com' } })
        fireEvent.change(passwordInput, { target: { value: 'Pa$$w0rdddd' } })
        fireEvent.click(loginButton)

        await waitFor(()=>{
            expect(getByText('Sorry, wrong password.')).toBeDefined();
        }, {timeout: 2000})
    })

    it('Should give access if correct email and password', async ()=>{

        const { getByText, getByPlaceholderText, queryByText } = setup();
        const loginButton = getByText('Login');
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'admin@email.com' } })
        fireEvent.change(passwordInput, { target: { value: 'Pa$$w0rd' } })
        fireEvent.click(loginButton)

        await waitFor(()=>{
            expect(queryByText('Sorry, wrong password.')).toBeNull();
            expect(queryByText('User not found.')).toBeNull();
        }, {timeout: 2000})
    })
});