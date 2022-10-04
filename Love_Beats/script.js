//Initaializing the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
// let contain = document.getElementsByClassName('container');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');


// Songs Data
let songs = [
    { songName: "Aashiq Banaya Aapne", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", timeStamp: "3:42"},
    { songName: "Dil Mein Ho Tum", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", timeStamp: "5:26" },
    { songName: "Humsafar", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", timeStamp: "4:28" },
    { songName: "Jitni Dafa", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", timeStamp: "3:32" },
    { songName: "Main Sharabi", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", timeStamp: "3:32" },
    { songName: "Main Tera Ho Gaya", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", timeStamp: "3:13" },
    { songName: "Mera Pyar Tera Pyar", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", timeStamp: "4:35" },
    { songName: "Oh Humsafar", filePath: "songs/Humsafar.mp3", coverPath: "covers/8.jpg", timeStamp: "5:30" },
    { songName: "Teri Masumiyat", filePath: "songs/Oh Humsafar.mp3", coverPath: "covers/9.jpg", timeStamp: "5:09" },
    { songName: "Thoda Aur", filePath: "songs/Teri Masumiyat.mp3", coverPath: "covers/10.jpg", timeStamp: "3:07" },
]

songItems.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timeStamp")[0].innerText = songs[i].timeStamp;
})

//Handle Play/Pause Click Button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }
})


//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    //Updating SeekBar(Progress Bar)
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

// Function for Making all buttons as play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


//Handle Play/Pause Click Button which are just after song names
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if (audioElement.paused || audioElement.currentTime <= 0) {
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterSongName.innerText = songs[songIndex].songName;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            gif.style.opacity = 0;
        }

    })
})


// Handling Next Song Play Button
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

// Handling Previous Song Play Button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})