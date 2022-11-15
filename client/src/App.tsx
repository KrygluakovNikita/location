import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [QRCode, setQRCode] = useState<any>('');
  useEffect(() => {
    const getQR = async () => {
      const { data } = await axios.get('http://localhost:8080/api/qr');

      setQRCode(data);
    };
    getQR();
  }, [QRCode]);

  return (
    <div className='container'>
      <p>QR Code</p>
      {QRCode && <img src={QRCode} alt='QR Code'></img>}
    </div>
  );
}

export default App;
