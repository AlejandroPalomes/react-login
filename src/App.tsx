import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

import GlobalFonts from './fonts/fonts';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import { TOKEN } from './constants'

const checkAuth = (token:string | null) =>{
	if (token === TOKEN) return true
	localStorage.removeItem('token');
	return false;
}

const clearToken = (item:string, setToken:Function)=>{
	setToken('');
	localStorage.removeItem(item);
	return <Redirect to="/login"/>;
};

const App = () => {
	const savedToken = localStorage.getItem('token');
	const [token, setToken] = useState(savedToken);

	useEffect(()=>{
		if(token) localStorage.setItem('token', token);
	}, [token]);

	return (
		<Router>
			<div>
				<GlobalFonts />
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
			</div>
		</Router>
	);
};

export default App;

