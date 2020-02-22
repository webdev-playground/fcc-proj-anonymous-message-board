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
        delete_password: 0,
        reported: 0,
        "replies.delete_password": 0,
        "replies.reported": 0
      }).lean();  // specify lean so that we get a plain JS Object that we can insert new properties into

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

exports.deleteThread = async (req, res) => {
  const { board } = req.params;
  const Thread = ThreadModel.setBoard(board);

  const { thread_id, delete_password } = req.body;
  
  try {
    // issue delete request
    const deletedThread = await Thread.deleteOne({ _id: thread_id, delete_password: delete_password });
    if (!deletedThread) {
      return res.status(400).json({ error: 'Invalid thread_id or delete_password.'});
    }
    console.log(deletedThread);
    return res.status(200).json({ message: 'Thread deleted.' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}