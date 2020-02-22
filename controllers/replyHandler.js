const ThreadModel = require("../models/thread");

exports.createReply = async (req, res) => {
  const { board } = req.params;
  const Thread = ThreadModel.setBoard(board);

  const { text, delete_password, thread_id } = req.body;

  const newReply = { text, delete_password };

  try {
    const updated = await Thread.findByIdAndUpdate(
      thread_id,
      {
        $push: {
          replies: newReply
        },
        $currentDate: {
          bumped_on: true
        }
      },
      { new: true }
    );
    return res.redirect(`/b/${board}/${thread_id}/`);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getReplies = async (req, res) => {
  const { board } = req.params;
  const Thread = ThreadModel.setBoard(board);

  const { thread_id } = req.query;

  try {
    const foundThread = await Thread.findById(thread_id).select({
      delete_password: 0,
      reported: 0,
      "replies.delete_password": 0,
      "replies.reported": 0
    });

    if (!foundThread) {
      return res.status(404).json({ error: "No such thread." });
    }

    return res.status(200).json(foundThread);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.reportReply = async (req, res) => {
  const { board } = req.params;
  const Thread = ThreadModel.setBoard(board);

  const { thread_id, reply_id } = req.body;

  try {
    const reportedReply = await Thread.findOneAndUpdate(
      { _id: thread_id, "replies._id": reply_id },
      {
        $set: {
          "replies.$.reported": true // use positional operator to immediately update the correct reply
        }
      },
      { new: true }
    );

    if (!reportedReply) {
      return res.status(404).json({ error: "Not found" });
    }

    return res.status(200).send("success");
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteReply = async (req, res) => {
  const { board } = req.params;
  const Thread = ThreadModel.setBoard(board);
  const { thread_id, reply_id, delete_password } = req.body;
  
  try {
    const deletedReply = await Thread.findOneAndUpdate(
      { _id: thread_id, "replies._id": reply_id, "replies.delete_password": delete_password },
      {
        $set: {
          "replies.$.text": '[deleted]'
        }
      },
      { new: true }
    );
    
    if (!deletedReply) {
      return res.status(400).send('invalid thread id or reply id, or incorrect password');
    }
    
    return res.status(200).send('success');
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}