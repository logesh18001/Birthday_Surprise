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

    // Auto-init story if photoScreen is active (e.g. testing or refresh)
    const photoScreen = document.getElementById("photoScreen");
    if(photoScreen && photoScreen.classList.contains("active")) {
        startStoryReader();
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
        if(id === "photoScreen") {
            startStoryReader();
        }
    }
}

/* =========================
   ENVELOPE OPEN
========================= */

function openEnvelope(){
    const env = document.querySelector(".envelope");
    if(!env || env.classList.contains("open")) return;

    env.classList.add("open");

    const hint = document.getElementById("envelopeHint");
    if(hint){
        hint.classList.add("fade-out");
    }

    setTimeout(()=>{
        showScene("photoScreen");
    }, 3000);
}

/* =========================
   INTERACTIVE STORY LETTER
========================= */

const storyChapters = [
    {
        title: "🎂 Happy Birthday My Biba!",
        timer: 10,
        content: `
            <div class="story-highlight">🎂❤️ <strong>HAPPY BIRTHDAY, MY DEAR BIBASHANA!</strong> ❤️🫂😘</div>
            <div class="story-subhighlight"><strong>My Dearest Love, My Biba! ❤️🥹</strong></div>
            <p>Unna ya enakku pudichirukku, edhukku pudichirukku-nu yaaravadhu enkitta ketta, adhukku en kitta sariyana badhil illa. Aana onnu mattum enakku theriyum.</p>
            <p>Unna enakku evlo pudikkumo, andha alavukku vera yaaraiyum en life-la pudichadhilla. En ex-ah love pannadhai vida unna romba adhigama love panren. Idha naan avaloda compare panni sollala. Nee avala maadhiri illa, <strong>nee nee-ah irukkuradhunaala dhaan enakku unna ivlo pudikkudhu. ❤️</strong></p>
        `
    },
    {
        title: "💖 Reason Illadha Unmaiyana Love",
        timer: 9,
        content: `
            <p>Unna thavira vera edhaiyum yosikka kooda enakku thonala. Enakku nee pudikkum. Adhukku oru specific reason irundha mattum dhaan adhu love-ah?</p>
            <p>Enna reason-nu theriyama, oruthanga mela ivlo love varradhu dhaan unmaiyana love-nu naan ninaikkiren. Idha naan en love-ah prove panradhukkaga sollala. En manasula irukkuradha un kitta sollanum-nu thonuchu. Adhaan solren.</p>
            <p class="story-accent">Aana nee en life-la irukkanum. Endha situation vandhaalum un kooda naan iruppen. <strong>Endha kaaranathukkaagavum unna vittuttu poga maatten. ❤️</strong></p>
        `
    },
    {
        title: "💬 En Manasu Kekkura Orey Vishayam",
        timer: 11,
        content: `
            <p>Nee enna sonnalum naan kekka ready-ah irukken. Idhuvarikkum naan appadithaan irundhirukken. Naan mattum dhaan message panren, naan mattum dhaan pesuradhukku try panren-nu unakku thonalaam. Aana nee enkitta pesaama irukkumbodhu enakku oru maadhiri feel aagudhu. Adhaan naan message pannitte irukken.</p>
            <p>Naan un kitta ennoda mattum pesittu iru, full time enakkaga spend pannu-nu kekkala. <strong>Nee enna panra, enga irukka, saaptiya, innikku un day eppadi pochu, unga veetla nilamai eppadi irukku, anga enna situation-nu chinna chinna vishayangalai kooda en kitta share pannanum-nu dhaan aasapaduren.</strong></p>
            <p>Enakku un kitta irundhu perusa edhuvum expectation illa. Mudinja oru naalaikku moonu thadava message, oru chinna call illa oru voice message. Avlodhaan. Unakku time irukkumbodhu pesu. Un situation-ah naan understand pannikrean. Unna endha vidhathulayum force panna virumbala.</p>
        `
    },
    {
        title: "✨ 07/05/2026 - First Time Unna Paartha Naal",
        timer: 12,
        content: `
            <p>Unakku theriyuma, naan yaar kittayum ivlo emotionally attach aanadhu illa. Aana un kitta mattum appadi irukken. Yen appadinu ketta, enakku therinja ore badhil: <strong>I LOVE YOU SO MUCH!</strong></p>
            <div class="story-special-date"><strong>Unna first time paartha andha naal enakku innum nyabagam irukku: 07/05/2026 🗓️✨</strong><br><small style="color:#fde047;">Exact time theriyala, almost 9:30 irukkumnu ninaikkiren. Andha naal-la irundhu dhaan en manasula oru beautiful feeling start aachu.</small></div>
            <p>Internship class-la nee oru pakkam irukkumbodhu, unna theriyama paarkkura maadhiri paathu rasippen. Nee enna paarkkumbodhu naan paarkkaadha maadhiri nadippen. 😂 Aana en manasukkulla unkitta pesanum-nu avlo aasai irukkum.</p>
            <p>Nee edhaavadhu thittiduviya-nu oru chinna bayam. Adhanaala appove unkitta pesaama irundhuten. Internship mudichittu nee pogumbodhu kooda, appove poi pesirukkalaame-nu yosichen, but bayam enna thaduthuduchii...</p>
            <p>Appuram nee project-ku varumbodhu eppadiyaavadhu un number illa Instagram ID vaanganum-nu plan panni vachirundhen. <strong>Aana kadaisila neeye enkitta number ketta! 😂❤️</strong> Andha moment enakku evlo special-nu unakku theriyadhu.</p>
        `
    },
    {
        title: "⌚ Un Kannum... Nee Gift Panna Watch-um",
        timer: 11,
        content: `
            <p>Unna pathi sollanumna, nee oru romba nalla person. Un smile, un voice, nee pesura vidham, nee sirikkura vidham, un kannu, un ovvoru chinna chinna actions ellame enakku romba pudikkum.</p>
            <p>Unna paathu pesuradhukku enakku bayam illa. <strong>Aana un kannai paathu pesuradhukku mattum ennaala mudiyadhu. 🥹 Un kannula enna magic irukkunu theriyala. First time flat aanadhe andha kannukkuthaan. ❤️</strong></p>
            <p>Nee enakku watch gift pannina andha moment kooda ennaala marakka mudiyadhu. Naan watch vaanganum-nu unkitta sollittu irundhen. Aana unna first time personal-ah meet pannumbodhu nee enakku watch gift pannuva-nu naan konjam kooda expect pannala.</p>
            <p class="story-accent">Ippo kooda andha watch-la time paarkkumbodhellam mudhalla un face dhaan nyabagam varum. Adhu enakku verum watch illa. <strong>Nee enakku kodutha oru beautiful memory. Adha paarkkumbodhellam unna ninaikkaama irukka mudiyadhu. Thank you so much, my love! ❤️⌚</strong></p>
        `
    },
    {
        title: "💭 En Manasula Irukkura Unmai",
        timer: 12,
        content: `
            <div class="story-subhighlight"><strong>Ippo oru mukkiyamaana vishayam unkitta open-ah sollanum.</strong></div>
            <p>First-la nee enkitta pesuradhukku time theduva. Morning first message-ah nee dhaan anuppuva. Naan message panradhukku munnadiye nee Good Morning solliruppa. Andha chinna chinna moments enakku romba happiness-ah irundhuchu.</p>
            <p>Aana indha last few weeks-ah namma communication konjam maariduchu. Especially unakku udambu sari illaama hospital pona appuram, enkitta pesa unakku time kidaikkiradhu romba kammiya irukku.</p>
            <p>Un annan oorla irundhu vandhirukkaanga, avanga kooda irukkumbodhu adikkadi pesa mudiyadhu, appappo dhaan pesa mudiyum-nu nee sonna reason enakku puriyudhu; naan understand panikrean. Naan adha respect panren.</p>
            <p>Aana sila nerangal-la nee message pannama irukkumbodhu, nee ennai avoid panriyo-nu enakku personal feel aagudhu. Nee appadi panra-nu naan sollala; nee apadi panna mateanu enaku therim. Un mela enakku nambikkai irukku unna mula namburean. <strong>Aana munna maadhiri nee enkitta pesuradha miss panren.</strong></p>
            <p>Nee morning message pannuva-nu wait panradhu, un voice kekkanum-nu aasapaduradhu, un kooda konjam neram pesanum-nu ninaikkiradhu idhellam enakku ippo daily habit aagiduchu.</p>
            <p>Unakku anga edhaavadhu problem irundhaalum enkitta open-ah sollu. Namma serndhu face pannalaam. Unna question panradhukkaagavo, unnai control panradhukkaagavo naan idhellam kekkala.</p>
        `
    },
    {
        title: "🕊️ Un Life-la Enakkum Konjam Space",
        timer: 10,
        content: `
            <div class="story-highlight"><strong>Naan un kitta full-time attention kekkala. Un life-la enakkum konjam space irukkanum-nu dhaan aasapaduren.</strong></div>
            <p>Unakku un family irukku, un responsibilities irukku, un personal time irukku. Adhellam enakku puriyum. Adhe maadhiri namma relationship-kum konjam time, care, communication irundha enakku romba happy-ah irukkum.</p>
            <p>Nee busy-ah irundhaalum parava illa. Oru chinna message, oru call, oru voice note. Adhuve enakku podhum. Naan un kitta perusa edhuvum expect pannala.</p>
            <p>Indha last few weeks-la naan neraya time azhudhuttu irukken. Adha unkitta oru time mattum dhaan sollirukken. Yen azhudhennu enakke theriyala. Aana un kitta sollanum-nu thonuchu. Adhaan solren.</p>
            <p>Naan ipdi irukken-nu sonna, neeum appadiye irukkanum-nu naan sollala. Un feelings, un situation ellame enakku mukkiyam. Aana en manasula irukkuradha nee therinjikkanum-nu dhaan aasapaduren.</p>
        `
    },
    {
        title: "♾️ Wrinkles Vandhaalum Idhe Kadhal",
        timer: 10,
        content: `
            <div class="story-subhighlight"><strong>Nee enakku oru girlfriend mattum illa. Nee enakku romba special-aana person. ❤️</strong></div>
            <p>Innum oru personal vishayam sollanum. Physical attraction mattum dhaan love-nu ninaikkalaam. Aana enakku un mela irukkuradhu adhu illa.</p>
            <p>Un kitta kidaikkura care, affection, understanding, support, un kooda pesuradhu, sirikkuradhu, chinna chinna sandaigal poduradhu, marubadiyum serndhu pesuradhu, un happiness-la naanum happy-ah irukkuradhu — idhellam dhaan enakku love.</p>
            <p>Un beauty mattum illa, un character, un thoughts, un feelings, un happiness ellame love thann.</p>
            <p class="story-accent"><strong>Naalaikku un face-la wrinkles vandhaalum, un appearance maarinaalum, un age aanaalum, nee eppadi irundhaalum naan unna idhe maadhiri love pannitte iruppen. Enakku venum-nu irukkuradhu un kooda oru beautiful life. ❤️</strong></p>
        `
    },
    {
        title: "🛡️ Un Safe Place-ah Naan Iruppen",
        timer: 11,
        content: `
            <p>Unakku appa illainu nee sonnapo, unakku kidaikkaadha andha paasam, care, support ellathayum ennaala mudinja alavukku kodukkanum-nu ninaichen. <strong>Unakku oru safe place-ah irukkanum. Unnaala edhaiyum bayam illaama enkitta share panna mudiyanum.</strong></p>
            <p>Unakku santhosham vandhaalum, kashtam vandhaalum, success vandhaalum, failure vandhaalum un pakkathula irukkanum. Un dreams-ku support pannanum. <strong>Unakku oru nalla partner-ah mattum illaama, unakku nalla appa-ahvum friend-ahvum irukkanum.</strong></p>
            <p>Un mela enakku evvalavu nambikkai irukko, adhe maadhiri nee en mela nambikkai vaikka mudiyanum. Namma rendu perukkum edhaavadhu problem vandha silent-ah irundhu distance create pannama, open-ah pesi solve pannalaam.</p>
            <p>Naan perfect person illa. En kitta-yum mistakes irukkum. Aana edhaavadhu thappu pannina adha accept panni correct pannikka ready-ah irukken. <strong>Namma relationship-la ego-vai vida love perusa irukkanum. ❤️</strong></p>
        `
    },
    {
        title: "🔥 ADHU NEE DHAAN, BIBA!",
        timer: 11,
        content: `
            <p>Enakku unna lose panniduvom-ngira bayam irukku. Aana andha bayathula unna control panna virupam illa. Unna happy-ah paarkkanum, un kooda life long travel pannanum.</p>
            <p>Namma future-la enna nadakkum-nu theriyadhu. Aana en heart-ku enna venum-nu enakku clear-ah theriyum...</p>
            <div class="story-huge-text">ADHU NEE DHAAN, BIBA! ❤️‍🔥</div>
            <p>Innaikum nee, naalaikum nee, en life full-ahum nee dhaan. Aayiram life kidaichaalum ovvoru life-layum unnai thedi, unnaiye choose pannuven.</p>
            <p>Enakku unna love panradhukku oru reason thevai illa. Unna love panradhe enakku oru happiness. Nee enkooda irundha podhum-nu ninaikkiren. Aana adhe samayam un happiness, un dreams, un freedom ellathukkum naan support-ah irukkanum-nu aasapaduren.</p>
            <p class="story-accent"><strong>Oru vishayam mattum promise panren:</strong> Endha situation vandhaalum unna purinjikka try pannuven. Unna vittu poganum-nu ninaikka maatten. Namma rendu perukkum evvalavu kashtam vandhaalum, adha serndhu face pannalaam. Unna oru naal kooda taken for granted-ah treat panna virumbala.</p>
            <p>Nee enakku kidaicha beautiful gift. Un smile eppovume fade aaga koodadhu. Un dreams ellame fulfil aaganum. Nee healthy-ah, happy-ah irukkanum. Time-ku saapidu, nalla rest edu. <strong>Un health-ah first priority-ah paaru. ❤️</strong></p>
        `
    },
    {
        title: "🥺 I Miss You So Much Biba",
        timer: 10,
        content: `
            <div class="story-subhighlight"><strong>I MISS YOU SO MUCH, BIBA! 🥺❤️</strong></div>
            <p>Un kooda pesuradhu miss panren. Un voice miss panren. Un smile miss panren. Unna paarkkuradha miss panren. Un kooda spend panna ovvoru moment-um miss panren.</p>
            <p>Nee enna miss panriyaanu enakku theriyala. Aana naan unna ovvoru naalum miss pannitte irukken.</p>
            <p>Unakku naan evlo special-nu theriyanum. Adhe maadhiri nee enakku evlo special-nu naan unakku sollanum-nu thonuchu.</p>
            <p>Naan un kitta kekkuradhu romba simple. Namma rendu perum namma feelings-ah open-ah share pannikanum. Konjam time spend pannanum. Love-ah mattum illa, friendship-ahvum namma relationship-ah maintain pannanum.</p>
            <div class="story-highlight"><strong>I DON'T WANT A PERFECT RELATIONSHIP. I JUST WANT US TO UNDERSTAND EACH OTHER, TRUST EACH OTHER, AND NEVER GIVE UP ON EACH OTHER. ❤️</strong></div>
        `
    },
    {
        title: "👑 My World, My Queen, Forever Love",
        timer: 10,
        content: `
            <p>Nee enakku:</p>
            <div class="story-tags-grid">
                <span>My Love ❤️</span>
                <span>My Soul 🫀</span>
                <span>My Happiness 🥹</span>
                <span>My Queen 👑</span>
                <span>My World 🌍</span>
                <span>My Favourite Person 🫶</span>
                <span>My Future ❤️</span>
                <span>My Forever Love ♾️</span>
            </div>
            <div class="story-affirmations">
                <strong>I ALWAYS MISS YOU. 💜</strong><br>
                <strong>I ALWAYS TRUST YOU. 🔒</strong><br>
                <strong>I WILL ALWAYS CHOOSE YOU. 💍</strong><br>
                <strong>I WILL ALWAYS LOVE YOU SOOOOO MUCH, MY BIBA! 🥹❤️</strong>
            </div>
            <p>Un kooda innum neraya memories create pannanum. Un ovvoru birthday-vum celebrate pannanum. Un happiness-la naanum irukkanum. Un success-ah un kooda serndhu celebrate pannanum. Life-la evvalavu changes vandhaalum namma rendu perum orutharukku oruthar support-ah irukkanum.</p>
            <p>Last-ah onnu sollanum...</p>
            <div class="story-highlight"><strong>Nee en life-la vandhadhu coincidence-ah irukkalaam. Aana unna love panradhu en manasu edutha beautiful decision.</strong></div>
            <p>Unna naan evvalavu love panrennu ennaala words-la solla mudiyadhu. Aana ovvoru naalum unakku adha feel panna vaikka aasapaduren.</p>
            <div class="story-subhighlight"><strong>YOU ARE MY FAVOURITE PERSON, MY BEAUTIFUL GIFT AND MY FOREVER LOVE! 🥹❤️♾️</strong></div>
            <p style="font-size: 1.25em; text-align: center; margin-top: 15px;"><strong>I LOVE YOU SO MUCH, MY BIBA! 🫂💋❤️<br>UMMAAAAAAAAA! 😘💋❤️</strong></p>
        `
    }
];

let currentStoryIdx = 0;
let highestStoryUnlocked = 0;
let storyTimerInterval = null;
let storyTimeRemaining = 0;
let storyIsLocked = true;
let storyCompleted = false;

function startStoryReader() {
    if (!storyCompleted) {
        showStoryCard(currentStoryIdx);
    }
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    const photoScreen = document.getElementById("photoScreen");
    if(photoScreen && photoScreen.classList.contains("active")) {
        startStoryReader();
    }
}

function showStoryCard(idx) {
    if (idx < 0 || idx >= storyChapters.length) return;
    currentStoryIdx = idx;

    const chapter = storyChapters[idx];
    const cardEl = document.getElementById("storyActiveCard");
    const chapterBadge = document.getElementById("storyChapterBadge");
    const percentBadge = document.getElementById("storyPercentBadge");
    const progressBar = document.getElementById("storyProgressBar");
    const prevBtn = document.getElementById("storyPrevBtn");
    const nextBtn = document.getElementById("storyNextBtn");
    const btnText = document.getElementById("storyBtnText");
    const spinner = document.getElementById("storyTimerSpinner");
    const warning = document.getElementById("storyEarlyWarning");

    if (warning) warning.classList.add("hidden");

    // Progress updates
    const percent = Math.round(((idx + 1) / storyChapters.length) * 100);
    if (chapterBadge) chapterBadge.innerText = `💌 Chapter ${idx + 1} of ${storyChapters.length}`;
    if (percentBadge) percentBadge.innerText = `${percent}% Read`;
    if (progressBar) progressBar.style.width = `${percent}%`;

    // Back button state
    if (prevBtn) prevBtn.disabled = (idx === 0);

    // Render content with smooth fade animation
    if (cardEl) {
        cardEl.style.animation = 'none';
        void cardEl.offsetWidth; // trigger reflow
        cardEl.style.animation = 'cardEntrance 0.5s ease-out forwards';
        cardEl.innerHTML = `
            <div class="story-card-title">${chapter.title}</div>
            <div class="story-card-body">${chapter.content}</div>
        `;
    }

    // Scroll container smoothly to top of card so it's easily readable
    const scrollContainer = document.querySelector(".photo-scroll-container");
    if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Check if this card was already read/unlocked
    if (idx < highestStoryUnlocked) {
        // Already read previously! No waiting needed.
        if (storyTimerInterval) clearInterval(storyTimerInterval);
        storyIsLocked = false;
        if (nextBtn) {
            nextBtn.classList.remove("locked");
            nextBtn.classList.add("ready-pulse");
        }
        if (spinner) spinner.style.display = "none";
        if (btnText) {
            btnText.innerText = (idx === storyChapters.length - 1) ? "Finish Reading 🥹❤️" : `Next Thought 💌 (${idx + 2}/${storyChapters.length})`;
        }
        return;
    }

    // Newly visited card: start reading timer!
    if (storyTimerInterval) clearInterval(storyTimerInterval);
    storyIsLocked = true;
    storyTimeRemaining = chapter.timer;

    if (nextBtn) {
        nextBtn.classList.add("locked");
        nextBtn.classList.remove("ready-pulse");
    }
    if (spinner) spinner.style.display = "inline-block";
    if (btnText) btnText.innerText = `Porumaiya padunga... (${storyTimeRemaining}s 💜)`;

    storyTimerInterval = setInterval(() => {
        storyTimeRemaining--;
        if (storyTimeRemaining > 0) {
            if (btnText) btnText.innerText = `Porumaiya padunga... (${storyTimeRemaining}s 💜)`;
        } else {
            // Timer finished!
            clearInterval(storyTimerInterval);
            storyIsLocked = false;
            highestStoryUnlocked = Math.max(highestStoryUnlocked, idx + 1);

            if (nextBtn) {
                nextBtn.classList.remove("locked");
                nextBtn.classList.add("ready-pulse");
            }
            if (spinner) spinner.style.display = "none";
            if (btnText) {
                if (idx === storyChapters.length - 1) {
                    btnText.innerText = "Finish Reading 🥹❤️";
                } else {
                    btnText.innerText = `Next Thought 💌 (${idx + 2}/${storyChapters.length})`;
                }
            }
        }
    }, 1000);
}

function handleStoryNextClick() {
    if (storyIsLocked) {
        // Shake button and show friendly warning
        const nextBtn = document.getElementById("storyNextBtn");
        const warning = document.getElementById("storyEarlyWarning");
        if (nextBtn) {
            nextBtn.classList.remove("shake-btn");
            void nextBtn.offsetWidth;
            nextBtn.classList.add("shake-btn");
        }
        if (warning) {
            warning.classList.remove("hidden");
            warning.classList.remove("pulse-toast");
            void warning.offsetWidth;
            warning.classList.add("pulse-toast");
        }
        return;
    }

    if (currentStoryIdx < storyChapters.length - 1) {
        showStoryCard(currentStoryIdx + 1);
    } else {
        // Finished all chapters! Show final confirmation section
        const finalSection = document.getElementById("storyFinalSection");
        const actions = document.querySelector(".story-actions");
        if (finalSection) {
            finalSection.classList.remove("hidden");
            finalSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (actions) actions.style.display = "none";
    }
}

function prevStoryCard() {
    if (currentStoryIdx > 0) {
        showStoryCard(currentStoryIdx - 1);
    }
}

function confirmStoryCompleted() {
    createHeartBlast();
    storyCompleted = true;
    const confirmBtn = document.getElementById("storyConfirmBtn");
    const unlockArea = document.getElementById("dreamsUnlockArea");
    if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = "Padichiten... I Love You So Much Logu! 🥹❤️";
        confirmBtn.classList.add("confirmed");
    }
    if (unlockArea) {
        unlockArea.classList.remove("hidden");
        unlockArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function toggleFullLetterView() {
    const fullContainer = document.getElementById("fullLetterContainer");
    if (!fullContainer) return;
    if (fullContainer.classList.contains("hidden")) {
        fullContainer.classList.remove("hidden");
        if (!fullContainer.innerHTML.trim()) {
            fullContainer.innerHTML = storyChapters.map((c, i) => `
                <div class="full-letter-chapter">
                    <h4>${c.title}</h4>
                    <div>${c.content}</div>
                </div>
            `).join("<hr class='story-divider'>");
        }
        fullContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
        fullContainer.classList.add("hidden");
    }
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

    // Reset photo index and caption
    currentPhotoIndex = 0;
    const photoCards = document.querySelectorAll(".photo-card");
    photoCards.forEach((c, idx) => {
        if(idx === 0) c.classList.add("active");
        else c.classList.remove("active");
    });
    const captionEl = document.getElementById("captionText");
    const counterEl = document.getElementById("captionCounter");
    if(captionEl && photoCaptions[0]) {
        captionEl.innerText = photoCaptions[0];
    }
    if(counterEl) {
        counterEl.innerText = `1 / ${photoCards.length} 💜`;
    }
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

Nee en life-la vandhadhukku apram, enakku happiness-na enna, oruthanga namakku evlo special-ah irukka mudiyum-ngradha un moolama dhaan purinjukitten. 🥹❤️

Un kooda pesura ovvoru moment-um, nee sirikkira andha chinna chinna moments-um en manasukku romba precious. Sila neram enna sollanum-nu kooda theriyadhu, aana un kooda irundha mattum podhum, manasu romba happy-ah irukkum. 🫶

Unakku kashtam varumbodhu unakku aarudhala irukkanum, nee santhoshama irukkumbodhu un kooda serndhu santhoshapadanum. Un dreams ellathukkum support-ah, un life-la eppovume unnai purinjukura oruthana irukkanum-nu aasapaduren. ❤️

Namma life eppadi maarinaalum, situations eppadi irundhaalum, unna vittu pogama, un kaiya pidichittu ellaathaiyum serndhu face pannanum-ngradhu dhaan en aasai. 

Enakku perfect life venam, aana andha life-la nee irukkanum. Periya periya happiness venam, un kooda irukkura chinna chinna moments podhum. 🥹💗

Aayiram per namma life-la vandhaalum, en manasu thedura oru person nee mattum dhaan. Innaikum unna dhaan choose panren, naalaikum unna dhaan choose pannuven. Ovvoru naalum pudhusa unnai love panna aasapaduren. ❤️‍🔥

Un smile eppovume ippadiye irukkanum. Unakku nee ninaikkira ella happiness-um kidaikkanum. Un life-la nee aasapadra ella dreams-um nijamaaganum.

**Happy Birthday, my love!** 🥰❤️

Unakku naan evlo love panren-ngradha vaarthaigalaala full-ah solla mudiyadhu. Aana onnu mattum unakku promise panren — en manasukku nee evlo special-o, adhe alavukku ovvoru naalum unnai special-ah feel panna vaippen. 

**You are not just a part of my life; you are one of the most beautiful reasons behind my happiness. I love you endlessly.** ❤️‍🩹✨


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
const photoCaptions = [
    "Un kai viralai korthu naan pidicha andha nodi, en kadasi jenmam varai un thunaiyaaga irukka en uyir sathiyam panniduchu. 🤝❤️",
    "Un kankalukulla irukkura andha aazhathai paarkkumbodhu, en aathmaave unkitta mothama flat aagi karainju pogudhu. 🥺👀✨",
    "Mugathoda azhaga vida, un aathmaavoda thooimaiyaana nalla character dhaan enna un kaaladila vizha vechuruchu. 🤍🌸",
    "En vaazhkkaiyoda இருண்ட nodigalai kooda velichamaakkura ore athisayam, un idhazhgal sindhura andha unmaiyaana siripu dhaan. 🥰✨",
    "En pakkathula nee nikkumbodhu dhaan, indha boomiyila naan pirandhadhukku oru muzhumaiyaana artham kidaikkudhu. 🫂❤️‍🔥",
    "Enakkaga nee thudikkira andha selfless-ana anbil, en thaaiyoda maru-uruvathaiye naan unkitta dhaan paarkkuren. 🥹💜",
    "Aayiram kavithaigal solladha kaadhalin aazhathai, un mounamaana kangal en idhayathukku sollikitte irukku. 💫👀",
    "Indha ulagathil naan paatha ella azhagayum thooki saapdra ore athisayam, en manasa aala vandha un thooimaiyaana thotram dhaan. 👑❤️",
    "Namma evlo periya sandai pottalum, unna lose panna koodadhu nu thudikkira andha bayathula dhaan en aazhamaana kaadhal irukku. ❤️‍🩹🥺",
    "En vaazhkkaiku kidaicha migapperiyara aaseervaadham, yaaraiyum kaayapaduthadha un punidhamaana nalla manasu dhaan. 🛡️🤍",
    "Moochu ninnu poyee indha udambu azhinjaalum, aayiram jenmam eduthaalum en idhayam unnai mattumae thedi vandhu thudikkum. ♾️❤️‍🔥"
];

let currentPhotoIndex = 0;

function nextPhoto(){
    const photoCards = document.querySelectorAll(".photo-card");
    if(!photoCards.length) return;

    photoCards[currentPhotoIndex].classList.remove("active");
    currentPhotoIndex = (currentPhotoIndex + 1) % photoCards.length;
    photoCards[currentPhotoIndex].classList.add("active");

    const captionEl = document.getElementById("captionText");
    const counterEl = document.getElementById("captionCounter");
    const captionCard = document.getElementById("photoCaption");

    if(captionCard){
        captionCard.classList.add("caption-fade");
        setTimeout(()=>{
            if(captionEl && photoCaptions[currentPhotoIndex]) {
                captionEl.innerText = photoCaptions[currentPhotoIndex];
            }
            if(counterEl) {
                counterEl.innerText = `${currentPhotoIndex + 1} / ${photoCards.length} 💜`;
            }
            captionCard.classList.remove("caption-fade");
        }, 180);
    }
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