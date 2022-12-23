class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.play = document.querySelector(".play");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.currentKick = ".sounds/kick-classic.wav";
    this.currentSnare = ".sounds/snare-acoustic01.wav";
    this.currentHihat = ".sounds/hihat-acoustic01.wav";
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    let activeBars = document.querySelectorAll(`.b${step}`);

    // loop over pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      // check for active bars
      if (bar.classList.contains("active")) {
        // check for active sounds
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;

          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;

          this.hihatAudio.play();
        }
      }
    });

    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      // clear interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.play.innerText = "Stop";
      this.play.classList.add("active");
    } else {
      this.play.innerText = "Play";
      this.play.classList.remove("active");
    }
  }

  // change sounds
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    console.log(selectionValue);
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }

  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempTxt = document.querySelector(".tempo-nbr");

    tempTxt.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;

    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumkit = new DrumKit();

// Event listeners
drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", drumkit.activePad);
  pad.addEventListener("animationend", function () {
    pad.style.animation = "";
  });
});

drumkit.play.addEventListener("click", function () {
  drumkit.updateBtn();
  drumkit.start();
});

drumkit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumkit.changeSound(e);
  });
});

drumkit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumkit.mute(e);
  });
});
drumkit.tempoSlider.addEventListener("input", function (e) {
  drumkit.changeTempo(e);
});
drumkit.tempoSlider.addEventListener("change", function (e) {
  drumkit.updateTempo(e);
});
