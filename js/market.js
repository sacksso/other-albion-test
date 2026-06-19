let marketData = [];

async function loadMarketData() {
    const tbody = document.getElementById('market-data');
    tbody.innerHTML = '<tr><td colspan="6" class="loading-text"><i class="fas fa-spinner fa-spin"></i> Cargando datos del mercado...</td></tr>';
    
    try {
        const data = await AlbionAPI.getMarketPrices();
        marketData = data;
        renderMarketTable(marketData);
        showToast('Mercado actualizado', 'success');
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
        const matchSearch = (item.item_id || item.item || '').toLowerCase().includes(searchTerm);
        const matchCity = city === 'all' || (item.city || '').toLowerCase() === city;
        const matchQuality = quality === 'all' || (item.quality || '').toLowerCase() === quality;
        const matchEnchant = enchant === 'all' || (item.enchantment || 0).toString() === enchant;
        return matchSearch && matchCity && matchQuality && matchEnchant;
    });
    
    renderMarketTable(filtered);
    if (filtered.length === 0) {
        showToast('No se encontraron resultados', 'info');
    }
}

function formatPrice(price) {
    if (price >= 1000000) return (price / 1000000).toFixed(1) + 'M';
    if (price >= 1000) return (price / 1000).toFixed(1) + 'K';
    return price.toString();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('city-filter').addEventListener('change', searchMarket);
    document.getElementById('quality-filter').addEventListener('change', searchMarket);
    document.getElementById('enchant-filter').addEventListener('change', searchMarket);
    document.getElementById('item-search').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') searchMarket();
    });
});