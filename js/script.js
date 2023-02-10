var uname;
var ucity;
var uplz;
var avatarPath = "";

function changeSettings() {
  uname = document.getElementById('userName').value
  ucity = document.getElementById('userCity').value
  uplz = document.getElementById('userPLZ').value

  console.log('added');
  localStorage.setItem("uname", uname)
  localStorage.setItem("ucity", ucity)
  localStorage.setItem("uplz", uplz)
  setInputFieldValues();

  window.location.reload();
}

if (!localStorage.hasOwnProperty("uname")) {
  uname = ""
} else {
  uname = localStorage.getItem("uname")
}
if (!localStorage.hasOwnProperty("ucity")) {
  ucity = ""
} else {
  ucity = localStorage.getItem("ucity")
}
if (!localStorage.hasOwnProperty("uplz")) {
  uplz = ""
} else {
  uplz = localStorage.getItem("uplz")
}
if (!localStorage.hasOwnProperty("avatarPath")) {
  avatarPath = ""
} else {
  avatarPath = localStorage.getItem("avatarPath")
}

let avatarPaths = [
  '../css/avatar/picOne.png',
  '../css/avatar/picTwo.png',
  '../css/avatar/picThree.png',
  '../css/avatar/picFour.png',
  '../css/avatar/picFive.png',
  '../css/avatar/picSix.png',
  '../css/avatar/picSeven.png',
  '../css/avatar/picEight.png',
  '../css/avatar/picNine.png'
]

function pickAvatar(id) {
  avatarPath = avatarPaths[id]
  localStorage.setItem('avatarPath', avatarPath)
  localStorage.setItem('avatarId', id + "")

  window.location.reload();
}



function setInputFieldValues() {
  if (localStorage.getItem('uname') && localStorage.getItem('ucity') && localStorage.getItem('uplz')) {
    document.getElementById('userName').value = localStorage.getItem('uname')
    document.getElementById('userCity').value = localStorage.getItem('ucity')
    document.getElementById('userPLZ').value = localStorage.getItem('uplz')
  }
}



// generateing content
// header
var navIds = ["errMsgLogIn", "location", "checkCalender"]
var navIcons = ["fa-solid fa-user-large-slash", "fa-solid fa-location-dot", "fa-solid fa-calendar-check"];


var navMsgs = ["errMsgLogInText", "locationMsg", "calenderMsg"]
var navText = ["Not logged in", "Xxxx, Xxxxx", "Check Calender"];

if (localStorage.getItem('uname')) {
  var navTextLoggedIn = [
    `${localStorage.getItem('uname')}`, `${localStorage.getItem('ucity')}, ${localStorage.getItem('uplz')}`, "checkCalender"
  ]
}

var navIconsLoggedIn = ["fa-solid fa-user", "fa-solid fa-location-dot", "fa-solid fa-calendar-check"];



var showStuff = document.getElementById("showStuff")
var showNotifications = document.getElementById("showNotifications")

function generateNavContent() {
  if (showStuff) {
    if (!localStorage.getItem('uname') || localStorage.getItem('uname') == "") {
      for (let i = 0; i < 3; i++) {
        showNotifications.innerHTML += `<div id="${navIds[i]}">
    <i class="${navIcons[i]}"></i>
    <p id="${navMsgs[i]}">${navText[i]}</p>
  </div>`
      }
    } else {
      for (let i = 0; i < 3; i++) {
        showNotifications.innerHTML += `<div id="${navIds[i]}">
    <i class="${navIconsLoggedIn[i]}"></i>
    <p id="${navMsgs[i]}">${navTextLoggedIn[i]}</p>
  </div>`
      }
      document.getElementById('errMsgLogIn').style.color = "#26ff88"
    }
  }
}

//icon box icons
var iconBox = document.getElementById("iconBox")

var iconBoxIcons = ["fa-solid fa-circle-user", "fa-solid fa-gear", "fa-solid fa-house"]
var iconBoxIds = ["userIcon", "settingsIcon", "menuIcon"]


function generateIconBoxIcons() {
  if (iconBox) {
    if (avatarPath == "") {
      for (let i = 0; i < 3; i++) {
        if (iconBoxIcons[i] == "fa-solid fa-house") {
          iconBox.innerHTML += `
         <div class="menuIconBox">
         <a href="../html/index.html">
           <i class="${iconBoxIcons[i]}" id="${iconBoxIds[i]}" ></i>
</a>
           </div>
         </div>
         `
        } else {
          iconBox.innerHTML += `<i class="${iconBoxIcons[i]}" id="${iconBoxIds[i]}"></i>`
        }
      }
    } else {
      for (let i = 0; i < 3; i++) {
        if (i == 0) {
          iconBox.innerHTML += `
            <div class="menuIconBox">
              <img src="${avatarPath}" id="avatarPic">
              </div>
            </div>
            `
        } else {
          if (iconBoxIcons[i] == "fa-solid fa-house") {
            iconBox.innerHTML += `        <a href="../html/index.html">
            <i class="${iconBoxIcons[i]}" id="${iconBoxIds[i]}" ></i>
 </a>
            </div>`
          }else{
            iconBox.innerHTML += ` <i class="${iconBoxIcons[i]}" id="${iconBoxIds[i]}" "></i>`
          }
          
        }
      }
    }
  }
}



//section: Home -body 
let mainBoxesIcons = ["fa-solid fa-rectangle-list", "fa-solid fa-calendar-check", "fa-solid fa-file-powerpoint",
  "fa-solid fa-house-user", "fa-solid fa-rectangle-xmark", "fa-solid fa-rectangle-xmark"];

let mainBox = document.getElementById('mainBox')
let mainBox1 = document.getElementById('mainBox1')

let mainBoxPaths = ["./manage.html", "./calender.html", "../html/reveal.js-master/index.html", "./index.html", ""]

function generateMainBoxes() {
  for (let i = 0; i < 3; i++) {
    mainBox1.innerHTML +=
      `
      <a href="${mainBoxPaths[i]}">
      <div class="mainBoxItemClr${i}">
        <i class="${mainBoxesIcons[i]}" style="font-size: 6rem;"></i>
      </div>
      </a>
      `
  }
}

if (showNotifications) {
  generateNavContent()
}
if (iconBox) {
  generateIconBoxIcons()
}
if (mainBox1) {
  generateMainBoxes()
}


//MainBoxItem vars
let mainBoxItemClr0 = document.getElementsByClassName('mainBoxItemClr0')
let mainBoxItemClr1 = document.getElementsByClassName('mainBoxItemClr1')
let mainBoxItemClr2 = document.getElementsByClassName('mainBoxItemClr2')
// let mainBoxItemClr3 = document.getElementsByClassName('mainBoxItemClr3')

/* let mainBoxItemClr4 = document.getElementsByClassName('mainBoxItemClr4')
let mainBoxItemClr5 = document.getElementsByClassName('mainBoxItemClr5') */

let settingsIcon = document.getElementById("settingsIcon")

if (settingsIcon) {
  settingsIcon.addEventListener('click', explodeFx)
}

let mainContentBox = document.getElementById("mainContentBox")
let settingBox = document.getElementById("parentGrid")
let closeSettings = document.getElementById('closeSettings')

function explodeFx() {
  if (settingBox) {
    settingBox.style.display = "block"
  }
  mainBoxItemClr0[0].style.transform = "translateX(-120%)"
  mainBoxItemClr1[0].style.transform = "translateY(-140%)"
  mainBoxItemClr2[0].style.transform = "translateX(120%)"
  // mainBoxItemClr3[0].style.transform = "translateX(-120%)"
  /*    mainBoxItemClr4[0].style.transform = "translateY(140%)"
      mainBoxItemClr5[0].style.transform = "translateX(120%)" */

  setTimeout(() => {
    if (settingBox) {
      settingBox.style.opacity = "100"
    }
  }, 201);

  setTimeout(() => {
    if (settingBox) {
      settingBox.style.transform = "translateY(-100%)"
    }
  }, 200);
}

if (closeSettings) {
  closeSettings.addEventListener('click', removeSettings)
}

/* explodeFx() */
function removeSettings() {
  settingBox.style.transform = "translateY(0%)"
  mainBoxItemClr0[0].style.transform = "translateX(0%)"
  mainBoxItemClr1[0].style.transform = "translateY(0%)"
  mainBoxItemClr2[0].style.transform = "translateX(0%)"
  /*   mainBoxItemClr3[0].style.transform = "translateX(0%)"
    mainBoxItemClr4[0].style.transform = "translateY(0%)"
    mainBoxItemClr5[0].style.transform = "translateX(0%)" */
  settingBox.style.display = "none"
  setTimeout(() => {
    mainBoxItemClr0[0].style.transform = ""
    mainBoxItemClr1[0].style.transform = ""
    mainBoxItemClr2[0].style.transform = ""
    /*    mainBoxItemClr3[0].style.transform = ""
       mainBoxItemClr4[0].style.transform = ""
       mainBoxItemClr5[0].style.transform = "" */
  }, 700);
}

