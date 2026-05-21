window.addEventListener('load', function() {
    console.log('Страница загрузилась');
})

const root = document.querySelector('#root');

const routes = {
    '/': 
    `
    <h2>Home</h2>
    <p>Welcome to the Home page!</p>`,

    '/about': 
    `
    <h2>About</h2>
    <p>This is About page!</p>`,

    '/contact': 
    `
    <h2>Contact</h2>
    <p>This is contact page!</p>`,
}

const render = () => {
    const rout = location.pathname;
    console.log(rout);
    
    const page = routes[rout];

    if (page) {
        root.innerHTML = page;
    } else {
        root.innerHTML = `
        <h2>404 Not Found</h2>

        `
    }
}

window.history.go(-2);

window.history.forward();


window.addEventListener( 'load', () => {
    render();
}) 

window.addEventListener( 'popstate', () => {
    render();
}) 

document.body.addEventListener('click', (event) => {

    if (!event.target.matches('a')) return;
    
    event.preventDefault();
})