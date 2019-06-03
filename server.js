var express = require('express');
var request = require('request');
var app     = express();
var rp = require('request-promise');

//Default Endpoint
app.get( '/', function(req, res, next ){
  // Start timing now
  console.time("SEARCH TIME");

  //Checking params teste
  if( !req.query.postid || !req.query.siteurl ){
    res.json({
      "error":"WRONG OR MISSING PARAMETERS"
    })
    return;
  }

  var postid  = req.query.postid;
  var baseurl = req.query.siteurl+"/"+postid;

  console.log("SEARCHING POST "+ postid + " AT "+ baseurl);

  var options = { uri: baseurl, simple:true };

  rp( options )
  .then(function ( post_data ) {
    var _post_data_ = JSON.parse( post_data );

    if( _post_data_.code === 'json_post_invalid_id' ){
      //Is not a valid post id
      console.log("INVALID POST ID" + postid);
      console.timeEnd("SEARCH TIME");
      res.json({
        "FINISH": "INVALID_POST_ID"
      });
      return;
    }
    else{
      //Saving Procedure
      MongoClient = require('mongodb').MongoClient, assert = require('assert');
      mongourl = 'mongodb://localhost:27017/wp-to-mongo';

      MongoClient.connect(mongourl, function(err, db) {
        assert.equal(null, err);
        db.collection("posts").update(
          { "ID" : _post_data_.ID }, // query
          { $set : _post_data_ },   // update statement
          { upsert : true },function(err, res){
          if( res ){
            console.log(res.result);
          }
          else if (err) {
            console.error(err);
          }
        })
      })
      console.timeEnd("SEARCH TIME");
      console.log("POST "  + postid  + " Saved successfully");
      res.json({
        "POST" : postid,
        "STATUS" : "Saved successfully"
      });
    }//else end
  })
  .catch(function (err) {
    console.error("ERROR" + err.statusCode);
    console.timeEnd("SEARCH TIME");
    res.json({
      "ERROR" : err,
      "STATUS" : "NOT SAVED"
    });
  });
})

//Run!
app.listen('8484')
console.log('Running at port 8484');
exports = module.exports = app;
