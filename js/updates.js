// Datos de updates (simulados)
const updatesData = [
    {
        version: '1.23.0',
        date: '2024-01-15',
        title: 'Season 23: Crystal League Renewed',
        changes: [
            'New Crystal League season with updated rewards',
            'Balance adjustments to 15 weapons',
            'New cosmetic items in the shop',
            'Fixed several bugs affecting dungeons'
        ]
    },
    {
        version: '1.22.1',
        date: '2024-01-08',
        title: 'Hotfix: Performance Improvements',
        changes: [
            'Optimized server performance during peak hours',
            'Fixed memory leak issues',
            'Minor UI improvements',
            'Balance tweaks to faction warfare'
        ]
    },
    {
        version: '1.22.0',
        date: '2024-01-01',
        title: 'New Year Event Update',
        changes: [
            'Added New Year special event with unique rewards',
            'Introduced new mounts',
            'Balance changes to gathering tools',
            'Updated localization for multiple languages'
        ]
    },
    {
        version: '1.21.3',
        date: '2023-12-20',
        title: 'Winter Festival Content',
        changes: [
            'Winter festival activities and rewards',
            'New seasonal outfits and cosmetics',
            'Increased silver drops from mobs during the event',
            'Bug fixes for market UI'
        ]
    },
    {
        version: '1.21.0',
        date: '2023-12-01',
        title: 'Major Balance Patch',
        changes: [
            'Comprehensive balance update for all weapon trees',
            'Changes to ability cooldowns and damage values',
            'New armor set added: Arcane Set',
            'Quality of life improvements to inventory management'
        ]
    }
];

function loadUpdates() {
    const container = document.getElementById('updates-list');
    container.innerHTML = '<div class="loading-text">Cargando historial de updates...</div>';
    
    setTimeout(() => {
        const versionFilter = document.getElementById('update-version').value;
        let filtered = updatesData;
        
        if (versionFilter === 'latest') {
            filtered = updatesData.slice(0, 3);
        }
        
        renderUpdates(filtered);
    }, 300);
}

function renderUpdates(updates) {
    const container = document.getElementById('updates-list');
    
    if (updates.length === 0) {
        container.innerHTML = '<p class="loading-text">No hay updates disponibles</p>';
        return;
    }
    
    container.innerHTML = updates.map(update => `
        <div class="update-card">
            <div>
                <span class="version">${update.version}</span>
                <span class="date">${formatDate(update.date)}</span>
            </div>
            <h3 style="color: var(--primary); margin-top: 5px;">${update.title}</h3>
            <ul class="changes">
                ${update.changes.map(change => `<li>${change}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Event listeners para filtros
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('update-version').addEventListener('change', loadUpdates);
});