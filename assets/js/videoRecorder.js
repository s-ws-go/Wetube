const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
  console.log(event);
  // 파일 링크 비구조화
  const { data: videoFile } = event;
  //파일 URL 생성 _ a 속성 생성
  const link = document.createElement("a");
  //파일 URL 생성 _ a 속성의 링크를 비구조화한 videofile의 링크로 설정
  link.href = URL.createObjectURL(videoFile);
  //다운로드 설정(파일명)
  link.download = "recorded.mp4";
  //body의 동영상객체중에 마지막에 저장했던 놈 삭제
  document.body.appendChild(link);
  //클릭명령어(fake) 부여해서 정지하는 즉시 저장되게 만듬
  link.click();
};
//blob 객체 호출 됨 __ 이진수로 된 객체

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  //MediaRecorder 특성상, 레코딩이 다 끝나야 handleVideoData가 호출됨
  recordBtn.addEventListener("click", stopRecording);
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.addEventListener("click", getVideo);
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.innerHTML = "Start recording!";
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
