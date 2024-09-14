import axios from "axios";
import { useState } from "react";
import  { useNavigate } from 'react-router-dom'
import RightPanel from "./RightPanel";

function Register() {

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
			"http://localhost:8080/root/addUser",
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
			setMessage("Registered!");
			console.log("Registered!");
			setTimeout(console.log("hehe"), 1500);
			return (
				navigate('/')
			)


		  } else {
			setMessage("Username already exists");
			console.log("Username already exists");
		  }
		} catch (error) {
		  setMessage("Error logging in");
		  console.error("Error:", error);
		}
	  };

	return (
		<><div className="LoginBar">
            <div className="topbar">
                <div />
            </div>

            <h4 className="Loginwrite">Register</h4>

            <form>
                <input
                    className="usernameInput"
                    placeholder="Username"
                    id="usernameBox"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <input
                    className="usernameInput"
                    placeholder="Password"
                    id="passwordBox"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <button className="submit" onClick={handleClick}>
                    Submit
                </button>

                <p>{message}</p>
            </form>
        </div><RightPanel /></>
	);
}

export default Register;
