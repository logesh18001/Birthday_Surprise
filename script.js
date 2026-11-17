/* =========================
   PASSWORD
========================= */

let entered = "";
const password = "23112006";

// Click heart effect on keypad
let lastHeartTime = 0;
document.addEventListener('DOMContentLoaded', () => {
    const keypad = document.querySelector('.keypad');
    if(keypad) {
        keypad.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON') {
                const now = Date.now();
                if(now - lastHeartTime < 80) return; // throttle taps
                lastHeartTime = now;
                
                const heart = document.createElement("div");
                heart.innerHTML = "💜";
                heart.className = "click-heart";
                
                const rect = e.target.getBoundingClientRect();
                heart.style.left = (rect.left + rect.width / 2) + "px";
                heart.style.top = (rect.top + rect.height / 2) + "px";
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    if(heart.parentNode) heart.remove();
                }, 800);
            }
        });
    }
});

let popupTimer = null;
let dateTimer = null;
let envelopeTimer = null;

function proceedFromPopup() {
    const popup = document.getElementById("popupScreen");
    if (popup && popup.classList.contains("active")) {
        if (popupTimer) clearTimeout(popupTimer);
        if (dateTimer) clearTimeout(dateTimer);
        if (envelopeTimer) clearTimeout(envelopeTimer);

        showScene("dateScreen");
        startDateTypewriter();
        startDateHearts();

        dateTimer = setTimeout(() => {
            showScene("loadingScreen");
        }, 10000);

        envelopeTimer = setTimeout(() => {
            showScene("envelopeScreen");
        }, 14500);
    }
}

function press(num){

    if(entered.length >= 8) return;

    entered += num;

    updateDots();

    if(entered.length === 8){

        setTimeout(()=>{

            if(entered === password){

                showScene("popupScreen");
                createHeartBlast();

                popupTimer = setTimeout(()=>{
                    proceedFromPopup();
                }, 9000); // 9 seconds to enjoy the popup & 6 floating photos

            }else{

                entered = "";
                updateDots();

                alert("Wrong Password ❌");

            }

        },300);

    }

}

function updateDots(){

    const dots =
    document.querySelectorAll(".dots span");

    dots.forEach((dot,index)=>{

        if(index < entered.length){
            dot.classList.add("active");
        }else{
            dot.classList.remove("active");
        }

    });

}

function backspace(){
    if(entered.length > 0){
        entered = entered.slice(0, -1);
        updateDots();
    }
}

/* =========================
   SCENE CHANGE
========================= */

function showScene(id){
    document.querySelectorAll(".scene").forEach(scene=>{
        scene.classList.remove("active");
    });

    const target = document.getElementById(id);
    if(target){
        target.classList.add("active");
        target.scrollTop = 0;
        const scrollContainer = target.querySelector(".photo-scroll-container");
        if(scrollContainer) {
            scrollContainer.scrollTop = 0;
        }
    }
}

/* =========================
   ENVELOPE OPEN
========================= */

function openEnvelope(){

    document
    .querySelector(".envelope")
    .classList.add("open");

    setTimeout(()=>{

        showScene("photoScreen");

    },3000);

}

/* =========================
   PHOTO → DREAMS → GREETING
======================== */

function showDreams(){
    showScene("dreamsScreen");
}

function showGreeting(){

    showScene("greetingScreen");

    startTyping();

}

/* =========================
   7 PROMISES
========================= */

let unlockedPromises = new Set();

function showPromises(){
    showScene("promiseScreen");
}

function unlockPromise(idx){
    const card = document.getElementById(`pCard-${idx}`);
    if(!card) return;

    if(!unlockedPromises.has(idx)){
        unlockedPromises.add(idx);
        card.classList.add("unlocked");

        const counter = document.getElementById("promiseCounter");
        if(counter){
            counter.innerText = `Unlocked ${unlockedPromises.size} of 7 Promises 💜`;
        }

        if(unlockedPromises.size === 7){
            setTimeout(()=>{
                createHeartBlast();
                const seal = document.getElementById("promiseSeal");
                if(seal){
                    seal.classList.remove("hidden");
                    seal.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                if(counter){
                    counter.innerText = "All 7 Promises Sealed In My Heart 🔒💜";
                }
            }, 600);
        }
    }
}

/* =========================
   TYPING MESSAGE
========================= */

const birthdayMessage = `

Happy Birthday, my beautiful Priyadharshini ❤️🎂✨

Nee en life-la vandhadhu enakku kidaicha romba azhagana gift. 🥹❤️
Un smile en happiness, un voice en peace, un presence enakku oru home maari. 🫶
Un kooda irukkura every small moment-um enakku romba special. 💕
Un dreams-ku support-ah, un happiness-ku reason-ah eppovume irukkanum nu aasapaduren. ❤️‍🩹
Namma future-la enna nadakkum nu theriyadhu, aana en heart-ku enna venum nu enaku clear-ah theriyum — adhu nee dhaan. ❤️‍🔥
Innaikum nee, naalaikum nee, en life full-ahum nee dhaan. ❤️
Aayiram life kidaichaalum, ovvoru life-layum unnai thedi, unnaiye choose pannuven. ❤️‍🔥
Un beautiful smile eppovume fade aaga koodadhu. 🥰
En muzhu heart-oda, ovvoru naalum unnaiye choose pannitu iruppen. Happy Birthday, my love. ❤️‍🩹✨


`;

function startTyping(){

    const area = document.getElementById("messageText");
    const container = document.querySelector('.left-message');
    
    area.innerHTML = "";
    
    // Hide scrollbar during typing
    if(container) {
        container.style.overflowY = 'hidden';
    }

    let i = 0;

    const typing = setInterval(()=>{
        area.innerHTML += birthdayMessage.charAt(i);
        i++;

        // Auto-scroll the container as text types
        if(container) {
            container.scrollTop = container.scrollHeight;
        }

        if(i >= birthdayMessage.length){
            clearInterval(typing);
            
            // Enable scrolling after typing finishes
            if(container) {
                container.style.overflowY = 'auto';
            }
        }
    }, 35);
}
let current = 0;

const photos =
document.querySelectorAll(".photo-card");

function nextPhoto(){

    photos[current]
    .classList.remove("active");

    current++;

    if(current >= photos.length){
        current = 0;
    }

    photos[current]
    .classList.add("active");

}
/* =========================
   COUNTDOWN
========================= */

function showCountdown(){

    showScene("countScreen");

    let count = 3;

    const countEl =
    document.getElementById(
        "countNumber"
    );

    countEl.innerHTML = count;

    const timer =
    setInterval(()=>{

        count--;

        if(count >= 0){

            countEl.innerHTML = count;

        }else{

            clearInterval(timer);

            showScene("cakeScreen");

        }

    },1000);

}

/* =========================
   MAKE A WISH & CAKE CUT
========================= */

let cakeCutDone = false;

function performCakeCut(){
    if(cakeCutDone) return;
    cakeCutDone = true;

    // Blow candle if not blown
    const candle = document.getElementById("birthdayCandle");
    if(candle){
        candle.innerHTML = "💨";
        candle.classList.add("blown");
    }

    const cake = document.querySelector(".big-cake");
    if(cake){
        cake.classList.add("ready-to-cut");
        cake.style.transform = "scale(1.15)";
    }

    const instrText = document.getElementById("cakeInstructionText");
    const instrSub = document.getElementById("cakeInstructionSub");
    if(instrText) instrText.innerText = "Cutting The Cake... 🎂🎉✨";
    if(instrSub) instrSub.innerText = "Happy Birthday Priyadharshini! 💜";

    createBlast();

    setTimeout(()=>{
        showScene("finalScreen");
        createHearts();
        createConfetti();
    }, 1200);
}

function blowCandle(e){
    if(e) e.stopPropagation();
    const candle = document.getElementById("birthdayCandle");
    if(candle){
        candle.innerHTML = "💨";
        candle.classList.add("blown");
    }

    createBlast();

    setTimeout(()=>{
        const modal = document.getElementById("wishModal");
        if(modal){
            modal.classList.remove("hidden");
        }
    }, 500);
}

function readyToCutCake(){
    const modal = document.getElementById("wishModal");
    if(modal){
        modal.classList.add("hidden");
    }
    performCakeCut();
}

function handleCakeClick(){
    performCakeCut();
}

document.addEventListener("click", (e) => {
    if(e.target.closest(".big-cake") && !e.target.closest("#birthdayCandle")){
        performCakeCut();
    }
});

/* =========================
   DEVICE DETECTION HELPER
========================= */
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/* =========================
   CAKE BLAST
========================= */

function createBlast(){
    const mobile = isMobileDevice();
    const count = mobile ? 35 : 80;
    const spread = mobile ? Math.min(window.innerWidth * 0.85, 400) : 1000;

    for(let i=0; i<count; i++){
        const spark = document.createElement("div");
        spark.innerHTML = "✨";
        spark.style.position = "fixed";
        spark.style.left = "50%";
        spark.style.top = "50%";
        spark.style.fontSize = (mobile ? 22 : 30) + "px";
        spark.style.zIndex = "9999";
        spark.style.pointerEvents = "none";
        document.body.appendChild(spark);

        const x = (Math.random() - 0.5) * spread;
        const y = (Math.random() - 0.5) * spread;

        const anim = spark.animate([
            { transform: "translate(-50%, -50%)", opacity: 1 },
            { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, opacity: 0 }
        ], {
            duration: mobile ? 1200 : 1500,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)"
        });

        anim.onfinish = () => { if(spark.parentNode) spark.remove(); };
        setTimeout(() => { if(spark.parentNode) spark.remove(); }, 1600);
    }
}

/* =========================
   HEARTS
========================= */

let heartsInterval = null;

function createHearts(){
    if(heartsInterval) clearInterval(heartsInterval);
    const mobile = isMobileDevice();
    const emojis = ["💜", "❤️", "🎂", "🎈", "🎉", "✨"];
    const intervalTime = mobile ? 400 : 250;

    heartsInterval = setInterval(()=>{
        const heart = document.createElement("div");
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.position = "fixed";
        heart.style.left = (Math.random() * 94) + "vw";
        heart.style.bottom = "-50px";
        heart.style.fontSize = (mobile ? (18 + Math.random()*18) : (22 + Math.random()*28)) + "px";
        heart.style.zIndex = "9999";
        heart.style.pointerEvents = "none";
        heart.style.animation = "floatHeart 5.5s linear forwards";
        document.body.appendChild(heart);

        setTimeout(()=>{
            if(heart.parentNode) heart.remove();
        }, 5600);
    }, intervalTime);
}

/* =========================
   CONFETTI
========================= */

function createConfetti(){
    const mobile = isMobileDevice();
    const count = mobile ? 50 : 130;
    const colors = ["#ffffff", "#ec4899", "#c084fc", "#f9a8d4", "#ffd700"];

    for(let i=0; i<count; i++){
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.width = (mobile ? 7 : 10) + "px";
        confetti.style.height = (mobile ? 7 : 10) + "px";
        confetti.style.left = (Math.random() * 98) + "vw";
        confetti.style.top = "-20px";
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";
        confetti.style.borderRadius = "2px";
        confetti.style.animation = `fall ${mobile ? (2.5 + Math.random()*2) : (3 + Math.random()*3)}s linear forwards`;
        document.body.appendChild(confetti);

        setTimeout(()=>{
            if(confetti.parentNode) confetti.remove();
        }, 6000);
    }
}

/* =========================
   ANIMATION CSS
========================= */

const style =
document.createElement("style");

style.innerHTML = `

@keyframes floatHeart{

0%{
transform:translateY(0);
opacity:0;
}

20%{
opacity:1;
}

100%{
transform:translateY(-110vh);
opacity:0;
}

}

@keyframes fall{

0%{
transform:translateY(0)
rotate(0deg);
}

100%{
transform:translateY(110vh)
rotate(720deg);
}

}

`;

document.head.appendChild(style);

/* =========================
   DATE SCREEN EFFECTS
========================= */

function startDateTypewriter() {
    const text = "A Very Special Day 💜";
    const el = document.getElementById("dateTypewriter");
    el.innerHTML = "";
    let i = 0;
    
    const interval = setInterval(() => {
        el.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
        }
    }, 100); // adjust speed
}

function startDateHearts() {
    const container = document.getElementById("dateHearts");
    // Generate some hearts
    const heartInterval = setInterval(() => {
        const heart = document.createElement("div");
        heart.innerHTML = "💜";
        heart.style.position = "absolute";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.bottom = "-20px";
        heart.style.fontSize = (15 + Math.random() * 20) + "px";
        heart.style.opacity = "0.7";
        heart.style.animation = "floatHeart " + (4 + Math.random() * 3) + "s linear forwards";
        
        container.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            if (container.contains(heart)) {
                heart.remove();
            }
        }, 7000);
    }, 400);

    // Stop generating when scene changes (after 10000ms)
    setTimeout(() => {
        clearInterval(heartInterval);
        container.innerHTML = ""; // clean up
    }, 10000);
}

/* =========================
   POPUP BLAST EFFECTS
========================= */

function createHeartBlast() {
    const mobile = isMobileDevice();
    const count = mobile ? 30 : 65;
    const maxVelocity = mobile ? 500 : 900;

    for(let i=0; i<count; i++){
        const heart = document.createElement("div");
        heart.innerHTML = "💜";
        heart.style.position = "fixed";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.fontSize = (mobile ? (22 + Math.random()*24) : (30 + Math.random()*45)) + "px";
        heart.style.zIndex = "9999";
        heart.style.pointerEvents = "none";
        document.body.appendChild(heart);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = (mobile ? 120 : 180) + Math.random() * maxVelocity;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        const anim = heart.animate([
            { transform: "translate(-50%, -50%) scale(0.2)", opacity: 1 },
            { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.1)`, opacity: 0 }
        ], { duration: 1200 + Math.random()*700, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' });
        
        anim.onfinish = () => { if(heart.parentNode) heart.remove(); };
        setTimeout(() => { if(heart.parentNode) heart.remove(); }, 2000);
    }
}