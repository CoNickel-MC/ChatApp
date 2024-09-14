import axios from "axios";
import { useState } from "react";
import  { useNavigate } from 'react-router-dom'

function LeftPanel({setUser}) { //Left side of login Page

	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	
	const handleClick = (e) =>{
		e.preventDefault();
		setMessage("Waiting...");
		console.log("Waiting...");
		console.log(username, password)
		postUser();
	}


	const postUser = async () => {
		try {
		  const response = await axios.post(
			"http://localhost:8080/root/login",
			{
			  username: username,
			  password: password
			},
			{
			  headers: {
				"Content-Type": "application/json"
			  }
			}
		  );
	
		  // Handle successful login response
		  if (response.data) {
			setMessage("Login successful!");
			console.log("Login successful!");
			await new Promise(resolve => setTimeout(resolve, 500));
			setUser(username);
			navigate('/direct');



		  } else {
			setMessage("Invalid username or password");
			console.log("Invalid username or password");
		  }
		} catch (error) {
		  setMessage("Error logging in");
		  console.error("Error:", error);
		}
	  };

	return (
		<div className="LoginBar">
			<div className="topbar">
				<div />
			</div>

			<h4 className="Loginwrite">Login</h4>

			<form>
				<input
					className="usernameInput"
					placeholder="Username"
					id="usernameBox"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<input
					className="usernameInput"
					placeholder="Password"
					id="passwordBox"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				

				<button className="submit" onClick={handleClick}>
					Submit
				</button>
				<h5>No Account? <a href="/register">Create one</a></h5>


				<p>{message}</p>
			</form>
		</div>
	);
}

export default LeftPanel;
