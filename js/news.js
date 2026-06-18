// Datos de noticias (simulados)
const newsData = [
    {
        id: 1,
        title: 'New Crystal League Season Announced',
        excerpt: 'The Crystal League enters its new season with fresh rewards and challenges for all competitors.',
        date: '2024-01-15',
        lang: 'en',
        image: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Crystal+League'
    },
    {
        id: 2,
        title: 'Actualización de Balance: Armas y Armaduras',
        excerpt: 'Se han realizado ajustes importantes al balance de varias armas y sets de armadura en el juego.',
        date: '2024-01-12',
        lang: 'es',
        image: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Balance+Update'
    },
    {
        id: 3,
        title: 'Albion East Server Progress Report',
        excerpt: 'The Albion East server continues to grow with a thriving community and economy.',
        date: '2024-01-10',
        lang: 'en',
        image: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Albion+East'
    },
    {
        id: 4,
        title: 'Evento de Invierno: Recompensas Especiales',
        excerpt: 'Participa en el evento de invierno para obtener recompensas exclusivas y cosméticos únicos.',
        date: '2024-01-08',
        lang: 'es',
        image: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Winter+Event'
    },
    {
        id: 5,
        title: 'Developer Q&A: Future Content',
        excerpt: 'Join the developers for a live Q&A session about upcoming content and features.',
        date: '2024-01-05',
        lang: 'en',
        image: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Dev+Q%26A'
    },
    {
        id: 6,
        title: 'Guía de Construcción para Nuevos Jugadores',
        excerpt: 'Aprende las mejores builds y estrategias para comenzar tu aventura en Albion Online.',
        date: '2024-01-03',
        lang: 'es',
        image: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=New+Player+Guide'
    }
];

let currentNewsLang = 'all';

function loadNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = '<div class="loading-text">Cargando noticias...</div>';
    
    setTimeout(() => {
        let filtered = newsData;
        if (currentNewsLang !== 'all') {
            filtered = filtered.filter(news => news.lang === currentNewsLang);
        }
        renderNews(filtered);
    }, 300);
}

function renderNews(news) {
    const container = document.getElementById('news-container');
    
    if (news.length === 0) {
        container.innerHTML = '<p class="loading-text">No hay noticias disponibles en este idioma</p>';
        return;
    }
    
    container.innerHTML = news.map(item => `
        <div class="news-card">
            <img src="${item.image}" alt="${item.title}">
            <div class="content">
                <span class="date">${formatDate(item.date)}</span>
                <h3>${item.title}</h3>
                <p class="excerpt">${item.excerpt}</p>
                <span style="color: var(--text-dark); font-size: 0.8rem;">${item.lang === 'es' ? '🇪🇸' : '🇬🇧'}</span>
            </div>
        </div>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Event listeners para tabs de noticias
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.news-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.news-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentNewsLang = this.dataset.lang;
            loadNews();
        });
    });
});