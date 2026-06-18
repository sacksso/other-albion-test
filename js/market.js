// Datos de mercado simulados (en producción usarías una API real)
const mockMarketData = [
    { item: 'Tier 4 Axe', city: 'Caerleon', price: 12500, quality: 'Normal', enchant: 0, available: 45 },
    { item: 'Tier 5 Bow', city: 'Bridgewatch', price: 18750, quality: 'Good', enchant: 1, available: 23 },
    { item: 'Tier 6 Mage Staff', city: 'Martlock', price: 32400, quality: 'Outstanding', enchant: 2, available: 12 },
    { item: 'Tier 4 Leather Armor', city: 'Thelford', price: 8900, quality: 'Normal', enchant: 0, available: 67 },
    { item: 'Tier 5 Plate Helmet', city: 'Fort Sterling', price: 15200, quality: 'Excellent', enchant: 1, available: 34 },
    { item: 'Tier 6 Cloth Shoes', city: 'Lymhurst', price: 21900, quality: 'Masterpiece', enchant: 3, available: 8 },
    { item: 'Tier 7 Sword', city: 'Caerleon', price: 45600, quality: 'Good', enchant: 1, available: 15 },
    { item: 'Tier 4 Nature Staff', city: 'Bridgewatch', price: 14300, quality: 'Normal', enchant: 0, available: 28 },
    { item: 'Tier 5 Shield', city: 'Martlock', price: 16800, quality: 'Outstanding', enchant: 2, available: 19 },
    { item: 'Tier 6 Cape', city: 'Thelford', price: 25700, quality: 'Excellent', enchant: 1, available: 31 },
];

let marketData = [...mockMarketData];

function loadMarketData() {
    const tbody = document.getElementById('market-data');
    tbody.innerHTML = '<tr><td colspan="6" class="loading-text">Cargando datos del mercado...</td></tr>';
    
    // Simular carga de datos
    setTimeout(() => {
        renderMarketTable(marketData);
    }, 500);
}

function renderMarketTable(data) {
    const tbody = document.getElementById('market-data');
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading-text">No se encontraron objetos</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.map(item => `
        <tr>
            <td><strong>${item.item}</strong></td>
            <td>${item.city}</td>
            <td>${formatPrice(item.price)}</td>
            <td>${item.quality}</td>
            <td>${'✦'.repeat(item.enchant) || '—'}</td>
            <td>${item.available}</td>
        </tr>
    `).join('');
}

function searchMarket() {
    const searchTerm = document.getElementById('item-search').value.toLowerCase();
    const city = document.getElementById('city-filter').value;
    const quality = document.getElementById('quality-filter').value;
    
    let filtered = mockMarketData.filter(item => {
        const matchSearch = item.item.toLowerCase().includes(searchTerm);
        const matchCity = city === 'all' || item.city.toLowerCase() === city;
        const matchQuality = quality === 'all' || item.quality.toLowerCase() === quality;
        return matchSearch && matchCity && matchQuality;
    });
    
    renderMarketTable(filtered);
}

function formatPrice(price) {
    if (price >= 1000000) {
        return (price / 1000000).toFixed(1) + 'M';
    } else if (price >= 1000) {
        return (price / 1000).toFixed(1) + 'K';
    }
    return price.toString();
}

// Event listeners para filtros
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('city-filter').addEventListener('change', searchMarket);
    document.getElementById('quality-filter').addEventListener('change', searchMarket);
    document.getElementById('item-search').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') searchMarket();
    });
});