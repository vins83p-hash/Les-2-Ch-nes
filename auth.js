// ========================================
// SYSTÈME D'AUTHENTIFICATION SIMPLE
// Les Deux Chênes - Gestion des utilisateurs
// ========================================

// RÔLES DISPONIBLES
const ROLES = {
  ADMIN: {
    nom: 'Administrateur',
    emoji: '👔',
    permissions: ['*'], // Tout
    sections: ['dashboard', 'clients', 'interventions', 'stocks', 'personnel', 'parcelles', 'settings', 'users']
  },
  CHEF_CAVE: {
    nom: 'Chef de cave',
    emoji: '👨‍🌾',
    permissions: ['read:*', 'write:*'],
    sections: ['dashboard', 'clients', 'interventions', 'stocks', 'personnel', 'parcelles']
  },
  OUVRIER: {
    nom: 'Ouvrier',
    emoji: '👷',
    permissions: ['read:*', 'write:own_pointage'],
    sections: ['dashboard', 'personnel_pointage']
  }
};

// UTILISATEURS PAR DÉFAUT (à changer au premier lancement !)
// En production, ces données seront dans Google Sheets
let utilisateurs = [
  {
    id: 'USR-001',
    username: 'admin',
    password: 'admin123', // ⚠️ À CHANGER IMMÉDIATEMENT
    nom: 'Administrateur',
    email: 'admin@lesdeuxchenes.fr',
    role: 'ADMIN',
    actif: true,
    dateCreation: new Date().toISOString(),
    lastLogin: null
  },
  {
    id: 'USR-002',
    username: 'chef',
    password: 'chef123', // ⚠️ À CHANGER
    nom: 'Chef de Cave',
    email: 'chef@lesdeuxchenes.fr',
    role: 'CHEF_CAVE',
    actif: true,
    dateCreation: new Date().toISOString(),
    lastLogin: null
  },
  {
    id: 'USR-003',
    username: 'ouvrier',
    password: 'ouvrier123', // ⚠️ À CHANGER
    nom: 'Ouvrier Viticole',
    email: 'ouvrier@lesdeuxchenes.fr',
    role: 'OUVRIER',
    actif: true,
    dateCreation: new Date().toISOString(),
    lastLogin: null
  }
];

// SESSION EN COURS
let currentUser = null;

// ========================================
// FONCTION : SE CONNECTER
// ========================================
function login(username, password) {
  // Chercher l'utilisateur
  const user = utilisateurs.find(u =>
    u.username === username &&
    u.password === password &&
    u.actif === true
  );

  if (!user) {
    return {
      success: false,
      message: '❌ Identifiant ou mot de passe incorrect'
    };
  }

  // Enregistrer la connexion
  user.lastLogin = new Date().toISOString();
  currentUser = user;

  // Sauvegarder en localStorage
  localStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));

  return {
    success: true,
    message: `✅ Bienvenue ${user.nom} !`,
    user: user
  };
}

// ========================================
// FONCTION : SE DÉCONNECTER
// ========================================
function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');

  // Recharger la page pour afficher l'écran de connexion
  window.location.reload();
}

// ========================================
// FONCTION : VÉRIFIER SI CONNECTÉ
// ========================================
function isLoggedIn() {
  // Vérifier s'il y a une session en cours
  const savedUser = localStorage.getItem('currentUser');

  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    return true;
  }

  return false;
}

// ========================================
// FONCTION : OBTENIR L'UTILISATEUR ACTUEL
// ========================================
function getCurrentUser() {
  return currentUser;
}

// ========================================
// FONCTION : VÉRIFIER UNE PERMISSION
// ========================================
function hasPermission(permission) {
  if (!currentUser) return false;

  const role = ROLES[currentUser.role];

  // Admin a tous les droits
  if (role.permissions.includes('*')) return true;

  // Vérifier la permission spécifique
  return role.permissions.includes(permission);
}

// ========================================
// FONCTION : PEUT VOIR UNE SECTION
// ========================================
function canAccessSection(sectionName) {
  if (!currentUser) return false;

  const role = ROLES[currentUser.role];

  // Vérifier si la section est autorisée
  return role.sections.includes(sectionName) || role.sections.includes('*');
}

// ========================================
// FONCTION : AFFICHER L'ÉCRAN DE CONNEXION
// ========================================
function showLoginScreen() {
  // Cacher l'application
  document.getElementById('app-container').style.display = 'none';

  // Afficher l'écran de connexion
  document.getElementById('login-screen').style.display = 'flex';
}

// ========================================
// FONCTION : AFFICHER L'APPLICATION
// ========================================
function showApp() {
  // Afficher l'application
  document.getElementById('app-container').style.display = 'block';

  // Cacher l'écran de connexion
  document.getElementById('login-screen').style.display = 'none';

  // Adapter l'interface selon le rôle
  adaptUIForRole();
}

// ========================================
// FONCTION : ADAPTER L'INTERFACE AU RÔLE
// ========================================
function adaptUIForRole() {
  if (!currentUser) return;

  const role = ROLES[currentUser.role];

  // Afficher le nom de l'utilisateur
  const userDisplay = document.getElementById('current-user-display');
  if (userDisplay) {
    userDisplay.innerHTML = `${role.emoji} ${currentUser.nom}`;
  }

  // Masquer les onglets non autorisés
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    const sectionName = tab.getAttribute('onclick').match(/'([^']+)'/)[1];

    if (!canAccessSection(sectionName)) {
      tab.style.display = 'none';
    }
  });

  // Pour les ouvriers : mode simplifié
  if (currentUser.role === 'OUVRIER') {
    // Afficher seulement le pointage personnel
    changeTab('personnel');

    // Masquer les boutons d'ajout/modification
    document.querySelectorAll('.btn-add, .btn-edit, .btn-delete').forEach(btn => {
      btn.style.display = 'none';
    });
  }

  // Pour les admins : afficher le menu utilisateurs
  if (currentUser.role === 'ADMIN') {
    // Créer l'onglet "Utilisateurs" s'il n'existe pas
    const navTabs = document.querySelector('.nav-tabs');
    if (!document.querySelector('[onclick*="users"]')) {
      const usersTab = document.createElement('button');
      usersTab.className = 'tab';
      usersTab.onclick = () => changeTab('users');
      usersTab.textContent = '👥 Utilisateurs';
      navTabs.appendChild(usersTab);
    }
  }
}

// ========================================
// FONCTION : GÉRER LA SOUMISSION DU FORMULAIRE DE CONNEXION
// ========================================
function handleLoginSubmit(event) {
  event.preventDefault();

  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const result = login(username, password);

  if (result.success) {
    showNotification(result.message);
    showApp();
  } else {
    // Afficher l'erreur
    const errorDiv = document.getElementById('login-error');
    errorDiv.textContent = result.message;
    errorDiv.style.display = 'block';

    // Cacher l'erreur après 3 secondes
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 3000);
  }
}

// ========================================
// FONCTION : AJOUTER UN UTILISATEUR (Admin seulement)
// ========================================
function ajouterUtilisateur(userData) {
  if (!hasPermission('*')) {
    return { success: false, message: '❌ Permission refusée' };
  }

  // Vérifier si le username existe déjà
  if (utilisateurs.find(u => u.username === userData.username)) {
    return { success: false, message: '❌ Ce nom d\'utilisateur existe déjà' };
  }

  const newUser = {
    id: 'USR-' + Date.now(),
    username: userData.username,
    password: userData.password,
    nom: userData.nom,
    email: userData.email,
    role: userData.role,
    actif: true,
    dateCreation: new Date().toISOString(),
    lastLogin: null
  };

  utilisateurs.push(newUser);
  localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));

  return { success: true, message: '✅ Utilisateur créé', user: newUser };
}

// ========================================
// FONCTION : MODIFIER UN UTILISATEUR
// ========================================
function modifierUtilisateur(userId, updates) {
  if (!hasPermission('*')) {
    return { success: false, message: '❌ Permission refusée' };
  }

  const user = utilisateurs.find(u => u.id === userId);
  if (!user) {
    return { success: false, message: '❌ Utilisateur introuvable' };
  }

  // Appliquer les modifications
  Object.assign(user, updates);
  localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));

  return { success: true, message: '✅ Utilisateur modifié' };
}

// ========================================
// FONCTION : SUPPRIMER UN UTILISATEUR
// ========================================
function supprimerUtilisateur(userId) {
  if (!hasPermission('*')) {
    return { success: false, message: '❌ Permission refusée' };
  }

  // Ne pas se supprimer soi-même
  if (userId === currentUser.id) {
    return { success: false, message: '❌ Vous ne pouvez pas vous supprimer vous-même' };
  }

  utilisateurs = utilisateurs.filter(u => u.id !== userId);
  localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));

  return { success: true, message: '✅ Utilisateur supprimé' };
}

// ========================================
// FONCTION : CHARGER LES UTILISATEURS
// ========================================
function loadUtilisateurs() {
  const saved = localStorage.getItem('utilisateurs');
  if (saved) {
    utilisateurs = JSON.parse(saved);
  } else {
    // Première utilisation : sauvegarder les utilisateurs par défaut
    localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
  }
}

// ========================================
// FONCTION : OBTENIR TOUS LES UTILISATEURS
// ========================================
function getUtilisateurs() {
  if (!hasPermission('*')) {
    return [];
  }
  return utilisateurs;
}

// ========================================
// INITIALISATION AU CHARGEMENT
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Charger les utilisateurs
  loadUtilisateurs();

  // Vérifier si déjà connecté
  if (isLoggedIn()) {
    showApp();
  } else {
    showLoginScreen();
  }
});

// ========================================
// NOTIFICATION SIMPLE
// ========================================
function showNotification(message) {
  const notif = document.createElement('div');
  notif.style.cssText = 'position:fixed;top:80px;right:20px;background:#10B981;color:white;padding:1rem;border-radius:8px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}
