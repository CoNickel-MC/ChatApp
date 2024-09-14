import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import  { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup';


function Direct({username}){
    const navigate = useNavigate();
    useEffect(() => {
        if(username === "Ad"){
            navigate('/');
        }
    }, []);
    



    
    const [newMessage, setNewMessage] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [senders, setSenders] = useState([]);
	const [receiver, setReceiver] = useState('Choi');
    const [messages, setMessages] = useState([]);
    const [refresher, refresh] = useState(true);
    const newMessageObject = {
        sender: username,
        receiver: receiver,
        content: newMessage
    }


    useEffect(() => {
        const postUser = async () => {
	    	try {
	    	    const response = await axios.post(
	    		    "http://localhost:8080/root/getChats",
	    		    {
	    		        sender: username,
	    		        receiver: receiver
	    		    },
	    		    {
	    	            headers: {
	    		        	"Content-Type": "application/json"
	    		        }
	    		    }
	            );

            const GResponse = response.data.map(message => ({
                sender: message.sender,
                receiver: message.receiver,
                content: message.content
            }));
          
            setMessages(GResponse)
          
	    	} catch (error) {}
	    };
        postUser();
    }, [receiver, refresher]);

    useEffect(() => {
        const getSenders = async () => {
	    	try {
	    	    const response = await axios.post(
	    		    "http://localhost:8080/root/getSenders",
	    		    {
	    		        sender: username,
	    		        receiver: receiver
	    		    },
	    		    {
	    	            headers: {
	    		        	"Content-Type": "application/json"
	    		        }
	    		    }
	            );

          
            setSenders(response.data)
          
	    	} catch (error) {console.error("Error fetching senders:", error);}
	    };
        getSenders();
    }, []);
    
    useEffect(()=>{
        refresh(!refresher);
    },[])

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:8080/root/stream/${username}`);
        
        eventSource.onmessage = (event) => {
            const newIncomingMessage = JSON.parse(event.data);
            if (newIncomingMessage.receiver === username || newIncomingMessage.sender === username) {
                setMessages((prevMessages) => [...prevMessages, newIncomingMessage]);
            }
        };

        eventSource.onerror = () => {
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [username])

    const handleNewMessage = (e) =>{
		e.preventDefault();
        
        if (newMessage !== "") {
            sendMessage(newMessage);
            //refresh(!refresher);
        }
	}

    const sendMessage = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/root/sendChat",
                {
                    sender: username,
                    receiver: receiver,
                    content: newMessage
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        } catch (error) {}


        setNewMessage("");
    }

    const handleSenderChange = (e, sender) =>{
        e.preventDefault();
        
        setReceiver(sender);
        refresh(!refresher);
    }

    const handleInputChange = (e) => {
        setNewUsername(e.target.value); // Properly update newUsername
    };
    const handleStartChat = () => {
        setReceiver(newUsername); // Set the receiver to newUsername to start chat with that user
        setSenders([...senders, newUsername])
        refresh(!refresher); // Trigger a re-render to fetch new chats
    };


    return(
        <>
        
        <div className="leftStatusBar">
        </div>
        <div className="chatsBar">
            <h1 className = "">Chats</h1>
            <div className="all-chats">
                {senders.map((sender) => {
                    return (
                        <div className="Sender" key={sender}>
                            <button onClick={(e) => handleSenderChange(e, sender)}>{sender}</button>
                        </div>
                        );
                    })}
                <Popup trigger=
                    {<button> Click to open popup </button>}
                    position="bottom center">
                    <input value={newUsername} placeholder="Enter Username" onChange={(e) => handleInputChange(e)} />
                    <button onClick={() => handleStartChat()}>Start Chat</button>
            </Popup>

            </div>

        </div>
        <div className="chatting">

            <div className="all-chats">
                {messages.map((message) => {
                    return (
                        <div className="chatMessage">
                            <strong>{message.sender}: </strong>
                            <span>{message.content}</span>
                        </div>
                    )                
            })}
            
            </div>
        

            <div className = "chatBox">
                <input 
                	className="messageInput"
                    placeholder="Username"
                    id="usernameBox"
                    value={newMessage}  
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="sendButton" onClick={handleNewMessage}></button>
            </div>
        </div>
            
            
        </>
    );
}

export default Direct;


