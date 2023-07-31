const {
  RtcTokenBuilder,
  RtcRole,
} = require("agora-access-token");

const generateJoinChannelToken = (teacherId = "", studentId = "") => {
  let appId = process.env.AGORA_APPID;
  let appCert = process.env.AGORA_APPCERT;
  let channel = teacherId + studentId;
  const uid = 0;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 36000;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  // Build token with uid
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCert,
    channel,
    uid,
    role,
    privilegeExpiredTs
  );
  console.log("Token with integer number Uid: " + token);
  return {
    appId,
    token,
    channel,
  };
};

module.exports = {
  generateJoinChannelToken,
};
