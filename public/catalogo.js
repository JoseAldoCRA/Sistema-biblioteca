const listaLibros = document.getElementById('lista-libros');
const mensaje = document.getElementById('mensaje');
const formulario = document.getElementById('formulario-busqueda');
const busqueda = document.getElementById('busqueda');
const categoria = document.getElementById('categoria');
const limpiar = document.getElementById('limpiar');

let ultimaConsulta = 0;

async function cargarLibros() {
    const consultaActual = ++ultimaConsulta;

    const parametros = new URLSearchParams({
        busqueda: busqueda.value.trim(),
        categoria: categoria.value
    });

    mensaje.textContent = 'Buscando libros...';
    listaLibros.replaceChildren();

    try {
        const respuesta = await fetch(`/api/libros?${parametros}`);

        if (!respuesta.ok) {
            throw new Error('No se pudieron consultar los libros');
        }

        const libros = await respuesta.json();

        // Evita mostrar una respuesta anterior si se busca varias veces.
        if (consultaActual !== ultimaConsulta) {
            return;
        }

        if (libros.length === 0) {
            mensaje.textContent = 'No se encontraron libros con esos filtros.';
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

        mensaje.textContent = `Libros encontrados: ${libros.length}`;
    } catch (error) {
        if (consultaActual !== ultimaConsulta) {
            return;
        }

        mensaje.textContent = 'No se pudo cargar el catálogo. Intenta nuevamente.';
        console.error(error);
    }
}

async function cargarCategorias() {
    categoria.disabled = true;

    try {
        const respuesta = await fetch('/api/categorias');

        if (!respuesta.ok) {
            throw new Error('No se pudieron cargar las categorías');
        }

        const categorias = await respuesta.json();

        for (const elemento of categorias) {
            const opcion = document.createElement('option');
            opcion.value = elemento.id_categoria;
            opcion.textContent = elemento.nombre;
            categoria.appendChild(opcion);
        }

        categoria.disabled = false;
    } catch (error) {
        categoria.options[0].textContent = 'Error al cargar categorías';
        console.error(error);
    }
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    cargarLibros();
});

limpiar.addEventListener('click', () => {
    busqueda.value = '';
    categoria.value = '';
    cargarLibros();
});

cargarCategorias();
cargarLibros();