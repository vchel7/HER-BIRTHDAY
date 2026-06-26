// Initialize variables
let currentStep = 1;
const totalSteps = 6;
let userName = "My Love";

// Initialize particles.js
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#F47EAB" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 5, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
        "line_linked": { "enable": false },
        "move": { "enable": true, "speed": 1.5, "direction": "bottom", "random": true, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true },
        "modes": { "bubble": { "distance": 200, "size": 8, "duration": 2, "opacity": 0.8 }, "repulse": { "distance": 200, "duration": 0.4 } }
    },
    "retina_detect": true
});

// Initialize GSAP animations & Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    createPetals();

    gsap.set(".container", { opacity: 0, scale: 0.95 });

    const loader = document.getElementById('loading-screen');
    const loadingBarFill = document.getElementById('loadingBarFill');

    if(loader && loadingBarFill) {
        gsap.to(loadingBarFill, {
            width: "100%",
            duration: 2, 
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onComplete: () => { loader.style.display = 'none'; }
                });
                showStep(currentStep); 
                gsap.to(".container", { opacity: 1, scale: 1, duration: 1.5, delay: 0.5, ease: "power2.out" });
            }
        });
    } else {
        showStep(currentStep);
        gsap.to(".container", { opacity: 1, scale: 1, duration: 1 });
    }

    const heartMessage = document.getElementById('heartMessage');
    document.getElementById('interactiveHeart').addEventListener('click', function() {
        setTimeout(() => { heartMessage.classList.add('show'); }, 500);
    });
});

// Function to show current step
function showStep(step) {
    document.querySelectorAll('.step').forEach(el => { el.classList.remove('active'); });
    
    const currentStepEl = document.getElementById(`step${step}`);
    if(currentStepEl) currentStepEl.classList.add('active');
    
    switch(step) {
        case 1:
            gsap.from("#step1 h1", { y: -50, opacity: 0, duration: 1, ease: "back.out(1.5)" });
            gsap.from("#step1 img", { scale: 0, rotation: 180, duration: 1.2, ease: "elastic.out(1, 0.5)" });
            break;
        case 2:
            gsap.from(".name-input", { scale: 0.5, opacity: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
            break;
        case 3:
            gsap.from("#interactiveHeart", { scale: 0, rotation: 180, duration: 1, ease: "elastic.out(1, 0.5)" });
            document.getElementById('heartName').textContent = userName;
            break;
        case 4:
            typeMessage();
            gsap.from(".photo-frame", { y: 50, rotation: -10, opacity: 0, duration: 1, ease: "back.out(1.7)" });
            startMiniHearts(); // Menyalakan emoticon terbang
            break;
        case 5:
            gsap.from(".polaroid", { scale: 0.5, opacity: 0, stagger: 0.2, duration: 0.8, ease: "back.out(1.5)", clearProps: "all" });
            break;
        case 6:
            createFireworks();
            gsap.from(".signature", { scale: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" });
            break;
    }
}

// Function to go to next step
function nextStep() {
    
    if (currentStep === 1) { 
        // --- MULAI MAINKAN MUSIK SAAT TOMBOL PERTAMA DIKLIK ---
        const music = document.getElementById('bgMusic');
        if(music) {
            music.volume = 0.6; // Mengatur volume jadi 60% agar tidak terlalu mengagetkan (bisa diubah dari 0.1 sampai 1.0)
            music.play();
        }
        // ------------------------------------------------------
        
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#FFCFD8', '#FF1695'], zIndex: 9999 }); 
    }
    
    if (currentStep === 3) { createHearts(); }
    
    // TRANSISI MEWAH DARI STEP 4 -> 5 (Ledakan Bintang Emas & Kembang Api)
    if (currentStep === 4) {
        const starDefaults = { spread: 360, ticks: 100, gravity: 0.5, decay: 0.9, startVelocity: 30, shapes: ['star'], colors: ['#FFD700', '#FFA500', '#FF69B4', '#FFFFFF', '#FF1493'] };
        confetti({ ...starDefaults, particleCount: 80, origin: { x: 0.5, y: 0.5 }, zIndex: 99999 });
        setTimeout(() => confetti({ ...starDefaults, particleCount: 60, origin: { x: 0.2, y: 0.6 }, zIndex: 99999 }), 200);
        setTimeout(() => confetti({ ...starDefaults, particleCount: 60, origin: { x: 0.8, y: 0.6 }, zIndex: 99999 }), 400);

        setTimeout(() => { createFirework(); }, 100);
        setTimeout(() => { createFirework(); }, 400);
        setTimeout(() => { createFirework(); }, 700);
    }

    if (currentStep === 5) {
        const colors = ['#FFCFD8', '#FFA6CA', '#FF9CB4', '#F47EAB', '#DA4F8E', '#FF1695'];
        confetti({ particleCount: 150, angle: 60, spread: 80, origin: { x: 0, y: 0.9 }, colors: colors, zIndex: 9999 });
        confetti({ particleCount: 150, angle: 120, spread: 80, origin: { x: 1, y: 0.9 }, colors: colors, zIndex: 9999 });
        setTimeout(() => { confetti({ particleCount: 300, spread: 160, origin: { y: 0.4 }, colors: colors, zIndex: 9999 }); }, 350);
    }

    if (currentStep < totalSteps) {
        gsap.to(".container", {
            scale: 0.8, opacity: 0, duration: 0.4,
            onComplete: () => {
                currentStep++;
                showStep(currentStep);
                gsap.to(".container", { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" });
            }
        });
    }
}

// Function Emoticon Hati Terbang di Step 4
let miniHeartsInterval;
function startMiniHearts() {
    const container = document.getElementById('miniHeartsStep4');
    if(!container) return;
    container.innerHTML = ''; 
    
    const emojis = ['💖', '💕', '💗', '💓', '✨'];
    
    miniHeartsInterval = setInterval(() => {
        if(currentStep !== 4) {
            clearInterval(miniHeartsInterval);
            return;
        }
        const heart = document.createElement('div');
        heart.classList.add('mini-heart');
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = `${10 + Math.random() * 80}%`;
        heart.style.bottom = `${10 + Math.random() * 40}%`;
        heart.style.animationDuration = `${3 + Math.random() * 2}s`;
        
        container.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 5000);
    }, 300); 
}

// Function to save name
function saveName() {
    const nameInput = document.getElementById('nameInput').value.trim();
    if (nameInput) {
        userName = nameInput;
        document.getElementById('displayName').textContent = userName;
        document.getElementById('finalName').textContent = userName;
        document.getElementById('heartName').textContent = userName;
        
        gsap.to(".name-input", {
            backgroundColor: "#e8f5e9", borderColor: "#81c784", duration: 0.3, yoyo: true, repeat: 1,
            onComplete: () => { nextStep(); }
        });
    } else {
        gsap.to(".name-input", { backgroundColor: "#ffebee", borderColor: "#e53935", duration: 0.3, yoyo: true, repeat: 1 });
    }
}

// Function to create floating hearts
function createHearts() {
    const container = document.getElementById('floatingHearts');
    const colors = ['#FFCFD8', '#FFA6CA', '#FF9CB4', '#F47EAB', '#DA4F8E', '#FF1695'];
    
    for (let i = 0; i < 100; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.animationDuration = `${2 + Math.random() * 3}s`; 
        heart.style.fontSize = `${15 + Math.random() * 30}px`;
        heart.style.top = `${40 + Math.random() * 50}%`;
        
        container.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 5000);
    }
    
    const duration = 2500;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: -0.1 }, colors: ['#FF1695', '#DA4F8E', '#FFCFD8'], shapes: ['heart'], zIndex: 9999 });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: -0.1 }, colors: ['#FF1695', '#DA4F8E', '#FFCFD8'], shapes: ['heart'], zIndex: 9999 });
        if (Date.now() < end) { requestAnimationFrame(frame); }
    }());

    gsap.to("#interactiveHeart", { scale: 1.4, duration: 0.2, yoyo: true, repeat: 1 });
}

// Function to create falling petals
function createPetals() {
    const container = document.getElementById('petalsContainer');
    const petalColors = ['#FFCFD8', '#FFA6CA', '#FF9CB4', '#F47EAB'];
    
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        const petalType = Math.floor(Math.random() * 3);
        let petalShape;
        switch(petalType) {
            case 0: petalShape = "M50,0 C60,15 60,30 50,45 C40,30 40,15 50,0"; break;
            case 1: petalShape = "M50,0 C70,20 70,40 50,50 C30,40 30,20 50,0"; break;
            case 2: petalShape = "M50,0 C55,10 55,25 50,35 C45,25 45,10 50,0"; break;
        }
        
        petal.style.width = `${10 + Math.random() * 20}px`;
        petal.style.height = `${10 + Math.random() * 20}px`;
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.top = `-20px`;
        petal.style.fill = petalColors[Math.floor(Math.random() * petalColors.length)];
        petal.style.opacity = 0.7 + Math.random() * 0.3;
        
        petal.innerHTML = `<svg viewBox="0 0 100 50" width="100%" height="100%"><path d="${petalShape}" fill="${petalColors[Math.floor(Math.random() * petalColors.length)]}" /></svg>`;
        container.appendChild(petal);
        
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 15;
        const sway = 50 + Math.random() * 100;
        
        gsap.to(petal, {
            y: window.innerHeight + 50, x: `+=${sway}`, rotation: 360, duration: duration, delay: delay, ease: "none",
            onComplete: () => {
                petal.style.top = `-20px`; petal.style.left = `${Math.random() * 100}%`;
                gsap.to(petal, {
                    y: window.innerHeight + 50, x: `+=${sway}`, rotation: 360, duration: duration, ease: "none",
                    onComplete: () => { petal.remove(); }
                });
            }
        });
    }
}

// Function to type out message
function typeMessage() {
    const messages = [
        `Dear my love ${userName},`,
        "Today on your special day...I have something to tell you",
        "You're the greatest, you're the best, I amazed by your figure.",
        "You're the most amazing person I've ever known.",
        "Your smile light the darkest part of my soul.",
        "Your laugh being my softest melodies.",
        "Loving you is the easiest and most beautiful thing I've ever done.",
        "You are my sun, my moon, and all of my stars.",
        "May this new chapter bring you as much joy as you bring into my life.",
        "Happy Birthday to the keeper of my heart. ❤"
    ];
    
    const typingText = document.getElementById('typingText');
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typingText.innerHTML = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 25;
        } else {
            typingText.innerHTML = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 65;
        }
        
        if (!isDeleting && charIndex === currentMessage.length) {
            isDeleting = true;
            typingSpeed = 1300; 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 650; 
        }
        setTimeout(type, typingSpeed);
    }
    setTimeout(() => {
        document.getElementById('typedMessage').classList.add('show');
        type();
    }, 500);
}

// Function to create fireworks
function createFireworks() {
    for (let i = 0; i < 8; i++) { setTimeout(() => { createFirework(); }, i * 800); }
    setInterval(() => { if (Math.random() > 0.7) { createFirework(); } }, 2000);
}

function createFirework() {
    const colors = ['#FFCFD8', '#FFA6CA', '#FF9CB4', '#F47EAB', '#DA4F8E', '#FF1695'];
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.color = colors[Math.floor(Math.random() * colors.length)];
    firework.style.setProperty('--x', `${Math.random() * window.innerWidth}px`);
    firework.style.setProperty('--y', `${Math.random() * window.innerHeight * 0.8}px`);
    firework.style.setProperty('--x-end', `${(Math.random() - 0.5) * 20}px`);
    firework.style.setProperty('--y-end', `${(Math.random() - 0.5) * 20}px`);
    document.body.appendChild(firework);
    
    setTimeout(() => {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('firework-particle');
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = firework.style.getPropertyValue('--x');
            particle.style.top = firework.style.getPropertyValue('--y');
            particle.style.setProperty('--tx', `${Math.cos(i * 0.2) * 100}px`);
            particle.style.setProperty('--ty', `${Math.sin(i * 0.2) * 100}px`);
            document.body.appendChild(particle);
            setTimeout(() => { particle.remove(); }, 1000);
        }
        firework.remove();
    }, 1000);
}