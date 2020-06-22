import React from 'react';
import Photo from './Photo';
import NextPage from './NextPage';
import ToTop from './ToTop';

function Gallery({photoData, setPhotoData, setStatus, pagesTotal}) {
    const addToPhotoData = (data) => {
        const newPhotoData = {photos: [...photoData.photos, ...data.photos], next: data.next};
        setPhotoData(newPhotoData);
    }
   return (<>
       <main className="gallery">
           {photoData.photos.map(p => <Photo {...{...p}} key={''+p.rover.id+p.camera.id+p.id} />)}
           <ToTop />
       </main>
       {photoData.next.url === 'end' ? <div>End</div> : <NextPage next={photoData.next} {...{addToPhotoData, setStatus, pagesTotal}} />}
   </>)
}

export default Gallery;