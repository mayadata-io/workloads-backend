const reddis = require('./dbconnection');
const express = require('express');
const router = express();

router.post('/save', (req, res) => {
    reddis.dbsize((err,numkeys) => {
    for (i = 0; i < req.body.length; i++) {
      
    let rNumber = i+numkeys;
    let name = req.body[i].name;
    let email = req.body[i].email;
    let age = req.body[i].age;

   reddis.hmset(rNumber, ['name', name, 'email', email, 'age', age],(err,result) => {
            if(err){
                console.log(err);
            }else{
                console.log(result);
            };
      });
   };
  res.status(200).json({ status: 200, message: "Data is saved" });
 });   
});

 router.get('/read/:id',(req,res) => {
    reddis.dbsize((err,numkeys) => {
    for (i = 0; i <numkeys; i++) {
      
    reddis.hgetall(i ,(err, data) => {
        if(!data){
            console.log('no user exists');
        }else{
            console.log(data)
        };
        
    });
   
    };
    res.status(200).json({ status: 200, message: "Data is read" });
  });
}); 
 
module.exports = router;
