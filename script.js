// ===================================================================
// DEVANGA HAMSA S | PORTFOLIO SCRIPT
// Clean, Lightweight, Human-Crafted Client Script
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initScrollProgress();
    initContactForm();
    initYear();
});

// ===================================================================
// 1. MOBILE NAVIGATION & ACTIVE LINK TRACKING
// ===================================================================
function initNavigation() {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-item");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Close menu when a link is clicked
        navItems.forEach((item) => {
            item.addEventListener("click", () => {
                menuBtn.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains("active")) {
                menuBtn.classList.remove("active");
                navLinks.classList.remove("active");
            }
        });
    }

    // Active Section Tracking on Scroll
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        const scrollPosition = window.pageYOffset + 140;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });
}

// ===================================================================
// 2. SCROLL PROGRESS BAR
// ===================================================================
function initScrollProgress() {
    const progressBar = document.getElementById("scrollProgress");
    if (!progressBar) return;

    window.addEventListener("scroll", () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.pageYOffset / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
    });
}

// ===================================================================
// 3. COPY TO CLIPBOARD & TOAST NOTIFICATION
// ===================================================================
window.copyText = function (text, successMessage) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(successMessage || "Copied to clipboard!");
        }).catch(() => {
            fallbackCopy(text, successMessage);
        });
    } else {
        fallbackCopy(text, successMessage);
    }
};

function fallbackCopy(text, successMessage) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand("copy");
        showToast(successMessage || "Copied to clipboard!");
    } catch (e) {
        showToast("Unable to copy.");
    }
    document.body.removeChild(tempInput);
}

function showToast(message) {
    const toast = document.getElementById("toastNotification");
    const toastMsg = document.getElementById("toastMessage");
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}

// ===================================================================
// 4. CONTACT FORM
// ===================================================================
function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            showToast("Please fill in all required fields.");
            return;
        }

        const mailtoUrl = `mailto:hamsadevanga849@gmail.com?subject=${encodeURIComponent(
            `[Portfolio] ${subject}`
        )}&body=${encodeURIComponent(
            `Hi Devanga Hamsa,\n\n${message}\n\nFrom: ${name} (${email})`
        )}`;

        showToast("Opening email application...");
        setTimeout(() => {
            window.location.href = mailtoUrl;
        }, 500);

        contactForm.reset();
    });
}

// ===================================================================
// 5. CURRENT YEAR
// ===================================================================
function initYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
