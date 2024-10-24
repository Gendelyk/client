'use client';

export default function HomePage() {
  console.log(localStorage.getItem('token'));
  return (
    <h1 style={{textAlign: 'center'}}>Welcome to Gendelyk</h1>
  );
}