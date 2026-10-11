const botonCerrarSesion = document.getElementById("cerrarSesion");

botonCerrarSesion.addEventListener("click", function () {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");

  window.location.href = "/";
});

async function comprobarSesion() {
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    window.location.href = "/";
    return;
  }

  try {
    const respuesta = await fetch("/api/auth/verificar", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!respuesta.ok) {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      window.location.href = "/";
      return;
    }

    const datos = await respuesta.json();

    if (datos.usuario.rol !== "bibliotecario") {
      window.location.href = "/";
      return;
    }

    console.log("Sesión verificada:", datos.usuario.nombre);
    console.log("Rol:", datos.usuario.rol);

    const prueba = await fetch("/api/auth/bibliotecario", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const resultado = await prueba.json();

    console.log("Estado de autorización:", prueba.status);
    console.log("Respuesta:", resultado.mensaje);
    
  } catch (error) {
    console.error("Error al comprobar la sesión:", error);
    window.location.href = "/";
  }
}

comprobarSesion();
