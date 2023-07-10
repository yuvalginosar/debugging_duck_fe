import { useState, useEffect } from "react";
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";
import { invokeSaveAsDialog } from "recordrtc";
import axios from 'axios';

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

export const AudioRecorder = () => {
  
    const recorder = useRecorderPermission("audio");
    const startRecording = async () => {
        recorder.startRecording();
    };

    const stopRecording = async () => {
        await recorder.stopRecording();
        let audioBlob = await recorder.getBlob();
    // invokeSaveAsDialog(blob, `random_name.webm`);
        const formData = new FormData();
        let fileName = `${audioBlob}.wav`;
        let file = new File([audioBlob], fileName);

        formData.append('audio', file, fileName);

        try {
            const response = await axios.post('http://localhost:8000/chat', formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
            });
        console.log(response)
        } catch (error) {
            console.log('Error:', error);
        }
    };

  return (
    <div>
      <button onClick={startRecording}> Start recording</button>
      <button onClick={stopRecording}> Stop recording</button>
    </div>
  );
};