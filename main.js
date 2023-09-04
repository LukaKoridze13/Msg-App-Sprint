// HTML ELEMENTS
const ALL_MESSAGES = document.querySelector("#left");
const PINNED = document.querySelector("#right");
const BLACK = document.querySelector("#black");
const COUNT = document.querySelector("#count");
const MESSAGES = document.querySelector("#messages");

// VARIABLES
const COOLDOWN = 500;
let MESSAGES_DATA = [
  {
    title: "Chen Lin",
    date: "14.02.2023",
    location: "Yuchi, Taiwan",
    image: "https://picsum.photos/50/50",
    short_Text: "Hey, I am really glad to get...",
    long_Text:
      "Dear John, I hope this letter finds you well. If you have any questions or need to reach out, please feel free to contact me at example@example.com. Warm regards",
    isPinned: false,
  },
  {
    title: "Alice Johnson",
    date: "20.03.2023",
    location: "New York, USA",
    image: "https://picsum.photos/50/50",
    short_Text: "Hello John, I wanted to share...",
    long_Text:
      "Hi John, I trust you're doing well. I wanted to share some exciting news with you. Please let's catch up soon. Best regards",
    isPinned: false,
  },
  {
    title: "David Smith",
    date: "05.04.2023",
    location: "London, UK",
    image: "https://picsum.photos/50/50",
    short_Text: "Hey John, long time no see!",
    long_Text:
      "Hello John, It's been a while since we last spoke. I hope you're doing great. Let's plan a meetup soon. Take care!",
    isPinned: false,
  },
  {
    title: "Maria Garcia",
    date: "12.04.2023",
    location: "Madrid, Spain",
    image: "https://picsum.photos/50/50",
    short_Text: "Hola John, ¿cómo estás?",
    long_Text:
      "Hola John, Espero que estés bien. Ha pasado mucho tiempo desde nuestra última conversación. ¡Hablemos pronto! Saludos",
    isPinned: false,
  },
  {
    title: "Michael Brown",
    date: "25.04.2023",
    location: "Sydney, Australia",
    image: "https://picsum.photos/50/50",
    short_Text: "G'day John, hope you're well!",
    long_Text:
      "G'day John, Just dropping a line to say hello. Let's catch up when you have some free time. Cheers!",
    isPinned: true,
  },
  {
    title: "Sophie Wilson",
    date: "03.05.2023",
    location: "Toronto, Canada",
    image: "https://picsum.photos/50/50",
    short_Text: "Hi John, it's Sophie!",
    long_Text:
      "Hi John, I hope you remember me! We had some great times together. Let's reconnect soon. Take care!",
    isPinned: true,
  },
];
let filteredData = MESSAGES_DATA;
let BLACK_POSITION = "left";
let ITTERATION = 0;
let LAST_EXECUTION_TIME = 0;
let xDown = null;
let yDown = null;
// ADDING STARTING LISTENERS
PINNED.addEventListener("click", filter);
window.addEventListener("wheel", handleWheelDown);
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);
// STARTING SETUP
COUNT.textContent = MESSAGES_DATA.length;
drawMessages(MESSAGES_DATA);
animateMessages("start");

// ALL FUNCTIONS
function handleWheelDown(event) {
  const currentTime = Date.now();
  if (event.deltaY > 0 && currentTime - LAST_EXECUTION_TIME >= COOLDOWN) {
    animateMessages();
    LAST_EXECUTION_TIME = currentTime;
  }
}
function filter() {
  if (BLACK_POSITION === "left") {
    BLACK_POSITION = "right";
    PINNED.removeEventListener("click", filter);
    setTimeout(() => {
      ALL_MESSAGES.addEventListener("click", filter);
    }, 125);
    animate();
    filteredData = MESSAGES_DATA.filter((message) => message.isPinned);
    drawMessages(filteredData);
    animateMessages("start");
  } else {
    ALL_MESSAGES.removeEventListener("click", filter);
    setTimeout(() => {
      PINNED.addEventListener("click", filter);
    }, 125);
    animateReverse();
    filteredData = MESSAGES_DATA;
    drawMessages(MESSAGES_DATA);
    animateMessages("start");

    BLACK_POSITION = "left";
  }
}
function animateReverse() {
  BLACK.style.left = "50%";
  BLACK.style.height = "16px";
  BLACK.style.width = "20%";
  BLACK.style.borderTopLeftRadius = "100%";
  BLACK.style.borderBottomLeftRadius = "100%";
  BLACK.style.borderTopRightRadius = "20px";
  BLACK.style.borderBottomRightRadius = "20px";
  setTimeout(() => {
    BLACK.style.left = "2%";
    BLACK.style.height = "32px";
    BLACK.style.width = "44%";
    BLACK.style.borderRadius = "20px";
  }, 120);
}
function animate() {
  BLACK.style.borderTopRightRadius = "100%";
  BLACK.style.borderBottomRightRadius = "100%";
  BLACK.style.borderTopLeftRadius = "20px";
  BLACK.style.borderBottomLeftRadius = "20px";
  BLACK.style.left = "50%";
  BLACK.style.height = "16px";
  BLACK.style.width = "20%";
  setTimeout(() => {
    BLACK.style.borderTopLeftRadius = "100%";
    BLACK.style.borderBottomLeftRadius = "100%";
    BLACK.style.borderTopRightRadius = "20px";
    BLACK.style.borderBottomRightRadius = "20px";
    BLACK.style.left = "54%";
    BLACK.style.height = "32px";
    BLACK.style.width = "44%";
    BLACK.style.borderRadius = "20px";
  }, 120);
}
function drawMessages(array) {
  MESSAGES.innerHTML = "";
  array.forEach((message, index) => drawMessage(message, index));
}
function drawMessage(message, index) {
  const messageDiv = document.createElement("div");

  messageDiv.className = "message";
  if (index > 2) {
    messageDiv.classList.add("invisible");
  }
  messageDiv.innerHTML = `
  <h1>${message.title}</h1>
  <span>${message.date} ${message.location}</span>
  <img src="${message.image}" alt="" />
  <p>${message.short_Text}</p>
  <div class="buttons">
    <div class="trash"><span>Trash</span></div>
    <div class="middlee"></div>
    <div class="reply"><span>Reply</span></div>
  </div>
  `;
  MESSAGES.appendChild(messageDiv);
}
function shiftArrayLeft(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const firstElement = arr.shift();
  arr.push(firstElement);
  return arr;
}
function animateMessages(starting) {
  if (starting === "start") {
    MESSAGES.childNodes[0].classList.remove("invisible");
    MESSAGES.childNodes[0].classList.add("goFirst");
    MESSAGES.childNodes[0].addEventListener("click", () => {
      expand(MESSAGES.childNodes[0], filteredData[0]);
    });
    if (filteredData.length > 1) {
      MESSAGES.childNodes[1].classList.remove("invisible");
      MESSAGES.childNodes[1].classList.add("goSecond");
    }
    if (filteredData.length > 2) {
      MESSAGES.childNodes[2].classList.remove("invisible");
      MESSAGES.childNodes[2].classList.add("goThird");
    }
  } else {
    if (filteredData.length > 3) {
      let current;
      MESSAGES.childNodes.forEach((message, index) => {
        if (message.classList.contains("goFirst")) {
          current = index;
        }
        if (message.classList.contains("goDown")) {
          message.classList.remove("goDown");
          message.classList.add("invisible");
        }
      });

      let first = current + 1;
      if (current + 1 >= filteredData.length) {
        first = 0;
      }
      let second = current + 2;
      if (second >= filteredData.length) {
        second = Math.abs(second - filteredData.length);
      }
      let third = current + 3;
      if (third >= filteredData.length) {
        third = Math.abs(third - filteredData.length);
      }

      MESSAGES.childNodes[current].classList.remove("goFirst");
      MESSAGES.childNodes[current].classList.add("goDown");
      MESSAGES.childNodes[first].classList.remove("goSecond");
      MESSAGES.childNodes[first].classList.add("goFirst");
      MESSAGES.childNodes[first].addEventListener("click", () => {
        expand(MESSAGES.childNodes[first], filteredData[first]);
      });
      MESSAGES.childNodes[second].classList.remove("goThird");
      MESSAGES.childNodes[second].classList.add("goSecond");
      MESSAGES.childNodes[third].classList.remove("invisible");
      MESSAGES.childNodes[third].classList.add("goThird");
    } else if (filteredData.length === 3) {
      let current;
      MESSAGES.childNodes.forEach((message, index) => {
        if (message.classList.contains("goFirst")) {
          current = index;
        }
        if (message.classList.contains("goDown")) {
          message.classList.remove("goDown");
          message.classList.add("invisible");
        }
      });

      let first = current + 1;
      if (current + 1 >= filteredData.length) {
        first = 0;
      }
      let second = current + 2;
      if (second >= filteredData.length) {
        second = Math.abs(second - filteredData.length);
      }

      MESSAGES.childNodes[current].classList.remove("goFirst");
      MESSAGES.childNodes[current].classList.add("goThird");
      MESSAGES.childNodes[first].classList.remove("goSecond");
      MESSAGES.childNodes[first].classList.add("goFirst");
      MESSAGES.childNodes[first].addEventListener("click", () => {
        expand(MESSAGES.childNodes[first], filteredData[first]);
      });
      MESSAGES.childNodes[second].classList.remove("goThird");
      MESSAGES.childNodes[second].classList.add("goSecond");
    } else if (filteredData.length === 2) {
      let current;
      MESSAGES.childNodes.forEach((message, index) => {
        if (message.classList.contains("goFirst")) {
          current = index;
        }
        if (message.classList.contains("goDown")) {
          message.classList.remove("goDown");
          message.classList.add("invisible");
        }
      });

      let first = current + 1;
      if (current + 1 >= filteredData.length) {
        first = 0;
      }

      MESSAGES.childNodes[current].classList.remove("goFirst");
      MESSAGES.childNodes[current].classList.add("goSecond");
      MESSAGES.childNodes[first].classList.remove("goSecond");
      MESSAGES.childNodes[first].classList.add("goFirst");
      MESSAGES.childNodes[first].addEventListener("click", () => {
        expand(MESSAGES.childNodes[first], filteredData[first]);
      });
    }
  }
}

function expand(messageDiv, message) {
  if (messageDiv.id !== "expand") {
    messageDiv.style.transition = "all 0.3s";
    messageDiv.id = "expand";
    MESSAGES.style.position = "static";
    document.querySelector("#expand p").textContent = message.long_Text;
    document.querySelector("#expand .buttons").style.display = "flex";
  } else {
    document.querySelector("#expand p").textContent = message.short_Text;
    document.querySelector("#expand .buttons").style.display = "none";
    messageDiv.setAttribute("id", "");
    MESSAGES.style.position = "relative";
    setTimeout(() => {
      messageDiv.style.transition = "all 1s";
    }, 300);
  }
}

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
    } else {
      /* left swipe */
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      const currentTime = Date.now();
      if (currentTime - LAST_EXECUTION_TIME >= COOLDOWN) {
        animateMessages();
        LAST_EXECUTION_TIME = currentTime;
      }
    }
  }
  xDown = null;
  yDown = null;
}
