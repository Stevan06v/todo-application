var addFolder = document.getElementById('addFolder')
var removeFolder = document.getElementById('removeFolder')
var ghostTodo = document.getElementById('ghostTodo')
var colorizeTodo = document.getElementById('colorizeTodo')
var selectColor = document.getElementById('selectColor')
var killTodo = document.getElementById('killTodo')
var cursorChanger = document.getElementById('cursorChanger')




/* let groupArr = [] */
// functionalites removing, adding, ghosting

//$().css("margin", "5vw")
var editFuncs = {
  xCursorSelected: false,
  ghostGroupSelected: false,
  paintBucketSelected: false,
  killTodoSelected: false,
  colorPalate: false,
  usualCursorSelected: false,
}


var hasColor = true;
var sendGroupName = document.getElementById('sendGroupName')
var maxAnzFolders = 8
var i = 0
var countRemoved = 0


var head = document.getElementById('txtBox')
var date = document.getElementById('date')
var description = document.getElementById('description')

/*Test Button*/
var testBtn = document.getElementById('testBtn')
var todoId = 0


let groupArr = []


if (!localStorage.hasOwnProperty("Groups")) {
  groupArr = []
} else {
  groupArr = JSON.parse(localStorage.getItem("Groups"))
}

console.log(groupArr);

setInterval(() => {
  localStorage.setItem("Groups", JSON.stringify(groupArr))
}, 100);


// todo : implement later on
// For login and other properties

// For creating new todo

class Todo {
  constructor(id) {
    this.name = ''
    this.description = ''
    this.date = ''
    this.id = id
    this.bulletPoint = []
  }

  pushinP(bulletPoint) {
    this.bulletPoint.push(bulletPoint)
  }

}


class Group {
  /**
   * @param {int} id --userId
   */
  constructor(id) {
    this.name = ''
    this.color = ''
    this.id = id
    this.todos = []
  }
  /**
   * @param {String} grName --group name
   */
  setGroupName(grName) {
    this.name = grName
  }
  /**
   * @param {String} color --group color
   */
  setGroupClr(color) {
    this.color = color
  }
  /**
   * @param {Object} todo 
   */
  setNewTodo(todo) {
    this.todos.push(todo)
  }
}


let groupId = 0

if (addFolder) {
  addFolder.addEventListener('click', addFolderFunc)
}


var addContent = document.getElementById('addContent')


function addFolderFunc() {

  if (groupArr.length < 8) {
    document.getElementById(`folder${groupArr.length}`).style.opacity = "100"
    /*  document.getElementsByClassName('groupName')[i].style.display = "block" */
    i++;
    groupArr[groupArr.length] = new Group(groupArr.length);
    groupId++;
  }
}


var cursor = document.querySelector('.cursor')
var getDefault = document.getElementById('getDefault')


getDefault.addEventListener('click', function () {
  document.getElementsByTagName('body')[0].style.cursor = "auto"
  cursorChanger.style.display = 'none'
})


//replace all with onclicks to edit different property
function openFolders() {
  addContent.innerHTML = ''
  for (let i = 0; i < maxAnzFolders; i++) {
    addContent.innerHTML += ` <div class="folderBox"> 
    <i class="fa-solid fa-folder-closed" id="folder${i}" onclick="openFunc(${i})"></i>
  </div>`
  }
  // <input type="text" name="" class="groupName" id="folderName${i}">
  spawnExsistingData()
}



function addRemFunc() {
  addContent.innerHTML = ''

  for (let i = 0; i < maxAnzFolders; i++) {
    addContent.innerHTML += ` <div class="folderBox"> 
    <i class="fa-solid fa-folder-closed" id="folder${i}" onclick="removeFolderFunc(${i})"></i>
  </div>`
    // <input type="text" name="" class="groupName" id="folderName${i}">
  }
  spawnExsistingData()
}

function addColorizeFunc() {
  addContent.innerHTML = ''
  for (let i = 0; i < maxAnzFolders; i++) {
    addContent.innerHTML += ` <div class="folderBox"> 
    <i class="fa-solid fa-folder-closed" id="folder${i}" onclick="colorizeGroup(${i})"></i>
  </div>`
  }
  // <input type="text" name="" class="groupName" id="folderName${i}">
  spawnExsistingData()
}


/* openFunc(0) */
function addColorPalette() {
  addColorizeFunc()
  document.getElementById('toolProps').innerHTML =
    `<div id="colors">
   <div onclick="pickedColor('#0084ff')"id="clrOne"></div>
   <div onclick="pickedColor('#ff0055')"id="clrTwo"></div>
   <div onclick="pickedColor('#26ff88')"id="clrThree"></div>
   <div onclick="pickedColor('#ffbf00')"id="clrFour"></div>
   <div onclick="pickedColor('tomato')" id="clrFive"></div>
</div>`
}


let saveColor = ""
function pickedColor(color) {
  console.log(color);
  switch (color) {
    case "#0084ff":
      document.getElementsByTagName('body')[0].style.cursor = "url('../css/cursors/bucketBlue.png'), auto";
      break;
    case "#ff0055":
      document.getElementsByTagName('body')[0].style.cursor = "url('../css/cursors/bucketPinkish.png'), auto";
      break;
    case "#26ff88":
      document.getElementsByTagName('body')[0].style.cursor = "url('../css/cursors/bucketGreen.png'), auto";
      break;
    case "#ffbf00":
      document.getElementsByTagName('body')[0].style.cursor = "url('../css/cursors/bucketOrange.png'), auto";
      break;
    case "tomato":
      document.getElementsByTagName('body')[0].style.cursor = "url('../css/cursors/bucketTomato.png'), auto";
      break;
  }
  saveColor = color
}

function colorizeGroup(id) {
  console.log("colorizeGroup called!");
  groupArr[id].color = saveColor
  spawnExsistingData()
}

function remColorPalette() {
  if (document.getElementById('colors')) {
    document.getElementById('colors').style.display = "none"
  }
}


let id = 0
function openFunc(id) {

  if (document.getElementById('folder' + id).style.opacity == '1') {
    document.getElementById('addContent').style.display = "none"
    document.getElementById('folderOpen').style.display = "grid"
    document.getElementById('colorizeTodo').style.color = "red"
    id = id
    localStorage.setItem('id', id)
    console.log(id);
    postTodos()
  }

}



let todoName = ''
let todoDate = ''
let todoDescription = ''


let todo
let countTodo = localStorage.getItem('countTodoPos')
//localStorage.setItem('countTodoPos', 0)
//groupArr=[]

function postTodos() {
  let currentId = parseInt(localStorage.getItem('id'))
  let postTodo = ''
  for (let i = 0; i < groupArr[currentId].todos.length; i++) {
    postTodo += `<div class="todoBox" >
      <div onclick="removeTodo(${i})" id="delTodo"><i class="fa-solid fa-xmark" style="cursor:pointer;"></i></div>
      <div id="showTodoBox">
      <div class="showTodoName">${groupArr[currentId].todos[i].name}</div>
      <div class="showTodoDescription">${groupArr[currentId].todos[i].description}</div>
      <div class="dateBox">
      <i class="fa-solid fa-calendar"></i>
      <div class="showTodoDate">${groupArr[currentId].todos[i].date}</div>
      </div>
      </div>
  </div>`
  }
  document.getElementById('showTodos').innerHTML = postTodo
  console.log('posted');
}


function removeTodo(id) {
  groupArr[parseInt(localStorage.getItem('id'))].todos.splice(id, 1)
  postTodos()
}

function addTodo() {
  localStorage.setItem('countTodoPos', countTodo)
  let currentId = parseInt(localStorage.getItem('id'))
  todo = new Todo(parseInt(localStorage.getItem('countTodoPos')))

  todo.name = document.getElementById('todoName').value
  todo.description = document.getElementById('todolDescription').value
  todo.date = document.getElementById('todoDate').value

  if (document.getElementById('todoName').value == '') {
    todo.name = 'no name'
  }
  if (document.getElementById('todolDescription').value == '') {
    todo.description = 'no description'
  }
  if (document.getElementById('todoDate').value == '') {
    todo.date = 'no date'
  }
  groupArr[currentId].todos[groupArr[currentId].todos.length] = todo
  document.getElementById('todoName').value = ''
  document.getElementById('todolDescription').value = ''
  document.getElementById('todoDate').value = ''
  postTodos()

  countTodo++;
}




let t = 0
function showNavBox() {
  t++;
  if (t % 2 == 0) {
    document.getElementsByClassName("showNavBox")[0].style.display = "none"
  } else {
    document.getElementsByClassName("showNavBox")[0].style.display = "grid"
    document.getElementsByClassName("showNavBox")[0].innerHTML += `
    <div id="mainContentBox">
    <div id="mainBox1"></div>
  </div>
  `
    document.getElementById("mainBox1").style.width = "30%"
  }
}



function leaveFolder() {
  document.getElementById('addContent').style.display = "grid"
  document.getElementById('folderOpen').style.display = "none"
  document.getElementById('colorizeTodo').style.color = "white"
}




function spawnExsistingData() {
  console.log("spawn Data called");
  for (let i = 0; i < groupArr.length; i++) {
    if (document.getElementById(`folder${i}`).style.opacity == "0%") {
      document.getElementById(`folder${i}`).style.opacity = "100%"
      /*  document.getElementById(`folderName${i}`).value = groupArr[i].name */
      document.getElementById(`folder${i}`).style.color = groupArr[i].color
    } else {
      document.getElementById(`folder${i}`).style.opacity = "100%"
      document.getElementById(`folder${i}`).style.color = groupArr[i].color
    }
  }
}


// show transparent folders 
function spawnTempFolders() {
  if (addContent) {
    for (let i = 0; i < maxAnzFolders; i++) {
      addContent.innerHTML += ` <div class="folderBox"> 
      <i class="fa-solid fa-folder-closed" id="folder${i}" ></i>
    </div>`
    }
    //print all exsisting Folders   <input type="text" name="" class="groupName" id="folderName${i}">
    spawnExsistingData()
  }
}
//call transparenmt func folder 
spawnTempFolders()

var tempFolder


// check selcted func- tool 
function getSelected(selected) {
  switch (selected) {
    case "xCursorSelected":
      unselectAll()
      editFuncs.xCursorSelected = true
      console.log('xCursorSelected ' + true);

      document.getElementsByTagName('body')[0].style.cursor = "url('../css/cursors/x.png'), auto";
      //url('./x.png'), alias.classList.add("xCursor");
      console.log("x cursor");

      addRemFunc()
      remColorPalette()
      break;
    case "ghostGroupSelected":
      unselectAll()
      editFuncs.ghostGroupSelected = true
      console.log('ghostGroupSelected ' + true);
      remColorPalette()
      break;
    case "leaveFolderSelected":
      unselectAll()
      editFuncs.paintBucketSelected = true
      console.log('leaveFolderSelected ' + true);
      leaveFolder()
      remColorPalette()
      break;
    case "killTodoSelected":
      unselectAll()
      editFuncs.killTodoSelected = true
      console.log('killTodoSelected ' + true);
      remColorPalette()
      break;
    case "colorPalate":
      unselectAll()
      editFuncs.colorPalate = true
      console.log('colorPalate ' + true);
      document.getElementsByTagName('body')[0].style.cursor = "url('../css/cursors/bucket.png'), auto";
      addColorPalette()
      break;
    case "usualCursorSelected":
      unselectAll()
      editFuncs.usualCursorSelected = true
      document.getElementsByTagName('body')[0].style.cursor = "none"
      document.getElementsByTagName('body')[0].style.cursor = "url('../css/cursors/usualCursor.png'), auto";
      console.log('usualCursorSelected ' + true);


      console.log('usual cursor');

      openFolders()
      remColorPalette()
      break;
  }
}

//set unused tools and props on false
function unselectAll() {
  for (let i = 0; i < editFuncs.length; i++) {
    editFuncs[i] = false;
  }
}

//actually removing folders by clicking if eventlistener is there ->removeTool selected
function removeFolderFunc(pos) {
  console.log("remove Clicked");

  if (editFuncs.xCursorSelected == true) {
    groupArr.splice(pos, 1)
    i--;
    document.getElementById(`folder${pos}`).style.opacity = "10%"
    document.getElementById(`folder${pos}`).style.color = "aliceblue"
    console.log("splice called");
  }
}

let tempCounter = 0;

var defaultLayout = `
<div id="addTodoBoxContent">
               <div style="padding:.5vw; text-align:center;font-family: 'CeraRoundBlack'; color: aliceblue; ">Default Setup</div>
                <div id="nameBox">
                    <h4 id="inputNameBox">Name</h4>
                    <input type="text" id="todoName">
                </div>
                <div id="todoBox">
                    <h4 id="inputDes">Description </h4>
                    <textarea data-role="textarea" id="todolDescription"></textarea>
                </div>
                <div id="dateBox" style="display: grid; grid-template-columns: auto;">
                    <h4 id="inputDes">Date </h4>
                    <input type="date" id="todoDate">
                </div>
                <div id="submitTodo" onclick="addTodo()">addTodo</div>
                <!--   example Box -->

                <div id="previewBox">
                    <div class="todoBox">
                        <div id="delTodo"><i class="fa-solid fa-xmark" style="cursor:pointer;"></i></div>
                        <div id="showTodoBox">
                            <div class="showTodoName">Example</div>
                            <div class="showTodoDescription">This is an example</div>
                            <div class="dateBox">
                                <i class="fa-solid fa-calendar"></i>
                                <div class="showTodoDate">example</div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
`
nextTheme()

function nextTheme() {
  if (tempCounter % 2 == 0) {
    document.getElementById('addTodoBox').innerHTML = defaultLayout
  } else {
    document.getElementById('addTodoBox').innerHTML = customizeLayout
  }

  tempCounter++;
}


console.log(document.getElementById('iconBox').childNodes.length);

getSelected("usualCursorSelected")