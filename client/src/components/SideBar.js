import React, { useState } from 'react';
import Search from './Search';
import Status from './Status';
import './SideBar.css';

function SideBar({photoData, setPhotoData, status, setStatus, manifests, rovers, cameras, rover, setRover, setPagesTotal}) {
    const [expanded, setExpanded] = useState(true);
    return (<div className={`sidebar ${expanded ? 'sidebar--active' : ''}`}>
        <button onClick={() => setExpanded(!expanded)} className="sideBar__toggle">{expanded ? '<' : '>'}</button>
        <h1>Mars Photo API</h1>
        <Search {...{setPhotoData, status, setStatus, manifests, rovers, cameras, rover, setRover, setPagesTotal}} />
        <Status {...{status, photoData}} />
        <footer>
            Lily Law - GitHub Repo
        </footer>
    </div>)
}

export default SideBar