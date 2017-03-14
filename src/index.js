const express 		= require('express');
const bodyParser 	= require('body-parser');
const cors  		= require('cors');
const apiai			= require('./apiai');		//include apiai.js
const task			= require('./task');		//include apiai.js

const app			= express();
const PORT			= 5000;

app.use(bodyParser.json());
app.use(cors());

// routes
app.post('/',(req,res)=>{
	const question	= req.body.question;

	//make request to api ai
	const request 	= apiai.askQuestion(question);


	//execute request and parse the result into json form
	request
		.then(resFromApiai => resFromApiai.json())  //result as string convert to json
		.then(jsonFromApiai => {
			const result = jsonFromApiai.result;	//extract result from jsonFromapiai


			//check the intent name (create.task or show.task or delete.task)

			switch(result.metadata.intentName){		//extract result intentName
				case 'create.task' :{
					const taskName = result.parameters.text;
					task.create(taskName);
					res.send(result.speech);
					break;
				}
				case 'show.task' :{
					const taskList = task.getData();		//function in task.js
					res.send(taskList.join(", "));
					break;
				}
				case 'delete.task' :{
					const number = result.parameters.number;
					task.remove(number);
					res.send(result.speech);				//send result speech
					break;
				}


				default:
					res.send(result.speech);
			}	
		}); 
});

app.listen(PORT,() =>{
	console.log(`App run at locallhost:${PORT}`);
});