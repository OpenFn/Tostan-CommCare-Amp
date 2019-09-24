// M&E Tools Questionnaire Individuel V3
steps(
  upsert('ampi__Submission__c', 'Submission_ID__c', fields(
      field('ampi__Description__c', dataValue('form.@name')),
      field('Submission_ID__c', dataValue('id')) //,
      //field('Location__c', dataValue('form.coordonnes_gps')), //FIELD DOES NOT EXIST
      /*relationship('Project__r', 'Project_ID__c', (state)=>{ //FIELD DOES NOT EXIST
        const projID = state.data.id + state.data.form.fixture_localization.village //confirm format of ID
        return projID;
      })*/
    )),
  //HARDCODED QUESTIONS FOR THIS SUBMISSION
    //Row 9
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'village'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'village'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.fixture_localization.village')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 10
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'type_de_communaut'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Type of community'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.type_de_communaut')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 11
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'type_evaluation'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Evaluation type'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.type_evaluation')),
      relationship('RecordType', 'Name', 'Answer')
    )),

    //Row 12
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'interviewer'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Respondent status'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.interviewer')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 17
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'nbre_groupe_ethnique'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Number of ethnic groups in the village'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.ethnie.nbre_groupe_ethnique')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 23
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE2_sexe'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Gender of the respondent'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE1_caracteristiques_enquete.CE2_sexe')),
      relationship('RecordType', 'Name', 'Answer')
    )),

    //Row 24
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE3_groupe_ethnique'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is your ethnic group'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE1_caracteristiques_enquete.CE3_groupe_ethnique')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 26
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE4x1_connait_age'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you know your age?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE4_age_enquete.CE4x1_connait_age')),
      relationship('RecordType', 'Name', 'Answer')
    )),

    //Row 27
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE4x1a_age_exact'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is your age?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE1_caracteristiques_enquete.CE4_age_enquete.CE4x1a_age_exact')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 29
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'categorie_age'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is your age group?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE1_caracteristiques_enquete.CE4_age_enquete.categorie_age')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 30
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE5_etat_matrimonial'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is your marital status?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE1_caracteristiques_enquete.CE5_etat_matrimonial')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 32
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE6x1_freq_ecole'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Did you attend a formal school?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x1_freq_ecole')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 33
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE6x2_niveau_etude'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is the highest level of education attained?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x2_niveau_etude')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 34
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE6x2a_nbre_annees_etudes'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Years of study in primary school'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x2a_nbre_annees_etudes')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 35
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE6x3_arret_scolarite'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Did you drop out of school?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x3_arret_scolarite')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 36
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE6x3a_raisons_arret_scolarite'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What are the reasons?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x3a_raisons_arret_scolarite')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 37
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE6x3b_autre_raisons'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Qualitative_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x3b_autre_raisons')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 39
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE7x1_poste_occupe'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you hold a position or positions among those listed, or one that is not listed?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE7_poste_occupe.CE7x1_poste_occupe')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 40
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CE7x1a_specifier_autre_poste'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify another position'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Qualitative_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE7_poste_occupe.CE7x1a_specifier_autre_poste')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 44
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CEE_intro_nombre_fille'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'First I want to know how many girls you have in total? If the respondent would rather not answer type 99'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.CEE_carateristiques_enfants_enquete.copy-1-of-nombre_denfants.CEE_intro_nombre_fille')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 48
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CEE_intro_nombre_garcon'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many boys do you have in total? If the respondent rather not answer type 99'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.CEE_carateristiques_enfants_enquete.copy-1-of-nombre_denfants.CEE_intro_nombre_garcon')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 52
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'total_enfant'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'HTotal number of children'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Picklist_Response__c', dataValue('form.CEE_carateristiques_enfants_enquete.copy-1-of-nombre_denfants.total_enfant')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 56
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'GOUV1_possession_CIN'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you have a National Identity Card?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.gouvernance.elections.GOUV1_possession_CIN')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 57
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'GOUV2_inscrit_liste_electorale'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Are you a registered voter?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.gouvernance.elections.GOUV2_inscrit_liste_electorale')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 58
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'GOUV3_Vote_derniere_election'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Did you vote in the last election?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.gouvernance.elections.GOUV3_Vote_derniere_election')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 60
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'GOUV4_nbre_fille_enregistre'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many of your girls are legally registered?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.gouvernance.participation_des_femmes.GOUV4_nbre_fille_enregistre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 61
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'GOUV5_nbre_garcon_enregistre'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many of your sons are legally registered?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.gouvernance.participation_des_femmes.GOUV5_nbre_garcon_enregistre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 63
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'GOUV6_nbre_rencontre_villageoise'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many village meetings have you attended in the last 12 months?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.gouvernance.participation_des_femmes.GOUV6_nbre_rencontre_villageoise')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 64
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'GOUV7_partage_idee'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Over the past 12 months, when you came up with a good idea for the community, have you shared it with others at a village meeting?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.gouvernance.participation_des_femmes.GOUV7_partage_idee')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 65
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'GOUV8_prise_decision_famille'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'During the past 6 months, who *** in your family  ***  took most of the decisions about:'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.gouvernance.participation_des_femmes.GOUV8_prise_decision_famille')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 66
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'GOUV8x1_runion_communautaire'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'If the woman has to attend a community meeting'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.gouvernance.participation_des_femmes.GOUV8x1_runion_communautaire')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 67
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'GOUV8x2_cgc_ou_association'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'If the woman must be a member of CMC or association'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.gouvernance.participation_des_femmes.GOUV8x2_cgc_ou_association')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 68
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'GOUV8x3_enfants_aller__lcole'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'If children are going to school'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.gouvernance.participation_des_femmes.GOUV8x3_enfants_aller__lcole')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 69
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'GOUV8x4_pratique_espacement_naissances'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'If the woman should practice birth spacing'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.gouvernance.participation_des_femmes.GOUV8x4_pratique_espacement_naissances')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 71
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'DH1_connaissance_DH'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you know of Human Rights?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.gouvernance.droits_humains.DH1_connaissance_DH')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 72
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'DH2_apporter_changement'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Has knowledge of Human Rights made a change in your life or your behavior?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.gouvernance.droits_humains.DH2_apporter_changement')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 73
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'DH2x1_liste_changements'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What are the changes that knowledge of human rights brought into your life or behavior?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.gouvernance.droits_humains.DH2x1_liste_changements')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 76
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EDU1_nombre_fille_scolarisee'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many of your daughters are in school?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.question22.CEE7_education_enfant.EDU1_nombre_fille_scolarisee')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 77
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EDU2_nombre_garcon_scolarise'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many of your sons are in school?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.question22.CEE7_education_enfant.EDU2_nombre_garcon_scolarise')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 78
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EDU3_retrait_fille_ecole'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Is it acceptable to remove a girl from school?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question22.CEE7_education_enfant.EDU3_retrait_fille_ecole')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 79
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EDU4_retrait_garcon_ecole'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Is it acceptable to remove a boy from school?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question22.CEE7_education_enfant.EDU4_retrait_garcon_ecole')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 82
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'LEE1_associer_image_mot'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Can you can associate each word with the corresponding image?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question22.lecture_et_criture.LEE1_associer_image_mot')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 83
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'LEE1x1_nombre_association'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many images and words did the respondent associate?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question22.lecture_et_criture.LEE1x1_nombre_association')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 85
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'LEE2_ecriture_nom_village'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Can you write the name of your village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question22.lecture_et_criture.LEE2_ecriture_nom_village')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 86
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'LEE2x1_capable_ecrire_v'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Is the respondent able to write the name of his / her village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question22.lecture_et_criture.LEE2x1_capable_ecrire_v')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 88
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'LEE3_ecriture_nom_propre'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Can you write your name?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question22.lecture_et_criture.LEE3_ecriture_nom_propre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 89
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'LEE3x1_capable_ecrire_nom'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Is the respondent able to write his / her name?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question22.lecture_et_criture.LEE3x1_capable_ecrire_nom')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 92
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'AME1_connait_avantages'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you know the benefits of EBF in children?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.sante.allaitement_maternel_exclusif_ame.AME1_connait_avantages')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 93
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'AME1x1_liste_avantages'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What benefit (s) do you know of?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.sante.allaitement_maternel_exclusif_ame.AME1x1_liste_avantages')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 94
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'AME2_reaction_decision_AME'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'If a woman you know decides to breastfeed her child only until the age of 6 months, what will be your attitude?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.sante.allaitement_maternel_exclusif_ame.AME2_reaction_decision_AME')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 96
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'SRO1_connaissance_SRO'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you know about oral rehydration solutions (ORS)?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.sante.solution_de_rhydration_orale_sro.SRO1_connaissance_SRO')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 97
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'SRO2_reaction_diarrhee'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Comment réagiriez-vous face à un enfant qui a la diarrhée?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.sante.solution_de_rhydration_orale_sro.SRO2_reaction_diarrhee')),
      relationship('RecordType', 'Name', 'Answer')
    ))
)
