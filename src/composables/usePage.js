import { reactive, onMounted, watch } from "vue";

export default function usePage() {
    const page = reactive({
        inicio: true,
        experiencia: false,
        contribuciones: false,
        proyectos: false,
        // Agrega más páginas si es necesario
    });

    watch(page, (newPage) => {
        const active = Object.keys(newPage).find(key => newPage[key])
        localStorage.setItem('page', active)
    }, { deep: true })

    onMounted(() => {
        const savedPage = localStorage.getItem('page')
        if (savedPage && savedPage in page) {
            setPage(savedPage)
        }
    })

    const setPage = (pageName) => {
        Object.keys(page).forEach(key => {page[key] = false;});
        page[pageName] = true;
    };

    return { page, setPage };
}