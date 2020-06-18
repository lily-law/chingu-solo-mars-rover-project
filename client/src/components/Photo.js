import React, {useState, useEffect, useRef} from 'react';
import Spinner from './Spinner';

function Photo({img_src, sol, earth_date, camera, rover, id}) {
    const ref = useRef(null);
    const [src, setSrc] = useState(null);
    const [fullView, setFullView] = useState(false);
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
    return src ? <>
            <img onClick={() => setFullView(true)} className="photo" src={src} alt={`${rover.name} ${camera.full_name} ${id}`} title={info} />
            {fullView && <dialog open onClick={() => setFullView(false)}>
                <img className="photo--full" src={src} alt={`${rover.name} ${camera.full_name} ${id}`} />
                {info}
            </dialog>}
        </>:
        <div ref={ref} className="photo"><Spinner/></div>
}

export default Photo;