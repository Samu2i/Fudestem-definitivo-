// 1. Configuración de Supabase con tu Project URL y tu Publishable Key
const SUPABASE_URL = "https://rgusvkgxpxoebvyiqewr.supabase.co";
const SUPABASE_KEY = "sb_publishable_5UFlt-ApzisptpcUINW4_Q_dsLQbes9";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- LÓGICA PARA INICIAR SESIÓN (index.html) ---
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;

        const btnSubmit = loginForm.querySelector("button[type='submit']");
        btnSubmit.disabled = true;
        btnSubmit.innerText = "Iniciando sesión...";

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: correo,
                password: password,
            });

            if (error) {
                alert("Error al iniciar sesión: " + error.message);
                btnSubmit.disabled = false;
                btnSubmit.innerText = "Iniciar Sesión";
                return;
            }

            window.location.href = "asistencia.html"; 

        } catch (err) {
            console.error("Error inesperado:", err);
            alert("Ocurrió un error al conectar con Supabase.");
            btnSubmit.disabled = false;
            btnSubmit.innerText = "Iniciar Sesión";
        }
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

        const btnSubmit = registroForm.querySelector("button[type='submit']");
        btnSubmit.disabled = true;
        btnSubmit.innerText = "Creando cuenta...";

        try {
            // 1. Crear el usuario en Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: correo,
                password: password,
            });

            if (authError) {
                alert("Error al crear cuenta: " + authError.message);
                btnSubmit.disabled = false;
                btnSubmit.innerText = "Registrarse";
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
                btnSubmit.disabled = false;
                btnSubmit.innerText = "Registrarse";
                return;
            }

            alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
            window.location.href = "index.html";

        } catch (err) {
            console.error("Error inesperado:", err);
            alert("Ocurrió un error inesperado al registrar.");
            btnSubmit.disabled = false;
            btnSubmit.innerText = "Registrarse";
        }
    });
}