import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const fakeComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  //prepend(a) : a를 앞에다 추가해 줌
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoID = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoID}/comment`,
    method: "POST",
    data: {
      comment,
    },
    //comment : comment 임.(videoController에서 비구조화 할당했던 comment)
  });
  if (response.status === 200) {
    fakeComment(comment);
  }
  console.log(response);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
