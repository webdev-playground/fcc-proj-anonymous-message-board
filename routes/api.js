/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const mongoose = require("mongoose");
const threadHandler = require('../controllers/threadHandler');

module.exports = function(app) {
  app
    .route("/api/threads/:board")
    .post(threadHandler.createThread)
    .get(threadHandler.listThreads);

  app.route("/api/replies/:board");
};
