import React from 'react';
import WorldCupApp from './components/WorldCupApp';

export default function App() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      backgroundColor: '#0a0c24',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <WorldCupApp />
    </div>
  );
}
