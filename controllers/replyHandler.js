const ThreadModel = require("../models/thread");

exports.createReply = (req, res) => {
  const { board } = req.params;
  const Thread = ThreadModel.setBoard(board);
  
  text, delete_password, thread_id
  const { text, delete_password, thread_id } = req.body;
  
  try {
    Thread.findOneAndUpdate(
      { thread_id },
      {
        $push: {
          replies: { text, delete_password }
        }
      },
      { new: true }
    )  
  } catch (err) {
    
  }
  
  bumped_on <- thread
}