let currentNewsLang = 'all';

async function loadNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = '<div class="loading-text"><i class="fas fa-spinner fa-spin"></i> Cargando noticias...</div>';
    
    try {
        const news = await AlbionAPI.getNews(currentNewsLang === 'all' ? 'en' : currentNewsLang);
        renderNews(news);
    } catch (error) {
        console.error('Error cargando noticias:', error);
        renderNews(getMockNews());
    }
}

function renderNews(news) {
    const container = document.getElementById('news-container');
    
    if (!news || news.length === 0) {
        container.innerHTML = '<p class="loading-text">No hay noticias disponibles</p>';
        return;
    }
    
    container.innerHTML = news.map(item => `
        <div class="news-card" onclick="window.open('${item.link || '#'}', '_blank')" style="cursor: pointer;">
            <img src="${item.image || 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Albion+News'}" alt="${item.title}">
            <div class="content">
                <span class="date">${formatDate(item.date)}</span>
                <h3>${item.title}</h3>
                <p class="excerpt">${item.excerpt || ''}</p>
            </div>
        </div>
    `).join('');
}

// Event listeners
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