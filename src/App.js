import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Lobbies from './Containers/Lobbies/Lobbies';
import Home from './Containers/Home/Home';
import Lobby from './Containers/Lobby/Lobby';

import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar
      sidebarData={[
        {zIndex: "2",
        name: "Lobbies",
        path: "/lobbies"
        },
        {zIndex: "1",
        name: "Lobby",
        path: "/lobbies/:id"
        }
        ]}/>

        <Routes>
          <Route path="*" element={<Home/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/lobbies" element={<Lobbies/>}/>
          <Route path="/lobbies/:id" element={<Lobby/>}/>

          
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
