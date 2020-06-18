export default async function fetchData(url, setStatus, successMsg) {
        let res = await fetch(url);
        let json = await res.json();
        try {
            if (res.ok && json) { 
                successMsg && setStatus({done: successMsg});
                return json
            } 
            else {
                throw json
            }
        }
        catch (e) {
            setStatus({
                ...e
            });
        }
    return
}