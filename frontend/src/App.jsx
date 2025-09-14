import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      setToken(res.data.token);
    } catch (err) {
      alert('Login failed');
    }
  };

  const register = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', { email, password });
      alert('Registered successfully!');
    } catch (err) {
      alert('Registration failed');
    }
  };

  const fetchConversations = async () => {
    const res = await axios.get('http://localhost:5000/api/conversations', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setConversations(res.data);
  };

  const saveConversation = async () => {
    await axios.post('http://localhost:5000/api/conversations', 
      { title: 'Chat', messages: [{ text: message }] }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchConversations();
  };

  return (
    <div className="p-4">
      {!token ? (
        <div>
          <h2>Login / Register</h2>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={login}>Login</button>
          <button onClick={register}>Register</button>
        </div>
      ) : (
        <div>
          <h2>Conversations</h2>
          <button onClick={fetchConversations}>Load</button>
          <ul>
            {conversations.map((c) => (
              <li key={c.id}>{c.title}</li>
            ))}
          </ul>
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type message" />
          <button onClick={saveConversation}>Save</button>
        </div>
      )}
    </div>
  );
}

export default App;
