const client = require('./dbconnection');

const express = require('express');
const router = express();

router.post('/save', (req, res) => {
    for (i=0;i<req.body.length;i++){
    const id1 = Uuid.random();
    const ival = i+1
    const value=`(${id1},'${req.body[i].name}','${req.body[i].email}',${req.body[i].age})`;
    client.execute(`insert into maya.person(id, name, email, age) values`+value+';',(err, result) => {
        if (err) {
            console.log('error',err );
            res.status(500).json({ status: 500, message: "Data not saved" });

        }
        else if(ival == req.body.length){
        // console.log(ival);
         console.log('SucCess fully saved 100 users data in Cassandra-jiva !');
        res.status(200).json({ status: 200, message: "Data saved" });

        }
        else{ console.log('saving data of :',result)
        };
    });
    };
}); 


router.get('/read/:id', (req, res) => {
    client.execute('SELECT name,email,age FROM maya.person ;',(error, result, fields) => {
        if(error){
            res.status(500).json({ status: 500, message: "Data is not read" });
            console.log('no user exists');

        }else{
            console.log("100 user data red in Cassandra-jiva successfully ..!",result)
            res.status(200).json({ status: 200, message: "Data is read" });
        }
    });
});



module.exports = router;