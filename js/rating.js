document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('table tbody');

    let allResults = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.endsWith('-test')) {
            const language = key.split('-')[0];
            try {
                const results = JSON.parse(localStorage.getItem(key));
                results.forEach(result => {
                    allResults.push({
                        username: result.username,
                        Penalty: result.Penalty,
                        time: result.time,
                        accuracy: result.accuracy,
                        language: language
                    });
                });
            } catch (e) {
                console.error(`Error parsing data for key ${key}:`, e);
            }
        }
    }

    allResults.sort((a, b) => a.Penalty - b.Penalty);

    allResults.forEach((result, index) => {
        const row = document.createElement('tr');
        const placeCell = document.createElement('td');
        placeCell.textContent = index + 1;
        const nameCell = document.createElement('td');
        nameCell.textContent = result.username;
        const languageCell = document.createElement('td');
        languageCell.textContent = result.language;
        const PenaltyCell = document.createElement('td');
        PenaltyCell.textContent = result.Penalty;
        const timeCell = document.createElement('td');
        timeCell.textContent = result.time;
        const accuracyCell = document.createElement('td');
        accuracyCell.textContent = result.accuracy.toFixed(2) + '%';

        row.appendChild(placeCell);
        row.appendChild(nameCell);
        row.appendChild(languageCell);
        row.appendChild(PenaltyCell);
        row.appendChild(timeCell);
        row.appendChild(accuracyCell);
        tableBody.appendChild(row);
    });
});