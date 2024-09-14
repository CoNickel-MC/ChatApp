import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Direct from './Direct';
import Login from './Login';
import Register from './Register';

function App() {
  const [user, setUser] = useState("Ad");

  return (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Login setUser={setUser} />} />
			<Route path="/direct" element={<Direct username={user} />} />
			<Route path="/register" element={<Register/>} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
