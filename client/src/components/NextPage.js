import React, {useEffect, useRef} from 'react';
import fetchData from './fetchData';

function NextPage({next, addToPhotoData, setStatus, pagesTotal}) {
    const ref = useRef(null);
    useEffect(() => {
        const fetchNextPage = async () => {
            try {
                let data = await fetchData(next.url, setStatus, `Photo data recieved (${next.index}/${pagesTotal})`);
                if (data && data.photos) { 
                    addToPhotoData(data);
                }
            }
            catch (e) {
                console.error(e);
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
    }, [ref, next, addToPhotoData, setStatus]);
    return <div ref={ref}></div>
}

export default NextPage;
