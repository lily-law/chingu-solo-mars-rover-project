import React from 'react';
import Photo from './Photo';
import NextPage from './NextPage';
import ToTop from './ToTop';
import './Gallery.css';

function Gallery({photoData, setPhotoData, setStatus}) {
    const addToPhotoData = (data) => {
        const newPhotoData = {photos: [...photoData.photos, ...data.photos], next: data.next};
        setPhotoData(newPhotoData);
    }
   return (<>
       <main className="gallery">
           {photoData.photos.map(p => <Photo {...{...p}} key={''+p.rover.id+p.camera.id+p.id} />)}
           <ToTop />
       </main>
       {photoData.next.url === 'end' ? <div>End</div> : <NextPage next={photoData.next} {...{addToPhotoData, setStatus}} />}
   </>)
}

export default Gallery;