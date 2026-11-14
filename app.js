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
    // 1. Configuración de Supabase (reemplaza con tus credenciales reales)
const SUPABASE_URL = "TU_PROJECT_URL_AQUI";
const SUPABASE_KEY = "TU_ANON_PUBLIC_KEY_AQUI";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- LÓGICA PARA INICIAR SESIÓN (index.html) ---
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: correo,
            password: password,
        });

        if (error) {
            alert("Error al iniciar sesión: " + error.message);
            return;
        }

        alert("¡Bienvenido de nuevo!");
        window.location.href = "asistencia.html"; 
    });
}

// --- LÓGICA PARA CREAR CUENTA (registro.html) ---
const registroForm = document.getElementById("registroForm");

if (registroForm) {
    registroForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;
        const rol = document.getElementById("rol").value;

        // 1. Crear el usuario en Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: correo,
            password: password,
        });

        if (authError) {
            alert("Error al crear cuenta: " + authError.message);
            return;
        }

        // 2. Guardar los datos adicionales en la tabla 'usuarios'
        const { error: dbError } = await supabase
            .from("usuarios")
            .insert([
                {
                    id: authData.user.id,
                    nombre: nombre,
                    correo: correo,
                    rol: rol
                }
            ]);

        if (dbError) {
            alert("Cuenta creada, pero hubo un error al guardar el perfil: " + dbError.message);
            return;
        }

        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        window.location.href = "index.html"; // Lo envía de vuelta al Login
    });
}
}