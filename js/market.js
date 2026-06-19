let marketData = [];

async function loadMarketData() {
    const tbody = document.getElementById('market-data');
    tbody.innerHTML = '<tr><td colspan="6" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Cargando datos del mercado...</td></tr>';
    
    try {
        // Usar la API que siempre devuelve datos de ejemplo
        const data = await AlbionAPI.getMarketPrices();
        marketData = data;
        renderMarketTable(marketData);
        showToast('Mercado actualizado con datos de ejemplo', 'success');
    } catch (error) {
        console.error('Error cargando mercado:', error);
        const mockData = getMockMarketData();
        marketData = mockData;
        renderMarketTable(mockData);
        showToast('Usando datos de demostración', 'info');
    }
}

function renderMarketTable(data) {
    const tbody = document.getElementById('market-data');
    
    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading-text">No se encontraron objetos</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.slice(0, 50).map(item => `
        <tr>
            <td><strong>${item.item_id || item.item || 'Unknown'}</strong></td>
            <td>${item.city || 'N/A'}</td>
            <td>${formatPrice(item.price || 0)}</td>
            <td>${item.quality || 'Normal'}</td>
            <td>${'✦'.repeat(item.enchantment || 0) || '—'}</td>
            <td>${item.available || Math.floor(Math.random() * 100)}</td>
        </tr>
    `).join('');
}

function searchMarket() {
    const searchTerm = document.getElementById('item-search').value.toLowerCase();
    const city = document.getElementById('city-filter').value;
    const quality = document.getElementById('quality-filter').value;
    const enchant = document.getElementById('enchant-filter').value;
    
    let filtered = marketData.length ? marketData : getMockMarketData();
    
    filtered = filtered.filter(item => {
        const itemName = (item.item_id || item.item || '').toLowerCase();
        const itemCity = (item.city || '').toLowerCase();
        const itemQuality = (item.quality || '').toLowerCase();
        const itemEnchant = (item.enchantment || 0).toString();
        
        const matchSearch = itemName.includes(searchTerm);
        const matchCity = city === 'all' || itemCity === city;
        const matchQuality = quality === 'all' || itemQuality === quality;
        const matchEnchant = enchant === 'all' || itemEnchant === enchant;
        
        return matchSearch && matchCity && matchQuality && matchEnchant;
    });
    
    renderMarketTable(filtered);
    if (filtered.length === 0) {
        showToast('No se encontraron resultados con esos filtros', 'info');
    }
}

function formatPrice(price) {
    if (price >= 1000000) return (price / 1000000).toFixed(1) + 'M';
    if (price >= 1000) return (price / 1000).toFixed(1) + 'K';
    return price.toString();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const cityFilter = document.getElementById('city-filter');
    const qualityFilter = document.getElementById('quality-filter');
    const enchantFilter = document.getElementById('enchant-filter');
    const searchInput = document.getElementById('item-search');
    
    if (cityFilter) cityFilter.addEventListener('change', searchMarket);
    if (qualityFilter) qualityFilter.addEventListener('change', searchMarket);
    if (enchantFilter) enchantFilter.addEventListener('change', searchMarket);
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') searchMarket();
        });
    }
});