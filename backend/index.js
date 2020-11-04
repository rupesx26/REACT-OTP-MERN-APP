const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;
const userRoutes = express.Router();

let Users = require('./users.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

userRoutes.route('/').get(function(req, res) {
    Users.find(function(err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    });
});

userRoutes.route('/:query').get(function(req, res) {
    console.log(req.params)
    let number = req.params.query;
    // Users.findById(number, function(err, user) {
    //     res.json(user);
    // });

    Users.find({
        'user_mobile': number
    }, function(err, result) {
        if (err) throw err;
        if (result) {
            res.json(result)
        } else {
            res.send(JSON.stringify({
                error : 'Error'
            }))
        }
    })
});

userRoutes.route('/add').post(function(req, res) {
    let user = new Users(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});


userRoutes.route('/update/:id').post(function(req, res) {
    Users.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
            user.user_name = req.body.user_name;
            user.user_email = req.body.user_email;
            user.user_mobile = req.body.user_mobile;
            user.user_status = req.body.user_status;

            user.save().then(user => {
                res.json('user updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/users', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});