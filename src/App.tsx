import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/Login';
import NotFound from './components/NotFound';
import React from 'react';
import './App.css';

const App = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route path="/dashboard">
						<Home />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route component = { NotFound } />
				</Switch>
			</div>
		</Router>
	);
};

function Home() {
	return <h2>Home</h2>;
}

export default App;

