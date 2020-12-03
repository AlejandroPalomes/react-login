// import authContext from './auth-context'; //? to use with react context
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import GlobalFonts from './fonts/fonts';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
// import React,{ useState, useContext } from 'react'; //? to use with react context
import React, { useEffect, useState } from 'react';
import './App.css';

const checkAuth = (token:string | null) =>{
	if (token === 'ahdGFr59HfYn4j8S') return true
	else{
		localStorage.removeItem('token');
		return false;
	}
}

const clearToken = (item:string, setToken:Function)=>{
	console.log('inside clearToken')
	setToken('');
	localStorage.removeItem(item);
	return <Redirect to="/login"/>;
};

const App = () => {
	// const {token, setToken} = useContext(authContext); //? to use with react context
	const savedToken = localStorage.getItem('token');
	const [token, setToken] = useState(savedToken);

	useEffect(()=>{
		if(token) localStorage.setItem('token', token);
	}, [token]);

	return (
		<Router>
			<div>
				<GlobalFonts />
				{/* <authContext.Provider //? to use with react context
					value = {{ token, setToken, clearToken }}
				> */}
				<Switch>
					<Route exact path="/">
						{()=>checkAuth(token) ? <Redirect to="/dashboard"/> : <Redirect to="/login"/>}
					</Route>
					<Route exact path="/dashboard">
						{()=>checkAuth(token) ? <Home /> : <Redirect to="/login"/>}
					</Route>
					<Route exact path="/login">
						{()=>checkAuth(token) ? <Redirect to="/dashboard"/> : <Login setToken = {setToken}/>}
					</Route>
					<Route exact path="/logout">
						{()=>checkAuth(token) ? clearToken('token', setToken) : <Redirect to="/login"/>}
					</Route>
					<Route component = { NotFound } />
				</Switch>
				{/* </authContext.Provider> */}
			</div>
		</Router>
	);
};

// function Home() {
// 	return (
// 		<>
// 		<h2>Welcome Back!</h2>
// 		<span>You are in Dashboard.</span>
// 		<Link to="/logout"><button onClick = { ()=> console.log('logout') }>logout</button></Link>
// 		</>
// 	)
// }

export default App;

