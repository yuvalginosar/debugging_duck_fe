import { useState, useEffect } from "react";
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";
export const useRecorderPermission = (
  recordingType
) => {
  const [recorder, setRecorder] = useState();
  useEffect(() => {
    getPermissionInitializeRecorder();
  }, []);
  const getPermissionInitializeRecorder = async () => {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    let recorder = new RecordRTCPromisesHandler(stream, {
      type: recordingType,
    });
    setRecorder(recorder);
  };
  return recorder;
};