export default async function fetchData(url, setStatus, successMsg) {
        try {
            const res = await fetch(url)
            var text = await res.text()
            var json = JSON.parse(text)
            if (res.ok) {
                successMsg && setStatus({done: successMsg})
                return json
            }
            else {
                throw json
            }   
        }
        catch (e) {
            if (json) {  
                console.log(text)
                setStatus({
                    ...e
                })
            }
            else {
                setStatus({
                    errors: ["Unable to connect, please check you connection and try again"]
                }) 
            }
        }
    return
}