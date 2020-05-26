const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const port = process.env.PORT || 5000;
const {getPhotoList, validateRoverRequest} = require('./api');

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/:rover', async function (req, res) {
    try {
        const reqData = {
            rover: req.params.rover,
            sol: req.query.sol,
            camera: req.query.camera,
            page: req.query.page || '1'
        }
        const isValid = validateRoverRequest(reqData);
        if (isValid.errors) {
            console.log('Error: '+isValid.errors)
            res.status(404).send({error: isValid.errors})
        }
        else {
            const data = await getPhotoList(reqData);
            if (data.photos) {
                res.send({data});
            }
            else {
                throw data
            }
        } 
    }
    catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

if (process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'client/build')));  
    app.get('*', (req, res) => { res.sendfile(path.join(__dirname = 'client/build/index.html')); })
}
else {
    app.get('*', (req, res) => { res.sendFile(path.join(__dirname+'/client/public/index.html')); })
}

http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
