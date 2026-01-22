// ========================================
// GESTION DES UTILISATEURS - INTERFACE
// Les Deux Chênes
// ========================================

// ========================================
// AFFICHER LA LISTE DES UTILISATEURS
// ========================================
function renderUsers() {
  const tbody = document.getElementById('tableUsers');
  if (!tbody) return;

  const users = getUtilisateurs();

  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#9CA3AF">Aucun utilisateur</td></tr>';
    return;
  }

  tbody.innerHTML = users.map(user => {
    const role = ROLES[user.role];
    const lastLogin = user.lastLogin
      ? new Date(user.lastLogin).toLocaleDateString('fr-FR')
      : 'Jamais connecté';

    const statusBadge = user.actif
      ? '<span class="badge badge-green">Actif</span>'
      : '<span class="badge badge-yellow">Inactif</span>';

    const isCurrentUser = getCurrentUser() && user.id === getCurrentUser().id;
    const deleteBtn = isCurrentUser
      ? '<button class="icon-btn" disabled title="Vous ne pouvez pas vous supprimer">🚫</button>'
      : `<button class="icon-btn" onclick="confirmDeleteUser('${user.id}')" title="Supprimer">🗑️</button>`;

    return `
      <tr>
        <td>
          <div style="font-weight:600">${role.emoji} ${user.nom}</div>
          <div style="font-size:0.8rem;color:#9CA3AF">@${user.username}</div>
        </td>
        <td>${role.nom}</td>
        <td>${user.email || '-'}</td>
        <td>${lastLogin}</td>
        <td>${statusBadge}</td>
        <td class="action-btns">
          <button class="icon-btn" onclick="editUser('${user.id}')" title="Modifier">✏️</button>
          ${deleteBtn}
        </td>
      </tr>
    `;
  }).join('');
}

// ========================================
// OUVRIR LE MODAL POUR CRÉER UN UTILISATEUR
// ========================================
function showModalUser() {
  // Réinitialiser le formulaire
  document.getElementById('userId').value = '';
  document.getElementById('userNom').value = '';
  document.getElementById('userUsername').value = '';
  document.getElementById('userPassword').value = '';
  document.getElementById('userEmail').value = '';
  document.getElementById('userRole').value = 'OUVRIER';
  document.getElementById('userActif').checked = true;

  // Changer le titre
  document.getElementById('modalUserTitle').textContent = 'Nouvel utilisateur';

  // Le champ mot de passe est obligatoire pour un nouvel utilisateur
  document.getElementById('userPassword').required = true;
  document.getElementById('userPassword').placeholder = 'Minimum 6 caractères';

  showModal('modalUser');
}

// ========================================
// MODIFIER UN UTILISATEUR
// ========================================
function editUser(userId) {
  const users = getUtilisateurs();
  const user = users.find(u => u.id === userId);

  if (!user) {
    alert('❌ Utilisateur introuvable');
    return;
  }

  // Remplir le formulaire
  document.getElementById('userId').value = user.id;
  document.getElementById('userNom').value = user.nom;
  document.getElementById('userUsername').value = user.username;
  document.getElementById('userPassword').value = ''; // Ne pas afficher le mot de passe
  document.getElementById('userEmail').value = user.email || '';
  document.getElementById('userRole').value = user.role;
  document.getElementById('userActif').checked = user.actif;

  // Changer le titre
  document.getElementById('modalUserTitle').textContent = 'Modifier l\'utilisateur';

  // Le mot de passe n'est pas obligatoire en modification (seulement si on veut le changer)
  document.getElementById('userPassword').required = false;
  document.getElementById('userPassword').placeholder = 'Laisser vide pour ne pas changer';

  showModal('modalUser');
}

// ========================================
// ENREGISTRER UN UTILISATEUR
// ========================================
function saveUser() {
  const userId = document.getElementById('userId').value;
  const nom = document.getElementById('userNom').value.trim();
  const username = document.getElementById('userUsername').value.trim();
  const password = document.getElementById('userPassword').value;
  const email = document.getElementById('userEmail').value.trim();
  const role = document.getElementById('userRole').value;
  const actif = document.getElementById('userActif').checked;

  // Validation
  if (!nom || !username) {
    alert('❌ Veuillez remplir tous les champs obligatoires');
    return;
  }

  if (!userId && !password) {
    alert('❌ Le mot de passe est obligatoire pour un nouvel utilisateur');
    return;
  }

  if (password && password.length < 6) {
    alert('❌ Le mot de passe doit contenir au moins 6 caractères');
    return;
  }

  let result;

  if (userId) {
    // Modification
    const updates = {
      nom,
      username,
      email,
      role,
      actif
    };

    // Ajouter le mot de passe seulement s'il est fourni
    if (password) {
      updates.password = password;
    }

    result = modifierUtilisateur(userId, updates);
  } else {
    // Création
    result = ajouterUtilisateur({
      nom,
      username,
      password,
      email,
      role
    });
  }

  if (result.success) {
    showNotification(result.message);
    hideModal('modalUser');
    renderUsers();
  } else {
    alert(result.message);
  }
}

// ========================================
// CONFIRMER LA SUPPRESSION
// ========================================
function confirmDeleteUser(userId) {
  const users = getUtilisateurs();
  const user = users.find(u => u.id === userId);

  if (!user) {
    alert('❌ Utilisateur introuvable');
    return;
  }

  const confirmation = confirm(
    `⚠️ Êtes-vous sûr de vouloir supprimer l'utilisateur "${user.nom}" ?\n\n` +
    'Cette action est irréversible.'
  );

  if (confirmation) {
    const result = supprimerUtilisateur(userId);

    if (result.success) {
      showNotification(result.message);
      renderUsers();
    } else {
      alert(result.message);
    }
  }
}

// ========================================
// AFFICHER LE BOUTON DÉCONNEXION
// ========================================
function addLogoutButton() {
  const headerContent = document.querySelector('.header-content');
  if (!headerContent) return;

  // Vérifier si le bouton n'existe pas déjà
  if (document.getElementById('logout-btn')) return;

  // Créer le conteneur pour l'utilisateur et le bouton déconnexion
  const userContainer = document.createElement('div');
  userContainer.style.cssText = 'display:flex;align-items:center;gap:1rem;flex-wrap:wrap';

  // Affichage de l'utilisateur actuel
  const userDisplay = document.createElement('div');
  userDisplay.id = 'current-user-display';
  userDisplay.style.cssText = 'color:#D4AF37;font-weight:600;font-size:0.9rem;padding:0.5rem 1rem;background:rgba(212,175,55,0.1);border-radius:6px';

  const user = getCurrentUser();
  if (user) {
    const role = ROLES[user.role];
    userDisplay.textContent = `${role.emoji} ${user.nom}`;
  }

  // Bouton déconnexion
  const logoutBtn = document.createElement('button');
  logoutBtn.id = 'logout-btn';
  logoutBtn.className = 'logout-btn';
  logoutBtn.textContent = '🚪 Déconnexion';
  logoutBtn.onclick = () => {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      logout();
    }
  };

  userContainer.appendChild(userDisplay);
  userContainer.appendChild(logoutBtn);

  // Insérer avant les boutons d'export
  const exportBtns = headerContent.querySelector('div[style*="display:flex"]');
  if (exportBtns) {
    headerContent.insertBefore(userContainer, exportBtns);
  } else {
    headerContent.appendChild(userContainer);
  }
}

// ========================================
// INITIALISATION
// ========================================
// Cette fonction sera appelée après le chargement de l'application
function initUsersManager() {
  // Vérifier si l'utilisateur est connecté
  if (!isLoggedIn()) {
    return;
  }

  // Ajouter le bouton de déconnexion
  addLogoutButton();

  // Si admin, ajouter l'onglet utilisateurs
  if (getCurrentUser() && getCurrentUser().role === 'ADMIN') {
    // L'onglet est créé dans auth.js via adaptUIForRole()
    // Ici on affiche juste les utilisateurs si on est sur cet onglet
    renderUsers();
  }
}
