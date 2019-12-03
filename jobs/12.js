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
      `${state.data.form.identification.fixture_localization.village}-Post CEP`
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

  function repeatSet(a, b, i, c) {
    const fieldSet = {
      Question_ID__c: `${pId}-${a}-${i}`,
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

  function makeRepeat(desc, dest, pathToArray, key) {
    const array = dataValue(pathToArray)(state);
    if (array && array.isArray) {
      return array.map((x, i) => {
        const value = x[`${key}`];
        console.log(value);
        return repeatSet(desc, dest, i, value);
      });
    }
    return {};
  }

  state.fieldSets = [
    makeSet(
      'sum violence filles',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_violence_filles'
    ),
    makeSet(
      'sum violence garcons',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_violence_garcons'
    ),
    makeSet(
      'sum violence filles refer',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_violence_filles_refer'
    ),
    makeSet(
      'sum violence garcons refer',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_violence_garcons_refer'
    ),
    makeSet(
      'sum violence traites filles',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_violence_traites_filles'
    ),
    makeSet(
      'sum violence traites garcons',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_violence_traites_garcons'
    ),
    makeSet(
      'sum vtfilles refer',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_vtfilles_refer'
    ),
    makeSet(
      'sum vtgarcons refer',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_vtgarcons_refer'
    ),
    makeSet(
      'sum enfants malnourris filles',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_enfants_malnourris_filles'
    ),
    makeSet(
      'sum enfants malnourris garcon',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_enfants_malnourris_garcon'
    ),
    makeSet(
      'sum etat civil filles',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_etat_civil_filles'
    ),
    makeSet(
      'sum etat civil garcons',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_etat_civil_garcons'
    ),
    makeSet(
      'sum etat civil traites filles',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_etat_civil_traites_filles'
    ),
    makeSet(
      'sum etat civil traites garcons',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_etat_civil_traites_garcons'
    ),
    makeSet(
      'sum enfants non inscrit filles',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_enfants_non_inscrit_filles'
    ),
    makeSet(
      'sum enfants non inscrit garcons',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_enfants_non_inscrit_garcons'
    ),
    makeSet(
      'sum enfants non inscrits traites filles',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_enfants_non_inscrits_traites_filles'
    ),
    makeSet(
      'sum enfants non inscrits traites garcons',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_enfants_non_inscrits_traites_garcons'
    ),
    makeSet(
      'sum non vaccines filles',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_non_vaccines_filles'
    ),
    makeSet(
      'sum non vaccines garcons',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_non_vaccines_garcons'
    ),
    makeSet(
      'sum non vaccines traites filles',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_non_vaccines_traites_filles'
    ),
    makeSet(
      'sum non vaccines traites garcons',
      'ampi__Number_Response__c',
      'form.var.var_structures_locales.sum_non_vaccines_traites_garcons'
    ),
    makeSet(
      'sum prot vp filles',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_prot_vp_filles'
    ),
    makeSet(
      'sum prot vp garcons',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_prot_vp_garcons'
    ),
    makeSet(
      'sum prot vp filles ref',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_prot_vp_filles_ref'
    ),
    makeSet(
      'sum prot vp garcons ref',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_prot_vp_garcons_ref'
    ),
    makeSet(
      'sum vp traites filles',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_vp_traites_filles'
    ),
    makeSet(
      'sum vp traites garcons',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_vp_traites_garcons'
    ),
    makeSet(
      'sum vp traites filles ref',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_vp_traites_filles_ref'
    ),
    makeSet(
      'sum vp traites garcons ref',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_vp_traites_garcons_ref'
    ),
    makeSet(
      'sum mal nourris filles',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_mal_nourris_filles'
    ),
    makeSet(
      'sum mal nourris garcons',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_mal_nourris_garcons'
    ),
    makeSet(
      'sum etat civil filles',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_etat_civil_filles'
    ),
    makeSet(
      'sum etat civil garcons',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_etat_civil_garcons'
    ),
    makeSet(
      'sum etat civil traites filles',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_etat_civil_traites_filles'
    ),
    makeSet(
      'sum etat civil traites garcons',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_etat_civil_traites_garcons'
    ),
    makeSet(
      'sum non inscrits filles',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_non_inscrits_filles'
    ),
    makeSet(
      'sum non inscrits garcons',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_non_inscrits_garcons'
    ),
    makeSet(
      'sum non inscrits traites filles',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_non_inscrits_traites_filles'
    ),
    makeSet(
      'sum non inscrits traites garcons',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_non_inscrits_traites_garcons'
    ),
    makeSet(
      'sum non vaccines filles',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_non_vaccines_filles'
    ),
    makeSet(
      'sum non vaccines garcons',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_non_vaccines_garcons'
    ),
    makeSet(
      'sum nv traites filles',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_nv_traites_filles'
    ),
    makeSet(
      'sum nv traites garcons',
      'ampi__Number_Response__c',
      'form.var.var_protection_communautaire.sum_nv_traites_garcons'
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
      'Number of cases of physical violence against registered children',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_physique_group.violence_physique_list.cas_violence_physique'
    ),
    makeSet(
      'Give details for each case recorded',
      'Repeat mapping for multiple responses in repeat group',
      'form.structures_locales.violence_physique_group.violence_physique_list.details_violence_physique'
    ),
    makeSet(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_physique_group.violence_physique_list.details_violence_physique.age'
    ),
    makeSet(
      'Sex',
      'ampi__Picklist_Response__c',
      'form.structures_locales.violence_physique_group.violence_physique_list.details_violence_physique.gender'
    ),
    makeSet(
      'Referred (e)',
      'ampi__Picklist_Response__c',
      'form.structures_locales.violence_physique_group.violence_physique_list.details_violence_physique.referred'
    ),
    makeSet(
      'count if female',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_physique_group.violence_physique_list.details_violence_physique.count_if_female'
    ),
    makeSet(
      'count if male',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_physique_group.violence_physique_list.details_violence_physique.count_if_male'
    ),
    makeSet(
      'count referred girls',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_physique_group.violence_physique_list.details_violence_physique.count_referred_filles'
    ),
    makeSet(
      'count referred boys',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_physique_group.violence_physique_list.details_violence_physique.count_referred_garcons'
    ),
    makeSet(
      'Number of physical abuse cases registered and treated children',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_physique_traites.cas_violence_physique_traites'
    ),
    makeSet(
      "Give details for each case registered and processed",
      'Repeat mapping for multiple responses in repeat group',
      'form.structures_locales.violence_physique_traites.details_violence_physique_traites'
    ),
    makeSet(
      'sex',
      'ampi__Picklist_Response__c',
      'form.structures_locales.violence_physique_traites.details_violence_physique_traites.gender'
    ),
    makeSet(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_physique_traites.details_violence_physique_traites.age'
    ),
    makeSet(
      'Referred (e)',
      'ampi__Picklist_Response__c',
      'form.structures_locales.violence_physique_traites.details_violence_physique_traites.referred'
    ),
    makeSet(
      'count if female',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_physique_traites.details_violence_physique_traites.count_if_female'
    ),
    makeSet(
      'count if male',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_physique_traites.details_violence_physique_traites.count_if_male'
    ),
    makeSet(
      'count referred girls',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_physique_traites.details_violence_physique_traites.count_referred_filles'
    ),
    makeSet(
      'count referred boys',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_physique_traites.details_violence_physique_traites.count_referred_garcons'
    ),
    makeSet(
      'Number of cases of sexual violence against registered children',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_sexuelles.cas_violence_sexuelles'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.structures_locales.violence_sexuelles.details_cas_violence_sexuelles',
      'gender'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_sexuelles.details_cas_violence_sexuelles',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_sexuelles.details_cas_violence_sexuelles',
      'count_if_male'
    ),
    makeSet(
      'Number of sexual abuse cases registered and treated children',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_sexuelles_traites.cas_violences_sexuelles_traitees'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.structures_locales.violence_sexuelles_traites.details_cas_violence_sexuelles',
      'gender'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_sexuelles_traites.details_cas_violence_sexuelles',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.structures_locales.violence_sexuelles_traites.details_cas_violence_sexuelles',
      'count_if_male'
    ),
    makeSet(
      'Number of registered child marriage cases',
      'ampi__Number_Response__c',
      'form.structures_locales.enfants_maries.cas_mariages_enfants'
    ),
    makeRepeat(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.structures_locales.enfants_maries.details_mariages_enfants',
      'age'
    ),
    makeSet(
      'Number of child marriage cases prevented',
      'ampi__Number_Response__c',
      'form.structures_locales.enfants_maries.cas_mariages_empeches'
    ),
    makeSet(
      'Number of reported malnourished children',
      'ampi__Number_Response__c',
      'form.structures_locales.malnourris.cas_enfants_malnourris'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.structures_locales.malnourris.details_enfants_malnourris',
      'gender'
    ),
    makeRepeat(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.structures_locales.malnourris.details_enfants_malnourris',
      'age'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.structures_locales.malnourris.details_enfants_malnourris',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.structures_locales.malnourris.details_enfants_malnourris',
      'count_if_male'
    ),
    makeSet(
      'Number of malnourished children treated',
      'ampi__Number_Response__c',
      'form.structures_locales.malnourris.malnourris_traites'
    ),
    makeSet(
      'Number of unregistered children identified',
      'ampi__Number_Response__c',
      'form.structures_locales.enregistre_etat_civil.enfants_etats_civil'
    ),
    makeSet(
      'sex',
      'ampi__Picklist_Response__c',
      'form.structures_locales.enregistre_etat_civil.details_enfants_etat_civil.gender'
    ),
    makeSet(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.structures_locales.enregistre_etat_civil.details_enfants_etat_civil.age'
    ),
    makeSet(
      'count if female',
      'ampi__Number_Response__c',
      'form.structures_locales.enregistre_etat_civil.details_enfants_etat_civil.count_if_female'
    ),
    makeSet(
      'count if male',
      'ampi__Number_Response__c',
      'form.structures_locales.enregistre_etat_civil.details_enfants_etat_civil.count_if_male'
    ),
    makeSet(
      "Number of cases of non-registered children processed",
      'ampi__Number_Response__c',
      'form.structures_locales.enregistre_etat_civil_traites.enfants_etats_civil_traites'
    ),
    makeSet(
      'sex',
      'ampi__Picklist_Response__c',
      'form.structures_locales.enregistre_etat_civil_traites.details_enfants_etat_civil_traites.gender'
    ),
    makeSet(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.structures_locales.enregistre_etat_civil_traites.details_enfants_etat_civil_traites.age'
    ),
    makeSet(
      'count if female',
      'ampi__Number_Response__c',
      'form.structures_locales.enregistre_etat_civil_traites.details_enfants_etat_civil_traites.count_if_female'
    ),
    makeSet(
      'count if male',
      'ampi__Number_Response__c',
      'form.structures_locales.enregistre_etat_civil_traites.details_enfants_etat_civil_traites.count_if_male'
    ),
    makeSet(
      'Number of school-aged children not enrolled in school',
      'ampi__Number_Response__c',
      'form.structures_locales.enfants_non_inscrits.enfants_non_inscrits'
    ),
    makeSet(
      'sex',
      'ampi__Picklist_Response__c',
      'form.structures_locales.enfants_non_inscrits.details_enfants_non_inscrits.gender'
    ),
    makeSet(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.structures_locales.enfants_non_inscrits.details_enfants_non_inscrits.age'
    ),
    makeSet(
      'count if female',
      'ampi__Number_Response__c',
      'form.structures_locales.enfants_non_inscrits.details_enfants_non_inscrits.count_if_female'
    ),
    makeSet(
      'count if male',
      'ampi__Number_Response__c',
      'form.structures_locales.enfants_non_inscrits.details_enfants_non_inscrits.count_if_male'
    ),
    makeSet(
      'Number of school-aged children not enrolled in school treated',
      'ampi__Number_Response__c',
      'form.structures_locales.enfants_non_inscrits_traites.enfants_non_inscrits_traites'
    ),
    makeSet(
      'sex',
      'ampi__Picklist_Response__c',
      'form.structures_locales.enfants_non_inscrits_traites.details_enfants_non_inscrits.gender'
    ),
    makeSet(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.structures_locales.enfants_non_inscrits_traites.details_enfants_non_inscrits.age'
    ),
    makeSet(
      'count if female',
      'ampi__Number_Response__c',
      'form.structures_locales.enfants_non_inscrits_traites.details_enfants_non_inscrits.count_if_female'
    ),
    makeSet(
      'count if male',
      'ampi__Number_Response__c',
      'form.structures_locales.enfants_non_inscrits_traites.details_enfants_non_inscrits.count_if_male'
    ),
    makeSet(
      'Number of unvaccinated children identified',
      'ampi__Number_Response__c',
      'form.structures_locales.non_vaccines.non_vaccines'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.structures_locales.non_vaccines.details_non_vaccines',
      'gender'
    ),
    makeRepeat(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.structures_locales.non_vaccines.details_non_vaccines',
      'age'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.structures_locales.non_vaccines.details_non_vaccines',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.structures_locales.non_vaccines.details_non_vaccines',
      'count_if_male'
    ),
    makeSet(
      'Number of unvaccinated children treated',
      'ampi__Number_Response__c',
      'form.structures_locales.non_vaccines_traites.non_vaccines_traites'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.structures_locales.non_vaccines_traites.details_non_vaccines',
      'gender'
    ),
    makeRepeat(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.structures_locales.non_vaccines_traites.details_non_vaccines',
      'age'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.structures_locales.non_vaccines_traites.details_non_vaccines',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.structures_locales.non_vaccines_traites.details_non_vaccines',
      'count_if_male'
    ),
    makeSet(
      'Number of cases of physical violence against registered children',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_physique.cas_violence_physique'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_violence_physique.details_violence_physique',
      'gender'
    ),
    makeRepeat(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_physique.details_violence_physique',
      'age'
    ),
    makeRepeat(
      'Referred (e)',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_violence_physique.details_violence_physique',
      'referred'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_physique.details_violence_physique',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_physique.details_violence_physique',
      'count_if_male'
    ),
    makeRepeat(
      'count referred girls',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_physique.details_violence_physique',
      'count_referred_filles'
    ),
    makeRepeat(
      'count referred boys',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_physique.details_violence_physique',
      'count_referred_garcons'
    ),
    makeSet(
      'Number of physical abuse cases registered and treated children',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_physique_traites.cas_violence_physique_traites'
    ),
    makeSet(
      'sex',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_violence_physique_traites.details_violence_physique_traites',
      'gender'
    ),
    makeSet(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_physique_traites.details_violence_physique_traites.age'
    ),
    makeSet(
      'Referred (e)',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_violence_physique_traites.details_violence_physique_traites.referred'
    ),
    makeSet(
      'count if female',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_physique_traites.details_violence_physique_traites.count_if_female'
    ),
    makeSet(
      'count if male',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_physique_traites.details_violence_physique_traites.count_if_male'
    ),
    makeSet(
      '',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_physique_traites.details_violence_physique_traites.count_referred_filles'
    ),
    makeSet(
      '',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_physique_traites.details_violence_physique_traites.count_referred_garcons'
    ),
    makeSet(
      'Number of cases of sexual violence against registered children',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_sexuelles.cas_violence_sexuelles'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_violence_sexuelles.details_cas_violence_sexuelles',
      'gender'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_sexuelles.details_cas_violence_sexuelles',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_sexuelles.details_cas_violence_sexuelles',
      'count_if_male'
    ),
    makeSet(
      'Number of sexual abuse cases registered and treated children',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_sexuelles_traites.cas_violences_sexuelles_traitees'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_violence_sexuelles_traites.details_cas_violence_sexuelles',
      'gender'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_sexuelles_traites.details_cas_violence_sexuelles',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_violence_sexuelles_traites.details_cas_violence_sexuelles',
      'count_if_male'
    ),
    makeSet(
      'Number of registered child marriage cases',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enfants_maries.cas_mariages_enfants'
    ),
    makeRepeat(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enfants_maries.details_mariages_enfants',
      'age'
    ),
    makeSet(
      'Number of child marriage cases prevented',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enfants_maries.cas_mariages_empeches'
    ),
    makeSet(
      'Number of reported malnourished children',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_malnourris.cas_enfants_malnourris'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_malnourris.details_enfants_malnourris',
      'gender'
    ),
    makeRepeat(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_malnourris.details_enfants_malnourris',
      'age'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_malnourris.details_enfants_malnourris',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_malnourris.details_enfants_malnourris',
      'count_if_male'
    ),
    makeSet(
      'Number of malnourished children treated',
      'ampi__Text_Response__c',
      'form.protection_communautaire.pc_malnourris.malnourris_traites'
    ),
    makeSet(
      'Number of unregistered children identified',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enregistre_etat_civil.enfants_etats_civil'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_enregistre_etat_civil.details_enfants_etat_civil',
      'gender'
    ),
    makeRepeat(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enregistre_etat_civil.details_enfants_etat_civil',
      'age'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enregistre_etat_civil.details_enfants_etat_civil',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enregistre_etat_civil.details_enfants_etat_civil',
      'count_if_male'
    ),
    makeSet(
      "Nombre de civils enregistrés à l'état civil",
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enregistre_etat_civil_traites.enfants_etats_civil_traites'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_enregistre_etat_civil_traites.details_enfants_etat_civil_traites',
      'gender'
    ),
    makeRepeat(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enregistre_etat_civil_traites.details_enfants_etat_civil_traites',
      'age'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enregistre_etat_civil_traites.details_enfants_etat_civil_traites',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enregistre_etat_civil_traites.details_enfants_etat_civil_traites',
      'count_if_male'
    ),
    makeSet(
      'Number of school-aged children not enrolled in school',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enfants_non_inscrits.enfants_non_inscrits'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_enfants_non_inscrits.details_enfants_non_inscrits',
      'gender'
    ),
    makeRepeat(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enfants_non_inscrits.details_enfants_non_inscrits',
      'age'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enfants_non_inscrits.details_enfants_non_inscrits',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enfants_non_inscrits.details_enfants_non_inscrits',
      'count_if_male'
    ),
    makeSet(
      'Number of school-aged children not enrolled in school treated',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enfants_non_inscrits_traites.enfants_non_inscrits_traites'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_enfants_non_inscrits_traites.details_enfants_non_inscrits',
      'gender'
    ),
    makeRepeat(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enfants_non_inscrits_traites.details_enfants_non_inscrits',
      'age'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enfants_non_inscrits_traites.details_enfants_non_inscrits',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_enfants_non_inscrits_traites.details_enfants_non_inscrits',
      'count_if_male'
    ),
    makeSet(
      'Number of unvaccinated children identified',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_non_vaccines.non_vaccines'
    ),
    makeRepeat(
      'sex',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_non_vaccines.details_non_vaccines',
      'gender'
    ),
    makeRepeat(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_non_vaccines.details_non_vaccines',
      'age'
    ),
    makeRepeat(
      'count if female',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_non_vaccines.details_non_vaccines',
      'count_if_female'
    ),
    makeRepeat(
      'count if male',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_non_vaccines.details_non_vaccines',
      'count_if_male'
    ),
    makeSet(
      'Number of unvaccinated children treated',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_non_vaccines_traites.non_vaccines_traites'
    ),
    makeSet(
      'sex',
      'ampi__Picklist_Response__c',
      'form.protection_communautaire.pc_non_vaccines_traites.details_non_vaccines.gender'
    ),
    makeSet(
      'Age (in years)',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_non_vaccines_traites.details_non_vaccines.age'
    ),
    makeSet(
      'count if female',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_non_vaccines_traites.details_non_vaccines.count_if_female'
    ),
    makeSet(
      'count if male',
      'ampi__Number_Response__c',
      'form.protection_communautaire.pc_non_vaccines_traites.details_non_vaccines.count_if_male'
    ),
    makeRepeat(
      'Indicate the number of registered cases that have been referred to support structures (to be completed for each case)',
      'ampi__Text_Response__c',
      'form.protection_communautaire.cas_referred',
      'cas_refere'
    ),
  ];

  state.questionArray = state.fieldSets.map(x => {
    console.log(x);
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
    return state.questionArray.reduce((acc, val) => acc.concat(val), []);
  }
);
// =============================================================================
