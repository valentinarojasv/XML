function cargarXML() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "biblioteca.xml", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parsear el XML
            const xmlDoc = xhr.responseXML;
 
            // Verificar si hubo errores en el parseo
            const parserError = xmlDoc.getElementsByTagName("parsererror");
            if (parserError.length > 0) {
                document.getElementById("resultado").innerHTML = "Error al procesar el XML: " + parserError[0].textContent;
                return;
            }
 
            // Obtener todos los libros
            const libros = xmlDoc.getElementsByTagName("libro");
            let salida = "<h1>Lista de Libros</h1><ul>";
 
            for (let i = 0; i < libros.length; i++) {
                const titulo = libros[i].getElementsByTagName("titulo")[0].textContent;
                const autor = libros[i].getElementsByTagName("autor")[0].textContent;
                const anio = libros[i].getElementsByTagName("anio")[0].textContent;
                salida += `<li><strong>${titulo}</strong> por ${autor} (Año: ${anio})</li>`;
            }
 
            salida += "</ul>";
            document.getElementById("resultado").innerHTML = salida;
        }
    };
    xhr.send();
}