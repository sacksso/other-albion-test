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
    }
}

// Simular clic en zonas del mapa
document.addEventListener('DOMContentLoaded', function() {
    const mapImage = document.getElementById('map-image');
    if (mapImage) {
        mapImage.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
            const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
            
            const zones = [
                { name: 'Bosque de Caerleon', tier: 5, biome: 'Bosque', resources: 'Madera' },
                { name: 'Desierto de Bridgewatch', tier: 6, biome: 'Desierto', resources: 'Mineral' },
                { name: 'Montañas de Martlock', tier: 7, biome: 'Montaña', resources: 'Piedra' },
                { name: 'Pantano de Thelford', tier: 5, biome: 'Pantano', resources: 'Algodón' },
                { name: 'Pradera de Lymhurst', tier: 4, biome: 'Pradera', resources: 'Piel' },
                { name: 'Tundra de Fort Sterling', tier: 6, biome: 'Tundra', resources: 'Madera' }
            ];
            
            const randomZone = zones[Math.floor(Math.random() * zones.length)];
            
            document.getElementById('zone-details').innerHTML = `
                <div style="padding: 10px;">
                    <h4 style="color: var(--primary);">📍 ${randomZone.name}</h4>
                    <p><strong>📌 Posición:</strong> X: ${x}% | Y: ${y}%</p>
                    <p><strong>🏷️ Tier:</strong> ${randomZone.tier}</p>
                    <p><strong>🌿 Bioma:</strong> ${randomZone.biome}</p>
                    <p><strong>🪓 Recursos:</strong> ${randomZone.resources}</p>
                    <p><strong>⚔️ Nivel de peligro:</strong> ${['Bajo', 'Medio', 'Alto', 'Extremo'][Math.floor(Math.random() * 4)]}</p>
                    <p style="color: var(--text-dark); font-size: 0.85rem; margin-top: 10px;">
                        <i class="fas fa-info-circle"></i> Haz clic en otra zona para actualizar
                    </p>
                </div>
            `;
        });
    }
});