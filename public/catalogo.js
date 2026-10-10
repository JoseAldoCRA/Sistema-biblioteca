const listaLibros = document.getElementById('lista-libros');
const mensaje = document.getElementById('mensaje');

async function cargarLibros() {
    try {
        const respuesta = await fetch('/api/libros');

        if (!respuesta.ok) {
            throw new Error('No se pudieron consultar los libros');
        }

        const libros = await respuesta.json();

        listaLibros.replaceChildren();

        if (libros.length === 0) {
            mensaje.textContent = 'No hay libros registrados.';
            return;
        }

        for (const libro of libros) {
            const fila = document.createElement('tr');

            const datos = [
                libro.isbn,
                libro.titulo,
                libro.autor,
                libro.categoria,
                libro.total_ejemplares,
                libro.disponibles
            ];

            for (const dato of datos) {
                const celda = document.createElement('td');
                celda.textContent = dato;
                fila.appendChild(celda);
            }

            listaLibros.appendChild(fila);
        }

        mensaje.textContent = `Libros registrados: ${libros.length}`;
    } catch (error) {
        mensaje.textContent = 'No se pudo cargar el catálogo. Intenta recargar la página.';
        console.error(error);
    }
}

cargarLibros();