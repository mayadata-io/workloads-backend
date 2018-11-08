const ckrhQuery = require('./dbconnection');
const express = require('express');
const router = express();

router.post('/save', (req, res) => {
    let sql = 'INSERT INTO person (rNumber, name, email, age) VALUES ';
    let values = '';
    for (i = 0; i < req.body.length; i++) {
        if (i == req.body.length-1) {
            values = values + `( ${req.body[i].rNumber},' ${req.body[i].name}', '${req.body[i].email}', ${req.body[i].age})`
        }
        else {
            values = values + `( ${req.body[i].rNumber}, '${req.body[i].name}', '${req.body[i].email}' , ${req.body[i].age}),`
        }
    }
    ckrhQuery.query(sql+values,(error, results, fields) => {
        if (error){ 
            console.log('this is cockroadb erro :'+ error)	    
            res.status(500).json({ status: 500, message: 'Data is saved' });	 
        }else{	       
            console.log('this is cockroachdb result after save: ', results);	
            res.status(200).json({ status: 200, message: 'Data is saved' });	
        }
    });

});

// get 100 person details whose rNumber = id
router.get('/read/:id', (req, res) => {
    ckrhQuery.query('SELECT * FROM person where rNumber =' + req.params.id,(error, results, fields) => {
    if (error){ console.log('this is cockroadb erro :'+ error)
        res.status(500).json({ status: 500, message: 'Data is read' });
    }else{
        console.log('this is cockroachdb result after save: ', results);
        res.status(200).json({ status: 200, message: 'Data is read' });
    }
    });
});



module.exports = router;