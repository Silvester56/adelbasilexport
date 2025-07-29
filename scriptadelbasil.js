// ==UserScript==
// @name         Export
// @namespace    http://tampermonkey.net/
// @version      2025-07-29
// @description  Export data from AdelBasil pages
// @author       Silvester56
// @match
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.
// @require      https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const jspdfScript = document.createElement('script');
    const logo = "data:image/webp;base64,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";
    const matchingTable = {
      IdDossier: "Identifiant de dossier",
      IdOrganisation: "Identifiant d'organisation",
      AncienNumero: "Ancien numéro",
      IdEtatDossier: "Identifiant de dossier d'état",
      IdIdentite: "",
      HashCodeForIdIdentite: "",
      IdLogement: "",
      HashCodeForLogement: "",
      IdRessource: "",
      HashCodeForIdRessource: "",
      IdDemarcheConseil: "",
      HashCodeForDemarcheConseil: "",
      HashCodeForPreventionExpulsions: "",
      HashCodeForHabitatIndigne: "",
      HashCodeForAccesLogement: "",
      HashCodeForAccesAccesHebergement: "",
      IdRapportLocatif: "",
      HashCodeForRapportLocatif: "",
      HashCodeForDiscrimination: "",
      returnToList: "",
      activTab: "",
      Identite_DateCreation: "Date de création",
      Identite_DateModification: "Date de modification",
      Identite_idCreateur: "",
      Identite_idModificateur: "",
      Identite_IdIdentite: "",
      Identite_Nom: "Nom",
      Identite_Prenom: "Prénom",
      Identite_IdReferentielSexe: "",
      Identite_IdReferentielSexe: "",
      Identite_NomConjoint: "Nom du conjoint",
      Identite_Adresse: "Adresse",
      Identite_ComplementAdresse: "",
      Identite_CodePostal: "",
      Identite_Ville: "",
      Identite_CodeGeographique: "",
      Identite_NumeroTelephone: "",
      Identite_Email: "",
      Identite_NombreEnfant: "",
      LibelleAutreSituationFamille: "",
      Identite_SousTuelle: "",
      Identite_SousTuelle: "",
      Logement_IdLogement: "",
      Logement_DateCreation: "",
      Logement_DateModification: "",
      Logement_idCreateur: "",
      Logement_idModificateur: "",
      Logement_MontantLoyer: "",
      Logement_MontantCharge: "",
      Logement_MontantAidesLogement: "",
      Logement_NombrePersonne: "",
      Logement_NombrePieces: "",
      Logement_SurfaceHabitable: "",
      Logement_EstAssuree: "",
      Logement_EstAssuree: "",
      Logement_IdReferentielTypeGestion: "",
      Logement_IdReferentielTypeGestion: "",
      Logement_RemboursementPretImmobilier: "",
      Logement_RemboursementPretImmobilier: "",
      Ressource_IdRessource: "",
      Ressource_DateCreation: "",
      Ressource_DateModification: "",
      Ressource_idCreateur: "",
      Ressource_idModificateur: "",
      LibelleRevenu1Autre: "",
      LibelleRevenu2Autre: "",
      Ressource_LibelleRessourcesComplementaire: "",
      Ressource_Montant: "",
      DemarcheConseil_DateCreation: "",
      DemarcheConseil_DateModification: "",
      DemarcheConseil_idCreateur: "",
      DemarcheConseil_idModificateur: "",
      DemarcheConseil_IdDemarcheConseil: "",
      LibelleAutreProvenance: "",
      LibelleAutreOrientation: "",
      DemarcheConseil_IdReferentielTravailleurSocial: "",
      DemarcheConseil_IdReferentielTravailleurSocial: "",
      DemarcheConseil_IdReferentielAccompagnementJurique: "",
      DemarcheConseil_IdReferentielAccompagnementJurique: "",
      DemarcheConseil_IdReferentielDossierAideJuridictionnelle: "",
      DemarcheConseil_IdReferentielDossierAideJuridictionnelle: "",
      DemarcheConseil_IdReferentielProtectionJuriqique: "",
      DemarcheConseil_IdReferentielProtectionJuriqique: "",
      DemarcheConseil_PresentationAudience: "",
      DemarcheConseil_PresentationAudience: "",
      DemarcheConseil_IdReferentielAvocat: "",
      DemarcheConseil_IdReferentielAvocat: "",
      PreventionExpulsion_DateCreation: "",
      PreventionExpulsion_DateModification: "",
      PreventionExpulsion_idCreateur: "",
      PreventionExpulsion_idModificateur: "",
      CauseImpayeLoyerAutre: "",
      PreventionExpulsion_MontantDetteLoyer: "",
      CauseOccupationSansDroitAutre: "",
      HabitatIndigne_DateCreation: "",
      HabitatIndigne_DateModification: "",
      HabitatIndigne_idCreateur: "",
      HabitatIndigne_idModificateur: "",
      AccesLogement_DateCreation: "",
      AccesLogement_DateModification: "",
      AccesLogement_idCreateur: "",
      AccesLogement_idModificateur: "",
      AccesLogement_HashCodeForDalo: "",
      AccesLogement_NumeroDemandeLogementSocial: "",
      AccesLogement_BudgetMensuel: "",
      AccesLogement_Reloge: "",
      AccesLogement_RelogementCadreDalo: "",
      AccesLogement_DateRelogement: "",
      AccesLogement_AttributionLogementSocial: "",
      AccesLogement_RecoursDalo: "",
      AccesLogement_Dalo_DateCreation: "",
      AccesLogement_Dalo_DateModification: "",
      AccesLogement_Dalo_DateDepotDossier: "",
      AccesLogement_Dalo_DateDecision: "",
      AccesLogement_Dalo_DateDepotRecoursGracieux: "",
      AccesLogement_Dalo_DateDecisionRecoursGracieux: "",
      AccesHebergement_DateCreation: "",
      AccesHebergement_DateModification: "",
      AccesHebergement_idCreateur: "",
      AccesHebergement_idModificateur: "",
      AccesHebergement_HashCodeForDalo: "",
      AccesHebergement_RecoursDalo: "",
      AccesHebergement_Dalo_DateCreation: "",
      AccesHebergement_Dalo_DateModification: "",
      AccesHebergement_Dalo_DateDepotDossier: "",
      AccesHebergement_Dalo_DateDecision: "",
      RapportLocatif_DateCreation: "",
      RapportLocatif_DateModification: "",
      RapportLocatif_idCreateur: "",
      RapportLocatif_idModificateur: "",
      RapportLocatif_IdReferentielResolutionSituation: "",
      RapportLocatif_IdReferentielResolutionSituation: "",
      Discrimination_DateCreation: "",
      Discrimination_DateModification: "",
      Discrimination_idCreateur: "",
      Discrimination_idModificateur: "",
      Numero: "",
      Identite_AdelNumeroAdherent: "",
      DateCreation: "",
      DisplayActionTraitees: "",
    };
    let linesPerPage = 20;
    let exportAsTextButton = document.createElement("button");
    let exportAsPdfButton = document.createElement("button");
    exportAsTextButton.innerHTML = "Exporter en texte";
    exportAsPdfButton.innerHTML = "Exporter en PDF";
    exportAsTextButton.style = "margin: 0 1rem; cursor: pointer;background-color: #008CBA;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;";
    exportAsPdfButton.style = "margin: 0 1rem; cursor: pointer;background-color: #008CBA;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;";
    let exportData = (exportAsPdf = false) => {
      let dataObject = Object.values(document.getElementsByTagName("input")).reduce((acc, cur) => {
        if (cur.id) {
         return {...acc, [cur.id]: cur.value};
        }
        return acc;
      }, {});
      let title = `export_${dataObject.Identite_Nom}_${dataObject.Identite_Prenom}_${new Date().toLocaleString().replaceAll("/", "-")}${exportAsPdf ? ".pdf" : ".txt"}`;
      let dataArray = Object.keys(dataObject).reduce((acc, cur) => acc.concat(`${matchingTable[cur] && matchingTable[cur].length > 0 ? matchingTable[cur] : cur} : ${dataObject[cur]}`), []);
      if (exportAsPdf) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.addImage(logo, 'JPEG', 50, 0, 140, 105, "logo", "NONE", 0);
        dataArray.forEach((line, i) => {
          if (i % linesPerPage === 0) {
            doc.addPage();
          }
          doc.text(line, 10, 10 + (i % linesPerPage) * 10);
        });
        doc.save(title);
      } else {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataArray.join("\n")));
        element.setAttribute('download', title);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    };
    exportAsTextButton.addEventListener("click", () => exportData());
    exportAsPdfButton.addEventListener("click", () => exportData(true));
    jspdfScript.src = 'https://cdn.jsdelivr.net/npm/jspdf@3.0.1/dist/jspdf.umd.min.js';
    jspdfScript.onload = () => {
      document.getElementsByTagName("body")[0].prepend(exportAsTextButton);
      document.getElementsByTagName("body")[0].prepend(exportAsPdfButton);
    };
    document.head.appendChild(jspdfScript);
})();
