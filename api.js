const https = require('https');

function getPhotoList({rover, sol, camera, page}) {
    https.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}${camera !== all ? '&camera='+camera : ''}&page=${page}&api_key=${process.env.NASA_API_KEY}`, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    resp.on('end', () => {
        const photos = JSON.parse(data).photos;
        return {
            photos: JSON.parse(data),
            next: photos.length < 25 ? 'end' : `/api/${rover}/photos?sol=${sol}&camera=${camera}&page=${parseInt(page)+1}`
        } 
    });

    }).on("error", (err) => {
        return err
    });
}

const roversCameras = { 
    'Curiosity': ["FHAZ", "NAVCAM", "MAST", "CHEMCAM", "MAHLI", "MARDI", "RHAZ"],
    'Opportunity': ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    'Spirit' : ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"]
};
function validateRoverRequest(reqData) {
    const errors = [];
    if (!Object.keys(roversCameras).find(rover => rover.name === reqData.rover)) {
        errors.push('No such rover: '+reqData.rover);
    }
    else if (roversCameras[reqData.rover]) {
        errors.push(`${reqData.rover} rover does not have ${reqData.camera} camera`);
    }
    if (reqData.sol === '' || isNaN(reqData.sol)) {
        errors.push('Invalid Sol given: '+reqData.sol);
    }
    if (reqData.page === '' || isNaN(reqData.page)) {
        errors.push('Wooops invalid page: '+reqData.sol+', no idea how that happened! Sorry');
    }
    if (errors.length > 0) {
        return { errors }
    }
    return
}

module.exports = {getPhotoList, validateRoverRequest}