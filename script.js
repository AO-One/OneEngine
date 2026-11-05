
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const promptInput = document.getElementById('prompt-input');
    const outputPreview = document.getElementById('output-preview');

    generateBtn.addEventListener('click', () => {
        const promptText = promptInput.value.trim();
        if (!promptText) return;

        outputPreview.innerHTML = `<code>// Initializing local generation pipeline for: "${promptText}"...\n// Compiling via OneEngine core backend...</code>`;

        // Simulate local AI micro-app generation response
        setTimeout(() => {
            outputPreview.innerHTML = `<code>// Successfully generated micro-app output:\n\nfunction renderApp() {\n    return "Loaded micro-app for: ${promptText}";\n}</code>`;
        }, 1000);
    });
});
