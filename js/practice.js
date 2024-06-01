document.addEventListener('DOMContentLoaded', function() {
    const selectionContainer = document.querySelector('.practice-selection');
    const testContainer = document.querySelector('.practice-test');
    const languageContainer = document.createElement('div');
    languageContainer.classList.add('language');
    selectionContainer.appendChild(languageContainer);

    fetch('data/practice.json')
        .then(response => response.json())
        .then(data => {
            const languages = Object.keys(data.code);

            languages.forEach(language => {
                const button = document.createElement('button');
                button.textContent = language;
                button.classList.add(`${language.toLowerCase()}-btn`);
                languageContainer.appendChild(button);

                const practiceContainer = document.createElement('div');
                practiceContainer.id = language.toLowerCase();
                practiceContainer.classList.add('practice-block');
                practiceContainer.style.display = 'none';
                selectionContainer.appendChild(practiceContainer);
                showPracticeButtons(language, data);

                button.addEventListener('click', function () {
                    document.querySelectorAll('.language button').forEach(el => {
                        el.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    document.querySelectorAll('.practice-block').forEach(el => {
                        el.style.display = 'none';
                    });
                    practiceContainer.style.display = 'flex';
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    function showPracticeButtons(language, data) {
        const practiceData = data.code[language];
        const practiceContainer = document.getElementById(language.toLowerCase());
        practiceContainer.innerHTML = '';
        practiceData.forEach(practice => {
            const button = document.createElement('button');
            button.textContent = practice.name;
            button.addEventListener('click', function () {
                document.querySelectorAll('.practice-block button').forEach(el => {
                    el.classList.remove('selected');
                });
                this.classList.add('selected');
                const program = practice.program;
                createTestBlock(language, practice.name, program);
            });
            practiceContainer.appendChild(button);
        });
    }

    function createTestBlock(language, practiceName, program) {
        const header = document.createElement('h2');
        header.textContent = practiceName;

        const codeContainer = document.createElement('div');
        codeContainer.id = 'code-container';
        const codeText = document.createElement('pre');
        codeText.id = 'code-text';
        codeText.textContent = program;
        codeContainer.appendChild(codeText);

        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats';
        const timerText = document.createElement('p');
        timerText.innerHTML = 'Time: <span id="timer">0</span> seconds';
        const errorCountText = document.createElement('p');
        errorCountText.innerHTML = 'Errors: <span id="error-count">0</span>';
        statsContainer.appendChild(timerText);
        statsContainer.appendChild(errorCountText);

        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'results';
        resultsContainer.style.display = 'none';
        const finalTimeText = document.createElement('p');
        finalTimeText.innerHTML = 'Final Time: <span id="final-time"></span> seconds';
        const accuracyText = document.createElement('p');
        accuracyText.innerHTML = 'Accuracy: <span id="accuracy"></span>%';
        resultsContainer.appendChild(finalTimeText);
        resultsContainer.appendChild(accuracyText);

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const menuBtn = document.createElement('button');
        menuBtn.id = 'close-btn';
        menuBtn.textContent = 'Close';
        buttons.appendChild(menuBtn);

        const restartBtn = document.createElement('button');
        restartBtn.id = 'restart-btn';
        restartBtn.textContent = 'Restart';
        buttons.appendChild(restartBtn);

        testContainer.innerHTML = '';
        testContainer.appendChild(header);
        testContainer.appendChild(codeContainer);
        testContainer.appendChild(statsContainer);
        testContainer.appendChild(resultsContainer);
        testContainer.appendChild(buttons);
        showElement(testContainer);
        hideElement(selectionContainer);

        const test = new TypingSpeedTest(program);

        menuBtn.addEventListener('click', function () {
            test.stopGame();
            hideElement(testContainer);
            testContainer.innerHTML = '';
            showElement(selectionContainer);
            document.querySelectorAll('.practice-block button').forEach(el => {
                el.classList.remove('selected');
            });
        })
    }

    function showElement(el) {
        el.style.display = 'block';
    }

    function hideElement(el) {
        el.style.display = 'none';
    }
});
