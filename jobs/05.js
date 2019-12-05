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

  function repeatSet(a, b, i, c) {
    const fieldSet = {
      Question_ID__c: `${pId}-${a}-${i}`,
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
      'women',
      'ampi__Number_Response__c',
      'form.question16.Composition_CPE.cgc_members.cgc_women'
    ),
    makeSet(
      'men',
      'ampi__Number_Response__c',
      'form.question16.Composition_CPE.cgc_members.cgc_girls'
    ),
    makeSet(
      'girls',
      'ampi__Number_Response__c',
      'form.question16.Composition_CPE.cgc_members.cgc_men'
    ),
    makeSet(
      'boys',
      'ampi__Number_Response__c',
      'form.question16.Composition_CPE.cgc_members.cgc_boys'
    ),
    makeSet(
      'total',
      'ampi__Number_Response__c',
      'form.question16.Composition_CPE.cgc_members.total'
    ),
    makeSet(
      'What commissions are formed within the CGC?',
      'ampi__Text_Response__c',
      'form.question16.Composition_CPE.cgc_comissions'
    ),
    makeSet(
      'How many members make up the Health Commission?',
      'ampi__Number_Response__c',
      'form.Commission_sante.fonctionnalite_commission_sante.Q1_nbre_membr_comm_sante'
    ),
    makeSet(
      'Number of action plans created during the last 03 months by the health commission?',
      'ampi__Number_Response__c',
      'form.Commission_sante.fonctionnalite_commission_sante.Q2_nbre_plans_actions_constitues'
    ),
    makeSet(
      'Number of action plans carried out during the last 03 months by the health commission?',
      'ampi__Number_Response__c',
      'form.Commission_sante.fonctionnalite_commission_sante.Q3_nbre_plans_action_deroules'
    ),
    makeSet(
      'Number of meetings organized by the Health Committee during the last 03 months',
      'ampi__Number_Response__c',
      'form.Commission_sante.fonctionnalite_commission_sante.Q4_nbre_reunions_organisees'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.Commission_sante.fonctionnalite_commission_sante.Q4_vu_cahier'
    ),
    makeSet(
      'For vaccination of children from 0 to 2 years',
      'ampi__Number_Response__c',
      'form.Commission_sante.Q5_Campagnes_sensibilisation.Q5_vaccination'
    ),
    makeSet(
      'For the deworming of children from 0 to 2 years',
      'ampi__Number_Response__c',
      'form.Commission_sante.Q5_Campagnes_sensibilisation.Q5_deparasitage'
    ),
    makeSet(
      'For the supplementation of children from 0 to 2 years of vitamin A',
      'ampi__Number_Response__c',
      'form.Commission_sante.Q5_Campagnes_sensibilisation.Q5_supplementation_enfants'
    ),
    makeSet(
      'For the respect of the vaccination calendar',
      'ampi__Number_Response__c',
      'form.Commission_sante.Q5_Campagnes_sensibilisation.Q5_respect_calendrier'
    ),
    makeSet(
      'Other (s) to be specified',
      'ampi__Number_Response__c',
      'form.Commission_sante.Q5_Campagnes_sensibilisation.Q5_autres_preciser'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.Commission_sante.Q5_Campagnes_sensibilisation.Q5_prcision_autres'
    ),
    makeSet(
      'How many members are the Education Commission?',
      'ampi__Number_Response__c',
      'form.CE.fonctionnalite_commission_education.Q1_membres_constituent_comm_Educat'
    ),
    makeSet(
      'Number of action plans created during the last 03 months by the Education Committee?',
      'ampi__Number_Response__c',
      'form.CE.fonctionnalite_commission_education.Q2_nbre_plans_actions_constitues'
    ),
    makeSet(
      'Number of action plans carried out during the last 03 months by the Education Committee?',
      'ampi__Number_Response__c',
      'form.CE.fonctionnalite_commission_education.Q3_nbre_plans_actions_deroules'
    ),
    makeSet(
      'Number of meetings organized by the Education Committee in the last 12 months',
      'ampi__Number_Response__c',
      'form.CE.fonctionnalite_commission_education.CE_nb_meetings'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CE.fonctionnalite_commission_education.CE_vu_dans_cahier'
    ),
    makeSet(
      'Number of action plans jointly implemented by the CGE and the CMC to improve the quality of education in the last 12 months',
      'ampi__Number_Response__c',
      'form.CE.fonctionnalite_commission_education.CE_actionplan_for_education_quality'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CE.fonctionnalite_commission_education.CE_actionplan_vu_dans_cahier'
    ),
    makeSet(
      'Number of meetings between teachers and parents to promote a non-violent approach to teaching in the last 12 months',
      'ampi__Number_Response__c',
      'form.CE.question11.Q6_runion_enseignant_parents.Q6_CE_nb_parents_teacher_meetings'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question11.Q6_runion_enseignant_parents.Q6_nbre_presents_Hommes'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question11.Q6_runion_enseignant_parents.Q6_nbre_presents_Femmes'
    ),
    makeSet(
      'How many committed teachers were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question11.Q6_runion_enseignant_parents.Q6_nbre_presents_Enseignants_engages'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CE.question11.Q6_runion_enseignant_parents.Q6_CE_nb_parents_teacher_meetings_vu_dans_cahier'
    ),
    makeSet(
      'Number of facilitated meetings between teachers and parents for exchanges on the school situation of children',
      'ampi__Number_Response__c',
      'form.CE.question16.Q7_runion_enseignant_parents.Q7_CE_nb_parents_teacher_meetings'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question16.Q7_runion_enseignant_parents.Q7_nbre_presents_Hommes'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question16.Q7_runion_enseignant_parents.Q7_nbre_presents_Femmes'
    ),
    makeSet(
      'How many committed teachers were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question16.Q7_runion_enseignant_parents.Q7_nbre_presents_Enseignants_engages'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CE.question16.Q7_runion_enseignant_parents.Q7_CE_nb_parents_teacher_meetings_vu_dans_cahier'
    ),
    makeSet(
      'Number of facilitated meetings between parents and teachers to initiate dialogue and facilitate teacher-community relations in the last 03 months',
      'ampi__Number_Response__c',
      'form.CE.question13.Q8_reunion_enseignant_parents.Q8_CE_nb_parents_teacher_meetings'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question13.Q8_reunion_enseignant_parents.Q8_nbre_presents_Hommes'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question13.Q8_reunion_enseignant_parents.Q8_nbre_presents_Femmes'
    ),
    makeSet(
      'How many committed teachers were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question13.Q8_reunion_enseignant_parents.Q8_nbre_presents_Enseignants_engages'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CE.question13.Q8_reunion_enseignant_parents.Q8_CE_nb_parents_teacher_meetings_vu_dans_cahier'
    ),
    makeSet(
      'Number of facilitated meetings between parents and teachers to educate parents to school children of school-going age in the last 03 months',
      'ampi__Number_Response__c',
      'form.CE.question14.Q9_reunion_enseignant_parents.Q9_CE_nb_parents_teacher_meetings'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question14.Q9_reunion_enseignant_parents.Q9_nbre_presents_Hommes'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question14.Q9_reunion_enseignant_parents.Q9_nbre_presents_Femmes'
    ),
    makeSet(
      'How many committed teachers were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question14.Q9_reunion_enseignant_parents.Q9_nbre_presents_Enseignants_engages'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CE.question14.Q9_reunion_enseignant_parents.Q9_CE_nb_parents_teacher_meetings_vu_dans_cahier'
    ),
    makeSet(
      'Number of facilitated meetings between parents and teachers on the return of children who have dropped out of school in the last 03 months',
      'ampi__Number_Response__c',
      'form.CE.question15.Q10_reunion_enseignant_parents.Q10_CE_nb_parents_teacher_meetings'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question15.Q10_reunion_enseignant_parents.Q10_nbre_presents_Hommes'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question15.Q10_reunion_enseignant_parents.Q10_nbre_presents_Femmes'
    ),
    makeSet(
      'How many committed teachers were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.question15.Q10_reunion_enseignant_parents.Q10_nbre_presents_Enseignants_engages'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CE.question15.Q10_reunion_enseignant_parents.Q10_CE_nb_parents_teacher_meetings_vu_dans_cahier'
    ),
    makeSet(
      'Actions implemented jointly by teachers and parents, under the auspices of the GSC, to improve the school environment in the last 03 months',
      'ampi__Text_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.Q11_actions_conjointes'
    ),
    makeSet(
      'Specify other actions',
      'ampi__Text_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.Q11_precision_autres'
    ),
    makeSet(
      'Number of meetings held between CMC and teachers to raise awareness of forms of violence against children in school over the last 03 months',
      'ampi__Number_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_reunions_CGC_enseignants_sensibiliser_formes_violences_enfants'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_reunions_vu_dans_le_cahier'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_de_presents_Hommes'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_de_presents_Femmes'
    ),
    makeSet(
      'Number of Boys present at this meeting',
      'ampi__Number_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_de_presents_Garcons'
    ),
    makeSet(
      'Number of girls present at this meeting',
      'ampi__Number_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_de_presents_Filles'
    ),
    makeSet(
      'Number of committed teachers present at this meeting',
      'ampi__Number_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_de_presents_Enseignants_engages'
    ),
    makeSet(
      'Number of activities organized by the CGC and the CGE to sensitize the community on the lightening of the work of the children (housework, in the fields) during the last 03 months',
      'ampi__Number_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.reunions_tenues_entre_cgc_et_cge.Q13_nbre_activite_CGC_CGE_sensibilisation_allegement_travaux_enfants'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.reunions_tenues_entre_cgc_et_cge.Q13_vu_dans_le_cahier'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.reunions_tenues_entre_cgc_et_cge.Q13_ngre_presents_Hommes'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'ampi__Number_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.reunions_tenues_entre_cgc_et_cge.Q13_ngre_Femmes_presentes'
    ),
    makeSet(
      'Number of Boys present at this meeting',
      'ampi__Number_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.reunions_tenues_entre_cgc_et_cge.Q13_ngre_Garcons_presents'
    ),
    makeSet(
      'Number of girls present at this meeting',
      'ampi__Number_Response__c',
      'form.CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.reunions_tenues_entre_cgc_et_cge.Q13_ngre_Filles_presentes'
    ),
    makeSet(
      'Number of meetings organized by the Child Protection Commission during the last 03 months',
      'ampi__Number_Response__c',
      'form.CPE.question3.CPE_nb_meetings'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CPE.question3.CPE_vu_dans_cahier'
    ),
    makeSet(
      'Awareness-raising activities of community authorities (community, religious and administrative) on the problems of the protection of the rights of the child',
      'ampi__Number_Response__c',
      'form.CPE.question3.CPE_actionplans_type.CPE_sensi_activity'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CPE.question3.CPE_actionplans_type.CPE_sensi_activity_vu_dans_cahier'
    ),
    makeSet(
      'Integration of its action plan on the problems of the protection of the rights of the child into that of the administrative authorities',
      'ampi__Picklist_Response__c',
      'form.CPE.question3.CPE_actionplans_type.CPE_actionplan_integration'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CPE.question3.CPE_actionplans_type.vu_dans_le_cahier'
    ),
    makeSet(
      'Number of advocacy actions made by religious authorities for the protection of the rights of the child in the last 03 months',
      'ampi__Number_Response__c',
      'form.CPE.question3.CPE_actionplans_type.CPE_religious_actions'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CPE.question3.CPE_actionplans_type.CPE_religious_actions_vu_dans_cahier'
    ),
    makeSet(
      'Other',
      'ampi__Picklist_Response__c',
      'form.CPE.question3.CPE_actionplans_type.autres'
    ),
    makeSet(
      'Specify the number of actions:',
      'ampi__Number_Response__c',
      'form.CPE.question3.CPE_actionplans_type.CPE_nb_other_actions'
    ),
    makeRepeat(
      'Other (specify):',
      'ampi__Text_Response__c',
      'form.CPE.question3.CPE_actionplans_type.repeat_other_actions_CPE',
      'CPE_other_action'
    ),
    makeRepeat(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CPE.question3.CPE_actionplans_type.repeat_other_actions_CPE',
      'CPE_nb_other_actions_vu_dans_cahier'
    ),
    makeSet(
      'How many members constitute the "Child Protection" Commission?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question4.Q1_Nombre_membres_CPE'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CPE.CPE_actionplans.question4.Q1_vu_dans_le_cahier'
    ),
    makeSet(
      'Number of action plans created and carried out during the last 03 months by the "Protection of the child" commission?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question4.Q2_nombre_PA_constitues_et_deroule_durant_3dernier_mois'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CPE.CPE_actionplans.question4.Q2_vu_dans_le_cahier'
    ),
    makeSet(
      'Number of meetings organized by the Child Protection Committee in the last 3 months?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question4.Q3_nombre_de_reunion_organisees'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CPE.CPE_actionplans.question4.Q3_vu_dans_le_cahier'
    ),
    makeSet(
      'Number of excision victims detected in the community in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question4.Q4_nombre_de_cas_dexcision_detecte'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CPE.CPE_actionplans.question4.Q4_vu_dans_le_cahier'
    ),
    makeSet(
      'Number of excision victims detected in the community referred to health services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question4.Q5_nombre_de_cas_dexcision_referes_service_sante'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CPE.CPE_actionplans.question4.Q5_vu_dans_le_cahier'
    ),
    makeSet(
      'Number of excision victims detected in the community reported to the police . gendarmerie . justice in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question4.Q6_nombre_de_victimes_excision_signalees_police'
    ),
    makeSet(
      'Seen in the notebook',
      'ampi__Picklist_Response__c',
      'form.CPE.CPE_actionplans.question4.Q6_vu_dans_le_cahier'
    ),
    makeSet(
      'The number of cases of physical violence against boys referred to social services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question5.Q17_cas_de_violences_physiques_garcon_referes_services_sociaux'
    ),
    makeSet(
      'The number of cases of physical violence made to girls referred to social services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question5.Q17_cas_de_violences_physiques_fille_referes_services_sociaux'
    ),
    makeSet(
      'Q17_nombre_total_cas_violences_physiques_services_sociaux',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question5.Q17_nombre_total_cas_violences_physiques_services_sociaux'
    ),
    makeSet(
      'The number of cases of physical violence against boys referred to the security services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question5.Q18_cas_violences_physiques_garcons_referes_services_de_securite'
    ),
    makeSet(
      'The number of cases of physical violence against girls referred to the security services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question5.Q18_cas_violences_physiques_filles_referes_services_de_securite'
    ),
    makeSet(
      'Total cases of physical violence referred to the security service',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question5.Q18_total_cas_violences_physiques_referes_services_de_securite'
    ),
    makeSet(
      'Number of excision victims detected in the community referred to social services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.Victimes_volences_sexuelles.Q7_nombre_victimes_excision_referees_vers_services_sociaux'
    ),
    makeSet(
      'Specify social services',
      'ampi__Text_Response__c',
      'form.CPE.CPE_actionplans.Victimes_volences_sexuelles.Q7_preciser_services_sociaux'
    ),
    makeSet(
      'Number of male victims of sexual violence detected in the community in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.Victimes_volences_sexuelles.Q8_nombre_garcon_victimes_de_violences_sexuelles_detectees'
    ),
    makeSet(
      'Number of girls victims of sexual violence detected in the community in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.Victimes_volences_sexuelles.Q8_nombre_filles_victimes_de_violences_sexuelles_detectees'
    ),
    makeSet(
      'Total child victims of sexual violence detected',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.Victimes_volences_sexuelles.Total_enfants_victimes_de_violences_sexuelles_detectees'
    ),
    makeSet(
      'Number of male victims of sexual violence detected in the community referred to health services in last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.Victimes_volences_sexuelles.Q9_garcons_victimes_violences_sexuelles_referes_services_sante'
    ),
    makeSet(
      'Number of girls victims of sexual violence detected in the community referred to health services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.Victimes_volences_sexuelles.Q9_filles_victimes_violences_sexuelles_referes_services_sante'
    ),
    makeSet(
      'Total Children Sexual Violence Detected and Referred Health Services',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.Victimes_volences_sexuelles.Total_enfants_violences_sexuelles_detectees_et_referees_services_sante'
    ),
    makeSet(
      'Number of boys sexually abused detected in the community reported to police . gendarmerie . justice in last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.Victimes_volences_sexuelles.Q10_garcon_victimes_signalees_police'
    ),
    makeSet(
      'Number of female victims of sexual violence detected in the community reported to the police . gendarmerie . justice during the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.Victimes_volences_sexuelles.Q10_filles_victimes_signalees_police'
    ),
    makeSet(
      'total child victims',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.Victimes_volences_sexuelles.Q10_total_enfants_victimes'
    ),
    makeSet(
      'Number of boys raped among victims of violence detected in the community referred to social services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question12.Q15_garcon_victimes_viols_referees_services_sociaux'
    ),
    makeSet(
      'Number of girls raped among victims of violence detected in the community referred to social services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question12.Q15_filles_victimes_viols_referees_services_sociaux'
    ),
    makeSet(
      'Specify social services',
      'ampi__Text_Response__c',
      'form.CPE.CPE_actionplans.question12.Q15_preciser_servcices_sociaux'
    ),
    makeSet(
      'Q15_total_referees_services_sociaux',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question12.Q15_total_referees_services_sociaux'
    ),
    makeSet(
      'Number of boys abused in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question12.Q16_garcons_victimes_de_violences_physiques'
    ),
    makeSet(
      'Number of girls victims of physical violence in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question12.Q16_filles_victimes_de_violences_physiques'
    ),
    makeSet(
      'total victims of physical violence',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.question12.Q16_Total_enfants_victimes_de_violences_physiques'
    ),
    makeSet(
      'Number of boys raped among victims of violence detected in the community referred to health services in last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.victimes_viols.Q13_garcon_victimes_de_viols_referes_services_sante'
    ),
    makeSet(
      'Number of girls raped among victims of violence detected in the community referred to health services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.victimes_viols.Q13_filles_victimes_de_viols_referes_services_sante'
    ),
    makeSet(
      'Total child victims rapes referes health services',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.victimes_viols.Total_enfants_victimes_viols_referes_services_sante'
    ),
    makeSet(
      'Number of boys raped among victims of violence detected in the community reported to police . gendarmerie . justice in last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.victimes_viols.Q14_garcon_victimes_viols_signalees_police'
    ),
    makeSet(
      'Nombre de filles victimes de viols parmi les victimes de violences détectées dans la communauté signalées à la police.gendarmerie.justice au cours des 3 derniers mois',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.victimes_viols.Q14_filles_victimes_viols_signalees_police'
    ),
    makeSet(
      'total victims rapes reported',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.victimes_viols.Q14_Total_victimes_viols_signalees'
    ),
    makeSet(
      'Number of male victims of sexual violence detected in the community referred to social services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_referees_services_sociaux.Q11_garcons_victimes_signalees_services_sociaux'
    ),
    makeSet(
      'Number of girls victims of sexual violence detected in the community referred to social services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_referees_services_sociaux.Q11_filles_victimes_signalees_services_sociaux'
    ),
    makeSet(
      'Specify social services',
      'ampi__Text_Response__c',
      'form.CPE.CPE_actionplans.violences_referees_services_sociaux.Q11_preciser_services_sociaux'
    ),
    makeSet(
      'total child victims social services',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_referees_services_sociaux.Q11_total_enfants_victimes_services_sociaux'
    ),
    makeSet(
      'Number of boys raped among victims of violence detected in the community in last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_referees_services_sociaux.Q12_garcons_victimes_viols_detectees'
    ),
    makeSet(
      'Number of girls raped among victims of violence detected in the community in last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_referees_services_sociaux.Q12_filles_victimes_viols_detectees'
    ),
    makeSet(
      'total child victims of rape',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_referees_services_sociaux.Q12_Total_enfants_victimes_de_viols'
    ),
    makeSet(
      'Number of exchanges and advocacy sessions with men on the forms, consequences and responses to violence and abuse of children in the last 3 months?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_et_abus.Q22_sessions_dechange_et_plaidoyer_Homme'
    ),
    makeSet(
      'Number of exchange and advocacy sessions with women on the forms, consequences and responses to violence and abuse of children in the last 3 months?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_et_abus.Q22_sessions_dechange_et_plaidoyer_Femmes'
    ),
    makeSet(
      'Number of exchange and advocacy sessions with girls on the forms, consequences and responses to violence and abuse of children in the last 3 months?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_et_abus.Q22_sessions_dechange_et_plaidoyer_Filles'
    ),
    makeSet(
      'Number of exchanges and advocacy sessions with boys on the forms, consequences and responses to violence and abuse of children in the last 3 months?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_et_abus.Q22_sessions_dechange_et_plaidoyer_Garcons'
    ),
    makeSet(
      'Total sessions dechange et plaidoyer',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_et_abus.Q22_Total_sessions_dechange_et_plaidoyer'
    ),
    makeSet(
      'The number of exchange and advocacy sessions conducted with men to strengthen consensus among community leaders on the fundamentals, consequences and abandonment of FGM is',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_et_abus.consensus_parmi_leader.Q22_sessions_dechange_et_plaidoyer_consensus_Hommes'
    ),
    makeSet(
      'The number of exchange and advocacy sessions with women to build consensus among community leaders on the fundamentals, consequences and abandonment of FGM is',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_et_abus.consensus_parmi_leader.Q22_sessions_dechange_et_plaidoyer_consensus_Femmes'
    ),
    makeSet(
      'The number of exchange and advocacy sessions with girls to build consensus among community leaders on the fundamentals, consequences and abandonment of FGM is',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_et_abus.consensus_parmi_leader.Q22_sessions_dechange_et_plaidoyer_consensus_filles'
    ),
    makeSet(
      'The number of exchange and advocacy sessions with boys to build consensus among community leaders on the fundamentals, consequences and abandonment of FGM is',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_et_abus.consensus_parmi_leader.Q22_sessions_dechange_et_plaidoyer_consensus_Garcons'
    ),
    makeSet(
      'total number of exchanges and advocacy sessions consensus',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.violences_et_abus.consensus_parmi_leader.Q22_nmbre_sessions_dechange_et_plaidoyer_consensus_'
    ),
    makeSet(
      'Number of educational talks with men on the forms, consequences and response to violence and abuse of children',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educatives.Q22_causeries_educatives_Hommes'
    ),
    makeSet(
      'Number of educational talks with men on the forms, consequences and response to violence and abuse of children',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educatives.Q22_causeries_educatives_Femmes'
    ),
    makeSet(
      'Number of educational talks with girls on the forms, consequences and response to violence and child abuse',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educatives.Q22_causeries_educatives_Filles'
    ),
    makeSet(
      'Number of educational talks with boys on the forms, consequences and response to violence and child abuse',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educatives.Q22_causeries_educatives_Garcons'
    ),
    makeSet(
      'total number of educational talks',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educatives.Q22_nbre_total_causeries_educatives_consequences'
    ),
    makeSet(
      'The number of girls married before the age of 18 in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.enregistrement_naissances.Q19_nombre_de_filles_mariees_avant_18ans'
    ),
    makeSet(
      'The number of cases of marriage of children prevented or referred to social services in the last 3 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.enregistrement_naissances.Q20_nombre_de_cas_mariages_enfants_empeche_ou_referes'
    ),
    makeSet(
      'The number of cases of marriage of children prevented or reported to the police . gendarmerie during the last 3',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.enregistrement_naissances.Q21_nombre_cas_mariage_enfants_empeches_ou_referes_police'
    ),
    makeSet(
      'Number of educational talks with men on the importance and methods of birth registration in the last 3 months?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.enregistrement_naissances.Q22_nombre_causeries_Homme'
    ),
    makeSet(
      'Number of educational talks with women on the importance and methods of birth registration in the last 3 months?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.enregistrement_naissances.Q22_nombre_causeries_Femmes'
    ),
    makeSet(
      'Number of educational talks given to girls on the importance and methods of birth registration in the last 3 months?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.enregistrement_naissances.Q22_nombre_causeries_Filles'
    ),
    makeSet(
      'Number of educational talks with boys on the importance and methods of birth registration in the last 3 months?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.enregistrement_naissances.Q22_nombre_causeries_Garcon'
    ),
    makeSet(
      'Number of educational talks with men on the foundations, consequences and abandonment of excision',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.Q22_causeries_educatives_sur_les_fondements_Hommes'
    ),
    makeSet(
      'Number of educational talks with women on the foundations, consequences and abandonment of excision',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.Q22_causeries_educatives_sur_les_fondements_Femmes'
    ),
    makeSet(
      'Number of educational talks with girls on the foundations, consequences and abandonment of excision',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.Q22_causeries_educatives_sur_les_fondements_Filles'
    ),
    makeSet(
      'Number of educational talks with boys on the foundations, consequences and abandonment of excision',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.Q22_causeries_educatives_sur_les_fondements_Garcons'
    ),
    makeSet(
      'total educational talk about the fundamentals',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.Q22_nbre_total_causeries_educatives_sur_les_fondements'
    ),
    makeSet(
      'Number of exchange and advocacy sessions with men to build consensus among community leaders on the fundamentals, consequences and abandonment of child marriage?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.Q22_nbre_sessions_echanges_et_plaidoyer_aupres_Homme_consensus'
    ),
    makeSet(
      'Number of exchange and advocacy sessions with women to build consensus among community leaders on the fundamentals, consequences and abandonment of child marriage?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.Q22_nbre_sessions_echanges_et_plaidoyer_aupres_Femmes_consensus'
    ),
    makeSet(
      'Number of exchange and advocacy sessions with girls to build consensus among community leaders on the fundamentals, consequences and abandonment of child marriage?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.Q22_nbre_sessions_echanges_et_plaidoyer_aupres_Filles_consensus'
    ),
    makeSet(
      'Number of exchange and advocacy sessions with boys to build consensus among community leaders on the fundamentals, consequences and abandonment of child marriage?',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.Q22_nbre_sessions_echanges_et_plaidoyer_aupres_Garcons_consensus'
    ),
    makeSet(
      'total number of exchanges and advocacy consensus',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.Q22_nbre_total_sessions_echanges_et_plaidoyer_consensus'
    ),
    makeSet(
      'Number of educational talks with men on the consequences of child marriage',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_causeries_educatives_consequenquences_mariages_Hommes'
    ),
    makeSet(
      'Nombre de causeries éducatives auprès des femmes sur les conséquences du mariage d’enfant',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_causeries_educatives_consequenquences_mariages_Femmes'
    ),
    makeSet(
      'Number of educational talks with girls on the consequences of child marriage',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_causeries_educatives_consequenquences_mariages_Filles'
    ),
    makeSet(
      'Number of educational talks with boys on the consequences of child marriage',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_causeries_educatives_consequenquences_mariages_Garcons'
    ),
    makeSet(
      'total number of educational talks consequences marriages',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_nbre_total_causeries_educatives_consequenquences_mariages'
    ),
    makeSet(
      'Number of "OTHERS" actions made by the \'Child Protection\' Commission among Men in the last 03 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_nombre_actions_AUTRES_Hommes'
    ),
    makeSet(
      'Number of "OTHER" actions made by the "Child Protection" Commission among Women in the last 03 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_nombre_actions_AUTRES_Femmes'
    ),
    makeSet(
      'Number of "OTHER" actions made by the "Protection of the Child" commission among Girls in the last 03 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_nombre_actions_AUTRES_Filles'
    ),
    makeSet(
      'Number of "OTHER" actions made by the "Protection of the Child" commission with Boys during the last 03 months',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_nombre_actions_AUTRES_Garcons'
    ),
    makeSet(
      'total other actions',
      'ampi__Number_Response__c',
      'form.CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_nombre_total_actions_AUTRES'
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
