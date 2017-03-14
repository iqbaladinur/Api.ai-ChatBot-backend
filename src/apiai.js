const fetch	 = require('node-fetch');	//include node-fetch module
const uuid	 = require('uuid');			//include uuid module
const config = require('./config'); 	//include config file.js


/*
 * Main function to connect api.ai
 */

function askQuestion(question) {
	const accesToken = config.apiai.accesToken;		//access token from config.js
	const endpoint = config.apiai.endpoint;			//access endpoint from config.js
	const lang = config.apiai.lang;					//access language from config.js
	
	const sessionid = uuid.v4();					//get unique sessionId every requested connection
	

	
	//http header for authorization
	 
	const fetchOption ={
		headers:{
			'Authorization': `Bearer ${accesToken}`
		},
	};

	//get url plus query
	const queryString	=`lang=${lang}&sessionId=${sessionid}&query=${question}`;
	const url 			=`${endpoint}/query?${queryString}`; 
	
	//fetch like ajax
	return fetch(url, fetchOption);
};

//export module for readable on ether file
module.exports={
	askQuestion,
};