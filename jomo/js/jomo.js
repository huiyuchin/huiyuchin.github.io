const audioFiles = [
    "audio/book1.mp3",
    "audio/book2.mp3",
    "audio/book3.mp3",
    "audio/book4.mp3",
    "audio/book5.mp3"
];

function playAudio(index) {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = audioFiles[index];
    audioPlayer.style.display = "block";
    audioPlayer.play();
}
