function toggleMenu(e){
e.stopPropagation();

document.getElementById("navMenu").classList.toggle("open");
document.getElementById("overlay").classList.toggle("show");
}

function closeMenu(){
document.getElementById("navMenu").classList.remove("open");
document.getElementById("overlay").classList.remove("show");
}

/* outside click close */
document.addEventListener("click", function(e){

let nav = document.getElementById("navMenu");
let toggle = document.querySelector(".menu-toggle");

if(!nav.contains(e.target) && !toggle.contains(e.target)){
closeMenu();
}

});



function filter(category = 'all') {
  let cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    let cat = card.getAttribute('data-cat');

    if (category === 'all' || cat === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

document.querySelectorAll(".rating-box").forEach((box) => {

  let toolKey = "rating_" + box.dataset.tool;

  // load or init data
  let data = JSON.parse(localStorage.getItem(toolKey)) || {
    users: Number(box.dataset.users),
    avg: Number(box.dataset.avg),
    lastUpdate: Date.now()
  };

  let totalScore = data.users * data.avg;

  let stars = box.querySelectorAll(".stars span");
  let result = box.querySelector(".result");

  // ✅ AUTO hourly +1 user
  function autoIncrease() {
    let now = Date.now();
    let hoursPassed = Math.floor((now - data.lastUpdate) / (1000 * 60 * 60));

    if (hoursPassed > 0) {
      data.users += hoursPassed; // +1 per hour
      data.lastUpdate = now;

      localStorage.setItem(toolKey, JSON.stringify(data));
    }
  }

  function updateUI() {
    let avgNow = (totalScore / data.users).toFixed(1);

    result.innerText =
      "⭐ " + avgNow + " / 5 (" + data.users + " users)";
  }

  stars.forEach(star => {
    star.addEventListener("click", () => {

      let value = Number(star.dataset.value);

      data.users += 1;
      totalScore += value;

      localStorage.setItem(toolKey, JSON.stringify(data));

      updateUI();
    });
  });

  autoIncrease();
  updateUI();

  // check every minute
  setInterval(() => {
    autoIncrease();
    updateUI();
  }, 60000);

});