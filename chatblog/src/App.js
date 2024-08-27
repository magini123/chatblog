import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import About from './About';
import Chatroom from './chatroom';


// ... import other pages
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about" onClick="socket.on('connection', onConnected)">About</Link>
            </li>
            <li>
              <Link to="/chatroom">Chatroom</Link>
            </li>
            {/* ... other links */}
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/chatroom" element={<Chatroom />}
 />
          {/* ... other routes */}
        </Routes>
      </div>

    </Router>

  );
}

export default App;