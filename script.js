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
alret("තප්පර 15-17 අට්ගර කාලයක් ad එක නරබා මෙතනට පැමිනෙන්න.")
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
      points += 0;
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






