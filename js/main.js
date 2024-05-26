document.addEventListener('DOMContentLoaded', function() {
    const javaBtn = document.querySelector('button.Java-btn');
    const cppBtn = document.querySelector('button.C-btn');
    const pythonBtn = document.querySelector('button.Python-btn');
    const javaDiv = document.querySelector('div.Java');
    const cppDiv = document.querySelector('div.C');
    const pythonDiv = document.querySelector('div.Python');

    javaBtn.addEventListener('click', function() {
        javaDiv.style.display = 'flex';
        cppDiv.style.display = 'none';
        pythonDiv.style.display = 'none';
    });

    cppBtn.addEventListener('click', function() {
        javaDiv.style.display = 'none';
        cppDiv.style.display = 'flex';
        pythonDiv.style.display = 'none';
    });

    pythonBtn.addEventListener('click', function() {
        javaDiv.style.display = 'none';
        cppDiv.style.display = 'none';
        pythonDiv.style.display = 'flex';
    });
});