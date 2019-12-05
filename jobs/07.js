// UPSERT PARENT SUBMISSION ====================================================
upsert(
  'ampi__Submission__c',
  'Submission_ID__c',
  fields(
    field('ampi__Description__c', dataValue('form.@name')),
    field(
      'Location__latitude__s',
      state => state.data.form.GPS.split(' ')[0]
    ),
    field('Location__longitude__s', state => state.data.form.GPS.split(' ')[1]),
    field('Submission_ID__c', dataValue('id')),
    relationship(
      'Project__r',
      'Project_ID__c',
      `${state.data.form.fixture_localization.village}-Post CEP`
    )
  )
);
// =============================================================================

// BUILD ARRAY OF QUESTIONS FOR BULK UPSERT ====================================
alterState(state => {
  const pId = state.data.id;

  function makeSet(a, b, c) {
    const fieldSet = {
      Question_ID__c: `${pId}-${a}`,
      ampi__Description__c: a,
    };

    switch (b) {
      case 'ampi__Picklist_Response__c':
        fieldSet.ampi__Response_Type__c = 'Picklist';
        break;

      case 'ampi__Number_Response__c':
        fieldSet.ampi__Response_Type__c = 'Number';
        break;

      case 'ampi__Text__Response__c':
        fieldSet.ampi__Response_Type__c = 'Qualitative';
        break;

      default:
        break;
    }

    fieldSet[b] = dataValue(c)(state);

    return fieldSet;
  }

  state.fieldSets = [
    makeSet(
      'departement',
      'ampi__Picklist_Response__c',
      'form.fixture_localization.departement'
    ),
    makeSet(
      'commune',
      'ampi__Picklist_Response__c',
      'form.fixture_localization.commune'
    ),
    makeSet(
      'village',
      'ampi__Picklist_Response__c',
      'form.fixture_localization.village'
    ),
    makeSet(
      'Specify Month of data collection',
      'ampi__Picklist_Response__c',
      'form.SUIVI_MENSUEL.donnees__mois'
    ),
    makeSet(
      'How many meetings have been held by CMCs during the last three months?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.Nombre_reunions_CGC'
    ),
    makeSet(
      'How many activities have been planned during the last three months?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.Activites_planifiees'
    ),
    makeSet(
      'How many activities have been completed during the last three months?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.activites_realisees'
    ),
    makeSet(
      'How many villages have been sensitized by CMCs during the last three months?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.nbre_villages_sensibilises'
    ),
    makeSet(
      'Ask the name of sensitized villages?',
      'ampi__Text_Response__c',
      'form.SUIVI_MENSUEL.Nom_villages_sensibilises'
    ),
    makeSet(
      'Did the CMC conduct cleaning sessions during this month?',
      'ampi__Picklist_Response__c',
      'form.SUIVI_MENSUEL.Activites_realisees_CGC.nettoyage_durant_le_mois_CGC'
    ),
    makeSet(
      'How many sessions did the CMC conduct this month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.Activites_realisees_CGC.nbre_de_session_de_nettoyage'
    ),
    makeSet(
      'How many IVMs have been organized by CMCs, in the presence of local authorities, to advocate for human rights during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_des_droits_humains_en_presence_des_autorites_loc.Nbre_RIV_Promotion_DH'
    ),
    makeSet(
      'How many Men were present during IVM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_des_droits_humains_en_presence_des_autorites_loc.nbre_homme_present_RIV_prom_dh'
    ),
    makeSet(
      'How many Women were present during IVM for Human Rights promotion ?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_des_droits_humains_en_presence_des_autorites_loc.nbre_femmes_presentes_RIV_Prom_DH'
    ),
    makeSet(
      'How many IZMs have been organized by CMCs, in the presence of local authorities, to advocate for human rights during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_des_droits_humains_en_presence_des_autorites_loc.Nbre_RIZ_Promotion_DH'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_des_droits_humains_en_presence_des_autorites_loc.nbre_hom_present_RIZ_prom_DH'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_des_droits_humains_en_presence_des_autorites_loc.nbre_femmes_presentes_RIZ_prom_DH'
    ),
    makeSet(
      'How many caravans have been organized by CMCs, in the presence of local authorities, to advocate for human rights during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_des_droits_humains_en_presence_des_autorites_loc.Nbre_caravanes_Promotion_DH'
    ),
    makeSet(
      'How many Men, were present during caravane for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_des_droits_humains_en_presence_des_autorites_loc.nbre_hom_caravane_prom_DH'
    ),
    makeSet(
      'How many Women, were present caravane for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_des_droits_humains_en_presence_des_autorites_loc.nbre_fem_caravane_prom_DH'
    ),
    makeSet(
      'How many talks have been organized by CMCs, in the presence of local authorities, to advocate for human rights during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_des_droits_humains_en_presence_des_autorites_loc.Nbre_Causeries_Promotion_DH'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_des_droits_humains_en_presence_des_autorites_loc.nbre_hom_present_causerie_prom_DH'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_des_droits_humains_en_presence_des_autorites_loc.nbre_femmes_presentes_causeries_prom_DH'
    ),
    makeSet(
      'How many IVMs have been organized by CMCs, in the presence of local authorities, to advocate for peace during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_cgc_promotion_de_la_paix.Nbre_RIV_Promotion_Paix'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_cgc_promotion_de_la_paix.nbre_hom_present_RIV_prom_paix'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_cgc_promotion_de_la_paix.nbre_femmes_presentes_RIV_prom_paix'
    ),
    makeSet(
      'How many IZMs have been organized by CMCs, in the presence of local authorities, to advocate for peace during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_cgc_promotion_de_la_paix.Nbre_RIZ_Promotion_Paix'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_cgc_promotion_de_la_paix.nbre_hom_present_RIZ_prom_paix'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_cgc_promotion_de_la_paix.nbre_femmes_presentes_RIZ_prom_paix'
    ),
    makeSet(
      'How many caravans have been organized by CMCs, in the presence of local authorities, to advocate for peace during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_cgc_promotion_de_la_paix.Nbre_Caravanes_Promotion_Paix'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_cgc_promotion_de_la_paix.nbre_hom_caravane_prom_paix'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_cgc_promotion_de_la_paix.nbre_fem_caravane_prom_paix'
    ),
    makeSet(
      'How many talks have been organized by CMCs, in the presence of local authorities, to advocate for peace during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_cgc_promotion_de_la_paix.Nbre_Causeries_Promotion_Paix'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_cgc_promotion_de_la_paix.nbre_hom_present_causerie_prom_paix'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_cgc_promotion_de_la_paix.nbre_fem_causerie_prom_paix'
    ),
    makeSet(
      'How many IVMs promoting peace have been organized by CMCs during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_de_la_paix.Nombre_RIV_Promotion_domaine_Promotion_Paix'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_de_la_paix.nbre_hom_present_RIV_promo_paix'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_de_la_paix.nbre_fem_presente_RIV_promo_paix'
    ),
    makeSet(
      'How many IZMs promoting peace have been organized by CMCs during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_de_la_paix.Nombre_RIZ_Domaine_Promotion_Paix'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_de_la_paix.nbre_hom_present_RIZ_promo_paix'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_de_la_paix.nbre_fem_presente_RIZ_promo_paix'
    ),
    makeSet(
      'How many caravans promoting peace have been organized by CMCs during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_de_la_paix.Nombre_Caravanes_Domaine_Promotion_Paix'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_de_la_paix.nbre_hom_present_caravane_promo_paix'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_de_la_paix.nbre_fem_caravane_promo_paix'
    ),
    makeSet(
      'How many talks promoting peace have been organized by CMCs during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_de_la_paix.Nbre_Causeries_Domaine_Promotion_Paix'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_de_la_paix.nbre_hom_present_causerie_promo_paix'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_promotion_de_la_paix.nbre_fem_prsente_causerie_promo_paix'
    ),
    makeSet(
      'How many IVMs addressing human security issues have been organized by CMCs during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_securite_humaine.Nbre_RIV_securite_humaine'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_securite_humaine.nbre_hom_present_RIV_sec_hum'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_securite_humaine.nbre_fem_RIV_sec_hum'
    ),
    makeSet(
      'How many IZMs addressing human security issues have been organized by CMCs during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_securite_humaine.Nbre_RIZ_Securite_humaine'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_securite_humaine.nbre_hom_present_RIZ_sec_hum'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_securite_humaine.nbre_fem_presentes_RIZ_sec_hum'
    ),
    makeSet(
      'How many caravans addressing human security issues have been organized by CMCs during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_securite_humaine.Nbre_Caravanes_Securite_humaine'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_securite_humaine.nbre_hom_present_caravane_sec_hum'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_securite_humaine.nbre_fem_presente_caravane_sec_hum'
    ),
    makeSet(
      'How many talks addressing human security issues have been organized by CMCs during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_securite_humaine.Nbre_Causeries_Securite_humaine'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_securite_humaine.nbre_hom_present_causerie_sec_hum'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.dynamisme_du_cgc_securite_humaine.nbre_fem_causerie_sec_hum'
    ),
    makeSet(
      'How many IVMs promoting human rights have been organized by CMCs during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.question1.Nombre_RIV__Domaine_Promotion_droits_humains'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.question1.nbre_hom_present_RIV_promo_DH'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.question1.nbre_fem_presente_RIV_promo_DH'
    ),
    makeSet(
      'How many IZMs promoting human rights have been organized by CMCs during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.question1.Nombre_RIZ_Domaine_Promotion_droits_humains'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.question1.nbre_hom_present_RIZ_promo_DH'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.question1.nbre_fem_present_RIV_promo_DH'
    ),
    makeSet(
      'How many caravans promoting human rights have been organized by CMCs during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.question1.Nombre_Caravanes_Promotion_droits_humains'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.question1.nbre_hom_present_caravane_promo_DH'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.question1.nbre_fem_presente_caravane_promo_DH'
    ),
    makeSet(
      'How many talks promoting human rights have been organized by CMCs during the last month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.question1.Nombre_Causeries_Domaine_Promotion_droits_humains'
    ),
    makeSet(
      'How many Men, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.question1.nbre_hom_present_causerie_promo_DH'
    ),
    makeSet(
      'How many Women, were present during IZM for Human Rights promotion?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.question1.nbre_fem_presente_causerie_promo_DH'
    ),
    makeSet(
      'How many men have been funded by the CMC through the Community Development Fund?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.gestion_fonds_dappui_au_developpement_fad.nbre_hom_finance_FAD'
    ),
    makeSet(
      'Did they initiate IGA?',
      'ampi__Picklist_Response__c',
      'form.SUIVI_MENSUEL.gestion_fonds_dappui_au_developpement_fad.initie_projet_individuel_hom'
    ),
    makeSet(
      'How many individual IGA are initiated by men?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.gestion_fonds_dappui_au_developpement_fad.nbre_projet_individuel_initie_hom'
    ),
    makeSet(
      'What type of IGA did men initiate?',
      'ampi__Text_Response__c',
      'form.SUIVI_MENSUEL.gestion_fonds_dappui_au_developpement_fad.type_AGR_hom'
    ),
    makeSet(
      'How many women have been funded by the CMC through the Community Development Fund?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.gestion_fonds_dappui_au_developpement_fad.nbre_fem_financee_FAD'
    ),
    makeSet(
      'Did they initiate inidividual IGA?',
      'ampi__Picklist_Response__c',
      'form.SUIVI_MENSUEL.gestion_fonds_dappui_au_developpement_fad.fem_initier_proj_ndividuel'
    ),
    makeSet(
      'How many individual IGA are initiated by women?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.gestion_fonds_dappui_au_developpement_fad.nbre_projet_initie_fem'
    ),
    makeSet(
      "Posez la question Quel type d'AGR ont été initiées par les femmes?",
      'ampi__Text_Response__c',
      'form.SUIVI_MENSUEL.gestion_fonds_dappui_au_developpement_fad.posez_la_question_quel_type_dactivits_ont_t_initi_par_les_femmes'
    ),
    makeSet(
      'Did the CMC initiate collective IGA?',
      'ampi__Picklist_Response__c',
      'form.SUIVI_MENSUEL.gestion_fonds_dappui_au_developpement_fad.cgc_a_initi_un_projet_collectif'
    ),
    makeSet(
      'What type of IGA did the CMC initiate?',
      'ampi__Text_Response__c',
      'form.SUIVI_MENSUEL.gestion_fonds_dappui_au_developpement_fad.type_AGR_CMC'
    ),
    makeSet(
      'number of men into PC',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.peace_committee_composition.men_pc'
    ),
    makeSet(
      'Number of women in PC',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.peace_committee_composition.women_pc'
    ),
    makeSet(
      'Number of boys in PC',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.peace_committee_composition.boys_pc'
    ),
    makeSet(
      'Number of girls in PC',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.peace_committee_composition.girls_pc'
    ),
    makeSet(
      '',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.peace_committee_composition.total_mbre_cp'
    ),
    makeSet(
      'Did the Peace Committee set an Action Plan?',
      'ampi__Picklist_Response__c',
      'form.peace_committee_monitoring.peace_committee_action_plan.peace_committee_action_plan'
    ),
    makeSet(
      'Number of activities realized',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.peace_committee_action_plan.number_of_activities_realized'
    ),
    makeSet(
      'Number of activities planned but not realised',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.peace_committee_action_plan.planned_but_not_realised'
    ),
    makeSet(
      'Number of activities led by the PC into Conflict Prevention',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.conflicts_prevention.number_activities_into_conflict_prevention'
    ),
    makeSet(
      'Type of activities led',
      'ampi__Text_Response__c',
      'form.peace_committee_monitoring.conflicts_prevention.type_of_activities_led_Conf_Pr'
    ),
    makeSet(
      'Number of men present',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.conflicts_prevention.number_of_men_present'
    ),
    makeSet(
      'Number of women present',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.conflicts_prevention.number_of_women'
    ),
    makeSet(
      'Number of activities led by the PC into Conflict Management and Resolution',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.conflict_management_and_resolution.number_activities_conflict_management_resolution'
    ),
    makeSet(
      'Type of activities led',
      'ampi__Text_Response__c',
      'form.peace_committee_monitoring.conflict_management_and_resolution.type_of_activities_led_CMP'
    ),
    makeSet(
      'Number of men present',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.conflict_management_and_resolution.number_of_men_present_CMP'
    ),
    makeSet(
      'Number of women present',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.conflict_management_and_resolution.number_of_women_CMP'
    ),
    makeSet(
      'Number of activities led by the PC into Peace Consolidation',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.peace_consolidation.number_activities_peace_conso'
    ),
    makeSet(
      'Type of activities led',
      'ampi__Text_Response__c',
      'form.peace_committee_monitoring.peace_consolidation.type_of_activities_led_Peace_conso'
    ),
    makeSet(
      'Number of men present',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.peace_consolidation.number_of_men_present_peace_conso'
    ),
    makeSet(
      'Number of women present',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.peace_consolidation.number_of_women_peace_conso'
    ),
    makeSet(
      'Number of activities led by the PC into OTHER',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.other_activities.number_activities_other'
    ),
    makeSet(
      'Type of activities led',
      'ampi__Text_Response__c',
      'form.peace_committee_monitoring.other_activities.type_of_activities_led_other'
    ),
    makeSet(
      'Number of men present',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.other_activities.number_of_men_present_other'
    ),
    makeSet(
      'Number of women present',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.other_activities.number_of_women_other'
    ),
    makeSet(
      'Did the Peace Commission led Mediation during this month?',
      'ampi__Picklist_Response__c',
      'form.peace_committee_monitoring.mediation_fra.mediation_during_month'
    ),
    makeSet(
      'Number of mediation realised by the Peace Commission during this month',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.mediation_fra.number_mediation_realised_month'
    ),
    makeSet(
      'For what type of conflict did the mediation were used?',
      'ampi__Text_Response__c',
      'form.peace_committee_monitoring.mediation_fra.mediation_for_type_conflict'
    ),
    makeSet(
      'Number of successful mediation during this month',
      'ampi__Number_Response__c',
      'form.peace_committee_monitoring.mediation_fra.number_of__successful_mediation_during_this_month'
    ),
    makeSet(
      'For what type of conflict did the mediation were used?',
      'ampi__Text_Response__c',
      'form.peace_committee_monitoring.mediation_fra.copy-1-of-mediation_for_type_conflict'
    ),
    makeSet(
      'How many CMC male members have participated in the current module?',
      'ampi__Number_Response__c',
      'form.formation_du_cgc_fra.FORMATION_CGC.Nombre_homme_CGC_participe_au_module_en_cours'
    ),
    makeSet(
      'How many CMC female members have participated in the current module?',
      'ampi__Number_Response__c',
      'form.formation_du_cgc_fra.FORMATION_CGC.Nombre_femmes_CGC_participe__au_module_en_cours'
    ),
    makeSet(
      'How many CMC young female members have participated in the current module?',
      'ampi__Number_Response__c',
      'form.formation_du_cgc_fra.FORMATION_CGC.Nombre_Jeunes_filles_participe_au_module_en__cours'
    ),
    makeSet(
      'How many CMC young male members have participated in the current module?',
      'ampi__Number_Response__c',
      'form.formation_du_cgc_fra.FORMATION_CGC.Nombre_Jeunes_garcons_participe_au_module_en_cours'
    ),
    makeSet(
      '',
      'ampi__Number_Response__c',
      'form.formation_du_cgc_fra.FORMATION_CGC.Total_Membre_CGC_Participe_module'
    ),
    makeSet(
      'Have CMCs organized cross-border meetings with other communities during the last three months?',
      'ampi__Picklist_Response__c',
      'form.rencontres_transfrontalieres_fra.rencontre_transfrontraliere.Organisation_Rencontre_Transfrontaliere_autres_communautes'
    ),
    makeSet(
      'Specify Date of Meeting',
      'ampi__Submission__c.CreatedDate',
      'form.rencontres_transfrontalieres_fra.rencontre_transfrontraliere.Date_Rencontre'
    ),
    makeSet(
      'Specify Place of Meeting',
      'ampi__Text_Response__c',
      'form.rencontres_transfrontalieres_fra.rencontre_transfrontraliere.Lieu_Rencontre'
    ),
    makeSet(
      'How many communities have participated in the meeting?',
      'ampi__Number_Response__c',
      'form.rencontres_transfrontalieres_fra.rencontre_transfrontraliere.Nombre_communautes_participantes'
    ),
    makeSet(
      'List Name of participating communities',
      'ampi__Text_Response__c',
      'form.rencontres_transfrontalieres_fra.rencontre_transfrontraliere.Noms_Communautes_Participantes'
    ),
    makeSet(
      'Which topics have been addressed?',
      'ampi__Text_Response__c',
      'form.rencontres_transfrontalieres_fra.rencontre_transfrontraliere.Themes_Abordes'
    ),
    makeSet(
      'Have CMCs participated in cross-border meetings with other communities during the last three months?',
      'ampi__Picklist_Response__c',
      'form.rencontres_transfrontalieres_fra.rencontre_transfrontraliere.Participation_CGC_rencontre_transfrontaliere'
    ),
    makeSet(
      'Specify Date of Meeting',
      'ampi__Submission__c.CreatedDate',
      'form.rencontres_transfrontalieres_fra.rencontre_transfrontraliere.Date_Rencontre_autres_communautes'
    ),
    makeSet(
      'Specify Place of Meeting',
      'ampi__Text_Response__c',
      'form.rencontres_transfrontalieres_fra.rencontre_transfrontraliere.Lieu_rencontre'
    ),
    makeSet(
      'How many communities have participated in the meeting?',
      'ampi__Number_Response__c',
      'form.rencontres_transfrontalieres_fra.rencontre_transfrontraliere.Nombre_communautes_participantes_rencontre'
    ),
    makeSet(
      'List Name of participating communities',
      'ampi__Text_Response__c',
      'form.rencontres_transfrontalieres_fra.rencontre_transfrontraliere.Noms_Communautes_participantes'
    ),
    makeSet(
      'Which topics have been addressed?',
      'ampi__Text_Response__c',
      'form.rencontres_transfrontalieres_fra.rencontre_transfrontraliere.Themes_abordes'
    ),
  ];

  state.questionArray = state.fieldSets.map(x => {
    x['RecordType.Name'] = 'Answer';
    x['ampi__Submission__r.Submission_ID__c'] = state.data.id;
    return x;
  });

  return state;
});
// =============================================================================

// UPSERT CHILD QUESTIONS ======================================================
bulk(
  'ampi__Question__c',
  'upsert',
  { extIdField: 'Question_ID__c', failOnError: true, allowNoOp: true },
  state => {
    return state.questionArray;
  }
);
// =============================================================================
