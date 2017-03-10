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

EmailTemplate.create([{
  name: "Registration",
  subject: 'Hey,|userFirstName|, Welcome to GroupHug!',
  text: "This is the text version from GroupHug. Hi {{firstName}}, thank you for registering with us. This account was created at {{createdAt}}.",
  html: "<head><style>.body{background-color: #E4DFDA}h1{color: #4281a4}</style></head><body class='body'><h1>GroupHug</h1><br><h3>Hi |userFirstName|, You just registered with GroupHug, yeah!|newParagraph| You can now create a GroupHug for your friends or contribute to a GroupHug someone else has already set up.|newParagraph|Just to check, we have you registered as |userFirstName| |userLastName|, if you didn't register with us or you think this email is not for you please call the lovely people at GroupHug who can try and rectify things for you ....EVENTUALLY THERE WILL BE A CONFIRM YOUR ACCOUNT LINK HERE....</h3><h3>|newParagraph| This account was created at |createdAt|.</h3></body>",
  delay: 60*2
}, {
  name: "NewUserInvite",
  subject: '|email|Welcome to GroupHug!',
  text: "Hello |email|, |creatorFirstName| |creatorLastName| has invited you to contribute to the person whose name will appear here's Group Hug.  To participate you will need to log on at grouphug.co.uk user your |email| as your username and this |password|. Thanks the lovely pepole at GrougHug",
  html: "<head><style>.body{background-color: #E4DFDA}h1{color: #4281a4}</style></head><body class='body'><h1>GroupHug</h1><br><h3>Hi |userFirstName|, |creatorFirstName| |creatorLastName| has invited you to contribute to |gifteeFirstName| |gifteeLastName|'s Group Hug.</h3><h3>This account was created at |createdAt|.</h3><h3>What is a group hug I here you ask why not log in now at localhost:3000 using your email |email| as your username and |password| as your password. Please be sure to set a new password when registering.|newParagraph| GH TEAM</h3></body>",
  delay: 60*2
}, {
  name: "ContributorInvitation",
  subject: '|userFirstName|You have a new GroupHug Invitation to |groupHugName|....',
  text: "Hello |email|, |creatorFirstName| |creatorLastName| has invited you to contribute to the person whose name will appear here's Group Hug.  To participate you will need to log on at grouphug.co.uk user your |email| as your username and this |password|. Thanks the lovely pepole at GrougHug",
  html: "<head><style>.body{background-color: #E4DFDA}h1{color: #4281a4}</style></head><body class='body'><h1>GroupHug</h1><br><h3>Hi |userFirstName|, |creatorFirstName| |creatorLastName| has invited you to contribute to |gifteeFirstName| |gifteeLastName|'s Group Hug.</h3><h3>To contribute to this Group Hug for |gifteeFirstName| just go to www.grouphug.co.uk log in and click the 'my Invitation' link to accept the invitation and see what its all about|newParagraph| GH TEAM</h3></body>",
  delay: 60*2
}, {
  name: "GHActivate",
  subject: 'Your Group Hug, |GHName|, has been activated',
  text: "Hello |creatorFirstName|, the lovely people at GroupHug headquarters have done all the fiddly bits behind the scenes so your wonderful GroupHug is ready to go! Simply log on to GroupHug now got 'My Group Hugs' and find |GHName| once you have checked everything just click the 'GO LIVE' button to invite all your friends to participate and wait for our next exciting email to arrive. GH TEAM",
  html: "<head><style>.body{background-color: #E4DFDA}h1{color: #4281a4}</style></head><body class='body'><h1>GroupHug</h1><br><h3>Hello |creatorFirstName|, the lovely people at GroupHug headquarters have done all the fiddly bits behind the scenes so your wonderful GroupHug for |gifteeFirstName| |gifteeLastName| is ready to go! Simply log on to GroupHug now go to 'My Group Hugs' and find |GHName| once you have checked everything just click the 'GO LIVE' button to invite all your friends to participate and wait for our next exciting email to arrive.|newParagraph| GH TEAM</h3></body>",
  delay: 60*2
}],function(err, EmailTemplate) {
    if(!err) {
      console.log("EmailTemplate Created");
      console.log("EmailTemplates are: ", EmailTemplate);
    } else {
      console.log("err is:", err.errors);
    }

User.create([{
  firstName: "jack",
  lastName: "smith",
  DOB: new Date,
  email: "jack@smith.com",
  password: "password",
  passwordConfirmation: "password",
}, {
  firstName: "julia",
  lastName: "leslie",
  DOB: new Date,
  email: "julia@leslie.com",
  password: "password",
  passwordConfirmation: "password",
}, {
  firstName: "harry",
  lastName: "downer",
  DOB: new Date,
  email: "harry@downer.com",
  password: "password",
  passwordConfirmation: "password",
}, {
  firstName: "george",
  lastName: "grant",
  DOB: new Date,
  email: "george@grant.com",
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
      supplier: "flight stunts",
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
          title: "good",
          content: "had a lot of fun!",
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
})