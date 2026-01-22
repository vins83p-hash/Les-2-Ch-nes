# 🍇 Les Deux Chênes - Gestion Viticole

Application web progressive (PWA) pour la gestion complète d'un domaine viticole.

## 📋 Fonctionnalités actuelles

### ✅ Déjà implémenté

- **👥 Gestion des clients**
  - Fiches clients avec photos
  - Coordonnées complètes (téléphone, email, adresse)
  - Surface des parcelles
  - Liens vers documents Drive
  - Filtrage et recherche

- **📋 Gestion des interventions**
  - 30+ types de travaux viticoles prédéfinis
  - Suivi des durées et statuts
  - Planification par client et parcelle
  - Export PDF et CSV

- **📦 Gestion des stocks phytosanitaires**
  - Catalogue de produits avec photos
  - Stocks par client
  - Alertes de stock bas
  - Dosage à l'hectare

- **👷 Gestion du personnel**
  - Fiches employés avec photos
  - Pointage des heures
  - Historique du temps de travail
  - Calcul automatique des heures

- **🗺️ Cartographie**
  - Intégration Google Maps
  - Visualisation des parcelles
  - Statistiques de surface

- **💾 Synchronisation**
  - Mode local (LocalStorage)
  - Mode cloud (Google Sheets)
  - Import/Export JSON
  - Service Worker pour mode hors-ligne

## 🚀 Installation

### 1. Configuration Google Sheets

1. Créez un nouveau Google Sheet nommé "Les Deux Chênes - Data"
2. Copiez l'ID du Sheet depuis l'URL : `https://docs.google.com/spreadsheets/d/{ID}/edit`
3. Ouvrez `Code-v2.gs` et remplacez `VOTRE_ID_ICI` par l'ID

### 2. Déploiement Google Apps Script

1. Allez sur [script.google.com](https://script.google.com)
2. Créez un nouveau projet
3. Copiez le contenu de `Code-v2.gs`
4. Déployez en tant qu'application web :
   - Cliquez sur "Déployer" > "Nouveau déploiement"
   - Type : Application Web
   - Exécuter en tant que : Moi
   - Qui peut accéder : Tout le monde
5. Copiez l'URL de déploiement

### 3. Configuration de l'application

1. Ouvrez `index.html`
2. Recherchez `const API_URL` (environ ligne 341)
3. Remplacez par l'URL de déploiement Google Apps Script

### 4. Hébergement

**Option A : GitHub Pages**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```
Activez GitHub Pages dans Settings > Pages

**Option B : Local**
```bash
python -m http.server 8000
# Ouvrir http://localhost:8000
```

**Option C : Netlify/Vercel**
- Connectez votre dépôt GitHub
- Déploiement automatique

## 📱 Installation PWA

1. Ouvrez l'application dans Chrome/Safari
2. Cliquez sur "Installer l'application" ou "Ajouter à l'écran d'accueil"
3. L'application fonctionnera hors-ligne après la première visite

## 🎯 Fonctionnalités prévues

### 🔜 Prochaines améliorations

- [ ] **🔐 Gestion des droits utilisateurs**
  - Rôle Ouvrier (lecture seule + pointage)
  - Rôle Chef de cave (gestion complète sauf admin)
  - Rôle Admin (tous les droits)
  - Authentification sécurisée

- [ ] **📜 Export réglementaire**
  - Export format AOP
  - Export format DGCCRF
  - Registre phytosanitaire conforme
  - Traçabilité complète

- [ ] **🗂️ Gestion documentaire**
  - Upload de documents (analyses labo, certificats)
  - Stockage Google Drive intégré
  - Catégorisation par type
  - Recherche et filtrage

- [ ] **📍 Cartographie avancée**
  - Sélection parcelle sur carte
  - Calcul automatique de surface
  - Géolocalisation des interventions
  - Export KML/GeoJSON

- [ ] **🔄 Assemblage multi-lots**
  - Création d'assemblages
  - Calcul automatique des proportions
  - Suivi des lots de vin
  - Traçabilité des assemblages

## 🛠️ Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript (Vanilla)
- **Backend** : Google Apps Script
- **Base de données** : Google Sheets
- **Stockage local** : LocalStorage API
- **PWA** : Service Worker, Web App Manifest
- **PDF** : jsPDF + autoTable
- **Cartes** : Google Maps

## 📄 Structure du projet

```
Les-2-Ch-nes/
├── index.html              # Application principale
├── Code-v2.gs             # Backend Google Apps Script
├── manifest.json          # Configuration PWA
├── service-worker.js      # Service Worker pour mode hors-ligne
├── logo.png               # Logo de l'application
├── icon-192.png           # Icône PWA 192x192
├── icon-512.png           # Icône PWA 512x512
├── background.webp        # Image de fond
├── heliocuivre.webp       # Image produit exemple
└── README.md              # Documentation
```

## 🔒 Sécurité

- Les données sont stockées dans votre Google Sheet privé
- Authentification Google pour l'accès au backend
- Mode hors-ligne avec chiffrement local (à venir)
- Validation des entrées côté client et serveur

## 📊 Export des données

L'application supporte plusieurs formats d'export :

- **JSON** : Sauvegarde complète de toutes les données
- **CSV** : Export par entité (clients, interventions, stocks, personnel)
- **PDF** : Rapports formatés avec logo et mise en page professionnelle

## 🤝 Contribution

Ce projet est propriétaire. Pour toute question ou suggestion, contactez le propriétaire.

## 📝 Licence

Tous droits réservés © Les Deux Chênes

## 🆘 Support

Pour configurer votre instance :
1. Suivez scrupuleusement les étapes d'installation
2. Vérifiez les logs dans la console du navigateur (F12)
3. Testez d'abord en mode local avant de synchroniser

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `index.html` :
- Primaire : `#722F37` (bordeaux)
- Accent : `#D4AF37` (or)
- Fond : `#1a1a1a` (noir)

### Logo
Remplacez `logo.png`, `icon-192.png` et `icon-512.png` par vos propres visuels.

### Types d'interventions
Modifiez la liste dans `index.html` ligne ~259 dans le select `#intType`.
