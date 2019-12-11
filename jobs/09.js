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
      'langue_interview',
      'ampi__Picklist_Response__c',
      'form.identification.langue_group.langue_interview'
    ),
    makeSet(
      'What are the rights of the child you know?',
      'ampi__Picklist_Response__c',
      'form.dossier_droits_enfant.droits_enfant_connus'
    ),
    makeSet(
      'What is the critical period for brain development?',
      'ampi__Picklist_Response__c',
      'form.dev_cerveau.periode_critique_dev_cerveau_group.periode_critique_dev_cerveau'
    ),
    makeSet(
      'At what period of pregnancy does the baby start learning?',
      'ampi__Picklist_Response__c',
      'form.dev_cerveau.bebe_apprentissage'
    ),
    makeSet(
      'Why is it important to talk to babies and young children in your opinion?',
      'ampi__Picklist_Response__c',
      'form.importance_parler_aux_enfants.pourquoi_parler_aux_enfants_group.pourquoi_parler_aux_enfants'
    ),
    makeSet(
      'Can you give me the different ways you can communicate with your children?',
      'ampi__Picklist_Response__c',
      'form.comment_parler_aux_enfants.communication_types_group.communication_types'
    ),
    makeSet(
      'What can be done to become more involved in the development of his child?',
      'ampi__Picklist_Response__c',
      'form.role_pere.dev_enfant_group.dev_enfant'
    ),
    makeSet(
      'Why is it important to follow the schooling of your child in school according to you?',
      'ampi__Picklist_Response__c',
      'form.suivi_scolaire.importance_suivi_scolaire_group.importance_suivi_scolaire'
    ),
    makeSet(
      'How to follow your child at home?',
      'ampi__Picklist_Response__c',
      'form.suivi_scolaire.suivi_domicile_group.suivi_domicile'
    ),
    makeSet(
      'What are the scientific explanations of what are nicknamed djinns babies?',
      'ampi__Picklist_Response__c',
      'form.suivi_scolaire.bebe_djinns_group.bebe_djinns'
    ),
    makeSet(
      'Can you name the different forms of intelligence?',
      'ampi__Picklist_Response__c',
      'form.formes_d_intelligence.types_d_intelligence_group.types_d_intelligence'
    ),
    makeSet(
      'What is emotional intelligence?',
      'ampi__Picklist_Response__c',
      'form.formes_d_intelligence.intelligence_emotionnelle_group.intelligence_emotionnelle'
    ),
    makeSet(
      'Speak with the child during pregnancy (5-6 months of pregnancy)',
      'ampi__Picklist_Response__c',
      'form.pratiques_familiales.participant_attitude_group.parler_enfant_durant_grossesse'
    ),
    makeSet(
      '2 months after birth as if he were an adult',
      'ampi__Picklist_Response__c',
      'form.pratiques_familiales.participant_attitude_group.parler_enfant_2mois_apres_naissance'
    ),
    makeSet(
      'Speak with the child 1 year after birth as if he were an adult',
      'ampi__Picklist_Response__c',
      'form.pratiques_familiales.participant_attitude_group.parler_enfant_1an_apres'
    ),
    makeSet(
      'Watch the child in the eyes for a long time',
      'ampi__Picklist_Response__c',
      'form.pratiques_familiales.participant_attitude_group.regarder_enfant_dans_les_yeux'
    ),
    makeSet(
      'Accompany your child in the game',
      'ampi__Picklist_Response__c',
      'form.pratiques_familiales.participant_attitude_group.accompagner_enfant_jeu'
    ),
    makeSet(
      'Use books or pictures as support for interaction with the child?',
      'ampi__Picklist_Response__c',
      'form.pratiques_familiales.participant_attitude_group.utiliser_livres_interaction'
    ),
    makeSet(
      'Help the child discover facial features',
      'ampi__Picklist_Response__c',
      'form.pratiques_familiales.participant_attitude_group.decouvrir_traits_visage'
    ),
    makeSet(
      'Help the child discover objects by explaining size, color, shape.',
      'ampi__Picklist_Response__c',
      'form.pratiques_familiales.participant_attitude_group.aider_decouverte_objets'
    ),
    makeSet(
      'Always have the child sleep under an impregnated mosquito net',
      'ampi__Picklist_Response__c',
      'form.pratiques_familiales.participant_attitude_group.dormir_sous_un_moustiquaire'
    ),
    makeSet(
      'Congratulate the child with enthusiasm when he makes a positive action',
      'ampi__Picklist_Response__c',
      'form.pratiques_familiales.participant_attitude_group.feliciter_action_positive'
    ),
    makeSet(
      'Do not hit the child (aged between 3 and over) even if he is doing a negative action',
      'ampi__Picklist_Response__c',
      'form.pratiques_familiales.participant_attitude_group.ne_pas_frapper'
    ),
    makeSet(
      'Discuss with the child to reason with him even if he is doing a negative action',
      'ampi__Picklist_Response__c',
      'form.pratiques_familiales.participant_attitude_group.raisonner_enfant'
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
