document.addEventListener('DOMContentLoaded', function() {
    const javaBtn = document.querySelector('button.Java-btn');
    const cppBtn = document.querySelector('button.C-btn');
    const pythonBtn = document.querySelector('button.Python-btn');
    const javaDiv = document.querySelector('div.Java');
    const cppDiv = document.querySelector('div.C');
    const pythonDiv = document.querySelector('div.Python');
    let theme = localStorage.getItem("theme") ?? 'blackAndWhite';

    javaBtn.addEventListener('click', function() {
        document.querySelectorAll('.language button').forEach((item) => {
            item.classList.remove('selected');
        });
        this.classList.add('selected');
        javaDiv.style.display = 'flex';
        cppDiv.style.display = 'none';
        pythonDiv.style.display = 'none';
    });

    cppBtn.addEventListener('click', function() {
        document.querySelectorAll('.language button').forEach((item) => {
            item.classList.remove('selected');
        });
        this.classList.add('selected');
        javaDiv.style.display = 'none';
        cppDiv.style.display = 'flex';
        pythonDiv.style.display = 'none';
    });

    pythonBtn.addEventListener('click', function() {
        document.querySelectorAll('.language button').forEach((item) => {
            item.classList.remove('selected');
        });
        this.classList.add('selected');
        javaDiv.style.display = 'none';
        cppDiv.style.display = 'none';
        pythonDiv.style.display = 'flex';
    });

    document.getElementById('change-theme').addEventListener('click', () => {
        if (theme === 'blackAndWhite') {
            document.classList.add('native-dark');
            theme = 'nativeDark';
        } else {
            document.classList.remove('native-dark');
            theme = 'blackAndWhite';
        }
    });
});