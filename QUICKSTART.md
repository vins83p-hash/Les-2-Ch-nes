# ⚡ Démarrage rapide - Les Deux Chênes

Guide ultra-rapide pour être opérationnel en 5 minutes.

## 🚀 Mode local (Test immédiat)

### 1. Lancer l'application

```bash
cd Les-2-Ch-nes
python -m http.server 8000
```

### 2. Ouvrir dans le navigateur

Ouvrez : **http://localhost:8000**

### 3. Utiliser en mode local

L'application fonctionne directement en mode local (LocalStorage).
Vous pouvez :
- ✅ Ajouter des clients
- ✅ Créer des interventions
- ✅ Gérer les stocks
- ✅ Pointer les heures
- ✅ Exporter en PDF/CSV

**⚠️ Limitation** : Les données sont stockées uniquement dans votre navigateur.

---

## ☁️ Mode synchronisation (Production)

### Étape 1 : Google Sheet (2 min)

1. Créez un Google Sheet : **"Les Deux Chênes - Data"**
2. Copiez l'ID depuis l'URL :
   ```
   https://docs.google.com/spreadsheets/d/[COPIEZ_CET_ID]/edit
   ```

### Étape 2 : Google Apps Script (3 min)

1. Allez sur [script.google.com](https://script.google.com)
2. **Nouveau projet** → Nommez "Les Deux Chênes - API"
3. Copiez le contenu de `Code-v2.gs`
4. Ligne 10 : Remplacez `SHEET_ID` par votre ID
5. **Déployer** → **Nouveau déploiement** → **Application Web**
   - Exécuter en tant que : Moi
   - Qui peut accéder : Tout le monde
6. Copiez l'URL de déploiement

### Étape 3 : Configuration app (30 sec)

**Option simple** : Modifiez `index.html` ligne ~341 :
```javascript
const API_URL = 'COLLEZ_VOTRE_URL_ICI';
```

**Option propre** : Copiez `config.example.js` → `config.js` et configurez.

### Étape 4 : Activer la synchro (10 sec)

1. Rechargez l'application
2. Cliquez sur **"📡 Mode Synchro"**
3. L'indicateur devient vert 🟢
4. Vos données sont maintenant synchronisées !

---

## 📱 Installer comme application (1 min)

### Sur ordinateur (Chrome)
1. Icône ➕ dans la barre d'adresse
2. **"Installer"**

### Sur smartphone
1. Menu navigateur → **"Ajouter à l'écran d'accueil"**

---

## 🎯 Premiers pas

### 1. Ajouter un client
- Onglet **"Clients"**
- **"+ Ajouter"**
- Remplissez le formulaire
- **"Enregistrer"**

### 2. Créer une intervention
- Onglet **"Interventions"**
- **"+ Ajouter"**
- Sélectionnez le client
- Choisissez le type de travail
- **"Enregistrer"**

### 3. Gérer les stocks
- Onglet **"Stocks"**
- **"📦 Gérer produits"** → Créez vos produits
- **"+ Stock client"** → Assignez des stocks

### 4. Pointer les heures
- Onglet **"Personnel"**
- **"+ Ajouter"** → Créez des employés
- Cliquez sur un employé → **"Pointer entrée/sortie"**

---

## 📊 Exporter des données

### Export général (JSON)
**"📊 Export"** (en haut) → Télécharge toutes les données

### Export par entité (CSV/PDF)
- Clients : **"📥 CSV"** ou **"📄 PDF"**
- Interventions : **"📥 CSV"** ou **"📄 PDF"**
- Stocks : **"📥 CSV"** ou **"📄 PDF"**
- Personnel : **"📥 CSV"** ou **"📄 PDF"**

---

## 🆘 Problèmes courants

### L'application ne se synchronise pas
1. Vérifiez l'URL dans `index.html` ou `config.js`
2. Vérifiez que le déploiement Apps Script est "Tout le monde"
3. Console navigateur (F12) pour voir les erreurs

### Les données disparaissent au rechargement
1. Vérifiez que la synchronisation est activée (icône vert 🟢)
2. Sinon, exportez régulièrement en JSON

### L'application ne fonctionne pas hors-ligne
1. Première visite en ligne requise
2. Ensuite, fonctionne sans Internet
3. Synchronisation au retour de la connexion

---

## 📖 Documentation complète

- **Installation détaillée** : Voir `INSTALLATION.md`
- **Fonctionnalités complètes** : Voir `README.md`
- **Feuille de route** : Voir `ROADMAP.md`

---

## ✨ Fonctionnalités à venir

- 🔐 Gestion des utilisateurs et droits
- 📜 Exports réglementaires (AOP, DGCCRF)
- 🗂️ Gestion documentaire (Drive)
- 📍 Cartographie avancée
- 🔄 Assemblage multi-lots

Voir `ROADMAP.md` pour plus de détails.

---

**Besoin d'aide ?** Consultez `INSTALLATION.md` ou `README.md`

**Bon courage ! 🍇**
