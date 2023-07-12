import { useState, useEffect } from "react";
import  { RecordRTCPromisesHandler } from "recordrtc";
import axios from 'axios';
import './recorderComponent.css'

export const useRecorderPermission = (
    recordingType
) => {
    const [recorder, setRecorder] = useState();
    useEffect(() => {
        getPermissionInitializeRecorder();
    }, []);

    const getPermissionInitializeRecorder = async () => {
        let stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        let recorder = new RecordRTCPromisesHandler(stream, {
        type: recordingType,
        });
        setRecorder(recorder);
    };
    return recorder;
};

export const AudioRecorder = ({setMessages}) => {
    const [isStartRecording, setIsStartRecording] = useState(false)
    const [isStopRecording, setIsStoptRecording] = useState(true)

    const recorder = useRecorderPermission("audio");
    const startRecording = async () => {
        recorder.startRecording();
        setIsStartRecording(!isStartRecording)
        setIsStoptRecording(!isStopRecording)
    };

    const stopRecording = async () => {
        await recorder.stopRecording();
        let audioBlob = await recorder.getBlob();
        const formData = new FormData();
        let fileName = `${audioBlob}.wav`;
        let file = new File([audioBlob], fileName);
        formData.append('audio', file, fileName);

        try {
            const response = await axios.post('http://localhost:8000/voice', formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
            });
        setMessages(response.data)
        setIsStartRecording(!isStartRecording)
        setIsStoptRecording(!isStopRecording)
        } catch (error) {
            console.log('Error:', error);
        }
    };

  return (
    <div className="container">
        <h3>Record audio prompt:</h3>
        <div className="button-group">
            <button className="recording-button" onClick={startRecording} disabled={isStartRecording} > Start recording</button>
            <button className="recording-button" onClick={stopRecording} disabled={isStopRecording} > Stop recording</button>
        </div>
    </div>
  );
};