document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers);
    }

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
