import sequelize from "../database.js";
import initModels from "../../src/models/init-models.js";

import { usuarios } from "./usuarios.js";
import { agentes } from "./agentes.js";
import { facturacao } from "./faturacoes.js";
import { pagamentos } from "./pagamentos.js";

const models = initModels(sequelize);
const modUsuarios = models.usuarios;
const modAgentes = models.agentes;
const modFaturacoes = models.faturacoes;
const modPagamentos = models.pagamentos;

sequelize
  .authenticate()
  .then(() => console.log("Banco de dados conectado"))
  .catch((err) => console.error(" Erro na conexão com o banco:", err));

try {
    //  /usuarios/ativos

    const usuariosRegistrados = await modUsuarios.bulkCreate(usuarios);
    console.log("usuarios: ", usuariosRegistrados);
} catch (error) {
    console.log("Erro ao cadastrar usuarios " + error);
}

try {
    //  /agentes/ativos

    const agentesRegistrados = await modAgentes.bulkCreate(agentes);
    console.log("agentes: ", agentesRegistrados);
} catch (error) {
    console.log("Erro ao cadastrar agentes " + error);
}

try {
    //  /faturacao/all

    const facturacaoRegistrados = await modFaturacoes.bulkCreate(facturacao);
    console.log("faturacoes: ", facturacaoRegistrados);
} catch (error) {
    console.log("Erro ao cadastrar faturacao " + error);
}

try {
    //  /pagamentos/all

    const pagamentosRegistrados = await modPagamentos.bulkCreate(pagamentos);
    console.log("pagamentos: ", pagamentosRegistrados);
} catch (error) {
    console.log("Erro ao cadastrar relatorio/pagamentos " + error);
}
