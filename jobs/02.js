// UPSERT PARENT SUBMISSION ====================================================
upsert(
  'ampi__Submission__c',
  'Submission_ID__c',
  fields(
    field('ampi__Description__c', dataValue('form.@name')),
    field(
      'Location__latitude__s',
      state => state.data.form.coordonnes_gps.split(' ')[0]
    ),
    field(
      'Location__longitude__s',
      state => state.data.form.coordonnes_gps.split(' ')[1]
    ),
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
      Question_ID__c: `${pId}-${c}`,
      ampi__Description__c: a,
    };

    switch (b) {
      case 'ampi__Picklist_Response__c':
        fieldSet.ampi__Response_Type__c = 'Picklist';
        break;

      case 'ampi__Number_Response__c':
        fieldSet.ampi__Response_Type__c = 'Number';
        break;

      case 'ampi__Text_Response__c':
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
      "Evaluation Type",
      'ampi__Picklist_Response__c',
      "form.type_evaluation"
    ),
    makeSet('Project', 'ampi__Picklist_Response__c', 'form.projet'),
    makeSet(
      'Respondent status',
      'ampi__Picklist_Response__c',
      'form.statut_repondant'
    ),
    makeSet(
      'Observe Gender of the Respondent',
      'ampi__Picklist_Response__c',
      'form.demographie.caracteristiques_enquete.sexe'
    ),
    makeSet(
      'What is your ethnic group?',
      'ampi__Picklist_Response__c',
      'form.demographie.caracteristiques_enquete.ethnie'
    ),
    makeSet(
      'Do you know your age?',
      'ampi__Picklist_Response__c',
      'form.demographie.age_enquete.connait_age'
    ),
    makeSet(
      'How old are you?',
      'ampi__Number_Response__c',
      'form.demographie.age_enquete.age_exact'
    ),
    makeSet(
      'What is your age group?',
      'ampi__Picklist_Response__c',
      'form.demographie.age_enquete.tranche_age'
    ),
    makeSet(
      'What is your marital status?',
      'ampi__Picklist_Response__c',
      'form.demographie.etat_matrimonial'
    ),
    makeSet(
      'Have you been to school?',
      'ampi__Picklist_Response__c',
      'form.demographie.education.frequente_ecole'
    ),
    makeSet(
      'What is your highest level of education?',
      'ampi__Picklist_Response__c',
      'form.demographie.education.niveau'
    ),
    makeSet(
      'Ask the‏‏‎ question Have you ever participated in Tostan CEP?',
      'ampi__Picklist_Response__c',
      'form.demographie.identification.participant_prcc'
    ),
    makeSet(
      'Ask the‏‏‎ question Have you been adopted during the program?',
      'ampi__Picklist_Response__c',
      'form.demographie.identification.adopte'
    ),
    makeSet(
      'Do not read out the requirements Do you know international legal instruments on human rights?',
      'ampi__Picklist_Response__c',
      'form.democratie.critere_democratie.Cnce_instruments_J-I'
    ),
    makeSet(
      'List the legal instruments on human rights you know? Do not read out the requirements (Tick off the instruments listed by the Respondent)',
      'ampi__Text_Response__c',
      'form.democratie.critere_democratie.instruments_cites'
    ),
    makeSet(
      "Nombre d'instruments cites",
      'ampi__Number_Response__c',
      'form.democratie.critere_democratie.Nombre_instruments_cites'
    ),
    makeSet(
      'Do you think that advocacy for some legal instruments on human rights can help establish peace and security?',
      'ampi__Picklist_Response__c',
      'form.democratie.action_promotion_Instruments.promotion_instruments'
    ),
    makeSet(
      'Which are those instruments? Do not read out the requirements',
      'ampi__Text_Response__c',
      'form.democratie.action_promotion_Instruments.posez_la_question_de_quels_instruments_juridiques_internationaux_des_droits'
    ),
    makeSet(
      'Do you know the human rights?',
      'ampi__Picklist_Response__c',
      'form.droits_humains.connaissance_droits.connait_droits_humains'
    ),
    makeSet(
      'List the rights you know (Tick off the rights listed by the Respondent)',
      'ampi__Text_Response__c',
      'form.droits_humains.connaissance_droits.liste_des_droist_humains'
    ),
    makeSet(
      'total droit cite',
      'ampi__Number_Response__c',
      'form.droits_humains.connaissance_droits.total_droit_cite'
    ),
    makeSet(
      'In the last 12 months, has your community taken action with other communities to promote human rights?',
      'ampi__Picklist_Response__c',
      'form.droits_humains.connaissance_droits.action_communautaire_promotion.actions_communautaire_droits_humains'
    ),
    makeSet(
      'Which are those actions? (Human Rights)',
      'ampi__Text_Response__c',
      'form.droits_humains.connaissance_droits.action_communautaire_promotion.action_com_DrH'
    ),
    makeSet(
      'In the last 12 months, has your community taken action with other communities to promote peace?',
      'ampi__Picklist_Response__c',
      'form.droits_humains.connaissance_droits.action_communautaire_promotion.action_communautaire_promotion_paix'
    ),
    makeSet(
      'Which are those actions?',
      'ampi__Text_Response__c',
      'form.droits_humains.connaissance_droits.action_communautaire_promotion.action_paix'
    ),
    makeSet(
      'In the last 12 months, has your community taken action with other communities to encourage the participation of all the community members in decision-making?',
      'ampi__Picklist_Response__c',
      'form.droits_humains.connaissance_droits.action_communautaire_promotion.action_commun_encourager_participation'
    ),
    makeSet(
      'Which are those actions?',
      'ampi__Text_Response__c',
      'form.droits_humains.connaissance_droits.action_communautaire_promotion.action_encourager_participation'
    ),
    makeSet(
      'In the last 12 months, has your community taken action with other communities to promote women rights?',
      'ampi__Picklist_Response__c',
      'form.droits_humains.connaissance_droits.action_communautaire_promotion.action_comm_prom_droit_fem'
    ),
    makeSet(
      'Which are those activities?',
      'ampi__Text_Response__c',
      'form.droits_humains.connaissance_droits.action_communautaire_promotion.which_activities'
    ),
    makeSet(
      'In the last 12 months, has your community taken action with other communities to raise awareness among authorities on the respect for human rights?',
      'ampi__Picklist_Response__c',
      'form.droits_humains.connaissance_droits.action_communautaire_promotion.action_commun_sensibiliser_autorite_DrH'
    ),
    makeSet(
      'Which are those actions?',
      'ampi__Text_Response__c',
      'form.droits_humains.connaissance_droits.action_communautaire_promotion.action_commun_sensibiliser_autorite'
    ),
    makeSet(
      'Do you think that advocacy for some human rights can help establish peace and security?',
      'ampi__Picklist_Response__c',
      'form.droits_humains.action_indiv_promotion.promotion_certains_DH'
    ),
    makeSet(
      'Which are those rights? (Tick off the rights listed by the Respondent)',
      'ampi__Text_Response__c',
      'form.droits_humains.action_indiv_promotion.de_quels_droit_sagit-il'
    ),
    makeSet(
      'In the last 12 months, have you raised awareness in your community to advocate for human rights?',
      'ampi__Picklist_Response__c',
      'form.droits_humains.action_indiv_promotion.action_promotion_droits_huamins'
    ),
    makeSet(
      'Which are those actions?',
      'ampi__Text_Response__c',
      'form.droits_humains.action_indiv_promotion.action_droits_humains'
    ),
    makeSet(
      'In the last 12 months, have you raised awareness in your community to encourage the participation of all the community members in decision-making?',
      'ampi__Picklist_Response__c',
      'form.droits_humains.action_indiv_promotion.encoyrager_participation_prise_de_decision'
    ),
    makeSet(
      'Which are those actions?',
      'ampi__Text_Response__c',
      'form.droits_humains.action_indiv_promotion.action_encourager_participation_prise_de_decision'
    ),
    makeSet(
      'In your opinion, what does peace mean? (Do not read out the requirements)',
      'ampi__Text_Response__c',
      'form.paix_et_trafic.paix.Conce_paix'
    ),
    makeSet(
      'Please specify other',
      'ampi__Text_Response__c',
      'form.paix_et_trafic.paix.prciser_autre'
    ),
    makeSet(
      'In your opinion, when can we consider that culture of peace prevails in a community? (Do not read out the requirements)',
      'ampi__Text_Response__c',
      'form.paix_et_trafic.paix.existence_culture_paix'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.paix_et_trafic.paix.action_securite_humaine'
    ),
    makeSet(
      'In your opinion, what can threaten peace?',
      'ampi__Text_Response__c',
      'form.paix_et_trafic.paix.menace_paix'
    ),
    makeSet(
      'Do you know any form of goods and people trafficking?',
      'ampi__Picklist_Response__c',
      'form.paix_et_trafic.le_trafic_des_biens_et_des_personnes.cnce_types_trafic_biens_personnes'
    ),
    makeSet(
      'What are the forms of goods and people trafficking you know?',
      'ampi__Text_Response__c',
      'form.paix_et_trafic.le_trafic_des_biens_et_des_personnes.types_de_trafic_biens_et_personnes'
    ),
    makeSet(
      'How can trafficking economics pose a threat to peace?',
      'ampi__Text_Response__c',
      'form.paix_et_trafic.le_trafic_des_biens_et_des_personnes.economie_traite_menace_paix'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.paix_et_trafic.le_trafic_des_biens_et_des_personnes.prcisez_autre'
    ),
    makeSet(
      'Have you ever heard about Human Security?',
      'ampi__Picklist_Response__c',
      'form.securite_humaine.connaissance_element_secu_humaine.connait_securite_humaine'
    ),
    makeSet(
      'Do you Human security elements',
      'ampi__Picklist_Response__c',
      'form.securite_humaine.connaissance_element_secu_humaine.conce_elemt_sec_huma'
    ),
    makeSet(
      "What are the components of human security? Don't read the modalities",
      'ampi__Text_Response__c',
      'form.securite_humaine.connaissance_element_secu_humaine.elements_securite_humaine'
    ),
    makeSet(
      "nombre d'elements cite",
      'ampi__Number_Response__c',
      'form.securite_humaine.connaissance_element_secu_humaine.nombre_element_cite'
    ),
    makeSet(
      'In the last 12 months, have you undertaken actions to Ensure access to quality food (healthy, varied and available) for you, your family and friends at all times?',
      'ampi__Picklist_Response__c',
      'form.securite_humaine.action_promotion_securite_humaine.action_secu_alimentaire'
    ),
    makeSet(
      'Which are those actions?',
      'ampi__Text_Response__c',
      'form.securite_humaine.action_promotion_securite_humaine.liste_action_secu_alimentaire'
    ),
    makeSet(
      'In the last 12 months, have you undertaken actions to improve your own or your family and friends’ environment (sanitation of public places, plots, reforestation, building of improved homes)?',
      'ampi__Picklist_Response__c',
      'form.securite_humaine.action_promotion_securite_humaine.action_secu_environnementale'
    ),
    makeSet(
      'Which are those actions?',
      'ampi__Text_Response__c',
      'form.securite_humaine.action_promotion_securite_humaine.liste_action_secu_env'
    ),
    makeSet(
      'In the last 12 months, have you undertaken actions to Ensure access to medical care and better health conditions for you, your family and friends?',
      'ampi__Picklist_Response__c',
      'form.securite_humaine.action_promotion_securite_humaine.action_secu_sanitaire'
    ),
    makeSet(
      'Which are those actions?',
      'ampi__Text_Response__c',
      'form.securite_humaine.action_promotion_securite_humaine.liste_action_secu_sanitaire'
    ),
    makeSet(
      'In the last 12 months, have you undertaken actions to prevent discrimination against you or against people you know for gender, ethnic, religious, political or community affiliation?',
      'ampi__Picklist_Response__c',
      'form.securite_humaine.action_promotion_securite_humaine.action_secu_personnelle'
    ),
    makeSet(
      'Which are those actions?',
      'ampi__Text_Response__c',
      'form.securite_humaine.action_promotion_securite_humaine.liste_action_secu_perso'
    ),
    makeSet(
      'In the last 12 months, have you undertaken actions to Ensure protection for you, your family and friends against physical and psychological violence?',
      'ampi__Picklist_Response__c',
      'form.securite_humaine.action_promotion_securite_humaine.action_secu_communautaire'
    ),
    makeSet(
      'Which are those actions?',
      'ampi__Text_Response__c',
      'form.securite_humaine.action_promotion_securite_humaine.liste_action_secu_comm'
    ),
    makeSet(
      'In the last 12 months, have you undertaken actions to Ensure access to resources (lands, micro-credit, IGAs) and employment for your family members?',
      'ampi__Picklist_Response__c',
      'form.securite_humaine.action_promotion_securite_humaine.action_secu_economique'
    ),
    makeSet(
      'Which are those actions?',
      'ampi__Text_Response__c',
      'form.securite_humaine.action_promotion_securite_humaine.liste_action_secu_economique'
    ),
    makeSet(
      'Do you know any conflict analysis tool?',
      'ampi__Picklist_Response__c',
      'form.prevention_et_gestion_de_conflit.connaissance_outil_analyse_conflit.connait_outil'
    ),
    makeSet(
      'Which conflict analysis tool do you know?',
      'ampi__Picklist_Response__c',
      'form.prevention_et_gestion_de_conflit.connaissance_outil_analyse_conflit.outil_connu'
    ),
    makeSet(
      'If we conducted a conflict analysis using a conflict tree, what would the trunk, the leaves and the roots represent?',
      'ampi__Text_Response__c',
      'form.prevention_et_gestion_de_conflit.connaissance_outil_analyse_conflit.caricature_arbre_conflit'
    ),
    makeSet(
      'Do you know any strategy to prevent conflict intensification?',
      'ampi__Picklist_Response__c',
      'form.prevention_et_gestion_de_conflit.strategie_eviter_intensification.startegie_evitement_intensification'
    ),
    makeSet(
      'Which strategies do you know?',
      'ampi__Text_Response__c',
      'form.prevention_et_gestion_de_conflit.strategie_eviter_intensification.quelle_strategie'
    ),
    makeSet(
      'Which type of conflicts exist in your community?',
      'ampi__Text_Response__c',
      'form.prevention_et_gestion_de_conflit.type_de_conflit_existe'
    ),
    makeSet(
      'Specify other types of conflicts',
      'ampi__Text_Response__c',
      'form.prevention_et_gestion_de_conflit.preciser_autre'
    ),
    makeSet(
      'Have you witnessed any instance of violence in the last 12 months in your community?',
      'ampi__Picklist_Response__c',
      'form.prevention_et_gestion_de_conflit.temoin_episode_violence'
    ),
    makeSet(
      'Who are the victims of the violence you witnessed',
      'ampi__Text_Response__c',
      'form.prevention_et_gestion_de_conflit.victims_of_violence'
    ),
    makeSet(
      'What were the reasons for the violence you witnessed?',
      'ampi__Text_Response__c',
      'form.prevention_et_gestion_de_conflit.reason_of_violence'
    ),
    makeSet(
      'Do you think that you are trained enough to solve the types of conflicts prevailing in your community?',
      'ampi__Picklist_Response__c',
      'form.prevention_et_gestion_de_conflit.formation'
    ),
    makeSet(
      'Which training do you think you may need to build your capacity in solving these types of conflicts?',
      'ampi__Text_Response__c',
      'form.prevention_et_gestion_de_conflit.formation_souhaitee'
    ),
    makeSet(
      'Do you know what mediation is?',
      'ampi__Picklist_Response__c',
      'form.resolution_conflits.mediation.connait_mediation'
    ),
    makeSet(
      'Can you define mediation?',
      'ampi__Picklist_Response__c',
      'form.resolution_conflits.mediation.connaissance_mediation'
    ),
    makeSet(
      'For which form of conflict have you used this approach?',
      'ampi__Text_Response__c',
      'form.resolution_conflits.mediation.type_de_conflit'
    ),
    makeSet(
      'Specify Other form of conflict?',
      'ampi__Text_Response__c',
      'form.resolution_conflits.mediation.preciser_conflit'
    ),
    makeSet(
      'Do you think that you need new competences to solve conflicts?',
      'ampi__Picklist_Response__c',
      'form.resolution_conflits.mediation.besoin_nouvelles_connaissances'
    ),
    makeSet(
      'In your community, who are participating the most in conflict resolution?',
      'ampi__Picklist_Response__c',
      'form.femme_paix_et_securite.femmes_paix_et_securite.qui_participe_resolution_conflits'
    ),
    makeSet(
      'If women do participate, who among them are mostly engaged?',
      'ampi__Picklist_Response__c',
      'form.femme_paix_et_securite.femmes_paix_et_securite.femmes_plus_impliquees'
    ),
    makeSet(
      'Specify other women',
      'ampi__Text_Response__c',
      'form.femme_paix_et_securite.femmes_paix_et_securite.preciser_autre_femme'
    ),
    makeSet(
      'Do you think that women should be engaged in conflict resolution process?',
      'ampi__Picklist_Response__c',
      'form.femme_paix_et_securite.femmes_paix_et_securite.femme_impliquee'
    ),
    makeSet(
      'If yes, why?',
      'ampi__Text_Response__c',
      'form.femme_paix_et_securite.femmes_paix_et_securite.si_oui_pourquoi'
    ),
    makeSet(
      'If no, why?',
      'ampi__Text_Response__c',
      'form.femme_paix_et_securite.femmes_paix_et_securite.si_non_pourquoi'
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
