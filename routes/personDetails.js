const mongo = require('../config/dbconnection');
const express = require('express');
const randomString = require('randomstring');
const router = express();


// create mongoose schema
const personSchema = new mongo.Schema({
    name: String,
    email: String,
    age: Number,
    rNumber: Number
});

// create mongoose model
const User = mongo.model('person', personSchema);



/* GET all users. */
router.get('/read', (req, res) => {
    User.find({rNumber:req.rNumber}, (err, users) => {
        if (err) res.status(500).send(error)
        console.log('this is user api');
        res.status(200).json({ users });
    });
});

/* Create a user. */
router.post('/save', (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        rNumber: req.body.rNumber
    });
console.log(user);
    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json();
    });
});

router.post('/delete', (req, res) => {
  
    let user = new User({
        name: req.body.name,
        rNumber: req.body.rNumber
    });
    User.deleteOne({ name: user.name ,rNumber:user.rNumber }, function (err) {
        if(err==null){
            res.status(500).json();
        }else{
            res.status(201).json();
        }
        // console.log(err);
    });

});

module.exports = router;
