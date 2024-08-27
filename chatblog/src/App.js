import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import Chatroom from './chatroom';
import './App.css';
// ... import other pages

function App() {

  return (
    <Router>
      <div>
        <nav>
          <ul className="navbar" style={{width:"100vw", display:"flex", alignContent:"center", justifyContent:"space-evenly", justifyItems:"center", backgroundColor:"lightblue", listStyleType:"none"}}>
            <li>
              <Link to="/">Home</Link>
            </li>
            
            <li>
              <Link to="/chatroom">Chatroom</Link>
            </li>
          
          </ul>
          
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatroom" element={<Chatroom />} />
          {/* ... other routes */}
        </Routes>
      </div>

    </Router>

  );
}

export default App;