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
      'Is there a child protection commission at the CGC level?',
      'ampi__Picklist_Response__c',
      'form.commission_protection'
    ),
    makeSet(
      'Boys aged 13 to 18',
      'ampi__Number_Response__c',
      'form.nombre_total_denfants_dans_le_village.enfants_dans_le_village.garons_13_18'
    ),
    makeSet(
      'Girls aged 13 to 18',
      'ampi__Number_Response__c',
      'form.nombre_total_denfants_dans_le_village.enfants_dans_le_village.filles_13_18'
    ),
    makeSet(
      'Boys aged from 6 to 12 years old',
      'ampi__Number_Response__c',
      'form.nombre_total_denfants_dans_le_village.enfants_dans_le_village.garons_6_12'
    ),
    makeSet(
      'Girls aged from 6 to 12 years',
      'ampi__Number_Response__c',
      'form.nombre_total_denfants_dans_le_village.enfants_dans_le_village.filles_6_12'
    ),
    makeSet(
      'Boys aged from 00 to 05 years',
      'ampi__Number_Response__c',
      'form.nombre_total_denfants_dans_le_village.enfants_dans_le_village.garons_0_5'
    ),
    makeSet(
      'Girls aged from 00 to 05 years',
      'ampi__Number_Response__c',
      'form.nombre_total_denfants_dans_le_village.enfants_dans_le_village.filles_0_5'
    ),
    makeSet(
      'Boys in college',
      'ampi__Number_Response__c',
      'form.nombre_denfants_qui_frquentent_les_structures_ducatives_au_cours_des_12_der.frquentation_structures_ducatives.garons_coll'
    ),
    makeSet(
      'Girls in college',
      'ampi__Number_Response__c',
      'form.nombre_denfants_qui_frquentent_les_structures_ducatives_au_cours_des_12_der.frquentation_structures_ducatives.filles_coll'
    ),
    makeSet(
      'Boys in primary',
      'ampi__Number_Response__c',
      'form.nombre_denfants_qui_frquentent_les_structures_ducatives_au_cours_des_12_der.frquentation_structures_ducatives.garons_prim'
    ),
    makeSet(
      'Girls in primary',
      'ampi__Number_Response__c',
      'form.nombre_denfants_qui_frquentent_les_structures_ducatives_au_cours_des_12_der.frquentation_structures_ducatives.filles_prim'
    ),
    makeSet(
      'Boys at preschool',
      'ampi__Number_Response__c',
      'form.nombre_denfants_qui_frquentent_les_structures_ducatives_au_cours_des_12_der.frquentation_structures_ducatives.garons_prec'
    ),
    makeSet(
      'Girls at preschool',
      'ampi__Number_Response__c',
      'form.nombre_denfants_qui_frquentent_les_structures_ducatives_au_cours_des_12_der.frquentation_structures_ducatives.filles_presc'
    ),
    makeSet(
      'Total number of male births in the last 12 months',
      'ampi__Number_Response__c',
      'form.naissance_et_enregistrement.naissance_et_enregistrement.garons_nes'
    ),
    makeSet(
      'Total number of girls births in the last 12 months',
      'ampi__Number_Response__c',
      'form.naissance_et_enregistrement.naissance_et_enregistrement.filles_nees'
    ),
    makeSet(
      'Number of male births registered in the past 12 months',
      'ampi__Number_Response__c',
      'form.naissance_et_enregistrement.naissance_et_enregistrement.garons_enr'
    ),
    makeSet(
      'Number of girls births registered in the past 12 months',
      'ampi__Number_Response__c',
      'form.naissance_et_enregistrement.naissance_et_enregistrement.filles_enr'
    ),
    makeSet(
      'Number of unregistered boys under one year of age',
      'ampi__Number_Response__c',
      'form.naissance_et_enregistrement.naissance_et_enregistrement.garons_non_enr'
    ),
    makeSet(
      'Number of unregistered girls under one year of age',
      'ampi__Number_Response__c',
      'form.naissance_et_enregistrement.naissance_et_enregistrement.filles_non_enr'
    ),
    makeSet(
      'Number of boys aged 1 to 18 unregistered',
      'ampi__Number_Response__c',
      'form.naissance_et_enregistrement.naissance_et_enregistrement.garons_18_non_enr'
    ),
    makeSet(
      'Number of girls aged 1 to 18 unregistered',
      'ampi__Number_Response__c',
      'form.naissance_et_enregistrement.naissance_et_enregistrement.filles_18_non_enr'
    ),
    makeSet(
      'Number of boys under the age of 18 who have been victims of sexual violence identified and reported to the GSC in the last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violences.garons_vic'
    ),
    makeSet(
      'Number of girls under the age of 18 who have been victims of sexual violence identified and reported to the GSC in the last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violences.filles_vic'
    ),
    makeSet(
      'specify',
      'ampi__Text_Response__c',
      'form.cas_de_violences.violences.prciser'
    ),
    makeSet(
      'Number of rapes',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violences.viols'
    ),
    makeSet(
      'Number of cases referred to a social service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violences.nombre_de_cas_rfrs_vers_un_service_social'
    ),
    makeSet(
      'Number of referred cases within 72 hours to a health service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violences.nombre_de_cas_rfrs_dans_les_72h_vers_un_service_de_sant'
    ),
    makeSet(
      'Number of cases reported to police . gendarmerie',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violences.nombre_de_cas_signal__la_policegendarmerie'
    ),
    makeSet(
      'Number of males under the age of 18 who are victims of physical violence identified and reported to the GSC in the last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_2.garons_phy'
    ),
    makeSet(
      'Number of girls under the age of 18 who are victims of physical violence identified and reported to the GSC in the last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_2.filles_phys'
    ),
    makeSet(
      'Number of cases referred to a social service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_2.nombre_de_cas_rfrs_vers_un_service_social'
    ),
    makeSet(
      'Number of referred cases within 72 hours to a health service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_2.nombre_de_cas_rfrs_dans_les_72h_vers_un_service_de_sant'
    ),
    makeSet(
      'Number of cases reported to police . gendarmerie',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_2.nombre_de_cas_signal__la_policegendarmerie'
    ),
    makeSet(
      'Number of males under 18 years of abuse identified and reported to GSC in last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_3.garons_phy'
    ),
    makeSet(
      'Number of girls under 18 years of abuse identified and reported to CGC in last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_3.filles_phys'
    ),
    makeSet(
      'Number of cases referred to a social service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_3.nombre_de_cas_rfrs_vers_un_service_social'
    ),
    makeSet(
      'Number of referred cases within 72 hours to a health service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_3.nombre_de_cas_rfrs_dans_les_72h_vers_un_service_de_sant'
    ),
    makeSet(
      'Number of cases reported to police . gendarmerie',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_3.nombre_de_cas_signal__la_policegendarmerie'
    ),
    makeSet(
      'Number of boys under the age of 18 who have been identified and reported to CGC in the last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_4.garons_phy'
    ),
    makeSet(
      'Number of girls under the age of 18 who have been identified and reported to CGC in the last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_4.filles_phys'
    ),
    makeSet(
      'Number of cases referred to a social service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_4.nombre_de_cas_rfrs_vers_un_service_social'
    ),
    makeSet(
      'Number of referred casesto a health service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_4.nombre_de_cas_rfrs_dans_les_72h_vers_un_service_de_sant'
    ),
    makeSet(
      'Number of cases reported to police . gendarmerie',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_4.nombre_de_cas_signal__la_policegendarmerie'
    ),
    makeSet(
      'Number of boys under the age of 18 who have been identified as victims of trafficking and reported to the CGC in the last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_5.garons_phy'
    ),
    makeSet(
      'Number of girls under 18 years of trafficking identified and reported to CGC in last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_5.filles_phys'
    ),
    makeSet(
      'Number of cases referred to a social service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_5.nombre_de_cas_rfrs_vers_un_service_social'
    ),
    makeSet(
      'Number of referred cases to a health service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_5.nombre_de_cas_rfrs_dans_les_72h_vers_un_service_de_sant'
    ),
    makeSet(
      'Number of cases reported to police . gendarmerie',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violence_5.nombre_de_cas_signal__la_policegendarmerie'
    ),
    makeSet(
      'Number of cases of sexual violence suffered by women over 18 identified and reported to CGC in the last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violences_6_.femmes'
    ),
    makeSet(
      'Number of rapes',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violences_6_.femmes_viols'
    ),
    makeSet(
      'Number of cases referred to a social service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violences_6_.nombre_de_cas_rfrs_vers_un_service_social'
    ),
    makeSet(
      'Number of referred cases to a health service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violences_6_.nombre_de_cas_rfrs_dans_les_72h_vers_un_service_de_sant'
    ),
    makeSet(
      'Number of cases reported to police . gendarmerie',
      'ampi__Number_Response__c',
      'form.cas_de_violences.violences_6_.nombre_de_cas_signal__la_policegendarmerie'
    ),
    makeSet(
      'Number of cases of excision in the community in the past 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.excision.femmes'
    ),
    makeSet(
      'Number of rapes',
      'ampi__Number_Response__c',
      'form.cas_de_violences.excision.femmes_viols'
    ),
    makeSet(
      'Number of cases referred to a social service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.excision.nombre_de_cas_rfrs_vers_un_service_social'
    ),
    makeSet(
      'Number of referred cases to a health service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.excision.nombre_de_cas_rfrs_dans_les_72h_vers_un_service_de_sant'
    ),
    makeSet(
      'Number of cases reported to police . gendarmerie',
      'ampi__Number_Response__c',
      'form.cas_de_violences.excision.nombre_de_cas_signal__la_policegendarmerie'
    ),
    makeSet(
      'Number of girls married before the age of 18 in the community in the last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.mariages.filles_mariees'
    ),
    makeSet(
      'Number of girls married before the age of 15 in the community in the last 12 months',
      'ampi__Number_Response__c',
      'form.cas_de_violences.mariages.mariage_15'
    ),
    makeSet(
      'Number of rapes',
      'ampi__Number_Response__c',
      'form.cas_de_violences.mariages.femmes_viols'
    ),
    makeSet(
      'Number of cases referred to a social service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.mariages.nombre_de_cas_rfrs_vers_un_service_social'
    ),
    makeSet(
      'Number of referred cases to a health service',
      'ampi__Number_Response__c',
      'form.cas_de_violences.mariages.nombre_de_cas_rfrs_dans_les_72h_vers_un_service_de_sant'
    ),
    makeSet(
      'Number of cases reported to police . gendarmerie',
      'ampi__Number_Response__c',
      'form.cas_de_violences.mariages.nombre_de_cas_signal__la_policegendarmerie'
    ),
    makeSet(
      'Existing community mechanisms to prevent or respond to these situations of human rights violations',
      'ampi__Text_Response__c',
      'form.mcanismes_communautaires_existants_pour_prvenir_ou_rpondre__ces_situations_'
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
