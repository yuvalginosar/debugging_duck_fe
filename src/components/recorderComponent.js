import { useState, useEffect } from "react";
import  { RecordRTCPromisesHandler } from "recordrtc";
import axios from 'axios';
import './recorderComponent.css';
import { ColorRing } from  'react-loader-spinner';

export function useRecorderPermission(recordingType){
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

export function AudioRecorder ({setMessages}){
    const [isStartRecording, setIsStartRecording] = useState(false)
    const [isStopRecording, setIsStoptRecording] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const recorder = useRecorderPermission("audio");
    const startRecording = async () => {
        recorder.startRecording();
        setIsStartRecording(!isStartRecording)
        setIsStoptRecording(!isStopRecording)
    };

    const stopRecording = async () => {
        setIsLoading(true)
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
        setIsLoading(false)
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
            {!!!isLoading ? <button className="recording-button" onClick={stopRecording} disabled={isStopRecording} > Stop recording</button>
                :
                <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                }
        </div>
    </div>
  );
};