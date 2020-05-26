import React, { useState } from 'react';
import Search from './components/Search';
import Gallery from './components/Gallery';
import Status from './components/Status';
import './App.css';

function App() {
  const [photoData, setPhotoData] = useState({photos: []});
  const [status, setStatus] = useState();
  return (
    <div className="App">
      <Search {...{setPhotoData, setStatus}} />
      {photoData.photos.length > 0 && <Gallery {...{photoData, setPhotoData, setStatus}} />}
      <Status {...{status, photoData}} />
    </div>
  );
}

export default App;
