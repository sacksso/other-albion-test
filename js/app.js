// Aplicación principal
document.addEventListener('DOMContentLoaded', function() {
    // Navegación
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remover active de todos
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Activar el seleccionado
            this.classList.add('active');
            const sectionId = this.dataset.section;
            document.getElementById(sectionId).classList.add('active');
            
            // Cargar datos específicos de la sección
            loadSectionData(sectionId);
            
            // Cerrar sidebar en móvil
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.remove('open');
            }
        });
    });

    // Menu toggle para móvil
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.onclick = () => {
        document.querySelector('.sidebar').classList.toggle('open');
    };
    document.body.prepend(menuToggle);

    // Cargar datos iniciales
    loadSectionData('map');
    
    // Auto-refresh cada 30 segundos para datos en tiempo real
    setInterval(() => {
        const activeSection = document.querySelector('.section.active');
        if (activeSection) {
            loadSectionData(activeSection.id);
        }
    }, 30000);
});

function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'gold':
            if (typeof loadGoldData === 'function') loadGoldData();
            break;
        case 'market':
            if (typeof loadMarketData === 'function') loadMarketData();
            break;
        case 'news':
            if (typeof loadNews === 'function') loadNews();
            break;
        case 'builds':
            if (typeof loadBuilds === 'function') loadBuilds();
            break;
        case 'media':
            if (typeof loadMedia === 'function') loadMedia();
            break;
        case 'updates':
            if (typeof loadUpdates === 'function') loadUpdates();
            break;
        case 'notes':
            if (typeof loadNotes === 'function') loadNotes();
            break;
    }
}