/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
const expect = chai.expect;
var server = require("../server");
const ThreadModel = require("../models/thread");
const mongoose = require("mongoose");

chai.use(chaiHttp);

let threadId1;

suite("Functional Tests", function() {
  this.timeout(5000);

  suiteSetup(async function() {
    // Drop test database
    const Thread = ThreadModel.setBoard("test");

    try {
      await Thread.collection.drop();
    } catch (err) {
      console.log(
        "'test' database does not yet exist. Continuing with tests..."
      );
    }
  });

  suite("API ROUTING FOR /api/threads/:board", function() {
    suite("POST", function() {
      test("redirect to /b/test after posting thread", function(done) {
        chai
          .request(server)
          .post("/api/threads/test")
          .send({ text: "This is a thread", delete_password: "password" })
          .then(res => {
            assert.equal(res.status, 200);
            expect(res).to.redirectTo(/\/b\/test\/$/);
          });

        chai
          .request(server)
          .post("/api/threads/test")
          .send({ text: "This is another thread", delete_password: "password" })
          .then(res => {
            assert.equal(res.status, 200);
            expect(res).to.redirectTo(/\/b\/test\/$/);
            done();
          });
      });
    });

    suite("GET", function() {
      test("list recent threads", function(done) {
        chai
          .request(server)
          .get("/api/threads/test")
          .then(res => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.isAtMost(res.body.length, 10);
            res.body.forEach(thread => {
              assert.isArray(thread.replies);
              assert.isAtMost(thread.replies.length, 3);
              assert.property(thread, "_id");
              assert.property(thread, "text");
              assert.property(thread, "created_on");
              assert.property(thread, "bumped_on");
              assert.property(thread, "replies");
              assert.notProperty(thread, "reported");
              assert.notProperty(thread, "delete_password");
              thread.replies.forEach(reply => {
                assert.notProperty(thread, "reported");
                assert.notProperty(thread, "delete_password");
              });
            });

            // set threadId1
            threadId1 = res.body[0]._id;

            done();
          });
      });
    });

    suite("DELETE", function() {
      test("delete thread with wrong password", done => {
        chai
          .request(server)
          .delete("/api/threads/test")
          .send({ thread_id: threadId1, delete_password: "wrongPassword" })
          .then(res => {
            assert.equal(res.status, 400);
            done();
          })
          .catch(err => {
            console.log(err.message);
          });
      });

      test("delete thread with correct password", done => {
        chai
          .request(server)
          .delete("/api/threads/test")
          .send({ thread_id: threadId1, delete_password: "password" })
          .then(res => {
            assert.equal(res.status, 200);
            done();
          });
      });
    });

    suite("PUT", function() {});
  });

  suite("API ROUTING FOR /api/replies/:board", function() {
    suite("POST", function() {});

    suite("GET", function() {});

    suite("PUT", function() {});

    suite("DELETE", function() {});
  });
});
