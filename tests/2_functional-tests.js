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

chai.use(chaiHttp);

suite("Functional Tests", function() {
  this.timeout(5000);

  setup(async function() {
    // Drop test database
    const Thread = ThreadModel.setBoard("test");
    await Thread.collection.drop();
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
            done();
          })
          .catch(err => {
            throw err;
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
              assert.notProperty(thread, "reported");
              assert.notProperty(thread, "delete_password");
              thread.replies.forEach(reply => {
                assert.notProperty(thread, "reported");
                assert.notProperty(thread, "delete_password");
              });
            });

            done();
          })
          .catch(err => {
            throw err;
          });
      });
    });

    suite("DELETE", function() {});

    suite("PUT", function() {});
  });

  suite("API ROUTING FOR /api/replies/:board", function() {
    suite("POST", function() {});

    suite("GET", function() {});

    suite("PUT", function() {});

    suite("DELETE", function() {});
  });
});
