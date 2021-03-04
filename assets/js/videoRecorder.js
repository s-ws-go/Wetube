const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;

const handleVideoData = (e) => {
  console.log(e);
};

const startRecording = () => {
  const videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  setTimeout(() => videoRecorder.stop(), 5000);
  //MediaRecorder 특성상, 레코딩이 다 끝나야 handleVideoData가 호출됨
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording!";
    streamObject = stream;
    startRecording();
  } catch (error) {
    console.log(error);
    recordBtn.innerHTML = "T_T Cannot record!";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  } // try든 catch든 이걸로 끝남
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recordContainer) {
  init();
}
