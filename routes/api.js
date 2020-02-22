/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const mongoose = require("mongoose");
const replyHandler = require('../controllers/replyHandler');
const threadHandler = require('../controllers/threadHandler');

module.exports = function(app) {
  app
    .route("/api/threads/:board")
    .post(threadHandler.createThread)
    .get(threadHandler.listThreads)
    .put(threadHandler.reportThread)
    .delete(threadHandler.deleteThread);

  app.route("/api/replies/:board")
    .post(replyHandler.createReply)
    .get(replyHandler.getReplies)
    .put(replyHandler.reportReply);
};
