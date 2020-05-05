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
    field('CreatedDate', dataValue('form.var.date_interview')),
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
    makeSet('no consent', 'Qualitative', 'form.var.non_consentement'),
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
      'language of the interview',
      'ampi__Picklist_Response__c',
      'form.identification.langue_interview'
    ),
    makeSet(
      'indicate the language',
      'ampi__Text_Response__c',
      'form.identification.indiquez_langue'
    ),
    makeSet(
      'Identification of the respondent',
      'ampi__Picklist_Response__c',
      'form.identification.indentification_enquete'
    ),
    makeSet(
      'Does the respondent agree to start the interview now?',
      'ampi__Picklist_Response__c',
      'form.introduction.reponse_consentement'
    ),
    makeSet(
      'sex',
      'ampi__Picklist_Response__c',
      'form.demographiques.demographiques_qlist.dem_01_sexe'
    ),
    makeSet(
      'What is your ethnic group?',
      'ampi__Picklist_Response__c',
      'form.demographiques.demographiques_qlist.dem-02_groupe_ethnique'
    ),
    makeSet(
      'Specify the ethnic',
      'ampi__Text_Response__c',
      'form.demographiques.demographiques_qlist.autre_ethnie'
    ),
    makeSet(
      'how old are you',
      'ampi__Picklist_Response__c',
      'form.demographiques.demographiques_qlist.dem-03_age_group'
    ),
    makeSet(
      'What is your current marital status?',
      'ampi__Picklist_Response__c',
      'form.demographiques.situation_matrimoniale.dem_04_etat_matrimonial'
    ),
    makeSet(
      'Have you attended a formal school?',
      'ampi__Picklist_Response__c',
      'form.demographiques.education_qlist1.dem_05_ecole_formelle'
    ),
    makeSet(
      'If so, what is the highest level you have reached?',
      'ampi__Picklist_Response__c',
      'form.demographiques.education_qlist1.dem05x1_niveau_atteint'
    ),
    makeSet(
      'Have you stopped school?',
      'ampi__Picklist_Response__c',
      'form.demographiques.education_qlist1.dem05x2_arrete_scolarite'
    ),
    makeSet(
      'What are the reasons?',
      'ampi__Text_Response__c',
      'form.demographiques.education_qlist1.raisons.dem05x3_raisons_arrete'
    ),
    makeSet(
      'Please specify the reason',
      'ampi__Text_Response__c',
      'form.demographiques.education_qlist1.raisons.raison_arrete'
    ),
    makeSet(
      'Have you attended a Koranic school?',
      'ampi__Picklist_Response__c',
      'form.demographiques.Autres_education.dem_06_ecole_coranique'
    ),
    makeSet(
      'Did you participate in the Tostan PRCC classes?',
      'ampi__Picklist_Response__c',
      'form.demographiques.Autres_education.dem_07_classes_prcc'
    ),
    makeSet(
      'Do you have children?',
      'ampi__Picklist_Response__c',
      'form.demographiques.tranches_ages.dem_08_avez-vous_des_enfants'
    ),
    makeSet(
      'Number of children aged 0-12 months (0 to 1 year)',
      'ampi__Number_Response__c',
      'form.demographiques.tranches_ages.enfant_0-12_mois'
    ),
    makeSet(
      'Number of children aged 13-24 months (1 to 2 years)',
      'ampi__Number_Response__c',
      'form.demographiques.tranches_ages.enfant_13_24_mois'
    ),
    makeSet(
      'Number of children aged 25-36 months (2 to 3 years)',
      'ampi__Number_Response__c',
      'form.demographiques.tranches_ages.enfant_25_36_mois'
    ),
    makeSet(
      'Number of children aged 37-60 months (3 to 5 years)',
      'ampi__Number_Response__c',
      'form.demographiques.tranches_ages.enfant_37_60_mois'
    ),
    makeSet(
      'Number of children aged 61-72 months (5-6 years)',
      'ampi__Number_Response__c',
      'form.demographiques.tranches_ages.enfant_61_72_mois'
    ),
    makeSet(
      'total child zero three years',
      'Number',
      'form.demographiques.tranches_ages.total_enfant_zero_trois_ans'
    ),
    makeSet(
      'total child over three years',
      'Number',
      'form.demographiques.tranches_ages.total_enfant_plus_de_trois_ans'
    ),
    makeSet(
      'How many school children do you have?',
      'ampi__Number_Response__c',
      'form.demographiques.tranches_ages.enfants_scolarises.dem_10_enfants_scolarises'
    ),
    makeSet(
      'Do you have a child who has been regularly enrolled in school for the last 12 months?',
      'ampi__Picklist_Response__c',
      'form.demographiques.tranches_ages.enfants_scolarises.dem_11_enfants_inscrits_ecole'
    ),
    makeSet(
      'Do you have a child who was regularly enrolled in preschool in the last 12 months?',
      'ampi__Picklist_Response__c',
      'form.demographiques.tranches_ages.enfants_scolarises.dem_11x1_inscrit_prescolaire'
    ),
    makeSet(
      'Who in the family was responsible for his schooling',
      'ampi__Text_Response__c',
      'form.demographiques.tranches_ages.enfants_scolarises.dem_12_responsable_scolarite'
    ),
    makeSet(
      'Please specify who was responsible for the childs schooling',
      'ampi__Text_Response__c',
      'form.demographiques.tranches_ages.enfants_scolarises.responsable_scolarite_autre'
    ),
    makeSet(
      'Do you have children out of school?',
      'ampi__Picklist_Response__c',
      'form.demographiques.tranches_ages.enfants_scolarises.dem_13_enfants_non_scolarises'
    ),
    makeSet(
      'Specify the reasons',
      'ampi__Text_Response__c',
      'form.demographiques.tranches_ages.enfants_scolarises.prciser_les_raisons'
    ),
    makeSet(
      'Do you know human rights?',
      'ampi__Picklist_Response__c',
      'form.connaissances.question_droits_humains.cc_01_connaissance_droits_humains'
    ),
    makeSet(
      'Which Human Rights do you know?',
      'ampi__Text_Response__c',
      'form.connaissances.question_droits_humains.cc_01x1_droits_humains_connus'
    ),
    makeSet(
      'How do you think a husband can support his wife during pregnancy?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_relatives_sante.sante.CC02_soutien_mari_pdt_grssesse'
    ),
    makeSet(
      'How do you think a husband can support his wife who has just given birth?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_relatives_sante.sante.CC03_soutien_mari_apres_accouchement'
    ),
    makeSet(
      'Why should not we give water to children under 6 months?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_relatives_sante.sante.CC05_pas_deau_enfants_moins_de_6mois'
    ),
    makeSet(
      'After how long after delivery do you have to start breastfeeding?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_relatives_sante.sante.CC05_temps_debut_allaitement'
    ),
    makeSet(
      'What are the benefits of colostrum (the first milk, secreted by mothers in the first days after delivery) for the newborn?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_relatives_sante.sante.CC06_avantages_colostrum'
    ),
    makeSet(
      'Why should the pregnant woman go to prenatal consultation?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_relatives_sante.sante.CC07_femme_enceinte_aller_consultation'
    ),
    makeSet(
      'What are warning signs during pregnancy indicating the need for immediate medical care?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_relatives_sante.sante.CC08_signaux_alarme_grossesse'
    ),
    makeSet(
      'How many CGC events have you attended in the last 6 months in the health field?',
      'ampi__Number_Response__c',
      'form.connaissances.questions_sante.questions_relatives_sante.sante.activite_sante'
    ),
    makeSet(
      'What are the benefits of registering births that you know?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.CC09_avantages_inscription_etat_civil'
    ),
    makeSet(
      'Where should the birth of a child be registered for registration?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.lieu_declare_enfant'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.prcisez_autre'
    ),
    makeSet(
      'What is the maximum period for declaring a child normally in the register?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.CC11_delai_enregistrement_normal'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.preciser'
    ),
    makeSet(
      'In what additional period can one declare late the birth of his child in the civil status?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.CC12_delai_declaration_supplementaire'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.preciser_'
    ),
    makeSet(
      'If we go beyond one year after birth, can we still have a child registered?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.CC13_si_delai_depasse_enregistrement'
    ),
    makeSet(
      'How will you be able to register your child?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.CC13x1_ou_et_comment'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.prciser_autre'
    ),
    makeSet(
      'Can a woman declare the birth of her child alone?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.CC14femme_declarer_seule'
    ),
    makeSet(
      'Can a third party declare the birth of your child?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.CC15_un_tiers_declarer_enfant'
    ),
    makeSet(
      'What documents are needed to report the birth of your child?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.CC16_documents_pour_declarer'
    ),
    makeSet(
      'If a document is missing is what can be declared the birth of his child in civil status?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.CC17_si_document_manuquant'
    ),
    makeSet(
      'Under what conditions?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.CC17x1_quelles_conditions'
    ),
    makeSet(
      'How many activities have the CGC organized in the area of ​​civil status in the last 6 months?',
      'ampi__Number_Response__c',
      'form.connaissances.questions_sante.questions_etat_civil.etat_civil.activite_etat_civil'
    ),
    makeSet(
      'Do you think that you will be punished by others (members of the community) if you do not excite your daughter?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales.CC18_sanction_des_autres'
    ),
    makeSet(
      "Do you think that girls' marriage before the age of 18 is a religious prescription?",
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales.CC19_mariage_enfant_moins_18_prescription'
    ),
    makeSet(
      'What do you think are the possible distress signals for a child victim of violence . abuse?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales.CC20_signaux_enfant_victime_violence'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales.prciser_autre'
    ),
    makeSet(
      'How long do you think a rape victim should be referred to a health service for the best possible medical care?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales.CC21_delai_refere_victime_viol'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales.preciser'
    ),
    makeSet(
      'Do you think that a case of rape on a child should be brought to the attention of the police . gendarmerie . justice?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_2.CC22_viol_enfant_police_gendar-justice'
    ),
    makeSet(
      'Do you think that you will be punished by others . the community if you report to police . gendarmerie . justice a case of rape on a child?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_2.CC23_sanctionner_si_signaler_viol'
    ),
    makeSet(
      'Do you think that a case of excision should be brought to the attention of the police . gendarmerie . justice?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_2.CC24_excision_refere_police'
    ),
    makeSet(
      'Do you think that you will be punished by others . the community if you report to the police . gendarmerie . justice a case of excision?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_2.CC25_sanction_si_signaler_excision'
    ),
    makeSet(
      'Do you think that a girl marriage case before the legal age of 16 must be brought to the attention of the police . gendarmerie . justice?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_2.CC26_mariage_moins_de16_signaler_police'
    ),
    makeSet(
      'Do you think that you will be punished by others . the community if you report to the police . gendarmerie . justice a case of marriage before the legal age',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_2.CC27sanction_si_signaler_mariage_moins_de16'
    ),
    makeSet(
      'Do you know how to contact the members of the child protection committee?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC28_contacter_commission_protection'
    ),
    makeSet(
      'Which service would you go to first if your child is a victim of sexual violence?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC29_quel_service_si_violence_sexuelle'
    ),
    makeSet(
      'What service would you go to first if your child is a victim of rape?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC30_quel_service_si_viol'
    ),
    makeSet(
      'What service would you go to first if your child is physically abused?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC31_quel_service_si_violence_physique'
    ),
    makeSet(
      'Would you be willing to report to a service outside the community if you knew of a child rape case?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC32_pret_signaler_viol_a_lexterieur'
    ),
    makeSet(
      'What service?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC32x1_quel_service'
    ),
    makeSet(
      'Would you be willing to report to a service outside the community if you were aware of a child victim of sexual violence',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC33_pret_signaler_victime_negligence_exterieur'
    ),
    makeSet(
      'What service?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC33x1_quel_service_si_negligence'
    ),
    makeSet(
      'Would you be willing to report to a non-community service if you were aware of a child victimized by Physical Violence . Ill-treatment?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC34_pret_signaler_victime_violence_physique_exterieur'
    ),
    makeSet(
      'What service?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC34x1_quels_sevices'
    ),
    makeSet(
      'Would you be willing to report to a service outside the community if you were aware of a child neglected case?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC35_pret_signaler_victime_negligence_exterieur'
    ),
    makeSet(
      'What service?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC35x1_quels_services'
    ),
    makeSet(
      'Would you be willing to report to a service outside the community if you were aware of a child victim of trafficking?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC36_pret_signaler_victime_traite_exterieur'
    ),
    makeSet(
      'What service?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC36x1_quels_services'
    ),
    makeSet(
      'Would you be willing to report to a service outside the community if you were aware of a child victim of Exploitation . Hazardous or Early Work?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC37_pret_signaler_victime_exploitation_exterieur'
    ),
    makeSet(
      'What service?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC37x1_quels_services'
    ),
    makeSet(
      'Would you be willing to report to a service outside the community if you were aware of a case of child victim of excision?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC38_pret_signaler_victime_excision'
    ),
    makeSet(
      'What service?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC38x1_quels_services'
    ),
    makeSet(
      'Would you be willing to report to a service outside the community if you were aware of a Child Child victim case?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC39_pret_signaler_victime_mariage_enfant_exterieur'
    ),
    makeSet(
      'What service?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_3.CC39x1_quels_services'
    ),
    makeSet(
      'Are you for or against the practice of excision?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_4_excision.CC48_pour_ou_contre_excision'
    ),
    makeSet(
      'Do you think this practice (excision) should be maintained or should it disappear?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_4_excision.CC49_excision_maitenue_ou_disparaitre'
    ),
    makeSet(
      'why?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_4_excision.CC49x1_pourquoi'
    ),
    makeSet(
      'Do you know the harmful consequences of excision?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_4_excision.CC50_connait_consequences_excision'
    ),
    makeSet(
      'What are the harmful consequences of excision that you know?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_4_excision.CC51_consequences_connues'
    ),
    makeSet(
      'Can you tell me how you feel about the next sentence?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_4_excision.CC52_dire_sentiment'
    ),
    makeSet(
      'The majority of people in my community excise or intend to excise their daughter, if they have one, at the right age',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_4_excision.CC52a_sentiment_majoriite_com_fait_excision'
    ),
    makeSet(
      'A woman who is not circumcised will have difficulty finding a husband',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_4_excision.CC53_femme_non_excisee_pas_mari'
    ),
    makeSet(
      'A woman who is not circumcised will be frowned upon by other members of the community',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_4_excision.CC54_femme_non_excisee_mal_vue'
    ),
    makeSet(
      'In your opinion, what explains the practice of excision?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_4_excision.CC55_explication_excision'
    ),
    makeSet(
      'Are you for or against the marriage of girls under 18?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.CC56_pour_ou_contre_mariage_enfant'
    ),
    makeSet(
      'why',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.pourquoi'
    ),
    makeSet(
      'Do you know the harmful consequences of child marriage?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.CC57_connait_consequence_mariage_enfant'
    ),
    makeSet(
      'What are the harmful consequences of child marriage that you know',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.CC58_consequence_mariage_connues'
    ),
    makeSet(
      'Specify other consequences',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.prciser_autre_consquence'
    ),
    makeSet(
      'What is the youngest age that you find acceptable for a girl to get married?',
      'ampi__Number_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.CC60_plus_jeune_age_acceptable_mariage_fille'
    ),
    makeSet(
      'What is the youngest age that you find acceptable for a boy to get married?',
      'ampi__Number_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.CC61_plus_jeune_age_acceptable_mariage_garcon'
    ),
    makeSet(
      'How many girls in your community do you think were married before the age of 18?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.CC62_nbre_fille_marie_avant_18ans'
    ),
    makeSet(
      'How many girls in your community do you think were married before the age of 18 against their will?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.CC63_fille_marie_contre_volonte'
    ),
    makeSet(
      'A boy who is already 18 and has not married yet will have trouble getting married later',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.CC67_garcon_difficulte_mariage_apres_18an'
    ),
    makeSet(
      'Who, in your opinion, can influence a family so that they do not give birth to their minor daughter?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.qui__votre_avis_peut_influencer_une_famille_pour_quelle_ne_donne_pas_sa_fil'
    ),
    makeSet(
      'In your opinion, what explains . justifies the marriage of girls before the age of 18?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.CC69_justification_mariage_fille_avant_18ans'
    ),
    makeSet(
      'In the last 6 months, how many activities related to social norms (promotion of abandonment of FGM, child marriage, etc.) organized by the CGC, did you participate?',
      'ampi__Number_Response__c',
      'form.connaissances.questions_sante.questions_normes_sociales.normes_sociales_5_mariage_des_enfants.active_normes_sociales'
    ),
    makeSet(
      'What is the critical period for brain development:',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.Developpement__cerveau__impact_violence.CC70_Periode_critique_pour_developpement_cerveau'
    ),
    makeSet(
      'At what period of pregnancy does baby learning begin?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.Developpement__cerveau__impact_violence.CC71_periode_grossesse_commence_apprentissage_bebe'
    ),
    makeSet(
      'What is the impact of violence on child survival and development, especially on the brain?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.Developpement__cerveau__impact_violence.CC72_impact_violence_survie_developpement_enfant'
    ),
    makeSet(
      'Violence inhibits its growth',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.Developpement__cerveau__impact_violence.CC72a_la_violence_inhibe_sa_croissance'
    ),
    makeSet(
      'Violence creates a sense of frustration',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.Developpement__cerveau__impact_violence.CC72b_la_violence_cre_un_sentiment_de_frustration'
    ),
    makeSet(
      'Violence creates an angry character',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.Developpement__cerveau__impact_violence.CC72c_la_violence_cree_un_caractre_colereux'
    ),
    makeSet(
      'Violence brings trauma',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.Developpement__cerveau__impact_violence.CC72d_la_violence_amene_des_traumatismes'
    ),
    makeSet(
      'Violence blocks reflection',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.Developpement__cerveau__impact_violence.CC72e_la_violence_bloque_la_rflexion'
    ),
    makeSet(
      'Violence creates a lack of self-confidence',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.Developpement__cerveau__impact_violence.CC72f_la_violence_cre_un_manque_de_confiance_en_soi'
    ),
    makeSet(
      'Violence creates other impacts',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.Developpement__cerveau__impact_violence.CC72g_la_violence_cre_dautres_impacts'
    ),
    makeSet(
      'Precise others',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.Developpement__cerveau__impact_violence.Preciser_autres'
    ),
    makeSet(
      'What are the signs of suffering in a child who has experienced violence?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73__signes_de_souffrance_chez_un_enfant_qui_a_subi_une_violence'
    ),
    makeSet(
      'Do not know',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73a_ne_sait_pas'
    ),
    makeSet(
      'Isolation',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73b_isolement'
    ),
    makeSet(
      'Do not eat',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73b_ne_mange_pas'
    ),
    makeSet(
      'nightmares',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73c_cauchemars'
    ),
    makeSet(
      'Urinate in bed',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73d_uriner_au_lit'
    ),
    makeSet(
      'To fear',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73e_avoir_peur'
    ),
    makeSet(
      'Low school performance',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73f_resultats_scolaires_faibles'
    ),
    makeSet(
      'Stomach aches',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73g_maux_de_ventre'
    ),
    makeSet(
      'Frustration',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73h_frustration'
    ),
    makeSet(
      'Lack of self-confidence',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73i_manque_de_confiance_en_soi'
    ),
    makeSet(
      'Trauma',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73j_traumatisme'
    ),
    makeSet(
      'CC73k_autres',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC73k_autres'
    ),
    makeSet(
      'Precise other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.preciser_autre'
    ),
    makeSet(
      'What can bring down the childs learning and intellectual faculties, and even cretinism?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.developpement_cerveau.signes_de_souffrance.CC74_causes_baisse_facultes_apprentissage_intellectuelles'
    ),
    makeSet(
      'Why do you think it is important to talk to babies and young children?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.parler_aux_bbs_et_aux_jeunes_enfants.CC75_selon_vous_pourquoi__important__parler__bbs__aux_jeunes_enfant'
    ),
    makeSet(
      'Allows adults to start properly filling the childs brain lockers.',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.parler_aux_bbs_et_aux_jeunes_enfants.CC75a_parler_permet_aux_adultes_de_commencer__remplir_correctement'
    ),
    makeSet(
      'Prepare the child for school and for all forms of learning.',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.parler_aux_bbs_et_aux_jeunes_enfants.CC75b_prepare_enfant_pour_ecole_et__toutes_formes_apprentissages'
    ),
    makeSet(
      'Develops your brain and the different forms of intelligence (especially language intelligence)',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.parler_aux_bbs_et_aux_jeunes_enfants.CC75c_developpe_son_cerveau_et_diffrentes_formes_intelligence'
    ),
    makeSet(
      'enriches his vocabulary',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.parler_aux_bbs_et_aux_jeunes_enfants.CC75d_enrichit_son_vocabulaire'
    ),
    makeSet(
      'Other',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.parler_aux_bbs_et_aux_jeunes_enfants.CC75e_autres'
    ),
    makeSet(
      'Precise others',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.parler_aux_bbs_et_aux_jeunes_enfants.preciser_autres'
    ),
    makeSet(
      'Can you name the different ways you can communicate with your children?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.comment_parler_au_bb_et_au_jeune_enfant.CC76_pouvez_vous_citer_diffrentes_facons_dont_vous_pouvez_communiquer_avec_enfants'
    ),
    makeSet(
      'Tell them stories, stories and experiences',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.comment_parler_au_bb_et_au_jeune_enfant.CC76a_raconter_des_contes_des_histoires_et_des_expriences'
    ),
    makeSet(
      'Read books and booklets and ask questions about drawings and content',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.comment_parler_au_bb_et_au_jeune_enfant.CC76b_lire_des_livres_livrets_poser_des_questions_sur_dessins_et_contenus'
    ),
    makeSet(
      'Sing them songs',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.comment_parler_au_bb_et_au_jeune_enfant.CC76c_leur_chanter_des_chansons'
    ),
    makeSet(
      'Ask them some riddles',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.comment_parler_au_bb_et_au_jeune_enfant.CC76d_leur_poser_des_devinettes'
    ),
    makeSet(
      'Play with them',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.comment_parler_au_bb_et_au_jeune_enfant.CC76e_jouer_avec_eux'
    ),
    makeSet(
      'Ask them to tell stories, their day, a trip, an experience',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.comment_parler_au_bb_et_au_jeune_enfant.CC76f_leur_demander_raconter_des_contes_journe_voyage_exprience'
    ),
    makeSet(
      'Listen to them and encourage them to speak',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.comment_parler_au_bb_et_au_jeune_enfant.CC76g_les_ecouter_et_les_encourager__parler'
    ),
    makeSet(
      'Other',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.comment_parler_au_bb_et_au_jeune_enfant.CC76h_autres'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.limportance_de_parler_aux_bebes_et_aux_jeunes_enfants.comment_parler_au_bb_et_au_jeune_enfant.preciser_autre'
    ),
    makeSet(
      'What can a father do to be more involved in the development of his child?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.le_role_des_peres_dans_le_developpement_lenfant.CC77_que_peut_faire_un_pere_pour_mieux_simpliquer_dveloppement_enfant'
    ),
    makeSet(
      'Reading books to children',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.le_role_des_peres_dans_le_developpement_lenfant.CC77a_lire_des_livres_aux_enfants'
    ),
    makeSet(
      'Playing with his children',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.le_role_des_peres_dans_le_developpement_lenfant.CC77b_jouer_avec_ses_enfants'
    ),
    makeSet(
      'Tell their children stories or their own experiences',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.le_role_des_peres_dans_le_developpement_lenfant.CC77c_raconter_des_histoires_ou_leurs_propres_expriences__ses_enfants'
    ),
    makeSet(
      'Establish a fathers club to encourage good educational practices',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.le_role_des_peres_dans_le_developpement_lenfant.CC77d_etablir_club_des_peres_pour_encourager_les_bonnes_pratiques_educatives'
    ),
    makeSet(
      'Better follow the education of his children at school',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.le_role_des_peres_dans_le_developpement_lenfant.CC77e_mieux_suivre_education_de_ses_enfants_ecole'
    ),
    makeSet(
      'Bring her children to participate in activities of discovery of the environment, events',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.le_role_des_peres_dans_le_developpement_lenfant.CC77f_amener_ses_enfants__participer_dans_des_activites_decouverte_du_milieu'
    ),
    makeSet(
      'Ensure a good diet for your child',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.le_role_des_peres_dans_le_developpement_lenfant.CC77g_assurer_une_bonne_alimentation_de_son_enfant'
    ),
    makeSet(
      'Other',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.le_role_des_peres_dans_le_developpement_lenfant.CC77h_autres'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.le_role_des_peres_dans_le_developpement_lenfant.perciser_autres'
    ),
    makeSet(
      'According to you, why is it important to follow the schooling of your child at school?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.importance_suivi_scolaire.CC78_selon_vous_pourquoi_est-il_important_de_suivre_la_scolarite_enfant'
    ),
    makeSet(
      'School monitoring allows parents to check their punctuality and attendance at school',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.importance_suivi_scolaire.CC78a_le_suivi_scolaire_permet_parents_verifier_ponctualit_assiduite'
    ),
    makeSet(
      'School monitoring allows parents to talk to teachers about the childs performance at school',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.importance_suivi_scolaire.CC78b_le_suivi_scolaire_permet_parents_echanger_enseignants_sur_les-performances'
    ),
    makeSet(
      'School monitoring allows parents to help their child improve their performance',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.importance_suivi_scolaire.CC78c_le_suivi_scolaire_permet_parents_aider_enfant__ameliorer_perforrmances'
    ),
    makeSet(
      'School monitoring allows parents to inquire about their problems at school',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.importance_suivi_scolaire.CC78d_le_suivi_scolaire_permet_parents_de_senquerir_problemes_ecole'
    ),
    makeSet(
      'Other',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.importance_suivi_scolaire.CC78e_autres'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.importance_suivi_scolaire.preciser_autre'
    ),
    makeSet(
      'How to follow your child at home?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC79_comment_suivre_son_enfant__domicile'
    ),
    makeSet(
      'Check all his homework',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC79a_verifier_tous_ses_devoirs'
    ),
    makeSet(
      'Support the child on his homework',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC79b_appuyer_enfant_sur_ses_devoirs'
    ),
    makeSet(
      'Give him exercises to do',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC79c_lui_donner_des_exercices__faire'
    ),
    makeSet(
      'Find him a repeater',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC79d_lui_trouver_un_repetiteur'
    ),
    makeSet(
      'Give the child all the material needed for success',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC79e_donner_enfant_tout_materiel_necessaire_pour_sa_reussite'
    ),
    makeSet(
      'Encourage . build trust',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC79f_encourager_mettre_en_confiance'
    ),
    makeSet(
      'Other',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC79g_autres'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.preciser_autres'
    ),
    makeSet(
      'What scientific explanations do you give to those who are nicknamed jinn babies?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC80_quelles_explications_scientifiques_donnez-vous_ceux_surnomme_bbs_djinn'
    ),
    makeSet(
      'They are malnourished children',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC80a_ce_sont_des_enfants_mal_nourris'
    ),
    makeSet(
      'These are children born with malformations',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC80b_ce_sont_des_enfants_nes_avec_des_malformations'
    ),
    makeSet(
      'They are children with other diseases',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC80c_ce_sont_des_enfants_avec_dautres_maladies'
    ),
    makeSet(
      'Other',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.CC80d_autres'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.prciser_autres'
    ),
    makeSet(
      'In the past 6 months, how many activities related to childrens education have you participated in through the CGC?',
      'ampi__Number_Response__c',
      'form.connaissances.questions_sante.questions_relatives_au_suivi-scolaire.suivi__domicile.activite_education'
    ),
    makeSet(
      'Can you tell me the different forms of intelligence?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC81_Pouvez-vous_citer_les_differentes_formes_intelligence'
    ),
    makeSet(
      'Emotional intelligence',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC81a_intelligence_emotionnelle'
    ),
    makeSet(
      'Social Intelligence',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC81b_intelligence_sociale'
    ),
    makeSet(
      'Psychomotor intelligence',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC81c_intelligence_psychomotrice'
    ),
    makeSet(
      'Language Intelligence',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC81d_intelligence_langagire'
    ),
    makeSet(
      'Logical-mathematical intelligence',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC81e_intelligence_logico-mathematique'
    ),
    makeSet(
      'Other',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC81f_autres'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.preciser_autres'
    ),
    makeSet(
      'How important is emotional intelligence?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC82_quelle_est_limportance_lintelligence_emotionnelle'
    ),
    makeSet(
      'It allows the child to develop empathy or the ability to put oneself in the others shoes',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC82a_permet_enfant_dvelopper_empathie_capacite_de_se_mettre_place_autre'
    ),
    makeSet(
      'It allows the child to recognize his emotions and manage them',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC82b_permet_enfant_reconnatre_ses_emotions_et_les_gerer'
    ),
    makeSet(
      'It allows the child to live in community more easily',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC82c_permet_enfant_vivre_en_communaute_plus_facilement'
    ),
    makeSet(
      'She is the mother of all forms of intelligence',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC82d_elle_est_la_mere_de_toutes_les_formes_dintelligence'
    ),
    makeSet(
      'Other',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.CC82e_autres'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.les_differentes_formes_dintelligence.formes_et_importance_de_lintelligence.prciser_autre'
    ),
    makeSet(
      'What would be your attitude or position if you saw a member of your family doing ...',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83_votre_attitude_ou_position_si_vous_voyiez_un_membre_de_votre_famille'
    ),
    makeSet(
      'To marry your daughter before the age of 18',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83a_marier_sa_fille_avant_age_18ans'
    ),
    makeSet(
      'Report a case of rape to the police',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83b_denoncer_un_cas_de_viol__la_police'
    ),
    makeSet(
      'Excise her daughter',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83c_exciser_sa_fille'
    ),
    makeSet(
      'Hitting his child to educate him',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83d_frapper_son_enfant_pour_eduquer'
    ),
    makeSet(
      'Speak with the child during pregnancy (5-6 months of pregnancy)',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83e_parler_enfant_pendant_grossesse_5-6_mois_de_grossesse'
    ),
    makeSet(
      'Talking with the child 2 months after birth as if he were an adult',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83f_parler_enfant_2_mois_aprs_la_naissance_comme_un_adulte'
    ),
    makeSet(
      'Speak with the child 1 year after birth as if he were an adult',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83g_parler_enfant_1_an_aprs_la_naissance_comme_un_adulte'
    ),
    makeSet(
      'Watch the child in the eyes for a long time',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83h_regarder_enfant_dans_les_yeux_pendant_longtemps'
    ),
    makeSet(
      'Accompany your child in the game',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83i_accompagner_son_enfant_dans_le_jeu'
    ),
    makeSet(
      'Use books or pictures as support for interaction with the child',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83j_utiliser_livres_images_comme_support_dinteraction_avec_enfant'
    ),
    makeSet(
      'Help the child discover facial features',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83k_aider_enfant__decouvrir_les_traits_du_visage'
    ),
    makeSet(
      'Help the child discover objects by explaining size, color, shape.',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83l_aider_enfant__decouvrir_objets_en_lui_expliquant_taille_couleur_forme'
    ),
    makeSet(
      'A man or father who is involved in the education of his child',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83m_homme_pere_qui_simplique_dans_education_enfant'
    ),
    makeSet(
      'A father playing with his child',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83n_pere_qui_joue_avec_son_enfant'
    ),
    makeSet(
      'A father who is involved in the nutrition of his child',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83o_pere_qui_simplique_dans_la_nutrition_de_son_enfant'
    ),
    makeSet(
      'Members of your community who are involved in child abuse',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83p_membres_communaut_qui_simpliquent_dans_les_cas_maltraitance'
    ),
    makeSet(
      'Always have the child sleep under an impregnated mosquito net',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83q_faire_toujours_dormir_enfant_sous_moustiquaire_impregne'
    ),
    makeSet(
      'Congratulate the child with enthusiasm when he makes a positive action',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83r_feliciter_enfant_avec_enthousiasme_quand_il_fait_une_action_positive'
    ),
    makeSet(
      'Do not hit the child even if he is doing a negative action',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83s_ne_pas_frapper_enfant_meme_sil_fait_une_action_ngative'
    ),
    makeSet(
      'Discuss with the child to reason with him even if he is doing a negative action',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.attitude_personnelle.CC83t_discuter_avec_enfant_pour_le_raisonner_meme_sil_fait_une_action_negative'
    ),
    makeSet(
      'Methods used',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC84_methodes_utilises_pour_apprendre_enfants_bien_comporter'
    ),
    makeSet(
      'Remove privileges',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC84a_retirer_des_privileges'
    ),
    makeSet(
      'Explain the bad behavior',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC84b_expliquer_le_mauvais_comportement'
    ),
    makeSet(
      'Shake it',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC84c_le_la_secouer'
    ),
    makeSet(
      'Scream, scream at him',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC84d_hurler_lui_crier_dessus'
    ),
    makeSet(
      'Give something else to do',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC84e_donner_quelque_chose_dautre__faire'
    ),
    makeSet(
      'Spanking, hitting or banging on the buttocks with bare hands',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC84f_donner_fesse_frapper_taper_sur_les_fesses_avec_mains_nues'
    ),
    makeSet(
      'Hitting with belt, brush, stick or other hard objects',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC84g_frapper_avec_ceinture_brosse_baton_autres_objets_durs'
    ),
    makeSet(
      'The treat of idiot, lazy, or other names',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC84h_traiter_idiot_paresseux_ou_dautres_noms'
    ),
    makeSet(
      'Hit . slap on face, head, or ears',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC84i_frapper_gifler_sur_le_visage_la_tete_ou_les_oreilles'
    ),
    makeSet(
      'Hitting . kicking hands, arms or legs',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC84j_frapper_taper_sur_les_mains_bras_ou_jambes'
    ),
    makeSet(
      'The beat, hit again and again as hard as possible',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC84k_battre_frapper_encore_et_encore_aussi_fort_que_possible'
    ),
    makeSet(
      'Do you think that in order to raise or educate a child properly, it is necessary that he be punished physically?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.methodes_de_correction_utilisee.CC85_pensez-vous_que_elever_eduquer_correctement_un_enfant_necessaire_puni_physiquement'
    ),
    makeSet(
      'While your child had diarrhea, was he . she drinking less than usual, about the same amount or more than usual?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.traitement_diarrh.CC86_pendant_que_votre_enfant_avait_diarrhe_recu_boire_moins_que_habitude'
    ),
    makeSet(
      'Have you sought any advice or treatment against diarrhea from any source (hospital, family, friends ...)?',
      'ampi__Picklist_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.traitement_diarrh.CC87_avez-vous_recherche_des_conseils_traitement_contre_diarrhe_de_nimporte_source'
    ),
    makeSet(
      'why',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.traitement_diarrh.CC88_pourquoi'
    ),
    makeSet(
      'Do you know the critical moments of hand washing?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.lavage_des_mains.CC89_connaissez-vous_moments_critiques_lavage_des_mains'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.lavage_des_mains.preciser_autres'
    ),
    makeSet(
      'When do people in your household wash their hands more often?',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.lavage_des_mains.CC90_quels_moments_membres_menage_se_lavent_le_plus_souvent_mains'
    ),
    makeSet(
      'Specify other',
      'ampi__Text_Response__c',
      'form.connaissances.questions_sante.attitudes_et_pratiques.lavage_des_mains.perciser_autres'
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
