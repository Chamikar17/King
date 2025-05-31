const watchBtn = document.getElementById("watchAdBtn");
const pointsSpan = document.getElementById("points");
const progressBar = document.getElementById("progressBar");

let points = 0;
let adWindow = null;
let timer = null;
let count = 0;
const adDuration = 17; // seconds
let pointAdded = false;

watchBtn.addEventListener("click", () => {
  if(adWindow && !adWindow.closed){
    alert("Please close the previous ad before starting a new one.");
    return;
  }

  adWindow = window.open(
    "https://www.profitableratecpm.com/x1fu9w31j?key=9e56e55a3a3f57fab750d1c7a4c9fac4",
    "_blank",
    "width=600,height=400"
  );

  if(!adWindow) {
    alert("Popup blocked! Please allow popups for this site.");
    return;
  }

  watchBtn.disabled = true;
  count = 0;
  pointAdded = false;
  progressBar.style.width = "0%";

  timer = setInterval(() => {
    count++;
    progressBar.style.width = ((count / adDuration) * 100) + "%";

    if(count >= adDuration && !pointAdded){
      addPoint();
      pointAdded = true;
      alert("15 seconds passed! Close the ad tab to confirm your point.");
    }
  }, 1000);
});

setInterval(() => {
  if(adWindow && adWindow.closed){
    clearInterval(timer);
    watchBtn.disabled = false;
    progressBar.style.width = "0%";
    adWindow = null;
  }
}, 1000);

function addPoint(){
  points++;
  pointsSpan.textContent = points;
}


watchAdBtn.addEventListener("click", () => {
  watchAdBtn.disabled = true;
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      points += 10;
      pointsDisplay.innerText = points;
      setTimeout(() => {
        location.reload(); // reload the page after 1 second
      }, 1000);
    } else {
      width += 1;
      progressBar.style.width = width + "%";
    }
  }, 30); // animation speed
});

// WITHDRAW O






emailjs.init("JxcwLhzOOhD35rRUH");

const form = document.getElementById("withdrawForm");
const numberInput = document.getElementById("number");
const formContainer = document.getElementById("formContainer");
const cardImage = document.getElementById("cardImage");
const formTitle = document.getElementById("formTitle");
const messageInput = document.getElementById("message");

const imageMap = {
  "Dialog": "https://i.postimg.cc/9FQhFcQS/dialog-logo-png-seeklogo-203576.png",
  "Hutch": "https://i.postimg.cc/gcDpWxm8/hutch-logo-png-seeklogo-323552.png",
  "Mobitel": "https://i.postimg.cc/ncP4pRf9/sltmobitel-logo-png-seeklogo-433080.png",
  "FF": "https://i.imgur.com/VXzG2uk.png",
  "TV": "https://i.imgur.com/VXzG2uk.png"
};

function showCardOptions() {
  document.getElementById("cardOptions").style.display = "block";
}

function selectCard(type) {
  formContainer.style.display = "block";

  const now = new Date().toLocaleString();
  document.getElementById("time").value = now;

  formTitle.innerText = type + " Reload";
  cardImage.src = imageMap[type];

  // Change input placeholder based on type
  if (type === "FF") {
    messageInput.placeholder = "Enter your Free Fire ID";
  } else if (type === "TV") {
    messageInput.placeholder = "Enter your Dialog TV Number";
  } else {
    messageInput.placeholder = "Enter your Phone Number";
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("මොහොතක් රැදි සිටින්න...");

  const data = {
    name: document.getElementById("name").value,
    number: document.getElementById("number").value,
    message: document.getElementById("message").value,
    time: document.getElementById("time").value,
    title: formTitle.innerText,
  };

  emailjs.send("service_2wht3tb", "template_jrstb44", data)
    .then(() => {
      alert("✅ Withdraw request sent successfully!");
      alert("පැය 24ක් යාමට පෙර ඔබෙ යිල්ලිම යිටු වෙවි!");

      form.reset();
      formContainer.style.display = "none";
    })
    .catch((err) => {
      console.error("❌ Error:", err);
      alert("❌ Something went wrong!");
    });
});
