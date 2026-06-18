// Datos de contenido multimedia (simulados)
const mediaData = {
    youtube: [
        {
            id: 1,
            title: 'Top 10 Best PvP Builds 2024',
            channel: 'Albion Pro',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=PvP+Builds',
            views: '125K'
        },
        {
            id: 2,
            title: 'Complete Gathering Guide for Beginners',
            channel: 'Albion Academy',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Gathering+Guide',
            views: '89K'
        },
        {
            id: 3,
            title: 'ZvZ Tactics: How to Win Faction Wars',
            channel: 'Warriors of Albion',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=ZvZ+Tactics',
            views: '210K'
        },
        {
            id: 4,
            title: 'Solo Dungeon Farming Guide',
            channel: 'Albion Solo',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            thumbnail: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Dungeon+Farming',
            views: '67K'
        }
    ],
    twitch: [
        {
            id: 1,
            title: 'Crystal League Live!',
            channel: 'AlbionTV',
            url: 'https://www.twitch.tv/albiononline',
            thumbnail: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=AlbionTV',
            viewers: '2.5K'
        },
        {
            id: 2,
            title: 'Road to Grandmaster PvP',
            channel: 'PvPKing',
            url: 'https://www.twitch.tv/albiononline',
            thumbnail: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=PvP+King',
            viewers: '1.8K'
        },
        {
            id: 3,
            title: 'Learning Albion: Streamer Begins',
            channel: 'NewbieAdventures',
            url: 'https://www.twitch.tv/albiononline',
            thumbnail: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Newbie+Stream',
            viewers: '450'
        }
    ]
};

let currentMediaType = 'youtube';

function loadMedia() {
    const container = document.getElementById('media-container');
    container.innerHTML = '<div class="loading-text">Cargando contenido multimedia...</div>';
    
    setTimeout(() => {
        const media = mediaData[currentMediaType] || [];
        renderMedia(media);
    }, 300);
}

function renderMedia(media) {
    const container = document.getElementById('media-container');
    
    if (media.length === 0) {
        container.innerHTML = '<p class="loading-text">No hay contenido disponible</p>';
        return;
    }
    
    container.innerHTML = media.map(item => `
        <div class="media-card" onclick="window.open('${item.url}', '_blank')" style="cursor: pointer;">
            <img src="${item.thumbnail}" alt="${item.title}">
            <div class="content">
                <h3>${item.title}</h3>
                <p style="color: var(--text-dark);">${item.channel}</p>
                <div style="display: flex; justify-content: space-between; color: var(--text-dark); font-size: 0.9rem;">
                    <span>${currentMediaType === 'youtube' ? '👁️ ' + item.views : '👤 ' + item.viewers + ' viewers'}</span>
                    <span>${currentMediaType === 'youtube' ? '▶️ YouTube' : '🔴 Live'}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Event listeners para tabs de media
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