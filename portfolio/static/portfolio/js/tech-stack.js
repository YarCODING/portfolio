document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("stack-container");
    const cards = document.querySelectorAll(".tech-card");

    if (!container || !cards.length) return;

    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight;

    const REPULSION_RADIUS = 180;
    const REPULSION_FORCE = 1.2;
    const MAX_SPEED = 3.5;
    const FRICTION = 0.98;

    let mouse = { x: -1000, y: -1000 };

    const cardObjects = Array.from(cards).map(card => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;

        let x = Math.random() * (containerWidth - cardWidth - 20) + 10;
        let y = Math.random() * (containerHeight - cardHeight - 20) + 10;

        if (x < 10) x = 10;
        if (y < 10) y = 10;

        return {
            element: card,
            width: cardWidth,
            height: cardHeight,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5
        };
    });

    container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    container.addEventListener("mouseleave", () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    window.addEventListener("resize", () => {
        containerWidth = container.clientWidth;
        containerHeight = container.clientHeight;
    });

    function updatePhysics() {
        cardObjects.forEach(card => {
            const cardCenterX = card.x + card.width / 2;
            const cardCenterY = card.y + card.height / 2;

            const dx = cardCenterX - mouse.x;
            const dy = cardCenterY - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < REPULSION_RADIUS && dist > 0) {
                const force = (1 - dist / REPULSION_RADIUS) * REPULSION_FORCE;
                card.vx += (dx / dist) * force;
                card.vy += (dy / dist) * force;
            }

            const speed = Math.hypot(card.vx, card.vy);
            if (speed > MAX_SPEED) {
                card.vx = (card.vx / speed) * MAX_SPEED;
                card.vy = (card.vy / speed) * MAX_SPEED;
            }

            if (speed < 0.4) {
                card.vx += (Math.random() - 0.5) * 0.1;
                card.vy += (Math.random() - 0.5) * 0.1;
            }

            card.vx *= FRICTION;
            card.vy *= FRICTION;

            card.x += card.vx;
            card.y += card.vy;

            if (card.x <= 10) {
                card.x = 10;
                card.vx *= -1;
            } else if (card.x + card.width >= containerWidth - 10) {
                card.x = containerWidth - card.width - 10;
                card.vx *= -1;
            }

            if (card.y <= 10) {
                card.y = 10;
                card.vy *= -1;
            } else if (card.y + card.height >= containerHeight - 10) {
                card.y = containerHeight - card.height - 10;
                card.vy *= -1;
            }

            if (typeof gsap !== "undefined") {
                gsap.set(card.element, { x: card.x, y: card.y });
            } else {
                card.element.style.transform = `translate(${card.x}px, ${card.y}px)`;
            }
        });

        requestAnimationFrame(updatePhysics);
    }

    updatePhysics();
});