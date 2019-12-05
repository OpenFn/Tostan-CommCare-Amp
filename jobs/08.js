// UPSERT PARENT SUBMISSION ====================================================
upsert(
  'ampi__Submission__c',
  'Submission_ID__c',
  fields(
    field('ampi__Description__c', dataValue('form.@name')),
    field(
      'Location__latitude__s',
      state => state.data.form.Coordonnees_GPS.split(' ')[0]
    ),
    field('Location__longitude__s', state => state.data.form.Coordonnees_GPS.split(' ')[1]),
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
      'form.Mois_Collecte'
    ),
    makeSet(
      'Have the Peace Committee developed an action plan for conflict prevention?',
      'ampi__Picklist_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Plan_action_prevention_conflit'
    ),
    makeSet(
      'How many activities deriving from the action plan have been implemented during this month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Nombre_activites_realisees'
    ),
    makeSet(
      'How many activities have been planned but not implemented?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Nombre_activites_non_realisees'
    ),
    makeSet(
      'What is the current module?',
      'ampi__Picklist_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.FORMATION_CP.Module_en_cours'
    ),
    makeSet(
      'Are the Peace Committee Members participating in the module of this month?',
      'ampi__Picklist_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.FORMATION_CP.Participation_module'
    ),
    makeSet(
      'How many peace committee male members have participated in at least one session of the current module?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.FORMATION_CP.Nombre_hommes'
    ),
    makeSet(
      'How many peace committee female members have participated in at least one session of the current module?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.FORMATION_CP.Nombre_femmes'
    ),
    makeSet(
      'How many peace committee young male members have participated in at least one session of the current module?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.FORMATION_CP.Nombre_Adolescents'
    ),
    makeSet(
      'How many peace committee young female members have participated in at least one session of the current module?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.FORMATION_CP.Nombre_Adolescentes'
    ),
    makeSet(
      '',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.FORMATION_CP.Total_Participants_CP'
    ),
    makeSet(
      'How many activities have been conducted by the PC for conflict prevention?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.Nombre_Activites_Prevention_conflits'
    ),
    makeSet(
      'What types of activities have been conducted by the PC for conflict prevention?',
      'ampi__Text_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.Type_activite_Prevention_conflits'
    ),
    makeSet(
      'How many men were reached by conflict prevention activities organised by the Peace Committee?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.nbre_homm_touches'
    ),
    makeSet(
      'How many women were reached by conflict prevention activities organised by the Peace Committee?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.nbre_de_femmes_touchees'
    ),
    makeSet(
      'How many activities have been conducted by the PC for conflict management and resolution?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.Nombre_Activites_Gestion__Resolution_conflits'
    ),
    makeSet(
      'How many types of activities have been conducted by the PC for conflict management and resolution?',
      'ampi__Text_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.Type_activites_Gestion_Resolution_Conflits'
    ),
    makeSet(
      'How many activities have been conducted by the PC for peace building?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.Nombre_Activites_Consolidation_Paix'
    ),
    makeSet(
      'How many types of activities have been conducted by the PC for peace building?',
      'ampi__Text_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.Types_Activites_Consolidation_Paix'
    ),
    makeSet(
      'How many other activities have been conducted by the peace committee?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.Nombre_Autres_Activites_CP'
    ),
    makeSet(
      'What are the other types of activities conducted by the PC?',
      'ampi__Text_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.Types_autres_activites'
    ),
    makeSet(
      'How many mediations have been carried out by the PC during this month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.Nombre_Mediations_realisees'
    ),
    makeSet(
      'Which type of conflicts have been addressed by these mediations?',
      'ampi__Text_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.Types_conflits_mediations_realisees'
    ),
    makeSet(
      'How many mediations have been successfully carried out by the PC during this month?',
      'ampi__Number_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.Nombre_Mediations_Reussies_CP'
    ),
    makeSet(
      'Which type of conflicts have been addressed by these mediations?',
      'ampi__Text_Response__c',
      'form.SUIVI_MENSUEL.GOUVERNANCE.Activites_Realisees_CP.Types_conflits_mediations_reussies'
    ),
    makeSet(
      'Specify Quarter of data collection',
      'ampi__Picklist_Response__c',
      'form.SUIVI_TRIMESTRIEL.Trimestre'
    ),
    makeSet(
      'How many men does the PC comprise?',
      'ampi__Number_Response__c',
      'form.SUIVI_TRIMESTRIEL.Composition_Comite_Paix.Hommes'
    ),
    makeSet(
      'How many women does the PC comprise?',
      'ampi__Number_Response__c',
      'form.SUIVI_TRIMESTRIEL.Composition_Comite_Paix.Femmes'
    ),
    makeSet(
      'How many young men does the PC comprise?',
      'ampi__Number_Response__c',
      'form.SUIVI_TRIMESTRIEL.Composition_Comite_Paix.Adolescent'
    ),
    makeSet(
      'How many young women does the PC comprise?',
      'ampi__Number_Response__c',
      'form.SUIVI_TRIMESTRIEL.Composition_Comite_Paix.Adolescente'
    ),
    makeSet(
      '',
      'ampi__Number_Response__c',
      'form.SUIVI_TRIMESTRIEL.Composition_Comite_Paix.Total_Membres_Comite_Paix'
    ),
    makeSet(
      'How many conflict prevention outreach meetings have been organized by the PC with the participation of local authorities?',
      'ampi__Number_Response__c',
      'form.SUIVI_TRIMESTRIEL.Activites_CP.Nombre_rencontre_CP_autorites_locales'
    ),
    makeSet(
      'How many local authorities have attended the meetings?',
      'ampi__Number_Response__c',
      'form.SUIVI_TRIMESTRIEL.Activites_CP.Nombre_autorites_locales'
    ),
    makeSet(
      'What is the position of these local authorities?',
      'ampi__Text_Response__c',
      'form.SUIVI_TRIMESTRIEL.Activites_CP.Postes_occupes__autorites_locales'
    ),
    makeSet(
      'Specify Semester of data collection',
      'ampi__Picklist_Response__c',
      'form.SUIVI_SEMESTRIEL.Semestre'
    ),
    makeSet(
      'Is the Peace Committee affiliated to a national peace committee network?',
      'ampi__Picklist_Response__c',
      'form.SUIVI_SEMESTRIEL.RESEAU_CP.Appartenance_Reseau_national'
    ),
    makeSet(
      'How many peace committees are affiliated to the national network?',
      'ampi__Number_Response__c',
      'form.SUIVI_SEMESTRIEL.RESEAU_CP.Nombre_CP'
    ),
    makeSet(
      'What is the name and region of origin of the communities affiliated to the national peace committee network?',
      'ampi__Text_Response__c',
      'form.SUIVI_SEMESTRIEL.RESEAU_CP.Noms_Communautes'
    ),
    makeSet(
      'Is the Peace Committee affiliated to a sub-regional peace committee network?',
      'ampi__Picklist_Response__c',
      'form.SUIVI_SEMESTRIEL.RESEAU_CP.Reseau_sous_regional'
    ),
    makeSet(
      'How many peace committees are affiliated to the sub-regional network?',
      'ampi__Number_Response__c',
      'form.SUIVI_SEMESTRIEL.RESEAU_CP.Nombre_CP_sous_regional'
    ),
    makeSet(
      'What is the name and country of origin of the communities affiliated to the sub-regional network?',
      'ampi__Text_Response__c',
      'form.SUIVI_SEMESTRIEL.RESEAU_CP.Noms_communautes_sous_regional'
    ),
    makeSet(
      'How many cross-border meetings addressing peace and security issues have been organized by the Peace Committee?',
      'ampi__Number_Response__c',
      'form.SUIVI_SEMESTRIEL.RESEAU_CP.Nombre_Rencontres_Transf'
    ),
    makeSet(
      'What is the name and country of origin of the communities that participated in these meetings?',
      'ampi__Text_Response__c',
      'form.SUIVI_SEMESTRIEL.RESEAU_CP.Noms_communautes_participantes'
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
