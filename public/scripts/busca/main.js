/**
 * Ativa date picker no ícone do calendário
 *
 * @listens click .fa-calendar-alt
 */
if (document.querySelector(".fa-calendar-alt")) {
    document
        .querySelector(".fa-calendar-alt")
        .addEventListener("click", (e) => {
            if (e.target.previousElementSibling) {
                e.target.previousElementSibling.showPicker?.();
            }
        });
}

// ===============================================
// SISTEMA DE BUSCA - ELEMENTOS DOM
// ===============================================
/**
 * Container para exibição dos resultados de busca
 * @type {Element}
 */
const resultadoBusca = document.querySelector(".main-page-hero-resultado");

/**
 * Cache global de agentes ativos
 * Carregado na inicialização para otimizar buscas
 * @type {Array|null}
 */
let agentes;
/**
 * Carrega agentes ativos na inicialização da página
 * Armazena dados em cache global para melhor performance
 *
 * @async
 * @function loadAgentesAtivos
 * @fires window#load
 * @returns {Promise<void>}
 */
window.addEventListener("load", async () => {
    const agentesEncontrados = await fetchGet("/agentes/ativos");
    agentes = agentesEncontrados.agentes;
});

/**
 * Campo de input para busca de agentes
 * @type {Element}
 */
const campoBuscaAgente = document.getElementById("busca-agente");
// ===============================================
// BUSCA DE AGENTES - FUNCIONALIDADE PRINCIPAL
// ===============================================

/**
 * Sistema de busca inteligente para agentes
 *
 * Características:
 * • Busca case-insensitive por nome ou ID
 * • Filtro em tempo real
 * • Controle de visibilidade do modal
 * • Tratamento de estados vazios
 * • Links diretos para perfil do agente
 *
 * @listens input#busca-agente
 */
if (campoBuscaAgente) {
    campoBuscaAgente.addEventListener("input", () => {
        // Limpa resultados anteriores
        resultadoBusca.innerHTML = "";

        /**
         * Estado vazio - esconde modal e resultados
         */
        if (campoBuscaAgente.value == "") {
            resultadoBusca.classList.remove("main-page-hero-resultado-visivel");
            document
                .querySelector(".modal-busca")
                .classList.remove("modal-busca-visivel");
        } else {
            /**
             * Estado ativo - mostra modal e processa busca
             */
            document
                .querySelector(".modal-busca")
                .classList.add("modal-busca-visivel");
            resultadoBusca.classList.add("main-page-hero-resultado-visivel");
            /**
             * Verifica se existem agentes válidos (sem mensagem de erro)
             */
            if (!agentes.msg) {
                /**
                 * Itera sobre agentes e aplica filtro de busca
                 * Compara nome do agente (case-insensitive) ou ID (como string) com valor digitado
                 */
                for (const agente of agentes) {
                    const valorBuscado =
                        campoBuscaAgente.value.toLocaleLowerCase();
                    const nomeLower = agente.nome.toLocaleLowerCase();
                    const idString = String(agente.id_agente);

                    if (
                        nomeLower.includes(valorBuscado) ||
                        idString.includes(valorBuscado)
                    ) {
                        /**
                         * Renderiza resultado encontrado
                         * Template: Link -> Div -> Nome + ID
                         */
                        resultadoBusca.innerHTML += `<a href="/agentes/perfil/${agente.id_agente}"><div class="resultado">
                                <p class="nome">${agente.nome}</p>
                                <h3>${agente.id_agente}</h3>
                            </div></a>`;
                    }
                }
            }

            /**
             * Tratamento de casos sem resultado
             * Exibe quando: erro na API OU nenhum resultado encontrado
             */
            if (agentes.msg || resultadoBusca.innerHTML.length == 0) {
                resultadoBusca.innerHTML = `<div class="agente"><p class="nome">Nenhum resultado encontrado...</p></div>`;
            }
        }
    });
}
/**
 * Cache global de usuários ativos
 * Carregado na inicialização para otimizar buscas
 * @type {Array|null}
 */
let usuarios;
/**
 * Carrega usuários ativos na inicialização da página
 * Armazena dados em cache global para melhor performance
 *
 * @async
 * @function loadUsuariosAtivos
 * @fires window#load
 * @returns {Promise<void>}
 */
window.addEventListener("load", async () => {
    const usuariosEncontrados = await fetchGet("/usuarios/ativos");
    usuarios = usuariosEncontrados.usuarios;
});

/**
 * Campo de input para busca de usuários
 * @type {Element}
 */
const campoBuscaUsuario = document.getElementById("busca-usuario");

// ===============================================
// BUSCA DE USUÁRIOS - FUNCIONALIDADE SECUNDÁRIA
// ===============================================
/**
 * Sistema de busca inteligente para usuários
 *
 * Funciona de forma idêntica à busca de agentes:
 * • Mesma lógica de filtro
 * • Mesmo controle de modal
 * • Roteamento diferente (/usuarios/ vs /agentes/perfil/)
 *
 * @listens input#busca-usuario
 */
if (campoBuscaUsuario) {
    campoBuscaUsuario.addEventListener("input", () => {
        // Limpa resultados anteriores
        resultadoBusca.innerHTML = "";

        /**
         * Estado vazio - comportamento padrão
         */
        if (campoBuscaUsuario.value == "") {
            resultadoBusca.classList.remove("main-page-hero-resultado-visivel");
            document
                .querySelector(".modal-busca")
                .classList.remove("modal-busca-visivel");
        } else {
            /**
             * Estado ativo - processamento da busca
             */
            document
                .querySelector(".modal-busca")
                .classList.add("modal-busca-visivel");
            resultadoBusca.classList.add("main-page-hero-resultado-visivel");

            /**
             * Filtragem de usuários válidos
             */
            if (!usuarios.msg) {
                for (const usuario of usuarios) {
                    const valorBuscado =
                        campoBuscaUsuario.value.toLocaleLowerCase();
                    if (
                        usuario.nome.toLocaleLowerCase().includes(valorBuscado)
                    ) {
                        /**
                         * Template de resultado para usuários
                         * Diferença: rota /usuarios/ ao invés de /agentes/perfil/
                         */
                        resultadoBusca.innerHTML += `<a href="/usuarios/${usuario.id_usuario}"><div class="resultado">
                                <p class="nome">${usuario.nome}</p>
                                <h3>${usuario.id_usuario}</h3>
                            </div></a>`;
                    }
                }
            }

            /**
             * Fallback para casos sem resultado
             */
            if (usuarios.msg || resultadoBusca.innerHTML.length == 0) {
                resultadoBusca.innerHTML = `<div class="usuario"><p class="nome">Nenhum resultado encontrado...</p></div>`;
            }
        }
    });
}

// ===============================================
// CONTROLE DO MODAL DE BUSCA
// ===============================================
/**
 * Gerencia o fechamento do modal de busca
 *
 * Comportamento:
 * • Click no overlay fecha o modal
 * • Limpa todos os resultados
 * • Reseta campo de busca de agente
 * • Remove classes de visibilidade
 *
 * @listens click .modal-busca
 */
if (document.querySelector(".modal-busca")) {
    document
        .querySelector(".modal-busca")
        .addEventListener("click", (event) => {
            if (
                resultadoBusca.classList.contains(
                    "main-page-hero-resultado-visivel"
                )
            ) {
                // Remove visibilidade dos resultados
                resultadoBusca.classList.remove(
                    "main-page-hero-resultado-visivel"
                );

                // Esconde modal
                document
                    .querySelector(".modal-busca")
                    .classList.remove("modal-busca-visivel");

                // Limpa conteúdo e campo
                resultadoBusca.innerHTML = "";
                {
                    campoBuscaAgente
                        ? (campoBuscaAgente.value = "")
                        : campoBuscaAgente.value;
                }
                {
                    campoBuscaUsuario
                        ? (campoBuscaUsuario.value = "")
                        : campoBuscaUsuario.value;
                }
            }
        });
}
