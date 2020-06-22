import React, { useState } from 'react';
import Search from './Search';
import Status from './Status';
import './SideBar.css';

function SideBar({photoData, setPhotoData, status, setStatus, manifests, rovers, cameras, rover, setRover, pagesTotal, setPagesTotal}) {
    const [expanded, setExpanded] = useState(true);
    return (<div className={`sidebar ${expanded ? 'sidebar--active' : ''}`}>
        <button onClick={() => setExpanded(!expanded)} className="sideBar__toggle">
            <div className={`toggle__triangle ${expanded ? 'toggle__triangle--close' : 'toggle__triangle--open'}`} />
        </button>
        <h1>Mars Photo<br /> API</h1>
        <Status {...{status, photoData}} />
        <Search {...{setPhotoData, status, setStatus, manifests, rovers, cameras, rover, setRover, pagesTotal, setPagesTotal}} />
        <footer>
            <a href="https://github.com/lily-law/chingu-solo-mars-rover-project">Lily Law - GitHub Repo</a>
        </footer>
    </div>)
}

export default SideBar