gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// ---------- Header scroll state ----------
const header = document.getElementById("siteHeader");
if (header) {
    ScrollTrigger.create({
        start: "top -30px",
        onUpdate: (self) => {
            header.classList.toggle("scrolled", self.scroll() > 30);
        },
    });
}

// ---------- Breathing Orb ----------
const orb = document.getElementById("orb");
const orbLabel = document.getElementById("orbLabel");
if (!reduceMotion && orb && orbLabel) {
    const breath = gsap.timeline({ repeat: -1 });
    breath
        .to(orb, {
            scale: 1.18,
            duration: 4,
            ease: "sine.inOut",
            force3D: true,
            onStart: () => (orbLabel.textContent = "Inhale"),
        })
        .to(orb, {
            duration: 1.6,
            onStart: () => (orbLabel.textContent = "Hold"),
        })
        .to(orb, {
            scale: 1,
            duration: 4,
            ease: "sine.inOut",
            force3D: true,
            onStart: () => (orbLabel.textContent = "Exhale"),
        })
        .to(orb, {
            duration: 1.6,
            onStart: () => (orbLabel.textContent = "Hold"),
        });
} else if (orbLabel) {
    orbLabel.textContent = "Breathe";
}

// ---------- Phone Float & 3D Tilt ----------
const phoneFloat = document.getElementById("phoneFloat");
const phone = document.getElementById("phone");
const stageOuter = document.getElementById("stageOuter");

if (!reduceMotion && phoneFloat && phone && stageOuter) {
    gsap.to(phoneFloat, {
        y: -16,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        force3D: true,
    });

    const rotX = gsap.quickTo(phone, "rotationX", {
        duration: 0.5,
        ease: "power2.out",
    });
    const rotY = gsap.quickTo(phone, "rotationY", {
        duration: 0.5,
        ease: "power2.out",
    });

    stageOuter.addEventListener("mousemove", (e) => {
        const r = stageOuter.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rotY(px * 22);
        rotX(py * -18);
    });
    stageOuter.addEventListener("mouseleave", () => {
        rotX(0);
        rotY(0);
    });
}

// ---------- ULTRASMOOTH 3D REVEALS (Fix for Stuck/Instant Jump) ----------
gsap.utils.toArray(".reveal-3d").forEach((el) => {
    const inlineDelay = parseFloat(el.style.transitionDelay) || 0;

    // Kill CSS transition on the element dynamically to stop fighting GSAP
    el.style.transition = "none";

    gsap.fromTo(
        el,
        {
            opacity: 0,
            y: 30,
            rotationX: reduceMotion ? 0 : 8,
            transformOrigin: "50% 50%",
            willChange: "transform, opacity",
        },
        {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.1,
            delay: inlineDelay,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
            },
            onComplete: () => {
                // Clear conflicting properties so hovers/tilts work buttery smooth
                gsap.set(el, {
                    clearProps: "transformPerspective,willChange,rotationX",
                });
            },
        }
    );
});

// ---------- Ring Progress Fills ----------
function fillRing(id, offsetPercent, circumference) {
    const ring = document.getElementById(id);
    if (!ring) return;

    ScrollTrigger.create({
        trigger: ring,
        start: "top 85%",
        once: true,
        onEnter: () =>
            gsap.to(ring, {
                strokeDashoffset: circumference * (1 - offsetPercent),
                duration: 1.4,
                ease: "power2.out",
            }),
    });
}
fillRing("dialProgress1", 0.42, 352);
fillRing("ringSteps", 0.82, 402);
fillRing("ringHeart", 0.76, 302);
fillRing("ringMed", 0.9, 402);

// ---------- Testimonial Card Hover Tilt ----------
if (!reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
        const rx = gsap.quickTo(card, "rotationX", {
            duration: 0.4,
            ease: "power2.out",
        });
        const ry = gsap.quickTo(card, "rotationY", {
            duration: 0.4,
            ease: "power2.out",
        });
        card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            rx(py * -10);
            ry(px * 10);
        });
        card.addEventListener("mouseleave", () => {
            rx(0);
            ry(0);
        });
    });
}