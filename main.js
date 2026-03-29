document.addEventListener('DOMContentLoaded', () => {
    const numberContainer = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');

    function getBallColor(number) {
        if (number <= 10) return 'color-1';
        if (number <= 20) return 'color-2';
        if (number <= 30) return 'color-3';
        if (number <= 40) return 'color-4';
        return 'color-5';
    }

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function displayNumbers(numbers) {
        numberContainer.innerHTML = '';
        numbers.forEach(number => {
            const ball = document.createElement('div');
            ball.className = `lotto-ball ${getBallColor(number)}`;
            ball.textContent = number;
            numberContainer.appendChild(ball);
        });
    }

    generateBtn.addEventListener('click', () => {
        const newNumbers = generateLottoNumbers();
        displayNumbers(newNumbers);
    });

    // Initial generation
    const initialNumbers = generateLottoNumbers();
    displayNumbers(initialNumbers);
});
