import axios from "axios";
import { CodeSquare } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export const Home  = () => {
  const userid = useRef<HTMLInputElement | null>(null);
  const route = useNavigate()
  return <div  className='flex justify-center flex-col gap-5 h-[100vh] items-center'>
    <input ref={userid} className='w-[90vw] border p-2 rounded-xl  ' placeholder='Enter user id'></input>
    <button className='p-2 bg-indigo-500 rounded-xl text-gray-100 hover:cursor-pointer ' onClick={async ()=>{
      try{
        const response  =  await axios.post('http://localhost:3000/connect',{
          userId:String(userid.current?.value)
        });
        if(response.status === 200){
          route('/chat')
        }
       
      }
      catch(error){
        console.log(error)
      }
    }}>Connect</button>
  </div>
};


