// Aplicación principal
document.addEventListener('DOMContentLoaded', function() {
    // Navegación
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (this.id === 'theme-toggle') {
                toggleTheme();
                return;
            }
            
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            this.classList.add('active');
            const sectionId = this.dataset.section;
            if (sectionId) {
                document.getElementById(sectionId).classList.add('active');
                loadSectionData(sectionId);
            }
            
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

    // Cargar tema guardado
    loadTheme();
    
    // Cargar datos iniciales
    setTimeout(() => {
        loadSectionData('map');
    }, 100);
    
    // Auto-refresh cada 60 segundos
    setInterval(() => {
        const activeSection = document.querySelector('.section.active');
        if (activeSection) {
            loadSectionData(activeSection.id);
        }
    }, 60000);
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
        case 'calculator':
            if (typeof renderCalculatorUI === 'function') {
                const container = document.getElementById('calculator-container');
                if (container && !container.innerHTML.trim()) {
                    container.innerHTML = renderCalculatorUI();
                }
            }
            break;
    }
}

// ===== TOAST =====
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3500);
}

// ===== TEMA OSCURO/CLARO =====
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===== UTILITIES =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}