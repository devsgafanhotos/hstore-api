/**
 * ===============================================
 * SISTEMA DE BUSCA E RELATÓRIOS - DASHBOARD
 * ===============================================
 *
 * Sistema completo para gerenciamento de busca de agentes/usuários,
 * relatórios financeiros e visualização de dados em gráficos.
 *
 * Funcionalidades principais:
 * • Busca em tempo real de agentes e usuários
 * • Sistema de filtros por data para relatórios
 * • Gráficos interativos de vendas com Chart.js
 * • Modal de busca responsivo
 * • Navegação automática com parâmetros URL
 *
 *
 * @version 1.0.0
 * @requires Chart.js, ChartDataLabels
 */

// ===============================================
// SISTEMA DE GRÁFICOS - CHART.JS
// ===============================================

/**
 * Inicializa sistema de gráficos na carga da página
 *
 * Processo:
 * 1. Localiza canvas do gráfico
 * 2. Obtém dados via API
 * 3. Cria gradientes premium
 * 4. Configura Chart.js com animações
 * 5. Renderiza gráfico de barras
 *
 * @async
 * @function initGraficoVendas
 * @fires window#load
 * @requires Chart.js, ChartDataLabels
 */
window.addEventListener("load", async () => {
    /**
     * Elemento canvas para renderização do gráfico
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("graficoVendas");
    if (!canvas) return;

    /**
     * Contexto 2D do canvas para desenho
     * @type {CanvasRenderingContext2D}
     */
    const ctx = canvas.getContext("2d");

    /**
     * Data atual ou filtrada para busca de dados
     * @type {string}
     */
    const dataBusca = campoBuscaDataRelatorio.value;

    /**
     * Dados financeiros obtidos da API
     * @type {Object}
     */
    const dados = await fetchGet("/relatorios/insight?data=" + dataBusca);
    const resumoMensal = dados.resumoMensal;

    // ===============================================
    // GRADIENTES PREMIUM - DESIGN VISUAL
    // ===============================================

    /**
     * Gradiente para "Total Vendido"
     * Verde: do claro (#6ee7b7) ao escuro (#059669)
     * @type {CanvasGradient}
     */
    const gradVendido = ctx.createLinearGradient(0, 0, 0, 400);
    gradVendido.addColorStop(0, "#6ee7b7");
    gradVendido.addColorStop(1, "#059669");

    /**
     * Gradiente para "Total Pago"
     * Azul: do claro (#93c5fd) ao escuro (#2563eb)
     * @type {CanvasGradient}
     */
    const gradPago = ctx.createLinearGradient(0, 0, 0, 400);
    gradPago.addColorStop(0, "#93c5fd");
    gradPago.addColorStop(1, "#2563eb");

    /**
     * Gradiente para "Total Extraído"
     * Vermelho: do claro (#fca5a5) ao escuro (#b91c1c)
     * @type {CanvasGradient}
     */
    const gradExtraido = ctx.createLinearGradient(0, 0, 0, 400);
    gradExtraido.addColorStop(0, "#fca5a5");
    gradExtraido.addColorStop(1, "#b91c1c");

    /**
     * Gradiente para "Facturações"
     * Amarelo/Laranja: do claro (#fcd34d) ao escuro (#d97706)
     * @type {CanvasGradient}
     */
    const gradFaturacoes = ctx.createLinearGradient(0, 0, 0, 400);
    gradFaturacoes.addColorStop(0, "#fcd34d");
    gradFaturacoes.addColorStop(1, "#d97706");

    // ===============================================
    // ESTRUTURA DE DADOS DO GRÁFICO
    // ===============================================

    /**
     * Configuração de dados para Chart.js
     * Estrutura: labels + datasets com valores e estilos
     *
     * @type {Object}
     */
    const data = {
        /**
         * Rótulos das barras (eixo X)
         * @type {string[]}
         */
        labels: [
            "Total Vendido",
            "Total Pago",
            "Total Extraído",
            "Facturações",
        ],

        /**
         * Datasets com dados e configurações visuais
         * @type {Object[]}
         */
        datasets: [
            {
                label: "Resumo Mensal",

                /**
                 * Valores numéricos para cada barra
                 * Ordem corresponde aos labels
                 * @type {number[]}
                 */
                data: [
                    resumoMensal.totalVendido,
                    resumoMensal.totalPago,
                    resumoMensal.totalExtraido,
                    resumoMensal.totalFaturacoes,
                ],

                /**
                 * Gradientes de fundo para cada barra
                 * @type {CanvasGradient[]}
                 */
                backgroundColor: [
                    gradVendido,
                    gradPago,
                    gradExtraido,
                    gradFaturacoes,
                ],

                // Configurações de estilo
                borderWidth: 0,
                borderRadius: 16,

                /**
                 * Cores para estado hover
                 * @type {string[]}
                 */
                hoverBackgroundColor: [
                    "#10b981",
                    "#3b82f6",
                    "#ef4444",
                    "#f59e0b",
                ],
            },
        ],
    };

    // ===============================================
    // CONFIGURAÇÃO AVANÇADA DO GRÁFICO
    // ===============================================

    /**
     * Configuração completa do Chart.js
     * Inclui: responsividade, plugins, escalas, animações
     *
     * @type {Object}
     */
    const config = {
        type: "bar",
        data: data,

        /**
         * Opções avançadas de configuração
         */
        options: {
            responsive: true,
            maintainAspectRatio: false,

            // ===============================================
            // PLUGINS E EXTENSÕES
            // ===============================================

            plugins: {
                /**
                 * Configuração da legenda
                 */
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#1f2937",
                        font: {
                            size: 15,
                            weight: "600",
                            family: "Inter, system-ui, sans-serif",
                        },
                        usePointStyle: true,
                        pointStyle: "roundedRect",
                        padding: 20,
                    },
                },

                /**
                 * Configuração dos tooltips (hover)
                 */
                tooltip: {
                    backgroundColor: "#111827",
                    titleColor: "#f9fafb",
                    bodyColor: "#e5e7eb",
                    padding: 14,
                    borderColor: "#374151",
                    borderWidth: 1,
                    cornerRadius: 10,
                    displayColors: false,

                    /**
                     * Customização do conteúdo dos tooltips
                     */
                    callbacks: {
                        /**
                         * Formata valor exibido no tooltip
                         * Aplica formatação pt-AO + moeda Kz
                         *
                         * @param {Object} context - Contexto do tooltip
                         * @returns {string} Texto formatado
                         */
                        label: function (context) {
                            let valor = context.raw.toLocaleString("pt-AO");
                            return `${context.label}: ${valor} Kz`;
                        },
                    },
                },

                /**
                 * Labels sobre as barras (plugin externo)
                 * Mostra valores diretamente nas barras
                 */
                datalabels: {
                    color: "#111827",
                    anchor: "end",
                    align: "top",
                    font: {
                        weight: "700",
                        size: 13,
                    },

                    /**
                     * Formatador dos valores nos labels
                     *
                     * @param {number} value - Valor numérico
                     * @returns {string} Valor formatado com moeda
                     */
                    formatter: (value) => value.toLocaleString("pt-AO") + " Kz",
                },
            },

            // ===============================================
            // CONFIGURAÇÃO DAS ESCALAS (EIXOS)
            // ===============================================

            scales: {
                /**
                 * Eixo X (horizontal) - Labels das categorias
                 */
                x: {
                    grid: { display: false },
                    ticks: {
                        color: "#374151",
                        font: { size: 13, weight: "600" },
                    },
                },

                /**
                 * Eixo Y (vertical) - Valores numéricos
                 */
                y: {
                    beginAtZero: true,
                    grid: { color: "rgba(0,0,0,0.05)" },
                    ticks: {
                        color: "#6b7280",
                        font: { size: 12 },

                        /**
                         * Formatador dos valores do eixo Y
                         * Aplica formatação monetária
                         *
                         * @param {number} value - Valor do tick
                         * @returns {string} Valor formatado
                         */
                        callback: function (value) {
                            return value.toLocaleString("pt-AO") + " Kz";
                        },
                    },
                },
            },

            // ===============================================
            // SISTEMA DE ANIMAÇÕES PREMIUM
            // ===============================================

            /**
             * Configuração de animações avançadas
             */
            animation: {
                /**
                 * Callback executado quando animação termina
                 * Aplica efeito de "pulse" no gráfico
                 */
                onComplete: () => {
                    const chart = ctx.canvas;
                    chart.style.transition = "transform 0.5s ease";
                    chart.style.transform = "scale(1.03)";
                    setTimeout(() => {
                        chart.style.transform = "scale(1)";
                    }, 500);
                },
                duration: 1400,
                easing: "easeOutElastic",
            },

            /**
             * Configuração de interações
             */
            interaction: {
                mode: "nearest",
                axis: "x",
                intersect: false,
            },
        },

        /**
         * Plugins externos necessários
         * ChartDataLabels: exibe valores sobre as barras
         *
         * @type {Object[]}
         */
        plugins: [ChartDataLabels],
    };

    /**
     * Instância final do gráfico
     * Renderiza no canvas com configuração completa
     *
     * @type {Chart}
     */
    new Chart(ctx, config);
});

// ===============================================
// UTILITÁRIO DE REQUISIÇÕES HTTP
// ===============================================

/**
 * Função utilitária para requisições GET
 * Centraliza lógica de fetch com tratamento de erros
 *
 * Características:
 * • Async/await para melhor legibilidade
 * • Parse automático de JSON
 * • Tratamento básico de erros
 * • Reutilizable em todo o sistema
 *
 * @async
 * @function fetchGet
 * @param {string} url - URL da requisição
 * @returns {Promise<Object>} Dados da resposta JSON
 * @throws {Error} Em caso de erro na requisição ou parsing
 *
 * @example
 * // Buscar dados de agentes
 * const agentes = await fetchGet('/agentes/ativos');
 *
 * @example
 * // Buscar relatório com parâmetros
 * const dados = await fetchGet('/relatorios/insight?data=2024-01-15');
 */
async function fetchGet(url) {
    try {
        /**
         * Executa requisição HTTP GET
         * @type {Response}
         */
        const response = await fetch(url);

        /**
         * Converte resposta para JSON
         * @type {Object}
         */
        return response.json();
    } catch (error) {
        /**
         * Fallback em caso de erro
         * Tenta parsing da resposta mesmo com erro
         *
         * @note Pode ser problemático - considerar melhorar tratamento
         */
        return response.json();
    }
}
