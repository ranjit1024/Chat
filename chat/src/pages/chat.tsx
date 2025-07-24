import { useEffect, useRef, useState } from "react"

export function Chat(){
    const send = useRef<HTMLInputElement>(null);
    const [text,setText] = useState <string[] | undefined>()
    return <div className="flex flex-col  h-[97vh] w-[100vw] justify-end items-center ">
        
        <div className="flex gap-4">
        <input type="text" ref={send} placeholder="enter text" className="w-[90vw] border p-3 rounded-xl" />
            <div 
            onClick={()=>{
                
            }}
            className="p-2 bg-gray-200 rounded-2xl flex hover:cursor-pointer hover:bg-gray-300 ">
            <img width="30" height="" src="https://img.icons8.com/pulsar-line/50/sent.png" alt="sent"/>
            </div>
        </div>
    </div>
}
function Send({text} : {
    text:string | undefined
}){
    return <div className="flex w-[85vw] mb-5  items-end justify-end ">
        <div className="px-3 py-1 rounded-xl text-gray-900 font-medium bg-blue-300">
        {text}

        </div>
    </div>
}
