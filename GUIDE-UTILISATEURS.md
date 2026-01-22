# 👥 Guide des utilisateurs - Les Deux Chênes

## 🎯 C'est quoi ?

Le système d'utilisateurs permet de **contrôler qui peut faire quoi** dans l'application.

Comme dans une vraie entreprise :
- Le **patron** peut tout faire
- Le **chef de cave** peut gérer au quotidien
- L'**ouvrier** peut juste pointer ses heures

---

## 🔐 Les 3 types d'utilisateurs

### 👔 Administrateur (Patron)

**Peut TOUT faire :**
- ✅ Ajouter/modifier des clients
- ✅ Gérer les interventions
- ✅ Gérer les stocks
- ✅ Gérer le personnel
- ✅ Voir les parcelles
- ✅ **Créer et supprimer des utilisateurs**
- ✅ Exporter les données

**Parfait pour :** Le propriétaire du domaine

---

### 👨‍🌾 Chef de cave

**Peut presque tout faire SAUF gérer les utilisateurs :**
- ✅ Ajouter/modifier des clients
- ✅ Gérer les interventions
- ✅ Gérer les stocks
- ✅ Gérer le personnel
- ✅ Voir les parcelles
- ✅ Exporter les données
- ❌ Ne peut PAS créer/supprimer des utilisateurs

**Parfait pour :** Le responsable qui gère au quotidien

---

### 👷 Ouvrier

**Peut seulement :**
- ✅ Voir le tableau de bord
- ✅ Pointer ses heures de travail
- ❌ Ne peut RIEN modifier d'autre

**Parfait pour :** Les employés qui doivent juste noter leurs heures

---

## 🚀 Comment se connecter

### 1. Ouvrir l'application

Quand vous ouvrez l'application, vous voyez un **écran de connexion**.

### 2. Comptes de test (à changer !)

Pour tester, 3 comptes existent :

| Utilisateur | Mot de passe | Rôle |
|------------|--------------|------|
| `admin` | `admin123` | 👔 Patron |
| `chef` | `chef123` | 👨‍🌾 Chef de cave |
| `ouvrier` | `ouvrier123` | 👷 Ouvrier |

### 3. Se connecter

1. Tapez le nom d'utilisateur (exemple : `admin`)
2. Tapez le mot de passe (exemple : `admin123`)
3. Cliquez sur **"Se connecter"**

### 4. Vous êtes connecté !

L'application s'ouvre et vous voyez :
- Votre nom en haut à droite
- Les onglets que vous pouvez utiliser
- Un bouton **"Déconnexion"**

---

## 🔒 IMPORTANT : Changer les mots de passe

⚠️ **Les mots de passe par défaut sont DANGEREUX !**

### Comment changer un mot de passe (pour les admins)

1. **Connectez-vous en tant qu'admin**
2. Cliquez sur l'onglet **"👥 Utilisateurs"** (en bas)
3. Cliquez sur le **crayon ✏️** à côté de l'utilisateur
4. Tapez le nouveau mot de passe (minimum 6 caractères)
5. Cliquez sur **"Enregistrer"**

**Exemple de bon mot de passe :**
- ✅ `MonDomaine2024!`
- ✅ `Vignes@LesDeuxChenes`
- ❌ `123456` (trop simple)
- ❌ `password` (trop simple)

---

## 👥 Gérer les utilisateurs (Admin seulement)

### Créer un nouvel utilisateur

1. **Connectez-vous en tant qu'admin**
2. Cliquez sur **"👥 Utilisateurs"**
3. Cliquez sur **"+ Nouvel utilisateur"**
4. Remplissez :
   - **Nom complet** : Jean Dupont
   - **Nom d'utilisateur** : jdupont (sans espace, sans accent)
   - **Mot de passe** : minimum 6 caractères
   - **Email** : jean.dupont@example.com (optionnel)
   - **Rôle** : Choisir Ouvrier / Chef de cave / Admin
5. Cliquez sur **"Enregistrer"**

**Conseil :** Créez un utilisateur par personne qui utilise l'application.

### Modifier un utilisateur

1. Allez dans **"👥 Utilisateurs"**
2. Cliquez sur le **crayon ✏️** à côté de l'utilisateur
3. Modifiez ce que vous voulez
4. Cliquez sur **"Enregistrer"**

**Astuce :** Pour changer le mot de passe, tapez-en un nouveau. Pour le garder, laissez vide.

### Désactiver un utilisateur

Plutôt que de supprimer, vous pouvez **désactiver** :

1. Cliquez sur le **crayon ✏️**
2. Décochez **"Compte actif"**
3. Cliquez sur **"Enregistrer"**

L'utilisateur ne pourra plus se connecter, mais ses données restent.

### Supprimer un utilisateur

⚠️ **Attention : Action définitive !**

1. Cliquez sur la **poubelle 🗑️** à côté de l'utilisateur
2. Confirmez la suppression

**Note :** Vous ne pouvez pas vous supprimer vous-même.

---

## 🎨 Ce que chaque rôle voit

### Interface Administrateur

```
Onglets visibles :
📊 Dashboard
👥 Clients
📋 Interventions
📦 Stocks
👷 Personnel
🗺️ Parcelles
👥 Utilisateurs ← Seulement pour admin
```

Boutons : Tout est visible

### Interface Chef de cave

```
Onglets visibles :
📊 Dashboard
👥 Clients
📋 Interventions
📦 Stocks
👷 Personnel
🗺️ Parcelles
```

Boutons : Tout sauf gestion utilisateurs

### Interface Ouvrier

```
Onglets visibles :
📊 Dashboard (lecture seule)
👷 Personnel (seulement son pointage)
```

Boutons : Seulement "Pointer mes heures"

---

## 🛡️ Sécurité

### Bonnes pratiques

✅ **Créez un utilisateur par personne**
- Pas de compte partagé
- Chacun son mot de passe

✅ **Utilisez des mots de passe forts**
- Au moins 8 caractères
- Mélange de lettres, chiffres, symboles
- Exemple : `Vignes@2024!`

✅ **Déconnectez-vous après utilisation**
- Surtout sur ordinateur partagé
- Cliquez sur "🚪 Déconnexion"

✅ **Changez les mots de passe par défaut**
- admin123, chef123, ouvrier123 = DANGER
- À changer dès la première connexion

❌ **Ne partagez JAMAIS votre mot de passe**
- Même avec vos collègues
- Créez-leur un compte

---

## 📱 Sur mobile

### Se connecter

1. Ouvrez l'application sur votre téléphone
2. L'écran de connexion s'affiche
3. Tapez votre identifiant et mot de passe
4. C'est tout !

### Rester connecté

Votre connexion reste active même si vous fermez l'application.

Pour vous déconnecter :
- Cliquez sur **"🚪 Déconnexion"** en haut

---

## ❓ Questions fréquentes

### J'ai oublié mon mot de passe

**Solution :**
1. Demandez à un administrateur
2. Il peut modifier votre mot de passe depuis l'onglet "Utilisateurs"
3. Il vous donnera le nouveau mot de passe
4. Vous pourrez le changer ensuite

### Je ne vois pas l'onglet "Utilisateurs"

**Raison :** Vous n'êtes pas administrateur.

Seuls les admins peuvent gérer les utilisateurs.

### Comment devenir administrateur ?

Seul un administrateur existant peut vous donner ce rôle.

Si vous êtes seul et bloqué :
1. Connectez-vous avec le compte `admin / admin123`
2. Modifiez votre propre utilisateur pour le mettre admin
3. Déconnectez le compte admin par défaut

### L'application ne me demande plus de me connecter

**Normal !** Vous restez connecté tant que vous ne cliquez pas sur "Déconnexion".

Si vous voulez changer d'utilisateur :
1. Cliquez sur "🚪 Déconnexion"
2. Reconnectez-vous avec un autre compte

### Peut-on avoir plusieurs admins ?

**Oui !** Vous pouvez avoir autant d'admins que vous voulez.

Utile si plusieurs personnes gèrent le domaine.

### Combien d'utilisateurs peut-on créer ?

**Illimité !** Créez autant d'utilisateurs que nécessaire.

Recommandation : 1 utilisateur = 1 personne réelle

---

## 🎯 Scénarios d'usage

### Petit domaine (1-2 personnes)

```
1 Administrateur : Le propriétaire
```

Tout le monde se connecte avec le même compte admin.

### Domaine moyen (3-5 personnes)

```
1 Administrateur : Le propriétaire
1 Chef de cave : Le responsable technique
2-3 Ouvriers : Les employés
```

Chacun son compte, chacun son rôle.

### Grand domaine (6+ personnes)

```
2 Administrateurs : Propriétaire + Directeur
2-3 Chefs de cave : Responsables d'équipe
4-10 Ouvriers : Tous les employés
```

Organisation claire avec hiérarchie.

---

## 🚨 En cas de problème

### Je ne peux plus me connecter

1. Vérifiez que vous tapez bien :
   - Le bon nom d'utilisateur (pas d'espace, pas d'accent)
   - Le bon mot de passe (attention majuscules/minuscules)

2. Demandez à un admin de vérifier que votre compte est **actif**

3. En dernier recours : utilisez le compte `admin / admin123`

### J'ai supprimé tous les admins par erreur

**Solution d'urgence :**

Le compte `admin / admin123` existe toujours par défaut dans le code.

Utilisez-le pour recréer un admin.

### L'écran de connexion ne s'affiche pas

Vérifiez que les fichiers `auth.js` et `login-screen.html` sont bien présents.

---

## ✅ Checklist de sécurité

Avant de donner l'application à vos employés :

- [ ] J'ai changé le mot de passe du compte `admin`
- [ ] J'ai changé le mot de passe du compte `chef`
- [ ] J'ai changé le mot de passe du compte `ouvrier`
- [ ] J'ai créé mes propres utilisateurs
- [ ] J'ai testé chaque rôle pour voir ce qu'il voit
- [ ] J'ai expliqué à mes employés comment se connecter
- [ ] J'ai noté les mots de passe dans un endroit sûr

---

## 📞 Besoin d'aide ?

Consultez les autres guides :
- **README.md** : Vue d'ensemble
- **INSTALLATION.md** : Comment installer
- **QUICKSTART.md** : Démarrage rapide

Ou contactez le développeur / support technique.

---

**Bonne gestion de votre domaine ! 🍇**
