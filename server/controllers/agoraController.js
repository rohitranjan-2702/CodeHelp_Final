const expressAsyncHandler = require("express-async-handler");
const { generateJoinChannelToken } = require("../helpers/agora");
// @desc : get appId, token, channel to join meet
// @route: POST agora/CallCredentials
// @access: private
const getCallCredentials = expressAsyncHandler(async (req, res) => {
  const { teacherId, studentId } = req.body;
  const { appId, token, channel } = generateJoinChannelToken(
    teacherId,
    studentId
  );
  res.send({
    appId,
    token,
    channel,
  });
});

module.exports = { getCallCredentials };
