var express = require("express");

var app = express();
const cors = require('cors');
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Setting up the cors config
app.use(cors());

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




//Get all databases
app.get('/getalldatabases', (req, res) => {
    console.log("Came isndie")
    connection.query('SHOW DATABASES', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get Table of the particular DB 
//Get DB from the request
//USE that DB and then get the tables 
app.get('/getalltables/:DBname', (req, res) => {

    var sqlQuery =`use ${req.params.DBname}; Show tables;`;
    console.log("Came isndie table")
    connection.query(sqlQuery, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


//Get Column name of the particular Table 
//Get table from the request
//USE that DB and then get the tables 
app.get('/getallColumns/:TableName', (req, res) => {

    var sqlQuery =`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${req.params.TableName}' ORDER BY ORDINAL_POSITION`;
    console.log("Came isndie columns")
    connection.query(sqlQuery, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


//Get Select Query from the request and send back the response
//Everything needs to be Dynamic
app.get('/SelectQuery', (req, res) => {
    console.log("Came inside the Select Query")
    const Databse = req.query.Databse
    const Table = req.query.Table
    const Columns = req.query.Columns
    const filter = req.query.filter
 console.log(Databse);
 console.log(Table);
 console.log(Columns);
 console.log(filter);

 var Query =  `use ${Databse}; Select ${Columns} from ${Table};`;


    // var sqlQuery =`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${req.params.TableName}' ORDER BY ORDINAL_POSITION`;
    connection.query(Query, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});









//Get Select Query from the request and send back the response
//Everything needs to be Dynamic
app.get('/SelectQueryWithFilter', (req, res) => {
    console.log("Came inside the Select Query with filter")
    const Databse = req.query.Databse
    const Table = req.query.Table
    let Columns = req.query.Columns
    const filter = req.query.filter
    const filtervalue = req.query.filtervalue
    
    req.query.Columns.forEach(function(value){
        if(value==="All")
        {
            Columns = "*";
        }
    })

 console.log(Databse);
 console.log(Table);
 console.log(Columns);
 console.log(filter);
 console.log(filtervalue);

 let filterQuery = 'where '

 filtervalue.forEach(function(value,index){
    console.log(value);
    console.log(index)
   
    var obj = JSON.parse(value);
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        {   console.log(`The valuie if i us `+i)
            console.log(keys[i])
            console.log(obj[keys[i]][0]);
            console.log(obj[keys[i]][1]);
            console.log(i)
            console.log(keys)
            console.log(keys.length)

          

            let filtercolumn = keys[i];
            let filteroperation = obj[keys[i]][0];
            let filterString = obj[keys[i]][1];

            filterQuery = `${filterQuery} ${filtercolumn}`
            console.log("Before switch")
            console.log(filterQuery)

            switch(filteroperation) {
                case 'is':
                  console.log("IS operation detected");
                  filterQuery = `${filterQuery} ='${filterString}'`
                  console.log(filterQuery)
                  break;
                case 'in':
                  console.log("IN operation detected")
                  filterQuery = `${filterQuery} IN(${filterString})`
                  console.log(filterQuery)
                  break;
                case 'like':
                   console.log("Like operation detected")
                   filterQuery = `${filterQuery} LIKE '${filterString}'`
                   console.log(filterQuery)
                   break;
              }
            

        }
  
}

if (filtervalue[index + 1]){
    filterQuery = `${filterQuery} and `
}
  });

console.log("ASdddddddddd")
  console.log(filterQuery)
 var Query =  `use ${Databse}; Select ${Columns} from ${Table} ${filterQuery};`;
 console.log(Query);

    // var sqlQuery =`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${req.params.TableName}' ORDER BY ORDINAL_POSITION`;
    connection.query(Query, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});









//Get Update Query from the request and send back the response
//Everything needs to be Dynamic
app.put('/UpdateQuery', (req, res) => {
    console.log("Came inside the Update Queery")
    const Databse = req.query.Databse
    const Table = req.query.Table
    const filtervalue = req.query.filtervalue
    const filterupdatevalue = req.query.filterupdatevalue

    console.log(Databse);
    console.log(Table);

  
    console.log(filtervalue);
    console.log("*****************************");
    console.log(filterupdatevalue);
    console.log("*****************************");
    

    let filterQuery1 = 'SET '
    let filterQuery2 = 'where'

    filterupdatevalue.forEach(function(value,index){
       console.log(value);
       console.log(index)
      
       var obj = JSON.parse(value);
       var keys = Object.keys(obj);
       for (var i = 0; i < keys.length; i++) {
           {   console.log(`The valuie if i us `+i)
               console.log(keys[i])
               console.log(obj[keys[i]][0]);
               console.log(obj[keys[i]][1]);
               console.log(i)
               console.log(keys)
               console.log(keys.length)
   
             
   
               let filtercolumn = keys[i];
               let filteroperation = obj[keys[i]][0];
               let filterString = obj[keys[i]][1];
   
               filterQuery1 = `${filterQuery1} ${filtercolumn}`
               filterQuery2 = `${filterQuery2} ${filtercolumn}`
               console.log("Before switch")
               console.log(filterQuery1)
   
               switch(filteroperation) {
                   case 'is':
                     console.log("IS operation detected");
                     filterQuery1 = `${filterQuery1} ='${filterString}'`
                     filterQuery2 = `${filterQuery2} ='${filterString}'`
                     console.log(filterQuery1)
                     break;
                   
                 }
               
   
           }
     
   }
   
   if (filterupdatevalue[index + 1]){
       filterQuery1 = `${filterQuery1},`
       filterQuery2 = `${filterQuery2},`
   }
     });
   
     console.log("++++++++++++++++++++++++++++")
     console.log(filterQuery1)
     console.log("++++++++++++++++++++++++++++")

 let filterQuery = 'where '

 filtervalue.forEach(function(value,index){
    console.log(value);
    console.log(index)
   
    var obj = JSON.parse(value);
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        {   console.log(`The valuie if i us `+i)
            console.log(keys[i])
            console.log(obj[keys[i]][0]);
            console.log(obj[keys[i]][1]);
            console.log(i)
            console.log(keys)
            console.log(keys.length)

          

            let filtercolumn = keys[i];
            let filteroperation = obj[keys[i]][0];
            let filterString = obj[keys[i]][1];

            filterQuery = `${filterQuery} ${filtercolumn}`
            console.log("Before switch")
            console.log(filterQuery)

            switch(filteroperation) {
                case 'is':
                  console.log("IS operation detected");
                  filterQuery = `${filterQuery} ='${filterString}'`
                  console.log(filterQuery)
                  break;
                case 'in':
                  console.log("IN operation detected")
                  filterQuery = `${filterQuery} IN(${filterString})`
                  console.log(filterQuery)
                  break;
                case 'like':
                   console.log("Like operation detected")
                   filterQuery = `${filterQuery} LIKE '${filterString}'`
                   console.log(filterQuery)
                   break;
              }
            

        }
  
}

if (filtervalue[index + 1]){
    filterQuery = `${filterQuery} and `
}
  });

  console.log(filterQuery)
 var Query =  `use ${Databse}; Update ${Table} ${filterQuery1} ${filterQuery};`;
 console.log(Query);
 let responsearray = []; 
    connection.query(Query, (err, rows, fields) => {
        if (!err)
        {
            responsearray.push(rows[1].affectedRows)
            res.send(responsearray);
        }

   
        else
            console.log(err);
    })
});



//Get Delete Query from the request and send back the response
//Everything needs to be Dynamic
app.delete('/DeleteQuery', (req, res) => {
    console.log("Came inside the Select Query with filter")
    const Databse = req.query.Databse
    const Table = req.query.Table
    const filtervalue = req.query.filtervalue
    

 console.log(Databse);
 console.log(Table);
 console.log(filtervalue)

 let filterQuery = 'where '

 filtervalue.forEach(function(value,index){
    console.log(value);
    console.log(index)
   
    var obj = JSON.parse(value);
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        {   console.log(`The valuie if i us `+i)
            console.log(keys[i])
            console.log(obj[keys[i]][0]);
            console.log(obj[keys[i]][1]);
            console.log(i)
            console.log(keys)
            console.log(keys.length)

          

            let filtercolumn = keys[i];
            let filteroperation = obj[keys[i]][0];
            let filterString = obj[keys[i]][1];

            filterQuery = `${filterQuery} ${filtercolumn}`
            console.log("Before switch")
            console.log(filterQuery)

            switch(filteroperation) {
                case 'is':
                  console.log("IS operation detected");
                  filterQuery = `${filterQuery} ='${filterString}'`
                  console.log(filterQuery)
                  break;
                case 'in':
                  console.log("IN operation detected")
                  filterQuery = `${filterQuery} IN(${filterString})`
                  console.log(filterQuery)
                  break;
                case 'like':
                   console.log("Like operation detected")
                   filterQuery = `${filterQuery} LIKE '${filterString}'`
                   console.log(filterQuery)
                   break;
              }
            

        }
  
}

if (filtervalue[index + 1]){
    filterQuery = `${filterQuery} and `
}
  });

console.log("ASdddddddddd")
  console.log(filterQuery)
 var Query =  `use ${Databse}; Delete from ${Table} ${filterQuery};`;
 console.log(Query);
 let responsearray = []; 
    connection.query(Query, (err, rows, fields) => {
        if (!err)
        {
            responsearray.push(rows[1].affectedRows)
            res.send(responsearray);
        }

   
        else
            console.log(err);
    })
});



/* Port and listening info below */
/* might want to set up argv for easily changing the port */
var port = 3257;

app.listen(port, function(){
	console.log("CORS-enabled web server is now running on port : " + port);
});
