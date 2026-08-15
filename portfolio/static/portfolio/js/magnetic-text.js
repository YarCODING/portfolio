document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.magnetic-text');
    const MAX_DISTANCE = 250;
    let allChars = [];

    containers.forEach(container => {
        const text = container.textContent.trim();
        const mode = container.dataset.mode || 'expand';
        const minWeight = parseInt(container.dataset.min) || 100;
        const maxWeight = parseInt(container.dataset.max) || 900;
        
        const defaultWeight = mode === 'collapse' ? maxWeight : minWeight;

        container.innerHTML = '';
        
        const chars = Array.from(text).map(char => {
            const span = document.createElement('span');
            span.className = 'inline-block will-change-[font-variation-settings] transition-[font-variation-settings] duration-300 ease-out';
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            span.style.fontVariationSettings = `"wght" ${defaultWeight}`;
            
            container.appendChild(span);

            return {
                element: span,
                mode: mode,
                minWeight: minWeight,
                maxWeight: maxWeight,
                defaultWeight: defaultWeight
            };
        });

        allChars.push(...chars);
    });

    document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        allChars.forEach(item => {
            const rect = item.element.getBoundingClientRect();
            const charX = rect.left + rect.width / 2;
            const charY = rect.top + rect.height / 2;

            const distance = Math.hypot(mouseX - charX, mouseY - charY);

            if (distance < MAX_DISTANCE) {
                item.element.classList.remove('transition-[font-variation-settings]', 'duration-300', 'ease-out');

                const proximity = 1 - (distance / MAX_DISTANCE);
                let currentWeight;

                if (item.mode === 'collapse') {
                    currentWeight = item.maxWeight - (item.maxWeight - item.minWeight) * proximity;
                } else {
                    currentWeight = item.minWeight + (item.maxWeight - item.minWeight) * proximity;
                }

                item.element.style.fontVariationSettings = `"wght" ${Math.round(currentWeight)}`;
            } else {
                item.element.classList.add('transition-[font-variation-settings]', 'duration-300', 'ease-out');
                item.element.style.fontVariationSettings = `"wght" ${item.defaultWeight}`;
            }
        });
    });

    document.addEventListener('mouseleave', () => {
        allChars.forEach(item => {
            item.element.classList.add('transition-[font-variation-settings]', 'duration-300', 'ease-out');
            item.element.style.fontVariationSettings = `"wght" ${item.defaultWeight}`;
        });
    });
});