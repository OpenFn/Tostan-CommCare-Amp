// UPSERT PARENT SUBMISSION ====================================================
upsert(
  'ampi__Submission__c',
  'Submission_ID__c',
  fields(
    field('ampi__Description__c', dataValue('form.@name')),
    field('Location__c', dataValue('form.GPS')),
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
      'departement',
      'identification.fixture_localization.departement',
      'form.multiple choice'
    ),
    makeSet(
      'commune',
      'identification.fixture_localization.commune',
      'form.multiple choice'
    ),
    makeSet(
      'village',
      'identification.fixture_localization.village',
      'form.multiple choice'
    ),
    makeSet(
      'Language of the interview',
      'identification.langue_interview',
      'form.multiple choice'
    ),
    makeSet(
      'Indicate the language',
      'identification.indiquez_langue',
      'form.multiple choice'
    ),
    makeSet(
      'women',
      'question16.Composition_CPE.cgc_members.cgc_women',
      'form.Integer'
    ),
    makeSet(
      'men',
      'question16.Composition_CPE.cgc_members.cgc_girls',
      'form.Integer'
    ),
    makeSet(
      'girls',
      'question16.Composition_CPE.cgc_members.cgc_men',
      'form.Integer'
    ),
    makeSet(
      'boys',
      'question16.Composition_CPE.cgc_members.cgc_boys',
      'form.Integer'
    ),
    makeSet(
      'total',
      'question16.Composition_CPE.cgc_members.total',
      'form.Hidden value'
    ),
    makeSet(
      'What commissions are formed within the CGC?',
      'question16.Composition_CPE.cgc_comissions',
      'form.Checkbox'
    ),
    makeSet(
      'How many members make up the Health Commission?',
      'Commission_sante.fonctionnalite_commission_sante.Q1_nbre_membr_comm_sante',
      'form.Integer'
    ),
    makeSet(
      'Number of action plans created during the last 03 months by the health commission?',
      'Commission_sante.fonctionnalite_commission_sante.Q2_nbre_plans_actions_constitues',
      'form.Integer'
    ),
    makeSet(
      'Number of action plans carried out during the last 03 months by the health commission?',
      'Commission_sante.fonctionnalite_commission_sante.Q3_nbre_plans_action_deroules',
      'form.Integer'
    ),
    makeSet(
      'Number of meetings organized by the Health Committee during the last 03 months',
      'Commission_sante.fonctionnalite_commission_sante.Q4_nbre_reunions_organisees',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'Commission_sante.fonctionnalite_commission_sante.Q4_vu_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'For vaccination of children from 0 to 2 years',
      'Commission_sante.Q5_Campagnes_sensibilisation.Q5_vaccination',
      'form.Integer'
    ),
    makeSet(
      'For the deworming of children from 0 to 2 years',
      'Commission_sante.Q5_Campagnes_sensibilisation.Q5_deparasitage',
      'form.Integer'
    ),
    makeSet(
      'For the supplementation of children from 0 to 2 years of vitamin A',
      'Commission_sante.Q5_Campagnes_sensibilisation.Q5_supplementation_enfants',
      'form.Integer'
    ),
    makeSet(
      'For the respect of the vaccination calendar',
      'Commission_sante.Q5_Campagnes_sensibilisation.Q5_respect_calendrier',
      'form.Integer'
    ),
    makeSet(
      'Other (s) to be specified',
      'Commission_sante.Q5_Campagnes_sensibilisation.Q5_autres_preciser',
      'form.Integer'
    ),
    makeSet(
      'Specify other',
      'Commission_sante.Q5_Campagnes_sensibilisation.Q5_prcision_autres',
      'form.Text'
    ),
    makeSet(
      'How many members are the Education Commission?',
      'CE.fonctionnalite_commission_education.Q1_membres_constituent_comm_Educat',
      'form.Integer'
    ),
    makeSet(
      'Number of action plans created during the last 03 months by the Education Committee?',
      'CE.fonctionnalite_commission_education.Q2_nbre_plans_actions_constitues',
      'form.Integer'
    ),
    makeSet(
      'Number of action plans carried out during the last 03 months by the Education Committee?',
      'CE.fonctionnalite_commission_education.Q3_nbre_plans_actions_deroules',
      'form.Integer'
    ),
    makeSet(
      'Number of meetings organized by the Education Committee in the last 12 months',
      'CE.fonctionnalite_commission_education.CE_nb_meetings',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CE.fonctionnalite_commission_education.CE_vu_dans_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Number of action plans jointly implemented by the CGE and the CMC to improve the quality of education in the last 12 months',
      'CE.fonctionnalite_commission_education.CE_actionplan_for_education_quality',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CE.fonctionnalite_commission_education.CE_actionplan_vu_dans_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Number of meetings between teachers and parents to promote a non-violent approach to teaching in the last 12 months',
      'CE.question11.Q6_runion_enseignant_parents.Q6_CE_nb_parents_teacher_meetings',
      'form.Integer'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'CE.question11.Q6_runion_enseignant_parents.Q6_nbre_presents_Hommes',
      'form.Integer'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'CE.question11.Q6_runion_enseignant_parents.Q6_nbre_presents_Femmes',
      'form.Integer'
    ),
    makeSet(
      'How many committed teachers were present at this meeting?',
      'CE.question11.Q6_runion_enseignant_parents.Q6_nbre_presents_Enseignants_engages',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CE.question11.Q6_runion_enseignant_parents.Q6_CE_nb_parents_teacher_meetings_vu_dans_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Number of facilitated meetings between teachers and parents for exchanges on the school situation of children',
      'CE.question16.Q7_runion_enseignant_parents.Q7_CE_nb_parents_teacher_meetings',
      'form.Integer'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'CE.question16.Q7_runion_enseignant_parents.Q7_nbre_presents_Hommes',
      'form.Integer'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'CE.question16.Q7_runion_enseignant_parents.Q7_nbre_presents_Femmes',
      'form.Integer'
    ),
    makeSet(
      'How many committed teachers were present at this meeting?',
      'CE.question16.Q7_runion_enseignant_parents.Q7_nbre_presents_Enseignants_engages',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CE.question16.Q7_runion_enseignant_parents.Q7_CE_nb_parents_teacher_meetings_vu_dans_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Number of facilitated meetings between parents and teachers to initiate dialogue and facilitate teacher-community relations in the last 03 months',
      'CE.question13.Q8_reunion_enseignant_parents.Q8_CE_nb_parents_teacher_meetings',
      'form.Integer'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'CE.question13.Q8_reunion_enseignant_parents.Q8_nbre_presents_Hommes',
      'form.Integer'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'CE.question13.Q8_reunion_enseignant_parents.Q8_nbre_presents_Femmes',
      'form.Integer'
    ),
    makeSet(
      'How many committed teachers were present at this meeting?',
      'CE.question13.Q8_reunion_enseignant_parents.Q8_nbre_presents_Enseignants_engages',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CE.question13.Q8_reunion_enseignant_parents.Q8_CE_nb_parents_teacher_meetings_vu_dans_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Number of facilitated meetings between parents and teachers to educate parents to school children of school-going age in the last 03 months',
      'CE.question14.Q9_reunion_enseignant_parents.Q9_CE_nb_parents_teacher_meetings',
      'form.Integer'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'CE.question14.Q9_reunion_enseignant_parents.Q9_nbre_presents_Hommes',
      'form.Integer'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'CE.question14.Q9_reunion_enseignant_parents.Q9_nbre_presents_Femmes',
      'form.Integer'
    ),
    makeSet(
      'How many committed teachers were present at this meeting?',
      'CE.question14.Q9_reunion_enseignant_parents.Q9_nbre_presents_Enseignants_engages',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CE.question14.Q9_reunion_enseignant_parents.Q9_CE_nb_parents_teacher_meetings_vu_dans_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Number of facilitated meetings between parents and teachers on the return of children who have dropped out of school in the last 03 months',
      'CE.question15.Q10_reunion_enseignant_parents.Q10_CE_nb_parents_teacher_meetings',
      'form.Integer'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'CE.question15.Q10_reunion_enseignant_parents.Q10_nbre_presents_Hommes',
      'form.Integer'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'CE.question15.Q10_reunion_enseignant_parents.Q10_nbre_presents_Femmes',
      'form.Integer'
    ),
    makeSet(
      'How many committed teachers were present at this meeting?',
      'CE.question15.Q10_reunion_enseignant_parents.Q10_nbre_presents_Enseignants_engages',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CE.question15.Q10_reunion_enseignant_parents.Q10_CE_nb_parents_teacher_meetings_vu_dans_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Actions implemented jointly by teachers and parents, under the auspices of the GSC, to improve the school environment in the last 03 months',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.Q11_actions_conjointes',
      'form.Checkbox'
    ),
    makeSet(
      'Specify other actions',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.Q11_precision_autres',
      'form.Text'
    ),
    makeSet(
      'Number of meetings held between CMC and teachers to raise awareness of forms of violence against children in school over the last 03 months',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_reunions_CGC_enseignants_sensibiliser_formes_violences_enfants',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_reunions_vu_dans_le_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_de_presents_Hommes',
      'form.Integer'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_de_presents_Femmes',
      'form.Integer'
    ),
    makeSet(
      'Number of Boys present at this meeting',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_de_presents_Garcons',
      'form.Integer'
    ),
    makeSet(
      'Number of girls present at this meeting',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_de_presents_Filles',
      'form.Integer'
    ),
    makeSet(
      'Number of committed teachers present at this meeting',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.runion_entre_cgc_et_enseignants.Q12_nbre_de_presents_Enseignants_engages',
      'form.Integer'
    ),
    makeSet(
      'Number of activities organized by the CGC and the CGE to sensitize the community on the lightening of the work of the children (housework, in the fields) during the last 03 months',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.reunions_tenues_entre_cgc_et_cge.Q13_nbre_activite_CGC_CGE_sensibilisation_allegement_travaux_enfants',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.reunions_tenues_entre_cgc_et_cge.Q13_vu_dans_le_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'How many men were present at this meeting?',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.reunions_tenues_entre_cgc_et_cge.Q13_ngre_presents_Hommes',
      'form.Integer'
    ),
    makeSet(
      'How many women were present at this meeting?',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.reunions_tenues_entre_cgc_et_cge.Q13_ngre_Femmes_presentes',
      'form.Integer'
    ),
    makeSet(
      'Number of Boys present at this meeting',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.reunions_tenues_entre_cgc_et_cge.Q13_ngre_Garcons_presents',
      'form.Integer'
    ),
    makeSet(
      'Number of girls present at this meeting',
      'CE.Q11_actions_conjointe_enseignants_parents_ameliore_env_ecole.reunions_tenues_entre_cgc_et_cge.Q13_ngre_Filles_presentes',
      'form.Integer'
    ),
    makeSet(
      'Number of meetings organized by the Child Protection Commission during the last 03 months',
      'CPE.question3.CPE_nb_meetings',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CPE.question3.CPE_vu_dans_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Awareness-raising activities of community authorities (community, religious and administrative) on the problems of the protection of the rights of the child',
      'CPE.question3.CPE_actionplans_type.CPE_sensi_activity',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CPE.question3.CPE_actionplans_type.CPE_sensi_activity_vu_dans_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Integration of its action plan on the problems of the protection of the rights of the child into that of the administrative authorities',
      'CPE.question3.CPE_actionplans_type.CPE_actionplan_integration',
      'form.multiple choice'
    ),
    makeSet(
      'Seen in the notebook',
      'CPE.question3.CPE_actionplans_type.vu_dans_le_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Number of advocacy actions made by religious authorities for the protection of the rights of the child in the last 03 months',
      'CPE.question3.CPE_actionplans_type.CPE_religious_actions',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CPE.question3.CPE_actionplans_type.CPE_religious_actions_vu_dans_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Other',
      'CPE.question3.CPE_actionplans_type.autres',
      'form.multiple choice'
    ),
    makeSet(
      'Specify the number of actions:',
      'CPE.question3.CPE_actionplans_type.CPE_nb_other_actions',
      'form.Integer'
    ),
    makeSet(
      'repeat_other_actions_CPE',
      'CPE.question3.CPE_actionplans_type.repeat_other_actions_CPE',
      'form.Repeat Group'
    ),
    makeSet(
      'Other (specify):',
      'CPE.question3.CPE_actionplans_type.repeat_other_actions_CPE.CPE_other_action',
      'form.Text'
    ),
    makeSet(
      'Seen in the notebook',
      'CPE.question3.CPE_actionplans_type.repeat_other_actions_CPE.CPE_nb_other_actions_vu_dans_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'How many members constitute the "Child Protection" Commission?',
      'CPE.CPE_actionplans.question4.Q1_Nombre_membres_CPE',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CPE.CPE_actionplans.question4.Q1_vu_dans_le_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Number of action plans created and carried out during the last 03 months by the "Protection of the child" commission?',
      'CPE.CPE_actionplans.question4.Q2_nombre_PA_constitues_et_deroule_durant_3dernier_mois',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CPE.CPE_actionplans.question4.Q2_vu_dans_le_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Number of meetings organized by the Child Protection Committee in the last 3 months?',
      'CPE.CPE_actionplans.question4.Q3_nombre_de_reunion_organisees',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CPE.CPE_actionplans.question4.Q3_vu_dans_le_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Number of excision victims detected in the community in the last 3 months',
      'CPE.CPE_actionplans.question4.Q4_nombre_de_cas_dexcision_detecte',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CPE.CPE_actionplans.question4.Q4_vu_dans_le_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Number of excision victims detected in the community referred to health services in the last 3 months',
      'CPE.CPE_actionplans.question4.Q5_nombre_de_cas_dexcision_referes_service_sante',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CPE.CPE_actionplans.question4.Q5_vu_dans_le_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'Number of excision victims detected in the community reported to the police . gendarmerie . justice in the last 3 months',
      'CPE.CPE_actionplans.question4.Q6_nombre_de_victimes_excision_signalees_police',
      'form.Integer'
    ),
    makeSet(
      'Seen in the notebook',
      'CPE.CPE_actionplans.question4.Q6_vu_dans_le_cahier',
      'form.multiple choice'
    ),
    makeSet(
      'The number of cases of physical violence against boys referred to social services in the last 3 months',
      'CPE.CPE_actionplans.question5.Q17_cas_de_violences_physiques_garcon_referes_services_sociaux',
      'form.Integer'
    ),
    makeSet(
      'The number of cases of physical violence made to girls referred to social services in the last 3 months',
      'CPE.CPE_actionplans.question5.Q17_cas_de_violences_physiques_fille_referes_services_sociaux',
      'form.Integer'
    ),
    makeSet(
      'Q17_nombre_total_cas_violences_physiques_services_sociaux',
      'CPE.CPE_actionplans.question5.Q17_nombre_total_cas_violences_physiques_services_sociaux',
      'form.Hidden value'
    ),
    makeSet(
      'The number of cases of physical violence against boys referred to the security services in the last 3 months',
      'CPE.CPE_actionplans.question5.Q18_cas_violences_physiques_garcons_referes_services_de_securite',
      'form.Integer'
    ),
    makeSet(
      'The number of cases of physical violence against girls referred to the security services in the last 3 months',
      'CPE.CPE_actionplans.question5.Q18_cas_violences_physiques_filles_referes_services_de_securite',
      'form.Integer'
    ),
    makeSet(
      'Total cases of physical violence referred to the security service',
      'CPE.CPE_actionplans.question5.Q18_total_cas_violences_physiques_referes_services_de_securite',
      'form.Hidden value'
    ),
    makeSet(
      'Number of excision victims detected in the community referred to social services in the last 3 months',
      'CPE.CPE_actionplans.Victimes_volences_sexuelles.Q7_nombre_victimes_excision_referees_vers_services_sociaux',
      'form.Integer'
    ),
    makeSet(
      'Specify social services',
      'CPE.CPE_actionplans.Victimes_volences_sexuelles.Q7_preciser_services_sociaux',
      'form.Text'
    ),
    makeSet(
      'Number of male victims of sexual violence detected in the community in the last 3 months',
      'CPE.CPE_actionplans.Victimes_volences_sexuelles.Q8_nombre_garcon_victimes_de_violences_sexuelles_detectees',
      'form.Integer'
    ),
    makeSet(
      'Number of girls victims of sexual violence detected in the community in the last 3 months',
      'CPE.CPE_actionplans.Victimes_volences_sexuelles.Q8_nombre_filles_victimes_de_violences_sexuelles_detectees',
      'form.Integer'
    ),
    makeSet(
      'Total child victims of sexual violence detected',
      'CPE.CPE_actionplans.Victimes_volences_sexuelles.Total_enfants_victimes_de_violences_sexuelles_detectees',
      'form.Hidden value'
    ),
    makeSet(
      'Number of male victims of sexual violence detected in the community referred to health services in last 3 months',
      'CPE.CPE_actionplans.Victimes_volences_sexuelles.Q9_garcons_victimes_violences_sexuelles_referes_services_sante',
      'form.Integer'
    ),
    makeSet(
      'Number of girls victims of sexual violence detected in the community referred to health services in the last 3 months',
      'CPE.CPE_actionplans.Victimes_volences_sexuelles.Q9_filles_victimes_violences_sexuelles_referes_services_sante',
      'form.Integer'
    ),
    makeSet(
      'Total Children Sexual Violence Detected and Referred Health Services',
      'CPE.CPE_actionplans.Victimes_volences_sexuelles.Total_enfants_violences_sexuelles_detectees_et_referees_services_sante',
      'form.Hidden value'
    ),
    makeSet(
      'Number of boys sexually abused detected in the community reported to police . gendarmerie . justice in last 3 months',
      'CPE.CPE_actionplans.Victimes_volences_sexuelles.Q10_garcon_victimes_signalees_police',
      'form.Integer'
    ),
    makeSet(
      'Number of female victims of sexual violence detected in the community reported to the police . gendarmerie . justice during the last 3 months',
      'CPE.CPE_actionplans.Victimes_volences_sexuelles.Q10_filles_victimes_signalees_police',
      'form.Integer'
    ),
    makeSet(
      'total child victims',
      'CPE.CPE_actionplans.Victimes_volences_sexuelles.Q10_total_enfants_victimes',
      'form.Hidden value'
    ),
    makeSet(
      'Number of boys raped among victims of violence detected in the community referred to social services in the last 3 months',
      'CPE.CPE_actionplans.question12.Q15_garcon_victimes_viols_referees_services_sociaux',
      'form.Integer'
    ),
    makeSet(
      'Number of girls raped among victims of violence detected in the community referred to social services in the last 3 months',
      'CPE.CPE_actionplans.question12.Q15_filles_victimes_viols_referees_services_sociaux',
      'form.Integer'
    ),
    makeSet(
      'Specify social services',
      'CPE.CPE_actionplans.question12.Q15_preciser_servcices_sociaux',
      'form.Text'
    ),
    makeSet(
      'Q15_total_referees_services_sociaux',
      'CPE.CPE_actionplans.question12.Q15_total_referees_services_sociaux',
      'form.Hidden value'
    ),
    makeSet(
      'Number of boys abused in the last 3 months',
      'CPE.CPE_actionplans.question12.Q16_garcons_victimes_de_violences_physiques',
      'form.Integer'
    ),
    makeSet(
      'Number of girls victims of physical violence in the last 3 months',
      'CPE.CPE_actionplans.question12.Q16_filles_victimes_de_violences_physiques',
      'form.Integer'
    ),
    makeSet(
      'total victims of physical violence',
      'CPE.CPE_actionplans.question12.Q16_Total_enfants_victimes_de_violences_physiques',
      'form.Hidden value'
    ),
    makeSet(
      'Number of boys raped among victims of violence detected in the community referred to health services in last 3 months',
      'CPE.CPE_actionplans.victimes_viols.Q13_garcon_victimes_de_viols_referes_services_sante',
      'form.Integer'
    ),
    makeSet(
      'Number of girls raped among victims of violence detected in the community referred to health services in the last 3 months',
      'CPE.CPE_actionplans.victimes_viols.Q13_filles_victimes_de_viols_referes_services_sante',
      'form.Integer'
    ),
    makeSet(
      'Total child victims rapes referes health services',
      'CPE.CPE_actionplans.victimes_viols.Total_enfants_victimes_viols_referes_services_sante',
      'form.Hidden value'
    ),
    makeSet(
      'Number of boys raped among victims of violence detected in the community reported to police . gendarmerie . justice in last 3 months',
      'CPE.CPE_actionplans.victimes_viols.Q14_garcon_victimes_viols_signalees_police',
      'form.Integer'
    ),
    makeSet(
      'Nombre de filles victimes de viols parmi les victimes de violences détectées dans la communauté signalées à la police.gendarmerie.justice au cours des 3 derniers mois',
      'CPE.CPE_actionplans.victimes_viols.Q14_filles_victimes_viols_signalees_police',
      'form.Integer'
    ),
    makeSet(
      'total victims rapes reported',
      'CPE.CPE_actionplans.victimes_viols.Q14_Total_victimes_viols_signalees',
      'form.Hidden value'
    ),
    makeSet(
      'Number of male victims of sexual violence detected in the community referred to social services in the last 3 months',
      'CPE.CPE_actionplans.violences_referees_services_sociaux.Q11_garcons_victimes_signalees_services_sociaux',
      'form.Integer'
    ),
    makeSet(
      'Number of girls victims of sexual violence detected in the community referred to social services in the last 3 months',
      'CPE.CPE_actionplans.violences_referees_services_sociaux.Q11_filles_victimes_signalees_services_sociaux',
      'form.Integer'
    ),
    makeSet(
      'Specify social services',
      'CPE.CPE_actionplans.violences_referees_services_sociaux.Q11_preciser_services_sociaux',
      'form.Text'
    ),
    makeSet(
      'total child victims social services',
      'CPE.CPE_actionplans.violences_referees_services_sociaux.Q11_total_enfants_victimes_services_sociaux',
      'form.Hidden value'
    ),
    makeSet(
      'Number of boys raped among victims of violence detected in the community in last 3 months',
      'CPE.CPE_actionplans.violences_referees_services_sociaux.Q12_garcons_victimes_viols_detectees',
      'form.Integer'
    ),
    makeSet(
      'Number of girls raped among victims of violence detected in the community in last 3 months',
      'CPE.CPE_actionplans.violences_referees_services_sociaux.Q12_filles_victimes_viols_detectees',
      'form.Integer'
    ),
    makeSet(
      'total child victims of rape',
      'CPE.CPE_actionplans.violences_referees_services_sociaux.Q12_Total_enfants_victimes_de_viols',
      'form.Hidden value'
    ),
    makeSet(
      'Number of exchanges and advocacy sessions with men on the forms, consequences and responses to violence and abuse of children in the last 3 months?',
      'CPE.CPE_actionplans.violences_et_abus.Q22_sessions_dechange_et_plaidoyer_Homme',
      'form.Integer'
    ),
    makeSet(
      'Number of exchange and advocacy sessions with women on the forms, consequences and responses to violence and abuse of children in the last 3 months?',
      'CPE.CPE_actionplans.violences_et_abus.Q22_sessions_dechange_et_plaidoyer_Femmes',
      'form.Integer'
    ),
    makeSet(
      'Number of exchange and advocacy sessions with girls on the forms, consequences and responses to violence and abuse of children in the last 3 months?',
      'CPE.CPE_actionplans.violences_et_abus.Q22_sessions_dechange_et_plaidoyer_Filles',
      'form.Integer'
    ),
    makeSet(
      'Number of exchanges and advocacy sessions with boys on the forms, consequences and responses to violence and abuse of children in the last 3 months?',
      'CPE.CPE_actionplans.violences_et_abus.Q22_sessions_dechange_et_plaidoyer_Garcons',
      'form.Integer'
    ),
    makeSet(
      'Total sessions dechange et plaidoyer',
      'CPE.CPE_actionplans.violences_et_abus.Q22_Total_sessions_dechange_et_plaidoyer',
      'form.Hidden value'
    ),
    makeSet(
      'The number of exchange and advocacy sessions conducted with men to strengthen consensus among community leaders on the fundamentals, consequences and abandonment of FGM is',
      'CPE.CPE_actionplans.violences_et_abus.consensus_parmi_leader.Q22_sessions_dechange_et_plaidoyer_consensus_Hommes',
      'form.Integer'
    ),
    makeSet(
      'The number of exchange and advocacy sessions with women to build consensus among community leaders on the fundamentals, consequences and abandonment of FGM is',
      'CPE.CPE_actionplans.violences_et_abus.consensus_parmi_leader.Q22_sessions_dechange_et_plaidoyer_consensus_Femmes',
      'form.Integer'
    ),
    makeSet(
      'The number of exchange and advocacy sessions with girls to build consensus among community leaders on the fundamentals, consequences and abandonment of FGM is',
      'CPE.CPE_actionplans.violences_et_abus.consensus_parmi_leader.Q22_sessions_dechange_et_plaidoyer_consensus_filles',
      'form.Integer'
    ),
    makeSet(
      'The number of exchange and advocacy sessions with boys to build consensus among community leaders on the fundamentals, consequences and abandonment of FGM is',
      'CPE.CPE_actionplans.violences_et_abus.consensus_parmi_leader.Q22_sessions_dechange_et_plaidoyer_consensus_Garcons',
      'form.Integer'
    ),
    makeSet(
      'total number of exchanges and advocacy sessions consensus',
      'CPE.CPE_actionplans.violences_et_abus.consensus_parmi_leader.Q22_nmbre_sessions_dechange_et_plaidoyer_consensus_',
      'form.Hidden value'
    ),
    makeSet(
      'Number of educational talks with men on the forms, consequences and response to violence and abuse of children',
      'CPE.CPE_actionplans.causeries_educatives.Q22_causeries_educatives_Hommes',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with men on the forms, consequences and response to violence and abuse of children',
      'CPE.CPE_actionplans.causeries_educatives.Q22_causeries_educatives_Femmes',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with girls on the forms, consequences and response to violence and child abuse',
      'CPE.CPE_actionplans.causeries_educatives.Q22_causeries_educatives_Filles',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with boys on the forms, consequences and response to violence and child abuse',
      'CPE.CPE_actionplans.causeries_educatives.Q22_causeries_educatives_Garcons',
      'form.Integer'
    ),
    makeSet(
      'total number of educational talks',
      'CPE.CPE_actionplans.causeries_educatives.Q22_nbre_total_causeries_educatives_consequences',
      'form.Hidden value'
    ),
    makeSet(
      'The number of girls married before the age of 18 in the last 3 months',
      'CPE.CPE_actionplans.enregistrement_naissances.Q19_nombre_de_filles_mariees_avant_18ans',
      'form.Integer'
    ),
    makeSet(
      'The number of cases of marriage of children prevented or referred to social services in the last 3 months',
      'CPE.CPE_actionplans.enregistrement_naissances.Q20_nombre_de_cas_mariages_enfants_empeche_ou_referes',
      'form.Integer'
    ),
    makeSet(
      'The number of cases of marriage of children prevented or reported to the police . gendarmerie during the last 3',
      'CPE.CPE_actionplans.enregistrement_naissances.Q21_nombre_cas_mariage_enfants_empeches_ou_referes_police',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with men on the importance and methods of birth registration in the last 3 months?',
      'CPE.CPE_actionplans.enregistrement_naissances.Q22_nombre_causeries_Homme',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with women on the importance and methods of birth registration in the last 3 months?',
      'CPE.CPE_actionplans.enregistrement_naissances.Q22_nombre_causeries_Femmes',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks given to girls on the importance and methods of birth registration in the last 3 months?',
      'CPE.CPE_actionplans.enregistrement_naissances.Q22_nombre_causeries_Filles',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with boys on the importance and methods of birth registration in the last 3 months?',
      'CPE.CPE_actionplans.enregistrement_naissances.Q22_nombre_causeries_Garcon',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with men on the foundations, consequences and abandonment of excision',
      'CPE.CPE_actionplans.causeries_educative_excision.Q22_causeries_educatives_sur_les_fondements_Hommes',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with women on the foundations, consequences and abandonment of excision',
      'CPE.CPE_actionplans.causeries_educative_excision.Q22_causeries_educatives_sur_les_fondements_Femmes',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with girls on the foundations, consequences and abandonment of excision',
      'CPE.CPE_actionplans.causeries_educative_excision.Q22_causeries_educatives_sur_les_fondements_Filles',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with boys on the foundations, consequences and abandonment of excision',
      'CPE.CPE_actionplans.causeries_educative_excision.Q22_causeries_educatives_sur_les_fondements_Garcons',
      'form.Integer'
    ),
    makeSet(
      'total educational talk about the fundamentals',
      'CPE.CPE_actionplans.causeries_educative_excision.Q22_nbre_total_causeries_educatives_sur_les_fondements',
      'form.Hidden value'
    ),
    makeSet(
      'Number of exchange and advocacy sessions with men to build consensus among community leaders on the fundamentals, consequences and abandonment of child marriage?',
      'CPE.CPE_actionplans.causeries_educative_excision.Q22_nbre_sessions_echanges_et_plaidoyer_aupres_Homme_consensus',
      'form.Integer'
    ),
    makeSet(
      'Number of exchange and advocacy sessions with women to build consensus among community leaders on the fundamentals, consequences and abandonment of child marriage?',
      'CPE.CPE_actionplans.causeries_educative_excision.Q22_nbre_sessions_echanges_et_plaidoyer_aupres_Femmes_consensus',
      'form.Integer'
    ),
    makeSet(
      'Number of exchange and advocacy sessions with girls to build consensus among community leaders on the fundamentals, consequences and abandonment of child marriage?',
      'CPE.CPE_actionplans.causeries_educative_excision.Q22_nbre_sessions_echanges_et_plaidoyer_aupres_Filles_consensus',
      'form.Integer'
    ),
    makeSet(
      'Number of exchange and advocacy sessions with boys to build consensus among community leaders on the fundamentals, consequences and abandonment of child marriage?',
      'CPE.CPE_actionplans.causeries_educative_excision.Q22_nbre_sessions_echanges_et_plaidoyer_aupres_Garcons_consensus',
      'form.Integer'
    ),
    makeSet(
      'total number of exchanges and advocacy consensus',
      'CPE.CPE_actionplans.causeries_educative_excision.Q22_nbre_total_sessions_echanges_et_plaidoyer_consensus',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with men on the consequences of child marriage',
      'CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_causeries_educatives_consequenquences_mariages_Hommes',
      'form.Integer'
    ),
    makeSet(
      'Nombre de causeries éducatives auprès des femmes sur les conséquences du mariage d’enfant',
      'CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_causeries_educatives_consequenquences_mariages_Femmes',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with girls on the consequences of child marriage',
      'CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_causeries_educatives_consequenquences_mariages_Filles',
      'form.Integer'
    ),
    makeSet(
      'Number of educational talks with boys on the consequences of child marriage',
      'CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_causeries_educatives_consequenquences_mariages_Garcons',
      'form.Integer'
    ),
    makeSet(
      'total number of educational talks consequences marriages',
      'CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_nbre_total_causeries_educatives_consequenquences_mariages',
      'form.Hidden value'
    ),
    makeSet(
      'Number of "OTHERS" actions made by the \'Child Protection\' Commission among Men in the last 03 months',
      'CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_nombre_actions_AUTRES_Hommes',
      'form.Integer'
    ),
    makeSet(
      'Number of "OTHER" actions made by the "Child Protection" Commission among Women in the last 03 months',
      'CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_nombre_actions_AUTRES_Femmes',
      'form.Integer'
    ),
    makeSet(
      'Number of "OTHER" actions made by the "Protection of the Child" commission among Girls in the last 03 months',
      'CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_nombre_actions_AUTRES_Filles',
      'form.Integer'
    ),
    makeSet(
      'Number of "OTHER" actions made by the "Protection of the Child" commission with Boys during the last 03 months',
      'CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_nombre_actions_AUTRES_Garcons',
      'form.Integer'
    ),
    makeSet(
      'total other actions',
      'CPE.CPE_actionplans.causeries_educative_excision.causeries_educative_mariage.Q22_nombre_total_actions_AUTRES',
      'form.Hidden value'
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
