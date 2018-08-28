const mongo = require("../config/dbconnection");
const express = require("express");
const randomString = require("randomstring");
const router = express();
// require("../config/createK8sJob.js");
// var another = require("../config/createK8sJob.js");

//Entrypoint main
function initJob(app) {
  const Client = require("kubernetes-client").Client;
  const config = require("kubernetes-client").config;
  const deploymentManifest = require("./" + app + ".json");
  createJob(deploymentManifest, config, Client);
}

async function createJob(deploymentManifest, config, Client) {
  try {
    const client = new Client({ config: config.getInCluster() });
    await client.loadSpec();
    const create = await client.apis.batch.v1
      .namespaces("litmus")
      .jobs.post({ body: deploymentManifest });
    console.log("Result: ", create);
  } catch (err) {
    console.error("Error: ", err);
  }
}

// create mongoose schema
const userSchema = new mongo.Schema({
  name: String,
  email: String,
  company: String
});

const ramdonUser = new mongo.Schema({
  randnumber: Number,
  randomString: String
});

// create mongoose model
const User = mongo.model("User", userSchema);
const RandomU = mongo.model("randomtest3", ramdonUser);

// function runsave() {

//     for (var i = 0; i < 100; i++) {
//         let user = new RandomU({
//             randnumber: getRandomInt(),
//             randomString: randomString.generate(20)
//         })
//         user.save(error => {
//             if (error) console.log(error);
//         });
//         console.log(user.randnumber);
//     }
// }
// find the user with id 4
// RandomU.findOneAndRemove({ randnumber: '1175314349' }, function(err) {
//     if (err) throw err;

//     // we have deleted the user
//     console.log('User deleted!');
//   });

// runsave();
// console.log(randomString.generate(20));

/* GET all users. */
router.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(error);
    console.log("this is user api");
    res.status(200).json({ users });
  });
});

/* GET one users. */
router.get("/users/:id", (req, res) => {
  User.findById(req.param.id, (err, users) => {
    if (err) res.status(500).send(error);

    res.status(200).json(users);
  });
});

router.get("/users/ali", (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(error);
    console.log("this is user api");
    res.status(200).json({ name: "ali", age: "20" });
  });
});

/* Create a user. */
router.post("/users", (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    company: req.body.company
  });
  console.log(user);
  user.save(error => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: "User created successfully"
    });
  });
});

router.post("/detail", (req, res) => {
  let user = new RandomU({
    randnumber: req.body.randnumber,
    randomString: req.body.randomString
  });

  console.log(user);
  user.save(error => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: "User created successfully"
    });
  });
});

// api for calling kubernetes client
// router.post("/k8s/mongo", (req, res) => {
//   try {
//     r = k8s.initJob(req.body.app);
//   } catch {
//     console.log("Error" + r);
//   }

//   console.log(user);
//   user.save(error => {
//     if (error) res.status(500).send(error);

//     res.status(201).json({
//       message: "kubectl done"
//     });
//   });
// });

router.get("/k8s/mongo", (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(error)
    console.log("hitting the api /k8s/mongo")
    var app = req.query.app;
    // console.log(app)
    var chaos = req.query.chaos;
    // console.log(chaos)
    var params = app + "-" + chaos;
    r = initJob(params);
    res.status(200).json({ users });
    // console.log(r);
  });
});
module.exports = router;
