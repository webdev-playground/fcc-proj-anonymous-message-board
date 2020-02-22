const ThreadModel = require("../models/thread");

exports.createThread = async (req, res) => {
  const { board } = req.params;
  const Thread = ThreadModel.setBoard(board);

  const { text, delete_password } = req.body;

  try {
    await Thread.create({ text, delete_password });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  res.redirect(`/b/${board}`);
};

exports.listThreads = async (req, res) => {
  const { board } = req.params;
  const Thread = ThreadModel.setBoard(board);
  
  try {
    const threadList = Thread.find({}).sort({ })
  } catch (err) {
    
  }
};
