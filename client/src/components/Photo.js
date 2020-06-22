import React, {useState, useEffect, useRef} from 'react';
import Spinner from './Spinner';
import './Photo.css';

function Photo({img_src, sol, earth_date, camera, rover, id}) {
    const ref = useRef(null);
    const [src, setSrc] = useState(null);
    const [fullView, setFullView] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (ref.current) {
            let refCurrent = ref.current;
            let observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    refCurrent && setSrc(img_src);
                    observer.unobserve(refCurrent);
                    ref.current = null;
                }
            });
            observer.observe(refCurrent); 
            return () => {
                refCurrent && observer.unobserve(refCurrent);
            } 
        }
    }, [ref, img_src]);
const info = `
${rover.name} - ${camera.full_name}
sol: ${sol},
earthDate: ${earth_date},
id: ${id}
`;
    return <div className="photo__wrapper">
        <img onClick={() => setFullView(true)} onLoad={() => setLoaded(true)} className="photo" src={src} alt={`${rover.name} ${camera.full_name} ${id}`} title={info} />
        {fullView && <dialog className="modal" open onClick={() => setFullView(false)}>
            <img className="modal__photo" src={src} alt={`${rover.name} ${camera.full_name} ${id}`} />
            {info}
        </dialog>}
        {!loaded && <div ref={ref} className="photo photo--placeholder"><Spinner/></div>}
        </div>
}

export default Photo;