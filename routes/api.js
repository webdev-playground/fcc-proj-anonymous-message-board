/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const mongoose = require('mongoose');
const Board = require('../models/board');
const Thread = require('../models/thread');
const Reply = require('../models/reply');

module.exports = function(app) {
  app.route("/api/threads/:board").post(async (req, res) => {
    const { board } = req.params;
    
    const { text, delete_password } = req.body;
    const newThread = new Thread({ text, delete_password });
    
    try {
      const board = await Board.findOneAndUpdate()
    }
    
    res.redirect(`/b/${board}`);
  });

  app.route("/api/replies/:board");
};
