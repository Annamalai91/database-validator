var express = require("express");

var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


/* set up sql connection */
var mysql = require("mysql");
var connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
	database        : process.env.MYSQL_DATABASE,
	multipleStatements: true
});

/* throw an error if sql connect fails. it should fail a couple times in docker 
 before successfully connecting. the container takes longer to boot up, essentially.
 */
connection.connect(function(err){
	if(err){
		console.error("error connecting: " + err.stack);
		return process.exit(22); //consistently exit so the Docker container will restart until it connects to the sql db
	}
	console.log("connected as id " + connection.threadId);
});



//Get all employees
app.get('/employees', (req, res) => {
    connection.query('SELECT * FROM Employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


//Get an employees
app.get('/employees/:id', (req, res) => {
    connection.query('SELECT * FROM Employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an employees
app.delete('/employees/:id', (req, res) => {
    connection.query('DELETE FROM Employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/employees', (req, res) => {
	let emp = req.body;
	emp.id = 0;
    var sql = "SET @id = ?;SET @firstname = ?;SET @lastname = ?;SET @email = ?; \
    CALL EmployeeAddorEdit1(@id,@firstname,@lastname,@email);";
    connection.query(sql, [emp.id, emp.firstname, emp.lastname, emp.email], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].id);
            });
        else
            console.log(err);
    })
});

//Update an employees
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @id = ?;SET @firstname = ?;SET @lastname = ?;SET @email = ?; \
    CALL EmployeeAddorEdit1(@id,@firstname,@lastname,@email);";
    connection.query(sql, [emp.id, emp.firstname, emp.lastname, emp.email], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});


/* Port and listening info below */
/* might want to set up argv for easily changing the port */
var port = 3257;

app.listen(port, function(){
	console.log("app listening on port: " + port);
});
