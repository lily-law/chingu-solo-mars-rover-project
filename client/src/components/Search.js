import React, { useState } from 'react';
import fetchData from './fetchData';

function Search({setPhotoData, setStatus}) {
    const [sol, setSol] = useState(0);
    const [rover, setRover] = useState('Curiosity');
    const [camera, setCamera] = useState('any');

    const cameras = {
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
    const roversCameras = { 
        'Curiosity': ["FHAZ", "NAVCAM", "MAST", "CHEMCAM", "MAHLI", "MARDI", "RHAZ"],
        'Opportunity': ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
        'Spirit' : ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"]
    };
    const handleSubmit = async () => {
        let data = await fetchData(`/api/${rover}?sol=${sol}&camera=${camera}`, setStatus);
        if (data && data.photos) { 
            setPhotoData(data);
        }
    }
   
    return (
        <nav>
            <select value={rover} onChange={e => setRover(e.target.value)}>
                {Object.keys(roversCameras).map(rover => <option key={rover} value={rover}>{rover}</option>)}
            </select>
            <label>
                Sol:
                <input type="number" value={sol} onChange={e => setSol(e.target.value)} />
            </label>
            <label>
                Camera:
                <select value={camera} onChange={e => setCamera(e.target.value)}>
                    <option value='any'>any</option>
                    {roversCameras[rover].map(cam => <option key={cam} value={cam}>{cameras[cam]}</option>)}
                </select>
            </label>
            <button onClick={handleSubmit}>Find Photos</button>
        </nav>
    );
}

export default Search;
