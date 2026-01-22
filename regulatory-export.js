// ========================================
// EXPORTS RÉGLEMENTAIRES
// Les Deux Chênes - Conformité AOP et DGCCRF
// ========================================

// ========================================
// EXPORT REGISTRE PHYTOSANITAIRE (DGCCRF)
// ========================================

/**
 * Génère un export CSV conforme DGCCRF
 * Obligatoire pour tous les viticulteurs
 */
function exportRegistrePhyto() {
  if (!hasPermission('read:*')) {
    alert('❌ Permission refusée');
    return;
  }

  // Récupérer toutes les interventions de type traitement
  const interventions = data.interventions.filter(
    i => i.type === 'Traitement phytosanitaire'
  );

  if (interventions.length === 0) {
    alert('ℹ️ Aucun traitement phytosanitaire enregistré');
    return;
  }

  // En-têtes conformes DGCCRF
  const headers = [
    'Date d\'intervention',
    'Parcelle',
    'Client',
    'Surface traitée (ha)',
    'Produit utilisé',
    'Dose appliquée',
    'Quantité totale',
    'Opérateur',
    'Conditions météo',
    'Observations'
  ];

  // Préparer les données
  const rows = interventions.map(intervention => {
    const client = data.clients.find(c => c.id === intervention.clientId);

    return [
      formatDate(intervention.date),
      intervention.parcelle || '-',
      client ? client.nom : '-',
      client ? client.surface || '0' : '0',
      intervention.produit || 'Non spécifié',
      intervention.dose || '-',
      intervention.quantite || '-',
      intervention.operateur || getCurrentUser()?.nom || '-',
      intervention.meteo || 'Non renseigné',
      intervention.observations || ''
    ];
  });

  // Générer le CSV
  const csvContent = [
    headers.join(';'),
    ...rows.map(row => row.join(';'))
  ].join('\n');

  // Télécharger
  downloadFile(
    csvContent,
    `Registre_Phyto_${getCurrentDate()}.csv`,
    'text/csv;charset=utf-8;'
  );

  showNotification('✅ Registre phytosanitaire exporté');
}

// ========================================
// EXPORT DÉCLARATION DE RÉCOLTE
// ========================================

/**
 * Export pour la déclaration de récolte annuelle
 */
function exportDeclarationRecolte(annee) {
  if (!hasPermission('read:*')) {
    alert('❌ Permission refusée');
    return;
  }

  if (!annee) {
    annee = new Date().getFullYear();
  }

  // Filtrer les interventions de vendange de l'année
  const vendanges = data.interventions.filter(i => {
    const year = new Date(i.date).getFullYear();
    return year === annee && (
      i.type === 'Main d\'oeuvre vendange' ||
      i.type === 'Transport de la vendange'
    );
  });

  if (vendanges.length === 0) {
    alert(`ℹ️ Aucune vendange enregistrée pour ${annee}`);
    return;
  }

  // Regrouper par client
  const parClient = {};

  vendanges.forEach(v => {
    const client = data.clients.find(c => c.id === v.clientId);
    if (!client) return;

    if (!parClient[client.id]) {
      parClient[client.id] = {
        nom: client.nom,
        surface: client.surface || 0,
        parcelles: [],
        quantite: 0
      };
    }

    if (v.parcelle && !parClient[client.id].parcelles.includes(v.parcelle)) {
      parClient[client.id].parcelles.push(v.parcelle);
    }

    // Estimer la quantité (si renseignée)
    if (v.quantite) {
      parClient[client.id].quantite += parseFloat(v.quantite) || 0;
    }
  });

  // Générer le rapport
  const headers = [
    'Client',
    'Surface totale (ha)',
    'Parcelles',
    'Quantité récoltée (kg)',
    'Rendement estimé (kg/ha)',
    'Observations'
  ];

  const rows = Object.values(parClient).map(client => [
    client.nom,
    client.surface.toFixed(2),
    client.parcelles.join(', ') || 'Non renseigné',
    client.quantite.toFixed(0),
    client.surface > 0
      ? (client.quantite / client.surface).toFixed(0)
      : '0',
    ''
  ]);

  const csvContent = [
    headers.join(';'),
    ...rows.map(row => row.join(';'))
  ].join('\n');

  downloadFile(
    csvContent,
    `Declaration_Recolte_${annee}.csv`,
    'text/csv;charset=utf-8;'
  );

  showNotification(`✅ Déclaration de récolte ${annee} exportée`);
}

// ========================================
// EXPORT INVENTAIRE DES STOCKS
// ========================================

/**
 * Export de l'inventaire des stocks phytosanitaires
 * Obligatoire pour les contrôles
 */
function exportInventaireStocks() {
  if (!hasPermission('read:*')) {
    alert('❌ Permission refusée');
    return;
  }

  const headers = [
    'Produit',
    'Client',
    'Quantité en stock',
    'Unité',
    'Dose recommandée',
    'Date dernière entrée',
    'Date dernière sortie',
    'Alerte'
  ];

  const rows = data.stocks.map(stock => {
    const client = data.clients.find(c => c.id === stock.clientId);
    const produit = data.produits.find(p => p.id === stock.produitId);

    const alerteStock = stock.quantite < stock.seuilAlerte;

    return [
      produit ? produit.nom : 'Produit inconnu',
      client ? client.nom : '-',
      stock.quantite || '0',
      stock.unite || 'L',
      produit ? produit.dose : '-',
      stock.derniereEntree || '-',
      stock.derniereSortie || '-',
      alerteStock ? 'OUI - Stock bas' : 'Non'
    ];
  });

  const csvContent = [
    headers.join(';'),
    ...rows.map(row => row.join(';'))
  ].join('\n');

  downloadFile(
    csvContent,
    `Inventaire_Stocks_${getCurrentDate()}.csv`,
    'text/csv;charset=utf-8;'
  );

  showNotification('✅ Inventaire des stocks exporté');
}

// ========================================
// EXPORT REGISTRE DU PERSONNEL
// ========================================

/**
 * Export du registre du personnel et des heures travaillées
 */
function exportRegistrePersonnel(periode) {
  if (!hasPermission('read:*')) {
    alert('❌ Permission refusée');
    return;
  }

  // Déterminer la période
  let dateDebut, dateFin;

  if (!periode) {
    // Par défaut : mois en cours
    const now = new Date();
    dateDebut = new Date(now.getFullYear(), now.getMonth(), 1);
    dateFin = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  } else {
    [dateDebut, dateFin] = periode;
  }

  const headers = [
    'Employé',
    'Date',
    'Heures travaillées',
    'Type de contrat',
    'Observations'
  ];

  const rows = [];

  data.personnel.forEach(emp => {
    // Filtrer les pointages dans la période
    if (emp.pointages && emp.pointages.length > 0) {
      emp.pointages.forEach(p => {
        const datePointage = new Date(p.date);

        if (datePointage >= dateDebut && datePointage <= dateFin) {
          rows.push([
            emp.nom,
            formatDate(p.date),
            p.heures || '0',
            emp.typeContrat || 'Non spécifié',
            p.notes || ''
          ]);
        }
      });
    }
  });

  if (rows.length === 0) {
    alert('ℹ️ Aucun pointage trouvé pour cette période');
    return;
  }

  const csvContent = [
    headers.join(';'),
    ...rows.map(row => row.join(';'))
  ].join('\n');

  const periodeStr = `${formatDate(dateDebut)}_${formatDate(dateFin)}`;

  downloadFile(
    csvContent,
    `Registre_Personnel_${periodeStr}.csv`,
    'text/csv;charset=utf-8;'
  );

  showNotification('✅ Registre du personnel exporté');
}

// ========================================
// EXPORT TRAÇABILITÉ AOP
// ========================================

/**
 * Export de traçabilité pour les contrôles AOP
 */
function exportTraceabiliteAOP(appellation, campagne) {
  if (!hasPermission('read:*')) {
    alert('❌ Permission refusée');
    return;
  }

  if (!appellation) {
    appellation = 'AOP Générique';
  }

  if (!campagne) {
    campagne = new Date().getFullYear();
  }

  // Créer un rapport complet
  let rapport = [];

  // En-tête
  rapport.push('='.repeat(80));
  rapport.push(`DOSSIER DE TRAÇABILITÉ ${appellation.toUpperCase()}`);
  rapport.push(`Campagne ${campagne}/${parseInt(campagne) + 1}`);
  rapport.push(`Généré le ${formatDate(new Date())}`);
  rapport.push('='.repeat(80));
  rapport.push('');

  // 1. PARCELLAIRE
  rapport.push('1. PARCELLAIRE');
  rapport.push('-'.repeat(80));

  const clientsAOP = data.clients.filter(c => c.surface && c.surface > 0);

  clientsAOP.forEach(client => {
    rapport.push(`Client: ${client.nom}`);
    rapport.push(`  Surface totale: ${client.surface} ha`);
    rapport.push(`  Adresse: ${client.adresse || 'Non renseignée'}`);
    rapport.push('');
  });

  const surfaceTotale = clientsAOP.reduce((sum, c) => sum + (parseFloat(c.surface) || 0), 0);
  rapport.push(`SURFACE TOTALE DÉCLARÉE: ${surfaceTotale.toFixed(2)} ha`);
  rapport.push('');

  // 2. TRAITEMENTS PHYTOSANITAIRES
  rapport.push('2. TRAITEMENTS PHYTOSANITAIRES');
  rapport.push('-'.repeat(80));

  const traitements = data.interventions.filter(
    i => i.type === 'Traitement phytosanitaire' &&
         new Date(i.date).getFullYear() === campagne
  );

  traitements.forEach(t => {
    const client = data.clients.find(c => c.id === t.clientId);

    rapport.push(`Date: ${formatDate(t.date)}`);
    rapport.push(`  Client: ${client ? client.nom : '-'}`);
    rapport.push(`  Parcelle: ${t.parcelle || '-'}`);
    rapport.push(`  Produit: ${t.produit || 'Non spécifié'}`);
    rapport.push(`  Dose: ${t.dose || '-'}`);
    rapport.push('');
  });

  rapport.push(`NOMBRE TOTAL DE TRAITEMENTS: ${traitements.length}`);
  rapport.push('');

  // 3. INTERVENTIONS CULTURALES
  rapport.push('3. INTERVENTIONS CULTURALES');
  rapport.push('-'.repeat(80));

  const interventionsCulturales = data.interventions.filter(
    i => i.type !== 'Traitement phytosanitaire' &&
         new Date(i.date).getFullYear() === campagne
  );

  // Regrouper par type
  const parType = {};
  interventionsCulturales.forEach(i => {
    if (!parType[i.type]) parType[i.type] = 0;
    parType[i.type]++;
  });

  Object.entries(parType).forEach(([type, count]) => {
    rapport.push(`  ${type}: ${count} interventions`);
  });

  rapport.push('');
  rapport.push(`TOTAL INTERVENTIONS: ${interventionsCulturales.length}`);
  rapport.push('');

  // 4. STOCKS
  rapport.push('4. STOCKS DE PRODUITS PHYTOSANITAIRES');
  rapport.push('-'.repeat(80));

  data.stocks.forEach(stock => {
    const produit = data.produits.find(p => p.id === stock.produitId);
    const client = data.clients.find(c => c.id === stock.clientId);

    rapport.push(`${produit ? produit.nom : 'Produit inconnu'}`);
    rapport.push(`  Client: ${client ? client.nom : '-'}`);
    rapport.push(`  Quantité: ${stock.quantite} ${stock.unite || 'L'}`);
    rapport.push('');
  });

  rapport.push('');

  // 5. CONFORMITÉ
  rapport.push('5. CONFORMITÉ AOP');
  rapport.push('-'.repeat(80));
  rapport.push('☐ Cahier des charges respecté');
  rapport.push('☐ Parcelles conformes');
  rapport.push('☐ Traitements autorisés uniquement');
  rapport.push('☐ Rendements conformes');
  rapport.push('☐ Traçabilité complète');
  rapport.push('');

  // Générer le fichier
  const contenu = rapport.join('\n');

  downloadFile(
    contenu,
    `Tracabilite_AOP_${appellation.replace(/\s/g, '_')}_${campagne}.txt`,
    'text/plain;charset=utf-8;'
  );

  showNotification(`✅ Dossier de traçabilité AOP ${campagne} exporté`);
}

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(date) {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR');
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}

// ========================================
// INTERFACE EXPORT RÉGLEMENTAIRE
// ========================================

function showRegulatoryExportModal() {
  const modal = document.getElementById('modalRegulatoryExport');
  if (modal) {
    showModal('modalRegulatoryExport');
  } else {
    // Créer le modal s'il n'existe pas
    createRegulatoryExportModal();
  }
}

function createRegulatoryExportModal() {
  const modalHTML = `
    <div id="modalRegulatoryExport" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">📜 Exports Réglementaires</h2>
          <button class="close" onclick="hideModal('modalRegulatoryExport')">×</button>
        </div>

        <div class="card" style="margin-bottom:1rem">
          <h3 style="color:#D4AF37;margin-bottom:1rem">🇫🇷 DGCCRF - Contrôles officiels</h3>

          <button class="btn btn-primary" onclick="exportRegistrePhyto()" style="width:100%;margin-bottom:0.5rem">
            📋 Registre phytosanitaire
          </button>

          <button class="btn btn-primary" onclick="exportInventaireStocks()" style="width:100%;margin-bottom:0.5rem">
            📦 Inventaire des stocks
          </button>

          <button class="btn btn-primary" onclick="exportRegistrePersonnel()" style="width:100%">
            👷 Registre du personnel (mois en cours)
          </button>
        </div>

        <div class="card" style="margin-bottom:1rem">
          <h3 style="color:#D4AF37;margin-bottom:1rem">🍇 AOP - Traçabilité</h3>

          <div class="form-group">
            <label class="form-label">Appellation</label>
            <input type="text" class="form-input" id="exportAOPAppellation"
                   placeholder="Ex: Bandol, Côtes de Provence..." value="AOP">
          </div>

          <div class="form-group">
            <label class="form-label">Campagne viticole</label>
            <input type="number" class="form-input" id="exportAOPCampagne"
                   value="${new Date().getFullYear()}" min="2020" max="2030">
          </div>

          <button class="btn btn-primary" onclick="exportTraceabiliteAOPFromModal()" style="width:100%;margin-bottom:0.5rem">
            📜 Dossier complet de traçabilité AOP
          </button>

          <button class="btn btn-primary" onclick="exportDeclarationRecolteFromModal()" style="width:100%">
            🚜 Déclaration de récolte
          </button>
        </div>

        <div class="login-warning" style="font-size:0.85rem">
          ℹ️ Ces exports sont conformes aux exigences réglementaires françaises.
          Conservez-les précieusement pour les contrôles.
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function exportTraceabiliteAOPFromModal() {
  const appellation = document.getElementById('exportAOPAppellation').value || 'AOP';
  const campagne = parseInt(document.getElementById('exportAOPCampagne').value) || new Date().getFullYear();

  exportTraceabiliteAOP(appellation, campagne);
}

function exportDeclarationRecolteFromModal() {
  const campagne = parseInt(document.getElementById('exportAOPCampagne').value) || new Date().getFullYear();

  exportDeclarationRecolte(campagne);
}
