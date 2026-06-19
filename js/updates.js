async function loadUpdates() {
    const container = document.getElementById('updates-list');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-text"><i class="fas fa-spinner fa-spin"></i> Cargando historial de updates...</div>';
    
    const versionFilter = document.getElementById('update-version')?.value || 'latest';
    
    try {
        let updates = await AlbionAPI.getUpdates();
        if (versionFilter === 'latest') {
            updates = updates.slice(0, 3);
        }
        renderUpdates(updates);
    } catch (error) {
        console.error('Error cargando updates:', error);
        const mockUpdates = getMockUpdates();
        renderUpdates(versionFilter === 'latest' ? mockUpdates.slice(0, 3) : mockUpdates);
    }
}

function renderUpdates(updates) {
    const container = document.getElementById('updates-list');
    if (!container) return;
    
    if (!updates || updates.length === 0) {
        container.innerHTML = '<p class="loading-text">No hay updates disponibles</p>';
        return;
    }
    
    container.innerHTML = updates.map(update => `
        <div class="update-card">
            <div>
                <span class="version">📦 ${update.version}</span>
                <span class="date">${formatDate(update.date)}</span>
            </div>
            <h3 style="color: var(--primary); margin-top: 5px;">${update.title}</h3>
            <ul class="changes">
                ${(update.changes || []).map(change => `<li>${change}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const versionSelect = document.getElementById('update-version');
    if (versionSelect) {
        versionSelect.addEventListener('change', loadUpdates);
    }
});