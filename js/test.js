document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const saveButton = document.getElementById('save-username');

    const savedUsername = localStorage.getItem('username');
    if (savedUsername)
        usernameInput.value = savedUsername;

    saveButton.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        localStorage.setItem('username', username ?? 'User');
        saveButton.textContent = 'Save username (Saved)';
        setTimeout(() => {
            saveButton.textContent = 'Save username';
        }, 1000)
    });

    const selectionContainer = document.querySelector('.test-selection');
    const testContainer = document.querySelector('.practice-test');
    const languageContainer = document.createElement('div');
    languageContainer.classList.add('language');
    selectionContainer.appendChild(languageContainer);

    fetch('data/practice.json')
        .then(response => response.json())
        .then(data => {
            const languages = Object.keys(data.code);
            setupTestLanguageSelection(languages, data);
        })
        .catch(error => console.error('Error fetching data:', error));

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
        const Penalty = document.createElement('p');
        Penalty.innerHTML = 'Penalty: <span id="Penalty"></span>';
        const finalTimeText = document.createElement('p');
        finalTimeText.innerHTML = 'Final Time: <span id="final-time"></span> seconds';
        const accuracyText = document.createElement('p');
        accuracyText.innerHTML = 'Accuracy: <span id="accuracy"></span>%';
        resultsContainer.appendChild(Penalty);
        resultsContainer.appendChild(finalTimeText);
        resultsContainer.appendChild(accuracyText);

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const menuBtn = document.createElement('button');
        menuBtn.id = 'close-btn';
        menuBtn.textContent = 'Close';
        buttons.appendChild(menuBtn);

        testContainer.innerHTML = '';
        testContainer.appendChild(header);
        testContainer.appendChild(codeContainer);
        testContainer.appendChild(statsContainer);
        testContainer.appendChild(resultsContainer);
        testContainer.appendChild(buttons);
        showElement(testContainer);
        hideElement(selectionContainer);
        hideElement(usernameInput);
        hideElement(saveButton);

        let test = new TypingSpeedTest(program, language);

        menuBtn.addEventListener('click', function () {
            test.stopGame();
            hideElement(testContainer);
            testContainer.innerHTML = '';
            showElement(selectionContainer);
            usernameInput.style.display = 'inline-block';
            saveButton.style.display = 'inline-block';
        });
    }

    function setupTestLanguageSelection(languages, data) {
        const testSelectionContainer = document.querySelector('.test-selection');
        const languageContainer = document.createElement('div');
        languageContainer.classList.add('language');
        testSelectionContainer.appendChild(languageContainer);

        languages.forEach(language => {
            const button = document.createElement('button');
            button.textContent = language;
            button.classList.add(`${language.toLowerCase()}-btn`);
            languageContainer.appendChild(button);

            button.addEventListener('click', function () {
                const practices = data.code[language];
                const randomPractice = practices[Math.floor(Math.random() * practices.length)];
                createTestBlock(language, randomPractice.name, randomPractice.program);
            });
        });
    }

    function showElement(el) {
        el.style.display = 'block';
    }

    function hideElement(el) {
        el.style.display = 'none';
    }
});