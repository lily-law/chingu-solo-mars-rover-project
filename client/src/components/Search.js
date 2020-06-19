import React, { useState, useEffect } from 'react';
import fetchData from './fetchData';
import './Search.css';

const handleSetSol = (e, {manifests, rover, sol, setSol}) => {
    const photoData = manifests[rover] && manifests[rover].photos;
    const nearest = photoData && findNextNearest(e.target.value, sol, photoData.map(p => p.sol));
    Number.isInteger(nearest) && setSol(nearest);
}

function Search({setPhotoData, status, setStatus, manifests, rovers, cameras, rover, setRover, setPagesTotal}) {
    const [sol, setSol] = useState(0);
    const [camera, setCamera] = useState('any');
    const [availableCameras, setAvailableCameras] = useState([]);

    const handleSubmit = async () => {
        if (manifests[rover]) {
            setStatus({requesting: true, message: `Fetching photo data for sol ${sol}`});
            const pagesTotal = Math.ceil(status.totalPhotos/25);
            setPagesTotal(pagesTotal);
            let data = await fetchData(`/api/photos/${rover}?sol=${sol}&camera=${camera}`, setStatus, `Photo data received (1/${pagesTotal})`);
            if (data && data.photos) { 
                setPhotoData(data);
            }
        }
    }
    const handleSetRover = e => {
        setCamera('any');
        setRover(e.target.value);
        setSol(0);
    }
    useEffect(() => {
        if (manifests[rover]) {
            const photoData = manifests[rover].photos.find(photo => photo.sol === sol);
            const totalPhotos = photoData && photoData['total_photos'];
            const camsAvailable = photoData && photoData['cameras'];
            totalPhotos && setStatus({done: `${rover} on Sol ${sol} has ${totalPhotos} photos`, totalPhotos});
            camsAvailable && setAvailableCameras(camsAvailable);
            handleSetSol({target: {value: sol}}, {manifests, rover, sol, setSol});
        }
    }, [rover, sol, setStatus, camera, cameras, manifests]);

    return (
        <nav className="search">
            <select className="search__rover" value={rover} onChange={handleSetRover}>
                {rovers.map(rover => <option key={rover} value={rover}>{rover}</option>)}
            </select>
            <label className="search__sol">
                Sol<br />
                <input type="number" value={sol} onChange={e => handleSetSol(e, {manifests, rover, sol, setSol})} />
            </label>
            <label className="search__camera">
                Camera<br />
                <select value={camera} onChange={e => setCamera(e.target.value)}>
                    <option value='any'>any</option>
                    {availableCameras.map(cam => <option key={cam} value={cam}>{cameras[cam]}</option>)}
                </select>
            </label>
            <button className="search__submit" onClick={handleSubmit}>Find Photos</button>
        </nav>
    );
}

export default Search;

function findNextNearest(target, current, arr) {
    if (arr.includes(target)) {
        return target
    }
    const numbersInCorrectDirection = arr.filter(n => target > current ? n > current : n < current);
    if (numbersInCorrectDirection.length <= 0) {
        return target > current ? arr[arr.length - 1] : arr[0];
    }
    return numbersInCorrectDirection.reduce((nearest, num) => Math.abs(target - num) < Math.abs(target - nearest) ? num : nearest)
}