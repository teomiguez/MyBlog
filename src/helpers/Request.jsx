export const Request = async (method, url, dataSave = '', files = false) => {
    let data = [];
    let loading = true;

    let options = {};
    if (method == "GET" || method == "DELETE") {
        options = {
            method: method
        };
    } else if (method == "POST" || method == "PUT") {
        if (files) {
            options = {
                method: method,
                body: dataSave,
            };
        } else {
            /* - EL ERROR ESTA POR ACA, EN LA CABECERA DE LA CONSULTA NO SE PASA COMO JSON - */
            options = {
                method: method,
                body: JSON.stringify(dataSave),
                headers: {
                    "Content-Type": "application/json"
                }
            };
        }
    }
    
    const req = await fetch(url, options);
    data = await req.json();
    loading = false;

    return {
        data,
        loading
    };
}