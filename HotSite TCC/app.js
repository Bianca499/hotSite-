// =====================================
// ZELO - HOTSITE
// =====================================

// ACESSO DE DEMONSTRAÇÃO

const loginScreen = document.getElementById("login");
const loginForm = document.getElementById("loginForm");
const siteContent = document.getElementById("siteContent");
const logoutButton = document.getElementById("logoutButton");
const enableNotifications = document.getElementById("enableNotifications");
const notificationNote = document.getElementById("notificationNote");

enableNotifications.addEventListener("change", async () => {
    if (!enableNotifications.checked) {
        notificationNote.textContent =
            "Na demonstração, você recebe apenas um aviso ao entrar. Lembretes programados não estão conectados.";
        return;
    }

    if (!("Notification" in window)) {
        enableNotifications.checked = false;
        notificationNote.textContent =
            "Este navegador não oferece notificações. Você ainda pode acessar o HotSite normalmente.";
        return;
    }

    try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            notificationNote.textContent =
                "Notificações permitidas. Você verá um aviso ao entrar no HotSite.";
        } else {
            enableNotifications.checked = false;
            notificationNote.textContent =
                "Permissão não concedida. Você pode ativar notificações nas configurações do navegador.";
        }
    } catch (error) {
        enableNotifications.checked = false;
        notificationNote.textContent =
            "Não foi possível solicitar notificações neste endereço. Tente acessar pelo localhost ou HTTPS.";
        console.error("Não foi possível solicitar permissão para notificações:", error);
    }
});

loginForm.addEventListener("submit", event => {
    event.preventDefault();

    if (enableNotifications.checked && "Notification" in window &&
        Notification.permission === "granted") {
        try {
            new Notification("Bem-vindo ao ZELO!", {
                body: "Você entrou no HotSite do ZELO."
            });
        } catch (error) {
            console.error("Não foi possível exibir a notificação do ZELO:", error);
        }
    }

    loginScreen.hidden = true;
    siteContent.hidden = false;
    window.scrollTo(0, 0);
});

logoutButton.addEventListener("click", event => {
    event.preventDefault();
    siteContent.hidden = true;
    loginScreen.hidden = false;
    loginForm.reset();
    document.getElementById("loginEmail").focus();
    window.scrollTo(0, 0);
});

// MENU PARA CELULAR

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    const aberto = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", aberto);
    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = aberto ? "✕" : "☰";
});

// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

// PERGUNTAS FREQUENTES

const perguntas = document.querySelectorAll(".faq-question");

perguntas.forEach(pergunta => {
    pergunta.addEventListener("click", () => {
        const item = pergunta.closest(".faq-item");
        const estavaAberto = item.classList.contains("open");

        document.querySelectorAll(".faq-item").forEach(outro => {
            outro.classList.remove("open");
            outro.querySelector(".faq-question span").textContent = "＋";
        });

        if (!estavaAberto) {
            item.classList.add("open");
            pergunta.querySelector("span").textContent = "−";
        }
    });
});

// BOTÃO VOLTAR AO TOPO

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// FORMULÁRIO DE CONTATO

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const nome = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const mensagem = document.getElementById("contactMessage").value.trim();

    if (!nome || !email || !mensagem) {
        formFeedback.textContent = "Preencha todos os campos.";
        return;
    }

    formFeedback.textContent =
        "Demonstração: formulário preenchido com sucesso! O envio de mensagens ainda não está conectado.";

    contactForm.reset();
});

// ANO AUTOMÁTICO NO CONSOLE

console.log("ZELO HotSite carregado com sucesso!");