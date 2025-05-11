document.addEventListener("DOMContentLoaded", () => {
    const pergunta = document.getElementById("pergunta");
    const opcoes = document.getElementById("opcoes");
    const feedback = document.getElementById("feedback");
    const pontuacao = document.getElementById("pontuacao");
    const btnSom = document.getElementById("ativarSom");

    let pontos = 0;

    function gerarPergunta() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const respostaCorreta = num1 * num2;

        pergunta.textContent = `Quanto é ${num1} x ${num2}?`;
        feedback.textContent = "";

        const respostas = [respostaCorreta];
        while (respostas.length < 3) {
            const respostaErrada = Math.floor(Math.random() * 100) + 1;
            if (!respostas.includes(respostaErrada)) {
                respostas.push(respostaErrada);
            }
        }

        respostas.sort(() => Math.random() - 0.5);

        opcoes.innerHTML = "";
        respostas.forEach(valor => {
            const botao = document.createElement("button");
            botao.textContent = valor;
            botao.addEventListener("click", () => {
                if (valor === respostaCorreta) {
                    feedback.textContent = "🎉 Acertou!";
                    feedback.style.color = "green";
                    pontos++;
                    pontuacao.textContent = `Pontuação: ${pontos}`;
                    setTimeout(gerarPergunta, 1500);
                } else {
                    feedback.textContent = "❌ Tente de novo!";
                    feedback.style.color = "red";
                    pontos = 0;
                    pontuacao.textContent = `Pontuação: ${pontos}`;
                    setTimeout(gerarPergunta, 1500);
                }
            });
            opcoes.appendChild(botao);
        });
    }

    gerarPergunta();

    if (btnSom) {
        btnSom.addEventListener("click", () => {
            if (player && typeof player.isMuted === "function") {
                if (player.isMuted()) {
                    player.unMute();
                    btnSom.textContent = "🔇 Parar Som";
                } else {
                    player.mute();
                    btnSom.textContent = "🔊 Ativar Som";
                }
            }
        });
    }
});

// Carrega a API do YouTube corretamente
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'tDqxrZf-roo',
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: 'tDqxrZf-roo',
            mute: 1,
            controls: 0,
            modestbranding: 1,
            showinfo: 0,
            rel: 0
        },
        events: {
            onReady: (event) => {
                event.target.playVideo();
                document.getElementById("ativarSom").style.display = "block";
            }
        }
    });
}




