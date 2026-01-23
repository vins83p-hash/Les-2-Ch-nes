# 🗺️ Feuille de route - Les Deux Chênes

## Vision

Créer la solution de gestion viticole la plus complète et intuitive, respectant les normes réglementaires françaises et européennes tout en restant simple d'utilisation.

---

## 📊 État actuel (v1.0)

### ✅ Fonctionnalités opérationnelles

- [x] Gestion des clients
- [x] Gestion des interventions (30+ types de travaux)
- [x] Gestion des stocks phytosanitaires
- [x] Gestion du personnel avec pointage
- [x] Cartographie Google Maps
- [x] Synchronisation Google Sheets
- [x] Mode hors-ligne (PWA)
- [x] Exports PDF et CSV
- [x] Interface mobile-first

---

## 🎯 Version 2.0 - Gestion réglementaire et sécurité

**Objectif** : Conformité totale avec les exigences AOP et DGCCRF

### 🔐 Gestion des droits utilisateurs

**Priorité** : 🔴 Haute
**Complexité** : ⭐⭐⭐ Moyenne
**Temps estimé** : Architecture complète

#### Fonctionnalités

- **Système de rôles**
  - 👷 **Ouvrier** : Lecture seule + pointage personnel
  - 👨‍🌾 **Chef de cave** : Gestion complète sauf paramètres admin
  - 👔 **Administrateur** : Tous les droits

- **Authentification**
  - Login/mot de passe sécurisé
  - Sessions avec JWT
  - Récupération de mot de passe
  - Authentification à deux facteurs (2FA) optionnelle

- **Gestion des permissions**
  - Permissions granulaires par entité
  - Logs d'audit des actions
  - Restrictions d'accès par client/parcelle

#### Architecture technique

```javascript
// Structure des rôles
const ROLES = {
  OUVRIER: {
    permissions: ['read:all', 'write:own_pointage'],
    ui: ['dashboard', 'personnel_pointage']
  },
  CHEF_CAVE: {
    permissions: ['read:all', 'write:all'],
    ui: ['dashboard', 'clients', 'interventions', 'stocks', 'personnel']
  },
  ADMIN: {
    permissions: ['*'],
    ui: ['*', 'settings', 'users']
  }
};
```

#### Fichiers à créer

- `auth.js` : Système d'authentification
- `permissions.js` : Gestion des permissions
- `users-manager.html` : Interface de gestion utilisateurs
- Backend : Nouvel onglet "Users" dans Google Sheet

---

### 📜 Export réglementaire (AOP / DGCCRF)

**Priorité** : 🔴 Haute
**Complexité** : ⭐⭐⭐⭐ Élevée
**Temps estimé** : Architecture complète

#### Fonctionnalités

- **Registre phytosanitaire conforme**
  - Date et heure d'intervention
  - Parcelle traitée (surface exacte)
  - Produit utilisé (nom commercial, AMM)
  - Dose appliquée
  - Stade phénologique
  - Conditions météo
  - Opérateur

- **Export format AOP**
  - Cahier des charges AOP Côtes de Provence / Bandol / etc.
  - Traçabilité complète de la vendange à la mise en bouteille
  - Registre des mouvements (entrées/sorties de vin)
  - Déclarations de récolte
  - Inventaire des stocks de vin

- **Export format DGCCRF**
  - Format CSV standardisé
  - Champs obligatoires conformes
  - Export par campagne viticole
  - Validation des données avant export

- **Autres exports réglementaires**
  - Registre du personnel (heures, contrats)
  - Déclaration PAC (Politique Agricole Commune)
  - Certification HVE / Bio / Terra Vitis

#### Structure des données

```javascript
const INTERVENTION_REGLEMENT = {
  id: 'INT-2024-001',
  date: '2024-03-15T09:30:00',
  parcelle: {
    nom: 'Les Restanques',
    surface: 2.5,  // hectares
    commune: 'Bandol',
    section: 'AB',
    numero: '123'
  },
  produit: {
    nom_commercial: 'Héliocuivre',
    substance_active: 'Sulfate de cuivre',
    amm: '2020001234',  // Autorisation de Mise sur le Marché
    dose_ha: 1.5,       // L/ha
    dose_totale: 3.75   // L
  },
  conditions: {
    stade_phenologique: 'Débourrement',
    temperature: 18,    // °C
    vent: 'Faible',
    hygrometrie: 65     // %
  },
  operateur: 'Jean Dupont',
  materiel: 'Pulvérisateur 400L',
  signature_numerique: 'hash_validation'
};
```

#### Fichiers à créer

- `regulatory-export.js` : Moteur d'export
- `templates/aop-export.template.js` : Template AOP
- `templates/dgccrf-export.template.js` : Template DGCCRF
- `validators/regulatory-validator.js` : Validation des données

---

## 🎯 Version 2.1 - Gestion documentaire

**Objectif** : Centraliser tous les documents du domaine

### 🗂️ Gestion des documents joints

**Priorité** : 🟡 Moyenne
**Complexité** : ⭐⭐⭐ Moyenne
**Temps estimé** : Architecture modulaire

#### Fonctionnalités

- **Upload de documents**
  - Glisser-déposer
  - Validation de format (PDF, JPG, PNG, DOC, XLS)
  - Limitation de taille (10MB par fichier)
  - Compression automatique des images

- **Catégories de documents**
  - 📊 Analyses de laboratoire (moût, vin, sol)
  - 📄 Certificats (Bio, HVE, AOP)
  - 📝 Factures et devis
  - 🚜 Manuels d'équipement
  - 📋 Contrats (personnel, clients, fournisseurs)
  - 🔬 Analyses phytosanitaires
  - 🍇 Cahiers des charges

- **Stockage Google Drive**
  - Intégration Google Drive API
  - Organisation en dossiers automatiques
  - Partage sélectif par lien
  - Synchronisation bidirectionnelle

- **Recherche et filtrage**
  - Recherche plein texte (OCR sur PDF)
  - Filtre par type, date, client
  - Tags personnalisés
  - Archive des anciens documents

- **Association intelligente**
  - Lier documents aux clients
  - Lier documents aux interventions
  - Lier documents aux parcelles
  - Historique des versions

#### Architecture technique

```javascript
const DOCUMENT = {
  id: 'DOC-2024-001',
  nom: 'Analyse_Vin_Rouge_2023.pdf',
  type: 'ANALYSE_LABO',
  categorie: 'Vin',
  date_upload: '2024-03-15',
  date_document: '2024-03-10',
  taille: 2048576,  // octets
  mime_type: 'application/pdf',

  // Stockage
  storage: {
    type: 'GOOGLE_DRIVE',
    file_id: 'gdrive_1abc123xyz',
    url: 'https://drive.google.com/file/d/...',
    chemin: '/Documents/2024/Analyses/Mars/'
  },

  // Relations
  relations: {
    client_id: 'CLI-001',
    intervention_id: null,
    parcelle_id: 'PAR-005'
  },

  // Métadonnées
  metadata: {
    laboratoire: 'Lab Oenologie Provence',
    type_analyse: 'Analyse complète',
    tags: ['2023', 'rouge', 'cuvée-prestige'],
    confidentialite: 'PRIVE'
  },

  uploader: 'admin@lesdeuxchenes.fr',
  lastModified: 1234567890
};
```

#### Fichiers à créer

- `documents-manager.js` : Gestionnaire de documents
- `google-drive-integration.js` : Intégration Drive API
- `document-viewer.html` : Visionneuse de documents
- `ocr-search.js` : Recherche OCR (optionnel)

---

## 🎯 Version 2.2 - Cartographie avancée

**Objectif** : Lien intelligent entre carte et données

### 📍 Amélioration du lien parcelle-cartographie

**Priorité** : 🟡 Moyenne
**Complexité** : ⭐⭐⭐⭐ Élevée
**Temps estimé** : Intégration cartographique avancée

#### Fonctionnalités

- **Parcellaire interactif**
  - Dessin des parcelles sur la carte
  - Import de fichiers SIG (KML, GeoJSON, Shapefile)
  - Calcul automatique de surface
  - Edition des contours

- **Données cadastrales**
  - Intégration API cadastre.gouv.fr
  - Affichage des sections cadastrales
  - Export des données cadastrales

- **Géolocalisation des interventions**
  - Position GPS lors de l'intervention (mobile)
  - Historique des passages sur une parcelle
  - Heatmap des traitements
  - Zones non traitées

- **Analyses de parcelle**
  - Cépages par parcelle
  - Âge des vignes
  - Rendement par parcelle
  - Historique des analyses de sol

- **Export cartographique**
  - Export KML pour Google Earth
  - Export GeoJSON pour SIG
  - Impression de plans de parcellaire
  - QR codes par parcelle

#### Architecture technique

```javascript
const PARCELLE = {
  id: 'PAR-001',
  nom: 'Les Restanques',

  // Géométrie
  geometrie: {
    type: 'Polygon',
    coordinates: [
      [
        [6.123456, 43.123456],
        [6.123789, 43.123456],
        [6.123789, 43.123789],
        [6.123456, 43.123789],
        [6.123456, 43.123456]
      ]
    ]
  },

  // Cadastre
  cadastre: {
    commune: 'Bandol',
    section: 'AB',
    numero: '123',
    surface_cadastrale: 2.48  // hectares
  },

  // Viticulture
  viticulture: {
    cepages: [
      { nom: 'Mourvèdre', pourcentage: 60 },
      { nom: 'Grenache', pourcentage: 30 },
      { nom: 'Cinsault', pourcentage: 10 }
    ],
    annee_plantation: 1995,
    mode_conduite: 'Gobelet',
    densite: 5000,  // pieds/ha
    irrigation: true
  },

  // Relations
  client_id: 'CLI-001',
  surface_calculee: 2.5,  // hectares (depuis géométrie)

  lastModified: 1234567890
};
```

#### Fichiers à créer

- `map-editor.js` : Éditeur de carte interactif
- `geo-calculator.js` : Calculs géographiques
- `cadastre-api.js` : Intégration API cadastre
- `gps-tracker.js` : Géolocalisation mobile

#### APIs externes

- Google Maps JavaScript API
- Leaflet.js (alternative open-source)
- API Cadastre (data.gouv.fr)
- Turf.js (calculs géographiques)

---

## 🎯 Version 3.0 - Gestion cave et assemblage

**Objectif** : Suivi complet de la cave à la bouteille

### 🔄 Assemblage multi-lots avec calcul automatique

**Priorité** : 🟢 Basse (mais très utile)
**Complexité** : ⭐⭐⭐⭐⭐ Très élevée
**Temps estimé** : Système complet de cave

#### Fonctionnalités

- **Gestion des cuves et contenants**
  - Liste des cuves (inox, béton, bois)
  - Capacité et taux de remplissage
  - Historique des contenus
  - Nettoyage et entretien

- **Suivi des lots de vin**
  - Création de lots de vendange
  - Traçabilité parcelle → cuve
  - Analyses œnologiques par lot
  - Courbes de fermentation

- **Assemblage intelligent**
  - Sélection de lots à assembler
  - Calcul automatique des proportions
  - Simulation de profil organoleptique
  - Validation réglementaire (AOP)

- **Calculs automatiques**
  - Volume total de l'assemblage
  - Degré alcoolique moyen
  - Acidité moyenne
  - pH moyen
  - SO2 total
  - Coûts de production

- **Traçabilité complète**
  - Parcelles d'origine
  - Dates de vendange
  - Traitements œnologiques
  - Analyses successives
  - Embouteillage

#### Architecture technique

```javascript
const LOT_VIN = {
  id: 'LOT-2023-001',
  nom: 'Mourvèdre Restanques 2023',

  // Origine
  origine: {
    annee: 2023,
    parcelles: [
      { id: 'PAR-001', surface: 2.5, kg_vendange: 8750 }
    ],
    date_vendange: '2023-09-15',
    type_vendange: 'Manuelle'
  },

  // Vinification
  vinification: {
    cuve_id: 'CUV-05',
    type_vinification: 'Rouge traditionnelle',
    levures: 'Levures indigènes',
    duree_maceration: 21,  // jours
    temperature_max: 28     // °C
  },

  // Analyses
  analyses: [
    {
      date: '2023-10-15',
      degre: 13.5,
      acidite_totale: 4.2,  // g/L H2SO4
      acidite_volatile: 0.35,
      pH: 3.65,
      so2_libre: 15,
      so2_total: 45
    }
  ],

  // Stock
  volume_actuel: 1850,  // litres
  contenant_actuel: 'CUV-05',
  statut: 'En élevage',

  lastModified: 1234567890
};

const ASSEMBLAGE = {
  id: 'ASS-2024-001',
  nom: 'Cuvée Prestige 2023',
  date_assemblage: '2024-03-15',

  // Composition
  lots: [
    {
      lot_id: 'LOT-2023-001',
      volume: 1500,        // litres
      pourcentage: 60      // %
    },
    {
      lot_id: 'LOT-2023-005',
      volume: 750,
      pourcentage: 30
    },
    {
      lot_id: 'LOT-2023-008',
      volume: 250,
      pourcentage: 10
    }
  ],

  // Calculs automatiques
  volume_total: 2500,      // litres
  degre_calcule: 13.8,     // moyenne pondérée
  acidite_calculee: 4.1,
  pH_calcule: 3.62,

  // Conformité AOP
  conformite_aop: {
    valide: true,
    appellation: 'Bandol',
    cepages: [
      { nom: 'Mourvèdre', pourcentage: 60 },
      { nom: 'Grenache', pourcentage: 30 },
      { nom: 'Cinsault', pourcentage: 10 }
    ],
    respect_cahier_charges: true
  },

  // Destination
  cuve_destination: 'CUV-12',
  statut: 'Assemblé',

  lastModified: 1234567890
};
```

#### Fichiers à créer

- `cave-manager.js` : Gestion de la cave
- `assemblage-calculator.js` : Calculs d'assemblage
- `fermentation-tracker.js` : Suivi de fermentation
- `aop-validator.js` : Validation AOP
- `cellar-dashboard.html` : Tableau de bord cave

#### Calculs complexes

```javascript
// Exemple : Calcul du degré alcoolique d'un assemblage
function calculerDegreAssemblage(lots) {
  const volumeTotal = lots.reduce((sum, lot) => sum + lot.volume, 0);

  const degrePondere = lots.reduce((sum, lot) => {
    const analyseRecente = getAnalyseRecente(lot.lot_id);
    return sum + (analyseRecente.degre * lot.volume);
  }, 0);

  return (degrePondere / volumeTotal).toFixed(2);
}

// Validation AOP
function validerConformiteAOP(assemblage, appellation) {
  const cahierCharges = CAHIERS_CHARGES_AOP[appellation];

  // Vérifier cépages
  const cepagesPrincipaux = assemblage.lots
    .map(lot => getCepagePrincipal(lot))
    .reduce((acc, cepage) => {
      acc[cepage] = (acc[cepage] || 0) + 1;
      return acc;
    }, {});

  // Vérifier degré alcoolique
  if (assemblage.degre_calcule < cahierCharges.degre_min) {
    return { valide: false, erreur: 'Degré insuffisant' };
  }

  // ... autres vérifications

  return { valide: true };
}
```

---

## 🎯 Version 3.1 - Intelligence et automatisation

**Objectif** : Assistant intelligent pour décisions viticoles

### 🤖 Fonctionnalités futures (Visionnaire)

#### IA et prédictions

- **Assistant météo intelligent**
  - Prévisions locales précises
  - Alertes gel, grêle, maladie
  - Suggestions de traitements préventifs

- **Prédictions de récolte**
  - Estimation de rendement
  - Prévision de qualité
  - Optimisation de la date de vendange

- **Détection de maladies**
  - Upload de photos de feuilles
  - Reconnaissance d'image (IA)
  - Diagnostic automatique
  - Recommandations de traitement

#### Automatisation

- **Planning intelligent**
  - Génération automatique de planning
  - Optimisation des tournées
  - Alertes de tâches urgentes

- **Commandes automatiques**
  - Déclenchement auto commande produits (stock bas)
  - Intégration fournisseurs
  - Gestion des budgets

- **Facturation automatique**
  - Génération de factures depuis interventions
  - Intégration comptable
  - Relances automatiques

---

## 📅 Planning prévisionnel

| Version | Fonctionnalités principales | Statut |
|---------|----------------------------|--------|
| **v1.0** | Base fonctionnelle | ✅ Terminé |
| **v2.0** | Droits utilisateurs + Export réglementaire | 🔜 Prochaine |
| **v2.1** | Gestion documentaire | 📋 Planifié |
| **v2.2** | Cartographie avancée | 📋 Planifié |
| **v3.0** | Assemblage et cave | 💡 Réflexion |
| **v3.1** | IA et automatisation | 💡 Vision |

---

## 🎯 Priorités immédiates (v2.0)

### Sprint 1 : Authentification
- [ ] Système de login/logout
- [ ] Gestion des rôles basiques
- [ ] Interface de gestion utilisateurs

### Sprint 2 : Permissions
- [ ] Middleware de permissions
- [ ] Adaptation de l'UI selon rôle
- [ ] Logs d'audit

### Sprint 3 : Export réglementaire
- [ ] Structure données conforme DGCCRF
- [ ] Template export CSV DGCCRF
- [ ] Validation des données

### Sprint 4 : Export AOP
- [ ] Structure données AOP
- [ ] Templates par appellation
- [ ] Registre des mouvements

---

## 🤝 Contribution

Cette roadmap est évolutive. Les priorités peuvent changer selon :
- Les retours utilisateurs
- L'évolution de la réglementation
- Les besoins métier

---

## 📝 Notes techniques

### Stack technologique actuelle
- Frontend : Vanilla JS, HTML5, CSS3
- Backend : Google Apps Script
- BDD : Google Sheets
- PWA : Service Worker, Manifest

### Stack future (v3.0+)
- Framework : React / Vue.js (à décider)
- Backend : Node.js + Express
- BDD : PostgreSQL / MongoDB
- API : REST / GraphQL
- IA : TensorFlow.js / OpenAI API

---

**Dernière mise à jour** : 2024-03-15
**Prochaine révision** : Après lancement v2.0
