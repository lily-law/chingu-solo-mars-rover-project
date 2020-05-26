import React from 'react';
import Photo from './Photo';
import NextPage from './NextPage';

function Gallery({photoData, setPhotoData, setStatus}) {
    const addToPhotoData = (data) => {
        const newPhotoData = {photos: [...photoData.photos, ...data.photos], next: data.next};
        setPhotoData(newPhotoData);
    }
   return (
       <main className="gallery">
           {photoData.photos.map(p => <Photo {...{...p}} key={''+p.rover.id+p.camera.id+p.id} />)}
           {photoData.next === 'end' ? <div>End</div> : <NextPage url={photoData.next} {...{addToPhotoData, setStatus}} />}
       </main>
   )
}

export default Gallery;