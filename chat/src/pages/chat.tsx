import { useEffect, useRef, useState } from "react";
interface Message {
  from: string;
  text: string;
}
export function Chat() {
  const socket = new WebSocket("ws://localhost:3000");

  const send = useRef<HTMLInputElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const [text, setText] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");


  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "send",
          to: 1212,
          text: messageText,
        })
      );
      setText((prev) => [...prev, { from: "Me", text: messageText }]);
      setMessageText("");
    }
  };
 
  return (
    <div className="flex flex-col  h-[97vh] w-[100vw] justify-end items-center ">
      <div className="flex gap-4">
        <input
          type="text"
          ref={send}
          placeholder="enter text"
          className="w-[90vw] border p-3 rounded-xl"
          onChange={(e) => {
            setMessageText(e.target.value);
          }}
        />
        <div
          onClick={sendMessage}
          className="p-2 bg-gray-200 rounded-2xl flex hover:cursor-pointer hover:bg-gray-300 "
        >
          <img
            width="30"
            height=""
            src="https://img.icons8.com/pulsar-line/50/sent.png"
            alt="sent"
          />
        </div>
      </div>
    </div>
  );
}
function Send({ text }: { text: string | undefined }) {
  return (
    <div className="flex w-[85vw] mb-5  items-end justify-end ">
      <div className="px-3 py-1 rounded-xl text-gray-900 font-medium bg-blue-300">
        {text}
      </div>
    </div>
  );
}
