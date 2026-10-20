document.addEventListener("DOMContentLoaded", () => {
  initScrollNavigation();
  initMobileMenu();
  initScrollReveal();
  initFunFactsGame();
  initContactForm();
});

/* SCROLL NAVIGATION */
function initScrollNavigation() {
  const navButtons = document.querySelectorAll(".nav-tab");
  const logo = document.querySelector(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMobileMenu();
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => scrollToSection(btn.dataset.scroll));
  });

  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToSection("profile");
    });
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navButtons.forEach((btn) => {
            btn.classList.toggle("is-active", btn.dataset.scroll === id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

/* MOBILE MENU (hamburger toggle) */
function initMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const navMobile = document.getElementById("nav-mobile");
  if (!menuBtn || !navMobile) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = navMobile.classList.contains("is-open");
    isOpen ? closeMobileMenu() : openMobileMenu();
  });
}

function openMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const navMobile = document.getElementById("nav-mobile");
  if (!navMobile) return;

  navMobile.style.maxHeight = navMobile.scrollHeight + "px";
  navMobile.classList.add("is-open");
  menuBtn.setAttribute("aria-expanded", "true");

  const bars = menuBtn.querySelectorAll(".menu-bar");
  bars[0].style.transform = "translateY(7px) rotate(45deg)";
  bars[1].style.opacity = "0";
  bars[2].style.transform = "translateY(-7px) rotate(-45deg)";
}

function closeMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const navMobile = document.getElementById("nav-mobile");
  if (!navMobile) return;

  navMobile.style.maxHeight = "0px";
  navMobile.classList.remove("is-open");
  if (menuBtn) {
    menuBtn.setAttribute("aria-expanded", "false");
    const bars = menuBtn.querySelectorAll(".menu-bar");
    bars[0].style.transform = "none";
    bars[1].style.opacity = "1";
    bars[2].style.transform = "none";
  }
}

/* SCROLL REVEAL */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* FUN FACTS — "2 Lies, 1 Truth" game */
function initFunFactsGame() {
  const roundBlocks = document.querySelectorAll(".round-block");
  const feedbackEl = document.getElementById("fact-feedback");
  const roundIndicator = document.getElementById("round-indicator");
  const totalRounds = roundBlocks.length;

  let currentRound = 1;

  function showFeedback(text, colorClass) {
    feedbackEl.textContent = text;
    feedbackEl.className = "font-mono text-sm sm:text-base " + colorClass;
    feedbackEl.classList.remove("animate-fadeUp");
    void feedbackEl.offsetWidth; // restart animation
    feedbackEl.classList.add("animate-fadeUp");
  }

  function goToNextRound() {
    const currentBlock = document.querySelector(
      `.round-block[data-round="${currentRound}"]`,
    );
    if (currentRound < totalRounds) {
      currentBlock.classList.add("hidden");
      currentRound += 1;
      const nextBlock = document.querySelector(
        `.round-block[data-round="${currentRound}"]`,
      );
      nextBlock.classList.remove("hidden");
      roundIndicator.textContent = `ROUND ${currentRound} / ${totalRounds}`;
      feedbackEl.textContent = "";
    } else {
      showFeedback("You've finished both rounds! 🎬🏁", "text-sky-600");
    }
  }

  roundBlocks.forEach((block) => {
    const buttons = block.querySelectorAll(".fact-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // lock all buttons in this round after an answer is picked
        const isTruth = btn.dataset.truth === "true";

        if (isTruth) {
          btn.classList.add("is-correct");
          showFeedback("Well Done!", "text-sky-600");
          buttons.forEach((b) => (b.disabled = true));

          setTimeout(goToNextRound, 1200);
        } else {
          btn.classList.add("is-wrong");
          showFeedback("Try Again!", "text-red-500");

          setTimeout(() => {
            btn.classList.remove("is-wrong");
          }, 700);
        }
      });
    });
  });
}

/* CONTACT FORM */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const successState = document.getElementById("contact-success");
  const resetBtn = document.getElementById("contact-reset");
  if (!form || !successState) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    form.classList.add("hidden");
    successState.classList.remove("hidden");
    successState.classList.add("flex");
    successState.classList.add("animate-fadeUp");

    form.reset();
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      successState.classList.add("hidden");
      successState.classList.remove("flex");
      form.classList.remove("hidden");
    });
  }
}
