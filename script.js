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
          <div class='reply-input display-none'></div>
    `

    element.replies.forEach(element => {
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
                <span class="reply-to">@${element.replyingTo}</span> ${element.content}
                </p>
              </div>
            </div>
              <!-- col-2 end -->
        </div>
          <!-- comment-text end -->
      </div>
      <div class='reply-input display-none'></div>
      `
      midSection.innerHTML += reply;
    }); 
    wrapper.innerHTML += output;
    const replyBtn = document.querySelectorAll(".reply-btn");
    const plusIcon = document.querySelectorAll(".plus-icon");
    const minusIcon = document.querySelectorAll(".minus-icon");

    incrementVote(plusIcon);
    decrementVote(minusIcon);
    addingReplyDiv(replyBtn);
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

// adding reply div after each comment on click reply btn
let addingReplyDiv = (replyBtn) =>{
  Array.from(replyBtn).forEach((btn)=>{
    btn.addEventListener('click',(e)=>{

      const commentDiv = (e.target.parentElement.parentElement.parentElement.parentElement.parentElement);
      const replyDiv = (e.target.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling);


      const commentDivCol2 = (e.target.parentElement.parentElement.parentElement.nextElementSibling);
      replyDiv.style.width='100%';
      replyDiv.style.display='flex';
      replyDiv.innerHTML=
      `
      <div class="profile-img">
        <img src="./images/avatars/image-juliusomo.webp" alt="profile">
      </div>
      <div class="input">
        <textarea name="" id="reply-input" cols="30" rows="5"></textarea>
      </div>
      <button id="send-btn">
        send
      </button>
      `

      const sendBtn = replyDiv.querySelector("#send-btn");
      const inputTag = replyDiv.querySelector(".input");

      sendBtn.addEventListener('click',(e)=>{
        const textareaTag = replyDiv.querySelector("#reply-input");
        replyDiv.innerHTML='';
        replyDiv.style.padding='0rem';
        sendBtnEvent(replyDiv,textareaTag.value);
      });
      
      // remove div on click on col2
      commentDivCol2.addEventListener("click",()=>{
        replyDiv.innerHTML='';
        replyDiv.style.display='none';
      })
    })
  })
}


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
  sendBtnEvent(bottomSection,replyInput.value);

});

let sendBtnEvent = (section,inputValue) =>{
  const userProfileImage = replyInput.parentElement.previousElementSibling.getElementsByTagName('img')[0].src;
  if(inputValue==='') return;
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
          ${inputValue}
          </p>
        </div>
      </div>
        <!-- col-2 end -->
  </div>
    <!-- comment-text end -->
</div>
  `;

  // const DeleteBtn = document.querySelector(".delete") ;
  // console.log(DeleteBtn);
  // deleteReply(DeleteBtn);

  section.innerHTML+=sendReply;
  replyInput.value='';
}

// delte btn
const deleteReply = (DeleteBtn) =>{
  DeleteBtn.addEventListener("click",(e)=>{
    console.log('i m clicked')
    })
}
