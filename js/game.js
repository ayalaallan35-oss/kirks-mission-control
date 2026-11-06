(() => {
  const btnJugar = document.getElementById("btn-jugar");
  const btnComo = document.getElementById("btn-como");
  const btnCerrar = document.getElementById("btn-cerrar");
  const btnAudio = document.getElementById("btn-audio");
  const modal = document.getElementById("modal-como");
  const musica = document.getElementById("musica");

  // Ir a la Fase 02 (selección de misión).
  // Cambia "mision.html" por la página o escena que definan en el equipo.
  btnJugar.addEventListener("click", () => {
    window.location.href = "mision.html";
  });

  // Modal "Cómo se juega"
  const abrirModal = () => {
    modal.hidden = false;
    btnCerrar.focus();
  };
  const cerrarModal = () => {
    modal.hidden = true;
    btnComo.focus();
  };

  btnComo.addEventListener("click", abrirModal);
  btnCerrar.addEventListener("click", cerrarModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) cerrarModal();
  });

  // Música ambiente (los navegadores exigen un clic antes de reproducir audio)
  btnAudio.addEventListener("click", async () => {
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
