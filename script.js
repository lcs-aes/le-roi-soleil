// LOADER - Constellation Royale
setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('nav').classList.add('visible');
    initHero();
}, 5000);

// Créer les étoiles d'arrière-plan
const backgroundStars = document.getElementById('backgroundStars');
for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'bg-star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    backgroundStars.appendChild(star);
}

// Constellation du Roi Soleil (forme de couronne/soleil)
const constellationContainer = document.getElementById('constellationContainer');

// Positions des étoiles formant la constellation (en forme de couronne solaire)
const starPositions = [
    // Étoile centrale (le Soleil/Roi)
    { x: 300, y: 300, delay: 500, isCentral: true },

    // Couronne externe (8 étoiles principales)
    { x: 300, y: 180, delay: 800 },  // Haut
    { x: 385, y: 215, delay: 1000 }, // Haut-droite
    { x: 420, y: 300, delay: 1200 }, // Droite
    { x: 385, y: 385, delay: 1400 }, // Bas-droite
    { x: 300, y: 420, delay: 1600 }, // Bas
    { x: 215, y: 385, delay: 1800 }, // Bas-gauche
    { x: 180, y: 300, delay: 2000 }, // Gauche
    { x: 215, y: 215, delay: 2200 }, // Haut-gauche

    // Rayons externes (8 étoiles secondaires)
    { x: 300, y: 120, delay: 2400 }, // Haut loin
    { x: 450, y: 150, delay: 2500 }, // Haut-droite loin
    { x: 480, y: 300, delay: 2600 }, // Droite loin
    { x: 450, y: 450, delay: 2700 }, // Bas-droite loin
    { x: 300, y: 480, delay: 2800 }, // Bas loin
    { x: 150, y: 450, delay: 2900 }, // Bas-gauche loin
    { x: 120, y: 300, delay: 3000 }, // Gauche loin
    { x: 150, y: 150, delay: 3100 }  // Haut-gauche loin
];

// Connexions entre les étoiles (lignes de la constellation)
const connections = [
    // Du centre vers la couronne interne
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],

    // Couronne interne (octogone)
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 1],

    // Vers les rayons externes
    [1, 9], [2, 10], [3, 11], [4, 12], [5, 13], [6, 14], [7, 15], [8, 16]
];

// Créer les étoiles
starPositions.forEach((pos, index) => {
    setTimeout(() => {
        const star = document.createElement('div');
        star.className = 'constellation-star';
        star.style.left = pos.x + 'px';
        star.style.top = pos.y + 'px';
        star.dataset.index = index;

        // Étoile centrale plus grande avec rayons
        if (pos.isCentral) {
            star.style.width = '20px';
            star.style.height = '20px';

            // Ajouter les rayons dorés
            const rays = document.createElement('div');
            rays.className = 'star-rays';
            for (let i = 0; i < 8; i++) {
                const ray = document.createElement('div');
                ray.className = 'star-ray';
                rays.appendChild(ray);
            }
            star.appendChild(rays);
        }

        constellationContainer.appendChild(star);
        setTimeout(() => star.classList.add('appear'), 50);
    }, pos.delay);
});

// Fonction pour calculer distance et angle entre deux points
function getLineProps(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return { length, angle };
}

// Créer les lignes de connexion
connections.forEach((conn, index) => {
    const [startIdx, endIdx] = conn;
    const start = starPositions[startIdx];
    const end = starPositions[endIdx];
    const delay = Math.max(start.delay, end.delay) + 300;

    setTimeout(() => {
        const { length, angle } = getLineProps(start.x, start.y, end.x, end.y);

        const line = document.createElement('div');
        line.className = 'constellation-line';
        line.style.left = start.x + 'px';
        line.style.top = start.y + 'px';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.setProperty('--line-length', length + 'px');

        constellationContainer.appendChild(line);
        setTimeout(() => line.classList.add('draw'), 50);

        // Ajouter des particules scintillantes le long de la ligne
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'line-sparkle';
                const progress = (i + 1) / 4;
                sparkle.style.left = (start.x + (end.x - start.x) * progress) + 'px';
                sparkle.style.top = (start.y + (end.y - start.y) * progress) + 'px';
                constellationContainer.appendChild(sparkle);
                setTimeout(() => sparkle.classList.add('sparkle'), 50);
                setTimeout(() => sparkle.remove(), 1100);
            }, i * 200);
        }
    }, delay);
});

// HERO - MASQUE DE BAL RÉVÉLATEUR
function initHero() {
    const glitterContainer = document.getElementById('glitterContainer');

    // Créer les paillettes qui tombent
    function createGlitter() {
        const glitter = document.createElement('div');
        glitter.className = 'glitter';

        // Position horizontale aléatoire
        glitter.style.left = Math.random() * 100 + '%';

        // Durée de chute aléatoire (ralentie)
        const duration = 6 + Math.random() * 6; // Entre 6 et 12 secondes
        glitter.style.setProperty('--fall-duration', duration + 's');

        // Taille aléatoire
        const size = 6 + Math.random() * 8; // Entre 6 et 14px
        glitter.style.width = size + 'px';
        glitter.style.height = size + 'px';

        // Délai avant de commencer à tomber
        glitter.style.animationDelay = Math.random() * 1 + 's';

        glitterContainer.appendChild(glitter);

        // Retirer la paillette après l'animation
        setTimeout(() => {
            glitter.remove();
        }, (duration + 2) * 1000);
    }

    // Créer des paillettes en continu
    function startGlitterRain() {
        // Créer plusieurs paillettes au départ
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createGlitter(), i * 150);
        }

        // Continuer à créer des paillettes (moins fréquent)
        setInterval(() => {
            createGlitter();
        }, 400);
    }

    // Démarrer la pluie de paillettes immédiatement
    startGlitterRain();
}

// GALLERY
const rectoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 708 952" width="708" height="952">
<image href="marie_mancini.webp" x="28.32" y="145.32" width="651.36" height="651.36" preserveAspectRatio="xMidYMid slice"/>
<image href="Carte_vierge.webp" x="0" y="0" width="708" height="952"/>
<text x="354" y="118" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="34" font-weight="800" fill="#6a4d24">MARIE MANCINI</text>
<text x="86" y="722" text-anchor="start" dominant-baseline="middle" font-family="Cinzel, serif" font-size="22" font-weight="700" fill="#3a2a13">ATT : 450</text>
<text x="215" y="722" text-anchor="start" dominant-baseline="middle" font-family="Cinzel, serif" font-size="22" font-weight="700" fill="#3a2a13">DEF : 600</text>
<text x="401" y="722" text-anchor="start" dominant-baseline="middle" font-family="Cinzel, serif" font-size="22" font-weight="700" fill="#3a2a13">HP : 750</text>
<text x="528" y="722" text-anchor="start" dominant-baseline="middle" font-family="Cinzel, serif" font-size="22" font-weight="700" fill="#3a2a13">MP : 900</text>
<text x="354" y="774" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="600" fill="#3a2a13"><tspan x="354" dy="0">Nièce du cardinal Mazarin, Marie Mancini arrive en France</tspan><tspan x="354" dy="19.2">en 1653. Belle et cultivée, elle devient le premier grand amour</tspan><tspan x="354" dy="19.2">de Louis XIV. Leur romance passionnée se heurte à la raison</tspan><tspan x="354" dy="19.2">d'État : le roi doit épouser l'Infante d'Espagne pour sceller la</tspan><tspan x="354" dy="19.2">paix. Leur séparation en 1659 marque profondément le jeune</tspan><tspan x="354" dy="19.2">roi et inspire de nombreuses œuvres artistiques.</tspan></text>
<text x="354" y="918" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="700" fill="#3a2a13">Classe : Dame de Cœur / Faction : Courtisane</text>
</svg>`;

const versoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 708 952" width="708" height="952">
<image href="images/cartes/verso/carte_vierge_verso.webp" x="0" y="0" width="708" height="952"/>
<g transform="translate(142 320) rotate(0)" opacity="1"><image href="images/cartes/verso/mancini_c1.webp" x="-40" y="-40" width="80" height="80"/></g>
<g transform="translate(284 320) rotate(0)" opacity="1"><image href="images/cartes/verso/mancini_c2.webp" x="-40" y="-40" width="80" height="80"/></g>
<g transform="translate(425 320) rotate(0)" opacity="1"><image href="images/cartes/verso/mancini_c3.webp" x="-40" y="-40" width="80" height="80"/></g>
<g transform="translate(567 320) rotate(0)" opacity="1"><image href="images/cartes/verso/mancini_c4.webp" x="-40" y="-40" width="80" height="80"/></g>
<g transform="translate(600 600) rotate(0)" opacity="1"><image href="images/cartes/verso/mancini_objet.webp" x="-44" y="-44" width="88" height="88"/></g>
<text x="354" y="120" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="34" font-weight="800" fill="#6a4d24">PREMIER AMOUR</text>
<text x="354" y="193" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="800" fill="#3a2a13">COMPÉTENCES</text>
<text x="143" y="252.4" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="600" fill="#3a2a13"><tspan x="143" dy="0">Charme</tspan><tspan x="143" dy="19.2">italien</tspan></text>
<text x="283" y="252.4" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="600" fill="#3a2a13"><tspan x="283" dy="0">Poésie</tspan><tspan x="283" dy="19.2">romantique</tspan></text>
<text x="425" y="252.4" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="600" fill="#3a2a13"><tspan x="425" dy="0">Séduction</tspan><tspan x="425" dy="19.2">fatale</tspan></text>
<text x="566" y="252.4" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="600" fill="#3a2a13"><tspan x="566" dy="0">Mélancolie</tspan></text>
<text x="351" y="407" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="800" fill="#3a2a13">POUVOIR ULTIME</text>
<text x="354" y="441" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="15" font-weight="600" fill="#3a2a13"><tspan x="354" dy="0">◈ CŒUR BRISÉ ◈</tspan><tspan x="354" dy="18">"Son amour interdit touche l'âme de tous ceux qui l'entendent"</tspan></text>
<text x="329" y="546" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="800" fill="#3a2a13">CITATION</text>
<text x="315" y="600" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="22" font-weight="600" fill="#3a2a13">"Où ça mène quand on s'aime..."</text>
<text x="354" y="721" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="22" font-weight="800" fill="#3a2a13">✦ RELATIONS ✦</text>
<text x="149" y="774.6" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="600" fill="#3a2a13"><tspan x="149" dy="0">✨ ALLIÉS ✨</tspan><tspan x="149" dy="19.2"> </tspan><tspan x="149" dy="19.2">Mazarin</tspan><tspan x="149" dy="19.2">Ninon de l'Enclos</tspan><tspan x="149" dy="19.2">Molière</tspan></text>
<text x="354" y="774.6" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="600" fill="#3a2a13"><tspan x="354" dy="0">✠ RIVAUX ✠</tspan><tspan x="354" dy="19.2"> </tspan><tspan x="354" dy="19.2">Anne d'Autriche</tspan><tspan x="354" dy="19.2">Mme de Montespan</tspan></text>
<text x="552" y="774.6" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="600" fill="#3a2a13"><tspan x="552" dy="0">❤ AMOURS ❤</tspan><tspan x="552" dy="19.2"> </tspan><tspan x="552" dy="19.2">Louis XIV</tspan></text>
<text x="354" y="918" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-size="16" font-weight="700" fill="#3a2a13">Classe : Dame de Cœur / Faction : Courtisane</text>
</svg>`;

const cardsGrid = document.getElementById('cardsGrid');
const modal = document.getElementById('cardModal');
const closeModal = document.getElementById('closeModal');
const cardContainer = document.getElementById('cardContainer');
const cardFront = document.getElementById('cardFront');
const cardBack = document.getElementById('cardBack');

for (let i = 0; i < 24; i++) {
    const thumbnail = document.createElement('div');
    thumbnail.className = 'card-thumbnail';
    thumbnail.innerHTML = rectoSVG;
    thumbnail.onclick = () => openCard();
    cardsGrid.appendChild(thumbnail);
}

function openCard() {
    cardFront.innerHTML = rectoSVG;
    cardBack.innerHTML = versoSVG;
    cardContainer.classList.remove('flipped');
    modal.classList.add('active');
}

cardContainer.onclick = (e) => {
    e.stopPropagation();
    cardContainer.classList.toggle('flipped');
};

closeModal.onclick = (e) => {
    e.stopPropagation();
    modal.classList.remove('active');
};

modal.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
};

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// CHARACTER MODALS
function openCharacterModal(characterId) {
    const modal = document.getElementById('modal-' + characterId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeCharacterModal(characterId) {
    const modal = document.getElementById('modal-' + characterId);
    if (modal) {
        modal.classList.remove('active');
    }
}

document.querySelectorAll('.character-modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// DISTRIBUTION MODAL
const castData = [
    { role: "Louis XIV", actors: ["Matthieu DESROSIERS"], type: "principal" },
    { role: "Marie Mancini", actors: ["Valentine DELASSUS"], type: "principal" },
    { role: "Monsieur, Frère du Roi", actors: ["Emma RAYNAUD"], type: "principal" },
    { role: "Madame de Montespan", actors: ["Chloé RAMBAUD"], type: "principal" },
    { role: "Madame de Maintenon", actors: ["Mila LE NESTOUR"], type: "principal" },
    { role: "Le Duc de Beaufort", actors: ["Alice AUGEREAU"], type: "principal" },
    { role: "Isabelle", actors: ["Inès BERGER"], type: "principal" },
    { role: "Molière / Mazarin", actors: ["Baptiste DESROSIERS"], type: "principal" },
    { role: "Anne d'Autriche", actors: ["Léa DOUADY"], type: "principal" },
    { role: "Ninon de l'Enclos", actors: ["Inga Lee YESKOVA"], type: "principal" },
    { role: "Mademoiselle de Lisieux", actors: ["Eyleen DOUAT"], type: "principal" },
    { role: "La voisin", actors: ["Louise OZIÈS FOURNIER"], type: "C" },
    { role: "L'Enfant", actors: ["Leyton GUILLOT"], type: "P" },
    { role: "Colbert", actors: ["Arthur DEVAUX"], type: "P" },
    { role: "Paul Scarron", actors: ["Chloé ROUMANUS"], type: "P" },
    { role: "Courtisane", actors: ["Chloé WORINGER"], type: "C" },
    { role: "Femme de chambre", actors: ["Elise DEVAUX"], type: "P" },
    { role: "Danseur", actors: ["Madeline QUANTIN", "Manon ALLIAUME", "Lucas LIAUBET", "Juliette PEDRON", "Justine DOUADY", "Colette DISNEY", "Charlotte LESPETS", "Santina GRECH"], type: "Da" },
    { role: "Dame de cour", actors: ["Madeline QUANTIN", "Manon ALLIAUME", "Lucas LIAUBET", "Juliette PEDRON", "Justine DOUADY", "Colette DISNEY", "Charlotte LESPETS"], type: "D" }
];

const distributionModal = document.getElementById('distributionModal');
const openDistributionBtn = document.getElementById('openDistributionModal');
const closeDistributionBtn = document.getElementById('closeDistributionModal');
const castGrid = document.getElementById('castGrid');
const roleFilters = document.querySelectorAll('.role-filter');

// Ouvrir la modale
openDistributionBtn.addEventListener('click', () => {
    distributionModal.classList.add('active');
    displayCast('all');
});

// Fermer la modale
closeDistributionBtn.addEventListener('click', () => {
    distributionModal.classList.remove('active');
});

// Fermer en cliquant en dehors
distributionModal.addEventListener('click', (e) => {
    if (e.target === distributionModal) {
        distributionModal.classList.remove('active');
    }
});

// Filtres de rôles
roleFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        roleFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        const roleType = filter.getAttribute('data-role');
        displayCast(roleType);
    });
});

// Afficher la distribution
function displayCast(filterType) {
    castGrid.innerHTML = '';

    const filteredCast = filterType === 'all'
        ? castData
        : castData.filter(cast => cast.type === filterType);

    filteredCast.forEach(cast => {
        const castCard = document.createElement('div');
        castCard.className = 'cast-card';

        const actorsList = cast.actors.map(actor =>
            `<span class="cast-card-actor-name">${actor}</span>`
        ).join('');

        castCard.innerHTML = `
            <div class="cast-card-role">${cast.role}</div>
            <div class="cast-card-actor">${actorsList}</div>
        `;

        castGrid.appendChild(castCard);
    });
}
