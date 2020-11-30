import React, {useState, useEffect} from 'react';
import './App.css';
import Button from './components/Button';
import LoginInput from './components/LoginInput';
import Card from './components/Card';
import ErrorMessage from './components/ErrorMessage';


const App = () => {

  const [disable, setDisable] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const checkLoginButton = () => setDisable((email.length && password.length) ? false : true);
  const updateEmail = (e:string) => setEmail(e);
  const updatePassword = (e:string) => setPassword(e);
  const checkInputs = () => console.log((checkEmail() && checkPassword()) ? 'All fields are correct.' : 'Something went wrong.');
  const checkEmail = () => {
    const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(emailCheck.test(email)) {
      setEmailErrorMessage('');
      return true;
    }
    else{
      setEmailErrorMessage('Must be an email: email@domain')
      return false;
    }
  }
  const checkPassword = () => {
    const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
    if(passwordCheck.test(password)) {
      setPasswordErrorMessage('');
      return true;
    }
    else{
      setPasswordErrorMessage('Password must be 8 characters long, and contain one of the following: lowercase, uppercase, number and special character.')
      return false;
    }
  }

  useEffect(()=>{
    checkLoginButton();
  })

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
          />
        </Card>
      </header>
    </div>
  );
}

export default App;
