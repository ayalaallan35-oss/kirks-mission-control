import { getMission } from "./mission.js";

export function initializeInterface() {
  const homeScreen = document.getElementById("home-screen");
  const missionScreen = document.getElementById("mission-screen");

  const playButton = document.getElementById("play-button");
  const backButton = document.getElementById("back-button");

  const howButton = document.getElementById("how-button");
  const modal = document.getElementById("instructions-modal");
  const closeModal = document.getElementById("close-modal");

  const planetCards = document.querySelectorAll(".planet-card");

  const objectiveTitle = document.getElementById("objective-title");
  const objectiveDescription = document.getElementById("objective-description");
  const scienceTag = document.getElementById("science-tag");

  const missionName = document.getElementById("mission-name");
  const startButton = document.getElementById("start-mission-button");

  // CAMBIAR DE PANTALLA

  function showScreen(screen) {
    homeScreen.classList.remove("active");
    missionScreen.classList.remove("active");

    screen.classList.add("active");
  }

  // FASE 01 -> FASE 02

  playButton.addEventListener("click", () => {
    showScreen(missionScreen);
  });

  // FASE 02 -> FASE 01

  backButton.addEventListener("click", () => {
    showScreen(homeScreen);
  });

  // ABRIR INSTRUCCIONES

  howButton.addEventListener("click", () => {
    modal.classList.add("show");
  });

  // CERRAR INSTRUCCIONES

  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // SELECCIONAR PLANETA

  let selectedPlanet = "moon";

  planetCards.forEach((card) => {
    card.addEventListener("click", () => {
      planetCards.forEach((item) => {
        item.classList.remove("selected");
      });

      card.classList.add("selected");

      selectedPlanet = card.dataset.planet;

      const mission = getMission(selectedPlanet);

      objectiveTitle.textContent = mission.objective;
      objectiveDescription.textContent = mission.description;
      scienceTag.textContent = mission.science;
    });
  });

  // CONFIRMAR MISIÓN

  startButton.addEventListener("click", () => {
    const name = missionName.value.trim();

    if (!name) {
      alert("Debes escribir un nombre para tu misión.");
      missionName.focus();
      return;
    }

    const difficulty = document.querySelector(
      'input[name="difficulty"]:checked',
    ).value;

    const selectedMission = {
      name: name,
      planet: selectedPlanet,
      objective: getMission(selectedPlanet).objective,
      difficulty: difficulty,
    };

    console.log("MISIÓN CONFIGURADA:", selectedMission);

    alert(
      "¡Misión configurada correctamente!\n\n" +
        "Nombre: " +
        selectedMission.name +
        "\nDestino: " +
        getMission(selectedPlanet).name +
        "\nDificultad: " +
        difficulty.toUpperCase(),
    );

    // En una siguiente fase conectaremos
    // esta configuración con el motor del juego.
  });
}
