function svgAnimation() {
    let path = `M 10 80 Q 100 80 1500 80`;
    let initialPath = `M 10 80 Q 100 80 1500 80`;

    let svgpath = document.querySelector("#svgdiv svg path");
    let svgdiv = document.querySelector("#svgdiv");

    svgdiv.addEventListener("mousemove", function (val) {

        const rect = svgdiv.getBoundingClientRect();
        const relativeY = val.clientY - rect.top;

        path = `M 10 80 Q 750 ${relativeY} 1500 80`;

        gsap.to(svgpath, {
            attr: { d: path },
            duration: 0.5,
            ease: "power2.out",
        })
    });

    svgdiv.addEventListener("mouseleave", function () {
        gsap.to(svgpath, {
            attr: { d: initialPath },
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        })
    });
}

svgAnimation();

window.addEventListener("mousemove", function (val) {
    gsap.to("#cursor", {
        x: val.clientX,
        y: val.clientY,
        duration: 0.3,
        ease: "power4.Out",
    })
})


gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".scrollrevel").forEach((section) => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            stagger: 0.5,
        }
    });
});

gsap.from("#page9 div", {
    opacity: 0,
    scale: 0.95,
    y: 30,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#page9",
        start: "top 95%",
        end: "bottom bottom",
    }
});
