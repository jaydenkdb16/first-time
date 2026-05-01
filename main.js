document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    function getInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }
        return prefersDarkMode.matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        themeToggle.setAttribute(
            'aria-label',
            isDark ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers);
    }

    applyTheme(getInitialTheme());

    themeToggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
    });

    generateBtn.addEventListener('click', () => {
        lottoNumbersDiv.innerHTML = '';
        const generatedNumbers = generateLottoNumbers();
        generatedNumbers.forEach(number => {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('lotto-number');
            numberDiv.textContent = number;
            lottoNumbersDiv.appendChild(numberDiv);
        });
    });
});
