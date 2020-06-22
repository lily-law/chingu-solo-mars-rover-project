import React, {useEffect, useRef} from 'react';
import fetchData from './fetchData';
import Spinner from './Spinner';

function NextPage({next, addToPhotoData, setStatus, pagesTotal}) {
    const ref = useRef(null);
    useEffect(() => {
        const fetchNextPage = async () => {
            try {
                let data = await fetchData(next.url, setStatus, `Photo data recieved (${next.index-1}/${pagesTotal})`);
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
                    setStatus({ requesting: true, message: "Fetching next 25 photos"});
                    ref.current = null;
                    refCurrent && fetchNextPage();
                    observer.unobserve(refCurrent);
                }
            });
            observer.observe(refCurrent); 
            return () => {
                refCurrent && observer.unobserve(refCurrent);
            } 
        }
    }, [ref, next, addToPhotoData, setStatus, pagesTotal]);
    return <div className="next-page" key={next.index} ref={ref}><Spinner /></div>
}

export default NextPage;
