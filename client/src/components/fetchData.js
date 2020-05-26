export default async function fetchData(url, setStatus) {
    let res;
    try {
        res = await fetch(url);
        let json = await res.json();
        if (res.ok && json.data) { 
            setStatus({code: res.status});
            return json.data
        } 
        else {
            throw json.error
        }
    }
    catch (e) {
        console.error(e);
        setStatus({
            code: res.status,
            message: e.message
        });
    }
}