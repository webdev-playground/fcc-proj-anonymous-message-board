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

  res.redirect(`/b/${board}/`);
};

exports.listThreads = async (req, res) => {
  const { board } = req.params;
  const Thread = ThreadModel.setBoard(board);

  try {
    const threadList = await Thread.find({})
      .sort({ bumped_on: -1 })
      .limit(10)
      .select({
        delete_passwords: 0,
        reported: 0,
        "replies.delete_passwords": 0,
        "replies.reported": 0
      });

    threadList.forEach(thread => {
      thread.replycount = thread.replies.length;
      // Keep last three replies
      if (thread.replies.length > 3) {
        thread.replies = thread.replies.slice(-3);
      }
    });

    return res.status(200).json(threadList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
