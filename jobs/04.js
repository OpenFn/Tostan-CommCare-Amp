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
      'Evaluation Type',
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
      'Ask to see the Pv notebook ?',
      'ampi__Picklist_Response__c',
      'form.DOCUMENTS_CGC.Cahier_de_PV'
    ),
    makeSet(
      'Look the fill level of the PV Workbook',
      'ampi__Picklist_Response__c',
      'form.DOCUMENTS_CGC.Niveau_Remplissage_Cahier_PV'
    ),
    makeSet(
      'Ask to see the financial management book?',
      'ampi__Picklist_Response__c',
      'form.DOCUMENTS_CGC.Cahier_gestion_financiere'
    ),
    makeSet(
      'Look the fill level of the Financial Management Workbook',
      'ampi__Picklist_Response__c',
      'form.DOCUMENTS_CGC.Niveau_Remplissage_Cahier_gestion_financiere'
    ),
    makeSet(
      'Ask to see the Action Plan?',
      'ampi__Picklist_Response__c',
      'form.DOCUMENTS_CGC.Plan_action'
    ),
    makeSet(
      'Look the fill level of the Action Plan',
      'ampi__Picklist_Response__c',
      'form.DOCUMENTS_CGC.Niveau_Remplissage_Plan_action'
    ),
    makeSet(
      'How many meetings has the CGC organized in the last 6 months?',
      'ampi__Number_Response__c',
      'form.REUNION_CGC_COMMISSIONS.Nombre_reunion_CGC'
    ),
    makeSet(
      'How many meetings has the CGC organized in the last 6 months?',
      'ampi__Number_Response__c',
      'form.REUNION_CGC_COMMISSIONS.number_reunion_gouv'
    ),
    makeSet(
      'How many meetings has the Education Commission organized in the last 6 months?',
      'ampi__Number_Response__c',
      'form.REUNION_CGC_COMMISSIONS.Nombre_reunion_Commission_Education'
    ),
    makeSet(
      'How many meetings has the health commission organized in the last 6 months?',
      'ampi__Number_Response__c',
      'form.REUNION_CGC_COMMISSIONS.Nombre_reunion_Commission_Sante'
    ),
    makeSet(
      'How many meetings has the environment committee organized in the last 6 months?',
      'ampi__Number_Response__c',
      'form.REUNION_CGC_COMMISSIONS.Nombre_reunion_Commission_Environnement'
    ),
    makeSet(
      'How many meetings has the AGR commission organized in the last 6 months?',
      'ampi__Number_Response__c',
      'form.REUNION_CGC_COMMISSIONS.Nombre_reunion_Commission_AGR'
    ),
    makeSet(
      'How many meetings has the Child Protection Commission organized in the last 6 months?',
      'ampi__Number_Response__c',
      'form.REUNION_CGC_COMMISSIONS.Nombre_reunion_Commission_Protection_enfant'
    ),
    makeSet(
      'How many meetings did the mobilization commission organize during the last 6 months?',
      'ampi__Number_Response__c',
      'form.REUNION_CGC_COMMISSIONS.Nombre_reunion_Mobilisation'
    ),
    makeSet(
      'How many meetings did the mobilization commission organize during the last 6 months?',
      'ampi__Number_Response__c',
      'form.REUNION_CGC_COMMISSIONS.Number_Reunion_com_paix'
    ),
    makeSet(
      'CGC meeting number',
      'ampi__Number_Response__c',
      'form.REUNION_CGC_COMMISSIONS.Nombre_reunion_CGC_Commissions'
    ),
    makeSet(
      'How many action plans has the CGC shared with the community in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_plans_action.Nombre_PA_partage_CGC'
    ),
    makeSet(
      'How many action plans has the Education Commission shared with the community in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_plans_action.Nombre_PA_partage_Commission_education'
    ),
    makeSet(
      'How many action plans has the health commission shared with the community in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_plans_action.Nombre_PA_partage_Commission_Sante'
    ),
    makeSet(
      'How many action plans has the environment commission shared with the community in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_plans_action.Nombre_PA_partage_Commission_Environnement'
    ),
    makeSet(
      'How many action plans has the AGR commission shared with the community in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_plans_action.Nombre_PA_partage_Commission_AGR'
    ),
    makeSet(
      'How many action plans has the Child Protection Commission shared with the community in the past 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_plans_action.Nombre_PA_partage_Commission_Protection_Enfant'
    ),
    makeSet(
      'How many action plans has the Mobilization Commission shared with the community in the past 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_plans_action.Nombre_PA_partage_Commission_Mobilisation'
    ),
    makeSet(
      'How many action plans has the Mobilization Commission shared with the community in the past 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_plans_action.Number_AP_shared_peace_P'
    ),
    makeSet(
      'How much advocacy has the CGC done in the last 12 months to raise awareness among communities about peacebuilding?',
      'ampi__Number_Response__c',
      'form.Plaidoyers_CGC.Actions_1_Plaidoyer_CGC'
    ),
    makeSet(
      'How much advocacy has the CGC made over the last 12 months to raise awareness about conflict management?',
      'ampi__Number_Response__c',
      'form.Plaidoyers_CGC.Actions_2_plaidoyer_CGC'
    ),
    makeSet(
      'How much did the CGC advocate in the past 12 months to educate community members about conflict prevention?',
      'ampi__Number_Response__c',
      'form.Plaidoyers_CGC.Action_3_plaidoyer_CGC'
    ),
    makeSet(
      'How much advocacy has the CGC made in the last 12 months to integrate its action plan into that of local authorities?',
      'ampi__Number_Response__c',
      'form.Plaidoyers_CGC.Actions_4_plaidoyer_CGC'
    ),
    makeSet(
      'How many protocols have you signed with state partners?',
      'ampi__Number_Response__c',
      'form.Activites_partenaires_etatique_prive.Protocoles_signes_partenaires_etatiques'
    ),
    makeSet(
      'How many protocols have you signed with private partners?',
      'ampi__Number_Response__c',
      'form.Activites_partenaires_etatique_prive.Protocoles_partenaires_prives'
    ),
    makeSet(
      'How many activities did you retain with your state partners to implement them?',
      'ampi__Number_Response__c',
      'form.Activites_partenaires_etatique_prive.Activites_partenaires_etatiques'
    ),
    makeSet(
      'How many activities did you retain with your private partners to implement them?',
      'ampi__Number_Response__c',
      'form.Activites_partenaires_etatique_prive.Activites_partenaires_prives'
    ),
    makeSet(
      'How many activities have actually been implemented with your state partners according to the planning?',
      'ampi__Number_Response__c',
      'form.Activites_partenaires_etatique_prive.Activites_mises_en_oeuvre_etatique'
    ),
    makeSet(
      'How many activities have actually been implemented with your private partners?',
      'ampi__Number_Response__c',
      'form.Activites_partenaires_etatique_prive.Activites_mises_en_oeuvre_prives'
    ),
    makeSet(
      'Has the CGC integrated a federation?',
      'ampi__Picklist_Response__c',
      'form.FEDERATION_CGC.Federation_CGC'
    ),
    makeSet(
      'Specify the name of the federation?',
      'ampi__Text_Response__c',
      'form.FEDERATION_CGC.Nom_federation'
    ),
    makeSet(
      'Which other villages are in the federation?',
      'ampi__Text_Response__c',
      'form.FEDERATION_CGC.Noms_villages_federation'
    ),
    makeSet(
      'Has the CGC obtained legal status since the start of the program?',
      'ampi__Picklist_Response__c',
      'form.Statut_Juridique_Compte_bancaire_Cachet.Statut_juridique'
    ),
    makeSet(
      'Does the CGC have a stamp?',
      'ampi__Picklist_Response__c',
      'form.Statut_Juridique_Compte_bancaire_Cachet.Possession_cachet'
    ),
    makeSet(
      'Does the CGC have a bank account?',
      'ampi__Picklist_Response__c',
      'form.Statut_Juridique_Compte_bancaire_Cachet.Compte_bancaire'
    ),
    makeSet(
      'How many meetings have been held with representatives of other associations (if there are any in the village) in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Reunion_avec_associations'
    ),
    makeSet(
      'How many meetings have been held in the area of ​​Governance?',
      'ampi__Number_Response__c',
      'form.Reunion_CGC_domaines_GESEE.Nombre_reunions_Gouvernance'
    ),
    makeSet(
      'How many meetings have been made in the field of education in the last 12 months',
      'ampi__Number_Response__c',
      'form.Reunion_CGC_domaines_GESEE.Nombre_reunion_Education'
    ),
    makeSet(
      'How many meetings have been made in the health field in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Reunion_CGC_domaines_GESEE.Nombre_reunions_Sante'
    ),
    makeSet(
      'How many meetings have been made in the field of the environment in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Reunion_CGC_domaines_GESEE.Nombre_reunions_Environnement'
    ),
    makeSet(
      'How many meetings have been held in the field of the economy in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Reunion_CGC_domaines_GESEE.Nombre_reunions_Economie'
    ),
    makeSet(
      'number of meetings',
      'ampi__Number_Response__c',
      'form.Reunion_CGC_domaines_GESEE.nbre_reunion_gesee'
    ),
    makeSet(
      'How many share plans have been shared in the area of ​​Governance in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_Plans_Actions_GESEE.Partage_plan_action_Gouvernance'
    ),
    makeSet(
      'How many action plans have been shared in the field of education in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_Plans_Actions_GESEE.Partage_plan_action_Education'
    ),
    makeSet(
      'How many action plans have been shared in the health field in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_Plans_Actions_GESEE.Partage_plan_action_Sante'
    ),
    makeSet(
      'How many action plans have been shared in the field of the environment in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_Plans_Actions_GESEE.Partage_plan_action_Environnement'
    ),
    makeSet(
      'How many action plans have been shared in the field of the economy in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Partage_Plans_Actions_GESEE.Partage_plan_action_Economie'
    ),
    makeSet(
      'number share plan action',
      'ampi__Number_Response__c',
      'form.Partage_Plans_Actions_GESEE.nbre_partage_plan_action'
    ),
    makeSet(
      'How many advocacy activities have you done in the area of ​​governance in the last 12 months? ?',
      'ampi__Number_Response__c',
      'form.Activites_paildoyers_GESEE.Activite_plaidoyer_Gouvernance'
    ),
    makeSet(
      'How many advocacy activities have you done in the field of education in the last 12 months ??',
      'ampi__Number_Response__c',
      'form.Activites_paildoyers_GESEE.Activites_plaidoyer_Education'
    ),
    makeSet(
      'How many advocacy activities have you done in the health field in the last 12 months ??',
      'ampi__Number_Response__c',
      'form.Activites_paildoyers_GESEE.Activites_plaidoyer_Sante'
    ),
    makeSet(
      'How many advocacy activities have you done in the environmental field in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Activites_paildoyers_GESEE.Activites_plaidoyer_Environnement'
    ),
    makeSet(
      'How many advocacy activities have you done in the field of economics in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Activites_paildoyers_GESEE.Activites_plaidoyer_Economie'
    ),
    makeSet(
      'number of pleas',
      'ampi__Number_Response__c',
      'form.Activites_paildoyers_GESEE.nbre_plaidoyers_gesee'
    ),
    makeSet(
      'How many other actions have you done in the area of ​​governance?',
      'ampi__Number_Response__c',
      'form.Autres_Actions_GESEE.Autres_actions_Gouvernance'
    ),
    makeSet(
      'Specify other actions in governance',
      'ampi__Text_Response__c',
      'form.Autres_Actions_GESEE.Preciser_Gouv'
    ),
    makeSet(
      'How many other actions have you done in the field of education in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Autres_Actions_GESEE.Autres_actions_Education'
    ),
    makeSet(
      'Specify other actions in education',
      'ampi__Text_Response__c',
      'form.Autres_Actions_GESEE.Preciser_Edu'
    ),
    makeSet(
      'Ask How many other actions have you done in the health field in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Autres_Actions_GESEE.Autres_actions_Sante'
    ),
    makeSet(
      'Specify other actions in health',
      'ampi__Text_Response__c',
      'form.Autres_Actions_GESEE.Preciser_Sante_'
    ),
    makeSet(
      'Ask How many other actions have you done in the environmental field in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Autres_Actions_GESEE.Autres_actions_Environnement'
    ),
    makeSet(
      'Specify other actions in the environment',
      'ampi__Text_Response__c',
      'form.Autres_Actions_GESEE.Preciser_Env'
    ),
    makeSet(
      'Ask How many other actions have you done in the economy in the last 12 months?',
      'ampi__Number_Response__c',
      'form.Autres_Actions_GESEE.Autres_actions_Economie'
    ),
    makeSet(
      'Specify other actions in the economy',
      'ampi__Text_Response__c',
      'form.Autres_Actions_GESEE.Preciser_economie'
    ),
    makeSet(
      'Ask How many advocacy . lobbying activities have you done with education authorities for service improvement in the past 12 months?',
      'ampi__Number_Response__c',
      'form.Activites_plaidoyer_lobbying'
    ),
    makeSet(
      'Has the GSC Health Commission carried out activities to prevent the transmission of germs or diseases?',
      'ampi__Picklist_Response__c',
      'form.Prevention_transmission_germes_malaies'
    ),
    makeSet(
      'Ask What is the number of neighborhoods or villages adopted by the CGC?',
      'ampi__Number_Response__c',
      'form.Adoption_Sensibilisation.Villages_Adoptes'
    ),
    makeSet(
      'In how many villages has the CGC conducted peace awareness campaigns?',
      'ampi__Number_Response__c',
      'form.Adoption_Sensibilisation.Villages_Sensibilises'
    ),
    makeSet(
      'List the names of these villages',
      'ampi__Text_Response__c',
      'form.Adoption_Sensibilisation.Noms_villages_sensibilises'
    ),
    makeSet(
      'Specify What activities are these?',
      'ampi__Text_Response__c',
      'form.Types_activites_securite_personnelle'
    ),
    makeSet(
      'How many political security activities has the CGC implemented?',
      'ampi__Number_Response__c',
      'form.Activites_Securite_humaine.Activites_securite_politique'
    ),
    makeSet(
      'Specify What activities are these?',
      'ampi__Text_Response__c',
      'form.Activites_Securite_humaine.Types_Activites_securite_politique'
    ),
    makeSet(
      'How many economic security activities has the CGC implemented?',
      'ampi__Number_Response__c',
      'form.Activites_Securite_humaine.Activites_securite_economique'
    ),
    makeSet(
      'Specify What activities are these?',
      'ampi__Text_Response__c',
      'form.Activites_Securite_humaine.Types_activites_securite_economique'
    ),
    makeSet(
      'Ask How many health safety activities has the CGC implemented?',
      'ampi__Number_Response__c',
      'form.Activites_Securite_humaine.Activite_securite_sanitaire'
    ),
    makeSet(
      'Specify What activities are these?',
      'ampi__Text_Response__c',
      'form.Activites_Securite_humaine.Types_activites_securite_sanitaire'
    ),
    makeSet(
      'Ask How many community safety activities has the CGC implemented?',
      'ampi__Number_Response__c',
      'form.Activites_Securite_humaine.Activites_securite_communautaire'
    ),
    makeSet(
      'Specify What activities are these?',
      'ampi__Text_Response__c',
      'form.Activites_Securite_humaine.Types_activites_securite_communautaire'
    ),
    makeSet(
      'Ask How many personal safety activities has the CGC implemented?',
      'ampi__Number_Response__c',
      'form.Activites_Securite_humaine.Activite_securite_personnelle'
    ),
    makeSet(
      'Specify What activities are these?',
      'ampi__Text_Response__c',
      'form.Activites_Securite_humaine.Types_activites_securite_personnelle'
    ),
    makeSet(
      'Ask How many environmental safety activities has the CGC implemented?',
      'ampi__Number_Response__c',
      'form.Activites_Securite_humaine.Activites_securite_environnementale'
    ),
    makeSet(
      'Specify What activities are these?',
      'ampi__Text_Response__c',
      'form.Activites_Securite_humaine.Types_activites_securite_environnementale'
    ),
    makeSet(
      'Ask How many food security activities has the CGC implemented?',
      'ampi__Number_Response__c',
      'form.Activites_Securite_humaine.Activites_securite_alimentaire'
    ),
    makeSet(
      'Specify What activities are these?',
      'ampi__Text_Response__c',
      'form.Activites_Securite_humaine.Types_activites_securite_alimentaire'
    ),
    makeSet(
      'How many mediations did CGC perform in the community?',
      'ampi__Number_Response__c',
      'form.Mediation_types_de_conflit.Mediations_realisees'
    ),
    makeSet(
      'How many mediations have been successfully completed by the CGC?',
      'ampi__Number_Response__c',
      'form.Mediation_types_de_conflit.Mediations_reussies'
    ),
    makeSet(
      'What are the most common types of conflict in this village?',
      'ampi__Text_Response__c',
      'form.Mediation_types_de_conflit.Conflits_plus_frequents'
    ),
    makeSet(
      'What actions did the CGC take to prevent conflict?',
      'ampi__Text_Response__c',
      'form.Prevention_gestion_conflit.Actions_prevention_conflit'
    ),
    makeSet(
      'What actions did the CGC take to manage conflict?',
      'ampi__Text_Response__c',
      'form.Prevention_gestion_conflit.Actions_gestion_conflit'
    ),
    makeSet(
      'What actions has the CGC taken to avoid conflict or consolidate peace?',
      'ampi__Text_Response__c',
      'form.Prevention_gestion_conflit.Actions_consolidation_paix'
    ),
    makeSet(
      'How many meetings has the CGC organized to promote peace at the community level?',
      'ampi__Number_Response__c',
      'form.Promotion_Paix.Rencontre_promotion_paix'
    ),
    makeSet(
      'How many meetings has the CGC organized with other communities to promote peace?',
      'ampi__Number_Response__c',
      'form.Promotion_Paix.Rencontre_autres_communautes_promotion_paix'
    ),
    makeSet(
      'How many meetings has the CGC organized with foreign communities to promote peace?',
      'ampi__Number_Response__c',
      'form.Promotion_Paix.Rencontres_communautes_etrangeres_promotion_paix'
    ),
    makeSet(
      'What types of activities does the GSC undertake to promote peace?',
      'ampi__Text_Response__c',
      'form.Promotion_Paix.Type_activites_promotion_paix'
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
