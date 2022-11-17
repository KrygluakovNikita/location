import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const QRCode = () => {
  const [QRCode, setQRCode] = useState(null);
  useEffect(() => {
    const getQR = async () => {
      const { data } = await axios.get('http://localhost:8080/api/game/0e053579-9119-4895-82c2-304f54216644', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im5pY2tuYW1lIjoibmlraXRrYSIsImlzQWN0aXZhdGVkIjp0cnVlLCJlbWFpbCI6Im5pa2l0a2FkaTIwMTlAZ21haWwuY29tIiwidXNlcklkIjoiYmNiNWVmNjYtZmUxNi00NjQyLTgzZmItMTM3Y2YwZGRlMzc0Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY2ODUwNzY1MCwiZXhwIjoxNjY4NTY1MjUwfQ.hw63Hz06vUyPBcvp39bkG6bip-ug3Sfm3SI2i5vYmW4',
        },
      });

      setQRCode(data.qrCode);
    };
    getQR();
  }, []);

  return (
    <div className='container'>
      <p>QR Code</p>
      {QRCode && <img src={QRCode} alt='QR Code'></img>}
    </div>
  );
};
