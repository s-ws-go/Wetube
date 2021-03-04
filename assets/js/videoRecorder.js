const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log(stream);
    videoPreview.srcObject = stream;
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording!";
  } catch (error) {
    console.log(error);
    recordBtn.innerHTML = "T_T Cannot record!";
    recordBtn.removeEventListener("click", startRecording);
  }
};

function init() {
  recordBtn.addEventListener("click", startRecording);
}

if (recordContainer) {
  init();
}
