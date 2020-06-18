const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

async function getPhotoList({rover, sol, camera, page}) {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}${camera !== 'any' ? '&camera='+camera : ''}&page=${page}&api_key=${process.env.NASA_API_KEY}`);
    if (response.data) {
        if (response.data.errors) {
            throw response.data.errors
        }
        if (response.data.photos) {
            return {
                photos: response.data.photos,
                next: {
                    url: response.data.photos.length < 25 ? 'end' : `/api/photos/${rover}?sol=${sol}&camera=${camera}&page=${parseInt(page)+1}`,
                    index: parseInt(page)+1
                } 
            }
        }
    }
    else {
        return response
    } 
}

const roversCameras = { 
    'Curiosity': ["FHAZ", "NAVCAM", "MAST", "CHEMCAM", "MAHLI", "MARDI", "RHAZ"],
    'Opportunity': ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    'Spirit' : ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"]
};
function validatePhotosRequest(reqData) {
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

const manifests = {};

async function getManifest({rover}) {
    if (manifests.hasOwnProperty(rover) && Date.now() - manifests[rover].timeFetched < 1000*60*60*24) {
        return {
            manifest: manifests[rover].data
        }
    }
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?api_key=${process.env.NASA_API_KEY}`);
    if (response.data) {
        if (response.data.errors) {
            throw response.data.errors
        }
        if (response.data['photo_manifest']) {
            manifests[rover] = {
                timeFetched: Date.now(),
                data: response.data['photo_manifest']
            };
            return {
                manifest: manifests[rover].data
            }
        }
    }
    else {
        return response
    } 
}
function validateManifestRequest({rover}) {
    return Object.keys(roversCameras).find(r => r.toLowerCase() === rover.toLowerCase())
}

module.exports = {getPhotoList, validatePhotosRequest, getManifest, validateManifestRequest}