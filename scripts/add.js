const form =document.querySelector(".form");

let videos = sessionStorage.getItem("videos")?JSON.parse(sessionStorage.getItem("videos")):null;

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    
    const valuesForm = Object.values(form);

    const newVideo = {};
    newVideo.id=videos.length+1;
    valuesForm.forEach((input)=>{
        if(input.id){
            newVideo[input.id] =input.value;
        }
    });

    

   const keyArray = [
    {keyName:"title"},
    {keyName:"channelName"},
    {keyName:"views"},
    {keyName:"date"},
    {keyName:"profilePicture"},
    {keyName:"thumbnail"},
    {keyName:"media"},
    {keyName:"category"},
    {keyName:"id"}
   ];

   let keyStr = "";

   for(const key in newVideo){
    const videoProperty = newVideo[key];

    if(!videoProperty){
        const found = keyArray.find(label => label.keyName==key);
        keyStr = found.keyName;
    }
   }
   console.log(keyStr);

   if(keyStr){
    let msg = `Fill the ${keyStr} input`;
    alert(msg);
    return;
   }

videos.push(newVideo);
sessionStorage.setItem("videos",JSON.stringify(videos));

    valuesForm.forEach(input=>{
        if(input.id){
            input.value="";
        }
    })

})