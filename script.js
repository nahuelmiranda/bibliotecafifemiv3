document.querySelector("form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("¡Gracias por tu mensaje!");
});

const LIBROS = [
  {
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    categoria: "Fantasía",
    disponible: true,
    imagen: "imágenes/harry-potter.jpg"
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    categoria: "Distopía",
    disponible: false,
    imagen: "imágenes/1984.jpg"
  },
  {
    titulo: "Cien Años de Soledad",
    autor: "Gabriel García Márquez",
    categoria: "Realismo mágico",
    disponible: true,
    imagen: "imágenes/100-anos-soledad.jpg"
  },
  {
    titulo: "Maze Runner",
    autor: "James Dashner",
    categoria: "Ciencia ficción juvenil",
    disponible: false,
    imagen: "imágenes/maze-runner.jpg"
  },
  {
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes Saavedra",
    categoria: "Aventura",
    disponible: false,
    imagen: "imágenes/don-quijote.jpg"
  },
  {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    categoria: "Fábula / Filosofía",
    disponible: true,
    imagen: "imágenes/el-principito.jpg"
  },
  {
    titulo: "Introducción a la Guía de G. S. Simons",
    autor: "G. S. Simons",
    categoria: "Educativo",
    disponible: true,
    imagen: "imágenes/guia-simons.jpg"
  },
  {
    titulo: "Viaje a la Luna",
    autor: "Javier Reyero",
    categoria: "Ciencia ficción",
    disponible: true,
    imagen: "imágenes/viaje-luna.jpg"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("catalogoCards");
  const filtroSelect = document.getElementById("filtroCategoria");
  const buscador = document.getElementById("buscar");

  if (!contenedor) return; 
  
  const categorias = [...new Set(LIBROS.map(l => l.categoria))];
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filtroSelect.appendChild(option);
  });

  
  function mostrarLibros(filtro = "all", busqueda = "") {
    contenedor.innerHTML = "";
    const librosFiltrados = LIBROS.filter(l => {
      const coincideCategoria = filtro === "all" || l.categoria === filtro;
      const coincideBusqueda =
        l.titulo.toLowerCase().includes(busqueda) ||
        l.autor.toLowerCase().includes(busqueda);
      return coincideCategoria && coincideBusqueda;
    });

    if (librosFiltrados.length === 0) {
      contenedor.innerHTML = `<p class="text-center text-muted">No se encontraron libros con esos criterios.</p>`;
      return;
    }

    librosFiltrados.forEach(l => {
      const col = document.createElement("div");
      col.classList.add("col-md-3", "mb-4");
      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${l.imagen}" class="card-img-top" alt="${l.titulo}">
          <div class="card-body">
            <h5 class="card-title">${l.titulo}</h5>
            <p class="card-text">${l.autor}</p>
            <p class="card-text"><small>${l.categoria}</small></p>
            <span class="badge ${l.disponible ? 'bg-success' : 'bg-danger'}">
              ${l.disponible ? 'Disponible' : 'No disponible'}
            </span>
          </div>
        </div>`;
      contenedor.appendChild(col);
    });
  }

  // Mostrar todos los libros al cargar
  mostrarLibros();

  // Eventos
  filtroSelect.addEventListener("change", e => {
    mostrarLibros(e.target.value, buscador.value.toLowerCase());
  });

  buscador.addEventListener("input", e => {
    mostrarLibros(filtroSelect.value, e.target.value.toLowerCase());
  });
});
