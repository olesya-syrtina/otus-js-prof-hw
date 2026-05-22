const root = document.querySelector('#root');

const state = {
   username: localStorage.getItem('username') || 'Гость'
};

const routes = [
    {
        path: '/',
        render: () => {
            root.innerHTML =  `<h2>Домашняя страница</h2>
            <p>Welcome, ${state.username}!</p>`;
        }
    },
    {
        path: '/about',
        render: () => {
            root.innerHTML = `
        <h2>О нас</h2>
        <p>This is About page!</p>`;
        }
    },
    {
        path: '/settings',
        render: () => {
            root.innerHTML =  `
        <h2>Настройки</h2>
        <form id="form">
                <input
                    type="text"
                    id="username"
                    placeholder="Ведите свое имя"
                    value="${state.username}"
                />

                <button type="submit">Сохранить</button>
            </form>    `;

            const form = document.querySelector('#form');

            form.onsubmit = (event) => {
                event.preventDefault();

                const input = document.querySelector('#username');

                state.username = input.value;
                localStorage.setItem('username', input.value);

                input.value = '';
            };
        }
    }
]

const render = () => {
    
    const route = routes.find((route) => {
     return route.path === location.pathname;
    });


    if (route) {
        route.render();

    } else {
        root.innerHTML = `
        <h2>404 Not Found</h2>
        `
    }
}

window.addEventListener( 'load', () => {
    render();
}) 

window.addEventListener( 'popstate', () => {
    render();
}) 

document.body.addEventListener('click', (event) => {

    if (!event.target.matches('a')) return;
    
    event.preventDefault();

    const url= event.target.getAttribute('href');

    history.pushState(null, '', url);

    render();
})