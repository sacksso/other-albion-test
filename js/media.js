let currentMediaType = 'youtube';

async function loadMedia() {
    const container = document.getElementById('media-container');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-text"><i class="fas fa-spinner fa-spin"></i> Cargando contenido...</div>';
    
    try {
        const streamers = await AlbionAPI.getStreamers();
        const filtered = streamers.filter(s => s.platform === currentMediaType);
        renderMedia(filtered);
    } catch (error) {
        console.error('Error cargando media:', error);
        renderMedia([]);
    }
}

function renderMedia(media) {
    const container = document.getElementById('media-container');
    if (!container) return;
    
    if (!media || media.length === 0) {
        container.innerHTML = '<p class="loading-text">No hay contenido disponible en este momento</p>';
        return;
    }
    
    container.innerHTML = media.map(item => `
        <div class="media-card" onclick="window.open('${item.url}', '_blank')" style="cursor: pointer;">
            <img src="https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=${encodeURIComponent(item.name)}" alt="${item.name}">
            <div class="content">
                <h3>${item.name}</h3>
                <p style="color: var(--text-dark);">${item.platform === 'youtube' ? '📺 YouTube' : '🔴 Twitch'}</p>
                <div style="display: flex; justify-content: space-between; color: var(--text-dark); font-size: 0.9rem;">
                    <span>${item.platform === 'youtube' ? '👤 ' + (item.subscribers || 'N/A') : '👁️ ' + (item.viewers || 'N/A')}</span>
                    <span>${item.platform === 'youtube' ? '▶️' : '🔴 Live'}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.media-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.media-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentMediaType = this.dataset.type;
            loadMedia();
        });
    });
});