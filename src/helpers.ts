import { EMAIL, PASSWORD, TOKEN } from './constants'

export const checkEmail = (email:string, callback:Function) => {
    const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (emailRegEx.test(email)) {
        callback('');
        return true;
    }
    callback('Must be an email: email@domain')
    return false;
}

export const checkPassword = (password:string, callback:Function) => {
    const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

    if (passwordRegEx.test(password)) {
        callback('');
        return true;
    }
    callback('Conditions: 8 char long, 1 lowercase, 1 uppercase, 1 number & 1 special character.')
    return false;
}

export const mockedApiResponse = (email:string, password:string) => {
    return new Promise((resolve, reject) => {

            const mockResponse = {
                newToken: TOKEN
            }

            setTimeout(() => {
                if (email === EMAIL) password === PASSWORD ? resolve(mockResponse) : reject('pwd');
                else reject('user');
            }, 1250);
        })
}