document.addEventListener("DOMContentLoaded", () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  document.querySelectorAll('.scramble-text').forEach(element => {
    let interval = null;

    if (!element.dataset.value) {
      element.dataset.value = element.textContent.trim();
    }

    const trigger = element.closest('[data-scramble-group]') || element;

    trigger.addEventListener('mouseenter', () => {
      let iteration = 0;
      const originalText = element.dataset.value;

      clearInterval(interval);

      interval = setInterval(() => {
        element.textContent = originalText
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration) return originalText[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }

        iteration += 1;
      }, 30);
    });
  });
});