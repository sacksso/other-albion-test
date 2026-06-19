// API Configuration
const API_CONFIG = {
    albionData: 'https://api.albion-online-data.com/api/v2',
    goldApi: 'https://api.albion-online-data.com/api/v1/stats/gold',
    marketApi: 'https://api.albion-online-data.com/api/v2/stats/prices',
};

class AlbionAPI {
    static async getMarketPrices(items = [], cities = [], qualities = []) {
        try {
            const params = new URLSearchParams();
            if (items.length) params.append('item_ids', items.join(','));
            if (cities.length) params.append('locations', cities.join(','));
            if (qualities.length) params.append('qualities', qualities.join(','));
            
            const url = `${API_CONFIG.marketApi}?${params.toString()}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtener datos del mercado');
            return await response.json();
        } catch (error) {
            console.error('Market API Error:', error);
            return getMockMarketData();
        }
    }

    static async getGoldPrice() {
        try {
            const response = await fetch(API_CONFIG.goldApi);
            if (!response.ok) throw new Error('Error al obtener precio del oro');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Gold API Error:', error);
            return getMockGoldData();
        }
    }

    static async getNews(lang = 'en') {
        try {
            const rssUrl = `https://albiononline.com/en/news.rss`;
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
            if (!response.ok) throw new Error('Error al obtener noticias');
            const data = await response.json();
            return data.items.map(item => ({
                title: item.title,
                excerpt: item.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
                date: item.pubDate,
                link: item.link,
                image: item.thumbnail || 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Albion+News'
            }));
        } catch (error) {
            console.error('News API Error:', error);
            return getMockNews();
        }
    }

    static async getBuilds(type = 'all', weapon = 'all') {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            return getMockBuilds(type, weapon);
        } catch (error) {
            console.error('Builds API Error:', error);
            return getMockBuilds(type, weapon);
        }
    }

    static async getUpdates() {
        try {
            const blogUrl = 'https://albiononline.com/en/changelog.rss';
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(blogUrl)}`);
            if (!response.ok) throw new Error('Error al obtener updates');
            const data = await response.json();
            return data.items.map(item => ({
                version: item.title.match(/v?(\d+\.\d+\.\d+)/)?.[1] || 'Latest',
                date: item.pubDate,
                title: item.title,
                changes: item.description.split('\n').filter(line => line.trim())
            }));
        } catch (error) {
            console.error('Updates API Error:', error);
            return getMockUpdates();
        }
    }

    static async getStreamers() {
        return [
            { name: 'AlbionTV', platform: 'twitch', url: 'https://www.twitch.tv/albiononline', viewers: '2.5K' },
            { name: 'Nausk', platform: 'twitch', url: 'https://www.twitch.tv/nausk', viewers: '1.2K' },
            { name: 'Lilith', platform: 'twitch', url: 'https://www.twitch.tv/lilith_albion', viewers: '800' },
            { name: 'Lewpac', platform: 'youtube', url: 'https://www.youtube.com/c/Lewpac', subscribers: '45K' },
            { name: 'Victory', platform: 'youtube', url: 'https://www.youtube.com/c/VictoryAlbion', subscribers: '28K' }
        ];
    }
}

// ===== MOCK DATA (Fallback cuando la API falla) =====
function getMockMarketData() {
    const items = ['T4_AXE', 'T5_BOW', 'T6_FIRE_STAFF', 'T4_LEATHER_ARMOR', 'T5_PLATE_HELMET', 'T6_CLOTH_SHOES', 'T7_SWORD'];
    const cities = ['Caerleon', 'Bridgewatch', 'Martlock', 'Thelford', 'Fort Sterling', 'Lymhurst'];
    const qualities = ['Normal', 'Good', 'Outstanding', 'Excellent', 'Masterpiece'];
    return items.map(item => ({
        item_id: item,
        city: cities[Math.floor(Math.random() * cities.length)],
        price: Math.floor(Math.random() * 50000 + 5000),
        quality: qualities[Math.floor(Math.random() * qualities.length)],
        enchantment: Math.floor(Math.random() * 4),
        available: Math.floor(Math.random() * 100)
    }));
}

function getMockGoldData() {
    const data = [];
    let price = 3500 + Math.random() * 500;
    for (let i = 0; i < 24; i++) {
        price += (Math.random() - 0.5) * 100;
        price = Math.max(2500, Math.min(6000, price));
        data.push(Math.round(price));
    }
    return data;
}

function getMockNews() {
    return [
        { title: 'Albion Online: New Update Coming Soon', excerpt: 'The developers have announced a major update...', date: new Date().toISOString(), link: '#', image: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Update' },
        { title: 'Crystal League Season 23 Begins', excerpt: 'The new season brings fresh rewards and challenges...', date: new Date().toISOString(), link: '#', image: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Crystal+League' }
    ];
}

function getMockBuilds(type, weapon) {
    const builds = [
        { id: 1, name: 'Claw Assassin', type: 'pvp', weapons: ['Claws', 'Poison Potion'], description: 'Build de asesinato rápido para PVP. Ideal para ganking.', armor: ['Assassin Jacket', 'Assassin Hood', 'Assassin Boots'], tier: '5-6', rating: 4.5 },
        { id: 2, name: 'Nature Healer', type: 'pve', weapons: ['Nature Staff', 'Shield'], description: 'Build de curación para PVE. Mantén a tu equipo vivo.', armor: ['Druid Robe', 'Scholar Hood', 'Knight Boots'], tier: '6-7', rating: 4.8 },
        { id: 3, name: 'Frost Mage', type: 'pvp', weapons: ['Frost Staff', 'Cleric Robe'], description: 'Control de masas y daño en área. Perfecto para ZvZ.', armor: ['Cleric Robe', 'Mage Cowl', 'Scholar Boots'], tier: '5-7', rating: 4.2 },
        { id: 4, name: 'Great Axe Bruiser', type: 'pve', weapons: ['Great Axe', 'Demon Cape'], description: 'Daño sostenido y sobrevivencia. Excelente para farmeo.', armor: ['Soldier Armor', 'Guardian Helmet', 'Soldier Boots'], tier: '4-6', rating: 4.0 },
        { id: 5, name: 'Gathering Specialist', type: 'gathering', weapons: ['Skinning Knife', 'Prospector\'s Backpack'], description: 'Optimizado para recolectar recursos con máxima eficiencia.', armor: ['Gathering Gear', 'Miner Helmet', 'Lumberjack Boots'], tier: '5-8', rating: 4.6 },
        { id: 6, name: 'Light Crossbow Sniper', type: 'pvp', weapons: ['Light Crossbow', 'Pancake'], description: 'Alto daño a distancia. Perfecto para apoyar desde atrás.', armor: ['Druid Robe', 'Scholar Hood', 'Knight Boots'], tier: '6-8', rating: 4.3 }
    ];
    let filtered = builds;
    if (type !== 'all') filtered = filtered.filter(b => b.type === type);
    if (weapon !== 'all') filtered = filtered.filter(b => b.weapons.some(w => w.toLowerCase().includes(weapon)));
    return filtered;
}

function getMockUpdates() {
    return [
        { version: '1.23.0', date: new Date().toISOString(), title: 'Season 23: Crystal League Renewed', changes: ['New Crystal League season', 'Balance adjustments to 15 weapons', 'New cosmetic items', 'Bug fixes'] },
        { version: '1.22.1', date: new Date().toISOString(), title: 'Hotfix: Performance Improvements', changes: ['Optimized server performance', 'Fixed memory leak issues', 'Minor UI improvements'] },
        { version: '1.22.0', date: new Date().toISOString(), title: 'New Year Event Update', changes: ['New Year special event', 'New mounts added', 'Balance changes to gathering tools'] }
    ];
}