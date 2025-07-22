
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Chat } from './pages/chat';
function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/chat' element={<Chat/>}/>
    
    </Routes>
    </BrowserRouter>
  )
}

export default App
  