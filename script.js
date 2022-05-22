const wrapper = document.querySelector(".wrapper .upper-section");
const midSection = document.querySelector(".mid-section .col2");
const sendBtn = document.getElementById("send-btn");
const replyInput = document.querySelector("#reply-input");
const bottomSection = document.querySelector(".bottom-section");

// fecthing data from json file
const Fetchdata = async () => {
  const response = await fetch('data.json');
  const data = await response.json();
  return data;
}

const displayData = async () => {
  const data = await Fetchdata();
  data.comments.forEach(element => {
    const output = `
            <div class="comment" id="${element.id}">
            <!-- vote-wrapper -->
            <div class="vote-wrapper">
              <img class="plus-icon" src="./images/icon-plus.svg" alt="plus">
              <p class="vote-count">${element.score}</p>
              <img class="minus-icon" src="./images/icon-minus.svg" alt="minus">
            </div>
            <!-- vote-wrapper end -->
            <!-- comment-text -->
            <div class="comment-text">
              <!-- col-1 -->
              <div class="col1">
                <!-- user-info -->
                <div class="user-info">
                  <div class="user-profile">
                    <img src="${element.user.image.png}" alt="profile">
                  </div>
                  <p class="user-name">
                    ${element.user.username}
                  </p>
                  <p class="user-name timing">
                    ${element.createdAt}
                  </p>
                </div>
                <!-- user-info-end -->
                <div class="reply-btn">
                  <p><img class="reply-icon" src="./images/icon-reply.svg" alt="icon"><span>Reply</span></p>
                </div>
              </div>
              <!-- col-1 end -->
              <!-- col-2 -->
              <div class="col2">
                <div class="comment-text-content">
                  <p>
                    ${element.content}
                  </p>
                </div>
              </div>
              <!-- col-2 end -->
            </div>
            <!-- comment-text end -->
          </div>
    `

    element.replies.forEach(element => {

      console.log(element);
      const reply = `
      <div class="comment" id="${element.id}">
        <!-- vote-wrapper -->
        <div class="vote-wrapper">
         <img class="plus-icon" src="./images/icon-plus.svg" alt="plus">
          <p class="vote-count">${element.score}</p>
          <img class="minus-icon" src="./images/icon-minus.svg" alt="minus">
        </div>
          <!-- vote-wrapper end -->
          <!-- comment-text -->
        <div class="comment-text">
          <!-- col-1 -->
          <div class="col1">
            <!-- user-info -->
            <div class="user-info">
              <div class="user-profile">
                <img src="${element.user.image.png}" alt="profile">
              </div>
              <p class="user-name">
              ${element.user.username}
              </p>
              <p class="user-name timing">
              ${element.createdAt}
              </p>
            </div>
            <!-- user-info-end -->
              <div class="reply-btn">
                <p><img class="reply-icon" src="./images/icon-reply.svg" alt="icon"><span>Reply</span></p>
              </div>
          </div>
              <!-- col-1 end -->
              <!-- col-2 -->
          <div class="col2">
              <div class="comment-text-content">
                <p>
                <span class="reply-to">@${element.replyingTo}</span>
                ${element.content}
                </p>
              </div>
            </div>
              <!-- col-2 end -->
        </div>
          <!-- comment-text end -->
      </div>
      `

      
      midSection.innerHTML += reply;
    }); 
    wrapper.innerHTML += output;
    const allImg = document.querySelectorAll(".reply-icon");
    const plusIcon = document.querySelectorAll(".plus-icon");
    const minusIcon = document.querySelectorAll(".minus-icon");

    incrementVote(plusIcon);
    decrementVote(minusIcon);
  });
}

// increment vote
let incrementVote = (plusIcon) =>{
  Array.from(plusIcon).forEach(element => {
    element.addEventListener("click", (e) => {
      const vote = parseInt(element.nextElementSibling.innerHTML);
      const voteCount = element.nextElementSibling;
      voteCount.innerHTML = parseInt(voteCount.innerHTML) + 1;
    },{once: true});
  });
};

// decrement vote
let decrementVote = (minusIcon) =>{
  Array.from(minusIcon).forEach(element => {
    element.addEventListener("click", (e) => {
      console.log('i m clicked')
      const vote = parseInt(element.previousElementSibling.innerHTML);
      const voteCount = element.previousElementSibling;
      voteCount.innerHTML = parseInt(voteCount.innerHTML) - 1;
    },{once: true});
  });
};

// adding btn
const addingBtn = async () => {
  await displayData();
  const allComment = document.querySelectorAll(".comment");
  const myReply = allComment[allComment.length - 1];
  const replyBtn = myReply.querySelector(".reply-btn");
  replyBtn.classList.add("display-none");

  const col1 = myReply.querySelector(".col1");

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("edit-delete-btn-container");
  const span1 = document.createElement("span");
  span1.innerHTML = `
  <img src="./images/icon-delete.svg" alt="icon">
  <p class="delete">Delete</p>
  `;
  const span2 = document.createElement("span");
  span2.innerHTML = `
  <img src="./images/icon-edit.svg" alt="icon">
  <p class="edit">Edit</p>
  <p class="save display-none">Save</p>
  `;
  btnContainer.appendChild(span1);
  btnContainer.appendChild(span2);
  col1.appendChild(btnContainer);
}

const selectingReplyText = (editBtn) =>{
  // selceting Txt throught dom 
  const commentText =  editBtn.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".comment-text-content");
  const textarea = document.createElement("textarea");
  textarea.cols = "30";
  textarea.rows = "10";
  const commentTextContent = commentText.querySelector("p");
  
}

// show edit btn
const showEditBtn = (editBtn,saveBtn) =>{
  editBtn.classList.remove("display-none");
  saveBtn.classList.add("display-none");
}
// show delete btn
const showSaveBtn = (editBtn,saveBtn)=>{
  editBtn.classList.add("display-none");
  saveBtn.classList.remove("display-none");
}

// edit Text 
const editText = async () => {
  await addingBtn();
  const editBtn = document.querySelector(".edit");
  const saveBtn = document.querySelector(".save");
  const commentText =  editBtn.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".comment-text-content");
  const textarea = document.createElement("textarea");
  textarea.cols = "30";
  textarea.rows = "10";
  const commentTextContent = commentText.querySelector("p");
  editBtn.addEventListener("click", (e) => {
    showSaveBtn(editBtn,saveBtn);
    textarea.value=`${commentTextContent.textContent.trim()}`
    textarea.classList.add("textarea");
    commentText.replaceChild(textarea,commentTextContent);
  });

  saveBtn.addEventListener("click", (e) => {
    showEditBtn(editBtn,saveBtn);
    commentTextContent.innerHTML=`${textarea.value}`
    commentText.replaceChild(commentTextContent,textarea)
  });
};

// delete comment
const deleteComment = async () => {
  await editText();
  const deleteBtn = document.querySelector(".delete");
  const comment = deleteBtn.parentElement.parentElement.parentElement.parentElement.parentElement;
  deleteBtn.addEventListener("click", (e) => {
    comment.remove();
  });

}
deleteComment();

// adding reply
sendBtn.addEventListener("click",()=>{
  const userProfileImage = replyInput.parentElement.previousElementSibling.getElementsByTagName('img')[0].src;

  if(replyInput.value==='') return;
  const sendReply =  
  `
  <div class="comment" id="">
  <!-- vote-wrapper -->
  <div class="vote-wrapper">
   <img class="plus-icon" src="./images/icon-plus.svg" alt="plus">
    <p class="vote-count">0</p>
    <img class="minus-icon" src="./images/icon-minus.svg" alt="minus">
  </div>
    <!-- vote-wrapper end -->
    <!-- comment-text -->
  <div class="comment-text">
    <!-- col-1 -->
    <div class="col1">
      <!-- user-info -->
      <div class="user-info">
        <div class="user-profile">
          <img src="${userProfileImage}" alt="profile">
        </div>
        <p class="user-name">
        juliusomo
        </p>
        <p class="user-name timing">
          just now
        </p>
      </div>
      <!-- user-info-end -->
        <div class="edit-delete-btn-container">
          <span><img src="./images/icon-delete.svg" alt="icon">
          <p class="delete">Delete</p></span>
          <span>
          <img src="./images/icon-edit.svg" alt="icon">
          <p class="edit">Edit</p>
          <p class="save display-none">Save</p>
          </span>
        </div>
    </div>
        <!-- col-1 end -->
        <!-- col-2 -->
    <div class="col2">
        <div class="comment-text-content">
          <p>
          ${replyInput.value}
          </p>
        </div>
      </div>
        <!-- col-2 end -->
  </div>
    <!-- comment-text end -->
</div>
  `;

  bottomSection.innerHTML+=sendReply;

  replyInput.value='';
});