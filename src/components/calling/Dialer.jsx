
import React, { useEffect, useRef ,useState} from "react";
import { Softphone } from "@frejun/softphone-web-sdk";
import {  useSearchParams } from "react-router-dom";
import axios from "axios";


const Dialer = () => {

  const [callLogs,SetCallLogs]=useState([])
  // const [callAnalytics,SetcallAnalytics]=useState([])
  const [searchParams] = useSearchParams();
      const frejunUserEmail = searchParams.get("frejunUserEmail");
        // const frejunRefreshToken = searchParams.get("frejunRefreshToken");
          const frejunAccessToken = searchParams.get("frejunAccessToken");
  const softphoneRef = useRef(null);
    // const [incomingCall, setIncomingCall] = useState(null); // store incoming call session



  useEffect(() => {
    const initSoftphone = async () => {
      const softphone = new Softphone();
      softphoneRef.current = softphone;

      // Step 1: Login
      await softphone.login({
        type: "OAuth2.0",
        token: frejunAccessToken,   // ✅ must be valid
        email: frejunUserEmail,    // ✅ user’s registered email
      });

      // Step 2: Attach Audio Elements
      const audioElements = {
        remote: document.getElementById("sip-remote-audio"),
        local: document.getElementById("sip-local-audio"),
      };

      // Step 3: Register listeners
      const listeners = {
        onConnectionStateChange: (type, newState) => {
          console.log("Connection:", type, newState);
        },
        onCallCreated: (type, details) => {
          console.log("Call Created:", type, details);
        },
        onCallRinging: (type, details) => {
          console.log("Call Ringing:", type, details);
        },
        onCallHangup: (type, details) => {
          console.log("Call Ended:", type, details);
        },
      };

      // Step 4: Start softphone (❗ must pass listeners + audioElements)
      

      if (!softphone.isStarted) {
  await softphone.start(listeners, audioElements, {
        endSessionOnNavigate: true,
        logoutOnNavigate: true,
      });
}

    };

    initSoftphone();
  }, []);

  // Step 5: Call button
  const handleCall = async () => {
    const phoneNumber = "+919049550954";   // customer number
    const virtualNumber = "+912235008796"; // FreJun virtual number (masking)
    const options = {
      metadata: {
        transactionId: "txn123",
        candidateId: "lead567",
        jobId: "job890",
      },
    };

    try {
      await softphoneRef.current.makeCall(phoneNumber, virtualNumber, options);
      console.log("📞 Call initiated");
    } catch (err) {
      console.error("Call failed:", err);
    }
  };
  
const handleEndCall= async()=>{
   if (softphoneRef.current?.getSession) {
    await softphoneRef.current.getSession.end();
    console.log("☎️ Call ended");
  } else {
    console.warn("No active session to end");
  }
}

 const handleAnswerCall = async () => {
    // if (incomingCall) {
    //   try {
    //     await incomingCall.accept();
    //     console.log("✅ Call answered");
    //   } catch (err) {
    //     console.error("Failed to answer call:", err);
    //   }
    // } else {
    //   console.warn("No incoming call to answer");
    // }
     try {
    if (softphoneRef.current?.getSession) {
      await softphoneRef.current.getSession.accept();
      console.log("✅ Call answered");
    } else {
      console.warn("No incoming call to answer");
    }
  } catch (err) {
    console.error("Error answering call:", err);
  }
  };

const handleCallLogs = async () => {
  try {
    const res = await axios.get("https://api.frejun.com/api/v1/integrations/calls/", {
      headers: {
        Authorization: `Bearer ${frejunAccessToken}`
      }
    });

    if (!res || !res.data) {
      console.error("Error:Call Logs No data received from Frejun API");
      return;
    }

    console.log("Call logs:", res.data.results);
    SetCallLogs(res.data.results)
  } catch (error) {
    console.error("Error fetching call logs:", error.response?.data || error.message);
  }
};
const date_start="2025-09-15"
const date_end="2025-09-15"
const handleCallAnalytics= async () => {
    try {
    const res = await axios.get("https://api.frejun.com/api/v1/integrations/call-analytics/", {
      headers: {
        Authorization: `Bearer ${frejunAccessToken}`
      },
       params: {
        date_start,
        date_end
      }
    });

    if (!res || !res.data) {
      console.error("Error:  Call Analytics No data received from Frejun API");
      return;
    }

    console.log("Call Aanalytics:", res.data);
    // SetcallAnalytics(res.data)
  } catch (error) {
    console.error("Error fetching call logs:", error.response?.data || error.message);
  }
}


  return (
    <div>
      <button onClick={handleCall}>Call</button>
      <button onClick={handleEndCall}>End Call</button>

      <button onClick={handleAnswerCall}>Answer Call</button>

      {/* required audio elements */}
      <audio controls id="sip-local-audio"></audio>
      <audio autoPlay controls id="sip-remote-audio"></audio>

      <button onClick={()=>handleCallLogs(callLogs)}> Get All Call Logs</button>
      <button onClick={handleCallAnalytics}>Get Call Analytics</button>
{callLogs.length >0 && (
  <div>
  {callLogs.map((log,i)=>{
    <p key={i}>{log.candidate_number}</p>
  })}
   </div>
)} 
</div>  );
};

export default Dialer;
