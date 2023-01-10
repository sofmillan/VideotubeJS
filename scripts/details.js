import {youtube} from "../data/data.js";

const cardsContainer=document.querySelector(".cards-container");

const idVideoStr = sessionStorage.getItem("details")?JSON.parse(sessionStorage.getItem("details")):null;

const idVideo = idVideoStr?parseInt(idVideoStr):null;

const videos = sessionStorage.getItem("videos")?JSON.parse(sessionStorage.getItem("videos")):[];


const video = idVideo?videos.find((v)=>v.id==idVideo):{};

const showVideos = (list, container)=>{
    container.innerHTML="";

    list.forEach((v)=>{
        const article = document.createElement("article");
        article.classList.add("card");
        if(video.category==v.category && video.id!=v.id){
            article.innerHTML =`
            <figure class="card-thumbnail">
                <img class="thumbnail" src="${v.thumbnail}" alt="Thumbnail" id="${v.id}">
            </figure>
    
            <div class="card-info">
                <div class="info-text">
                    <h4 class="video-title">${v.title}</h4>
                    <p class="channel-name">${v.channelName}</p>
                    <p><span class="views">${v.views}</span> views - <span class="date">${v.date}</span></p>
                </div>
            </div>
            `;
            container.appendChild(article);
        }   
    })
}

showVideos(youtube,cardsContainer)



const iframe = document.querySelector(".iframe-container");

iframe.innerHTML=`
<div>
<iframe  src="${video.media}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
<div class="card-info">
            <figure>
                <img src="${video.profilePicture}" alt="Profile picture" >
            </figure>
            <div class="info-text">
                <h4 class="video-title">${video.title}</h4>
                <p class="channel-name">${video.channelName}</p>
                <p><span class="views">${video.views}</span> views - <span class="date">${video.date}</span></p>
                <p>Category: ${video.category}</p>
            </div>
        </div>

`;
document.addEventListener("click",(event)=>{
    const {target} = event;

     if(target.classList.contains("thumbnail")){
        sessionStorage.setItem("details",JSON.stringify(target.id));
        window.location.href="../pages/details.html"
     }
});