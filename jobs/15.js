// UPSERT PARENT SUBMISSION ====================================================
upsert(
  'ampi__Submission__c',
  'Submission_ID__c',
  fields(
    field('ampi__Description__c', dataValue('form.@name')),
    field(
      'Location__latitude__s',
      state => state.data.form.position_gps.split(' ')[0]
    ),
    field('Location__longitude__s', state => state.data.form.position_gps.split(' ')[1]),
    field('Submission_ID__c', dataValue('id')),
    relationship(
      'Project__r',
      'Project_ID__c',
      `${state.data.form.fixture_localization.village}-CEP`
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
        fieldSet[b] = dataValue(c)(state);
        break;

      case 'ampi__Number_Response__c':
        fieldSet.ampi__Response_Type__c = 'Number';
        fieldSet[b] = parseInt(dataValue(c)(state));
        break;

      case 'ampi__Text_Response__c':
        fieldSet.ampi__Response_Type__c = 'Qualitative';
        fieldSet[b] = dataValue(c)(state);
        break;

      default:
        break;
    }

    return fieldSet;
  }

  state.fieldSets = [
    makeSet(
      'department',
      'ampi__Picklist_Response__c',
      'form.fixture_localization.department'
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
    makeSet('pays', 'ampi__Picklist_Response__c', 'form.pays'),
    makeSet('Project', 'ampi__Picklist_Response__c', 'form.projet'),
    makeSet(
      'Month of collection',
      'ampi__Picklist_Response__c',
      'form.mois_de_collecte'
    ),
    makeSet(
      'Number of women should be between 0 and 17',
      'ampi__Number_Response__c',
      'form.composition_cgc.composition.COMPfem_nombre_femmes'
    ),
    makeSet(
      'Number of girls must be between 0 and 17',
      'ampi__Number_Response__c',
      'form.composition_cgc.composition.COMPfil_nombre_filles'
    ),
    makeSet(
      'Number of men should be between 0 and 17',
      'ampi__Number_Response__c',
      'form.composition_cgc.composition.COMPhom_nombre_hommes'
    ),
    makeSet(
      'Number of boys should be between 0 and 17',
      'ampi__Number_Response__c',
      'form.composition_cgc.composition.COMPgar_nombre_garcons'
    ),
    makeSet(
      'Total CMC members',
      'ampi__Number_Response__c',
      'form.composition_cgc.composition.total_membres_CGC'
    ),
    makeSet(
      'Is the CMC Coordinator a man or a woman?',
      'ampi__Picklist_Response__c',
      'form.composition_cgc.composition.coordonnateur_du_cgc_homme_ou_femme'
    ),
    makeSet(
      'Total number of members is <output value="#form.composition_cgc.composition.total_membres_CGC" .> Is this correct?',
      'ampi__Picklist_Response__c',
      'form.composition_cgc.verification_nombre.correct_nombre'
    ),
    makeSet(
      'How were the current CMC members selected?',
      'ampi__Picklist_Response__c',
      'form.composition_cgc.choix_des_membres.COMPchoix_choix_cgc'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.composition_cgc.choix_des_membres.prciser_autre'
    ),
    makeSet(
      'Have you established a mandate for CMC members?',
      'ampi__Picklist_Response__c',
      'form.composition_cgc.choix_des_membres.COMPmand_mandat_cgc'
    ),
    makeSet(
      'What is the duration of this mandate? (specify the duration in number of months)',
      'ampi__Number_Response__c',
      'form.composition_cgc.choix_des_membres.COMPmandx1_duree_mandat'
    ),
    makeSet(
      'Can you show me the book of minutes if you have one?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.vu_documents.EDDpv_cahier_pv'
    ),
    makeSet(
      'Can you show me the financial management.community fund document if you have one?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.vu_documents.EDDcgf_cahier_gestion_financiere'
    ),
    makeSet(
      'Can you show me the (most recent) Action Plan if you have one?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.vu_documents.EDDpa_plan_action'
    ),
    makeSet(
      'Can you show me the Rules of Procedure?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.vu_documents.EDDri_reglement_interieur'
    ),
    makeSet(
      'Can you show me the vision of the community?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.vu_documents.EDDvc_vision_communaute'
    ),
    makeSet(
      'Can you show me the seal of the CMC or the EIG?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.vu_documents.EDDca_cachet'
    ),
    makeSet(
      'Can you show me the bank account documents if the CMC has one?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.vu_documents.EDDdcb_document_bancaire'
    ),
    makeSet(
      'Can you show me the legal status?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.vu_documents.EDDsj_statut_juridique'
    ),
    makeSet(
      'Other',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.vu_documents.EDD_autre'
    ),
    makeSet(
      'Does the CMC hold meetings',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.reunion_pv.RCPV1_reunions'
    ),
    makeSet(
      'On average, how many meetings per month',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.reunion_pv.RCPV2_moyenne_reunions_par_mois'
    ),
    makeSet(
      'Why the CMC did not hold any meeting?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.reunion_pv.pourquoi_CGC_pas_reunion'
    ),
    makeSet(
      'Look at the CMCs Book of minutes and observeIs the answer to the previous question confirmed in the book of minutes?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.reunion_pv.RCPV3_regarde_cahier_pv'
    ),
    makeSet(
      'Look at the CMC PV notebook and observe Is the PV notebook regularly filled in with a PV for each meeting?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.reunion_pv.RCPV4_cahier_pv_regulier'
    ),
    makeSet(
      'Ask the questionDoes the CMC have an action plan?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.plan_action.plan_action'
    ),
    makeSet(
      'Has the action plan changed in the last three months?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.plan_action.changement_plan_action'
    ),
    makeSet(
      'what are these changes?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.plan_action.PA_changements'
    ),
    makeSet(
      'Look at the CMC action plan and checkIs the respondents response to the previous question confirmed by what is mentioned in the CMC action plan?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.plan_action.PAx1confirm_action_plan'
    ),
    makeSet(
      'In the last three months, have you shared the progress of implementing the action plan with the community?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.partage_plan_daction.PPAx1_partage_progres'
    ),
    makeSet(
      'In the last three months, have you shared your action plan with the managers of a health facility or have you collaborated with them to implement the action plan?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.partage_plan_daction.PPAx2_partage_structure_sanitaire'
    ),
    makeSet(
      'In the last three months, have you shared your action plan with the leaders of an educational structure or have you collaborated with them to implement the action plan?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.partage_plan_daction.PPAx3_partage_structure_educative'
    ),
    makeSet(
      'In the last three months, have you shared your action plan with or collaborated with religious leaders in your community to implement the action plan?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.partage_plan_daction.PPAx4_partage_leaders_religieux'
    ),
    makeSet(
      'In the last three months, have you shared your action plan with the village leader or have you worked with him.her to implement the Action Plan?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.partage_plan_daction.PPAx5_partage_chef_village'
    ),
    makeSet(
      'In the last three months, have you shared your action plan with local elected officials or have you worked with them to implement the action plan?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.partage_plan_daction.PPAx6_partage_elus_locaux'
    ),
    makeSet(
      'In the last three months, how many times have you spoken with or contacted local authorities in order to align your action plan with that of the authorities?"',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.partage_plan_daction.PPAx7_nbre_partage_plan_action'
    ),
    makeSet(
      'Was the CMC trained?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.formation_cgc.CGC_forme'
    ),
    makeSet(
      'Since the beginning of the program, has the CMC been trained on the following themes',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.formation_cgc.formations_CGC_suivants'
    ),
    makeSet(
      'CMC Roles and Responsibilities',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.formation_cgc.FCGCx1_roles_responsabilites'
    ),
    makeSet(
      'Protection of the child',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.formation_cgc.FCGCx2_protection_enfant'
    ),
    makeSet(
      'Social Mobilization',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.formation_cgc.FCGCx3_mobilisation_sociale'
    ),
    makeSet(
      'Management of IGAs',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.formation_cgc.FCGCx4_gestion_agr'
    ),
    makeSet(
      'Decentralization',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.formation_cgc.FCGCx5_decentralisation'
    ),
    makeSet(
      'Micro-credit',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.formation_cgc.FCGCx6_microcredit'
    ),
    makeSet(
      'Has the CMC Financial Officer shared the financial situation of the community fund with the other CMC members?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.question9.gestion_financire.GFCCx1_partage_caisse_membres_cgc'
    ),
    makeSet(
      'Has the CMC Financial Officer shared the financial situation of the community fund with the class participants?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.question9.gestion_financire.GFCCx2_partage-participants_classe'
    ),
    makeSet(
      'What is the amount of in the community fund?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.question9.gestion_financire.GFCCx3_montant_caisse'
    ),
    makeSet(
      'How many men have contributed to the community fund?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.question9.gestion_financire.GFCCx4_hommes_cotise'
    ),
    makeSet(
      'How many women have contributed to the community fund?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.question9.gestion_financire.GFCCx5_femmes_cotise'
    ),
    makeSet(
      'In the last three months, has your bank account been used?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.question9.compte_bancaire.GFCBx1_utilsation_compte_bancaire'
    ),
    makeSet(
      'Look at the bank account documents and observeIs the respondents answer to the previous question confirmed by what is mentioned in the bank account documents?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.question9.compte_bancaire.GFCBx2_regardez_documents'
    ),
    makeSet(
      'Ask the questionHas the CMC Financial Officer shared the financial situation of the bank account (amount, money management, purchases) with the other CMC members during last month?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.question9.compte_bancaire.GFCBx4_partage_finance_membres_cgc'
    ),
    makeSet(
      'When was the last time the CMC Financial Officer shared the financial situation of the bank account (amount, money management, purchases) with the class participants?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.question9.compte_bancaire.GFCBx5_partage_finance_participants'
    ),
    makeSet(
      'Has the CMC received a Development Support Fund (DSF)?',
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.renforcement_conomique.FAD'
    ),
    makeSet(
      'What is the amount the CMC received from the DSF?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.renforcement_conomique.FAD_montant_recu'
    ),
    makeSet(
      "How did the CMC make use of the Development Support Fund' (Do not read the answers; Circle the codes corresponding to the answers closest to what CMC members say)",
      'ampi__Picklist_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.renforcement_conomique.FAD_utilisation'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.renforcement_conomique.prciser_autre'
    ),
    makeSet(
      'What is the overall amount the CMC has given in individual loans in the last three months?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.renforcement_conomique.FADpretx1_montant_pret_accorde'
    ),
    makeSet(
      'How many people benefited from these individual loans?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.renforcement_conomique.FADpretx2_nbre_personnes_beneficiaires'
    ),
    makeSet(
      'How many villages have been sensitized?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_au_cours_des_3_derniers_mois.Action_village_sensibilise'
    ),
    makeSet(
      'Why did not the CMC sensitised any village meeting during the past month?',
      'ampi__Text_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_au_cours_des_3_derniers_mois.pourquoi_le_cgc_na_sensibilis_aucun_village_durant_le_mois_pass'
    ),
    makeSet(
      'How many girls have escaped excision?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_au_cours_des_3_derniers_mois.Action_filles_echappe_excision'
    ),
    makeSet(
      'How many child marriages have been avoided as a result of CMC efforts?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_au_cours_des_3_derniers_mois.Action_mariage_enfant_evite'
    ),
    makeSet(
      'How many children are enrolled in the Civil State thanks to the efforts of the CMC?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_au_cours_des_3_derniers_mois.Action_enfant_inscrit_etat_civil'
    ),
    makeSet(
      'How many meetings with the school authorities and partners have been organised?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_au_cours_des_3_derniers_mois.Action_reunion_ecole'
    ),
    makeSet(
      'How many meetings were held with representatives of other associations in or outside the village',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_au_cours_des_3_derniers_mois.Action_reunions_associations'
    ),
    makeSet(
      'Ask the questionIn the last three months, how many actions have you carried out in the governance sector (civil status, womens leadership, etc.)?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_gesee.Action_gouvernance'
    ),
    makeSet(
      'In the last three months, how many actions have you carried out in the education sector (promotion of schooling...)',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_gesee.Action_education'
    ),
    makeSet(
      'In the last three months, how many actions have you carried out in the health sector (vaccination, NPC, CPON, AME, ORS, etc.)?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_gesee.Action_sante'
    ),
    makeSet(
      'In the last three months, how many actions have you carried out in the environmental sector (cleaning session, awareness raising on reforestation, abandonment of defecation in the open air, improved stoves, etc.)?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_gesee.Action_environnement'
    ),
    makeSet(
      'In the last three months, how many actions have you carried out in the economic sector?',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_gesee.Action_economie'
    ),
    makeSet(
      'Total shares GESEE',
      'ampi__Number_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_gesee.nombre_action_GESEE'
    ),
    makeSet(
      'Why did not the CMC realise any action during the past month?',
      'ampi__Text_Response__c',
      'form.gestion_du_cgc.action_plan.actions_entreprises_par_le_cgc.actions_gesee.pourquoi_cgc_pas_realise_action'
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
