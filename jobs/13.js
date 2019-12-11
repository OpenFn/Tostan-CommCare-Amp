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
        fieldSet.ampi__Number_Response__c = null;
        fieldSet.ampi__Text_Response__c = null;
        break;

      case 'ampi__Number_Response__c':
        fieldSet.ampi__Response_Type__c = 'Number';
        fieldSet.ampi__Picklist_Response__c = null;
        fieldSet.ampi__Text_Response__c = null;
        break;

      case 'ampi__Text_Response__c':
        fieldSet.ampi__Response_Type__c = 'Qualitative';
        fieldSet.ampi__Picklist_Response__c = null;
        fieldSet.ampi__Number_Response__c = null;
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
      'Existence of a PDC (Municipal Development Plan) in progress',
      'ampi__Picklist_Response__c',
      'form.plan_de_dveloppement_communal.pdc'
    ),
    makeSet(
      'Ask to see the PDC',
      'ampi__Picklist_Response__c',
      'form.plan_de_dveloppement_communal.vu_pdc'
    ),
    makeSet(
      'measures to protect the child against violence, abuse, exploitation',
      'ampi__Picklist_Response__c',
      'form.le_pdc_prend-il_en_compte_les_besoins_des_enfants_dans_les_domaines_suivant.besoins.prot'
    ),
    makeSet(
      'measures to strengthen birth registration',
      'ampi__Picklist_Response__c',
      'form.le_pdc_prend-il_en_compte_les_besoins_des_enfants_dans_les_domaines_suivant.besoins.enreg'
    ),
    makeSet(
      'measures to promote and control abandonment of excision',
      'ampi__Picklist_Response__c',
      'form.le_pdc_prend-il_en_compte_les_besoins_des_enfants_dans_les_domaines_suivant.besoins.aband'
    ),
    makeSet(
      'measures to strengthen prevention or response services to cases of violence, abuse, exploitation',
      'ampi__Picklist_Response__c',
      'form.le_pdc_prend-il_en_compte_les_besoins_des_enfants_dans_les_domaines_suivant.besoins.violence'
    ),
    makeSet(
      'early childhood',
      'ampi__Picklist_Response__c',
      'form.le_pdc_prend-il_en_compte_les_besoins_des_enfants_dans_les_domaines_suivant.besoins.petite_enf'
    ),
    makeSet(
      'health and nutrition',
      'ampi__Picklist_Response__c',
      'form.le_pdc_prend-il_en_compte_les_besoins_des_enfants_dans_les_domaines_suivant.besoins.sante_nutri'
    ),
    makeSet(
      'education',
      'ampi__Picklist_Response__c',
      'form.le_pdc_prend-il_en_compte_les_besoins_des_enfants_dans_les_domaines_suivant.besoins.education'
    ),
    makeSet(
      'Social Protection',
      'ampi__Picklist_Response__c',
      'form.le_pdc_prend-il_en_compte_les_besoins_des_enfants_dans_les_domaines_suivant.besoins.protection_sociale'
    ),
    makeSet(
      'Number of hospitals (within 5km)',
      'ampi__Number_Response__c',
      'form.nombre_de_structures_sanitaires_fonctionnelles_dans_la_cl_dans_un_rayon_de_.sanitaires.nombre_dhopitaux_dans_un_rayon_de_5km'
    ),
    makeSet(
      'Number of health posts (within 5km)',
      'ampi__Number_Response__c',
      'form.nombre_de_structures_sanitaires_fonctionnelles_dans_la_cl_dans_un_rayon_de_.sanitaires.poste'
    ),
    makeSet(
      'Number of health huts (within a radius of 5km)',
      'ampi__Number_Response__c',
      'form.nombre_de_structures_sanitaires_fonctionnelles_dans_la_cl_dans_un_rayon_de_.sanitaires.cases'
    ),
    makeSet(
      'number of people trained on FGC . Sexual Abuse Treatment in these hospitals',
      'ampi__Number_Response__c',
      'form.nombre_de_structures_sanitaires_fonctionnelles_dans_la_cl_dans_un_rayon_de_.sanitaires.nombre_de_personnes_formes_sur_lexcision__sur_la_prise_en_charge_des_violen'
    ),
    makeSet(
      'number of people trained on FGM . Sexual Assault Management in these health posts',
      'ampi__Number_Response__c',
      'form.nombre_de_structures_sanitaires_fonctionnelles_dans_la_cl_dans_un_rayon_de_.sanitaires.personnes'
    ),
    makeSet(
      'number of people trained on FGC . Sexual Assault Management in these health huts',
      'ampi__Number_Response__c',
      'form.nombre_de_structures_sanitaires_fonctionnelles_dans_la_cl_dans_un_rayon_de_.sanitaires.cases_personnes'
    ),
    makeSet(
      'High Schools',
      'ampi__Number_Response__c',
      'form.nombre_de_structures_ducatives_fonctionnelles_dans_la_cl_dans_un_rayon_de_5.educative.lyces'
    ),
    makeSet(
      'middle School',
      'ampi__Number_Response__c',
      'form.nombre_de_structures_ducatives_fonctionnelles_dans_la_cl_dans_un_rayon_de_5.educative.collges'
    ),
    makeSet(
      'Primary schools',
      'ampi__Number_Response__c',
      'form.nombre_de_structures_ducatives_fonctionnelles_dans_la_cl_dans_un_rayon_de_5.educative.ecoles_primaires'
    ),
    makeSet(
      'Structures for early childhood',
      'ampi__Number_Response__c',
      'form.nombre_de_structures_ducatives_fonctionnelles_dans_la_cl_dans_un_rayon_de_5.educative.structures_pour_la_petite_enfance'
    ),
    makeSet(
      'Structures of vocational education',
      'ampi__Number_Response__c',
      'form.nombre_de_structures_ducatives_fonctionnelles_dans_la_cl_dans_un_rayon_de_5.educative.structures_denseignement_professionnel'
    ),
    makeSet(
      'SDDC (Departmental Department of Community Development)',
      'ampi__Number_Response__c',
      'form.nombre_de_services_sociaux_fonctionnels_dans_la_cl_dans_un_rayon_de_15km.services_sociaux_et_travailleurs.sddc_service_dpartemental_de_dveloppement_communautaire'
    ),
    makeSet(
      'SDAS (Departmental Service of Social Action)',
      'ampi__Number_Response__c',
      'form.nombre_de_services_sociaux_fonctionnels_dans_la_cl_dans_un_rayon_de_15km.services_sociaux_et_travailleurs.sdas_service_dpartemental_de_laction_sociale'
    ),
    makeSet(
      'CPRS (Center for Promotion and Social Reinsertion)',
      'ampi__Number_Response__c',
      'form.nombre_de_services_sociaux_fonctionnels_dans_la_cl_dans_un_rayon_de_15km.services_sociaux_et_travailleurs.cprs_centre_de_promotion_et_de_rinsertion_sociale'
    ),
    makeSet(
      'AEMO (Open Educational Action)',
      'ampi__Number_Response__c',
      'form.nombre_de_services_sociaux_fonctionnels_dans_la_cl_dans_un_rayon_de_15km.services_sociaux_et_travailleurs.aemo_action_educative_en_milieu_ouvert'
    ),
    makeSet(
      'Commissariats . Gendarmerie Brigades',
      'ampi__Number_Response__c',
      'form.nombre_de_services_sociaux_fonctionnels_dans_la_cl_dans_un_rayon_de_15km.services_sociaux_et_travailleurs.commissariats_brigades_de_gendarmerie'
    ),
    makeSet(
      'SDDC (Departmental Department of Community Development)',
      'ampi__Number_Response__c',
      'form.Nombre_total_de_travailleurs_dans_ces_services_sociaux.travailleurs_ds_les_services.sddc_service_dpartemental_de_dveloppeme'
    ),
    makeSet(
      'SDAS (Departmental Service of Social Action)',
      'ampi__Number_Response__c',
      'form.Nombre_total_de_travailleurs_dans_ces_services_sociaux.travailleurs_ds_les_services.sdas_service_dpartemental_de_laction'
    ),
    makeSet(
      'CPRS (Center for Promotion and Social Reinsertion)',
      'ampi__Number_Response__c',
      'form.Nombre_total_de_travailleurs_dans_ces_services_sociaux.travailleurs_ds_les_services.cprs_centre_de_promotion_et_de_rinsertion_sociale'
    ),
    makeSet(
      'AEMO (Open Educational Action)',
      'ampi__Number_Response__c',
      'form.Nombre_total_de_travailleurs_dans_ces_services_sociaux.travailleurs_ds_les_services.aemo_action_educative_en_milieu_ouvert'
    ),
    makeSet(
      'Commissariats . Gendarmerie Brigades',
      'ampi__Number_Response__c',
      'form.Nombre_total_de_travailleurs_dans_ces_services_sociaux.travailleurs_ds_les_services.commissariats_brigades_de_gendarmerie'
    ),
    makeSet(
      'SDDC (Departmental Department of Community Development)',
      'ampi__Number_Response__c',
      'form.nombre_de_travailleurs_formes_sur_lexcision.formation_trav.sddc_service_dpartemental_de_dveloppement_communautaire'
    ),
    makeSet(
      'SDAS (Departmental Service of Social Action)',
      'ampi__Number_Response__c',
      'form.nombre_de_travailleurs_formes_sur_lexcision.formation_trav.sdas_service_dpartemental_de_laction_sociale'
    ),
    makeSet(
      'CPRS (Center for Promotion and Social Reinsertion)',
      'ampi__Number_Response__c',
      'form.nombre_de_travailleurs_formes_sur_lexcision.formation_trav.cprs_centre_de_promotion_et_de_rinsertion_sociale'
    ),
    makeSet(
      'AEMO (Open Educational Action)',
      'ampi__Number_Response__c',
      'form.nombre_de_travailleurs_formes_sur_lexcision.formation_trav.aemo_action_educative_en_milieu_ouvert'
    ),
    makeSet(
      'Commissariats . Gendarmerie Brigades',
      'ampi__Number_Response__c',
      'form.nombre_de_travailleurs_formes_sur_lexcision.formation_trav.commissariats_brigades_de_gendarmerie'
    ),
    makeSet(
      'SDDC (Departmental Department of Community Development)',
      'ampi__Number_Response__c',
      'form.nombre_de_travailleurs_formes_en_protection_de_lenfant.formation.sddc_service_dpartemental_de_dveloppement_communautaire'
    ),
    makeSet(
      'SDAS (Departmental Service of Social Action)',
      'ampi__Number_Response__c',
      'form.nombre_de_travailleurs_formes_en_protection_de_lenfant.formation.sdas_service_dpartemental_de_laction_sociale'
    ),
    makeSet(
      'CPRS (Center for Promotion and Social Reinsertion)',
      'ampi__Number_Response__c',
      'form.nombre_de_travailleurs_formes_en_protection_de_lenfant.formation.cprs_centre_de_promotion_et_de_rinsertion_sociale'
    ),
    makeSet(
      'AEMO (Open Educational Action)',
      'ampi__Number_Response__c',
      'form.nombre_de_travailleurs_formes_en_protection_de_lenfant.formation.aemo_action_educative_en_milieu_ouvert'
    ),
    makeSet(
      'Commissariats . Gendarmerie Brigades',
      'ampi__Number_Response__c',
      'form.nombre_de_travailleurs_formes_en_protection_de_lenfant.formation.commissariats_brigades_de_gendarmerie'
    ),
    makeSet(
      'Boys aged 12 to 17',
      'ampi__Number_Response__c',
      'form.nombre_total_denfants_dans_la_cl.enfants_dans_la_cl.garons_12_17'
    ),
    makeSet(
      'Girls aged 12 to 17',
      'ampi__Number_Response__c',
      'form.nombre_total_denfants_dans_la_cl.enfants_dans_la_cl.filles_12_17'
    ),
    makeSet(
      'Boys aged 05 to 11',
      'ampi__Number_Response__c',
      'form.nombre_total_denfants_dans_la_cl.enfants_dans_la_cl.garons_05_11_ans'
    ),
    makeSet(
      'Girls aged from 05 to 11 years',
      'ampi__Number_Response__c',
      'form.nombre_total_denfants_dans_la_cl.enfants_dans_la_cl.filles_5_11'
    ),
    makeSet(
      'Boys aged 00 to 04 years',
      'ampi__Number_Response__c',
      'form.nombre_total_denfants_dans_la_cl.enfants_dans_la_cl.garons_0_4'
    ),
    makeSet(
      'Girls aged from 00 to 04 years',
      'ampi__Number_Response__c',
      'form.nombre_total_denfants_dans_la_cl.enfants_dans_la_cl.filles_0_4'
    ),
    makeSet(
      'Boys in college',
      'ampi__Number_Response__c',
      'form.nombre_denfants_qui_frquentent_les_structures_ducatives_au_cours_des_12_der.frquentation_structures_ducatives.garons_college'
    ),
    makeSet(
      'Girls in college',
      'ampi__Number_Response__c',
      'form.nombre_denfants_qui_frquentent_les_structures_ducatives_au_cours_des_12_der.frquentation_structures_ducatives.filles_college'
    ),
    makeSet(
      'Boys in primary',
      'ampi__Number_Response__c',
      'form.nombre_denfants_qui_frquentent_les_structures_ducatives_au_cours_des_12_der.frquentation_structures_ducatives.garons_primaire'
    ),
    makeSet(
      'Girls in primary',
      'ampi__Number_Response__c',
      'form.nombre_denfants_qui_frquentent_les_structures_ducatives_au_cours_des_12_der.frquentation_structures_ducatives.filles_primaire'
    ),
    makeSet(
      'Boys at preschool',
      'ampi__Number_Response__c',
      'form.nombre_denfants_qui_frquentent_les_structures_ducatives_au_cours_des_12_der.frquentation_structures_ducatives.garons_prescolaire'
    ),
    makeSet(
      'Girls at preschool',
      'ampi__Number_Response__c',
      'form.nombre_denfants_qui_frquentent_les_structures_ducatives_au_cours_des_12_der.frquentation_structures_ducatives.filles_presc'
    ),
    makeSet(
      'Boys 12-23 months of age who received all vaccinations recommended by the National Immunization Program prior to their first birthday (BCG + Polio 0 . DTCP . HepB 1 + Polio 1 . DTCP . HepB 2 + Polio 2 . DTCP . HepB 3 + Polio 3 . VAR and VAA . VIT A)',
      'ampi__Number_Response__c',
      'form.protection.garons_vac'
    ),
    makeSet(
      '12-23-month-old girls who received all immunizations recommended by the National Immunization Program prior to their first birthday (BCG + Polio 0 . DTCP . HepB 1 + Polio 1 . DTCP . HepB 2 + Polio 2 . DTCP . HepB 3 + Polio 3 . VAR and VAA . VIT A)',
      'ampi__Number_Response__c',
      'form.protection.filles_vac'
    ),
    makeSet(
      'Boys aged 0 to 17 not registered in the civil registry',
      'ampi__Number_Response__c',
      'form.protection.garons_non_enr'
    ),
    makeSet(
      'Girls aged 0 to 17 not registered in the civil registry',
      'ampi__Number_Response__c',
      'form.protection.filles_non_enr'
    ),
    makeSet(
      'Total number of male births in the last 12 months',
      'ampi__Number_Response__c',
      'form.protection.garons_nes'
    ),
    makeSet(
      'Total number of female births in the last 12 months',
      'ampi__Number_Response__c',
      'form.protection.filles_nees'
    ),
    makeSet(
      'Number of male births registered in the past 12 months',
      'ampi__Number_Response__c',
      'form.protection.garons_enr'
    ),
    makeSet(
      'Number of births of girls registered in the past 12 months',
      'ampi__Number_Response__c',
      'form.protection.filles_enr'
    ),
    makeSet(
      'Number of local elected representatives trained on the participatory budget in the last 12 months',
      'ampi__Number_Response__c',
      'form.clae.nombre_dlus_locaux_forms_sur_le_budget_participatif_au_cours_des_12_dernier'
    ),
    makeSet(
      'Does the CL have a court for children (Municipal Council of Children)',
      'ampi__Picklist_Response__c',
      'form.clae.la_cl_dispose-t-elle_dune_instance_pour_les_enfants_conseil_municipal_des_e'
    ),
    makeSet(
      'Has CL organized a consultation of children and women on the budget in the last 12 months?',
      'ampi__Picklist_Response__c',
      'form.clae.consulta'
    ),
    makeSet(
      'Did CL organize a budget orientation session that included children and women in the last 12 months?',
      'ampi__Picklist_Response__c',
      'form.clae.la_cl_a-t-elle_organis_une_session_dorientation_incluant_les_enfants_et_les'
    ),
    makeSet(
      'Does the CL have a budget that includes child care, gender and human rights?',
      'ampi__Picklist_Response__c',
      'form.clae.la_cl_dispose-t-elle_dun_budget_incluant_une_prise_en_charge_des_enfants_du'
    ),
    makeSet(
      'f yes, is the execution of this budget the subject of a balance sheet?',
      'ampi__Picklist_Response__c',
      'form.clae.si_oui_lexcution_de_ce_budget_fait-elle_lobjet_dun_bilan'
    ),
    makeSet(
      'Has CL been financially supported to improve its investment against identified needs in the priority sectors for children?',
      'ampi__Picklist_Response__c',
      'form.clae.CL_a-t-elle_ete_soutenue'
    ),
    makeSet(
      'If so, specify by whom and for what amount?',
      'ampi__Text_Response__c',
      'form.clae.par_qui'
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
