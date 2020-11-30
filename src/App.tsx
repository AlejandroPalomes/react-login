import React, {useState, useEffect} from 'react';
import './App.css';
import Button from './components/Button';
import LoginInput from './components/LoginInput';
import Card from './components/Card';


const App = () => {

  const [disable, setDisable] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkLoginButton = () => setDisable((username.length && password.length) ? false : true);
  const updateUsername = (e:string) => setUsername(e);
  const updatePassword = (e:string) => setPassword(e);
  const checkInputs = () => {
    console.log('inside checkInputs', username, password)
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
            placeholder = 'Username'
            parentFunction = { updateUsername }
          />
          <LoginInput
            hide = { true }
            placeholder = 'Password'
            parentFunction = { updatePassword }
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
