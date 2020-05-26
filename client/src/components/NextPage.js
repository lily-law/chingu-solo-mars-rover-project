import React, {useEffect, useRef} from 'react';
import fetchData from './fetchData';

function NextPage({url, addToPhotoData, setStatus}) {
    const ref = useRef(null);
    useEffect(() => {
        const fetchNextPage = async () => {
            let data = await fetchData(url, setStatus);
            if (data && data.photos) { 
                addToPhotoData(data);
            }
        };
        if (ref.current) {
            let refCurrent = ref.current;
            let observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    refCurrent && fetchNextPage();
                    observer.unobserve(refCurrent);
                }
            });
            observer.observe(refCurrent); 
            return () => {
                refCurrent && observer.unobserve(refCurrent);
            } 
        }
    }, [ref, url, addToPhotoData, setStatus]);
    return <div ref={ref}></div>
}

export default NextPage;
