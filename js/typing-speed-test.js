class TypingSpeedTest {
    constructor(codeSample, language, practiceId = 0) {
        this.codeSample = codeSample;
        this.timerInterval = null;
        this.startTime = null;
        this.errors = 0;
        this.currentIndex = 0;
        this.totalKeystrokes = 0;
        this.isStarted = false;
        this.language = language;
        this.practiceId = practiceId;

        this.codeText = document.getElementById('code-text');
        this.timerDisplay = document.getElementById('timer');
        this.errorCount = document.getElementById('error-count');
        this.PenaltyDisplay = document.getElementById('Penalty');
        this.finalTimeDisplay = document.getElementById('final-time');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.results = document.getElementById('results');

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
        const Penalty = (((100 - accuracy) / 100) * this.codeSample.length * elapsedTime + elapsedTime).toFixed(0);
        this.PenaltyDisplay.textContent = Penalty;
        this.results.style.display = 'flex';
        document.removeEventListener('keydown', this.handleKeydown.bind(this));
        this.currentIndex = 0;

        console.log('!')

        if (this.practiceId !== 0) {
            localStorage.setItem(`${this.language}-practice-${this.practiceId}`, String(accuracy));
        } else {
            const username = localStorage.getItem('username') ?? 'User';
            const testKey = `${this.language}-test`;

            let results;

            try {
                results = JSON.parse(localStorage.getItem(testKey)) || [];
            } catch (e) {
                results = [];
            }

            if (!Array.isArray(results)) {
                results = [];
            }

            const userResultIndex = results.findIndex(result => result.username === username);
            if (userResultIndex !== -1) {
                if (results[userResultIndex].Penalty > Penalty) {
                    results[userResultIndex].Penalty = Penalty;
                    results[userResultIndex].time = elapsedTime;
                    results[userResultIndex].accuracy = accuracy;
                }
            } else {
                results.push({
                    username: username,
                    Penalty: Penalty,
                    time: elapsedTime,
                    accuracy: accuracy
                });
            }

            results.sort((a, b) => b.Penalty - a.Penalty);
            localStorage.setItem(testKey, JSON.stringify(results));

        }
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
            if (codeChars[this.currentIndex]) {
                codeChars[this.currentIndex].classList.add('incorrect');
                codeChars[this.currentIndex].classList.remove('correct');
                this.errors++;
                this.errorCount.textContent = this.errors;
            }
        }

        this.totalKeystrokes++;

        if (this.currentIndex === this.codeSample.length) {
            console.log('end')
            this.endGame();
        } else {
            this.updateCurrentChar();
        }
    }
}