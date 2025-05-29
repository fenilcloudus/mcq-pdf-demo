import React from 'react';
import { downloadPdf } from './utils/downloadPdf';

// Home Page Component with Download Button
const HomePage = () => {
  return (
    <div
      style={{ height: '100vh' }}
      className="flex items-center justify-center"
    >
      <button
        onClick={downloadPdf}
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        Download Biology PDF
      </button>
    </div>
  );
};

export default HomePage;
