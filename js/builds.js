async function loadBuilds() {
    const container = document.getElementById('builds-container');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-text"><i class="fas fa-spinner fa-spin"></i> Cargando builds...</div>';
    
    const type = document.getElementById('build-type')?.value || 'all';
    const weapon = document.getElementById('build-weapon')?.value || 'all';
    
    try {
        const builds = await AlbionAPI.getBuilds(type, weapon);
        renderBuilds(builds);
    } catch (error) {
        console.error('Error cargando builds:', error);
        const mockBuilds = getMockBuilds(type, weapon);
        renderBuilds(mockBuilds);
    }
}

function renderBuilds(builds) {
    const container = document.getElementById('builds-container');
    if (!container) return;
    
    if (!builds || builds.length === 0) {
        container.innerHTML = '<p class="loading-text">No se encontraron builds con esos filtros</p>';
        return;
    }
    
    container.innerHTML = builds.map(build => `
        <div class="build-card">
            <span class="build-type">${build.type.toUpperCase()}</span>
            <h3>${build.name}</h3>
            <div class="build-weapons"><strong>⚔️ Armas:</strong> ${build.weapons.join(', ')}</div>
            <div class="build-weapons"><strong>🛡️ Armadura:</strong> ${build.armor.join(', ')}</div>
            <div class="build-description">${build.description}</div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px; color: var(--text-dark);">
                <span>📈 Tier ${build.tier}</span>
                <span>⭐ ${build.rating}</span>
            </div>
        </div>
    `).join('');
}

// Cargar builds al iniciar
document.addEventListener('DOMContentLoaded', function() {
    // La carga se maneja desde app.js
});