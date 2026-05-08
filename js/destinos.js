// Base de datos de destinos
const destinosData = [
  {
    id: 1,
    nombre: 'Laguna de los Tres Picos',
    region: 'patagonia',
    tipo: 'naturaleza',
    dificultad: 'media',
    descripcion: 'Una laguna glaciar de aguas turquesas rodeada de montañas nevadas',
    distancia: '420 km',
    duracion: '3 días',
    altitud: '2300 m',
    detalles: 'Ubicada en la Patagonia, esta laguna ofrece vistas espectaculares. El acceso es mediante sendero bien marcado. Recomendado para amantes de la fotografía.',
    facilidades: [
      'Área de acampe',
      'Agua potable',
      'Refugio básico',
      'Señalización clara'
    ]
  },
  {
    id: 2,
    nombre: 'Playa Chapadmalal',
    region: 'costa',
    tipo: 'playa',
    dificultad: 'facil',
    descripcion: 'Playa tranquila perfecta para familias y relajación',
    distancia: '380 km',
    duracion: '2 días',
    altitud: '5 m',
    detalles: 'Playa virgen con arena blanca y aguas cristalinas. Ideal para descansar y disfrutar del mar. Cuenta con servicios básicos en la zona.',
    facilidades: [
      'Servicio de guardavidas',
      'Chiringuito',
      'Estacionamiento',
      'Baños públicos'
    ]
  },
  {
    id: 3,
    nombre: 'Cerro de los 7 Colores',
    region: 'norte',
    tipo: 'montaña',
    dificultad: 'media',
    descripcion: 'Montaña icónica con vistas panorámicas del valle de Purmamarca',
    distancia: '1200 km',
    duracion: '2 días',
    altitud: '2348 m',
    detalles: 'Sendero de dificultad media que ofrece vistas espectaculares. Se recomienda comenzar temprano. El cambio de colores según la hora del día es fascinante.',
    facilidades: [
      'Sendero marcado',
      'Estacionamiento',
      'Servicios en pueblo',
      'Parador turístico'
    ]
  },
  {
    id: 4,
    nombre: 'Sierras de Córdoba',
    region: 'cordoba',
    tipo: 'naturaleza',
    dificultad: 'facil',
    descripcion: 'Escarpadas sierras con cascadas y arroyos de agua cristalina',
    distancia: '620 km',
    duracion: '3 días',
    altitud: '1800 m',
    detalles: 'Las sierras cordobesas ofrecen múltiples caminos de diversos niveles. Ideal para trekking y naturaleza. Muchas cascadas y piscinas naturales.',
    facilidades: [
      'Áreas de acampe',
      'Centros de información',
      'Caminos variados',
      'Señalización'
    ]
  },
  {
    id: 5,
    nombre: 'Glaciar Perito Moreno',
    region: 'patagonia',
    tipo: 'naturaleza',
    dificultad: 'facil',
    descripcion: 'Uno de los glaciares más espectaculares de América del Sur',
    distancia: '1450 km',
    duracion: '3 días',
    altitud: '200 m',
    detalles: 'Glaciar accesible para todos los niveles. Vistas impresionantes y posibilidad de navegar por el lago glaciar. Centro de visitantes bien equipado.',
    facilidades: [
      'Pasarelas',
      'Centro de visitantes',
      'Guías turísticos',
      'Restaurante y tienda'
    ]
  },
  {
    id: 6,
    nombre: 'Balneario Gesell',
    region: 'costa',
    tipo: 'playa',
    dificultad: 'facil',
    descripcion: 'Playa turística con dinámica nocturna y gastronomía',
    distancia: '350 km',
    duracion: '2 días',
    altitud: '5 m',
    detalles: 'Balneario completo con todas las comodidades. Ambiente joven y activo. Excelente infraestructura gastronómica y de ocio.',
    facilidades: [
      'Comercios',
      'Bares y restaurantes',
      'Servicios médicos',
      'Esparcimiento'
    ]
  }
];

// DOM Elements
const destinationsGrid = document.getElementById('destinationsGrid');
const regionFilter = document.getElementById('region-filter');
const typeFilter = document.getElementById('type-filter');
const difficultyFilter = document.getElementById('difficulty-filter');
const resetBtn = document.querySelector('.btn--filter');
const modal = document.getElementById('destinationModal');
const modalClose = document.querySelector('.modal__close');
const modalBody = document.getElementById('modalBody');

// Renderizar destinos
function renderDestinos(destinos = destinosData) {
  destinationsGrid.innerHTML = '';
  
  if (destinos.length === 0) {
    destinationsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No hay destinos que coincidan con tus filtros</p>';
    return;
  }
  
  destinos.forEach(destino => {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.innerHTML = `
      <div class="destination-card__image">
        <span class="destination-card__badge">${getRegionLabel(destino.region)}</span>
      </div>
      <div class="destination-card__content">
        <h3 class="destination-card__title">${destino.nombre}</h3>
        <p class="destination-card__region">${getTypeLabel(destino.tipo)}</p>
        <p class="destination-card__description">${destino.descripcion}</p>
        <div class="destination-card__stats">
          <div class="stat">
            <i class="bx bxs-map-pin"></i>
            <span>${destino.distancia}</span>
          </div>
          <div class="stat">
            <i class="bx bxs-time"></i>
            <span>${destino.duracion}</span>
          </div>
          <div class="stat">
            <i class="bx bxs-mountain"></i>
            <span>${destino.altitud}</span>
          </div>
        </div>
        <button class="destination-card__button" data-id="${destino.id}">
          Ver detalles
          <i class="bx bx-right-arrow-alt"></i>
        </button>
      </div>
    `;
    
    card.querySelector('.destination-card__button').addEventListener('click', () => openModal(destino));
    destinationsGrid.appendChild(card);
  });
}

// Obtener etiqueta de región
function getRegionLabel(region) {
  const labels = {
    patagonia: 'Patagonia',
    norte: 'Norte',
    costa: 'Costa',
    cordoba: 'Córdoba'
  };
  return labels[region] || region;
}

// Obtener etiqueta de tipo
function getTypeLabel(tipo) {
  const labels = {
    naturaleza: 'Naturaleza',
    playa: 'Playa',
    montaña: 'Montaña',
    ciudad: 'Ciudad'
  };
  return labels[tipo] || tipo;
}

// Obtener etiqueta de dificultad
function getDifficultyLabel(difficulty) {
  const labels = {
    facil: 'Fácil',
    media: 'Media',
    dificil: 'Difícil'
  };
  return labels[difficulty] || difficulty;
}

// Abrir modal
function openModal(destino) {
  modalBody.innerHTML = `
    <div class="modal-header">
      <h2>${destino.nombre}</h2>
      <p>${getRegionLabel(destino.region)} • ${getTypeLabel(destino.tipo)}</p>
    </div>
    <div class="modal-info">
      <div class="info-item">
        <i class="bx bxs-map-pin"></i>
        <div class="info-item-text">
          <h4>Distancia</h4>
          <p>${destino.distancia}</p>
        </div>
      </div>
      <div class="info-item">
        <i class="bx bxs-time"></i>
        <div class="info-item-text">
          <h4>Duración</h4>
          <p>${destino.duracion}</p>
        </div>
      </div>
      <div class="info-item">
        <i class="bx bxs-mountain"></i>
        <div class="info-item-text">
          <h4>Altitud</h4>
          <p>${destino.altitud}</p>
        </div>
      </div>
      <div class="info-item">
        <i class="bx bxs-bar-chart-alt-2"></i>
        <div class="info-item-text">
          <h4>Dificultad</h4>
          <p>${getDifficultyLabel(destino.dificultad)}</p>
        </div>
      </div>
    </div>
    <div class="modal-description">
      <h3>Sobre este destino</h3>
      <p>${destino.detalles}</p>
    </div>
    <div class="modal-description">
      <h3>Facilidades</h3>
      <ul>
        ${destino.facilidades.map(facilidad => `<li>${facilidad}</li>`).join('')}
      </ul>
    </div>
  `;
  modal.classList.add('active');
}

// Cerrar modal
function closeModal() {
  modal.classList.remove('active');
}

// Filtrar destinos
function filterDestinos() {
  const region = regionFilter.value;
  const type = typeFilter.value;
  const difficulty = difficultyFilter.value;
  
  const filtered = destinosData.filter(destino => {
    const matchRegion = region === 'all' || destino.region === region;
    const matchType = type === 'all' || destino.tipo === type;
    const matchDifficulty = difficulty === 'all' || destino.dificultad === difficulty;
    
    return matchRegion && matchType && matchDifficulty;
  });
  
  renderDestinos(filtered);
}

// Event Listeners
regionFilter.addEventListener('change', filterDestinos);
typeFilter.addEventListener('change', filterDestinos);
difficultyFilter.addEventListener('change', filterDestinos);

resetBtn.addEventListener('click', () => {
  regionFilter.value = 'all';
  typeFilter.value = 'all';
  difficultyFilter.value = 'all';
  renderDestinos();
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Inicializar
renderDestinos();