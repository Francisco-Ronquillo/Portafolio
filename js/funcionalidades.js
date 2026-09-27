
const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");

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



const aboutCard = document.getElementById("aboutCard");
const btnClose = document.getElementById("btnClose");

function cambiarCedula() {
  if (!aboutCard) {
    return;
  }

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



const projectsGalleryData = {
  biomarket: {
    title: "Biomarket: E-commerce de productos orgánicos",
    images: [
      {
        src: "./sources/Biomarket1.png",
        alt: "Pantalla principal de biomarket, mostrando productos y categorías",
        caption: "Pantalla principal de la aplicación.",
      },
      {
        src: "./sources/Biomarket2.png",
        alt: "Seccion de productos de biomarket, mostrando productos y categorías",
        caption: "Seccion de productos.",
      },
      {
        src: "./sources/Biomarket3.png",
        alt: "Buscador de productos de biomarket, mostrando resultados de búsqueda",
        caption: "Buscador de productos.",
      },
      {
        src: "./sources/Biomarket4.png",
        alt: "Factura de compra de biomarket, mostrando detalles de la compra",
        caption: "Factura de compra.",
      },
    ],
  },

  eduflex: {
    title: "Eduflex: Plataforma de educación en línea",
    images: [
      {
        src: "./sources/Eduflex1.png ",
        alt: "Login de Eduflex, mostrando campos de usuario y contraseña",
        caption: "Vista de login.",
      },
      {
        src: "./sources/Eduflex3.png",
        alt: "Crear cuenta de Eduflex, mostrando campos de registro",
        caption: "Vista de registro.",
      },
      {
        src: "./sources/Eduflex2.png",
        alt: "Dashboard de Eduflex, mostrando estadísticas y los niños registrados",
        caption: "Vista del dashboard.",
      },
      {
        src: "./sources/Eduflex4.png",
        alt: "Opciones de juego de Eduflex, mostrando diferentes juegos para los niños",
        caption: "Opciones de juego.",
      },
    ],
  },
    blackjack: {
    title: "BlackJack: Juego de cartas en línea",
    images: [
      {
        src: "./sources/BlackJack1.png",
        alt: "Pantalla principal de BlackJack, mostrando las cartas y el mazo",
        caption: "Pantalla principal del juego.",
      },
      {
        src: "./sources/BlackJack2.png",
        alt: "Opciones de juego de BlackJack, mostrando diferentes acciones disponibles",
        caption: "Incio del juego.",
      },
      {
        src: "./sources/BlackJack3.png",
        alt: "Resultado de la partida de BlackJack, mostrando el ganador y los puntos",
        caption: "Resultado de la partida bot.",
      },
      {
        src: "./sources/BlackJack4.png",
        alt: "Configuración del juego de BlackJack, mostrando las opciones de dificultad y reglas",
        caption: "Resultado de la partida jugador.",
      },
    ],
  },
};
      


const projectModal = document.getElementById("projectModal");
const modalProjectTitle = document.getElementById("modalProjectTitle");
const projectGallery = document.getElementById("projectGallery");

const closeProjectModal = document.getElementById("closeProjectModal");
const previousImage = document.getElementById("previousImage");
const nextImage = document.getElementById("nextImage");

const galleryButtons = document.querySelectorAll("[data-project]");


function createGallerySlide(image) {
  const figure = document.createElement("figure");
  figure.classList.add("gallery-slide");

  const img = document.createElement("img");
  img.src = image.src;
  img.alt = image.alt;

  const caption = document.createElement("figcaption");
  caption.textContent = image.caption;

  figure.append(img, caption);

  return figure;
}


function openProjectGallery(projectKey) {
  const project = projectsGalleryData[projectKey];

  if (!project) {
    console.error(`No existe información para el proyecto: ${projectKey}`);
    return;
  }

  if (!projectModal || !modalProjectTitle || !projectGallery) {
    console.error("Faltan elementos del modal en el HTML.");
    return;
  }

  /* Título dinámico */
  modalProjectTitle.textContent = project.title;

  /* Elimina la galería del proyecto abierto anteriormente */
  projectGallery.innerHTML = "";

  /* Agrega las imágenes del proyecto actual */
  project.images.forEach((image) => {
    projectGallery.append(createGallerySlide(image));
  });

  /* Abre el modal primero */
  if (!projectModal.open) {
    projectModal.showModal();
  }

  /* FIX: se espera al siguiente frame de render, cuando el navegador
     ya recalculo el ancho real de la galeria con las nuevas imagenes,
     y se usa scrollTo con behavior "instant" para saltar directo a
     la primera imagen sin animacion y sin que el scroll-snap ignore
     el cambio. */
  requestAnimationFrame(() => {
    projectGallery.scrollTo({ left: 0, behavior: "instant" });

    /* Si tienes las mejoras de contador/dots agregadas antes,
       vuelve a sincronizar el estado aqui tambien */
    if (typeof updateGalleryState === "function") {
      updateGalleryState();
    }
  });
}

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const projectKey = button.dataset.project;
    openProjectGallery(projectKey);
  });
});


if (closeProjectModal && projectModal) {
  closeProjectModal.addEventListener("click", () => {
    projectModal.close();
  });
}


if (projectModal) {
  projectModal.addEventListener("cancel", () => {
    projectModal.close();
  });
}


if (projectModal) {
  projectModal.addEventListener("click", (event) => {
    const modalContent = projectModal.querySelector(".modal-content");

    if (modalContent && !modalContent.contains(event.target)) {
      projectModal.close();
    }
  });
}


if (previousImage && projectGallery) {
  previousImage.addEventListener("click", () => {
    projectGallery.scrollBy({
      left: -projectGallery.clientWidth,
      behavior: "smooth",
    });
  });
}


if (nextImage && projectGallery) {
  nextImage.addEventListener("click", () => {
    projectGallery.scrollBy({
      left: projectGallery.clientWidth,
      behavior: "smooth",
    });
  });
}


(function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form || !status) {
    return;
  }

  const fields = {
    name: {
      input: document.getElementById("contactName"),
      error: document.getElementById("errorName"),
      validate: (value) => {
        if (value.trim().length === 0) return "El nombre es obligatorio.";
        if (value.trim().length < 2)
          return "El nombre debe tener al menos 2 caracteres.";
        return "";
      },
    },
    email: {
      input: document.getElementById("contactEmail"),
      error: document.getElementById("errorEmail"),
      validate: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim().length === 0) return "El correo es obligatorio.";
        if (!emailRegex.test(value.trim())) return "Ingresa un correo válido.";
        return "";
      },
    },
    subject: {
      input: document.getElementById("contactSubject"),
      error: document.getElementById("errorSubject"),
      validate: (value) => {
        if (value.trim().length === 0) return "El asunto es obligatorio.";
        if (value.trim().length < 3)
          return "El asunto debe tener al menos 3 caracteres.";
        return "";
      },
    },
    message: {
      input: document.getElementById("contactMessage"),
      error: document.getElementById("errorMessage"),
      validate: (value) => {
        if (value.trim().length === 0) return "El mensaje es obligatorio.";
        if (value.trim().length < 10)
          return "El mensaje debe tener al menos 10 caracteres.";
        return "";
      },
    },
  };

  function setStatus(message, type) {
    status.textContent = message;
    status.classList.remove("is-success", "is-error");
    if (type) {
      status.classList.add(type);
    }
  }

  function showFieldError(field, message) {
    field.error.textContent = message;
    field.input.classList.toggle("is-invalid", Boolean(message));
  }

  
  function validateField(key) {
    const field = fields[key];
    const message = field.validate(field.input.value);
    showFieldError(field, message);
    return message === "";
  }

  
  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener("blur", () => validateField(key));
    fields[key].input.addEventListener("input", () => {
      if (fields[key].input.classList.contains("is-invalid")) {
        validateField(key);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = Object.keys(fields).map((key) => validateField(key));
    const isFormValid = results.every(Boolean);

    if (!isFormValid) {
      setStatus("Revisa los campos marcados en rojo.");
      return;
    }

   
    setStatus("¡Mensaje listo! Se ha enviado correctamente.");

    form.reset();

    
    Object.keys(fields).forEach((key) => {
      showFieldError(fields[key], "");
    });
  });
})();