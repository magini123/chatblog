import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import moment from 'moment';

// kobler til server
const socket = io('http://localhost:8080');

function Chat() {
  // state hooks for totalt tilkoblet, array med chatmeldinger, navn, melding input
  const [totalConnected, setTotalConnected] = useState(0);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('unknown');
  const [messageInput, setMessageInput] = useState('');

  // setter opp eventlisteners
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server with id:', socket.id);
    });

    socket.on('total-connected', (data) => {
      console.log('Total connected clients:', data);
      setTotalConnected(data);
    });

    socket.on('chat-message', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection Error:', err);
    });

    // fjerner eventlisteners
    return () => {
      socket.off('connect');
      socket.off('total-connected');
      socket.off('chat-message');
      socket.off('connect_error');
    };
  }, []);

  // håndterer message form
  const handleSubmit = (e) => {
    e.preventDefault();

    // lager message objekt med brukernavn, melding, tidspunkt
    const messageData = {
      name,
      message: messageInput,
      dateTime: new Date()
    };

    
    // hvis objektet er tomt gjør ingenting, for å unngå å sende tomme meldinger
    if (Object.keys(messageData.message).length === 0){
      return;
    } else {
      // sender data til server
      socket.emit('message', messageData);
      // oppdaterer meldinger på siden
      setMessages((prevMessages) => [...prevMessages, messageData]);
    }
    // tømmer message input feltet
    setMessageInput('');
  };

  return (
    <div className="main">
      <h1 className="app-name">Chat app</h1>
      {/* totalt tilkoblet */}
      <h4 className="total-connected">Users connected: {totalConnected}</h4>
      {/* navn felt */}
      <div className="name">
        <p>Username: </p>
        <input
          type="text"
          id="name-input"
          placeholder="Enter name here"
          value={name}
          maxLength="20"
          // oppdaterer navn når endres
          onChange={(e) => setName(e.target.value)} 
          autoComplete='off'
        />
      </div>

      {/* liste av meldinger */}
      <ul className="message-container">
        {messages.map((messageData, index) => (
          <li key={index} className="message">
            <span className="username">from: {messageData.name}</span>
            <p>{messageData.message}</p>
            <span className="date">{moment(messageData.dateTime).fromNow()}</span>
          </li>
        ))}
      </ul>

      {/* meldings form */}
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          className="message-input"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          autoComplete='off'
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default Chat;
