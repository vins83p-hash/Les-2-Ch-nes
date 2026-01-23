# 📦 Guide d'Installation - Les Deux Chênes

Ce guide vous accompagne pas à pas dans l'installation de l'application de gestion viticole.

## ⏱️ Temps estimé : 15-20 minutes

## 📋 Prérequis

- Un compte Google (Gmail)
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- (Optionnel) Un compte GitHub pour hébergement

---

## 🚀 Étape 1 : Configuration Google Sheets

### 1.1 Créer le Google Sheet

1. Allez sur [sheets.google.com](https://sheets.google.com)
2. Créez une nouvelle feuille de calcul
3. Nommez-la **"Les Deux Chênes - Data"**
4. Notez l'**ID du Sheet** depuis l'URL :
   ```
   https://docs.google.com/spreadsheets/d/[COPIEZ_CET_ID]/edit
   ```
   Exemple : `1abc123XYZ456def789GHI`

### 1.2 Configurer les onglets

Les onglets seront créés automatiquement par le script.
Vous pouvez passer à l'étape suivante.

---

## ⚙️ Étape 2 : Déploiement Google Apps Script

### 2.1 Créer le projet Apps Script

1. Allez sur [script.google.com](https://script.google.com)
2. Cliquez sur **"Nouveau projet"**
3. Nommez le projet : **"Les Deux Chênes - API"**

### 2.2 Copier le code

1. Ouvrez le fichier `Code-v2.gs` de ce projet
2. Copiez tout son contenu
3. Collez-le dans l'éditeur Google Apps Script (remplace `function myFunction()...`)

### 2.3 Configurer l'ID du Sheet

Dans l'éditeur Apps Script, ligne 10, remplacez :
```javascript
const SHEET_ID = 'VOTRE_ID_ICI';
```
Par :
```javascript
const SHEET_ID = 'VOTRE_ID_GOOGLE_SHEET';  // L'ID copié à l'étape 1.1
```

### 2.4 Tester le script

1. Sélectionnez la fonction `testSync` dans le menu déroulant
2. Cliquez sur **"Exécuter"**
3. Autorisez l'application lors de la première exécution :
   - Cliquez sur "Examiner les autorisations"
   - Sélectionnez votre compte Google
   - Cliquez sur "Paramètres avancés"
   - Cliquez sur "Accéder à Les Deux Chênes - API (non sécurisé)"
   - Autoriser
4. Vérifiez les logs (Ctrl+Entrée ou Affichage > Journaux)
   - Vous devriez voir "✅ Test réussi !"

### 2.5 Déployer l'application web

1. Cliquez sur **"Déployer"** > **"Nouveau déploiement"**
2. Cliquez sur l'icône ⚙️ et sélectionnez **"Application Web"**
3. Configuration :
   - **Description** : "API Les Deux Chênes v1"
   - **Exécuter en tant que** : Moi (votre email)
   - **Qui peut accéder** : Tout le monde
4. Cliquez sur **"Déployer"**
5. **IMPORTANT** : Copiez l'**URL de déploiement**
   ```
   https://script.google.com/macros/s/[ID_UNIQUE]/exec
   ```
   Gardez cette URL, elle sera nécessaire à l'étape suivante.

---

## 🌐 Étape 3 : Configuration de l'application web

### 3.1 Créer le fichier de configuration

1. Copiez le fichier `config.example.js` en `config.js` :
   ```bash
   cp config.example.js config.js
   ```

2. Ouvrez `config.js` et modifiez :
   ```javascript
   API_URL: 'https://script.google.com/macros/s/[VOTRE_ID]/exec',
   SHEET_ID: 'VOTRE_ID_GOOGLE_SHEET',
   ```

### 3.2 Modifier index.html (méthode alternative)

Si vous ne souhaitez pas utiliser config.js :

1. Ouvrez `index.html`
2. Recherchez `const API_URL` (environ ligne 341)
3. Remplacez :
   ```javascript
   const API_URL = '';  // Mode local seulement
   ```
   Par :
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/[VOTRE_ID]/exec';
   ```

---

## 🖥️ Étape 4 : Hébergement de l'application

Choisissez l'une des options suivantes :

### Option A : Test en local (recommandé pour débuter)

#### Méthode 1 : Python (le plus simple)
```bash
cd Les-2-Ch-nes
python -m http.server 8000
```
Ouvrez : http://localhost:8000

#### Méthode 2 : PHP
```bash
cd Les-2-Ch-nes
php -S localhost:8000
```

#### Méthode 3 : Node.js (si installé)
```bash
npx http-server -p 8000
```

### Option B : GitHub Pages (gratuit et permanent)

1. Créez un dépôt GitHub (si pas déjà fait)
2. Committez tous les fichiers :
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Les Deux Chênes"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/les-deux-chenes.git
   git push -u origin main
   ```

3. Activez GitHub Pages :
   - Allez dans Settings > Pages
   - Source : Deploy from a branch
   - Branch : main / (root)
   - Save

4. Votre application sera disponible sur :
   ```
   https://VOTRE_USERNAME.github.io/les-deux-chenes/
   ```

### Option C : Netlify (très simple)

1. Créez un compte sur [netlify.com](https://netlify.com)
2. Glissez-déposez le dossier du projet dans Netlify
3. Votre site est en ligne !

### Option D : Vercel

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Importez le projet depuis GitHub
3. Déploiement automatique à chaque commit

---

## 📱 Étape 5 : Installation PWA (Application)

### Sur ordinateur (Chrome/Edge) :

1. Ouvrez l'application dans Chrome
2. Cliquez sur l'icône ➕ dans la barre d'adresse
3. Cliquez sur "Installer"

### Sur iPhone/iPad :

1. Ouvrez l'application dans Safari
2. Cliquez sur le bouton Partager 📤
3. Sélectionnez "Sur l'écran d'accueil"
4. Confirmez

### Sur Android :

1. Ouvrez l'application dans Chrome
2. Menu (⋮) > "Installer l'application"
3. Confirmez

---

## ✅ Étape 6 : Vérification

### Test de synchronisation

1. Ouvrez l'application
2. Cliquez sur **"📡 Mode Synchro"** en haut à droite
3. L'indicateur devrait passer au vert 🟢
4. Ajoutez un client de test
5. Vérifiez dans votre Google Sheet que les données apparaissent

### Test hors-ligne

1. Activez le mode avion
2. Rechargez l'application
3. Vous devriez pouvoir consulter les données
4. Les modifications seront synchronisées au retour de la connexion

---

## 🎨 Étape 7 : Personnalisation (optionnel)

### Logo et icônes

Remplacez ces fichiers par vos propres visuels :
- `logo.png` : Logo principal (carré, 500x500px recommandé)
- `icon-192.png` : Icône PWA petite (192x192px)
- `icon-512.png` : Icône PWA grande (512x512px)
- `background.webp` : Image de fond (1920x1080px recommandé)

### Couleurs

Modifiez dans `config.js` ou directement dans `index.html` :
```javascript
THEME: {
  PRIMARY_COLOR: '#722F37',    // Couleur principale
  ACCENT_COLOR: '#D4AF37',     // Couleur d'accentuation
  // ...
}
```

### Informations entreprise

Dans `config.js` :
```javascript
COMPANY_NAME: 'Votre Domaine',
COMPANY_PHONE: '+33 X XX XX XX XX',
COMPANY_EMAIL: 'contact@votredomaine.fr',
```

---

## 🆘 Résolution de problèmes

### L'application ne se synchronise pas

1. Vérifiez que l'API_URL est correcte dans config.js ou index.html
2. Vérifiez que le déploiement Apps Script est bien "Tout le monde"
3. Ouvrez la console (F12) et regardez les erreurs
4. Réexécutez `testSync()` dans Apps Script

### Les données ne s'affichent pas

1. Vérifiez la console navigateur (F12)
2. Vérifiez que le SHEET_ID est correct dans Code-v2.gs
3. Testez en mode local d'abord (sans synchronisation)

### L'application ne fonctionne pas hors-ligne

1. Vérifiez que `service-worker.js` est bien présent
2. Vérifiez que l'application est servie en HTTPS (requis pour PWA)
3. Consultez Application > Service Workers dans les outils développeur (F12)

### Erreur 403 ou 401

1. Vérifiez les autorisations du déploiement Apps Script
2. Redéployez avec "Nouveau déploiement"
3. Vérifiez que "Qui peut accéder" est bien "Tout le monde"

---

## 📞 Support

Pour toute question sur l'installation :
1. Vérifiez la console du navigateur (F12)
2. Consultez le README.md
3. Vérifiez les logs Apps Script

---

## 🎉 Félicitations !

Votre application Les Deux Chênes est maintenant opérationnelle !

### Prochaines étapes :

1. Ajoutez vos clients
2. Créez votre catalogue de produits
3. Enregistrez vos interventions
4. Configurez votre personnel
5. Explorez les exports PDF et CSV

**Bon courage dans la gestion de votre domaine viticole ! 🍇**
