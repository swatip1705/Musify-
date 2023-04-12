const songs = [
  {
    songName: "Believer",
    artistName: "Imagine Dragons",
    coverImage: "cover-images/asset-1.jpg",
    filePath: "music/1.mp3",
  },
  {
    songName: "Chann Sitare",
    artistName: "Ammy Virk",
    coverImage: "cover-images/asset-2.jpg",
    filePath: "music/2.mp3",
  },
  {
    songName: "Infinity",
    artistName: "Jaymes Young",
    coverImage: "cover-images/asset-3.jpeg",
    filePath: "music/3.mp3",
  },
  {
    songName: "Let Me Down Slowly",
    artistName: "Alec Benjamin",
    coverImage: "cover-images/asset-4.jpg",
    filePath: "music/4.mp3",
  },
  {
    songName: "Love Your Voice",
    artistName: "Jony",
    coverImage: "cover-images/asset-5.jpg",
    filePath: "music/5.mp3",
  },
  {
    songName: "Muskurana Tera",
    artistName: "Saaj Bhatt",
    coverImage: "cover-images/asset-6.jpg",
    filePath: "music/6.mp3",
  },
  {
    songName: "Safari",
    artistName: "Serena",
    coverImage: "cover-images/asset-7.jpeg",
    filePath: "music/7.mp3",
  },
  {
    songName: "Thodi Jagah",
    artistName: "Arijit Singh",
    coverImage: "cover-images/asset-8.jpg",
    filePath: "music/8.mp3",
  },
  {
    songName: "Taki Taki",
    artistName: "Selena Gomez",
    coverImage: "cover-images/asset-9.jpg",
    filePath: "music/9.mp3",
  },
  {
    songName: "Yummy",
    artistName: "Justin Bieber",
    coverImage: "cover-images/asset-10.jpg",
    filePath: "music/10.mp3",
  },
];

let songIndex = 0;
let audioElement = new Audio("music/1.mp3");
const playBtn = document.getElementById("play");
const progressBar = document.getElementById("progress-bar");
const previous = document.getElementById("backward");
const next = document.getElementById("forward");
const musicName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const coverImage = document.querySelector(".cover-image");
const cardIcons = document.querySelectorAll(".card-icons");
const cardBtn = document.querySelectorAll("#card-btn");

const playSong = function () {
  audioElement.play();
  playBtn.src = "assets/asset-7.svg";
  coverImage.style.backgroundImage = `url('${songs[songIndex].coverImage}')`;
  cardBtn[songIndex].src = "assets/asset-7.svg";
};

const pauseSong = function () {
  audioElement.pause();
  playBtn.src = "assets/asset-4.svg";
  cardBtn[songIndex].src = "assets/asset-4.svg";
};

const playPreviousSong = function(){
  cardBtn[songIndex].src = "assets/asset-4.svg";

  if (songIndex == 0) songIndex = 9;
  else songIndex -= 1;
  cardBtn[songIndex].src = "assets/asset-7.svg";
  changeSongDetails(songIndex);
}

const playNextSong = function(){
  cardBtn[songIndex].src = "assets/asset-4.svg";

  if (songIndex == 9) songIndex = 0;
  else songIndex += 1;
  audioElement.src = songs[songIndex].filePath;
  cardBtn[songIndex].src = "assets/asset-7.svg";
  changeSongDetails(songIndex);
}

//Function to change the song details
const changeSongDetails = function (songIndex) {
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  progressBar.value = 0;
  playBtn.src = "assets/asset-7.svg";

  musicName.innerHTML = songs[songIndex].songName;
  artistName.innerHTML = songs[songIndex].artistName;
  coverImage.style.backgroundImage = `url('${songs[songIndex].coverImage}')`;
};

//Handling Play and pause events
playBtn.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime === 0) playSong();
  else pauseSong();
});

//Handling Previous Button
backward.addEventListener("click", () => {
  playPreviousSong();
});

//Handling Next Button
forward.addEventListener("click", () => {
  playNextSong();
});

//Updating the progress Bar
audioElement.addEventListener("timeupdate", () => {
  var progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  progressBar.value = progress;
  if (progress == 100) {
    progressBar.value = 0;
    playBtn.src = "assets/asset-4.svg";
    cardBtn[songIndex].src = "assets/asset-4.svg";
  }
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

//Fuctionality of left side music cards
for (let i = 0; i < cardIcons.length; i++) {
  cardIcons[i].addEventListener("click", () => {
    if (songIndex == i) {
      if (audioElement.paused || audioElement.currentTime === 0) playSong();
      else pauseSong();
    } else {
      cardBtn[songIndex].src = "assets/asset-4.svg";
      songIndex = i;
      playSong();
      cardBtn[i].src = "assets/asset-7.svg";
      changeSongDetails(songIndex);
    }
  });
}

//Toggle button
const menuLink = document.querySelector(".nav-links");
const toggleBtn = document.querySelector(".nav-toggle");

toggleBtn.addEventListener("click", () => {
  menuLink.classList.toggle("active");
});

// Handling Space bar (Play - Pause) and Left-Right Arrow key press
document.addEventListener("keydown", function(e){
  if(e.key == " ")
  {
    if (audioElement.paused || audioElement.currentTime === 0) playSong();
    else pauseSong();
  }
  else if(e.key == "ArrowLeft")
  playPreviousSong();
  else if(e.key == "ArrowRight")
  playNextSong();
  
})

