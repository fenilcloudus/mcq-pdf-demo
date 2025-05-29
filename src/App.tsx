import { downloadPdf } from './utils/downloadPdf';

const HomePage = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f9fafb', // very light gray
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
        boxSizing: 'border-box',
        gap: '40px',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          fontWeight: '700',
          color: '#1f2937', // dark slate gray
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Download Your Question Paper PDF
      </h1>

      <button
        onClick={downloadPdf}
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '16px 40px',
          borderRadius: '12px',
          fontSize: '20px',
          fontWeight: '700',
          boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
          border: 'none',
          minWidth: '280px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#1e40af';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(30, 64, 175, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#2563eb';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
        }}
      >
        Download Now
      </button>
    </div>
  );
};

export default HomePage;
