const { response } = require('express');
const express = require('express');
let app = express();
const mysql2 = require('mysql2');
let port = process.env.PORT || 8001;

let connection = mysql2.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6583872',
    password: 'gK3WMzNiLv',
    database: 'sql6583872'
})


app.use(express.json());
app.post('/',async (req,res) =>{
 let name = req.body.name;
 let email = req.body.email;
 let phone = req.body.phone;
 let place = req.body.place;
 if(phone.length < 10 || phone.length >10){
    return res.status(401).send("Invalid Phone Number");
 }
 connection.connect(); 
connection.query(`insert into address values ('${name}','${email}','${phone}','${place}')`, (error,result,fields) =>{
   console.log(error,result,fields);
    res.send('address created');
})
connection.end();
})
app.listen(port, () => {
    console.log(`server for user started on port ${port}`);
})
app.get('/',async (req,res) => {
    let name  = req.query.name;
    connection.connect(); 
connection.query(`select * from address where name = '${name}'`, (error,result,fields) =>{
   console.log(error,result,fields);
    res.send(result[0]);
})
connection.end();
})
app.delete('/', async(req,res) => {
    let name  = req.body.name;
    connection.connect(); 
    connection.query(`delete from address where name = '${name}'`, (error,result,fields) =>{
        res.send('address deleted');
    })
    connection.end();
})
app.put('/',async (req,res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let place = req.body.place;
    connection.connect(); 
    connection.query(`update address set email = '${email}', phone = '${phone}',place ='${place}' where name = '${name}'`, (error,result,fields) =>{
        res.send('address updated');
    })
    connection.end();
 })
   


