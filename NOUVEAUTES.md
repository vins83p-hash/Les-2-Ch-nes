# 🎉 Nouvelles fonctionnalités - Les Deux Chênes

## ✅ Ce qui vient d'être ajouté

### 🔐 Système de connexion et gestion des utilisateurs

Maintenant, votre application est **sécurisée** ! Chaque personne doit se connecter.

---

## 📁 Nouveaux fichiers créés

### 1. **auth.js** - Le système de connexion

C'est le "cerveau" qui :
- Vérifie si le mot de passe est bon
- Se souvient qui est connecté
- Décide qui peut faire quoi

### 2. **login-screen.html** - L'écran de connexion

C'est la page que vous voyez en premier :
- Formulaire pour entrer identifiant et mot de passe
- Joli design avec le logo
- Instructions pour se connecter

### 3. **users-manager.js** - Gestion des utilisateurs

Permet aux admins de :
- Créer de nouveaux utilisateurs
- Modifier les utilisateurs existants
- Supprimer des utilisateurs
- Changer les mots de passe

### 4. **GUIDE-UTILISATEURS.md** - Mode d'emploi simple

Un guide complet qui explique :
- Comment se connecter
- Les 3 types d'utilisateurs (patron, chef, ouvrier)
- Comment créer/modifier des utilisateurs
- Conseils de sécurité
- Réponses aux questions fréquentes

---

## 👥 Les 3 types d'utilisateurs

### 👔 Patron (Administrateur)

**Peut TOUT faire**
- Gérer clients, interventions, stocks, personnel, parcelles
- **Créer et gérer les utilisateurs**
- Tous les exports

**Comptes par défaut :**
```
Identifiant : admin
Mot de passe : admin123
```

⚠️ **À CHANGER IMMÉDIATEMENT !**

---

### 👨‍🌾 Chef de cave

**Peut presque tout faire**
- Gérer clients, interventions, stocks, personnel, parcelles
- Faire les exports
- ❌ Ne peut PAS gérer les utilisateurs

**Compte par défaut :**
```
Identifiant : chef
Mot de passe : chef123
```

⚠️ **À CHANGER IMMÉDIATEMENT !**

---

### 👷 Ouvrier

**Peut seulement voir et pointer ses heures**
- Voir le tableau de bord (lecture seule)
- Pointer ses heures de travail
- ❌ Ne peut RIEN modifier

**Compte par défaut :**
```
Identifiant : ouvrier
Mot de passe : ouvrier123
```

⚠️ **À CHANGER IMMÉDIATEMENT !**

---

## 🚀 Comment l'utiliser

### Étape 1 : Ouvrir l'application

Quand vous ouvrez l'application, vous verrez maintenant un **écran de connexion**.

### Étape 2 : Se connecter pour la première fois

Utilisez un des comptes de test :
```
admin / admin123
```

### Étape 3 : CHANGER LES MOTS DE PASSE

🔴 **TRÈS IMPORTANT !**

1. Connectez-vous en tant qu'admin
2. Allez dans l'onglet **"👥 Utilisateurs"** (en bas)
3. Cliquez sur le **crayon ✏️** à côté de chaque utilisateur
4. Changez le mot de passe
5. Notez le nouveau mot de passe dans un endroit sûr

### Étape 4 : Créer vos propres utilisateurs

1. Dans **"👥 Utilisateurs"**
2. Cliquez sur **"+ Nouvel utilisateur"**
3. Remplissez :
   - Nom : Jean Dupont
   - Identifiant : jdupont
   - Mot de passe : Votrechoix123!
   - Rôle : Choisir selon la personne
4. Cliquez sur **"Enregistrer"**

### Étape 5 : Se déconnecter

Cliquez sur le bouton **"🚪 Déconnexion"** en haut à droite.

---

## 🔒 Sécurité

### Pourquoi c'est important ?

Avant, n'importe qui pouvait :
- ❌ Modifier vos clients
- ❌ Supprimer des interventions
- ❌ Changer les stocks
- ❌ Voir vos données sensibles

Maintenant :
- ✅ Chaque personne a son compte
- ✅ Chaque personne voit seulement ce qu'elle doit voir
- ✅ Vous savez qui a fait quoi
- ✅ Vos données sont protégées

### Conseils de sécurité

✅ **1 personne = 1 compte**
Ne partagez jamais votre mot de passe

✅ **Mots de passe forts**
Au moins 8 caractères, mélange lettres/chiffres/symboles

✅ **Changez les mots de passe par défaut**
admin123, chef123, ouvrier123 = DANGEREUX

✅ **Déconnectez-vous après utilisation**
Surtout sur ordinateur partagé

---

## 📱 Sur mobile

Ça marche pareil !

1. Ouvrez l'application
2. L'écran de connexion apparaît
3. Tapez votre identifiant et mot de passe
4. Vous restez connecté tant que vous ne vous déconnectez pas

---

## ❓ Questions fréquentes

### Q : Je dois me connecter à chaque fois ?

**Non !** Vous restez connecté même si vous fermez l'application.

Pour changer d'utilisateur, cliquez sur "Déconnexion".

### Q : J'ai oublié mon mot de passe

Demandez à un admin de le changer dans l'onglet "Utilisateurs".

### Q : Je ne vois pas l'onglet "Utilisateurs"

Normal si vous n'êtes pas admin. Seuls les patrons peuvent gérer les utilisateurs.

### Q : Combien d'utilisateurs je peux créer ?

Autant que vous voulez ! Créez un utilisateur par employé.

### Q : Peut-on avoir plusieurs admins ?

Oui ! Pratique si plusieurs personnes gèrent le domaine.

---

## 🎯 Exemples d'utilisation

### Petit domaine (1-2 personnes)

```
Tout le monde se connecte en admin
```

Simple et rapide.

### Domaine moyen (3-5 personnes)

```
1 Admin (patron)
1 Chef de cave
2-3 Ouvriers
```

Chacun voit ce qui le concerne.

### Grand domaine (6+ personnes)

```
2 Admins (patron + directeur)
2 Chefs de cave (responsables)
5+ Ouvriers (employés)
```

Organisation claire et sécurisée.

---

## ✅ NOUVEAU : Exports réglementaires 📜

### 5 types d'exports pour les contrôles officiels !

**1. 📋 Registre phytosanitaire** (DGCCRF obligatoire)
- Liste de TOUS vos traitements
- Format conforme réglementation française
- Avec date, produit, dose, parcelle, météo

**2. 📦 Inventaire des stocks phyto**
- Tous vos produits en stock
- Quantités actuelles
- Alertes si stock bas

**3. 👷 Registre du personnel**
- Heures travaillées par employé
- Pour MSA et URSSAF
- Export par période (mois, année...)

**4. 🚜 Déclaration de récolte**
- Vendanges par client
- Rendement à l'hectare
- Pour AOP et Douanes

**5. 📜 Dossier complet AOP**
- Traçabilité complète de l'année
- Conforme cahier des charges AOP
- Parcellaire + traitements + interventions

### 🚀 Comment l'utiliser

1. Cliquez sur **"📜 Exports réglementaires"** (en haut de l'app)
2. Choisissez le type d'export
3. Le fichier se télécharge automatiquement
4. Conservez-le pour les contrôles (5 ans minimum)

**Guide complet :** GUIDE-EXPORTS-REGLEMENTAIRES.md

---

## 🔄 Prochaines étapes

Maintenant que les utilisateurs et les exports sont en place, on va ajouter :

1. **🗂️ Gestion des documents** ← EN COURS
   - Upload d'analyses de labo
   - Stocker certificats Bio/HVE/AOP
   - Documents par client/parcelle
   - Intégration Google Drive

2. **📍 Cartographie avancée**
   - Dessiner les parcelles sur la carte
   - Calcul automatique des surfaces
   - Géolocalisation des interventions

3. **🔄 Assemblage des vins**
   - Mélanger plusieurs cuves
   - Calculs automatiques (degré, acidité...)
   - Validation AOP

---

## 📚 Guides disponibles

- **README.md** : Vue d'ensemble du projet
- **INSTALLATION.md** : Comment installer
- **QUICKSTART.md** : Démarrage rapide (5 min)
- **GUIDE-UTILISATEURS.md** : Tout sur les utilisateurs ← **À LIRE !**
- **GUIDE-EXPORTS-REGLEMENTAIRES.md** : Tout sur les exports ← **NOUVEAU !**
- **ROADMAP.md** : Fonctionnalités futures
- **CONTRIBUTING.md** : Pour les développeurs

---

## ✅ Checklist avant de commencer

### Sécurité
- [ ] J'ai lu le GUIDE-UTILISATEURS.md
- [ ] Je me suis connecté avec admin/admin123
- [ ] J'ai changé TOUS les mots de passe par défaut
- [ ] J'ai créé mes propres utilisateurs
- [ ] J'ai testé la connexion avec chaque compte
- [ ] J'ai expliqué à mes employés comment se connecter

### Conformité réglementaire
- [ ] J'ai lu le GUIDE-EXPORTS-REGLEMENTAIRES.md
- [ ] J'ai testé l'export du registre phytosanitaire
- [ ] J'ai vérifié que mes données sont complètes
- [ ] J'ai créé un dossier pour conserver mes exports
- [ ] Je sais comment exporter avant un contrôle

---

**C'est parti ! Votre application est sécurisée ET conforme ! 🔐📜**

**Prochaine fonctionnalité en développement : Gestion des documents 🗂️**
