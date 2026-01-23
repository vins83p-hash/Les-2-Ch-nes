// ========================================
// GESTION DES DOCUMENTS
// Les Deux Chênes - Upload et organisation de documents
// ========================================

// Types de documents
const DOCUMENT_TYPES = {
  ANALYSE_LABO: {
    nom: 'Analyse de laboratoire',
    emoji: '🔬',
    couleur: '#3B82F6'
  },
  CERTIFICAT: {
    nom: 'Certificat',
    emoji: '📄',
    couleur: '#10B981'
  },
  FACTURE: {
    nom: 'Facture',
    emoji: '🧾',
    couleur: '#F59E0B'
  },
  CONTRAT: {
    nom: 'Contrat',
    emoji: '📝',
    couleur: '#8B5CF6'
  },
  PHOTO: {
    nom: 'Photo',
    emoji: '📷',
    couleur: '#EC4899'
  },
  AUTRE: {
    nom: 'Autre',
    emoji: '📎',
    couleur: '#6B7280'
  }
};

// Stockage des documents (localStorage)
let documents = [];

// ========================================
// CHARGER LES DOCUMENTS
// ========================================
function loadDocuments() {
  const saved = localStorage.getItem('documents');
  if (saved) {
    documents = JSON.parse(saved);
  }
  return documents;
}

// ========================================
// SAUVEGARDER LES DOCUMENTS
// ========================================
function saveDocuments() {
  localStorage.setItem('documents', JSON.stringify(documents));
}

// ========================================
// AJOUTER UN DOCUMENT
// ========================================
async function addDocument(file, metadata) {
  if (!hasPermission('write:*')) {
    alert('❌ Permission refusée');
    return null;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function(e) {
      const doc = {
        id: 'DOC-' + Date.now(),
        nom: file.name,
        type: metadata.type || 'AUTRE',
        categorie: metadata.categorie || '',
        taille: file.size,
        mimeType: file.type,
        dateUpload: new Date().toISOString(),
        dateDocument: metadata.dateDocument || new Date().toISOString(),

        // Données du fichier (base64)
        data: e.target.result,

        // Relations
        clientId: metadata.clientId || null,
        interventionId: metadata.interventionId || null,
        parcelleId: metadata.parcelleId || null,

        // Métadonnées
        metadata: {
          description: metadata.description || '',
          tags: metadata.tags || [],
          confidentialite: metadata.confidentialite || 'NORMAL'
        },

        uploader: getCurrentUser()?.nom || 'Inconnu',
        lastModified: Date.now()
      };

      documents.push(doc);
      saveDocuments();

      resolve(doc);
    };

    reader.onerror = function() {
      reject(new Error('Erreur lors de la lecture du fichier'));
    };

    reader.readAsDataURL(file);
  });
}

// ========================================
// SUPPRIMER UN DOCUMENT
// ========================================
function deleteDocument(docId) {
  if (!hasPermission('write:*')) {
    alert('❌ Permission refusée');
    return false;
  }

  const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce document ?');
  if (!confirmation) return false;

  documents = documents.filter(d => d.id !== docId);
  saveDocuments();

  showNotification('✅ Document supprimé');
  return true;
}

// ========================================
// TÉLÉCHARGER UN DOCUMENT
// ========================================
function downloadDocument(docId) {
  const doc = documents.find(d => d.id === docId);
  if (!doc) {
    alert('❌ Document introuvable');
    return;
  }

  // Créer un lien de téléchargement
  const link = document.createElement('a');
  link.href = doc.data;
  link.download = doc.nom;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ========================================
// AFFICHER UN DOCUMENT (prévisualisation)
// ========================================
function viewDocument(docId) {
  const doc = documents.find(d => d.id === docId);
  if (!doc) {
    alert('❌ Document introuvable');
    return;
  }

  // Créer une modal de prévisualisation
  const modal = document.createElement('div');
  modal.className = 'modal show';
  modal.style.cssText = 'display:flex !important';

  let previewContent = '';

  // Prévisualisation selon le type de fichier
  if (doc.mimeType.startsWith('image/')) {
    previewContent = `<img src="${doc.data}" style="max-width:100%;max-height:70vh;border-radius:8px">`;
  } else if (doc.mimeType === 'application/pdf') {
    previewContent = `
      <embed src="${doc.data}" type="application/pdf" width="100%" height="600px">
      <p style="margin-top:1rem;text-align:center">
        <button class="btn btn-primary" onclick="downloadDocument('${docId}')">
          📥 Télécharger le PDF
        </button>
      </p>
    `;
  } else {
    previewContent = `
      <div style="text-align:center;padding:2rem">
        <p style="font-size:3rem;margin-bottom:1rem">📄</p>
        <p style="color:#9CA3AF">Aperçu non disponible pour ce type de fichier</p>
        <button class="btn btn-primary" onclick="downloadDocument('${docId}')" style="margin-top:1rem">
          📥 Télécharger
        </button>
      </div>
    `;
  }

  const typeInfo = DOCUMENT_TYPES[doc.type];

  modal.innerHTML = `
    <div class="modal-content" style="max-width:800px">
      <div class="modal-header">
        <h2 class="modal-title">${typeInfo.emoji} ${doc.nom}</h2>
        <button class="close" onclick="this.closest('.modal').remove()">×</button>
      </div>
      <div style="margin-bottom:1rem">
        <div style="display:flex;gap:0.5rem;margin-bottom:0.5rem;flex-wrap:wrap">
          <span class="badge" style="background:${typeInfo.couleur}20;color:${typeInfo.couleur}">
            ${typeInfo.nom}
          </span>
          <span class="badge badge-blue">${formatFileSize(doc.taille)}</span>
          <span class="badge badge-green">${formatDate(doc.dateDocument)}</span>
        </div>
        ${doc.metadata.description ? `<p style="color:#9CA3AF;font-size:0.9rem">${doc.metadata.description}</p>` : ''}
      </div>
      <div style="background:rgba(0,0,0,0.3);border-radius:12px;padding:1rem;text-align:center">
        ${previewContent}
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

// ========================================
// RECHERCHER DES DOCUMENTS
// ========================================
function searchDocuments(query, filters = {}) {
  let results = [...documents];

  // Filtrer par recherche textuelle
  if (query) {
    query = query.toLowerCase();
    results = results.filter(doc =>
      doc.nom.toLowerCase().includes(query) ||
      (doc.metadata.description && doc.metadata.description.toLowerCase().includes(query)) ||
      (doc.metadata.tags && doc.metadata.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }

  // Filtrer par type
  if (filters.type) {
    results = results.filter(doc => doc.type === filters.type);
  }

  // Filtrer par client
  if (filters.clientId) {
    results = results.filter(doc => doc.clientId === filters.clientId);
  }

  // Filtrer par date
  if (filters.dateDebut) {
    results = results.filter(doc => new Date(doc.dateDocument) >= new Date(filters.dateDebut));
  }

  if (filters.dateFin) {
    results = results.filter(doc => new Date(doc.dateDocument) <= new Date(filters.dateFin));
  }

  return results;
}

// ========================================
// AFFICHER LA LISTE DES DOCUMENTS
// ========================================
function renderDocuments(filters = {}) {
  const container = document.getElementById('documentsGrid');
  if (!container) return;

  loadDocuments();

  const query = document.getElementById('searchDocuments')?.value || '';
  const docs = searchDocuments(query, filters);

  if (docs.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem;color:#9CA3AF">
        <p style="font-size:3rem;margin-bottom:1rem">📂</p>
        <p>Aucun document trouvé</p>
        <button class="btn btn-primary" onclick="showModal('modalDocument')" style="margin-top:1rem">
          + Ajouter un document
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = docs.map(doc => {
    const typeInfo = DOCUMENT_TYPES[doc.type];
    const client = data.clients?.find(c => c.id === doc.clientId);

    return `
      <div class="document-card">
        <div class="document-preview" onclick="viewDocument('${doc.id}')" style="cursor:pointer">
          ${doc.mimeType.startsWith('image/')
            ? `<img src="${doc.data}" alt="${doc.nom}">`
            : `<div class="document-icon">${typeInfo.emoji}</div>`
          }
        </div>
        <div class="document-info">
          <div class="document-name" onclick="viewDocument('${doc.id}')" style="cursor:pointer">
            ${doc.nom}
          </div>
          <div style="display:flex;gap:0.5rem;margin:0.5rem 0;flex-wrap:wrap">
            <span class="badge" style="background:${typeInfo.couleur}20;color:${typeInfo.couleur}">
              ${typeInfo.emoji} ${typeInfo.nom}
            </span>
            <span class="badge badge-blue">${formatFileSize(doc.taille)}</span>
          </div>
          ${client ? `<div class="document-meta">👤 ${client.nom}</div>` : ''}
          <div class="document-meta">📅 ${formatDate(doc.dateDocument)}</div>
          ${doc.metadata.description ? `<div class="document-meta" style="font-size:0.8rem;color:#9CA3AF">💬 ${doc.metadata.description}</div>` : ''}
        </div>
        <div class="document-actions">
          <button class="icon-btn" onclick="viewDocument('${doc.id}')" title="Voir">👁️</button>
          <button class="icon-btn" onclick="downloadDocument('${doc.id}')" title="Télécharger">📥</button>
          <button class="icon-btn" onclick="confirmDeleteDocument('${doc.id}')" title="Supprimer">🗑️</button>
        </div>
      </div>
    `;
  }).join('');
}

// ========================================
// CONFIRMER LA SUPPRESSION
// ========================================
function confirmDeleteDocument(docId) {
  if (deleteDocument(docId)) {
    renderDocuments();
  }
}

// ========================================
// MODAL AJOUTER UN DOCUMENT
// ========================================
function showAddDocumentModal() {
  const modal = document.getElementById('modalDocument');
  if (!modal) {
    createAddDocumentModal();
  }

  // Réinitialiser le formulaire
  document.getElementById('documentFile').value = '';
  document.getElementById('documentType').value = 'AUTRE';
  document.getElementById('documentDescription').value = '';
  document.getElementById('documentClient').value = '';
  document.getElementById('documentDate').value = new Date().toISOString().split('T')[0];

  showModal('modalDocument');
}

// ========================================
// CRÉER LA MODAL
// ========================================
function createAddDocumentModal() {
  const modalHTML = `
    <div id="modalDocument" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">📎 Ajouter un document</h2>
          <button class="close" onclick="hideModal('modalDocument')">×</button>
        </div>

        <div class="form-group">
          <label class="form-label">Fichier *</label>
          <input type="file" class="form-input" id="documentFile" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" required>
          <div style="font-size:0.8rem;color:#9CA3AF;margin-top:0.5rem">
            Formats acceptés : Images, PDF, Word, Excel (max 10 MB)
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Type de document *</label>
          <select class="form-select" id="documentType">
            ${Object.entries(DOCUMENT_TYPES).map(([key, value]) =>
              `<option value="${key}">${value.emoji} ${value.nom}</option>`
            ).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Client (optionnel)</label>
          <select class="form-select" id="documentClient">
            <option value="">-- Aucun --</option>
            ${data.clients?.map(c => `<option value="${c.id}">${c.nom}</option>`).join('') || ''}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Date du document</label>
          <input type="date" class="form-input" id="documentDate" value="${new Date().toISOString().split('T')[0]}">
        </div>

        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="form-input" id="documentDescription" rows="3" placeholder="Optionnel : notes, contexte..."></textarea>
        </div>

        <div class="form-actions">
          <button class="btn btn-secondary" onclick="hideModal('modalDocument')">Annuler</button>
          <button class="btn btn-primary" onclick="saveDocument()">📎 Ajouter</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// ========================================
// SAUVEGARDER LE DOCUMENT
// ========================================
async function saveDocument() {
  const fileInput = document.getElementById('documentFile');
  const file = fileInput.files[0];

  if (!file) {
    alert('❌ Veuillez sélectionner un fichier');
    return;
  }

  // Vérifier la taille (max 10 MB)
  if (file.size > 10 * 1024 * 1024) {
    alert('❌ Le fichier est trop volumineux (max 10 MB)');
    return;
  }

  const metadata = {
    type: document.getElementById('documentType').value,
    clientId: document.getElementById('documentClient').value || null,
    dateDocument: document.getElementById('documentDate').value,
    description: document.getElementById('documentDescription').value,
    tags: []
  };

  try {
    await addDocument(file, metadata);
    showNotification('✅ Document ajouté');
    hideModal('modalDocument');
    renderDocuments();
  } catch (error) {
    alert('❌ Erreur lors de l\'ajout du document');
    console.error(error);
  }
}

// ========================================
// UTILITAIRES
// ========================================
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' o';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
  return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR');
}

// ========================================
// INITIALISATION
// ========================================
function initDocumentsManager() {
  loadDocuments();
}
