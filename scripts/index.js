import { youtube } from "../data/data.js";

const cardsContainer = document.querySelector(".cards-container");
const btnAll = document.querySelector("#all");
const btnProgramming = document.querySelector("#programming");
const btnMusic = document.querySelector("#music");
const btnDesign = document.querySelector("#uxdesign");
const searchForm= document.querySelector(".search");
const searchInput = document.querySelector("#inputSearch");
let encontrado = [];
const showVideos = (list, container) => {
  container.innerHTML = "";

  list.forEach((video) => {
    const article = document.createElement("article");
    article.classList.add("card");
    article.innerHTML = `
        <figure class="card-thumbnail">
            <img src="${video.thumbnail}" id="${video.id}" alt="Thumbnail" class="thumbnail">
        </figure>

        <div class="card-info">
            <figure>
                <img src="${video.profilePicture}" alt="Profile picture">
            </figure>
            <div class="info-text">
                <h4 class="video-title">${video.title}</h4>
                <p class="channel-name">${video.channelName}</p>
                <p><span class="views">${video.views}</span> views - <span class="date">${video.date}</span></p>
            </div>
            <button class="deletebtn"><img src="./img/trash.png" name="${video.id}" class="delete"}></button>
            

        </div>
        `;
        
    container.appendChild(article);
    
  });
  encontrado=[];
};

// showVideos(youtube,cardsContainer)

let videos = sessionStorage.getItem("videos")
  ? JSON.parse(sessionStorage.getItem("videos"))
  : [];

document.addEventListener("DOMContentLoaded", () => {
  if (videos.length === 0) {
    sessionStorage.setItem("videos", JSON.stringify(youtube));
    videos = JSON.parse(sessionStorage.getItem("videos"));
    console.log(videos);
  }
  showVideos(videos, cardsContainer);
});

const filterButtons = [btnAll, btnDesign, btnProgramming, btnMusic];

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let filtered = [];

    if (button.id === "all") {
      filtered = videos;
    } else {
      filtered = videos.filter((video) => video.category == button.id);
    }
    showVideos(filtered, cardsContainer);
  });
});

document.addEventListener("click", (event) => {
  const { target } = event;

  if(target.classList.contains("delete")){
    const confirmDelete = confirm("Are you sure you want to delete?");

    if(confirmDelete){
      const idVideo = parseInt(target.name);
      const positionVideo = videos.findIndex(video=>video.id===idVideo);
      videos.splice(positionVideo,1);
      showVideos(videos, cardsContainer);
    }
  }

  if (target.classList.contains("thumbnail")) {
    sessionStorage.setItem("details", JSON.stringify(target.id));
    window.location.href = "../pages/details.html";
  }
});


searchForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  
  let inputvalue = searchInput.value.toLowerCase();

  if(inputvalue!=""){
    videos.forEach((video)=>{
    let title = video.title.toLowerCase();

    if(title.match(inputvalue)){
      encontrado.push(video);
    }
  })
  
  showVideos(encontrado, cardsContainer);
  
  }

  
  
})

// if(inputvalue!=""){
//   videos.forEach((video)=>{
//   let title = video.title.toLowerCase();

//   if(title.match(inputvalue)){
//     encontrado.push(video);
    
//   }
//   showVideos(encontrado, cardsContainer);
// })
// }