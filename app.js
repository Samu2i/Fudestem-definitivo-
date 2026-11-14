// 1. Configuración de Supabase (reemplaza con tus datos reales)
const SUPABASE_URL = "TU_PROJECT_URL_AQUI";
const SUPABASE_KEY = "TU_ANON_PUBLIC_KEY_AQUI";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Capturar el envío del formulario de login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;

        // Intentar iniciar sesión en Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email: correo,
            password: password,
        });

        if (error) {
            alert("Error al iniciar sesión: " + error.message);
            return;
        }

        // Si el login es exitoso, redirigir al panel de asistencia
        alert("¡Bienvenido de nuevo!");
        window.location.href = "asistencia.html"; // O la página donde se marca la asistencia
    });
}