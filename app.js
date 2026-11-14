// 1. Configuración de Supabase con tu Project URL
const SUPABASE_URL = "https://rgusvkgxpxoebvyiqewr.supabase.co";
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

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: correo,
            password: password,
        });

        if (authError) {
            alert("Error al crear cuenta: " + authError.message);
            return;
        }

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
        window.location.href = "index.html";
    });
}
