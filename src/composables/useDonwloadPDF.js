export default function useDownloadPDF() {
    const abrirPage = (url) => {
        window.open(url, '_blank'); // abre en nueva pestaña
    };

    const descargarFile = (url) => {
        const link = document.createElement('a');
        link.href = url;   
        link.download = 'Daniel-Cazorla-CV.pdf'; 
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);
    };

const initPdfDownload = (url, urlDownload) => {
    abrirPage(url);
    setTimeout(() => {
        descargarFile(urlDownload);
    }, 1000);
}

    return {
        abrirPage,
        descargarFile,
        initPdfDownload
    }
}