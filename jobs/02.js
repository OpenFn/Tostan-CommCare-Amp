// UPSERT PARENT SUBMISSION ====================================================
upsert(
  'ampi__Submission__c',
  'Submission_ID__c',
  fields(
    field('ampi__Description__c', dataValue('form.@name')),
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
  const { form } = state.data;

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

    fieldSet[b] = c;

    return fieldSet;
  }

  state.fieldSets = [
    makeSet(
      'type_evaluation',
      'ampi__Picklist_Response__c',
      form['type_evaluation']
    ),
    // makeSet('projet', 'ampi__Picklist_Response__c', form['projet']),
    makeSet(
      'coordonnes_gps',
      'ampi__Submisison__c.Location__c',
      form['coordonnes_gps']
    ),
    // makeSet(
    //   'statut_repondant',
    //   'ampi__Picklist_Response__c',
    //   form.XOX['statut_repondant']
    // ),
    makeSet(
      'sexe',
      'ampi__Picklist_Response__c',
      form.caracteristiques_demographiques.caracteristiques_enquete['sexe']
    ),
    // makeSet('ethnie', 'ampi__Picklist_Response__c', form.XOX['ethnie']),
    makeSet(
      'connait_age',
      'ampi__Picklist_Response__c',
      form.caracteristiques_demographiques.caracteristiques_enquete.age_enquete[
        'connait_age'
      ]
    ),
    makeSet(
      'age_exact',
      'ampi__Number_Response__c',
      form.caracteristiques_demographiques.caracteristiques_enquete.age_enquete[
        'age_exact'
      ]
    ),
    makeSet(
      'tranche_age',
      'ampi__Picklist_Response__c',
      form.caracteristiques_demographiques.caracteristiques_enquete.age_enquete[
        'tranche_age'
      ]
    ),
    makeSet(
      'etat_matrimonial',
      'ampi__Picklist_Response__c',
      form.caracteristiques_demographiques['etat_matrimonial']
    ),
    makeSet(
      'frequente_ecole',
      'ampi__Picklist_Response__c',
      form.caracteristiques_demographiques.niveau_etude_enquete[
        'freq_ecole'
      ]
    ),
    makeSet('niveau', 'ampi__Picklist_Response__c', form.XOX['niveau']),
    makeSet(
      'participant_prcc',
      'ampi__Picklist_Response__c',
      form.XOX['participant_prcc']
    ),
    makeSet('adopte', 'ampi__Picklist_Response__c', form.XOX['adopte']),
    makeSet(
      'Cnce_instruments_J-I',
      'ampi__Picklist_Response__c',
      form.XOX['Cnce_instruments_J-I']
    ),
    makeSet(
      'instruments_cites',
      'ampi__Text__Response__c',
      form.XOX['instruments_cites']
    ),
    makeSet(
      'Nombre_instruments_cites',
      'ampi__Number_Response__c',
      form.XOX['Nombre_instruments_cites']
    ),
    makeSet(
      'promotion_instruments',
      'ampi__Picklist_Response__c',
      form.XOX['promotion_instruments']
    ),
    makeSet(
      'posez_la_question_de_quels_instruments_juridiques_internationaux_des_droits',
      'ampi__Text__Response__c',
      form.XOX[
        'posez_la_question_de_quels_instruments_juridiques_internationaux_des_droits'
      ]
    ),
    makeSet(
      'connait_droits_humains',
      'ampi__Picklist_Response__c',
      form.XOX['connait_droits_humains']
    ),
    makeSet(
      'liste_des_droist_humains',
      'ampi__Text__Response__c',
      form.XOX['liste_des_droist_humains']
    ),
    makeSet(
      'total_droit_cite',
      'ampi__Number_Response__c',
      form.XOX['total_droit_cite']
    ),
    makeSet(
      'actions_communautaire_droits_humains',
      'ampi__Picklist_Response__c',
      form.XOX['actions_communautaire_droits_humains']
    ),
    makeSet(
      'action_com_DrH',
      'ampi__Text__Response__c',
      form.XOX['action_com_DrH']
    ),
    makeSet(
      'action_communautaire_promotion_paix',
      'ampi__Picklist_Response__c',
      form.XOX['action_communautaire_promotion_paix']
    ),
    makeSet('action_paix', 'ampi__Text__Response__c', form.XOX['action_paix']),
    makeSet(
      'action_commun_encourager_participation',
      'ampi__Picklist_Response__c',
      form.XOX['action_commun_encourager_participation']
    ),
    makeSet(
      'action_encourager_participation',
      'ampi__Text__Response__c',
      form.XOX['action_encourager_participation']
    ),
    makeSet(
      'action_comm_prom_droit_fem',
      'ampi__Picklist_Response__c',
      form.XOX['action_comm_prom_droit_fem']
    ),
    makeSet(
      'which_activities',
      'ampi__Text__Response__c',
      form.XOX['which_activities']
    ),
    makeSet(
      'action_commun_sensibiliser_autorite_DrH',
      'ampi__Picklist_Response__c',
      form.XOX['action_commun_sensibiliser_autorite_DrH']
    ),
    makeSet(
      'action_commun_sensibiliser_autorite',
      'ampi__Text__Response__c',
      form.XOX['action_commun_sensibiliser_autorite']
    ),
    makeSet(
      'promotion_certains_DH',
      'ampi__Picklist_Response__c',
      form.XOX['promotion_certains_DH']
    ),
    makeSet(
      'de_quels_droit_sagit-il',
      'ampi__Text__Response__c',
      form.XOX['de_quels_droit_sagit-il']
    ),
    makeSet(
      'action_promotion_droits_huamins',
      'ampi__Picklist_Response__c',
      form.XOX['action_promotion_droits_huamins']
    ),
    makeSet(
      'action_droits_humains',
      'ampi__Text__Response__c',
      form.XOX['action_droits_humains']
    ),
    makeSet(
      'encoyrager_participation_prise_de_decision',
      'ampi__Picklist_Response__c',
      form.XOX['encoyrager_participation_prise_de_decision']
    ),
    makeSet(
      'action_encourager_participation_prise_de_decision',
      'ampi__Text__Response__c',
      form.XOX['action_encourager_participation_prise_de_decision']
    ),
    makeSet('Conce_paix', 'ampi__Text__Response__c', form.XOX['Conce_paix']),
    makeSet(
      'prciser_autre',
      'ampi__Text__Response__c',
      form.XOX['prciser_autre']
    ),
    makeSet(
      'existence_culture_paix',
      'ampi__Text__Response__c',
      form.XOX['existence_culture_paix']
    ),
    makeSet(
      'action_securite_humaine',
      'ampi__Text__Response__c',
      form.XOX['action_securite_humaine']
    ),
    makeSet('menace_paix', 'ampi__Text__Response__c', form.XOX['menace_paix']),
    makeSet(
      'cnce_types_trafic_biens_personnes',
      'ampi__Picklist_Response__c',
      form.XOX['cnce_types_trafic_biens_personnes']
    ),
    makeSet(
      'types_de_trafic_biens_et_personnes',
      'ampi__Text__Response__c',
      form.XOX['types_de_trafic_biens_et_personnes']
    ),
    makeSet(
      'economie_traite_menace_paix',
      'ampi__Text__Response__c',
      form.XOX['economie_traite_menace_paix']
    ),
    makeSet(
      'prcisez_autre',
      'ampi__Text__Response__c',
      form.XOX['prcisez_autre']
    ),
    makeSet(
      'connait_securite_humaine',
      'ampi__Picklist_Response__c',
      form.XOX['connait_securite_humaine']
    ),
    makeSet(
      'conce_elemt_sec_huma',
      'ampi__Picklist_Response__c',
      form.XOX['conce_elemt_sec_huma']
    ),
    makeSet(
      'elements_securite_humaine',
      'ampi__Text__Response__c',
      form.XOX['elements_securite_humaine']
    ),
    makeSet(
      'nombre_element_cite',
      'ampi__Number_Response__c',
      form.XOX['nombre_element_cite']
    ),
    makeSet(
      'action_secu_alimentaire',
      'ampi__Picklist_Response__c',
      form.XOX['action_secu_alimentaire']
    ),
    makeSet(
      'liste_action_secu_alimentaire',
      'ampi__Text__Response__c',
      form.XOX['liste_action_secu_alimentaire']
    ),
    makeSet(
      'action_secu_environnementale',
      'ampi__Picklist_Response__c',
      form.XOX['action_secu_environnementale']
    ),
    makeSet(
      'liste_action_secu_env',
      'ampi__Text__Response__c',
      form.XOX['liste_action_secu_env']
    ),
    makeSet(
      'action_secu_sanitaire',
      'ampi__Picklist_Response__c',
      form.XOX['action_secu_sanitaire']
    ),
    makeSet(
      'liste_action_secu_sanitaire',
      'ampi__Text__Response__c',
      form.XOX['liste_action_secu_sanitaire']
    ),
    makeSet(
      'action_secu_personnelle',
      'ampi__Picklist_Response__c',
      form.XOX['action_secu_personnelle']
    ),
    makeSet(
      'liste_action_secu_perso',
      'ampi__Text__Response__c',
      form.XOX['liste_action_secu_perso']
    ),
    makeSet(
      'action_secu_communautaire',
      'ampi__Picklist_Response__c',
      form.XOX['action_secu_communautaire']
    ),
    makeSet(
      'liste_action_secu_comm',
      'ampi__Text__Response__c',
      form.XOX['liste_action_secu_comm']
    ),
    makeSet(
      'action_secu_economique',
      'ampi__Picklist_Response__c',
      form.XOX['action_secu_economique']
    ),
    makeSet(
      'liste_action_secu_economique',
      'ampi__Text__Response__c',
      form.XOX['liste_action_secu_economique']
    ),
    makeSet(
      'connait_outil',
      'ampi__Picklist_Response__c',
      form.XOX['connait_outil']
    ),
    makeSet(
      'outil_connu',
      'ampi__Picklist_Response__c',
      form.XOX['outil_connu']
    ),
    makeSet(
      'caricature_arbre_conflit',
      'ampi__Text__Response__c',
      form.XOX['caricature_arbre_conflit']
    ),
    makeSet(
      'startegie_evitement_intensification',
      'ampi__Picklist_Response__c',
      form.XOX['startegie_evitement_intensification']
    ),
    makeSet(
      'quelle_strategie',
      'ampi__Text__Response__c',
      form.XOX['quelle_strategie']
    ),
    makeSet(
      'type_de_conflit_existe',
      'ampi__Text__Response__c',
      form.XOX['type_de_conflit_existe']
    ),
    makeSet(
      'preciser_autre',
      'ampi__Text__Response__c',
      form.XOX['preciser_autre']
    ),
    makeSet(
      'temoin_episode_violence',
      'ampi__Picklist_Response__c',
      form.XOX['temoin_episode_violence']
    ),
    makeSet(
      'victims_of_violence',
      'ampi__Text__Response__c',
      form.XOX['victims_of_violence']
    ),
    makeSet(
      'reason_of_violence',
      'ampi__Text__Response__c',
      form.XOX['reason_of_violence']
    ),
    makeSet('formation', 'ampi__Picklist_Response__c', form.XOX['formation']),
    makeSet(
      'formation_souhaitee',
      'ampi__Text__Response__c',
      form.XOX['formation_souhaitee']
    ),
    makeSet(
      'connait_mediation',
      'ampi__Picklist_Response__c',
      form.XOX['connait_mediation']
    ),
    makeSet(
      'connaissance_mediation',
      'ampi__Picklist_Response__c',
      form.XOX['connaissance_mediation']
    ),
    makeSet(
      'type_de_conflit',
      'ampi__Text__Response__c',
      form.XOX['type_de_conflit']
    ),
    makeSet(
      'preciser_conflit',
      'ampi__Text__Response__c',
      form.XOX['preciser_conflit']
    ),
    makeSet(
      'besoin_nouvelles_connaissances',
      'ampi__Picklist_Response__c',
      form.XOX['besoin_nouvelles_connaissances']
    ),
    makeSet(
      'qui_participe_resolution_conflits',
      'ampi__Picklist_Response__c',
      form.XOX['qui_participe_resolution_conflits']
    ),
    makeSet(
      'femmes_plus_impliquees',
      'ampi__Picklist_Response__c',
      form.XOX['femmes_plus_impliquees']
    ),
    makeSet(
      'preciser_autre_femme',
      'ampi__Text__Response__c',
      form.XOX['preciser_autre_femme']
    ),
    makeSet(
      'femme_impliquee',
      'ampi__Picklist_Response__c',
      form.XOX['femme_impliquee']
    ),
    makeSet(
      'si_oui_pourquoi',
      'ampi__Text__Response__c',
      form.XOX['si_oui_pourquoi']
    ),
    makeSet(
      'si_non_pourquoi',
      'ampi__Text__Response__c',
      form.XOX['si_non_pourquoi']
    ),
  ];

  state.questionArray = state.fieldSets.map(x => {
    x.RecordType = {
      Name: 'Answer',
    };
    x.ampi__Submission__r = {
      Submission_ID__c: state.data.id,
    };
    return x;
  });

  return state;
});
// =============================================================================

// UPSERT CHILD QUESTIONS ======================================================
bulk(
  'ampi__Question__c',
  'upsert',
  {
    extIdField: 'Question_ID__c',
    failOnError: true,
    allowNoOp: true,
  },
  state => {
    return state.questionArray;
  }
);
// =============================================================================
