// UPSERT PARENT SUBMISSION ====================================================
upsert(
  'ampi__Submission__c',
  'Submission_ID__c',
  fields(
    field('ampi__Description__c', dataValue('form.@name')),
    field(
      'Location__Location__latitude__s',
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
        fieldSet.ampi__Response__Type__c = 'Picklist';
        break;

      case 'ampi__Number_Response__c':
        fieldSet.ampi__Response__Type__c = 'Number';
        break;

      case 'ampi__Text__Response__c':
        fieldSet.ampi__Response__Type__c = 'Qualitative';
        break;

      default:
        break;
    }

    fieldSet[b] = dataValue(c)(state);

    return fieldSet;
  }

  state.fieldSets = [
    makeSet(
      'total children',
      'ampi__Number_Response__c',
      'form.var.total_enfants'
    ),
    makeSet(
      'total vaccinated children',
      'ampi__Number_Response__c',
      'form.var.total_enfants_vaccines'
    ),
    makeSet(
      'total childrens state',
      'ampi__Number_Response__c',
      'form.var.total_etats_civil'
    ),
    makeSet(
      'total excision',
      'ampi__Number_Response__c',
      'form.var.total_excision'
    ),
    makeSet(
      'total wedding',
      'ampi__Number_Response__c',
      'form.var.total_mariages'
    ),
    makeSet(
      'total malnourished',
      'ampi__Number_Response__c',
      'form.var.total_malnourris'
    ),
    makeSet(
      'total sexual violence',
      'ampi__Number_Response__c',
      'form.var.total_violences_sexuelles'
    ),
    makeSet(
      'total physical violence',
      'ampi__Number_Response__c',
      'form.var.total_violences_physique'
    ),
    makeSet(
      'departement',
      'ampi__Picklist_Response__c',
      'form.identification.fixture_localization.departement'
    ),
    makeSet(
      'commune',
      'ampi__Picklist_Response__c',
      'form.identification.fixture_localization.commune'
    ),
    makeSet(
      'village',
      'ampi__Picklist_Response__c',
      'form.identification.fixture_localization.village'
    ),
    makeSet(
      'Language of the interview',
      'ampi__Picklist_Response__c',
      'form.identification.langue_interview'
    ),
    makeSet(
      'Indicate the language',
      'ampi__Picklist_Response__c',
      'form.identification.indiquez_langue'
    ),
    makeSet(
      'Girls:',
      'ampi__Number_Response__c',
      'form.situation_enfants.nombre_total_enfants.filles'
    ),
    makeSet(
      'boys',
      'ampi__Number_Response__c',
      'form.situation_enfants.nombre_total_enfants.garcons'
    ),
    makeSet(
      'Girls:',
      'ampi__Number_Response__c',
      'form.situation_enfants.enfants_vaccines.filles'
    ),
    makeSet(
      'boys',
      'ampi__Number_Response__c',
      'form.situation_enfants.enfants_vaccines.garcons'
    ),
    makeSet(
      'Girls:',
      'ampi__Number_Response__c',
      'form.situation_enfants.enfants_etat_civil.filles'
    ),
    makeSet(
      'boys',
      'ampi__Number_Response__c',
      'form.situation_enfants.enfants_etat_civil.garcons'
    ),
    makeSet(
      'Girls:',
      'ampi__Number_Response__c',
      'form.situation_enfants.cas_excision.filles'
    ),
    makeSet(
      'boys',
      'ampi__Number_Response__c',
      'form.situation_enfants.cas_excision.garcons'
    ),
    makeSet(
      'Girls:',
      'ampi__Number_Response__c',
      'form.situation_enfants.mariage_enfants.filles'
    ),
    makeSet(
      'boys',
      'ampi__Number_Response__c',
      'form.situation_enfants.mariage_enfants.garcons'
    ),
    makeSet(
      'Girls:',
      'ampi__Number_Response__c',
      'form.situation_enfants.enfants_malnourris.filles'
    ),
    makeSet(
      'boys',
      'ampi__Number_Response__c',
      'form.situation_enfants.enfants_malnourris.garcons'
    ),
    makeSet(
      'Girls:',
      'ampi__Number_Response__c',
      'form.situation_enfants.violences_sexuelles.filles'
    ),
    makeSet(
      'boys',
      'ampi__Number_Response__c',
      'form.situation_enfants.violences_sexuelles.garcons'
    ),
    makeSet(
      'Girls:',
      'ampi__Number_Response__c',
      'form.situation_enfants.violences_physiques.filles'
    ),
    makeSet(
      'boys',
      'ampi__Number_Response__c',
      'form.situation_enfants.violences_physiques.garcons'
    ),
    makeSet(
      'Give a list of activities',
      'ampi__Text_Response__c',
      'form.activites_mobilisations_sociales.sante_enfant.liste_activites'
    ),
    makeSet(
      'Give a list of activities',
      'ampi__Text_Response__c',
      'form.activites_mobilisations_sociales.education_enfant.liste_activites'
    ),
    makeSet(
      'Give a list of activities',
      'ampi__Text_Response__c',
      'form.activites_mobilisations_sociales.protection_enfant.liste_activites'
    ),
    makeSet(
      'Community activities included in the action plan on childrens rights',
      'ampi__Text_Response__c',
      'form.activites_mobilisations_sociales.activites_droits_enfants'
    ),
    makeSet(
      'specify other',
      'ampi__Text_Response__c',
      'form.activites_mobilisations_sociales.preciser_autre'
    ),
    makeSet(
      'Speak with the child during pregnancy (5-6 months of pregnancy)',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_communautaire_label.parler_grossesse'
    ),
    makeSet(
      'Talking with the child 2 months after birth as if he were an adult',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_communautaire_label.parler_comme_adulte1'
    ),
    makeSet(
      'Speak with the child 1 year after birth as if he were an adult',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_communautaire_label.parler_comme_adulte2'
    ),
    makeSet(
      'Help the child discover facial features',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_communautaire_label.traits_visage'
    ),
    makeSet(
      'Help the child discover the objects by explaining to him size, color, shape',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_communautaire_label.decouvrir_objets'
    ),
    makeSet(
      'Always have the child sleep under an impregnated mosquito net',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_communautaire_label.dormir_moustiquaire'
    ),
    makeSet(
      'Congratulate the child with enthusiasm when he makes a positive action.',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_communautaire_label.action_positive'
    ),
    makeSet(
      'Do not hit the child (aged 3 years or older) even if he is doing a negative action.',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_communautaire_label.action_negative'
    ),
    makeSet(
      "Discuter avec l'enfant pour le raisonner même s'il fait une action négative",
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_communautaire_label.raissonner_avec_enfant'
    ),
    makeSet(
      'Watch the child in the eyes for a long time',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_communautaire_label.regarder_dans_yeux'
    ),
    makeSet(
      'Accompany your child in the game',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_communautaire_label.accompagner_enfant'
    ),
    makeSet(
      'Use books or pictures as support for interaction with the child',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_communautaire_label.livres_images'
    ),
    makeSet(
      'Speak with the child during pregnancy (5-6 months of pregnancy)',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_inter_villageoise.parler_grossesse'
    ),
    makeSet(
      'Talking with the child 2 months after birth as if he were an adult',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_inter_villageoise.parler_comme_adulte1'
    ),
    makeSet(
      'Speak with the child 1 year after birth as if he were an adult',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_inter_villageoise.parler_comme_adulte2'
    ),
    makeSet(
      'Help the child discover facial features',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_inter_villageoise.traits_visage'
    ),
    makeSet(
      'Help the child discover the objects by explaining to him size, color, shape',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_inter_villageoise.decouvrir_objets'
    ),
    makeSet(
      'Always have the child sleep under an impregnated mosquito net',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_inter_villageoise.dormir_moustiquaire'
    ),
    makeSet(
      'Congratulate the child with enthusiasm when he makes a positive action.',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_inter_villageoise.action_positive'
    ),
    makeSet(
      'Do not hit the child (aged 3 years or older) even if he is doing a negative action.',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_inter_villageoise.action_negative'
    ),
    makeSet(
      "Discuter avec l'enfant pour le raisonner même s'il fait une action négative",
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_inter_villageoise.raissonner_avec_enfant'
    ),
    makeSet(
      'Watch the child in the eyes for a long time',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_inter_villageoise.regarder_dans_yeux'
    ),
    makeSet(
      'Accompany your child in the game',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_inter_villageoise.accompagner_enfant'
    ),
    makeSet(
      'Use books or pictures as support for interaction with the child',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.sensibilisation_inter_villageoise.livres_images'
    ),
    makeSet(
      'Number of exchange meetings between teachers and communities on practices related to the childs schooling',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.number_exchanges.echange_scolarisation'
    ),
    makeSet(
      'Number of teacher-community exchange meetings on child-guidance practices',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.number_exchanges.echange_encadrement'
    ),
    makeSet(
      'Number of exchange meetings between teachers and communities on practices related to accompaniment',
      'ampi__Number_Response__c',
      'form.activites_bienetre_enfants.number_exchanges.echange_accompagnement'
    ),
  ];

  state.questionArray = state.fieldSets.map(x => {
    x.RecordType = { Name: 'Answer' };
    x.ampi__Submission__r = { Submission_ID__c: state.data.id };
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
