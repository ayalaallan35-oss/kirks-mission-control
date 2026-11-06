(() => {
  const btnJugar = document.getElementById("btn-jugar");
  const btnComo = document.getElementById("btn-como");
  const btnCerrar = document.getElementById("btn-cerrar");
  const btnAudio = document.getElementById("btn-audio");
  const modal = document.getElementById("modal-como");
  const musica = document.getElementById("musica");

  // --- NUEVO: Sonido de click ---
  const sonidoClick = new Audio("assets/audio/click-opcion.mp3");
  sonidoClick.preload = "auto";
  sonidoClick.volume = 0.6;

  const reproducirClick = () => {
    sonidoClick.currentTime = 0; // Permite clics rápidos
    sonidoClick.play().catch(() => {});
  };
  // ------------------------------

  // Ir a la Fase 02
  btnJugar.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita doble sonido con mission.js
    reproducirClick();
    window.KirksMission.abrir();
  });

  // Modal "Cómo se juega"
  const abrirModal = (e) => {
    if (e) e.stopPropagation();
    reproducirClick();
    modal.hidden = false;
    btnCerrar.focus();
  };
  const cerrarModal = (e) => {
    if (e) e.stopPropagation();
    reproducirClick();
    modal.hidden = true;
    btnComo.focus();
  };

  btnComo.addEventListener("click", abrirModal);
  btnCerrar.addEventListener("click", cerrarModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal(e);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) cerrarModal();
  });

  // Música ambiente
  btnAudio.addEventListener("click", async (e) => {
    e.stopPropagation();
    reproducirClick();

    const activa = btnAudio.getAttribute("aria-pressed") === "true";
    if (activa) {
      musica.pause();
      btnAudio.textContent = "♪ Música: OFF";
      btnAudio.setAttribute("aria-pressed", "false");
    } else {
      try {
        musica.volume = 0.4;
        await musica.play();
        btnAudio.textContent = "♪ Música: ON";
        btnAudio.setAttribute("aria-pressed", "true");
      } catch (err) {
        console.warn("No se pudo reproducir el audio:", err);
      }
    }
  });
})();
