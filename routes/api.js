/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const mongoose = require("mongoose");
const Board = require("../models/board");
const Thread = require("../models/thread");
const Reply = require("../models/reply");

module.exports = function(app) {
  app
    .route("/api/threads/:board")
    .post(async (req, res) => {
      const { board } = req.params;

      const { text, delete_password } = req.body;
      const newThread = new Thread({ text, delete_password });

      try {
        const updatedBoard = await Board.findOneAndUpdate(
          { name: board },
          { $push: { threads: newThread } },
          { new: true, upsert: true }
        );
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }

      res.redirect(`/b/${board}`);
    })
    .get(async (req, res) => {
      const { board } = req.params;
    
      try {
        const     
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    
      return 
    
  });

  app.route("/api/replies/:board");
};
