export const abrirPage = (url) => {
    window.open(url, '_blank'); // abre en nueva pestaña
};

export const descargarFile = (url) => {
    const link = document.createElement('a');
    link.href = url;   
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
};

export const initFileDownload = (url, urlDownload, tlf = false) => {
    abrirPage(url);
    if (tlf) return;
    setTimeout(() => {
        descargarFile(urlDownload);
    }, 1000);
}