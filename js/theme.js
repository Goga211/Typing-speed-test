document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('theme') == null || (localStorage.getItem('theme') !== 'blackAndWhite' && localStorage.getItem('theme') !== 'nativeDark'))
        localStorage.setItem('theme', 'blackAndWhite')

    let theme = localStorage.getItem("theme");

    if (theme !== 'blackAndWhite')
        document.querySelector("html").classList.add('native-dark');

    document.getElementById('change-theme').addEventListener('click', () => {
        if (theme === 'blackAndWhite') {
            document.querySelector("html").classList.add('native-dark');
            theme = 'nativeDark';
            localStorage.setItem("theme", 'nativeDark');
        } else {
            document.querySelector("html").classList.remove('native-dark');
            theme = 'blackAndWhite';
            localStorage.setItem("theme", 'blackAndWhite');
        }
    });
});