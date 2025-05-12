const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "LULA";

let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5 ,9],
    [3, 5, 7],
];

function init() {
    selected = [];

    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });
}

init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");

    // Criar imagem para X ou O
    const img = document.createElement("img");
    img.src = player === "LULA" ? "../assets/img/x.jpg" : "../assets/img/o.png";
    img.alt = player;
    img.style.width = "147px";
    img.style.height = "147px";

    e.target.appendChild(img);
    e.target.removeEventListener("click", newMove);
    selected[index] = player;

    setTimeout(() => {
        check();
    }, 100); // corrigido: era [100], mas deve ser 100 (número, não array)

    player = player === "LULA" ? "BOLSONARO" : "LULA";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check() {
    let playerLastMove = player === "LULA" ? "BOLSONARO" : "LULA";

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    for (let pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
            init();
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        alert("DEU EMPATE!");
        init();
        return;
    }
}