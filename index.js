const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const port = process.env.PORT || 5000;
const {getPhotoList, validatePhotosRequest, getManifest, validateManifestRequest} = require('./api');

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/photos/:rover', async function (req, res) {
    try {
        const reqData = {
            rover: req.params.rover,
            sol: req.query.sol,
            camera: req.query.camera,
            page: req.query.page || '1'
        }
        const isValid = validatePhotosRequest(reqData);
        if (isValid.errors) {
            console.log('Error: '+isValid.errors)
            res.status(404).send({error: isValid.errors})
        }
        else {
            const data = await getPhotoList(reqData);
            if (data.photos) {
                res.send(data);
            }
            else {
                throw data
            }
        } 
    }
    catch (e) {
        res.status(500).send({errors: ["Unable to fetch Photo List from NASA, please try again later"]});
    }
});

app.get('/api/manifests/:rover', async function (req, res) {
    try {
        const reqData = {
            rover: req.params.rover
        }
        const isValid = validateManifestRequest(reqData);
        if (!isValid) {
            res.status(404).send({error: `No manifest available for rover ${reqData.rover}`});
        }
        else {
            const data = await getManifest(reqData);
            if (data.manifest) {
                res.send(data);
            }
            else {
                throw data
            }
        } 
    }
    catch (e) {
        res.status(500).send({errors: ["Unable to fetch manifests from NASA, please try again later"]});
    }
});

app.get('/api/', function (req, res) {
    res.status(404).send({error: `No resource available for ${req.path}`});
});

if (process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'client/build')));  
    app.get('*', (req, res) => { res.sendFile(path.join(__dirname = 'client/build/index.html')); });
}
else {
    app.get('*', (req, res) => { res.sendFile(path.join(__dirname+'/client/public/index.html')); });
}

http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
