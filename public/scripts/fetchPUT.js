const loaderContainerPut = document.getElementById("loaderContainer");

const formEditUsuario = document.querySelector(".main-page-form-edit-usuario");
if (formEditUsuario) {
    formEditUsuario.addEventListener("submit", (event) => {
        event.preventDefault();

        const formDate = new FormData(formEditUsuario);
        const bodyForm = Object.fromEntries(formDate.entries());
        fetchPut(
            "/usuarios/editar",
            bodyForm,
            `/usuarios/perfil/${bodyForm.id_usuario}`
        );
    });
}

const formEditSenhaUsuario = document.querySelector(
    ".main-page-form-edit-usuario-senha"
);
if (formEditSenhaUsuario) {
    formEditSenhaUsuario.addEventListener("submit", (event) => {
        event.preventDefault();

        const formDate = new FormData(formEditSenhaUsuario);
        const bodyForm = Object.fromEntries(formDate.entries());

        if (bodyForm.senhaNova === bodyForm.senhaConf) {
            fetchPut(
                "/usuarios/editarsenha",
                bodyForm,
                `/usuarios/perfil/${bodyForm.id_usuario}`
            );
        } else {
            alert("As senhas não correspondem.");
        }
    });
}

const formEditAgente = document.querySelector(".main-page-form-edit-agente");
if (formEditAgente) {
    formEditAgente.addEventListener("submit", (event) => {
        event.preventDefault();

        const formDate = new FormData(formEditAgente);
        const bodyForm = Object.fromEntries(formDate.entries());
        fetchPut(
            "/agentes/editar",
            bodyForm,
            `/agentes/perfil/${bodyForm.id_agente}`
        );
    });
}

const formEditFaturacao = document.querySelector(
    ".main-page-form-edit-faturacao"
);
if (formEditFaturacao) {
    formEditFaturacao.addEventListener("submit", (event) => {
        event.preventDefault();

        const formDate = new FormData(formEditFaturacao);
        const bodyForm = Object.fromEntries(formDate.entries());
        fetchPut(
            "/faturacao/editar",
            bodyForm,
            `/faturacao/${bodyForm.id_facturacao}`
        );
    });
}

const formMudarFormaPagamento = document.querySelector(
    ".formMudarFormaPagamento"
);
if (formMudarFormaPagamento) {
    formMudarFormaPagamento.addEventListener("submit", (event) => {
        event.preventDefault();

        const formDate = new FormData(formMudarFormaPagamento);
        const bodyForm = Object.fromEntries(formDate.entries());
        if (
            confirm(
                `Tem a certeza que deseja alterar a forma de pagamento? Esta ação não pode ser desfeita!`
            )
        ) {
            fetchPut(
                "/agentes/mudarformapagamento",
                bodyForm,
                `/agentes/perfil/${bodyForm.id_agente}`
            );
        }
    });
}

async function fetchPut(url, body, newPage) {
    if (loaderContainer) {
        loaderContainer.style.display = "flex"; // Exibe o loader
    }
    const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const res = await response.json();

    if (response.status == 350) {
        if (loaderContainer) {
            loaderContainer.style.display = "none"; // Esconde o loader após a resposta
        }
        alert(res.msg);
        return (window.location.href = "/");
    }

    if (response.status > 299) {
        if (loaderContainer) {
            loaderContainer.style.display = "none"; // Esconde o loader após a resposta
        }
        return alert(res.msg);
    }

    if (loaderContainer) {
        loaderContainer.style.display = "none"; // Esconde o loader após a resposta
    }
    return (window.location.href = newPage);
}
