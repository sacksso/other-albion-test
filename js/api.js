// ====================================================
// VERSIÓN CON DATOS DE EJEMPLO (MOCK DATA) SIEMPRE
// ====================================================

class AlbionAPI {
    // --- MERCADO ---
    static async getMarketPrices(items = [], cities = [], qualities = []) {
        console.warn('Usando datos de ejemplo para el MERCADO');
        return getMockMarketData();
    }

    // --- ORO ---
    static async getGoldPrice() {
        console.warn('Usando datos de ejemplo para el ORO');
        return getMockGoldData();
    }

    // --- NOTICIAS ---
    static async getNews(lang = 'en') {
        console.warn('Usando datos de ejemplo para NOTICIAS');
        return getMockNews();
    }

    // --- BUILDS ---
    static async getBuilds(type = 'all', weapon = 'all') {
        console.warn('Usando datos de ejemplo para BUILDS');
        return getMockBuilds(type, weapon);
    }

    // --- UPDATES ---
    static async getUpdates() {
        console.warn('Usando datos de ejemplo para UPDATES');
        return getMockUpdates();
    }

    // --- STREAMERS ---
    static async getStreamers() {
        console.warn('Usando datos de ejemplo para STREAMERS');
        return [
            { name: 'AlbionTV', platform: 'twitch', url: 'https://www.twitch.tv/albiononline', viewers: '2.5K' },
            { name: 'Nausk', platform: 'twitch', url: 'https://www.twitch.tv/nausk', viewers: '1.2K' },
            { name: 'Lewpac', platform: 'youtube', url: 'https://www.youtube.com/c/Lewpac', subscribers: '45K' },
            { name: 'Victory', platform: 'youtube', url: 'https://www.youtube.com/c/VictoryAlbion', subscribers: '28K' }
        ];
    }
}

// ====================================================
// FUNCIONES DE DATOS DE EJEMPLO (MOCK DATA)
// ====================================================

function getMockMarketData() {
    const items = [
        'Hacha T4', 'Arco T5', 'Bastón de Fuego T6', 'Armadura de Cuero T4',
        'Casco de Placas T5', 'Botas de Tela T6', 'Espada T7',
        'Bastón de la Naturaleza T5', 'Dagas T6', 'Martillo T4'
    ];
    const cities = ['Caerleon', 'Bridgewatch', 'Martlock', 'Thelford', 'Fort Sterling', 'Lymhurst'];
    const qualities = ['Normal', 'Buena', 'Excepcional', 'Excelente', 'Obra Maestra'];
    
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
        { 
            title: '🔥 ¡Nueva Temporada de la Liga de Cristal!', 
            excerpt: 'Comienza la temporada 23 con nuevas recompensas y desafíos épicos. Prepárate para la competencia.', 
            date: new Date().toISOString(), 
            link: '#', 
            image: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Liga+de+Cristal' 
        },
        { 
            title: '❄️ Evento de Invierno en Albion', 
            excerpt: 'Participa en el evento especial de invierno y consigue objetos únicos y cosméticos exclusivos.', 
            date: new Date().toISOString(), 
            link: '#', 
            image: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Evento+Invierno' 
        },
        { 
            title: '📚 Guía para Nuevos Jugadores', 
            excerpt: 'Aprende los fundamentos de Albion Online con esta guía completa para principiantes.', 
            date: new Date().toISOString(), 
            link: '#', 
            image: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Guía+Nuevos' 
        },
        { 
            title: '⚔️ Balance de Armas - Parche 1.23', 
            excerpt: 'Se anuncian cambios importantes en el balance de armas para la próxima temporada.', 
            date: new Date().toISOString(), 
            link: '#', 
            image: 'https://via.placeholder.com/350x200/2d2d2d/c9a84c?text=Balance+Armas' 
        }
    ];
}

function getMockBuilds(type, weapon) {
    const builds = [
        { 
            id: 1, 
            name: 'Asesino de Garras', 
            type: 'pvp', 
            weapons: ['Garras', 'Poción de Veneno'], 
            description: 'Build de asesinato rápido para PVP. Ideal para ganking y eliminaciones rápidas.', 
            armor: ['Chaqueta de Asesino', 'Capucha de Asesino', 'Botas de Asesino'], 
            tier: '5-6', 
            rating: 4.5 
        },
        { 
            id: 2, 
            name: 'Sanador de la Naturaleza', 
            type: 'pve', 
            weapons: ['Bastón de Naturaleza', 'Escudo'], 
            description: 'Build de curación para PVE. Mantén a tu equipo vivo en las dungeons más difíciles.', 
            armor: ['Túnica de Druida', 'Capucha de Erudito', 'Botas de Caballero'], 
            tier: '6-7', 
            rating: 4.8 
        },
        { 
            id: 3, 
            name: 'Mago de Escarcha', 
            type: 'pvp', 
            weapons: ['Bastón de Escarcha', 'Túnica de Clérigo'], 
            description: 'Control de masas y daño en área. Perfecto para ZvZ y guerras de facciones.', 
            armor: ['Túnica de Clérigo', 'Capa de Mago', 'Botas de Erudito'], 
            tier: '5-7', 
            rating: 4.2 
        },
        { 
            id: 4, 
            name: 'Ariete de Gran Hacha', 
            type: 'pve', 
            weapons: ['Gran Hacha', 'Capa de Demonio'], 
            description: 'Daño sostenido y sobrevivencia. Excelente para farmeo y dungeons solitarias.', 
            armor: ['Armadura de Soldado', 'Casco de Guardián', 'Botas de Soldado'], 
            tier: '4-6', 
            rating: 4.0 
        },
        { 
            id: 5, 
            name: 'Especialista en Recolección', 
            type: 'gathering', 
            weapons: ['Cuchillo de Desuello', 'Mochila de Prospector'], 
            description: 'Optimizado para recolectar recursos rápidamente con máxima eficiencia.', 
            armor: ['Equipo de Recolección', 'Casco de Minero', 'Botas de Leñador'], 
            tier: '5-8', 
            rating: 4.6 
        }
    ];
    
    let filtered = builds;
    if (type !== 'all') {
        filtered = filtered.filter(b => b.type === type);
    }
    if (weapon !== 'all') {
        filtered = filtered.filter(b => 
            b.weapons.some(w => w.toLowerCase().includes(weapon)) ||
            b.armor.some(a => a.toLowerCase().includes(weapon))
        );
    }
    return filtered;
}

function getMockUpdates() {
    return [
        { 
            version: '1.23.0', 
            date: new Date().toISOString(), 
            title: 'Temporada 23: Liga de Cristal Renovada', 
            changes: [
                'Nueva temporada de la Liga de Cristal con recompensas actualizadas',
                'Ajustes de balance a 15 armas diferentes',
                'Nuevos objetos cosméticos en la tienda',
                'Corrección de errores en mazmorras'
            ] 
        },
        { 
            version: '1.22.1', 
            date: new Date().toISOString(), 
            title: 'Hotfix: Mejoras de Rendimiento', 
            changes: [
                'Rendimiento del servidor optimizado durante horas pico',
                'Corrección de fugas de memoria',
                'Mejoras menores en la interfaz de usuario',
                'Ajustes de balance en guerras de facciones'
            ] 
        },
        { 
            version: '1.22.0', 
            date: new Date().toISOString(), 
            title: 'Actualización del Evento de Año Nuevo', 
            changes: [
                'Evento especial de Año Nuevo con recompensas únicas',
                'Nuevas monturas añadidas al juego',
                'Cambios de balance a herramientas de recolección',
                'Actualización de localización para múltiples idiomas'
            ] 
        }
    ];
}