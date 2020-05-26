const https = require('https');
const dotenv = require('dotenv');
dotenv.config();

async function getPhotoList({rover, sol, camera, page}) {
    return new Promise((resolve, reject) => {
        https.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}${camera !== 'any' ? '&camera='+camera : ''}&page=${page}&api_key=${process.env.NASA_API_KEY}`, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', async () => {
                const json = await JSON.parse(data);
                if (json.photos) {
                    resolve({
                        photos: json.photos,
                        next: json.photos.length < 25 ? 'end' : `/api/${rover}?sol=${sol}&camera=${camera}&page=${parseInt(page)+1}`
                    });
                } 
                else {
                    reject(json); 
                }
            });
        }).on("error", (err) => {
            reject(err)
        });
    });
}

const roversCameras = { 
    'Curiosity': ["FHAZ", "NAVCAM", "MAST", "CHEMCAM", "MAHLI", "MARDI", "RHAZ"],
    'Opportunity': ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    'Spirit' : ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"]
};
function validateRoverRequest(reqData) {
    const errors = [];
    if (!Object.keys(roversCameras).find(rover => rover === reqData.rover)) {
        errors.push('No such rover: '+reqData.rover);
    }
    else if (reqData.camera !== 'any' && !roversCameras[reqData.rover].find(cam => cam === reqData.camera)) {
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
    return {}
}

module.exports = {getPhotoList, validateRoverRequest}