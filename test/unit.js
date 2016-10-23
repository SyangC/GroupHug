process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../app');
var Grouphug = require('../models/grouphug');

var should = chai.should();
chai.use(chaiHttp);

describe('Grouphugs', function() {

  Grouphug.collection.drop();

  beforeEach(function(done) {
    var newGrouphug = new Grouphug({
      name: "test",
      description: "description test",
      // creator: 1,
      // giftee: 1,
      gifteeEmailAddress: "test@test.com",
      // contributors: 1,
      // contributorEmailAdresses: ["test1@email.com", "test2@email.com"],
      // contributionTotal: 215,
      // experiences: [
      //   { experienceId: 1 },
      //   { userWeightings: [
      //     { user: 1 },
      //     { weightValue: 1 }
      //   ]
      //   }],
      // comments: [{
      //   name: "test",
      //   content: "test",
      //   added: new Date()
      // }]
    });
    newGrouphug.save(function(err) {
      done();
    });
  });
  afterEach(function(done) {
    Grouphug.collection.drop();
    done();
  });

  it('should list ALL grouphugs on /api/grouphugs GET', function(done) {
    chai.request(server)
      .get('/api/grouphugs')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('description');
        res.body[0].should.have.property('gifteeEmailAddress');
        res.body[0].name.should.equal('test');
        res.body[0].description.should.equal('description test');
        res.body[0].gifteeEmailAddress.should.equal('test@test.com');
        done();
      });
    });

  it('should LIST a SINGLE grouphug on /grouphug/<id> GET', function(done) {

    var newGrouphug = new Grouphug({
      name: 'test',
      description: 'test test',
      gifteeEmailAddress: 'test@idtest.com'
    });
    newGrouphug.save(function(err, data) {
      chai.request(server)
        .get('/api/grouphugs/' + data.id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('description');
          res.body.should.have.property('gifteeEmailAddress');
          res.body.name.should.equal('test');
          res.body.description.should.equal('test test');
          res.body.gifteeEmailAddress.should.equal('test@idtest.com');
          res.body._id.should.equal(data.id);
          done();
        });
    });
  });

  it('should ADD a SINGLE grouphug on /api/grouphugs POST', function(done) {
    chai.request(server)
      .post('/api/grouphugs')
      .send({'name': 'post test', 'description': 'post description', 'gifteeEmailAddress': 'test@post.com'})
      .end(function(err, res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body.should.have.property('gifteeEmailAddress');
        res.body.name.should.equal('post test');
        res.body.description.should.equal('post description');
        res.body.gifteeEmailAddress.should.equal('test@post.com');
        done();
      });
  });

  it('should UPDATE a SINGLE grouphug on /grouphugs/<id> PUT', function(done) {
    chai.request(server)
      .get('/api/grouphugs')
      .end(function(err, res) {
        chai.request(server)
          .put('/api/grouphugs/' + res.body[0]._id)
          .send({'name': 'Frank'})
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.name.should.equal('Frank');
            res.body.should.have.property('_id');
            res.body.should.have.property('description');
            res.body.should.have.property('gifteeEmailAddress');
            done();
          });
      });
  });

  it('should DELETE a single grouphug on /api/grouphugs/<id> DELETE', function(done) {
    chai.request(server)
      .get('/api/grouphugs/')
      .end(function(err, res) {
        chai.request(server)
          .delete('/api/grouphugs/' + res.body[0]._id)
          .end(function(err, res) {
            res.should.have.status(204);
            res.body.should.be.a('object');
            done();
          });
      });
  });
});
