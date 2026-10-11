const formLogin = document.getElementById('formLogin');
const mensajeLogin = document.getElementById('mensajeLogin');

formLogin.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value;

    mensajeLogin.textContent = 'Iniciando sesión...';

    try {
        const respuesta = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: correo,
                contrasena: contrasena
            })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mensajeLogin.textContent = datos.mensaje || 'Error al iniciar sesión';
            return;
        }

        sessionStorage.setItem('access_token', datos.access_token);
        sessionStorage.setItem('refresh_token', datos.refresh_token);

        mensajeLogin.textContent = 'Bienvenido, ' + datos.usuario.nombre;

        if (datos.usuario.rol === 'bibliotecario') {
            window.location.href = '/bibliotecario.html';
        } else if (datos.usuario.rol === 'estudiante') {
            window.location.href = '/estudiante.html';
        } else if (datos.usuario.rol === 'docente') {
            window.location.href = '/docente.html';
        } else {
            sessionStorage.clear();
            mensajeLogin.textContent = 'Rol de usuario no reconocido';
        }

    } catch (error) {
        console.error('Error de conexión:', error);
        mensajeLogin.textContent = 'No se pudo conectar con el servidor';
    }
});