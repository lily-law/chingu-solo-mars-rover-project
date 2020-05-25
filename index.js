const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));

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
