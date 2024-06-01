class TypingSpeedTest {
    constructor(codeSample) {
        this.codeSample = codeSample;
        this.timerInterval = null;
        this.startTime = null;
        this.errors = 0;
        this.currentIndex = 0;
        this.totalKeystrokes = 0;
        this.isStarted = false;

        this.codeText = document.getElementById('code-text');
        this.timerDisplay = document.getElementById('timer');
        this.errorCount = document.getElementById('error-count');
        this.restartBtn = document.getElementById('restart-btn');
        this.finalTimeDisplay = document.getElementById('final-time');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.results = document.getElementById('results');

        this.restartBtn.addEventListener('click', () => this.startGame());
        this.startGame();
    }

    displayCodeSample() {
        this.codeText.innerHTML = '';
        this.codeSample.split('').forEach(char => {
            const span = document.createElement('span');
            if (char === '\n') {
                span.textContent = '↵\n';
            } else {
                span.textContent = char;
            }
            this.codeText.appendChild(span);
        });
        this.codeText.focus();
    }

    startGame() {
        this.displayCodeSample();
        this.errors = 0;
        this.totalKeystrokes = 0;
        this.currentIndex = 0;
        this.isStarted = false;
        this.errorCount.textContent = this.errors;
        this.results.style.display = 'none';
        this.timerDisplay.textContent = '0';
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.updateCurrentChar();
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    startTimer() {
        this.startTime = new Date().getTime();
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        const currentTime = new Date().getTime();
        const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
        this.timerDisplay.textContent = elapsedTime.toString();
    }

    endGame() {
        clearInterval(this.timerInterval);
        const elapsedTime = Math.floor((new Date().getTime() - this.startTime) / 1000);
        this.finalTimeDisplay.textContent = elapsedTime.toString();
        const accuracy = ((this.totalKeystrokes - this.errors) / this.totalKeystrokes) * 100;
        this.accuracyDisplay.textContent = accuracy.toFixed(2);
        this.results.style.display = 'flex';
        document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }

    stopGame() {
        clearInterval(this.timerInterval);
        document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }

    updateCurrentChar() {
        const codeChars = this.codeText.querySelectorAll('span');
        codeChars.forEach((span, index) => {
            span.classList.toggle('current', index === this.currentIndex);
        });
    }

    handleKeydown(event) {
        const ignoredKeys = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace'];

        if (ignoredKeys.includes(event.key)) return;

        if (!this.isStarted) {
            this.startTimer();
            this.isStarted = true;
        }

        const codeChars = this.codeText.querySelectorAll('span');
        const expectedChar = this.codeSample[this.currentIndex];

        if (event.key === 'Tab') {
            event.preventDefault();
            return;
        }

        if (event.key === expectedChar || (event.key === 'Enter' && expectedChar === '\n')) {
            codeChars[this.currentIndex].classList.add('correct');
            codeChars[this.currentIndex].classList.remove('incorrect');
            this.currentIndex++;

            if (expectedChar === '\n') {
                while (this.codeSample[this.currentIndex] === ' ') {
                    codeChars[this.currentIndex].classList.add('correct');
                    codeChars[this.currentIndex].classList.remove('incorrect');
                    this.currentIndex++;
                }
            }
        } else {
            codeChars[this.currentIndex].classList.add('incorrect');
            codeChars[this.currentIndex].classList.remove('correct');
            this.errors++;
            this.errorCount.textContent = this.errors;
        }

        this.totalKeystrokes++;

        if (this.currentIndex === this.codeSample.length) {
            this.endGame();
        } else {
            this.updateCurrentChar();
        }
    }
}