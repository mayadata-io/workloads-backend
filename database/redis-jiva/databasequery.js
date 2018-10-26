const reddis = require('./dbconnection');
const express = require('express');
const router = express();

router.post('/save', (req, res) => {
    reddis.dbsize( function (err,numkeys) {
    for (i = 0; i < req.body.length; i++) {
      
    var rNumber = i+numkeys;
    var name = req.body[i].name;
    var email = req.body[i].email;
    var password = req.body[i].age;
    // console.log(rNumber);

    // console.log(rNumber,name,email,password);
    reddis.hmset(rNumber, ["name", name, "email", email, "age", password],function(err,result){
            if(err){
                console.log(err);
            }else{
                console.log(result);
                // res.render('add-user',{message: "User added successfully!!!!"});   
            }
      });
};
res.status(200).json({ status: 200, message: "Data is saved" });
});   
 });

 router.get('/read/:id',function(req,res) {
    reddis.dbsize( function (err,numkeys) {
    for (i = 0; i <numkeys; i++) {
      
    reddis.hgetall(i ,function(err, data){
        if(!data){
            // res.render('users',{message: "No user exist"});
            console.log('no user exists');
        }else{
            // data.id = id;
            console.log(data)
            // res.render('users',{users: data});
        }
        
    });
   
};
res.status(200).json({ status: 200, message: "Data is read" });
    });
}); 
 
module.exports = router;
