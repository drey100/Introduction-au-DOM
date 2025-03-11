let highscore = 0;
let score = 20;
let tentative = 1;
let nombreMystere = determinerNombreMystere();

// Récupérer le meilleur score stocké
let meilleurScore = Number(localStorage.getItem("highscore")) || 0;
document.querySelector(".highscore").textContent = meilleurScore;

function determinerNombreMystere() {
    
    return Math.floor(Math.random() * 20) + 1;
}

function verifierNombre() {
    let choixUtilisateur = parseInt(document.querySelector(".guess").value);
    let message = document.querySelector(".message");


    if (choixUtilisateur === nombreMystere) {
        document.body.style.backgroundColor = "green";  
        message.textContent = " Great Vous avez gagné!";
        document.querySelector(".number").textContent = nombreMystere;
        verifierMeilleurScore();
        nombreMystere = determinerNombreMystere();
    } else {
        document.body.style.backgroundColor = "";
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
    // Remet la couleur de fond par défaut
    document.body.style.backgroundColor = ""; 
}

// Ajout des écouteurs d'événements
document.querySelector(".check").addEventListener("click", verifierNombre);
document.querySelector(".again").addEventListener("click", reinitialiserJeu);
