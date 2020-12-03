import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
		<h2>Welcome Back!</h2>
		<span>You are in Dashboard.</span>
		<Link to="/logout"><button onClick = { ()=> console.log('logout') }>logout</button></Link>
		</>
	)
}

export default Home;