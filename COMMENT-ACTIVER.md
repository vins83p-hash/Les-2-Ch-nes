# 🔧 Comment activer les nouvelles fonctionnalités

## ⚠️ Important pour vous (novice en informatique)

Les nouvelles fonctionnalités ont été **créées** mais ne sont **pas encore activées** dans votre application.

**Pourquoi ?**
Pour activer, il faut modifier le fichier `index.html`, ce qui nécessite un ordinateur.

**Sur mobile, c'est compliqué.**

---

## 📱 Solution si vous êtes sur mobile

### Option 1 : Demander de l'aide

Demandez à quelqu'un qui s'y connaît en informatique de faire l'intégration pour vous.

Donnez-lui ce fichier, il saura quoi faire.

### Option 2 : Utiliser un ordinateur

Si vous avez accès à un ordinateur :
1. Allez sur [github.com](https://github.com)
2. Ouvrez votre projet "Les-2-Ch-nes"
3. Suivez les instructions ci-dessous

### Option 3 : Attendre l'aide technique

Contactez votre support technique ou le développeur qui gère le projet.

---

## 💻 Pour celui qui va faire l'intégration

### Ce qui a été créé

**Fichiers prêts à utiliser :**
- `auth.js` → Système de connexion
- `login-screen.html` → Interface de connexion
- `users-manager.js` → Gestion des utilisateurs
- `regulatory-export.js` → Exports réglementaires

**Guides :**
- `GUIDE-UTILISATEURS.md`
- `GUIDE-EXPORTS-REGLEMENTAIRES.md`
- `NOUVEAUTES.md`

---

## 🔧 Étapes d'intégration (pour développeur/technicien)

### 1. Inclure les fichiers JavaScript

Dans `index.html`, juste avant la balise `</head>`, ajouter :

```html
<!-- Système d'authentification -->
<script src="auth.js"></script>
<script src="users-manager.js"></script>

<!-- Exports réglementaires -->
<script src="regulatory-export.js"></script>
```

### 2. Inclure l'écran de connexion

Dans `index.html`, juste après la balise `<body>`, ajouter le contenu de `login-screen.html`.

Ou plus simple :
```html
<body>
  <!-- Écran de connexion (copier le contenu de login-screen.html ici) -->

  <!-- Reste de l'application existante -->
  <div id="app-container">
    <!-- Le contenu actuel de l'app -->
  </div>
</body>
```

### 3. Ajouter le bouton "Exports réglementaires"

Dans la section header de `index.html`, ajouter :

```html
<button class="export-btn" onclick="showRegulatoryExportModal()">
  📜 Exports réglementaires
</button>
```

### 4. Modifier l'initialisation

Dans la fonction `initApp()` à la fin de `index.html`, ajouter :

```javascript
async function initApp() {
  // Vérifier si l'utilisateur est connecté
  if (!isLoggedIn()) {
    showLoginScreen();
    return;
  }

  // Code existant...
  await loadData();
  // ... reste du code ...

  // Initialiser le gestionnaire d'utilisateurs
  initUsersManager();
}
```

### 5. Protéger les actions sensibles

Dans les fonctions de modification (ajout/suppression), ajouter :

```javascript
function saveClient() {
  // Vérifier les permissions
  if (!hasPermission('write:*')) {
    alert('❌ Vous n\'avez pas la permission');
    return;
  }

  // Code existant...
}
```

### 6. Tester

1. Ouvrir l'application
2. Vérifier que l'écran de connexion s'affiche
3. Se connecter avec `admin / admin123`
4. Vérifier que tout fonctionne
5. **CHANGER les mots de passe par défaut**

---

## 📋 Checklist d'intégration

- [ ] Les 4 fichiers JS sont inclus dans index.html
- [ ] L'écran de connexion est ajouté au HTML
- [ ] Le bouton "Exports réglementaires" est visible
- [ ] La fonction initApp() est modifiée
- [ ] L'app affiche l'écran de connexion au démarrage
- [ ] La connexion fonctionne (admin/admin123)
- [ ] Les 3 rôles fonctionnent (admin, chef, ouvrier)
- [ ] Les exports réglementaires s'ouvrent
- [ ] Les fichiers se téléchargent correctement
- [ ] Les mots de passe par défaut ont été changés

---

## 🎯 Version simplifiée (tout-en-un)

Si c'est trop compliqué de modifier plusieurs endroits :

### Créer un nouveau fichier index-v2.html

1. Copier le fichier `index.html` actuel
2. Le renommer `index-v2.html`
3. Faire toutes les modifications dessus
4. Tester sur `index-v2.html`
5. Quand ça marche, remplacer `index.html`

Comme ça, si ça ne marche pas, on garde l'ancienne version.

---

## ⚙️ Structure finale attendue

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Meta et styles existants -->

  <!-- NOUVEAU : Scripts d'authentification -->
  <script src="auth.js"></script>
  <script src="users-manager.js"></script>
  <script src="regulatory-export.js"></script>
</head>
<body>

  <!-- NOUVEAU : Écran de connexion -->
  <div id="login-screen">
    <!-- Contenu de login-screen.html -->
  </div>

  <!-- Application existante -->
  <div id="app-container">
    <div class="header">
      <!-- Header existant -->

      <!-- NOUVEAU : Bouton exports -->
      <button onclick="showRegulatoryExportModal()">
        📜 Exports réglementaires
      </button>
    </div>

    <!-- Reste de l'app (nav, sections, etc.) -->

    <!-- NOUVEAU : Section utilisateurs (contenu de login-screen.html) -->
    <div id="users" class="section">
      <!-- Interface de gestion des utilisateurs -->
    </div>
  </div>

  <script>
    // Code JavaScript existant...

    // MODIFIÉ : Nouvelle fonction init
    async function initApp() {
      if (!isLoggedIn()) {
        showLoginScreen();
        return;
      }

      await loadData();
      // ... code existant ...
      initUsersManager();
    }

    initApp();
  </script>
</body>
</html>
```

---

## 🆘 En cas de problème

### L'écran de connexion ne s'affiche pas

1. Vérifier que `auth.js` est bien chargé
2. Ouvrir la console (F12) et regarder les erreurs
3. Vérifier que `<div id="login-screen">` existe

### "isLoggedIn is not defined"

Le fichier `auth.js` n'est pas chargé ou mal inclus.

### Les exports ne fonctionnent pas

1. Vérifier que `regulatory-export.js` est chargé
2. Vérifier que `data.interventions`, `data.stocks`, etc. existent
3. Regarder la console pour les erreurs

### Je ne peux plus accéder à l'app

Solution d'urgence :
1. Ouvrir la console du navigateur (F12)
2. Taper : `localStorage.clear()`
3. Recharger la page
4. Se reconnecter

---

## 📞 Besoin d'aide ?

Si vous bloquez, vous pouvez :

1. **Contacter un développeur** qui pourra faire l'intégration
2. **Utiliser GitHub Codespaces** pour modifier en ligne (nécessite compte GitHub)
3. **Attendre une version tout-en-un** déjà intégrée

---

## 🎉 Une fois intégré

Votre application aura :
- ✅ Connexion sécurisée
- ✅ 3 types d'utilisateurs
- ✅ Exports réglementaires conformes
- ✅ Protection des données

**Félicitations ! 🍇**

---

## 📝 Note pour le futur

La prochaine version de l'application sera livrée **déjà intégrée** pour éviter cette étape manuelle.

En attendant, ce fichier vous guide (ou guide la personne qui vous aide) pour activer les nouvelles fonctionnalités.
