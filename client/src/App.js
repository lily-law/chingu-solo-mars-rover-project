import React, { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import SideBar from './components/SideBar';
import fetchData from './components/fetchData';
import './App.css';

const cameras = {
  "ENTRY": "Entry, Descent, and Landing Camera",
  "FHAZ": "Front Hazard Avoidance Camera",
  "NAVCAM": "Navigation Camera",
  "MAST": "Mast Camera",
  "CHEMCAM": "Chemistry and Camera Complex",
  "MAHLI": "Mars Hand Lens Imager",
  "MARDI": "Mars Descent Imager",
  "RHAZ": "Rear Hazard Avoidance Camera",
  "PANCAM": "Panoramic Camera",
  "MINITES": "Miniature Thermal Emission Spectrometer"
}
const rovers = ['Curiosity', 'Opportunity', 'Spirit'];

function App() {
  const [photoData, setPhotoData] = useState({photos: []});
  const [status, setStatus] = useState();
  const [manifests, setManifests] = useState({});
  const [rover, setRover] = useState('Curiosity');
  const [pagesTotal, setPagesTotal] = useState(0);

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
        const manifest = await getManifest(rover);
        if (manifest) {
          manis[rover] = manifest;
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
      <SideBar {...{setPhotoData, setStatus, status, photoData, manifests, rovers, cameras, rover, setRover, pagesTotal, setPagesTotal}} />
      {photoData.photos.length > 0 && <Gallery {...{photoData, setPhotoData, setStatus, pagesTotal}} />}
    </div>
  );
}

export default App;
