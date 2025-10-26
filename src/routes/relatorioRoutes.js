/**
 * ===================================================
 *  Rotas de Relatório
 *  Define endpoints relacionados ao CRUD de Relatório.
 *  Protegido por middleware de autenticação.
 * ===================================================
 */

const express = require("express");
const relatorio_Controller = require("../controllers/relatorioController");
const AutenticacaoMiddleware = require("../middlewares/autenticacaoMiddleware");

// Instanciando controller e middleware
const relatorioController = new relatorio_Controller();
const autenticacaoMiddleware = new AutenticacaoMiddleware();

// Criando roteador do Express
const relatorioRoutes = express.Router();

/**
 * @route GET /relatorio/mensal
 * @group Relatório - Operações relacionadas a relatórios
 * @returns {Object} 200 - Lista de faturas
 * @returns {Error} 401 - Não autorizado
 * @description Lista todas as faturas registadas
 * @access Privado (Autenticado)
 */
relatorioRoutes.get(
  "/relatorios/insight",
  autenticacaoMiddleware.verificarAutenticacao,
  relatorioController.buscarRelatorioInsight
);

/**
 * @route GET /relatorio/mensal
 * @group Relatório - Operações relacionadas a relatórios
 * @returns {Object} 200 - Lista de faturas
 * @returns {Error} 401 - Não autorizado
 * @description Lista todas as faturas registadas
 * @access Privado (Autenticado)
 */
relatorioRoutes.get(
  "/relatorios/mensal",
  autenticacaoMiddleware.verificarAutenticacao,
  relatorioController.buscarRelatorioMensal
);

/**
 * @route GET /relatorio/quinzenal
 * @group Relatório - Operações relacionadas a relatórios
 * @returns {Object} 200 - Lista de faturas
 * @returns {Error} 401 - Não autorizado
 * @description Lista todas as faturas registadas
 * @access Privado (Autenticado)
 */
relatorioRoutes.get(
  "/relatorios/quinzenal",
  autenticacaoMiddleware.verificarAutenticacao,
  relatorioController.buscarRelatorioQuinzenal
);


/**
 * @route GET /relatorio/agentespagos
 * @returns {Object} 200 - Lista de faturas
 * @returns {Error} 401 - Não autorizado
 * @description Listar os agentes já pagos em determinado periodo
 * @access Privado (Autenticado)
 */
relatorioRoutes.get(
  "/pagamentos/efeituados",
  autenticacaoMiddleware.verificarAutenticacao,
  relatorioController.buscarAgentesPagos
);

/**
 * @route GET /relatorio/agentespagos
 * @returns {Object} 200 - Lista de faturas
 * @returns {Error} 401 - Não autorizado
 * @description Listar os agentes já pagos em determinado periodo
 * @access Privado (Autenticado)
 */
relatorioRoutes.get(
  "/pagamentos/pendentes",
  autenticacaoMiddleware.verificarAutenticacao,
  relatorioController.buscarAgentesNaoPagos
);

/**
 * @route GET /relatorio/agentespagos
 * @returns {Object} 200 - Lista de faturas
 * @returns {Error} 401 - Não autorizado
 * @description Listar os agentes já pagos em determinado periodo
 * @access Privado (Autenticado)
 */
relatorioRoutes.get(
  "/pagamentos/all",
  autenticacaoMiddleware.verificarAutenticacao,
  relatorioController.buscarTodosPagamentos
);

// Exporta o roteador
module.exports = { relatorioRoutes };
