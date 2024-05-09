/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState } from 'react';
import Navbar from '@/components/navbar';
const Recorder = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);

  const otherRecorder = (selectedMedia) => {
    return selectedMedia === "vid" ? "aud" : "vid";
  };

  const handleMediaChange = (e) => {
    const selectedMedia = e.target.value;
    setSelectedMedia(selectedMedia);
    document.getElementById(`${selectedMedia}-recorder`).style.display = "block";
    document.getElementById(`${otherRecorder(selectedMedia)}-recorder`).style.display = "none";
  };

  const startRecording = (thisButton, otherButton) => {
    const constraints = selectedMedia === "vid" ? { audio: true, video: true } : { audio: true, video: false };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        const mediaRecorder = new MediaRecorder(mediaStream);
        setMediaStream(mediaStream);
        setMediaRecorder(mediaRecorder);

        mediaRecorder.start();

        mediaRecorder.ondataavailable = (e) => {
          setChunks([...chunks, e.data]);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: selectedMedia === "vid" ? "video/mp4" : "audio/mpeg" });
          const recordedMediaURL = URL.createObjectURL(blob);

          const recordedMedia = document.createElement(selectedMedia === "vid" ? "video" : "audio");
          recordedMedia.controls = true;
          recordedMedia.src = recordedMediaURL;

          const downloadButton = document.createElement("a");
          downloadButton.download = "Recorded-Media";
          downloadButton.href = recordedMediaURL;
          downloadButton.innerText = "Download it!";

          downloadButton.onclick = () => {
            URL.revokeObjectURL(recordedMedia);
          };

          document.getElementById(`${selectedMedia}-recorder`).append(recordedMedia, downloadButton);
        };

        if (selectedMedia === "vid") {
          document.getElementById('web-cam-container').srcObject = mediaStream;
        }

        document.getElementById(`${selectedMedia}-record-status`).innerText = "Recording";
        thisButton.disabled = true;
        otherButton.disabled = false;
      });
  };

  const stopRecording = (selectedMedia, thisButton, otherButton) => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      document.getElementById(`${selectedMedia}-record-status`).innerText = "Recording done!";
      thisButton.disabled = true;
      otherButton.disabled = false;
  
      // Combine all the recorded chunks into a single Blob
      const recordedBlob = new Blob(chunks, { type: selectedMedia === "vid" ? "video/mp4" : "audio/mpeg" });
  
      // Create a URL for the Blob
      const recordedMediaURL = URL.createObjectURL(recordedBlob);
  
      // Create a temporary anchor element to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = recordedMediaURL;
      downloadLink.download = "recorded-media." + (selectedMedia === "vid" ? "mp4" : "mp3");
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      // Cleanup the URL and anchor element
      URL.revokeObjectURL(recordedMediaURL);
      document.body.removeChild(downloadLink);
    }
  };
  
  

  return (
    <div>
        <Navbar/>
    <div className="flex flex-col items-center justify-center h-screen border-2 mx-72 border-[#baa] my-10  bg-[#090909]">
        
      <h1 className="text-3xl font-bold mb-8"> Video & Audio Recorder </h1>
      <label htmlFor="media" className="mb-4"> Select what you want to record: </label>
      <select id="media" onChange={handleMediaChange} className="mb-8 p-2 rounded-md bg-[#090909]">
        <option value="choose-an-option"> Choose an option </option>
        <option value="vid">Video</option>
        <option value="aud">Audio</option>
      </select>

      <div className="display-none " id="vid-recorder">
        <h3>Record Video</h3>
        <video autoPlay id="web-cam-container" className="mb-4" style={{ backgroundColor: "white" }}>
          Your browser doesn't support the video tag
        </video>

        <div className="recording mb-4" id="vid-record-status">
          Click the "Start video Recording" button to start recording
        </div>

        <button type="button" id="start-vid-recording" onClick={(e) => startRecording(e.target, document.getElementById('stop-vid-recording'))} className="bg-[#c92eff] w-fit rounded-lg hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff]  mr-4">
          Start
        </button>

        <button type="button" id="stop-vid-recording" disabled onClick={(e) => stopRecording(e.target, document.getElementById('start-vid-recording'))} className="bg-[#c92eff] w-fit rounded-lg hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff] ">
          Stop
        </button>
      </div>

      <div className="display-none" id="aud-recorder">
        <h3>Record Audio</h3>

        <div className="recording mb-4" id="aud-record-status">
          Click the "Start Recording" button to start recording
        </div>

        <button type="button" id="start-aud-recording" onClick={(e) => startRecording(e.target, document.getElementById('stop-aud-recording'))} className="bg-[#c92eff] w-fit rounded-lg hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff]  mr-4">
          Start
        </button>

        <button type="button" id="stop-aud-recording" onClick={(e) => stopRecording(e.target, document.getElementById('start-aud-recording'))} className="bg-[#c92eff] w-fit rounded-lg hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff] ">
          Stop 
        </button>
      </div>
      </div>
    </div>
  );
};

export default Recorder;
