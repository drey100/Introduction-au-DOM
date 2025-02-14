let highscore = 0;
let score = 20;
let tentative = 1;
let nombreMystere = determinerNombreMystere();

// Récupérer le meilleur score stocké
let meilleurScore = Number(localStorage.getItem("highscore")) || 0;
document.querySelector(".highscore").textContent = meilleurScore;

function determinerNombreMystere() {
    if (tentative === 1) return 7;
    if (tentative === 2) return 18;
    if (tentative === 3) return 13;
    return Math.floor(Math.random() * 20) + 1;
}

function verifierNombre() {
    let choixUtilisateur = parseInt(document.querySelector(".guess").value);
    let message = document.querySelector(".message");

    if (isNaN(choixUtilisateur) || choixUtilisateur < 1 || choixUtilisateur > 20) {
        message.textContent = "⛔ Veuillez entrer un nombre entre 1 et 20.";
        return;
    }

    if (choixUtilisateur === nombreMystere) {
        document.body.style.backgroundColor = "green";  
        message.textContent = " Great Vous avez gagné!";
        document.querySelector(".number").textContent = nombreMystere;
        verifierMeilleurScore();
    } else {
        score--;
        if (score <= 0) {
            message.textContent = "";
            document.querySelector(".score").textContent = 0;
            return;
        } else {
            message.textContent = choixUtilisateur < nombreMystere ? "Trop bas !" : "Trop haut !";
        }
    }

    tentative++;
    nombreMystere = determinerNombreMystere();
    document.querySelector(".score").textContent = score;
}

function verifierMeilleurScore() {
    if (score > meilleurScore) {
        meilleurScore = score;
        localStorage.setItem("highscore", meilleurScore);
        document.querySelector(".highscore").textContent = meilleurScore;
    }
}

function reinitialiserJeu() {
    verifierMeilleurScore();
    score = 20;
    tentative = 1;
    nombreMystere = determinerNombreMystere();

    document.querySelector(".message").textContent = "Start guessing...";
    document.querySelector(".score").textContent = score;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
    document.body.style.backgroundColor = ""; // Remet la couleur de fond par défaut
}

// Ajout des écouteurs d'événements
document.querySelector(".check").addEventListener("click", verifierNombre);
document.querySelector(".again").addEventListener("click", reinitialiserJeu);
