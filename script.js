document.addEventListener("DOMContentLoaded", () => {
  // --- Terminal Loader Sequence ---
  const loader = document.getElementById("loader");
  const loaderText = document.getElementById("loader-text");
  const nav = document.querySelector(".navbar");
  const main = document.querySelector("main");

  const bootSequence = [
    "Initializing HARI.dev protocol...",
    "Loading UI modules...",
    "Establishing secure connection...",
    "Bypassing mainframe...",
    "System ready.",
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
      sessionStorage.setItem("booted", "true");
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
          nav.classList.remove("hidden-initially");
          main.classList.remove("hidden-initially");
          nav.classList.add("fade-in-content");
          main.classList.add("fade-in-content");
        }, 500);
      }, 500);
    }
  }

  // Start loader if not already booted in this session
  if (!sessionStorage.getItem("booted")) {
    setTimeout(typeLine, 500);
  } else {
    loader.style.display = "none";
    loader.style.opacity = "0";
    nav.classList.remove("hidden-initially");
    main.classList.remove("hidden-initially");
    nav.classList.add("fade-in-content");
    main.classList.add("fade-in-content");
  }

  // Handle bfcache (when user clicks 'back' button in browser)
  window.addEventListener("pageshow", (event) => {
    // Reset loader UI state just in case we are coming back from a link
    if (sessionStorage.getItem("booted")) {
      loader.style.display = "none";
      loader.style.opacity = "0";
      nav.classList.remove("hidden-initially");
      main.classList.remove("hidden-initially");
      nav.classList.add("fade-in-content");
      main.classList.add("fade-in-content");
    }
  });

  // --- Canvas Coding Lines (Matrix Style) ---
  const canvas = document.getElementById("code-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:\"<>?~`-=[]\\;',./";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  function drawCodeLines() {
    ctx.fillStyle = "rgba(11, 25, 44, 0.05)"; // Creates the trail effect matching Midnight Blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FF6500"; // Neon Orange Text
    ctx.font = fontSize + 'px "Fira Code", monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(
        Math.floor(Math.random() * characters.length),
      );

      // Randomly make some characters white for a tech feel
      if (Math.random() > 0.9) {
        ctx.fillStyle = "#ffffff";
      } else {
        ctx.fillStyle = "#FF6500";
      }

      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawCodeLines, 50);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // --- Modern Futuristic Cursor ---
  const cursorContainer = document.getElementById("cursor-container");

  if (window.matchMedia("(hover: hover)").matches) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorContainer.style.left = `${posX}px`;
      cursorContainer.style.top = `${posY}px`;
    });

    // Hover effects on interactive elements
    const interactables = document.querySelectorAll(
      "a, .btn, .tech-tag, .service-card, .project-row, input, textarea",
    );

    interactables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorContainer.classList.add("active");
      });

      el.addEventListener("mouseleave", () => {
        cursorContainer.classList.remove("active");
      });
    });
  }

  // --- Scroll Animations (Intersection Observer) ---
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  reveals.forEach((el) => {
    revealOnScroll.observe(el);
  });

  // --- Mobile Menu Toggle ---
  const mobileBtn = document.getElementById("mobile-btn");
  const closeBtn = document.getElementById("close-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (mobileBtn && closeBtn && mobileNav) {
    mobileBtn.addEventListener("click", () => {
      mobileNav.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
      mobileNav.classList.remove("active");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    });
  }

  // --- Smooth Scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // --- Circular Scroll Indicator (Rotatable) ---
  const scrollCircle = document.getElementById("scroll-circle");
  const scrollPercentageText = document.getElementById("scroll-percentage");
  const scrollIndicator = document.querySelector(".circular-scroll-indicator");
  const circumference = 283; // 2 * PI * 45

  let isRotating = false;
  let lastAngle = 0;
  let isNearIndicator = false;

  // Update scroll display based on scroll position
  function updateScrollDisplay() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollFraction = scrollTop / scrollHeight;

    if (scrollCircle && scrollPercentageText) {
      const dashoffset = circumference - scrollFraction * circumference;
      scrollCircle.style.strokeDashoffset = dashoffset;
      scrollPercentageText.innerText = Math.round(scrollFraction * 100) + "%";

      // Only apply rotation if not rotating (show scroll percentage)
      if (!isRotating) {
        scrollIndicator.style.transform = `rotate(${scrollFraction * 360}deg)`;
      }
    }
  }

  // Get angle from mouse position relative to circle center
  function getAngleFromMouse(e) {
    const rect = scrollIndicator.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX || e.touches[0].clientX;
    const mouseY = e.clientY || e.touches[0].clientY;

    let angle =
      Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);
    angle = (angle + 90) % 360; // Adjust for rotation offset
    if (angle < 0) angle += 360;

    return angle;
  }

  // Check if mouse is near indicator
  function checkNearIndicator(e) {
    const rect = scrollIndicator.getBoundingClientRect();
    const distance = Math.sqrt(
      Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
        Math.pow(e.clientY - (rect.top + rect.height / 2), 2),
    );

    if (distance < 150 && !isNearIndicator) {
      isNearIndicator = true;
    } else if (distance >= 150 && isNearIndicator && !isRotating) {
      isNearIndicator = false;
      updateScrollDisplay(); // Reset to show scroll percentage
    }
  }

  // Start rotation
  function startRotation(e) {
    isRotating = true;
    scrollIndicator.classList.add("rotating");
    lastAngle = getAngleFromMouse(e);
  }

  // Rotate and scroll
  function rotateAndScroll(e) {
    if (!isRotating) return;

    const currentAngle = getAngleFromMouse(e);
    let angleDiff = currentAngle - lastAngle;

    // Handle angle wrap-around (360 to 0 transition)
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;

    lastAngle = currentAngle;

    // Convert angle to scroll position
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollSensitivity = 2; // Adjust sensitivity
    const scrollAmount = (angleDiff / 360) * scrollHeight * scrollSensitivity;

    window.scrollBy({
      top: scrollAmount,
      behavior: "smooth",
    });
  }

  // End rotation
  function endRotation() {
    isRotating = false;
    scrollIndicator.classList.remove("rotating");
    updateScrollDisplay(); // Reset to show scroll percentage
  }

  // Mouse events
  scrollIndicator.addEventListener("mousedown", startRotation);
  document.addEventListener("mousemove", (e) => {
    checkNearIndicator(e);
    rotateAndScroll(e);
  });
  document.addEventListener("mouseup", endRotation);
  document.addEventListener("mouseleave", endRotation);

  // Touch events
  scrollIndicator.addEventListener("touchstart", startRotation);
  document.addEventListener("touchmove", rotateAndScroll);
  document.addEventListener("touchend", endRotation);

  // Update on scroll
  window.addEventListener("scroll", updateScrollDisplay);

  // Initial update
  updateScrollDisplay();

  // --- GitHub Navigation Animation ---
  const projectRows = document.querySelectorAll(".project-row");
  const githubRedirectSequence = [
    "Initiating external link protocol...",
    "Establishing secure tunnel to github.com...",
    "Accessing harishankarjp07 repositories...",
    "Transferring payload...",
    "Redirecting...",
  ];

  projectRows.forEach((row) => {
    row.addEventListener("click", () => {
      // Set hash so when coming back, it scrolls to works section without reloading
      history.replaceState(null, null, "#works");

      // Show loader
      loader.style.display = "flex";
      setTimeout(() => {
        loader.style.opacity = "1";
      }, 10);

      nav.classList.remove("fade-in-content");
      main.classList.remove("fade-in-content");

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

  // --- Resume Modal ---
  const resumeModal = document.getElementById("resume-modal");
  const resumeIframe = document.getElementById("resume-iframe");
  const resumeCloseBtn = document.getElementById("resume-close-btn");
  const heroResumeBtn = document.getElementById("hero-resume-btn");
  const navResumeBtn = document.getElementById("nav-resume-btn");
  const mobileResumeBtn = document.querySelector(".mobile-resume-btn");

  function openResumeModal(e) {
    if (e) e.preventDefault();
    // Lazy-load PDF into iframe
    if (
      !resumeIframe.src ||
      resumeIframe.src === "" ||
      resumeIframe.src === window.location.href
    ) {
      resumeIframe.src = "Harishankar_resume.pdf";
    }
    resumeModal.classList.add("active");
    document.body.style.overflow = "hidden";
    // Close mobile nav if open
    if (mobileNav) mobileNav.classList.remove("active");
  }

  function closeResumeModal() {
    resumeModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (heroResumeBtn) heroResumeBtn.addEventListener("click", openResumeModal);
  if (navResumeBtn) navResumeBtn.addEventListener("click", openResumeModal);
  if (mobileResumeBtn)
    mobileResumeBtn.addEventListener("click", openResumeModal);
  if (resumeCloseBtn)
    resumeCloseBtn.addEventListener("click", closeResumeModal);

  // Close on overlay click (not the modal itself)
  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && resumeModal.classList.contains("active")) {
      closeResumeModal();
    }
  });

  // --- Email Navigation Animation (Mail Takeover) ---
  const mailLinks = document.querySelectorAll('a[href^="mailto:"]');
  const emailAddress = "harishankarjp22599@gmail.com";
  const mailRedirectSequence = [
    "Initiating mail client protocol...",
    "Resolving secure mail exchange...",
    "Preparing message payload...",
    "Establishing handshake with mail gateway...",
    "Launching mail client...",
  ];

  // Gmail compose URL — opens Gmail with To and Subject pre-filled
  const gmailComposeURL =
    "https://mail.google.com/mail/?view=cm&to=" +
    encodeURIComponent(emailAddress) +
    "&su=" +
    encodeURIComponent("Hi Harishankar");

  mailLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Set hash so back button returns to contact section
      history.replaceState(null, null, "#contact");

      // Show loader (full-page takeover)
      loader.style.display = "flex";
      setTimeout(() => {
        loader.style.opacity = "1";
      }, 10);

      nav.classList.remove("fade-in-content");
      main.classList.remove("fade-in-content");

      let redirectLine = 0;
      loaderText.innerHTML = "";

      function typeRedirectLine() {
        if (redirectLine < mailRedirectSequence.length) {
          let text = mailRedirectSequence[redirectLine];
          let charIndex = 0;
          loaderText.innerHTML = "";

          let typingInterval = setInterval(() => {
            if (charIndex < text.length) {
              loaderText.innerHTML += text.charAt(charIndex);
              charIndex++;
            } else {
              clearInterval(typingInterval);
              redirectLine++;
              setTimeout(typeRedirectLine, 300);
            }
          }, 25);
        } else {
          // Animation complete — navigate to Gmail compose
          setTimeout(() => {
            window.location.href = gmailComposeURL;
          }, 400);
        }
      }

      // Start typing
      setTimeout(typeRedirectLine, 500);
    });
  });

  function showToast(message) {
    // Remove existing toast if present
    const existingToast = document.querySelector(".toast-notification");
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3000);
  }
});
