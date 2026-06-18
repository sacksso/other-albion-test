let goldChart = null;

function loadGoldData() {
    // Simular datos de precio del oro
    const mockGoldData = generateMockGoldData();
    const currentPrice = mockGoldData[mockGoldData.length - 1];
    
    // Actualizar precio actual
    document.getElementById('gold-price').textContent = formatPrice(currentPrice);
    
    // Calcular cambio
    const previousPrice = mockGoldData[mockGoldData.length - 2] || currentPrice;
    const change = ((currentPrice - previousPrice) / previousPrice * 100);
    const changeElement = document.getElementById('gold-change');
    changeElement.innerHTML = `${change >= 0 ? '<i class="fas fa-arrow-up"></i>' : '<i class="fas fa-arrow-down"></i>'} ${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
    changeElement.className = `gold-change ${change < 0 ? 'negative' : ''}`;
    
    // Actualizar stats
    const high = Math.max(...mockGoldData);
    const low = Math.min(...mockGoldData);
    document.getElementById('gold-high').textContent = formatPrice(high);
    document.getElementById('gold-low').textContent = formatPrice(low);
    document.getElementById('gold-volume').textContent = Math.floor(Math.random() * 10000 + 5000).toLocaleString();
    
    // Crear gráfico
    createGoldChart(mockGoldData);
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
    const ctx = document.getElementById('goldChart').getContext('2d');
    
    if (goldChart) {
        goldChart.destroy();
    }
    
    const labels = data.map((_, i) => {
        const hours = 23 - i;
        return `${hours}:00`;
    }).reverse();
    
    goldChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Precio del Oro (Silver)',
                data: data.reverse(),
                borderColor: '#c9a84c',
                backgroundColor: 'rgba(201, 168, 76, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: '#c9a84c'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#e6d5b8'
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#8a7a5a'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#8a7a5a',
                        callback: function(value) {
                            return formatPrice(value);
                        }
                    }
                }
            }
        }
    });
}

function formatPrice(price) {
    if (price >= 1000) {
        return (price / 1000).toFixed(1) + 'K';
    }
    return price.toString();
}