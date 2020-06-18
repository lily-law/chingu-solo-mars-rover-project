import React, { useState } from 'react';
import Search from './components/Search';
import Gallery from './components/Gallery';
import fetchData from './components/fetchData';
import './App.css';

function App() {
  const [photoData, setPhotoData] = useState({photos: []});
  const [status, setStatus] = useState();
  const [manifests, setManifests] = useState({});

  useEffect(() => {
    const getManifest = async (rover) => {
      setStatus({requesting: true, message: `Fetching manifest for ${rover}`});
      let data = await fetchData(`/api/manifests/${rover}`, setStatus);
      if (data && data['manifest']) { 
          return data.manifest
      }
    };
    (async () => {
      const manis = {};
      for (let rover of rovers) {
        const manifest = await getManifest(rover.name);
        if (manifest) {
          manis[rover.name] = manifest;
        }
        else {
          return
        }
      }
      setManifests(manis);
    })();
  }, []);
  
  return (
    <div className="App">
      <Search {...{setPhotoData, setStatus}} />
      {photoData.photos.length > 0 && <Gallery {...{photoData, setPhotoData, setStatus}} />}
      <Status {...{status, photoData}} />
    </div>
  );
}

export default App;
