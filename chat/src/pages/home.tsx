import  { useState, useRef }  from "react";

interface Message {
  from: string,
  text: string
}

export function Home(){
  const [userId, setUserid] = useState('');
  const [connectd, setConnectd] = useState(false);
  const [toUserid, setTouserId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const connectWebSocket = () =>{
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () =>{
      socket.send(JSON.stringify({type:'register', userId}));
      setConnectd(true);
    }
    
    
  }
  return <div>
    
  </div>
}