/**
 * FICHIER DE CONFIGURATION - LES DEUX CHÊNES
 *
 * Instructions :
 * 1. Copiez ce fichier en config.js
 * 2. Remplissez les valeurs ci-dessous
 * 3. Ne committez JAMAIS config.js (déjà dans .gitignore)
 */

const APP_CONFIG = {
  // ============================================================
  // CONFIGURATION GOOGLE APPS SCRIPT
  // ============================================================

  // URL de votre déploiement Google Apps Script
  // Obtenue après déploiement du fichier Code-v2.gs
  API_URL: 'https://script.google.com/macros/s/VOTRE_ID_ICI/exec',

  // ID de votre Google Sheet
  // Extrait de l'URL : https://docs.google.com/spreadsheets/d/{ID}/edit
  SHEET_ID: 'VOTRE_ID_GOOGLE_SHEET_ICI',

  // ============================================================
  // CONFIGURATION DE L'APPLICATION
  // ============================================================

  // Nom de l'entreprise
  COMPANY_NAME: 'Les Deux Chênes',
  COMPANY_SHORT_NAME: '2 Chênes',

  // Coordonnées
  COMPANY_ADDRESS: 'Votre adresse complète',
  COMPANY_PHONE: '+33 X XX XX XX XX',
  COMPANY_EMAIL: 'contact@lesdeuxchenes.fr',
  COMPANY_SIRET: 'XXX XXX XXX XXXXX',

  // ============================================================
  // CONFIGURATION CARTOGRAPHIE
  // ============================================================

  // ID de votre carte Google Maps
  // Extrait de l'URL de partage de votre Google My Maps
  GOOGLE_MAPS_ID: '1CfZty8M2hSI2lNN7aWbMpfzg-xhU-BqF',

  // ============================================================
  // PARAMÈTRES MÉTIER
  // ============================================================

  // Seuil d'alerte stock (litres)
  STOCK_ALERT_THRESHOLD: 10,

  // Devise
  CURRENCY: '€',

  // Tarifs horaires par défaut (pour futurs exports facturation)
  TARIFS: {
    MAIN_OEUVRE_HEURE: 25,        // €/heure
    TRACTEUR_HEURE: 45,            // €/heure
    TRAITEMENT_HA: 80,             // €/hectare
  },

  // Types d'interventions (peut être personnalisé)
  TYPES_INTERVENTIONS: [
    'Arrosage des complants (avec cuve sur tracteur)',
    'Attachage / liage',
    'Broyage des sarments',
    'Broyeur d\'accotement',
    'Complantation (remplacement des ceps morts)',
    'Comptage des manquants',
    'Débroussaillage',
    'Désherbage chimique des restanques',
    'Désherbage chimique sur le rang',
    'Ébourgeonnage (sagattes)',
    'Écimage / Rognage mécanique',
    'Écimage manuel',
    'Entretien du palissage',
    'Épandage d\'engrais',
    'Epareuse, tonte et entretien des talus',
    'Griffage de l\'inter-rang',
    'Gyrobroyage (tonte de l\'herbe)',
    'Interceps binage rang + griffage inter-rang',
    'Main d\'oeuvre vendange',
    'Mini-pelle 2,5t',
    'Mini-pelle 8 tonnes',
    'Mise en tas',
    'Piochage',
    'Prétaillage mécanique',
    'Ramassage et évacuation des vignes et bois morts',
    'Retrait des ficelles',
    'Rotavator',
    'Taille de la vigne',
    'Tirage des sarments',
    'Tondeuse interceps (tonte sur le rang)',
    'Traitement phytosanitaire',
    'Transport de la vendange',
    'Vendange verte',
    'Autre'
  ],

  // ============================================================
  // FONCTIONNALITÉS (à venir)
  // ============================================================

  // Activer l'authentification utilisateur
  ENABLE_AUTH: false,

  // Activer les exports réglementaires
  ENABLE_REGULATORY_EXPORT: false,

  // Activer la gestion documentaire
  ENABLE_DOCUMENTS: false,

  // Activer l'assemblage multi-lots
  ENABLE_ASSEMBLAGE: false,

  // ============================================================
  // PERSONNALISATION VISUELLE
  // ============================================================

  THEME: {
    PRIMARY_COLOR: '#722F37',      // Bordeaux
    ACCENT_COLOR: '#D4AF37',       // Or
    BACKGROUND_COLOR: '#1a1a1a',   // Noir
    TEXT_COLOR: '#FFFFFF',         // Blanc
    SECONDARY_COLOR: '#9CA3AF',    // Gris
  }
};

// Export pour utilisation dans l'application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APP_CONFIG;
}
