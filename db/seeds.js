var mongoose = require('mongoose');
var Grouphug = require('../models/grouphug');
var Tag = require('../models/tag');
var Experience = require('../models/experience');
var Review = require('../models/review');
var User = require('../models/user');
var bluebird = require('bluebird');

var databaseUri = require('../config/db')(process.env.NODE_ENV || "development");
mongoose.connect(databaseUri);
mongoose.Promise = bluebird;

Grouphug.collection.drop();
Tag.collection.drop();
Experience.collection.drop();
User.collection.drop();
Review.collection.drop();

User.create([{
  username: "tesoasdfsn",
  firstName: "tes",
  lastName: "ysont",
  DOB: new Date,
  email: "testy@sont.com",
  password: "password",
  passwordConfirmation: "password",
}, {
  username: "something",
  firstName: "some",
  lastName: "thing",
  DOB: new Date,
  email: "some@thing.com",
  password: "password",
  passwordConfirmation: "password",
}, {
  username: "newname",
  firstName: "new",
  lastName: "name",
  DOB: new Date,
  email: "new@name.com",
  password: "password",
  passwordConfirmation: "password",
}, {
  username: "borednow",
  firstName: "bored",
  lastName: "now",
  DOB: new Date,
  email: "bored@now.com",
  password: "password",
  passwordConfirmation: "password",
}], function(err, users) {
  if(!err) {
    console.log("users created!");
    console.log("users are: ", users);
  } else {
    console.log("err is:", err.errors);
  }
  Tag.create([{
    name: "spa"
  },
  {
    name: "pampering"
  }],function(err, tags) {
    if(!err) {
      console.log("tags created!");
      console.log("tags are: ", tags);
    } else {
      console.log("err is:", err.errors);
    }
    Experience.create([{
      name: "spa weekend",
      supplier: "bens beautification center",
      price: 1000,
      tags: [tags[0]._id, tags[1]._id],
      description: "it's beautiful"
    }, {
      name: "baking",
      supplier: "bens baking center",
      price: 50,
      tags: [tags[0]._id],
      description: "it's baking"
    }, {
      name: "shu winetasting",
      supplier: "shus discount alcohol center",
      price: 2,
      tags: [tags[0]._id, tags[1]._id],
      description: "it's cheap"
    }, {
      name: "wing walking",
      supplier: "bens dropout flight school",
      price: 500,
      tags: [tags[1]._id],
      description: "it's kinda safe"
    }], function(err, experiences) {
      if(!err) {
        console.log("experiences created!");
        console.log("experiences are: ", experiences);
      } else {
        console.log("err is:", err.errors);
      }
      Grouphug.create([{
        name: "mikes pampering weekend",
        description: "mike needs pampering",
        creator: users[0]._id,
        giftee: users[1]._id,
        contributors: [ users[2]._id, users[3]._id],
        experiences: [{
          id: experiences[0]._id,
          userWeightings: [{
            user: users[0]._id,
            weightValue: 5
          }, {
            user: users[3]._id,
            weightValue: 3
          }, {
            user: users[2]._id,
            weightValue: 4
          }]
        }],
        comments: [{
          name: "testyson",
          content: "testing content",
          added: new Date
        }]
      }], function(err, grouphugs) {
        if(!err) {
          console.log("grouphugs created!");
          console.log("grouphugs are: ", grouphugs);
        } else {
          console.log("err is:", err.errors);
        }
        Review.create([{
          title: "fantastic",
          content: "had a great time!",
          rating: 3,
          user: users[1]._id,
          experience: experiences[0]._id,
          added: new Date        
        }, {
          title: "crap",
          content: "not as cheap as advertised",
          rating: 1,
          user: users[3]._id,
          experience: experiences[2]._id,
          added: new Date        
        }], function(err, reviews) {
          if(!err) {
            console.log("reviews created!");
            console.log("reviews are: ", reviews);
          } else {
            console.log("err is:", err.errors);
          }
          mongoose.connection.close();
        })
      })
    })
  })
})