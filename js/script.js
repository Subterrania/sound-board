const fs = require("fs")

const filenames = fs.readdirSync("./sounds")

console.log(filenames)

const prettyTime = time => {
  let newTimeHour = Math.floor(time/3600)
  let newTimeMin = Math.floor(time/60)
  let newTimeSec = Math.round(time%60)
  let newTime = newTimeHour+" hours "+newTimeMin+" minutes "+newTimeSec+" seconds"
  return newTime.toString()
}

const addSoundButton = i => {
  let newButton = document.createElement("div")
  let newName = document.createElement("div")
  let newSound = addSound(i)
  newButton.classList.add("sound-button")
  newButton.id = "sound-button-"+i
  newName.classList.add("sound-name")
  newName.innerHTML = filenames[i].substr(0, filenames[i].lastIndexOf("."))
  newButton.appendChild(newName)
  newButton.addEventListener("click", function() {
    togglePlaying(newSound)
  })
  addProgressBar(newButton)
  document.getElementById("container").appendChild(newButton)
  changeProgress(i, 0)
}

const addSound = i => {
  let newSound = new Audio()
  newSound.id = "sound-"+i
  newSound.src = "./sounds/"+filenames[i]
  newSound.load()
  newSound.addEventListener("loadedmetadata", function() {
    console.log("This file is "+prettyTime(newSound.duration)+" seconds long.")
  })
  return newSound
}

const addProgressBar = element => {
  let newBar = document.createElement("span")
  newBar.classList.add("progress-bar")
  newBar.style.width = "0%"
  element.appendChild(newBar)
}

const startPlaying = sound => {
  sound.play()
  let id = sound.id.substr(sound.id.lastIndexOf("-") + 1)
  let timer = setInterval(function () {
    if(percentElapsed(sound) < 100) {
      changeProgress(id, percentElapsed(sound))
    } else {
      changeProgress(id, 100)
      setTimeout(function () {
        clearInterval(timer)
        changeProgress(id, 0)
    }, 500)
  }
  }, 10)
}

const stopPlaying = sound => {
  sound.pause()
  sound.currentTime = 0
}

const togglePlaying = sound => {
  let id = sound.id.substr(sound.id.lastIndexOf("-") + 1)
  if(sound.paused) {
    showProgressBar(id)
    startPlaying(sound)
    document.getElementById("sound-button-"+id).classList.remove("paused")
  } else {
    hideProgressBar(id)
    sound.pause()
    document.getElementById("sound-button-"+id).classList.add("paused")
  }
}

const percentElapsed = sound => {
  let percent = Math.floor(sound.currentTime / sound.duration * 100)
  return percent
}

const changeProgress = (id, state) => {
  let button = document.getElementById("sound-button-"+id)
  let bar = button.getElementsByTagName("span")[0]
  let newWidth = Math.floor(state).toString()+"%"
  bar.style.width = newWidth
}

const hideProgressBar = id => {
  let button = document.getElementById("sound-button-"+id)
  let bar = button.getElementsByTagName("span")[0]
  bar.classList.add("hidden")
}

const showProgressBar = id => {
  let button = document.getElementById("sound-button-"+id)
  let bar = button.getElementsByTagName("span")[0]
  bar.classList.remove("hidden")
}

const addAllSounds = () => {
  for (var i = 0; i < filenames.length; i++) {
    addSoundButton(i)
  }
}

addAllSounds()




console.log("script loaded")
