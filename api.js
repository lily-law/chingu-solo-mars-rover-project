const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const cache = {
    manifests: {},
    photoLists: {}
};


async function getPhotoList({rover, sol, camera, page}) {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}${camera !== 'any' ? '&camera='+camera : ''}&page=${page}`;
    if (cache.photoLists.hasOwnProperty(url)) {
        return cache.photoLists[url]
    }
    const response = await axios.get(`${url}&api_key=${process.env.NASA_API_KEY}`);
    if (response.data) {
        if (response.data.errors) {
            throw response.data.errors
        }
        if (response.data.photos) {
            cache.photoLists[url] = {
                photos: response.data.photos,
                next: {
                    url: response.data.photos.length < 25 ? 'end' : `/api/photos/${rover}?sol=${sol}&camera=${camera}&page=${parseInt(page)+1}`,
                    index: parseInt(page)+1
                } 
            };
            return cache.photoLists[url]
        }
    }
    else {
        return response
    } 
}

const rovers = ['Curiosity', 'Opportunity', 'Spirit'];
async function validatePhotosRequest({rover, camera, sol, page}) {
    if (!cache.manifests[rover]) {
        await getManifest({rover})
    }
    const errors = [];
    if (sol === '' || isNaN(sol)) {
        errors.push('Invalid Sol given: '+sol);
    }
    if (!rovers.includes(rover)) {
        errors.push('No such rover: '+rover);
    }
    if (page === '' || isNaN(page)) {
        errors.push('Wooops invalid page: '+sol+', no idea how that happened! Sorry');
    }
    if (errors.length === 0) {
        const photoData = cache.manifests[rover].data.photos.find(photo => photo.sol == sol);
        if (!photoData) {
            errors.push(`Unable to find data for ${rover} on ${sol}`);
        }
        else if (camera !== 'any' && photoData.cameras.find(cam => cam === camera)) {
             errors.push(`${rover} rover does not have ${camera} camera`);
        }
    }
    if (errors.length > 0) {
        return { errors }
    }
    return {}
}

async function getManifest({rover}) {
    if (cache.manifests.hasOwnProperty(rover) && Date.now() - cache.manifests[rover].timeFetched < 1000*60*60*24) {
        console.log("in cache")
        return {
            manifest: cache.manifests[rover].data
        }
    }
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?api_key=${process.env.NASA_API_KEY}`);
    if (response.data) {
        if (response.data.errors) {
            throw response.data.errors
        }
        if (response.data['photo_manifest']) {
            cache.manifests[rover] = {
                timeFetched: Date.now(),
                data: response.data['photo_manifest']
            };
            return {
                manifest: cache.manifests[rover].data
            }
        }
    }
    else {
        return response
    } 
}
function validateManifestRequest({rover}) {
    return rovers.includes(rover)
}

module.exports = {getPhotoList, validatePhotosRequest, getManifest, validateManifestRequest}