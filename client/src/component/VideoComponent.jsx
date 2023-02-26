import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import { useNavigate } from "react-router-dom";

const config = {
  mode: "rtc",
  codec: "vp8",
};
let videoValues;

let appId;
let token;
let channelName;

const VideoComponent = () => {
  videoValues = JSON.parse(localStorage.getItem("video")) || null;
  appId = videoValues?.appId || null;
  token = videoValues?.token;
  channelName = videoValues?.channel;
  console.log(videoValues);
  const navigate = useNavigate();
  useEffect(() => {
    if (videoValues === null) {
      if (JSON.parse(localStorage.getItem("user")).type === "user") {
        navigate("/feedback");
      } else {
        navigate("/profileteacher");
      }
    }
  }, [videoValues]);
  const [inCall, setInCall] = useState(false);
  //   const [channelName, setChannelName] = useState("");
  console.log(appId);
  return (
    <div>
      <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
      {appId ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
      ) : (
        ""
      )}
    </div>
  );
};

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = ({ setInCall, channelName }) => {
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  useEffect(() => {
    // function to initialise the SDK
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);
  return (
    <div className="App">
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
};

const Videos = ({ users, tracks }) => {
  return (
    <div>
      <div id="videos">
        <AgoraVideoPlayer className="vid" videoTrack={tracks[1]} />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

export const Controls = ({ tracks, setStart, setInCall }) => {
  const client = useClient();
  const navigate = useNavigate();
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    stream.getTracks().forEach((track) => track.stop());
  };

  const leaveChannel = async () => {
    tracks[0].close();
    tracks[1].close();
    client.removeAllListeners();
    await client.leave();
    setStart(false);
    setInCall(false);
    localStorage.removeItem("video");
    navigate(0);
  };

  return (
    <div className="controls">
      <p className={trackState.audio ? "on" : ""} onClick={() => mute("audio")}>
        {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
      </p>
      <p className={trackState.video ? "on" : ""} onClick={() => mute("video")}>
        {trackState.video ? "MuteVideo" : "UnmuteVideo"}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  );
};

// const ChannelForm = ({ setInCall, setChannelName }) => {
//   return (
//     <form className="join">
//       {appId === "" && (
//         <p style={{ color: "red" }}>
//           Please enter your Agora App ID in App.tsx and refresh the page
//         </p>
//       )}
//       <input
//         type="text"
//         placeholder="Enter Channel Name"
//         onChange={(e) => setChannelName(e.target.value)}
//       />
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           setInCall(true);
//         }}
//       >
//         Join
//       </button>
//     </form>
//   );
// };

export default VideoComponent;
