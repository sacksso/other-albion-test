let currentZoom = 1;

function zoomIn() {
    currentZoom = Math.min(currentZoom + 0.2, 3);
    applyZoom();
}

function zoomOut() {
    currentZoom = Math.max(currentZoom - 0.2, 0.5);
    applyZoom();
}

function resetZoom() {
    currentZoom = 1;
    applyZoom();
}

function applyZoom() {
    const mapImage = document.getElementById('map-image');
    if (mapImage) {
        mapImage.style.transform = `scale(${currentZoom})`;
        mapImage.style.transformOrigin = 'center center';
        mapImage.style.transition = 'transform 0.3s ease';
    }
}

// Simular clic en zonas del mapa con más detalles
document.addEventListener('DOMContentLoaded', function() {
    const mapImage = document.getElementById('map-image');
    if (mapImage) {
        mapImage.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
            const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
            
            const zones = [
                { name: 'Bosque de Caerleon', tier: 5, biome: 'Bosque', resources: 'Madera', danger: 'Medio', mobs: 'Bandidos, Lobos' },
                { name: 'Desierto de Bridgewatch', tier: 6, biome: 'Desierto', resources: 'Mineral', danger: 'Alto', mobs: 'Escorpiones, Genios' },
                { name: 'Montañas de Martlock', tier: 7, biome: 'Montaña', resources: 'Piedra', danger: 'Muy Alto', mobs: 'Gigantes, Golems' },
                { name: 'Pantano de Thelford', tier: 5, biome: 'Pantano', resources: 'Algodón', danger: 'Medio', mobs: 'Slimes, Arácnidos' },
                { name: 'Pradera de Lymhurst', tier: 4, biome: 'Pradera', resources: 'Piel', danger: 'Bajo', mobs: 'Jabalíes, Ciervos' },
                { name: 'Tundra de Fort Sterling', tier: 6, biome: 'Tundra', resources: 'Madera', danger: 'Alto', mobs: 'Yetis, Lobos de hielo' },
                { name: 'Estepa de Mercia', tier: 8, biome: 'Estepa', resources: 'Mixto', danger: 'Extremo', mobs: 'Jefes de facción' },
                { name: 'Costa de Anglia', tier: 5, biome: 'Costa', resources: 'Pescado', danger: 'Bajo', mobs: 'Piratas, Cangrejos' }
            ];
            
            const randomZone = zones[Math.floor(Math.random() * zones.length)];
            
            document.getElementById('zone-details').innerHTML = `
                <div style="padding: 10px; animation: fadeIn 0.3s ease;">
                    <h4 style="color: var(--primary); font-size: 1.2rem;">📍 ${randomZone.name}</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px;">
                        <div><strong>📌 Posición:</strong><br>X: ${x}% | Y: ${y}%</div>
                        <div><strong>🏷️ Tier:</strong><br>${randomZone.tier}</div>
                        <div><strong>🌿 Bioma:</strong><br>${randomZone.biome}</div>
                        <div><strong>🪓 Recursos:</strong><br>${randomZone.resources}</div>
                        <div><strong>⚠️ Peligro:</strong><br>${randomZone.danger}</div>
                        <div><strong>👾 Enemigos:</strong><br>${randomZone.mobs}</div>
                    </div>
                    <p style="color: var(--text-dark); font-size: 0.85rem; margin-top: 15px; border-top: 1px solid var(--border); padding-top: 10px;">
                        <i class="fas fa-info-circle"></i> Haz clic en otra zona para actualizar
                    </p>
                </div>
            `;
        });
    }
});