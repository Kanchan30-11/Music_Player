console.log("Welcome to Spotify");
//initialize the variable
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogessBar= document.getElementById('myprogessBar');
let gif = document.getElementById('gif');
let songItems= Array.from(document.getElementsByClassName('songItem'));
let masterSongName= document.getElementById('masterSongName');

let songs = [
    {songName: "Aarambh Hai Prachand ", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Nasha", filePath: "songs/2.mp3", coverPath: "covers/10.jpg"},
    {songName: "Kyun Dhundhe", filePath: "songs/3.mp3", coverPath: "covers/9.jpg"},
    {songName: "Naseeb se", filePath: "songs/4.mp3", coverPath: "covers/8.jpg"},
    {songName: "Phir or kya chahiye", filePath: "songs/5.mp3", coverPath: "covers/7.jpg"},
    {songName: "Phireya", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Ram Siya Ram ", filePath: "songs/7.mp3", coverPath: "covers/5.jpg"},
    {songName: "Pasoori", filePath: "songs/8.mp3", coverPath: "covers/2.jpg"}
    
    
]
songItems.forEach((element, i)=>{ 
    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
})

// handle play/pause 
masterPlay.addEventListener('click',() =>{

    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
       
        gif.style.opacity =0;
}})
//listen to events
audioElement.addEventListener('timeupdate',() =>{
    console.log('timeupdate');
    //update seeker
    progess = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progess);
    myprogessBar.value =progess;
})
myprogessBar.addEventListener('change',() =>{
    audioElement.currentTime=myprogessBar.value*audioElement.duration/100;
})
 
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click',(e)=>{
    console.log(e.target);
    makeAllPlays();
    songIndex = parseInt(e.target.id);
   if(audioElement.paused||audioElement.currentTime<=0)
    {e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity =1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    
    } 
    else{
    e.target.classList.remove('fa-circle-pause');
    e.target.classList.add('fa-circle-play');
    audioElement.pause();
    gif.style.opacity =0;
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    }
    }) 
})

document.getElementById('next').addEventListener('click',()=>{
    if (songIndex>=7){
       songIndex=0
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if (songIndex <=0){
       songIndex = 0
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})