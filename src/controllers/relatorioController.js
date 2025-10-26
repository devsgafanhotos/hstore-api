const { CharsetToEncoding } = require("mysql2");
const relatorio_Service = require("../services/relatorioService");
const { getStringDate, getSimpleDate } = require("../utils");
const relatorioService = new relatorio_Service();

class relatorioController {
    /**
     * @route GET /relatorio/listar
     * @desc Lista todas as relatorios cadastradas.
     */
    buscarRelatorioMensal = async (req, res) => {
        let { data, filtro } = req.query;

        if (!data) {
            data = getSimpleDate();
        }
        data = new Date(data);
        try {
            const response = await relatorioService.pegarResumoMensalDaEmpresa(
                data,
                filtro
            );

            if (!response.successo) {
                return res.redirect("/");
            }

            res.render("pages/relatorio/mensal", {
                titulo: "Relatório Mensal",
                resumoMensal: response,
                successo: response.successo,
            });
        } catch (error) {
            console.error("Erro ao buscar relatório mensal   :", error);
            res.render("pages/error", {
                titulo: "Internal error",
            });
        }
    };

    buscarRelatorioQuinzenal = async (req, res) => {
        let { data, filtro } = req.query;

        if (!data) {
            data = getSimpleDate();
        }
        data = new Date(data);
        try {
            const response =
                await relatorioService.pegarResumoQuinzenalDaEmpresa(
                    data,
                    filtro
                );

            if (!response.successo) {
                return res.redirect("/");
            }

            res.render("pages/relatorio/quinzenal", {
                titulo: "Relatório Quinzenal",
                resumoQuinzenal: response,
                successo: response.successo,
            });
        } catch (error) {
            console.error("Erro ao buscar relatório quinzenal   :", error);
            res.render("pages/error", {
                titulo: "Internal error",
            });
        }
    };

    buscarRelatorioInsight = async (req, res) => {
        let { data } = req.query;
        if (!data) {
            data = getSimpleDate();
        }
        data = new Date(data);
        try {
            const response = await relatorioService.pegarResumoMensalDaEmpresa(
                data
            );

            res.json({
                titulo: "Insights",
                resumoMensal: response,
                successo: response.successo,
            });
        } catch (error) {
            console.error("Erro ao buscar relatório mensal   :", error);
            res.render("pages/error", {
                titulo: "Internal error",
            });
        }
    };

    buscarAgentesPagos = async (req, res) => {
        let { data, filtro, parcela } = req.query;
        if (!data) {
            data = getSimpleDate();
        }
        data = new Date(data);
        try {
            const response = await relatorioService.pegarResumoMensalDaEmpresa(
                data,
                filtro,
                parcela
            );

            if (!response.successo) {
                return res.redirect("/");
            }

            res.render("pages/pagamento/efeituados", {
                titulo: "Agentes pagos",
                resumoMensal: response,
                successo: response.successo,
            });
        } catch (error) {
            console.error("Erro ao buscar relatório mensal   :", error);
            res.render("pages/error", {
                titulo: "Internal error",
            });
        }
    };

    buscarAgentesNaoPagos = async (req, res) => {
        let { data, filtro, parcela = "Única", nome } = req.query;
        if (!data) {
            data = getSimpleDate();
        }
        data = new Date(data);
        try {
            const response = await relatorioService.pegarResumoMensalDaEmpresa(
                data,
                filtro,
                parcela,
                nome
            );

            if (!response.successo) {
                return res.redirect("/");
            }

            res.render("pages/pagamento/pendentes", {
                titulo: "Agentes não pagos",
                resumoMensal: response,
                usuario_id: req.usuario.id_usuario,
                successo: response.successo,
                nome: nome
            });
        } catch (error) {
            console.error("Erro ao buscar relatório mensal   :", error);
            res.render("pages/error", {
                titulo: "Internal error",
            });
        }
    };

    buscarTodosPagamentos = async (req, res) => {
        try {
            const response = await relatorioService.pegarTodosPagamentos();

            res.status(200).json({ pagamentos: response.pagamentos });
        } catch (error) {
            console.error("Erro ao listar pagamentos:", error);
            res.render("pages/error", {
                titulo: "Internal error",
            });
        }
    };
}

module.exports = relatorioController;
