const ThreadModel = require("../models/thread");

exports.createReply = async (req, res) => {
  const { board } = req.params;
  const Thread = ThreadModel.setBoard(board);

  const { text, delete_password, thread_id } = req.body;

  const newReply = { text, delete_password };

  try {
    await Thread.findOneAndUpdate(
      { thread_id },
      {
        $push: {
          replies: newReply
        },
        $currentDate: {
          bumped_on: true
        }
      }
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
    const foundThread = await Thread.findById(thread_id)
      .select({
        delete_password: 0,
        reported: 0,
        "replies.delete_password": 0,
        "replies.reported": 0
      });
    
    if (!foundThread) {
      return res.status(404).json({ error: 'No such thread.' });
    }
    
    return res.status(200).json(foundThread);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
