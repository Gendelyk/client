'use client';

import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react'

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault()
    // router.push('/');  

    const res = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }); 

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/');      
    } else {
      setError(data.message);
    }    
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Enter</button>
    </form>
  )
}
