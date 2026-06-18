// Datos de builds (simulados)
const buildsData = [
    {
        id: 1,
        name: 'Claw Assassin',
        type: 'pvp',
        weapons: ['Claws', 'Poison Potion'],
        description: 'Build de asesinato rápido para PVP. Ideal para ganking y eliminaciones rápidas.',
        armor: ['Assassin Jacket', 'Assassin Hood', 'Assassin Boots'],
        tier: 'Tier 5-6',
        rating: 4.5
    },
    {
        id: 2,
        name: 'Nature Healer',
        type: 'pve',
        weapons: ['Nature Staff', 'Shield'],
        description: 'Build de curación para PVE. Mantén a tu equipo vivo en las dungeons más difíciles.',
        armor: ['Druid Robe', 'Scholar Hood', 'Knight Boots'],
        tier: 'Tier 6-7',
        rating: 4.8
    },
    {
        id: 3,
        name: 'Frost Mage',
        type: 'pvp',
        weapons: ['Frost Staff', 'Cleric Robe'],
        description: 'Control de masas y daño en área. Perfecto para ZvZ y guerras de facciones.',
        armor: ['Cleric Robe', 'Mage Cowl', 'Scholar Boots'],
        tier: 'Tier 5-7',
        rating: 4.2
    },
    {
        id: 4,
        name: 'Great Axe Bruiser',
        type: 'pve',
        weapons: ['Great Axe', 'Demon Cape'],
        description: 'Daño sostenido y sobrevivencia. Excelente para farmeo y dungeons solitarias.',
        armor: ['Soldier Armor', 'Guardian Helmet', 'Soldier Boots'],
        tier: 'Tier 4-6',
        rating: 4.0
    },
    {
        id: 5,
        name: 'Gathering Specialist',
        type: 'gathering',
        weapons: ['Skinning Knife', 'Prospector\'s Backpack'],
        description: 'Optimizado para recolectar recursos rápidamente con máxima eficiencia.',
        armor: ['Gathering Gear', 'Miner Helmet', 'Lumberjack Boots'],
        tier: 'Tier 5-8',
        rating: 4.6
    },
    {
        id: 6,
        name: 'Light Crossbow Sniper',
        type: 'pvp',
        weapons: ['Light Crossbow', 'Pancake'],
        description: 'Alto daño a distancia. Perfecto para apoyar desde atrás en combates organizados.',
        armor: ['Druid Robe', 'Scholar Hood', 'Knight Boots'],
        tier: 'Tier 6-8',
        rating: 4.3
    }
];

function loadBuilds() {
    const container = document.getElementById('builds-container');
    container.innerHTML = '<div class="loading-text">Cargando builds...</div>';
    
    // Simular carga
    setTimeout(() => {
        const type = document.getElementById('build-type').value;
        const weapon = document.getElementById('build-weapon').value;
        
        let filtered = buildsData;
        
        if (type !== 'all') {
            filtered = filtered.filter(b => b.type === type);
        }
        
        if (weapon !== 'all') {
            filtered = filtered.filter(b => 
                b.weapons.some(w => w.toLowerCase().includes(weapon)) ||
                b.armor.some(a => a.toLowerCase().includes(weapon))
            );
        }
        
        renderBuilds(filtered);
    }, 400);
}

function renderBuilds(builds) {
    const container = document.getElementById('builds-container');
    
    if (builds.length === 0) {
        container.innerHTML = '<p class="loading-text">No se encontraron builds con esos filtros</p>';
        return;
    }
    
    container.innerHTML = builds.map(build => `
        <div class="build-card">
            <span class="build-type">${build.type.toUpperCase()}</span>
            <h3>${build.name}</h3>
            <div class="build-weapons">
                <strong>Armas:</strong> ${build.weapons.join(', ')}
            </div>
            <div class="build-weapons">
                <strong>Armadura:</strong> ${build.armor.join(', ')}
            </div>
            <div class="build-description">${build.description}</div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px; color: var(--text-dark);">
                <span>Tier ${build.tier}</span>
                <span>⭐ ${build.rating}</span>
            </div>
        </div>
    `).join('');
}