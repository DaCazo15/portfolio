import { reactive, onMounted, watch } from "vue";

export default function usePage() {
    const page = reactive({
        inicio: true,
        experiencia: false,
        contribuciones: false,
        proyectos: false,
        admin: false,
    });

    const setPage = (pageName) => {
        if (!(pageName in page)) return;
        Object.keys(page).forEach(key => { page[key] = false; });
        page[pageName] = true;

        if (pageName === 'admin') {
            if (window.location.pathname !== '/admin') {
                window.history.pushState({}, '', '/admin');
            }
        } else {
            if (window.location.pathname === '/admin') {
                window.history.pushState({}, '', '/');
            }
        }
    };

    watch(page, (newPage) => {
        const active = Object.keys(newPage).find(key => newPage[key] && key !== 'admin');
        if (active) {
            localStorage.setItem('page', active);
        }
    }, { deep: true });

    onMounted(() => {
        // Soporte para acceso directo por ruta /admin, /cmd o #admin
        const path = window.location.pathname.toLowerCase();
        const hash = window.location.hash.toLowerCase();

        if (path === '/admin' || path === '/cmd' || hash === '#admin') {
            setPage('admin');
            return;
        }

        const savedPage = localStorage.getItem('page');
        if (savedPage && savedPage in page && savedPage !== 'admin') {
            setPage(savedPage);
        }

        window.addEventListener('popstate', () => {
            const currentPath = window.location.pathname.toLowerCase();
            if (currentPath === '/admin' || currentPath === '/cmd') {
                setPage('admin');
            } else {
                const last = localStorage.getItem('page') || 'inicio';
                setPage(last);
            }
        });
    });

    return { page, setPage };
}