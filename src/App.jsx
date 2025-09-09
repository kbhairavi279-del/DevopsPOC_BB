import React, { useState } from 'react';
import './App.css';
import Menu from './Menu';
import ExcelUpload from './ExcelUpload';

function App() {
  const [page, setPage] = useState('upload');

  return (
    <div>
      <Menu onSelect={setPage} />
      {page === 'upload' && <ExcelUpload />}
    </div>
  );
}

export default App;
