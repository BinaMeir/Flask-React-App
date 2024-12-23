import React, { useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from './constants';

function RegisterForm() {
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(BASE_API_URL+'register', { 
        uid, 
        email, 
        fullname 
      });

      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="uid">UID:</label>
        <input 
          type="text" 
          id="uid" 
          value={uid} 
          onChange={(e) => setUid(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="fullname">Full Name:</label>
        <input 
          type="text" 
          id="fullname" 
          value={fullname} 
          onChange={(e) => setFullname(e.target.value)} 
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;