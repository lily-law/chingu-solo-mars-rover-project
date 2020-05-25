const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const port = process.env.PORT || 5000;
const {getPhotoList, validateRoverRequest} = require('./api');

app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'client/build')));  
    app.get('*', (req, res) => { res.sendfile(path.join(__dirname = 'client/build/index.html')); })
}
else {
    app.get('*', (req, res) => { res.sendFile(path.join(__dirname+'/client/public/index.html')); })
}

app.post('/api/:rover', function (req, res) {
    const reqData = {
        rover: req.params.rover,
        sol: req.query.sol,
        camera: req.query.camera,
        page: req.query.page || '1'
    }
    const isValid = validateRoverRequest(reqData);
    if (isValid.error) {
        // client error: isValid.error
    }
    else {
        res.send(getPhotoList(reqData));
    }
});

http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
