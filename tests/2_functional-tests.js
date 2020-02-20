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
const Browser = require('zombie');

Browser.localhost('fcc-proj-anonymous-message-board.glitch.me', 3001);
chai.use(chaiHttp);

suite("Functional Tests", function() {
  this.timeout(5000);
  const browser = new Browser();

  // Drop databases
  //IP.collection.drop();
  //Stock.collection.drop();

  suite("API ROUTING FOR /api/threads/:board", function() {
    suite("POST", function() {
      test("redirect to /b/test after posting thread", function(done) {
        chai
          .request(server)
          .post("/api/threads/test")
          .send({ text: "This is a thread", delete_password: "password" })
          .then(res => {
            assert.equal(res.status, 200);
            expect(res).to.redirectTo(/\/b\/test$/);
            
            browser.visit('/b/test');
            browser.assert.text('h3', 'This is a thread');

            done();
          })
          .catch(err => {
            throw err;
          });
      });
    });

    suite("GET", function() {});

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
