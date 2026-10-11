const supabase = require("../config/supabase");
const usuariosRepository = require("../repositories/usuariosRepository");

async function iniciarSesion(correo, contrasena) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: correo,
    password: contrasena,
  });

  if (error) {
    console.error("Error de Supabase Auth:", error.message);
    throw new Error("Correo o contraseña incorrectos");
  }

  const usuario = await usuariosRepository.buscarPorAuthId(data.user.id);

  if (!usuario) {
    throw new Error("El usuario no está registrado en el sistema");
  }

  if (usuario.estado !== "activo") {
    throw new Error("El usuario está inactivo");
  }

  return {
    usuario: usuario,
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  };
}

module.exports = {
  iniciarSesion,
};
