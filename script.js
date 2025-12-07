// ==========================================
// 1. Datos Simulados (Mock Data)
// ==========================================

const mockData = {
    stats: {
        inventory: { count: 2543, change: 12.5, type: 'positive' },
        revenue: { count: 45678, change: 8.2, type: 'positive' },
        sales: { count: 1234, change: -3.1, type: 'negative' },
        satisfaction: { count: 4.8, change: 0.3, type: 'positive' }
    },
    activity: [
        // CORRECCIÓN: Se usa Font Awesome para coherencia en la lista de actividad
        { icon: '<i class="fas fa-user-plus"></i>', text: 'Nuevo cliente potencial', time: 'Hace 5 minutos' },
        { icon: '<i class="fas fa-dollar-sign"></i>', text: 'Venta de SUV completada: $23,400', time: 'Hace 15 minutos' },
        { icon: '<i class="fas fa-wrench"></i>', text: 'Cita de servicio agendada', time: 'Hace 1 hora' },
        { icon: '<i class="fas fa-car-side"></i>', text: 'Nuevo modelo agregado al inventario', time: 'Hace 2 horas' },
    ],
    models: [
        { model: 'Sedan Clase C', units: 234, revenue: 12340000 },
        { model: 'SUV Urbano X', units: 189, revenue: 9450000 },
        { model: 'Deportivo GT', units: 156, revenue: 7800000 },
        { model: 'Hatchback Eco', units: 143, revenue: 7150000 },
    ],
    salesChart: [
        { month: 'Ene', value: 60 },
        { month: 'Feb', value: 75 },
        { month: 'Mar', value: 55 },
        { month: 'Abr', value: 85 },
        { month: 'May', value: 70 },
        { month: 'Jun', value: 90 },
    ]
};

// ==========================================
// 2. Funciones de Renderizado
// ==========================================

/**
 * Carga y actualiza los cuadros de estadísticas
 */
function loadStats() {
    const stats = mockData.stats;

    // Autos en Inventario
    document.getElementById('inventory-count').textContent = stats.inventory.count.toLocaleString();
    const invChange = document.getElementById('inventory-change');
    invChange.textContent = `+${stats.inventory.change}%`;
    invChange.className = `stat-change ${stats.inventory.type}`;

    // Ingresos Mensuales
    document.getElementById('monthly-revenue').textContent = `$${stats.revenue.count.toLocaleString()}`;
    const revChange = document.getElementById('revenue-change');
    revChange.textContent = `+${stats.revenue.change}%`;
    revChange.className = `stat-change ${stats.revenue.type}`;

    // Ventas Cerradas
    document.getElementById('sales-closed').textContent = stats.sales.count.toLocaleString();
    const salesChange = document.getElementById('sales-change');
    salesChange.textContent = `${stats.sales.change}%`; // El signo negativo ya está en el dato
    salesChange.className = `stat-change ${stats.sales.type}`;

    // Satisfacción Cliente
    document.getElementById('client-satisfaction').textContent = stats.satisfaction.count;
    const satChange = document.getElementById('satisfaction-change');
    satChange.textContent = `+${stats.satisfaction.change}`;
    satChange.className = `stat-change ${stats.satisfaction.type}`;
}

/**
 * Carga y actualiza la lista de actividad reciente
 */
function loadActivity() {
    const container = document.getElementById('recent-activity-list');
    let html = '';

    mockData.activity.forEach(item => {
        html += `
            <div class="activity-item">
                <div class="activity-icon">${item.icon}</div>
                <div class="activity-content">
                    <p><strong>${item.text}</strong></p>
                    <span>${item.time}</span>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

/**
 * Carga y actualiza la tabla de modelos más vendidos
 */
function loadModelsTable() {
    const container = document.getElementById('best-selling-models-body');
    let html = '';

    mockData.models.forEach(model => {
        // Formateo de moneda
        const formattedRevenue = model.revenue.toLocaleString('es-ES', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
        
        html += `
            <tr>
                <td>${model.model}</td>
                <td>${model.units.toLocaleString()}</td>
                <td>${formattedRevenue}</td>
            </tr>
        `;
    });
    container.innerHTML = html;
}

/**
 * Dibuja el gráfico de barras inyectando el HTML (la altura se maneja con CSS en línea)
 */
function drawSalesChart() {
    const container = document.getElementById('monthly-sales-chart');
    let html = '';

    mockData.salesChart.forEach(data => {
        html += `
            <div class="bar" style="height: ${data.value}%"><span>${data.month}</span></div>
        `;
    });
    container.innerHTML = html;
}

// ==========================================
// 3. Lógica del Menú Desplegable (Mantenida)
// ==========================================

function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDropdown = document.getElementById('mobile-dropdown');

    if (menuToggle && mobileDropdown) {
        menuToggle.addEventListener('click', (e) => {
            // Detener la propagación para evitar que el evento 'document' lo cierre inmediatamente
            e.stopPropagation(); 
            // Alterna la clase 'hidden' para mostrar/ocultar el menú
            mobileDropdown.classList.toggle('hidden');
        });

        // Evento para cerrar el menú si se hace clic fuera de él
        document.addEventListener('click', (event) => {
            // Verifica que el clic NO esté dentro del dropdown Y NO esté en el botón de toggle
            if (!mobileDropdown.contains(event.target) && !menuToggle.contains(event.target)) {
                if (!mobileDropdown.classList.contains('hidden')) {
                    mobileDropdown.classList.add('hidden');
                }
            }
        });
    }
}

// ==========================================
// 4. Inicialización
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar la funcionalidad del menú móvil
    setupMobileMenu();
    
    // 2. Inyectar todos los datos
    loadStats();
    loadActivity();
    loadModelsTable();
    drawSalesChart();
});