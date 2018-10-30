const reddis = require('./dbconnection');
const express = require('express');
const router = express();

router.post('/save', (req, res) => {
    reddis.dbsize((err,numkeys) => {
        let key = numkeys+1;
    for (i = 0; i<req.body.length; i++) {
      
    let rNumber = key+i;
    let name = req.body[i].name;
    let email = req.body[i].email;
    let age = req.body[i].age;
    let val = i+1;
        console.log("rnumber  = "+  rNumber);
        console.log('val = ' + val)
   reddis.hmset(rNumber, ['name', name, 'email', email, 'age', age],(err,result) => {
            if(err){
                console.log(err);
                res.status(500).json({ status: 500, message: "Data is not saved" });

            }else{
                if (val==req.body.length) {
                    console.log(rNumber+'--'+result);
                    res.status(200).json({ status: 200, message: "Data is saved" });
                }
                else {console.log(rNumber+'--'+result)};
                
            }
            
      });
   };
});   
});

 router.get('/read/:id',(req,res) => {
    reddis.dbsize((err,numkeys) => {
    for (i = 1; i <=numkeys; i++) {
        let val=i;
      
    reddis.hgetall(i,(err, data) => {
        if(!data){
            res.status(500).json({ status: 500, message: "Data is not read" });
            console.log('no user exists');

        }else{
            if(val==numkeys){
            console.log(data)
            res.status(200).json({ status: 200, message: "Data is read" });
            }
            else{console.log(data)};
        };
        
    });
   
    };
  });
}); 
 
module.exports = router;
