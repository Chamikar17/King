function switchSection() {
  const qr = document.getElementById('qr-section');
  const ads = document.getElementById('ads-section');
  if (qr.style.display === 'none') {
    qr.style.display = 'block';
    ads.style.display = 'none';
  } else {
    qr.style.display = 'none';
    ads.style.display = 'block';
  }
}

let points = 0;
function playAd() {
  const button = document.querySelector("button[onclick='playAd()']");
  const progressBar = document.getElementById("progressBar");
  button.disabled = true;
  progressBar.style.width = "0%";

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      points += 1;
      document.getElementById("points").innerText = points;
      button.disabled = false;
      progressBar.style.width = "0%";
      alert("🎉 Ad Watched! You earned 1 point.");
    }
  }, 300);
}
