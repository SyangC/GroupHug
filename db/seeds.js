var mongoose = require('mongoose');
var Grouphug = require('../models/grouphug');
var Ecard = require('../models/ecard');
var Tag = require('../models/tag');
var Experience = require('../models/experience');
var Review = require('../models/review');
var User = require('../models/user');
var EmailTemplate = require('../models/emailTemplate');
var bluebird = require('bluebird');

var databaseUri = require('../config/db')(process.env.NODE_ENV || "development");
mongoose.connect(databaseUri);
mongoose.Promise = bluebird;

Grouphug.collection.drop();
Tag.collection.drop();
Experience.collection.drop();
User.collection.drop();
Review.collection.drop();
EmailTemplate.collection.drop();
Ecard.collection.drop();

EmailTemplate.create({
  name: "Registration",
  subject: '{{firstName }}, Welcome to GroupHug!',
  text: "This is the text version from GroupHug. Hi {{firstName}}, thank you for registering with us. This account was created at {{createdAt}}.",
  html: "<head><style>.body{background-color: #E4DFDA}h1{color: #4281a4}</style></head><body class='body'><h1>GroupHug</h1><br><h3>Hi {{firstName}}, thank you for registering with us.</h3><h3>This account was created at {{createdAt}}.</h3></body>",
  delay: 60*2
});

User.create([{
  username: "testing",
  firstName: "testy",
  lastName: "McTesterson-Face",
  DOB: new Date,
  email: "test@test.com",
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
      tags: [tags[0], tags[1]],
      description: "it's beautiful"
    }, {
      name: "baking",
      supplier: "bens baking center",
      price: 50,
      tags: [tags[0]],
      description: "it's baking"
    }, {
      name: "shu winetasting",
      supplier: "shus discount alcohol center",
      price: 2,
      tags: [tags[0], tags[1]],
      description: "it's cheap"
    }, {
      name: "wing walking",
      supplier: "bens dropout flight school",
      price: 500,
      tags: [tags[1]],
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
        creator: users[0],
        giftee: users[1],
        contributors: [ users[2], users[3]],
        experiences: [{
          experienceId: experiences[0],
          userWeightings: [{
            user: users[0],
            weightValue: 5
          }, {
            user: users[3],
            weightValue: 3
          }, {
            user: users[2],
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
          // mongoose.connection.close();
          Ecard.create([{
            title: "Thanks you guys",
            description: "had a great time!",
            grouphug: grouphugs[0]._id    
          }], function(err, ecards) {
            if(!err) {
              console.log("ecards created!");
              console.log("ecards are: ", ecards);
            } else {
              console.log("err is:", err.errors);
            }
            grouphugs[0].ecard = ecards[0]._id;
            grouphugs[0].save(function(err) {
              console.log('grouphugs', grouphugs);
              mongoose.connection.close();
            });
          })
        })
      })
    })
  })
})