// Questionnaire DS RPP
steps(
  upsert('ampi__Submission__c', 'Submission_ID__c', fields(
      field('ampi__Description__c', dataValue('form.@name')),
      field('Submission_ID__c', dataValue('id')),
      field('Location__c', dataValue('form.coordonnes_gps')),
      relationship('Project__r', 'Project_ID__c', (state)=>{ //TEST
        const projID = state.data.id + "-"+ state.data.form.fixture_localization.village //confirm format of ID
        return projID;
      }),
      field('CreatedDate', dataValue('form.var.date_interview')) //can we edit CreatedDate?
    )),
  //HARDCODED QUESTIONS FOR THIS SUBMISSION
    //Row 11
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'non_consentement'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'non_consentement'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.var.non_consentement')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 13
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'departement'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'departement'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.identification.fixture_localization.departement')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 14
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'commune'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'commune'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.identification.fixture_localization.commune')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 15
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'village'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'village'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.identification.fixture_localization.village')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 16
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'langue_interview'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Language of the interview'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.identification.langue_interview')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 17
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'indiquez_langue'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Indicate the language'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.identification.indiquez_langue')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 18
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'indentification_enquete'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Identification of the respondent'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.identification.indentification_enquete')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 24
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'reponse_consentement'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Does the respondent agree to start the interview now?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.reponse_consentement')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 26
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'groupe_ethnique'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is your ethnic group?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.questions_demographiques.q2_quel_est_votre_groupe_ethnique')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 27
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'groupe_ethnique_other'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.questions_demographiques.prciser_autres')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 28
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q3_quel_age_avez-vous'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How old are you'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.questions_demographiques.q3_quel_age_avez-vous')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 29
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'etat_matrimonial_actuel'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is your current marital status?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.questions_demographiques.q4_quel_est_votre_etat_matrimonial_actuel')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 31
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'une_ecole_formelle'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Have you attended a formal school?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.questions_demographiques.education.q5_avez-vous_frequente_une_ecole_formelle')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 32
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q5x1_quel_est_le_plus_haut_niveau'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'what is the highest level you have reached?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.questions_demographiques.education.q5x1_quel_est_le_plus_haut_niveau_que_vous_avez_atteint')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 33
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q5x2_est-ce_que_vous_avez_arrete_votre_scolarite'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Have you stopped school?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.questions_demographiques.education.q5x2_est-ce_que_vous_avez_arrete_votre_scolarite')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 34
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q5x3_quelles_sont_les_raisons'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Have you stopped school?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.questions_demographiques.education.q5x3_quelles_sont_les_raisons')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 35
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q5x3_preciser_autre'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Have you stopped school?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.questions_demographiques.education.preciser_autre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 37
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q6_avez-vous_frequente_une_ecole_coranique'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Have you attended a Koranic school?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.questions_demographiques.education.education_informelle.q6_avez-vous_frequente_une_ecole_coranique')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 38
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q7_avez-vous_participe_dans_les_classes'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Did you participate in the Tostan PRCC classes?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.questions_demographiques.education.education_informelle.q7_avez-vous_participe_dans_les_classes_du_programme_prcc_de_tostan')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 40
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q8_avez-vous_des_enfants'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you have children?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.q8_avez-vous_des_enfants')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 41
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'tranche1'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many children are between 0-12 months (0-1yr)'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.tranche1')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 42
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'tranche2'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many children are between 13-24 months (1 to 2 years)'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.tranche2')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 43
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'tranche3'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many children are between 25-36 months (2 to 3 years)'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.tranche3')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 44
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'tranche4'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many children are between 37-60 months (2 to 3 years)'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.tranche4')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 45
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'tranche5'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many children are between 61-72 months (5-6 years)'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.tranche5')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 46
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'total_enfant_zero_trois_ans'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Total enfants'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.total_enfant_zero_trois_ans')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 47
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'enfant_zero_trois_ans'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'The number of children aged 0 to 3 is: <output value = "# form / slices_ages / total_child_zero_three_years" />'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.enfant_zero_trois_ans')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 48
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'total_enfant_plus_de_trois_ans'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'total children of 3 years'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.total_enfant_plus_de_trois_ans')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 50
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'enfants_scolarises'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Child schooling'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.enfants_scolarises')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 51
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q10_enfants_scolarises'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many school children do you have?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.tranches_ages.q10_enfants_scolarises')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 52
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q11_enfants_inscrits_ecole'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you have a child who has been regularly enrolled in school for the last 12 months?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.q11_enfants_inscrits_ecole')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 53
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q11xa_inscrit_prescolaire'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Have you ever been enrolled in preschool for the past 12 months?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.q11xa_inscrit_prescolaire')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 54
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q12_responsable_scolarite'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Who in the family was responsible for his schooling'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.q12_responsable_scolarite')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 55
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'responsable_scolarite_autre'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Please specify who was responsible for the child's schooling'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.tranches_ages.responsable_scolarite_autre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 56
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q13_enfants_non_scolarises'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you have children out of school?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.tranches_ages.q13_enfants_non_scolarises')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 57
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q13_prciser_les_raisons'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify the reasons'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.tranches_ages.prciser_les_raisons')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 60
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q1_age_enfant'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Age of the youngest child in question (in months)'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.sexe_age_enfant.q1_age_enfant')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 61
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q2_sexe_enfant'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Gender of the child considered'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.sexe_age_enfant.q2_sexe_enfant')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 62
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q3_sexe_ds'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Is the DS sex?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.sexe_age_enfant.q3_sexe_ds')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 64
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'qu_fait_enfant_observation'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What does the child do at the moment of observation?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text__Response__c', dataValue('form.observation_enfant.qu_fait_enfant_observation')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 65
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'prciser_autre_enfant_observation'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text__Response__c', dataValue('form.observation_enfant.prciser_autre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 67
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'fait_pendant_allaitement'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Can you tell me what you do when you breastfeed?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text__Response__c', dataValue('form.dispensateurs_de_soin.fait_pendant_allaitement')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 68
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'prciser_autre_fait_pendant_allaitement'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text__Response__c', dataValue('form.dispensateurs_de_soin.prciser_autre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 69
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q6_aider_votre_enfant__apprend'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Can you show me how you are doing to help your child learn to count?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text__Response__c', dataValue('form.counting.q6_pouvez-vous_me_montrer_comment_vous_faites_pour_aider_votre_enfant__apprend')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 73
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'communication_mere_enfant'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'There are many ways a mom communicates with a child. Can you explain to me how you communicate with your child?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text__Response__c', dataValue('form.communication.communication_mere_enfant.communication_mere_enfant')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 74
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'communication_prciser_autre'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text__Response__c', dataValue('form.communication.communication_mere_enfant.prciser_autre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 76
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q8_ou_dort_enfant'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Where does your child spend most of the night?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c__Response__c', dataValue('form.dormir_enfant.q8_ou_dort_enfant')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 77
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q8_prciser_ailleurs'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c__Response__c', dataValue('form.dormir_enfant.prciser_ailleurs')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 78
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q9_moustiquaire'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Does he sleep under mosquito net?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c__Response__c', dataValue('form.dormir_enfant.q9_moustiquaire')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 81
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q10_decouvrir_objets'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'From your point of view, are there things that the child can learn or discover from the objects that are around him?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c__Response__c', dataValue('form.application_bonnes_pratiques2.decouverte.q10_decouvrir_objets')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 82
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q10x1_si_oui_quoi'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'If yes, what?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c__Response__c', dataValue('form.application_bonnes_pratiques2.decouverte.q10x1_si_oui_quoi')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 83
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q10x1_autre_preciser'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c__Response__c', dataValue('form.application_bonnes_pratiques2.decouverte.autre_preciser')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 84
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q11_decouvrir_objets'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Can you show me how you are doing to help your child discover the objects ** (present 3 pots of different colors to the respondent) **?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c__Response__c', dataValue('form.application_bonnes_pratiques2.decouverte.q11_decouvrir_objets')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 85
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q11_autre_preciser'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c__Response__c', dataValue('form.application_bonnes_pratiques2.decouverte.autre_preciser')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 86
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q12_nommer_objets'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Can you show me how you are doing to help your child name the objects ** (present 3 pots of different colors to the respondent **?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c__Response__c', dataValue('form.application_bonnes_pratiques2.decouverte.q12_nommer_objets')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 87
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q12_autre_preciser'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c__Response__c', dataValue('form.application_bonnes_pratiques2.decouverte.q12_autre_preciser')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 88
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q13_categoriser_objets'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Can you show me how you are helping your child to categorize the items ** (present 3 pots of different colors to the respondent) **?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c__Response__c', dataValue('form.application_bonnes_pratiques2.decouverte.q13_categoriser_objets')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 89
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q13_autre_preciser'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c__Response__c', dataValue('form.application_bonnes_pratiques2.decouverte.q13_autre_preciser')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 90
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q14_question_visage'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Speaking of discovering objects and the world, we can take the example of the face. Have you tried to tell your child about facial features?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c__Response__c', dataValue('form.application_bonnes_pratiques2.decouverte.q14_question_visage')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 91
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q14x1_que_fait_visage'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What did you do?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c__Response__c', dataValue('form.application_bonnes_pratiques2.decouverte.q14x1_que_fait_visage')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 92
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q14x1_autre_preciser'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c__Response__c', dataValue('form.application_bonnes_pratiques2.decouverte.q14x1_autre_preciser')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 94
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q15_livres_rpp'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you have any books shared by Tostans RPP program?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c__Response__c', dataValue('form.Reading.q15_livres_rpp')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 95
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q15x1_liste_livres'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Which of the programs books have you used for interaction with your child?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.Reading.q15x1_liste_livres')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 96
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q15x1_autre_preciser'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.Reading.q15x1_autre_preciser')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 98
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q16_maniere_jouer'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'In general, what are the main games your child plays?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.games.q16_maniere_jouer')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 99
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q16_autre_preciser'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.games.q16_autre_preciser')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 100
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q17_question_jouer'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you take part in games? '),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.games.q17_question_jouer')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 101
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q17x1_jouer_avec'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'If yes, which ones?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.games.q17x1_jouer_avec')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 102
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q17x1_autre_preciser'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.games.q17x1_autre_preciser')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 103
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q18_apprecier_enfant'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'When it happens to your child to perform an action well appreciated by you, how do you express it?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.games.q18_apprecier_enfant')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 104
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q18_autre_preciser'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.games.q18_autre_preciser')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 105
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q19_action_mal'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'When it happens to your child ** (aged between 3 years old and over) ** to perform an action that is not appreciated by you, how do you express it?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.games.q19_action_mal')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 106
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'copy-2-of-prciser_autre'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.games.copy-2-of-prciser_autre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 110
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'moyens_utilises'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Adults use certain means to teach children to behave well or to deal with behavioral problems. What are these means'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.moyens_pour_apprendre_aux_enfants__bien_se_comporter_ou_pour_traiter_des_pr.methodes_dapprentissage.moyens_utilises')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 111
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'necessite_punition_physique'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you think that in order to raise or educate a child properly, it is necessary that he be punished physically?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.moyens_pour_apprendre_aux_enfants__bien_se_comporter_ou_pour_traiter_des_pr.necessite_punition_physique')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 112
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'q22_participation_rencontre'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Finally, have you had at least once during the last 6 months, participated in a community awareness meeting (social mobilization activity, RIV Inter Village Meeting) on ​​the 15 essential practices or participated in a teacher exchange day? / communities on practices related to schooling, coaching / coaching.'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.moyens_pour_apprendre_aux_enfants__bien_se_comporter_ou_pour_traiter_des_pr.q22_participation_rencontre')),
      relationship('RecordType', 'Name', 'Answer')
    ))
)