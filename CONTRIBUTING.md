# 🤝 Guide de contribution - Les Deux Chênes

Merci de votre intérêt pour contribuer à ce projet !

## 📋 Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Structure du projet](#structure-du-projet)
- [Standards de code](#standards-de-code)
- [Processus de développement](#processus-de-développement)
- [Tests](#tests)
- [Documentation](#documentation)

---

## 🤗 Code de conduite

- Soyez respectueux et professionnel
- Accueillez les nouveaux contributeurs
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est bon pour le projet

---

## 💡 Comment contribuer

### Signaler un bug

1. Vérifiez que le bug n'a pas déjà été signalé
2. Créez une issue avec :
   - Titre clair et descriptif
   - Description détaillée du bug
   - Étapes pour reproduire
   - Comportement attendu vs actuel
   - Captures d'écran si pertinent
   - Environnement (navigateur, OS, version)

### Suggérer une fonctionnalité

1. Vérifiez la roadmap (`ROADMAP.md`)
2. Vérifiez que la fonctionnalité n'est pas déjà en discussion
3. Créez une issue avec :
   - Titre clair
   - Description de la fonctionnalité
   - Cas d'usage
   - Bénéfices attendus
   - (Optionnel) Proposition d'implémentation

### Contribuer du code

1. **Fork** le projet
2. Créez une **branche** pour votre fonctionnalité
3. **Committez** vos changements
4. **Pushez** vers votre fork
5. Créez une **Pull Request**

---

## 📁 Structure du projet

```
Les-2-Ch-nes/
├── index.html              # Application principale (SPA)
├── Code-v2.gs             # Backend Google Apps Script
├── manifest.json          # Configuration PWA
├── service-worker.js      # Service Worker (cache)
│
├── config.example.js      # Template de configuration
├── .gitignore            # Fichiers ignorés
│
├── README.md             # Documentation générale
├── INSTALLATION.md       # Guide d'installation
├── QUICKSTART.md         # Démarrage rapide
├── ROADMAP.md            # Feuille de route
├── CONTRIBUTING.md       # Ce fichier
│
└── assets/               # (À créer) Ressources
    ├── logo.png
    ├── icon-192.png
    ├── icon-512.png
    └── background.webp
```

### Futures additions (v2.0+)

```
src/
├── js/
│   ├── core/
│   │   ├── app.js
│   │   ├── storage.js
│   │   └── sync.js
│   ├── modules/
│   │   ├── clients.js
│   │   ├── interventions.js
│   │   ├── stocks.js
│   │   └── personnel.js
│   ├── auth/
│   │   ├── auth.js
│   │   └── permissions.js
│   └── utils/
│       ├── validators.js
│       └── formatters.js
├── css/
│   ├── main.css
│   ├── themes.css
│   └── responsive.css
└── templates/
    └── exports/
```

---

## 📝 Standards de code

### JavaScript

- **Style** : Standard JS (ou Airbnb)
- **Indentation** : 2 espaces
- **Guillemets** : Simples `'` sauf pour HTML
- **Point-virgule** : Oui
- **Nommage** :
  - Variables : `camelCase`
  - Constantes : `UPPER_SNAKE_CASE`
  - Fonctions : `camelCase`
  - Classes : `PascalCase`

```javascript
// ✅ Bon
const MAX_STOCK = 100;
let clientNom = 'Dupont';

function calculerSurface(longueur, largeur) {
  return longueur * largeur;
}

class GestionnaireClients {
  constructor() {
    this.clients = [];
  }
}

// ❌ Mauvais
const max_stock = 100;
let ClientNom = 'Dupont';

function calculer_surface(longueur, largeur) {
  return longueur*largeur
}
```

### HTML

- **Indentation** : 2 espaces
- **Attributs** : Guillemets doubles `"`
- **Sémantique** : Utilisez les bonnes balises HTML5

```html
<!-- ✅ Bon -->
<section class="client-card">
  <h2 class="client-name">Jean Dupont</h2>
  <p class="client-info">Surface: 5.2 ha</p>
</section>

<!-- ❌ Mauvais -->
<div class="client-card">
  <div class="client-name">Jean Dupont</div>
  <div class='client-info'>Surface: 5.2 ha</div>
</div>
```

### CSS

- **Organisation** : Par composant
- **Nommage** : BEM-like ou classes descriptives
- **Préfixe** : Évitez les préfixes navigateur inutiles

```css
/* ✅ Bon */
.client-card {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  padding: 1rem;
}

.client-card__header {
  display: flex;
  justify-content: space-between;
}

.client-card__name {
  font-size: 1.2rem;
  font-weight: 600;
}
```

### Google Apps Script

- Suivez le style JavaScript
- Commentez les fonctions complexes
- Gérez les erreurs avec try/catch

```javascript
/**
 * Récupère toutes les données depuis Google Sheets
 * @returns {Object} Objet contenant toutes les entités
 */
function getAllData() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);

    return {
      clients: sheetToJson(ss, SHEET_NAMES.clients),
      interventions: sheetToJson(ss, SHEET_NAMES.interventions),
      // ...
    };
  } catch (error) {
    Logger.log('❌ Erreur getAllData: ' + error.toString());
    throw error;
  }
}
```

---

## 🔄 Processus de développement

### 1. Créer une branche

```bash
git checkout -b feature/nom-fonctionnalite
# ou
git checkout -b fix/nom-bug
```

### 2. Développer et tester

- Testez en mode local d'abord
- Testez la synchronisation Google Sheets
- Testez sur mobile
- Testez hors-ligne (PWA)

### 3. Committer

Messages de commit clairs et descriptifs :

```bash
# ✅ Bon
git commit -m "feat: ajout export réglementaire DGCCRF"
git commit -m "fix: correction calcul des heures personnel"
git commit -m "docs: mise à jour README installation"

# ❌ Mauvais
git commit -m "update"
git commit -m "fix bug"
git commit -m "wip"
```

**Format recommandé** : [Conventional Commits](https://www.conventionalcommits.org/)

Types :
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage (pas de changement de code)
- `refactor`: Refactorisation
- `test`: Ajout de tests
- `chore`: Tâches de maintenance

### 4. Pousser et créer une PR

```bash
git push origin feature/nom-fonctionnalite
```

Créez une Pull Request avec :
- Titre clair
- Description détaillée
- Captures d'écran si UI
- Checklist des changements

**Template PR** :

```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Checklist
- [ ] Code testé en local
- [ ] Code testé avec synchronisation
- [ ] Code testé sur mobile
- [ ] Documentation mise à jour
- [ ] Pas de régression

## Captures d'écran
(si applicable)
```

---

## 🧪 Tests

### Tests manuels (actuellement)

Avant de soumettre une PR, testez :

1. **Mode local**
   - Toutes les opérations CRUD fonctionnent
   - Export/Import JSON
   - Exports PDF/CSV

2. **Mode synchronisation**
   - Synchronisation Google Sheets
   - Pas de perte de données
   - Gestion des conflits

3. **Responsive**
   - Mobile (portrait/paysage)
   - Tablette
   - Desktop

4. **PWA**
   - Installation
   - Mode hors-ligne
   - Synchronisation au retour en ligne

5. **Navigateurs**
   - Chrome
   - Firefox
   - Safari
   - Edge

### Tests automatisés (futur - v3.0)

```javascript
// Exemple avec Jest
describe('GestionnaireClients', () => {
  test('devrait ajouter un client', () => {
    const manager = new GestionnaireClients();
    const client = { nom: 'Dupont', surface: 5.2 };

    manager.ajouterClient(client);

    expect(manager.clients).toHaveLength(1);
    expect(manager.clients[0].nom).toBe('Dupont');
  });
});
```

---

## 📚 Documentation

### Code

- Commentez les fonctions complexes
- Utilisez JSDoc pour les fonctions publiques
- Évitez les commentaires évidents

```javascript
// ❌ Mauvais
// Incrémente i
i++;

// ✅ Bon
/**
 * Calcule le volume total d'un assemblage en fonction des lots
 * @param {Array<Lot>} lots - Liste des lots à assembler
 * @returns {number} Volume total en litres
 */
function calculerVolumeAssemblage(lots) {
  return lots.reduce((total, lot) => total + lot.volume, 0);
}
```

### Documentation utilisateur

Si vous ajoutez une fonctionnalité majeure, mettez à jour :
- `README.md` : Ajouter dans la section fonctionnalités
- `INSTALLATION.md` : Si nécessaire pour l'installation
- `ROADMAP.md` : Marquer comme terminé si c'était prévu

---

## 🎨 Design et UX

### Principes

- **Mobile-first** : Concevoir d'abord pour mobile
- **Accessibilité** : Contrastes suffisants, navigation clavier
- **Performance** : Temps de chargement < 3s
- **Cohérence** : Suivre le design existant

### Couleurs

```css
/* Palette principale */
--primary: #722F37;      /* Bordeaux */
--accent: #D4AF37;       /* Or */
--background: #1a1a1a;   /* Noir */
--text: #FFFFFF;         /* Blanc */
--text-secondary: #9CA3AF; /* Gris */
```

### Iconographie

- Utilisez les emojis pour les icônes rapides
- Pour les icônes complexes : Font Awesome ou Material Icons

---

## 🔒 Sécurité

### Bonnes pratiques

- ❌ Ne committez JAMAIS de clés API ou secrets
- ✅ Utilisez `config.example.js` comme template
- ✅ Ajoutez les fichiers sensibles dans `.gitignore`
- ✅ Validez toutes les entrées utilisateur
- ✅ Échappez le HTML dans les exports

### Validation

```javascript
// ✅ Bon
function validerEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const emailInput = document.getElementById('email').value;
if (!validerEmail(emailInput)) {
  alert('Email invalide');
  return;
}
```

---

## 🚀 Checklist avant PR

- [ ] Code fonctionne en local
- [ ] Code fonctionne avec synchronisation
- [ ] Code testé sur mobile
- [ ] Pas de console.log oubliés
- [ ] Code commenté si nécessaire
- [ ] Documentation mise à jour
- [ ] Commit messages clairs
- [ ] Aucun fichier sensible committé
- [ ] Pas de régression sur fonctionnalités existantes

---

## 📞 Questions ?

- Ouvrez une **issue** pour les questions générales
- Créez une **discussion** pour les propositions de fonctionnalités
- Consultez la **documentation** existante

---

## 🙏 Remerciements

Merci de contribuer à améliorer la gestion viticole pour tous ! 🍇

**Votre contribution compte !**
