/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;

module.exports = function(app) {
  app.route("/api/threads/:board").post((req, res) => {
    const { board } = req.params;
    res.redirect(`/b/${board}`);
  });

  app.route("/api/replies/:board");
};
