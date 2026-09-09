const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");

const aboutCard = document.getElementById("aboutCard");
const btnClose = document.getElementById("btnClose");



if (menuToggle && navList) {
  menuToggle.addEventListener("click", () => {
    const menuAbierto = navList.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", menuAbierto ? "true" : "false");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}



function cambiarCedula() {
  const cedulaVolteada = aboutCard.classList.toggle("flipped");

  aboutCard.setAttribute("aria-pressed", cedulaVolteada ? "true" : "false");
}

if (aboutCard) {
  aboutCard.addEventListener("click", (event) => {
   
    if (event.target.closest(".btn-close")) {
      return;
    }

    cambiarCedula();
  });

  aboutCard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cambiarCedula();
    }
  });
}

if (btnClose && aboutCard) {
  btnClose.addEventListener("click", () => {
    aboutCard.classList.remove("flipped");
    aboutCard.setAttribute("aria-pressed", "false");
  });
}
