// app.js - datos ficticios y funciones
const LIBROS = [
    { libro_id: 1, titulo: 'Viaje a la Luna', autor: 'A. Autor', anio: 2019, isbn: 'ISBN123', disponible: true, categoria: 'Ficción' },
    { libro_id: 2, titulo: 'Introducción a IA', autor: 'B. Autor', anio: 2022, isbn: 'ISBN456', disponible: true, categoria: 'Ciencia' },
    { libro_id: 3, titulo: 'Historia breve', autor: 'C. Autor', anio: 2015, isbn: 'ISBN789', disponible: false, categoria: 'Historia' }
];

// llena destacados en index
document.addEventListener('DOMContentLoaded', () => {
    const dest = document.getElementById('destacados');
    if (dest) {
        LIBROS.slice(0, 3).forEach(l => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${l.titulo}</h5>
            <p class="card-text">Autor: ${l.autor}</p>
            <p class="card-text"><small class="text-muted">${l.categoria}</small></p>
          </div>
        </div>`;
            dest.appendChild(col);
        });
    }

    // catálogo
    const catalogoCards = document.getElementById('catalogoCards');
    const filtro = document.getElementById('filtroCategoria');
    const buscar = document.getElementById('buscar');

    if (catalogoCards && filtro) {
        // llenar select categorias
        const categorias = ['all', ...new Set(LIBROS.map(l => l.categoria))];
        categorias.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c;
            opt.text = c === 'all' ? 'Todos' : c;
            filtro.appendChild(opt);
        });

        function renderCatalogo(filter = 'all', q = '') {
            catalogoCards.innerHTML = '';
            let lista = LIBROS.filter(l => (filter === 'all' || l.categoria === filter));
            if (q) {
                q = q.toLowerCase();
                lista = lista.filter(l => l.titulo.toLowerCase().includes(q) || l.autor.toLowerCase().includes(q));
            }
            if (lista.length === 0) {
                catalogoCards.innerHTML = '<p>No hay resultados.</p>';
                return;
            }
            lista.forEach(l => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${l.titulo}</h5>
              <p class="card-text">Autor: ${l.autor}</p>
              <p class="card-text"><small>${l.categoria} - ${l.disponible ? 'Disponible' : 'No disponible'}</small></p>
            </div>
          </div>`;
                catalogoCards.appendChild(col);
            });
        }

        renderCatalogo();

        filtro.addEventListener('change', e => renderCatalogo(e.target.value, buscar.value));
        buscar?.addEventListener('input', e => renderCatalogo(filtro.value, e.target.value));
    }

    // Validación y envío del formulario contacto (AJAX)
    const formContacto = document.getElementById('formContacto');
    if (formContacto) {
        formContacto.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!formContacto.checkValidity()) {
                formContacto.classList.add('was-validated');
                return;
            }
            const formData = new FormData(formContacto);
            const msgDiv = document.getElementById('formMsg');
            msgDiv.textContent = 'Enviando...';

            try {
                const res = await fetch('backend/contact_submit.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (data.ok) {
                    msgDiv.innerHTML = '<div class="alert alert-success">' + data.msg + '</div>';
                    formContacto.reset();
                    formContacto.classList.remove('was-validated');
                } else {
                    msgDiv.innerHTML = '<div class="alert alert-danger">' + data.msg + '</div>';
                }
            } catch (err) {
                msgDiv.innerHTML = '<div class="alert alert-danger">Error al enviar. Reintente.</div>';
            }
        });
    }
});