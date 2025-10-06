const btnOptions = document.querySelector(
    ".main-page-detalhes-cabecalho-menu .fa-ellipsis-v"
);
const menuOptions = document.querySelector(
    ".main-page-detalhes-cabecalho-menu ul"
);

if (btnOptions) {
    btnOptions.addEventListener("click", () => {
        menuOptions.classList.add("main-page-detalhes-cabecalho-menu-visivel");
    });
}

// Fechar se clicar fora
document.addEventListener("click", (e) => {
    if (menuOptions) {
        if (!e.target.closest(".main-page-detalhes-cabecalho-menu")) {
            menuOptions.classList.remove(
                "main-page-detalhes-cabecalho-menu-visivel"
            );
        }
    }
});

const inputFormatado = document.querySelectorAll(".inputFormatado");
const valorReal = document.querySelectorAll(".valorReal");
if (inputFormatado || valorReal) {
    inputFormatado.forEach((input, i) => {
        input.addEventListener("input", () => {
            // remove tudo que não for número
            let valor = input.value.replace(/\D/g, "");

            // guarda valor real (número cru, 2 casas)
            valorReal[i].value = valor ? (parseInt(valor) / 100).toFixed(2) : 0;

            // formata número sem moeda
            let formatado = (valor / 100).toLocaleString("pt-AO", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            // atualiza o campo
            input.value = formatado;

            // só para exibição
            mostraFormatado.textContent = formatado + " Kz";
            mostraReal.textContent = valorReal[i].value;
        });
    });
}


function showAlert(msg, error = false) {
    
    if (!error) {
        document.getElementById("showAlert").innerHTML = 
            `<p >${msg}</p>`;
    } else {
        document.getElementById("showAlert").innerHTML = 
            `<p class="error">${msg}</p>`;
    }
}