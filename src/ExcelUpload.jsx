import React, { useState } from 'react';

export default function ExcelUpload() {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/excel-to-json', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to process file');
      const data = await res.json();
      setJsonData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!jsonData) return;
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'excel-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      {loading && <p>Processing...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {jsonData && (
        <>
          <button onClick={handleDownload}>Download JSON</button>
          <pre style={{ maxHeight: 300, overflow: 'auto', background: '#fafafa', padding: '1rem', border: '1px solid #eee' }}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
