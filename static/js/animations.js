document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".marquee-inner", {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });

    gsap.from(".about-photo-wrapper", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".about-photo-wrapper",
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.from(".about-text-block, .about-stats", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".about-text-block",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.from(".principle-item", {
        x: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".about-principles",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    const marquee = document.getElementById("projects-marquee");
    if (marquee) {
        gsap.to(marquee, {
            xPercent: -50,
            ease: "none",
            duration: 15,
            repeat: -1
        });
    }

    const track = document.getElementById("projects-track");
    const wrapper = document.getElementById("projects");

    if (track && wrapper) {
        function getScrollAmount() {
            let trackWidth = track.scrollWidth;
            return -(trackWidth - window.innerWidth + 100);
        }

        const tween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none"
        });

        ScrollTrigger.create({
            trigger: wrapper,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true
        });
    }

    const contactMarquee = document.getElementById("contact-marquee");
    if (contactMarquee) {
        gsap.to(contactMarquee, {
            xPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: "#contact",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5
            }
        });
    }
});