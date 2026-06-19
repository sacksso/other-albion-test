let goldChart = null;

async function loadGoldData() {
    try {
        const data = await AlbionAPI.getGoldPrice();
        const prices = Array.isArray(data) ? data : generateMockGoldData();
        updateGoldUI(prices);
    } catch (error) {
        console.error('Error cargando precio del oro:', error);
        const mockData = generateMockGoldData();
        updateGoldUI(mockData);
        showToast('Usando datos de demostración para el oro', 'info');
    }
}

function updateGoldUI(data) {
    if (!data || data.length === 0) {
        data = generateMockGoldData();
    }
    
    const currentPrice = data[data.length - 1] || 3500;
    
    document.getElementById('gold-price').textContent = formatGoldPrice(currentPrice);
    
    const previousPrice = data[data.length - 2] || currentPrice;
    const change = ((currentPrice - previousPrice) / previousPrice * 100);
    const changeElement = document.getElementById('gold-change');
    changeElement.innerHTML = `${change >= 0 ? '<i class="fas fa-arrow-up"></i>' : '<i class="fas fa-arrow-down"></i>'} ${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
    changeElement.className = `gold-change ${change < 0 ? 'negative' : ''}`;
    
    const high = Math.max(...data);
    const low = Math.min(...data);
    document.getElementById('gold-high').textContent = formatGoldPrice(high);
    document.getElementById('gold-low').textContent = formatGoldPrice(low);
    document.getElementById('gold-volume').textContent = Math.floor(Math.random() * 10000 + 5000).toLocaleString();
    
    createGoldChart(data);
}

function generateMockGoldData() {
    const data = [];
    let price = 3500 + Math.random() * 500;
    for (let i = 0; i < 24; i++) {
        price += (Math.random() - 0.5) * 100;
        price = Math.max(2500, Math.min(6000, price));
        data.push(Math.round(price));
    }
    return data;
}

function createGoldChart(data) {
    const ctx = document.getElementById('goldChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    if (goldChart) { 
        goldChart.destroy(); 
        goldChart = null;
    }
    
    const labels = data.map((_, i) => {
        const hours = 23 - i;
        return `${hours}:00`;
    }).reverse();
    
    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
    const textColor = isLightTheme ? '#2d1f0e' : '#e6d5b8';
    const gridColor = isLightTheme ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)';
    
    goldChart = new Chart(context, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Precio del Oro (Silver)',
                data: [...data].reverse(),
                borderColor: '#c9a84c',
                backgroundColor: 'rgba(201, 168, 76, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: '#c9a84c',
                pointBorderColor: '#c9a84c',
                pointBorderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    labels: { 
                        color: textColor,
                        font: { size: 12 }
                    } 
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Precio: ' + formatGoldPrice(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                x: { 
                    grid: { color: gridColor }, 
                    ticks: { color: '#8a7a5a', font: { size: 10 } }
                },
                y: { 
                    grid: { color: gridColor }, 
                    ticks: { 
                        color: '#8a7a5a', 
                        font: { size: 10 },
                        callback: function(value) { return formatGoldPrice(value); } 
                    } 
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function formatGoldPrice(price) {
    if (price >= 1000) return (price / 1000).toFixed(1) + 'K';
    return price.toString();
}

// Actualizar gráfico cuando cambie el tema
document.addEventListener('themeChanged', function() {
    if (goldChart) {
        const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
        const textColor = isLightTheme ? '#2d1f0e' : '#e6d5b8';
        const gridColor = isLightTheme ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)';
        
        goldChart.options.plugins.legend.labels.color = textColor;
        goldChart.options.scales.x.grid.color = gridColor;
        goldChart.options.scales.y.grid.color = gridColor;
        goldChart.update();
    }
});