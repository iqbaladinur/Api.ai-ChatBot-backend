const lowdb = require('lowdb');
const db = lowdb();

const initialData = {
	tasks: [],
};

//set initial data to db
db.defaults(initialData).write();


//create
function create(taskName){
	db.get('tasks')
	  .push(taskName)
	  .write();
}

//get
function getData(){
	return db.get('tasks').value();		//tasks is the db keyword referto initialData
}

//remove
function remove(number){
	db.get('tasks')
	  .remove((task, n) => n === number - 1)
	  .write();
}

module.exports={
	create,			//export create function
	getData,		//export getData function
	remove,			//export remove function
}