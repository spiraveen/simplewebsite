//Importing Modules
const express = require('express');
const https = require('https');
var app = express();
var router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
//Assigning Paths via Router

router.get('/', (req,res) => {
	res.sendFile(path.join(__dirname+'/webcontent/index.html'));
});

router.get('/about', (req,res) => {
	res.sendFile(path.join(__dirname+'/webcontent/about.html'));
});

router.post('/welcome', (req,res) => {

	https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
		let data = '';		
		resp.on('data', (chunk) => {
			data += chunk;
		
		});
		console.log(data);
		resp.on('end', () => {
			console.log(JSON.parse(data).explanation);
		});
	});
	//res.end();
//	console.log(req.body);
//	const name = req.body.uname;
//	res.render(path.join(__dirname+'/webcontent/welcome.html'), { name: name });
//	res.sendFile(app.render(path.join(__dirname+'/webcontent/welcome.html'), { name: name }, function(err, html){}));
});

//Listening on open Port

console.log('Listening on Port 3000 ...');
app.listen(3000);
