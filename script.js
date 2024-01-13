const versesPerCh = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78];
const fivers = ["1 1", "1 2", "1 21", "1 24", "1 28", "1 47", "2 1", "2 2", "2 4", "2 9", "2 11", "2 21", "2 24", "2 28", "2 54", "2 55", "3 1", "3 3", "3 36", "3 37", "4 1", "4 4", "4 5", "5 1", "5 2", "6 1", "6 33", "6 35", "6 37", "6 40", "7 1", "8 1", "8 3", "9 1", "10 1", "10 12", "10 19", "11 1", "11 5", "11 9", "11 15", "11 32", "11 35", "11 36", "11 47", "11 50", "11 51", "11 52", "12 1", "12 2", "13 1", "13 2", "14 1", "14 21", "14 22", "15 1", "16 1", "17 1", "17 2", "18 1", "18 2", "18 73", "18 74"];

var verseList = [];
var c;
var current;
var currentChapter;
var currentVerse;
var lines;
var promptLength = 1;
var multiCh = true;

var prompt = document.getElementById("prompt");
var answer = document.getElementById("answer");
var selector = document.getElementById("select");
var deselector = document.getElementById("deselect");
var show = document.getElementById("show");
var showVerse = document.getElementById("showVerse");
var replay = document.getElementById("replay");
var set = document.getElementById("settings");
var all = document.getElementById("all");
var menu = document.getElementById("menu");

selector.addEventListener("click", selectAll);
deselector.addEventListener("click", deselectAll);
show.addEventListener("click", showV);
replay.addEventListener("click", rep);
set.addEventListener("click", options);

menu.style.display = "none";



function options() {
  set.classList.toggle("active");
  if (set.classList.contains("active")) {
    all.style.display = "none";
    menu.style.display = "block";
  } else {
    all.style.display = "grid";
    menu.style.display = "none";
  }
}

function selectAll() {
  document.querySelectorAll(".v").forEach(but => {
    if (!but.classList.contains("selected")) {
      but.click();
    }
  });
}

function deselectAll() {
  document.querySelectorAll(".v").forEach(but => {
    if (but.classList.contains("selected")) {
      but.click();
    }
  });
  //verseList = [];
}

function addVerse(v) {
  verseList.push(c + " " + v);
}

function remVerse(v) {
  verseList.splice(verseList.indexOf(c + " " + v), 1)
}

function addVerseButtons(ch) {
  selector.classList.remove("dis");
  deselector.classList.remove("dis");
  
  //create buttons
  var docFrag = document.createDocumentFragment();
  for (var x = 1; x < versesPerCh[ch-1]; x++) {
    var elem = document.createElement('button');
    elem.innerHTML = x+1;
    elem.classList.add("v");
    docFrag.appendChild(elem);
  }
  document.getElementById("verseBox").appendChild(docFrag);

  const vs = document.querySelectorAll(".v");
  vs.forEach(but => {
    //color those that were previously selected
    if (verseList.includes(c + " " + but.innerHTML)) {
      but.classList.add("selected");
    }

    //add verse buttons' eventListeners
    but.addEventListener("click", () => {
      if (but.classList.contains("selected")) {
        but.classList.remove("selected");
        remVerse(but.innerHTML);
      } else {
        but.classList.add("selected");
        addVerse(but.innerHTML);
      }
    });
  });
}

//shows chapter.verse
function showV() {
  if (!show.classList.contains("dis")) {
    if (show.innerHTML == "Show Verse") {
      show.innerHTML = "Hide Verse";
      showVerse.style.display = "block";
    } else {
      show.innerHTML = "Show Verse";
      showVerse.style.display = "none";
    }
  }
}

function generate() {
  showVerse.style.display = "none";
  show.innerHTML = "Show Verse";
  
  current = verseList[Math.floor(Math.random() * verseList.length)];
  currentChapter = current.substring(0, current.indexOf(" ")).padStart(2, "0");
  currentVerse = Number(current.substring(current.indexOf(" ") + 1));
  
  showVerse.innerHTML = current.substring(0, current.indexOf(" ")) + "." + currentVerse;
  show.classList.remove("dis");
  replay.classList.remove("dis");
  
  lines = 4;
  if (fivers.includes(current)) {
    lines = 5;
  }

  rep(); //enables prompt audio
  answer.src = "http://www.geetachanting.net/bvg/audio/x0001/" + currentChapter + "/bvg" + currentChapter + "v" + currentVerse.toString().padStart(2, "0") + ".mp3"; //enables answer audio
}

//add replay (and play) button functionality
function rep() {
  if (promptLength == 2) {
    prompt.src = "http://www.geetachanting.net/bvg/audio/x0001/" + currentChapter + "/bvg" + currentChapter + "v" + (currentVerse - 1).toString().padStart(2, "0") + "l00" + (lines-1) + ".mp3";
    prompt.addEventListener("ended", () => { 
      prompt.src = "http://www.geetachanting.net/bvg/audio/x0001/" + currentChapter + "/bvg" + currentChapter + "v" + (currentVerse - 1).toString().padStart(2, "0") + "l00" + lines + ".mp3"; 
    }, {once: true});
  } else if (promptLength == 1) {
    prompt.src = "http://www.geetachanting.net/bvg/audio/x0001/" + currentChapter + "/bvg" + currentChapter + "v" + (currentVerse - 1).toString().padStart(2, "0") + "l00" + lines + ".mp3";
  } else {
    prompt.src = "http://www.geetachanting.net/bvg/audio/x0001/" + currentChapter + "/bvg" + currentChapter + "v" + (currentVerse-1).toString().padStart(2, "0") + ".mp3";
  }
}

//create 18 chapter buttons
var docFrag = document.createDocumentFragment();
for (var i = 0; i < 18 ; i++) {
  var elem = document.createElement('button');
  elem.innerHTML = i+1;
  elem.classList.add("ch");   
  docFrag.appendChild(elem);
}
document.getElementById("chBox").appendChild(docFrag);

//add chapter button functionality
const chs = document.querySelectorAll(".ch");
chs.forEach(but => {
  but.addEventListener("click", () => {
    document.querySelector(".selected")?.classList.remove("selected");
    but.classList.add("selected");
    if (but.innerHTML != c && multiCh == false) {
      verseList = [];
    }
    c = but.innerHTML;
    const elems = document.querySelectorAll(".v");
    elems.forEach(b => {
      b.parentNode.removeChild(b);
    });
    addVerseButtons(but.innerHTML);
  });
});

//add event listeners for first settings question
const q1s = document.querySelectorAll(".q1");
q1s.forEach(but => {
  but.addEventListener("click", () => {
    const tog = document.querySelectorAll(".q1");
    tog.forEach(b => {
      b.classList.remove("on");
    });
    but.classList.add("on");
    if (but.innerHTML == "Quarter") {
      promptLength = 1;
    } else if (but.innerHTML == "Half"){
      promptLength = 2;
    } else {
      promptLength = 4;
    }
  });
});

//add event listeners for second settings question
const q2s = document.querySelectorAll(".q2");
q2s.forEach(but => {
  but.addEventListener("click", () => {
    const tog = document.querySelectorAll(".q2");
    tog.forEach(b => {
      b.classList.remove("on");
    });
    but.classList.add("on");
    if (but.innerHTML == "Yes") {
      multiCh = true;
    } else {
      multiCh = false;
    }
  });
});

document.getElementById("gen").addEventListener("click", generate);

var animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener("click", animateButton, false);
}