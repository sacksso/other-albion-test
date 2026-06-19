class ItemCalculator {
    static tierBaseStats = {
        4: { power: 100, cost: 5000 },
        5: { power: 150, cost: 12000 },
        6: { power: 220, cost: 25000 },
        7: { power: 310, cost: 50000 },
        8: { power: 420, cost: 100000 }
    };
    
    static qualityMultiplier = {
        'Normal': 1.0,
        'Good': 1.1,
        'Outstanding': 1.25,
        'Excellent': 1.45,
        'Masterpiece': 1.7
    };
    
    static enchantMultiplier = {
        0: 1.0,
        1: 1.2,
        2: 1.5,
        3: 2.0
    };

    static calculatePower(tier, quality = 'Normal', enchant = 0) {
        const baseStats = this.tierBaseStats[tier];
        if (!baseStats) return 0;
        const qualityMult = this.qualityMultiplier[quality] || 1.0;
        const enchantMult = this.enchantMultiplier[enchant] || 1.0;
        return Math.round(baseStats.power * qualityMult * enchantMult);
    }

    static estimatePrice(tier, quality = 'Normal', enchant = 0) {
        const baseStats = this.tierBaseStats[tier];
        if (!baseStats) return 0;
        const qualityMult = this.qualityMultiplier[quality] || 1.0;
        const enchantMult = this.enchantMultiplier[enchant] || 1.0;
        return Math.round(baseStats.cost * qualityMult * enchantMult);
    }

    static calculateEfficiency(tier, quality = 'Normal', enchant = 0) {
        const power = this.calculatePower(tier, quality, enchant);
        const price = this.estimatePrice(tier, quality, enchant);
        if (price === 0) return 0;
        return Math.round((power / price) * 1000) / 1000;
    }

    static compareItems(item1, item2) {
        const power1 = this.calculatePower(item1.tier, item1.quality, item1.enchant);
        const power2 = this.calculatePower(item2.tier, item2.quality, item2.enchant);
        const price1 = this.estimatePrice(item1.tier, item1.quality, item1.enchant);
        const price2 = this.estimatePrice(item2.tier, item2.quality, item2.enchant);
        return {
            powerDiff: power1 - power2,
            priceDiff: price1 - price2,
            efficiencyDiff: (power1/price1) - (power2/price2),
            recommendation: power1 > power2 ? 'Item 1 es más poderoso' : 'Item 2 es más poderoso'
        };
    }
}

function renderCalculatorUI() {
    return `
        <div class="calculator-container">
            <div class="calc-section">
                <h3>📊 Calcular Poder del Item</h3>
                <div class="calc-inputs">
                    <select id="calc-tier">
                        <option value="4">Tier 4</option>
                        <option value="5">Tier 5</option>
                        <option value="6" selected>Tier 6</option>
                        <option value="7">Tier 7</option>
                        <option value="8">Tier 8</option>
                    </select>
                    <select id="calc-quality">
                        <option value="Normal">Normal</option>
                        <option value="Good">Good</option>
                        <option value="Outstanding">Outstanding</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Masterpiece">Masterpiece</option>
                    </select>
                    <select id="calc-enchant">
                        <option value="0">Sin Encantamiento</option>
                        <option value="1">Nivel 1</option>
                        <option value="2">Nivel 2</option>
                        <option value="3">Nivel 3</option>
                    </select>
                    <button onclick="calculateItemStats()"><i class="fas fa-calculator"></i> Calcular</button>
                </div>
                <div id="calc-results" class="calc-results">
                    <p style="color: var(--text-dark);">Selecciona opciones y presiona calcular</p>
                </div>
            </div>

            <div class="calc-section">
                <h3>⚔️ Comparador de Items</h3>
                <div class="calc-inputs">
                    <div class="item-input-group">
                        <h4>Item 1</h4>
                        <select class="item-tier" data-item="1">
                            <option value="4">Tier 4</option>
                            <option value="5">Tier 5</option>
                            <option value="6">Tier 6</option>
                            <option value="7">Tier 7</option>
                            <option value="8">Tier 8</option>
                        </select>
                        <select class="item-quality" data-item="1">
                            <option value="Normal">Normal</option>
                            <option value="Good">Good</option>
                            <option value="Outstanding">Outstanding</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Masterpiece">Masterpiece</option>
                        </select>
                        <select class="item-enchant" data-item="1">
                            <option value="0">Sin Encantamiento</option>
                            <option value="1">Nivel 1</option>
                            <option value="2">Nivel 2</option>
                            <option value="3">Nivel 3</option>
                        </select>
                    </div>
                    <div class="vs-divider">VS</div>
                    <div class="item-input-group">
                        <h4>Item 2</h4>
                        <select class="item-tier" data-item="2">
                            <option value="4">Tier 4</option>
                            <option value="5">Tier 5</option>
                            <option value="6">Tier 6</option>
                            <option value="7">Tier 7</option>
                            <option value="8" selected>Tier 8</option>
                        </select>
                        <select class="item-quality" data-item="2">
                            <option value="Normal">Normal</option>
                            <option value="Good">Good</option>
                            <option value="Outstanding">Outstanding</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Masterpiece" selected>Masterpiece</option>
                        </select>
                        <select class="item-enchant" data-item="2">
                            <option value="0">Sin Encantamiento</option>
                            <option value="1">Nivel 1</option>
                            <option value="2" selected>Nivel 2</option>
                            <option value="3">Nivel 3</option>
                        </select>
                    </div>
                </div>
                <button onclick="compareItems()" style="background: var(--primary); color: var(--secondary); border: none; padding: 10px 30px; border-radius: var(--radius); cursor: pointer; font-weight: bold;"><i class="fas fa-balance-scale"></i> Comparar</button>
                <div id="compare-results" class="calc-results" style="margin-top: 15px;">
                    <p style="color: var(--text-dark);">Selecciona items y presiona comparar</p>
                </div>
            </div>
        </div>
    `;
}

function calculateItemStats() {
    const tier = parseInt(document.getElementById('calc-tier').value);
    const quality = document.getElementById('calc-quality').value;
    const enchant = parseInt(document.getElementById('calc-enchant').value);

    const power = ItemCalculator.calculatePower(tier, quality, enchant);
    const price = ItemCalculator.estimatePrice(tier, quality, enchant);
    const efficiency = ItemCalculator.calculateEfficiency(tier, quality, enchant);

    document.getElementById('calc-results').innerHTML = `
        <div class="result-card">
            <div class="result-item">
                <span class="label">⚔️ Poder:</span>
                <span class="value">${power}</span>
            </div>
            <div class="result-item">
                <span class="label">💰 Precio estimado:</span>
                <span class="value">${price.toLocaleString()} Silver</span>
            </div>
            <div class="result-item">
                <span class="label">📊 Eficiencia:</span>
                <span class="value">${efficiency}</span>
            </div>
            <div class="result-item">
                <span class="label">✨ Calidad:</span>
                <span class="value">${quality} (${(ItemCalculator.qualityMultiplier[quality] * 100).toFixed(0)}%)</span>
            </div>
            <div class="result-item">
                <span class="label">⚡ Encantamiento:</span>
                <span class="value">Nivel ${enchant} (${(ItemCalculator.enchantMultiplier[enchant] * 100).toFixed(0)}%)</span>
            </div>
        </div>
    `;
}

function compareItems() {
    const getItemData = (num) => {
        const tier = parseInt(document.querySelector(`.item-tier[data-item="${num}"]`).value);
        const quality = document.querySelector(`.item-quality[data-item="${num}"]`).value;
        const enchant = parseInt(document.querySelector(`.item-enchant[data-item="${num}"]`).value);
        return { tier, quality, enchant };
    };

    const item1 = getItemData('1');
    const item2 = getItemData('2');

    const power1 = ItemCalculator.calculatePower(item1.tier, item1.quality, item1.enchant);
    const power2 = ItemCalculator.calculatePower(item2.tier, item2.quality, item2.enchant);
    const price1 = ItemCalculator.estimatePrice(item1.tier, item1.quality, item1.enchant);
    const price2 = ItemCalculator.estimatePrice(item2.tier, item2.quality, item2.enchant);
    const eff1 = ItemCalculator.calculateEfficiency(item1.tier, item1.quality, item1.enchant);
    const eff2 = ItemCalculator.calculateEfficiency(item2.tier, item2.quality, item2.enchant);

    document.getElementById('compare-results').innerHTML = `
        <div class="compare-results">
            <div class="compare-item ${power1 > power2 ? 'winner' : ''}">
                <h4>📦 Item 1</h4>
                <p style="color: var(--text-dark);">Tier ${item1.tier} · ${item1.quality} · Encantamiento ${item1.enchant}</p>
                <div class="stat">⚔️ Poder: ${power1}</div>
                <div class="stat">💰 Precio: ${price1.toLocaleString()}</div>
                <div class="stat">📊 Eficiencia: ${eff1}</div>
                ${power1 > power2 ? '🏆 <strong style="color: var(--primary);">¡Ganador!</strong>' : ''}
            </div>
            <div class="compare-item ${power2 > power1 ? 'winner' : ''}">
                <h4>📦 Item 2</h4>
                <p style="color: var(--text-dark);">Tier ${item2.tier} · ${item2.quality} · Encantamiento ${item2.enchant}</p>
                <div class="stat">⚔️ Poder: ${power2}</div>
                <div class="stat">💰 Precio: ${price2.toLocaleString()}</div>
                <div class="stat">📊 Eficiencia: ${eff2}</div>
                ${power2 > power1 ? '🏆 <strong style="color: var(--primary);">¡Ganador!</strong>' : ''}
            </div>
            <div class="compare-diff">
                <h4 style="color: var(--primary);">📈 Diferencia</h4>
                <div class="stat ${power1 > power2 ? 'positive' : 'negative'}">
                    ⚔️ ${(power1 - power2) > 0 ? '+' : ''}${power1 - power2}
                </div>
                <div class="stat ${price1 < price2 ? 'positive' : 'negative'}">
                    💰 ${(price1 - price2) > 0 ? '+' : ''}${(price1 - price2).toLocaleString()}
                </div>
                <div class="stat ${eff1 > eff2 ? 'positive' : 'negative'}">
                    📊 ${(eff1 - eff2) > 0 ? '+' : ''}${(eff1 - eff2).toFixed(3)}
                </div>
                <div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-dark);">
                    ${power1 > power2 ? '✅ Item 1 es más poderoso' : '✅ Item 2 es más poderoso'}
                </div>
            </div>
        </div>
    `;
}