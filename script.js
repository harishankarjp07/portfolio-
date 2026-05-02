document.addEventListener('DOMContentLoaded', () => {

    // --- Terminal Loader Sequence ---
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');
    const nav = document.querySelector('.navbar');
    const main = document.querySelector('main');
    
    const bootSequence = [
        "Initializing HARI.dev protocol...",
        "Loading UI modules...",
        "Establishing secure connection...",
        "Bypassing mainframe...",
        "System ready."
    ];

    let currentLine = 0;

    function typeLine() {
        if (currentLine < bootSequence.length) {
            let text = bootSequence[currentLine];
            let charIndex = 0;
            loaderText.innerHTML = "";
            
            let typingInterval = setInterval(() => {
                if (charIndex < text.length) {
                    loaderText.innerHTML += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                    currentLine++;
                    setTimeout(typeLine, 400); // Wait before typing next line
                }
            }, 30); // Typing speed
        } else {
            // Boot sequence complete
            setTimeout(() => {
                loader.style.opacity = "0";
                setTimeout(() => {
                    loader.style.display = "none";
                    nav.classList.remove('hidden-initially');
                    main.classList.remove('hidden-initially');
                    nav.classList.add('fade-in-content');
                    main.classList.add('fade-in-content');
                }, 500);
            }, 500);
        }
    }

    // Start loader
    setTimeout(typeLine, 500);


    // --- Canvas Coding Lines (Matrix Style) ---
    const canvas = document.getElementById('code-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:"<>?~`-=[]\\;\',./';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawCodeLines() {
        ctx.fillStyle = 'rgba(11, 25, 44, 0.05)'; // Creates the trail effect matching Midnight Blue
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#FF6500'; // Neon Orange Text
        ctx.font = fontSize + 'px "Fira Code", monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            
            // Randomly make some characters white for a tech feel
            if (Math.random() > 0.9) {
                ctx.fillStyle = '#ffffff';
            } else {
                ctx.fillStyle = '#FF6500';
            }

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawCodeLines, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });


    // --- Custom Cursor ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    if (window.matchMedia('(hover: hover)').matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        // Hover effects
        const interactables = document.querySelectorAll('a, .btn, .tech-tag, .service-card, .project-row');
        
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '50px';
                cursorOutline.style.height = '50px';
                cursorOutline.style.borderColor = 'rgba(255, 101, 0, 0.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 101, 0, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '30px';
                cursorOutline.style.height = '30px';
                cursorOutline.style.borderColor = '#FF6500';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }


    // --- Scroll Animations (Intersection Observer) ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-btn');
    const closeBtn = document.getElementById('close-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && closeBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        });
    }

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Circular Scroll Indicator ---
    const scrollCircle = document.getElementById('scroll-circle');
    const scrollPercentageText = document.getElementById('scroll-percentage');
    const circumference = 283; // 2 * PI * 45
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollFraction = scrollTop / scrollHeight;
        
        if (scrollCircle && scrollPercentageText) {
            const dashoffset = circumference - (scrollFraction * circumference);
            scrollCircle.style.strokeDashoffset = dashoffset;
            scrollPercentageText.innerText = Math.round(scrollFraction * 100) + '%';
        }
    });

    // Scroll to top on click
    const scrollIndicator = document.querySelector('.circular-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- GitHub Navigation Animation ---
    const projectRows = document.querySelectorAll('.project-row');
    const githubRedirectSequence = [
        "Initiating external link protocol...",
        "Establishing secure tunnel to github.com...",
        "Accessing harishankarjp07 repositories...",
        "Transferring payload...",
        "Redirecting..."
    ];

    projectRows.forEach(row => {
        row.addEventListener('click', () => {
            // Show loader
            loader.style.display = "flex";
            setTimeout(() => {
                loader.style.opacity = "1";
            }, 10);
            
            nav.classList.remove('fade-in-content');
            main.classList.remove('fade-in-content');
            
            let redirectLine = 0;
            loaderText.innerHTML = "";
            
            function typeRedirectLine() {
                if (redirectLine < githubRedirectSequence.length) {
                    let text = githubRedirectSequence[redirectLine];
                    let charIndex = 0;
                    loaderText.innerHTML = "";
                    
                    let typingInterval = setInterval(() => {
                        if (charIndex < text.length) {
                            loaderText.innerHTML += text.charAt(charIndex);
                            charIndex++;
                        } else {
                            clearInterval(typingInterval);
                            redirectLine++;
                            setTimeout(typeRedirectLine, 300); // Wait before typing next line
                        }
                    }, 25); // Typing speed
                } else {
                    // Redirect sequence complete
                    setTimeout(() => {
                        window.location.href = "https://github.com/harishankarjp07";
                    }, 400);
                }
            }
            
            // Start typing
            setTimeout(typeRedirectLine, 500);
        });
    });

});
