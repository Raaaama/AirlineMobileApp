var express = require('express');
var app  = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'Nazamari123@',
    database: 'mydb'
});

var server = app.listen(4545, function(){
  var host = server.address().address
  var port = server.address().port
  console.log("start");
});

con.connect(function(error){
  if(error) console.log(error);
  else console.log("connected");
});

app.get('/airports', function(req, res){
  con.query('select a.id, a.apCode, a.apName, a.city, b.countryName, true as shown from airports a, countries b where deleted = 0 and a.idCountry = b.idCountry', function(error, rows, fields){
        if(error) console.log(error);
        else{
            //console.log(rows);
            res.send(rows);
        }
  });
});