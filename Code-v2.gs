// ============================================================
// SCRIPT GOOGLE APPS POUR LES DEUX CHÊNES v3 HYBRIDE
// Avec support des PRODUITS et TIMESTAMPS (fusion intelligente)
// ============================================================

// ⚠️ CONFIGURATION REQUISE :
// 1. Créez un Google Sheet nommé "Les Deux Chênes - Data"
// 2. Copiez l'ID du Sheet depuis l'URL (entre /d/ et /edit)
// 3. Remplacez 'VOTRE_ID_ICI' ci-dessous
const SHEET_ID = 'VOTRE_ID_ICI';

// ⚠️ APRÈS DÉPLOIEMENT :
// 1. Copiez l'URL de déploiement
// 2. Dans index.html, ligne ~341, remplacez API_URL par cette URL

// Noms des onglets
const SHEET_NAMES = {
  clients: 'Clients',
  interventions: 'Interventions', 
  stocks: 'Stocks',
  personnel: 'Personnel',
  produits: 'Produits'
};

// Point d'entrée GET (récupérer les données)
function doGet(e) {
  try {
    const data = getAllData();
    const output = ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
    
    // Ajouter les en-têtes CORS
    return addCorsHeaders(output);
  } catch (error) {
    const output = ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
    return addCorsHeaders(output);
  }
}

// Point d'entrée POST (sauvegarder les données)
function doPost(e) {
  try {
    const params = e.parameter;
    
    if (params.action === 'save') {
      const data = JSON.parse(params.data);
      updateAllData(data);
      const output = ContentService
        .createTextOutput(JSON.stringify({status: 'ok'}))
        .setMimeType(ContentService.MimeType.JSON);
      return addCorsHeaders(output);
    }
    
    const output = ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: 'Action non reconnue'}))
      .setMimeType(ContentService.MimeType.JSON);
    return addCorsHeaders(output);
      
  } catch (error) {
    const output = ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
    return addCorsHeaders(output);
  }
}

// Fonction pour ajouter les en-têtes CORS
function addCorsHeaders(output) {
  // Note: Google Apps Script ne permet pas de définir les en-têtes directement
  // mais le déploiement en "Tout le monde" devrait suffire
  return output;
}

// Récupérer toutes les données depuis les onglets
function getAllData() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  return {
    clients: sheetToJson(ss, SHEET_NAMES.clients),
    interventions: sheetToJson(ss, SHEET_NAMES.interventions),
    stocks: sheetToJson(ss, SHEET_NAMES.stocks),
    personnel: sheetToJson(ss, SHEET_NAMES.personnel),
    produits: sheetToJson(ss, SHEET_NAMES.produits)
  };
}

// Mettre à jour toutes les données dans les onglets
function updateAllData(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  if (data.clients) jsonToSheet(ss, SHEET_NAMES.clients, data.clients);
  if (data.interventions) jsonToSheet(ss, SHEET_NAMES.interventions, data.interventions);
  if (data.stocks) jsonToSheet(ss, SHEET_NAMES.stocks, data.stocks);
  if (data.personnel) jsonToSheet(ss, SHEET_NAMES.personnel, data.personnel);
  if (data.produits) jsonToSheet(ss, SHEET_NAMES.produits, data.produits);
}

// Convertir un onglet en JSON
function sheetToJson(ss, sheetName) {
  const sheet = getOrCreateSheet(ss, sheetName);
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) return [];
  
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      let value = row[index];
      
      // Convertir les chaînes JSON en objets/tableaux
      if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // Garder comme chaîne si erreur
        }
      }
      
      // Convertir les timestamps en nombres
      if (header === 'lastModified' && typeof value === 'string') {
        value = parseInt(value);
      }
      
      obj[header] = value;
    });
    return obj;
  });
}

// Convertir du JSON vers un onglet
function jsonToSheet(ss, sheetName, data) {
  if (!data || data.length === 0) {
    const sheet = getOrCreateSheet(ss, sheetName);
    sheet.clear();
    return;
  }
  
  const sheet = getOrCreateSheet(ss, sheetName);
  
  // Extraire toutes les clés possibles
  const allKeys = new Set();
  data.forEach(item => {
    Object.keys(item).forEach(key => allKeys.add(key));
  });
  const headers = Array.from(allKeys);
  
  // Préparer les données
  const rows = [headers];
  data.forEach(item => {
    const row = headers.map(header => {
      let value = item[header];
      
      // Convertir les objets/tableaux en JSON
      if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value);
      }
      
      return value !== undefined ? value : '';
    });
    rows.push(row);
  });
  
  // Écrire dans la feuille
  sheet.clear();
  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
  
  // Formater l'en-tête
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#722F37');
  headerRange.setFontColor('#FFFFFF');
}

// Obtenir ou créer un onglet
function getOrCreateSheet(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  return sheet;
}

// Fonction de test
function testSync() {
  Logger.log('=== Test de synchronisation ===');
  
  try {
    const data = getAllData();
    Logger.log('✅ Données récupérées :');
    Logger.log('- Clients: ' + (data.clients ? data.clients.length : 0));
    Logger.log('- Interventions: ' + (data.interventions ? data.interventions.length : 0));
    Logger.log('- Stocks: ' + (data.stocks ? data.stocks.length : 0));
    Logger.log('- Personnel: ' + (data.personnel ? data.personnel.length : 0));
    Logger.log('- Produits: ' + (data.produits ? data.produits.length : 0));
    Logger.log('✅ Test réussi !');
  } catch (error) {
    Logger.log('❌ Erreur: ' + error.toString());
  }
}
