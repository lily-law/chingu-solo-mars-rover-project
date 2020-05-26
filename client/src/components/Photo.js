import React, {useState, useEffect, useRef} from 'react';

function Photo({img_src, sol, earth_date, camera, rover, id}) {
    const ref = useRef(null);
    const [src, setSrc] = useState('');
    useEffect(() => {
        if (ref.current) {
            let refCurrent = ref.current;
            let observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    refCurrent && setSrc(img_src);
                    observer.unobserve(refCurrent);
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
    return <img className="photo" ref={ref} src={src} alt={`${rover.name} ${camera.full_name} ${id}`} title={info} />
}

export default Photo;