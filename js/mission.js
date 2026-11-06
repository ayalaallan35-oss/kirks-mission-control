(() => {
  // Página a la que se va después de elegir la misión (Fase 03).
  // Cámbiala por la que definan en el equipo.
  const SIGUIENTE_PAGINA = "juego.html";
  const STORAGE_KEY = "kirks_mision";

  const OBJETIVOS = {
    luna: [
      {
        id: "hielo",
        nombre: "Buscar hielo de agua",
        desc: "Localiza agua congelada en cráteres sombreados.",
      },
      {
        id: "regolito",
        nombre: "Recoger regolito",
        desc: "Toma muestras del suelo lunar para analizar su composición.",
      },
      {
        id: "mapeo",
        nombre: "Mapear el terreno",
        desc: "Escanea la superficie para elegir un sitio de aterrizaje seguro.",
      },
    ],
    marte: [
      {
        id: "biofirmas",
        nombre: "Buscar biofirmas",
        desc: "Analiza rocas en busca de señales de vida pasada.",
      },
      {
        id: "muestras",
        nombre: "Recoger muestras de roca",
        desc: "Reúne y almacena muestras para traerlas a la Tierra.",
      },
      {
        id: "clima",
        nombre: "Estudiar el clima",
        desc: "Mide polvo, temperatura y presión atmosférica.",
      },
    ],
    asteroide: [
      {
        id: "composicion",
        nombre: "Analizar composición",
        desc: "Determina de qué materiales está hecho el asteroide.",
      },
      {
        id: "metales",
        nombre: "Localizar metales",
        desc: "Encuentra depósitos de hierro y níquel.",
      },
      {
        id: "trayectoria",
        nombre: "Medir trayectoria",
        desc: "Registra su órbita para evaluar riesgos de impacto.",
      },
    ],
  };

  const NOMBRES_AZAR = {
    prefijos: ["Kirks", "Nova", "Orión", "Helios", "Atlas", "Zenit"],
    sufijos: ["Alfa", "Prime", "Rumbo", "Eco", "Vanguardia", "Horizonte"],
  };

  const pantallaMenu = document.getElementById("screen-menu");
  const pantallaMision = document.getElementById("screen-mission");
  const tituloMision = document.getElementById("mission-title");
  const btnJugar = document.getElementById("btn-jugar");
  const modalComo = document.getElementById("modal-como");
  const form = document.getElementById("mission-form");
  const selObjetivo = document.getElementById("objetivo");
  const descObjetivo = document.getElementById("objetivo-desc");
  const inputNombre = document.getElementById("nombre");
  const btnAzar = document.getElementById("btn-azar");
  const btnVolver = document.getElementById("btn-volver");
  const errorEl = document.getElementById("error");

  // Sonido al elegir una opción (destino, objetivo, dificultad)
  const sonidoClick = new Audio("assets/audio/click-opcion.mp3");
  sonidoClick.preload = "auto";
  sonidoClick.volume = 0.6;

  const reproducirClick = () => {
    sonidoClick.currentTime = 0; // permite clics rápidos seguidos
    sonidoClick.play().catch(() => {});
  };

  // Un solo listener para toda la página: botones (JUGAR, CÓMO SE JUEGA,
  // música, AL AZAR, VOLVER, INICIAR MISIÓN, ENTENDIDO) y opciones de misión
  document.addEventListener("click", (e) => {
    if (e.target.closest("button, input[type='radio']")) reproducirClick();
  });
  selObjetivo.addEventListener("change", reproducirClick);

  const mostrarError = (msg) => {
    errorEl.textContent = msg;
    errorEl.hidden = !msg;
  };

  // Al cambiar de destino, se rellenan los objetivos correspondientes
  form.querySelectorAll('input[name="destino"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      const lista = OBJETIVOS[radio.value];
      selObjetivo.innerHTML = '<option value="">Elige un objetivo</option>';
      lista.forEach((o) => {
        const opt = document.createElement("option");
        opt.value = o.id;
        opt.textContent = o.nombre;
        selObjetivo.appendChild(opt);
      });
      selObjetivo.disabled = false;
      descObjetivo.textContent = "";
      mostrarError("");
    });
  });

  selObjetivo.addEventListener("change", () => {
    const destino = form.destino.value;
    const obj = OBJETIVOS[destino]?.find((o) => o.id === selObjetivo.value);
    descObjetivo.textContent = obj ? obj.desc : "";
  });

  // Nombre aleatorio
  btnAzar.addEventListener("click", () => {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const num = String(Math.floor(Math.random() * 99) + 1).padStart(2, "0");
    inputNombre.value = `${pick(NOMBRES_AZAR.prefijos)} ${pick(NOMBRES_AZAR.sufijos)}-${num}`;
    mostrarError("");
  });

  // Cambio de pantalla (todo dentro de index.html)
  const abrir = () => {
    pantallaMenu.hidden = true;
    pantallaMision.hidden = false;
    window.scrollTo(0, 0);
    tituloMision.focus();
  };
  const cerrar = () => {
    pantallaMision.hidden = true;
    pantallaMenu.hidden = false;
    mostrarError("");
    btnJugar.focus();
  };

  btnVolver.addEventListener("click", cerrar);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !pantallaMision.hidden && modalComo.hidden)
      cerrar();
  });

  // Validar y guardar la misión
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const destino = form.destino.value;
    const objetivo = selObjetivo.value;
    const nombre = inputNombre.value.trim();

    if (!destino)
      return mostrarError("Elige un destino: Luna, Marte o asteroide.");
    if (!objetivo) return mostrarError("Elige un objetivo científico.");
    if (!nombre) return mostrarError("Escribe un nombre para la misión.");

    const mision = {
      nombre,
      destino,
      objetivo,
      dificultad: form.dificultad.value,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mision));
    } catch (err) {
      console.warn("No se pudo guardar la misión:", err);
    }

    // Pequeña pausa para que alcance a sonar el click antes de cambiar de página
    setTimeout(() => {
      window.location.href = SIGUIENTE_PAGINA;
    }, 250);
  });

  // Exponer la misión para otros módulos (ship.js, objectives.js, scoring.js...)
  window.KirksMission = {
    abrir,
    cerrar,
    cargar() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
      } catch {
        return null;
      }
    },
  };
})();
