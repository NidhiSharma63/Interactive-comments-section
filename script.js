const wrapper = document.querySelector(".wrapper .upper-section");
const midSection = document.querySelector(".mid-section .col2");
// console.log(midSection)


// fecthing data from json file
const Fetchdata = async () => {
  const response = await fetch('data.json');
  const data = await response.json();
  return data;
}
Fetchdata();

const displayData = async () => {
  const data = await Fetchdata();
  console.log(data.comments);
  data.comments.forEach(element => {
    const output = `
            <div class="comment" id="${element.id}">
            <!-- vote-wrapper -->
            <div class="vote-wrapper">
              <img src="./images/icon-plus.svg" alt="plus">
              <p class="vote-count">${element.score}</p>
              <img src="./images/icon-minus.svg" alt="minus">
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
                </div>
                <!-- user-info-end -->
                <div class="reply-btn">
                  <p><img src="/images/icon-reply.svg" alt="icon"><span>Reply</span></p>
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
      const reply = `
      <div class="comment" id="${element.id}">
        <!-- vote-wrapper -->
        <div class="vote-wrapper">
         <img src="./images/icon-plus.svg" alt="plus">
          <p class="vote-count">${element.score}</p>
          <img src="./images/icon-minus.svg" alt="minus">
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
            </div>
            <!-- user-info-end -->
              <div class="reply-btn">
                <p><img src="/images/icon-reply.svg" alt="icon"><span>Reply</span></p>
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
      midSection.innerHTML += reply;
    }); 
     wrapper.innerHTML += output;
  });
}



const addingBtn = async () => {
  await displayData();
  const allComment = document.querySelectorAll(".comment");
  const myReply = allComment[allComment.length - 1];
  const replyBtn = myReply.querySelector(".reply-btn");
  replyBtn.classList.add("display-none");

  const col1 = myReply.querySelector(".col1");

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("reply-btn-container");
  const span1 = document.createElement("span");
  span1.innerHTML = `
  <img src="/images/icon-delete.svg" alt="icon">
  <p class="delete">Delete</p>
  `;
  const span2 = document.createElement("span");
  span2.innerHTML = `
  <img src="/images/icon-edit.svg" alt="icon">
  <p class="edit">Edit</p>
  `;
  btnContainer.appendChild(span1);
  btnContainer.appendChild(span2);
  col1.appendChild(btnContainer);
}

// edit Text 
const editText = async () => {
  await addingBtn();
  const editBtn = document.querySelector(".edit");
  editBtn.addEventListener("click", (e) => {
    const commentText =  e.target.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".comment-text-content");
    const commentTextContent = commentText.querySelector("p");
    const textarea = document.createElement("textarea");
    textarea.cols = "30";
    textarea.rows = "10";
    textarea.innerHTML = commentTextContent.innerHTML;
    textarea.classList.add("textarea")
    console.log(textarea);
    commentText.replaceChild(textarea,commentTextContent)
  });
}
editText();