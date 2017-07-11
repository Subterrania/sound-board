const fs = require("fs")

const filenames = fs.readdirSync("./sounds")

console.log(filenames)

const prettyTime = time => {
  let newTimeHour = Math.floor(time/3600)
  let newTimeMin = Math.floor(time/60)
  let newTimeSec = Math.round(time*100)/100
  let newTime = newTimeHour+" hours "+newTimeMin+" minutes "+newTimeSec+" seconds"
  return newTime.toString()
}


const addSoundButton = (i) => {
  let newButton = document.createElement("div")
  let newName = document.createElement("div")
  newButton.classList.add("sound")
  newName.classList.add("sound-name")
  newName.innerHTML = filenames[i].substr(0, filenames[i].lastIndexOf("."))
  newButton.appendChild(newName)
  newButton.addEventListener("click", function() {
    testSound(i)
  })
  document.getElementById("container").appendChild(newButton)
}

const testSound = (i) => {
  let newSound = new Audio()
  newSound.src = "./sounds/"+filenames[i]
  newSound.load()
  newSound.play()
  newSound.addEventListener("loadedmetadata", function() {
    console.log("This file is "+prettyTime(newSound.duration)+" seconds long.")
  })
}

const playSound = () => {

}

const addAllSounds = () => {
  for (var i = 0; i < filenames.length; i++) {
    addSoundButton(i)
  }
}

addAllSounds()




console.log("dataFetch loaded")
