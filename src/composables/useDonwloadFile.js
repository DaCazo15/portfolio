export default function useDownloadPDF() {
    const abrirPage = (url) => {
        window.open(url, '_blank'); // abre en nueva pestaña
    };

    const descargarFile = (url) => {
        const link = document.createElement('a');
        link.href = url;   
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);
    };

const initFileDownload = (url, urlDownload, tlf = false) => {
    abrirPage(url);
    if (tlf) return;
    setTimeout(() => {
        descargarFile(urlDownload);
    }, 1000);
}

    return {
        abrirPage,
        descargarFile,
        initFileDownload
    }
}