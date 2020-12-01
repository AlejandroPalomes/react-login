import React, {useState, useEffect} from 'react';
import './App.css';
import Button from './components/Button';
import LoginInput from './components/LoginInput';
import Card from './components/Card';
import ErrorMessage from './components/ErrorMessage';


const App = () => {

  const [disable, setDisable] = useState(true);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  interface ServerResponse {
    name: string,
    surname: string,
    jwt: string
  }

  const checkLoginButton = () => setDisable((email.length && password.length) ? false : true);
  const updateEmail = (e:string) => setEmail(e);
  const updatePassword = (e:string) => setPassword(e);
  const checkInputs = () => { if(checkEmail() && checkPassword()) requestUser() };

  const checkEmail = () => {
    const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(emailRegEx.test(email)) {
      setEmailErrorMessage('');
      return true;
    }
    else{
      setEmailErrorMessage('Must be an email: email@domain')
      return false;
    }
  }

  const checkPassword = () => {
    const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

    if(passwordRegEx.test(password)) {
      setPasswordErrorMessage('');
      return true;
    }
    else{
      setPasswordErrorMessage('Password must be 8 characters long, and contain one of the following: lowercase, uppercase, number and special character.')
      return false;
    }
  }

  const requestUser = () => {
    setWaitingResponse(true);
    setDisable(true);

    new Promise((resolve, reject) => {

      const mockResponse = {
        name: 'John',
        surname: 'Appleseed',
        jwt: 'ahdGFr59HfYn4j8S'
      }

      setTimeout(() => {
        if(email === 'admin@email.com') password === 'Pa$$w0rd' ? resolve(mockResponse) : reject('pwd');
        else reject('user');
      }, 1250);
    })
    .then((e:any) => handleResponse(e))
    .catch(e => handleServerError(e));
  }

  const handleResponse = ({jwt, ...user}:ServerResponse) => {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));

    setWaitingResponse(false);
    setDisable(false);
  }

  const handleServerError = (message:string) => {
    if(message === 'user') setEmailErrorMessage('User not found.');
    else if(message === 'pwd') setPasswordErrorMessage('Sorry, wrong password.');
    else console.log(message);

    setWaitingResponse(false);
    setDisable(false);
  }

  useEffect(()=>{
    checkLoginButton();
  }, [email, password])

  return (
    <div className="App">
      <header className="App-header">
        <Card
          width = { 410 }
        >
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
      </header>
    </div>
  );
}

export default App;
