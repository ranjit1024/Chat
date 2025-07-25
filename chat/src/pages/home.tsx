import { useState, useRef } from "react";

interface Message {
  from: string;
  text: string;
}

export function Home() {
  const [userId, setUserid] = useState("");
  const [connected, setconnected] = useState(false);
  const [toUserid, setTouserId] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "register", userId }));
      setconnected(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, { from: data.from, text: data.text }]);
      console.log(messages);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socketRef.current = socket;
  };

   const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'send',
          to: toUserid,
          text: messageText,
        })
      );
      setMessages((prev) => [...prev, { from: 'Me', text: messageText }]);
      setMessageText('');
    }
  };
  return (
   <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>🟢 WebSocket Chat</h2>
  {
    !connected ? (
      <div className="flex flex-col justify-center mt-10">
        <span>Welcome to chat Application</span>
        <input value={userId} onChange={(e)=>{
          setUserid(e.target.value)
        }} type="text" placeholder="Enter your userId " className="m-3 border p-2 rounded-2xl" name="" id="" />
        <button onClick={connectWebSocket} className="px-5 py-2 bg-indigo-500 rounded-2xl text-white">Connect</button>
      </div>
    ):(
      <div className="flex justify-center flex-col ">
         <input value={toUserid} onChange={(e)=>{
          setTouserId(e.target.value)
        }} type="text" placeholder="Enter Sender userId " className="m-3 border p-2 rounded-2xl" name="" id="" />
         <input value={messageText} onChange={(e)=>{
          setMessageText(e.target.value)
        }} type="text" placeholder="Enter Message" className="m-3 border p-2 rounded-2xl" name="" id="" />

        <button onClick={sendMessage} className="px-5 py-2 bg-indigo-500 rounded-2xl text-white">send</button>

          <div style={{ marginTop: 20 }} >
            <h4>Messages:</h4>
            {messages.map((msg, i) => (
              <div key={i}>
                <strong>{msg.from}:</strong> {msg.text}
              </div>
            ))}
          </div>
      </div>
    )
  }
  </div>
)
};

