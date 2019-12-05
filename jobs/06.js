// UPSERT PARENT SUBMISSION ====================================================
upsert(
  'ampi__Submission__c',
  'Submission_ID__c',
  fields(
    field('ampi__Description__c', dataValue('form.@name')),
    /* No geolocation in this survey?
    field(
      'Location__latitude__s',
      state => state.data.form.GPS.split(' ')[0]
    ),
    field('Location__longitude__s', state => state.data.form.GPS.split(' ')[1]), */
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
      'type of evaluation',
      'ampi__Picklist_Response__c',
      'form.type_evaluation'
    ),
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
    makeSet('Project', 'ampi__Picklist_Response__c', 'form.projet'),
    makeSet(
      'We have been told that you have been committed by the community to prevent, manage and resolve conflicts; Do you confirm that?',
      'ampi__Picklist_Response__c',
      'form.identification_comite_de_paix.identification_com_paix.composition'
    ),
    makeSet(
      'How was the committee chosen?',
      'ampi__Picklist_Response__c',
      'form.identification_comite_de_paix.identification_com_paix.question4'
    ),
    makeSet(
      'Specify other designation mode',
      'ampi__Text_Response__c',
      'form.identification_comite_de_paix.identification_com_paix.preciser_autres'
    ),
    makeSet(
      'In the Peace Committee are there:',
      'ampi__Text_Response__c',
      'form.identification_comite_de_paix.identification_com_paix.composition_CP'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.identification_comite_de_paix.identification_com_paix.preciser_autre_profil'
    ),
    makeSet(
      'Ask How many men are there in the Peace Committee?',
      'ampi__Number_Response__c',
      'form.identification_comite_de_paix.identification_com_paix.nombre_de_mbres_du_Comite_paix.nbre_homme'
    ),
    makeSet(
      'How many women are there in the Peace Committee?',
      'ampi__Number_Response__c',
      'form.identification_comite_de_paix.identification_com_paix.nombre_de_mbres_du_Comite_paix.nbre_de_femmes'
    ),
    makeSet(
      'Ask How many young women are there on the Peace Committee?',
      'ampi__Number_Response__c',
      'form.identification_comite_de_paix.identification_com_paix.nombre_de_mbres_du_Comite_paix.nbre_de_jeune_femmes'
    ),
    makeSet(
      'How many young men are there on the peace committee?',
      'ampi__Number_Response__c',
      'form.identification_comite_de_paix.identification_com_paix.nombre_de_mbres_du_Comite_paix.nbre_de_jeunes_hommes'
    ),
    makeSet(
      '',
      'ampi__Number_Response__c',
      'form.identification_comite_de_paix.identification_com_paix.nombre_de_mbres_du_Comite_paix.nombre_de_membre_du_comite_de_paix'
    ),
    makeSet(
      'Does the Peace Committee have an action plan?',
      'ampi__Picklist_Response__c',
      'form.activite_CP.plan_action_CP.plan_action'
    ),
    makeSet(
      'Does the action plan include activities related to the themes listed below?',
      'ampi__Text_Response__c',
      'form.activite_CP.plan_action_CP.thematique_plan_action'
    ),
    makeSet(
      'Specify other themes',
      'ampi__Text_Response__c',
      'form.activite_CP.plan_action_CP.preciser_autres_thematiq'
    ),
    makeSet(
      'Does anyone tell you about conflicts whenever there are any in the community?',
      'ampi__Picklist_Response__c',
      'form.activite_CP.activite_cp_resolution.informe_existence_conflit'
    ),
    makeSet(
      'Who informs you about conflict situations that occur within the community?',
      'ampi__Text_Response__c',
      'form.activite_CP.activite_cp_resolution.qui_vous_informe'
    ),
    makeSet(
      'Specify other type of informant',
      'ampi__Text_Response__c',
      'form.activite_CP.activite_cp_resolution.precisez_autre'
    ),
    makeSet(
      'What do you do when you are informed?',
      'ampi__Picklist_Response__c',
      'form.activite_CP.activite_cp_resolution.que_faites_vous'
    ),
    makeSet(
      'When you decide to intervene how do you do it most often?',
      'ampi__Picklist_Response__c',
      'form.activite_CP.activite_cp_resolution.comment_procedez_vous'
    ),
    makeSet(
      'Have you conducted mediations in the community?',
      'ampi__Picklist_Response__c',
      'form.activite_CP.activites_CP_mediation.menee_mediations'
    ),
    makeSet(
      'Among the mediations you have conducted are there any that you have achieved?',
      'ampi__Picklist_Response__c',
      'form.activite_CP.activites_CP_mediation.reussi_mediation'
    ),
    makeSet(
      'How many mediations regarding marital conflictshave been conducted?',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.mediation_menee_conflit_conjugal'
    ),
    makeSet(
      'How many mediations about marital conflict did you get?',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.mediation_reussie_conflit_conjugaux'
    ),
    makeSet(
      'How many mediations about intercommunal conflict led you?',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.mediation_menee_conflit_intercomm'
    ),
    makeSet(
      'How many mediations concerning intercommunity conflicts have you managed?',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.mediation_reussie_conflit_intercomm'
    ),
    makeSet(
      'How many mediations regarding farmer-farmer disputes have you led?',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.mediation_menee_conflit_agriculteur_eleveur'
    ),
    makeSet(
      'How many mediations concerning conflicts between farmers and herders have you managed?',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.mediation_reussi_conflit_agriculteur_eleveur'
    ),
    makeSet(
      'How many mediations concerning ethnic conflicts have you led?',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.mediation_menee_conflit_ethnique'
    ),
    makeSet(
      'How many mediations concerning ethnic conflicts have you achieved?',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.mediation_reussi_conflit_ethnique'
    ),
    makeSet(
      'Ask How many family conflict mediations did you have?',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.mediation_menee_conflit_familial'
    ),
    makeSet(
      'Ask How many mediations about family conflict have you had?',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.mediation_reussi_conflit_familial'
    ),
    makeSet(
      'How many mediations concerning religious conflicts have you led?',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.mediation_menee_conflit_religieux'
    ),
    makeSet(
      'How many mediations concerning religious conflicts have been successful?',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.mediation_reussi_conflit_religieux'
    ),
    makeSet(
      '',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.Total_mediations_menees'
    ),
    makeSet(
      '',
      'ampi__Number_Response__c',
      'form.activite_CP.activites_CP_mediation.Total_mediations_reussies'
    ),
    makeSet(
      'Can you quote me the mediation that you most marked?',
      'ampi__Text_Response__c',
      'form.activite_CP.activites_CP_mediation.exemple_mediation_marquante'
    ),
    makeSet(
      'Have you been trained in conflict management and resolution tools and methods?',
      'ampi__Picklist_Response__c',
      'form.activite_CP.activite_CP_formation.forme_sur_gestion_resolution_conflit'
    ),
    makeSet(
      'What topics were discussed?',
      'ampi__Text_Response__c',
      'form.activite_CP.activite_CP_formation.thematiques_abordees'
    ),
    makeSet(
      'Specify other topics addressed',
      'ampi__Text_Response__c',
      'form.activite_CP.activite_CP_formation.preciser_autre_thematique'
    ),
    makeSet(
      'How many members of the Peace Committee have been trained?',
      'ampi__Number_Response__c',
      'form.activite_CP.activite_CP_formation.combien_membre_CP_forme'
    ),
    makeSet(
      'Are you part of a network of Peace Committees?',
      'ampi__Picklist_Response__c',
      'form.reseau_comite_paix.reseau_CP.fait_partie_reseau_CP'
    ),
    makeSet(
      'How many actions have you taken with the Peace Committee Network for Conflict Prevention?',
      'ampi__Number_Response__c',
      'form.reseau_comite_paix.reseau_CP.nombre_actions_menee_avec_reseau_CP'
    ),
    makeSet(
      'Are you part of a subregional network of Peace Committees?',
      'ampi__Picklist_Response__c',
      'form.reseau_comite_paix.reseau_CP.reseau_sous_regional'
    ),
    makeSet(
      'How many actions have you carried out with the sub regional Peace Committee network for conflict prevention and management?',
      'ampi__Number_Response__c',
      'form.reseau_comite_paix.reseau_CP.nombre_action_avec_reseau_ss_regional'
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

alterState(state => {
  console.log(state.references)
  return state;
})

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
