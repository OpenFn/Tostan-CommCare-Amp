// M&E Tools Questionnaire Individuel V3
//ethnic group repeat block
steps(
  upsert('ampi__Submission__c', 'Submission_ID__c', fields(
      field('ampi__Description__c', dataValue('form.@name')),
      field('Submission_ID__c', dataValue('id')),
      field('Location__latitude__s', (state)=>{
        var lat = state.data.form.coordonnes_gps;
        lat = (lat!==undefined ? lat.substring(0, lat.indexOf(" ")) : null);
        return lat;
      }),
      field('Location__longitude__s', (state)=>{
        var long = state.data.form.coordonnes_gps;
        long = (long!==undefined ? long.substring(long.indexOf(" ")+1, long.indexOf(" ")+7) : null);
        return long;
      }),
      relationship('Project__r', 'Project_ID__c', (state)=>{
        var village = state.data.form.fixture_localization.village
        var projID = village + "-CEP"
        return projID;
      })
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
      field('ampi__Text_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x3b_autre_raisons')),
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
      field('ampi__Text_Response__c', dataValue('form.CE_caracteristiques_demog_enquete.CE7_poste_occupe.CE7x1a_specifier_autre_poste')),
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
      field('ampi__Picklist_Response__c', dataValue('form.allaitement_maternel_exclusif_ame.AME1_connait_avantages')),
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
      field('ampi__Picklist_Response__c', dataValue('form.allaitement_maternel_exclusif_ame.AME1x1_liste_avantages')),
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
      field('ampi__Picklist_Response__c', dataValue('form.allaitement_maternel_exclusif_ame.AME2_reaction_decision_AME')),
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
      field('ampi__Picklist_Response__c', dataValue('form.solution_de_rhydration_orale_sro.SRO1_connaissance_SRO')),
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
      field('ampi__Picklist_Response__c', dataValue('form.solution_de_rhydration_orale_sro.SRO2_reaction_diarrhee')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 100
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ESN1_risques_grossesse_rapprochees'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'In your opinion, are there risks associated with closely spaced pregnancies?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question38.ESN1_risques_grossesse_rapprochees')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 101
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ESN1x1_liste_risques'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What are the risks that you know of?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question38.ESN1x1_liste_risques')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 102
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ESN2_attitude_face_pratique_ESN'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' If someone you know decides to practice birth spacing, what will be your attitude?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question38.ESN2_attitude_face_pratique_ESN')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 103
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ESN3_utiliser_methode_ESN'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Are you currently using a birth spacing method?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question38.ESN3_utiliser_methode_ESN')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 104
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ESN3x1_liste_methode_ESN'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Which method do you use?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question38.ESN3x1_liste_methode_ESN')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 106
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'LAM1_moments_recommandes'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'In your opinion, at what times is it recommended to wash hands with soap and water?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.lavage_des_mains.LAM1_moments_recommandes')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 107
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'LAM2_transmission_microbe'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you know how germs are transmitted?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.lavage_des_mains.LAM2_transmission_microbe')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 108
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'LAM2x1_liste_voie_transmission'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What are the microbe transmission paths you know of?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.lavage_des_mains.LAM2x1_liste_voie_transmission')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 112
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD1_existence_violence_conjoint'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'In the past 12 months, has there been any physical abuse between you and your spouse?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.violence_domestique_1.VD1_existence_violence_conjoint')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 113
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD2_insulte_enfant'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Imagine that one of your children disrespected your mother. Youve explained it to him a few times before, but hes still doing it. This time, when you tell him not to, he insults you. What would be your reaction to discipline him?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.violence_domestique_1.VD2_insulte_enfant')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 114
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD3_reaction_face_enfant_battu'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Imagine a child disrespecting his mother. The mother beats him to discipline him. How will you appreciate the mothers reaction?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.violence_domestique_1.VD3_reaction_face_enfant_battu')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 115
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD4_meme_appreciation_12mois'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Is this the same assessment you would have made 12 months ago?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.violence_domestique_1.VD4_meme_appreciation_12mois')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 116
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD5_raison_changement'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is the **main reason** for the change in your assessment?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.violence_domestique_1.VD5_raison_changement')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 118
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD2_1_proportion_des_membres_violence'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' In your opinion, what proportion of your community members are victims of:'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question17.VD2_1_proportion_des_membres_violence')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 119
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'violence_physique'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', '**Physical** Violence'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question17.violence_physique')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 120
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'violence_psychologique'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', '**Psychological** violence'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question17.violence_psychologique')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 121
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'violence_sexuelle'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', '**Sexual** violence'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question17.violence_sexuelle')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 122
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'violence_conomique'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', '**Economic** violence'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question17.violence_conomique')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 123
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'violence_sociale'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', '**Social** violence'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.question17.violence_sociale')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 125
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD2_2_attitude_si_temoin_violence'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What would be your attitude if you were witnessing a case of:'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.violence_domestique_2.VD2_2_attitude_si_temoin_violence')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 126
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'violence_physique1'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', '**Physical** violence'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.violence_domestique_2.violence_physique1')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 127
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'violence_psychologique1'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', '**Psychological** violence'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.violence_domestique_2.violence_psychologique1')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 128
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'violence_sexuelle1'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', '**Sexual** violence'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.violence_domestique_2.violence_sexuelle1')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 129
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'violence_economique1'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', '**Economic** violence'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.violence_domestique_2.violence_economique1')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 130
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'violence_sociale1'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', '**Social** violence'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.violence_domestique_2.violence_sociale1')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 132
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD2_3_meme_raction_que_dans_passe'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Is that the same reaction you would have had in the past?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.pratiques_nefastes.violence_domestique_2-b.VD2_3_meme_raction_que_dans_passe')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 133
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD2_4_raison_changement_attitude'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is the reason for your change in attitude?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.pratiques_nefastes.violence_domestique_2-b.VD2_4_raison_changement_attitude')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 136
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD6_proportion_comm_battre_enfant'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' In your opinion, how many people in your community today beat their children from time to time? ** (***Check answers that are closest to what the respondent said: ***)'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.pratiques_nefastes.violence_domestique_2.VD6_proportion_comm_battre_enfant')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 137
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD7_attitude_mbre_communaute'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'In your opinion, what would be the attitude of other community members if they knew you were going to beat one of your children in order to discipline them ** *'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.pratiques_nefastes.violence_domestique_2.VD7_attitude_mbre_communaute')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 138
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD8_consequence_battre_enfant'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Do you know the consequences related to the fact of beating a child even for discipline?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.pratiques_nefastes.violence_domestique_2.VD8_consequence_battre_enfant')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 139
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'VD8x1_liste_consequences'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What consequences do you know of?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.pratiques_nefastes.violence_domestique_2.VD8x1_liste_consequences')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 141
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'MARx1_mariage_garcon'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many of your sons are married?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.CEE8_mariage_enfant.MARx1_mariage_garcon')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 142
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'MAR2_mariage_fille'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many of your daughters are married?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.CEE8_mariage_enfant.MAR2_mariage_fille')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 143
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'MAR3_mariage_garcon_avant_16'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many of your sons were married before the age of 16?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.CEE8_mariage_enfant.MAR3_mariage_garcon_avant_16')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 144
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'MAR4_mariage_fille_avant_16'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many of your daughters were married before the age of 16?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.CEE8_mariage_enfant.MAR4_mariage_fille_avant_16')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 145
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'MAR5_decision_mariage_avt_16'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Imagine that a girl you know decided to get married before the age of 16. How would you appreciate her decision?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CEE8_mariage_enfant.MAR5_decision_mariage_avt_16')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 146
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'MAR6_meme_appreciation'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Is this the same appreciation that you would have had 12 months ago?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CEE8_mariage_enfant.MAR6_meme_appreciation')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 147
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'MAR6x1_raison_changement'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' What is the main reason for the change in your attitude?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.CEE8_mariage_enfant.MAR6x1_raison_changement')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 149
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'MAR7_proportion_mariage_avt_16'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' In your opinion, what is the proportion of girls in your community who now get married before the age of 16'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.mariage_des_enfants_2.MAR7_proportion_mariage_avt_16')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 150
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'MAR8_attitude_famille_mar_16'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'In your opinion, what would be the attitude of ** your family members **  if they knew that your daughter was getting married before the age of 16?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.mariage_des_enfants_2.MAR8_attitude_famille_mar_16')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 151
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'MAR9_attitude_communaute_mar_16'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'In your opinion, what would be the attitude of ** other community members ** if they knew that your daughter was getting married before the age of 16?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.mariage_des_enfants_2.MAR9_attitude_communaute_mar_16')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 152
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'MAR10_consequences_mariage'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Do you know the consequences of having a girl married off before the age of 16?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.mariage_des_enfants_2.MAR10_consequences_mariage')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 153
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'MARb10x1_liste_consequences'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What are the consequences that you know of? (** Do not read the answers **)'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.mariage_des_enfants_2.MARb10x1_liste_consequences')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 157
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC1_excision_personnel_12_derniers_mois'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' In the last 12 months have you had your daughter cut?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision.EXC1_excision_personnel_12_derniers_mois')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 158
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC2_excision_famille_12_derniers_mois'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'In the past 12 months, have any of your family members had their daughters cut?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision.EXC2_excision_famille_12_derniers_mois')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 159
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC3_decision_personnelle_excision'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Imagine that someone you know intends to cut their daughter, how will you feel about his/her decision?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision.EXC3_decision_personnelle_excision')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 160
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC4_meme_apreciation'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Is this the same appreciation that you would have had 12 months ago?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision.EXC4_meme_apreciation')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 161
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC4x1_raison_changement'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is the **main** reason for the change in your assessment? (**Do not read answers**)'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision.EXC4x1_raison_changement')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 162
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC4x2_preciser_autre_raison'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is the **main** reason for the change in your assessment? (**Do not read answers**)'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision.EXC4x2_preciser_autre_raison')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 164
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC5_possibilite_arreter'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is the **main** reason for the change in your assessment? (**Do not read answers**)'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision_2.EXC5_possibilite_arreter')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 165
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC6_continueriez_vous_pratique'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' If everyone gave up FGC, would you continue to practice it?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision_2.EXC6_continueriez_vous_pratique')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 166
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC7_proportion_comm_exciser'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'In your opinion, what is the proportion of people in your community who, today, have their daughters cut?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision_2.EXC7_proportion_comm_exciser')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 167
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC8_attitute_mbre_famille'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'In your opinion, what would be the attitude of your family members if they knew you were going to cut your daughter?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision_2.EXC8_attitute_mbre_famille')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 168
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC9_attitude_mbre_communaute'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'In your opinion, what would be the attitude of other community members if they knew you were going to cut your daughter?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision_2.EXC9_attitude_mbre_communaute')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 169
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC10_connait_consequences_excision'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Do you know of the consequences of FGC?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision_2.EXC10_connait_consequences_excision')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 170
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'EXC10x1_liste_consequences'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' What are the consequences of FGC that you know of? (**Do not read answers**)'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.excision_2.EXC10x1_liste_consequences')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 173
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ENV1_existence_latrine'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Do you have latrines in the house?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.environnement.environnement.ENV1_existence_latrine')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 174
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ENV2_attitude_face_defecation'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What would be your reaction to a person who goes to the bathroom in the outdoors?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.environnement.environnement.ENV2_attitude_face_defecation')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 175
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ENV3_participation_nettoyage'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Have you been involved in any of the villages cleaning sessions in the past two months?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.environnement.environnement.ENV3_participation_nettoyage')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 178
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ECO1_pratique_agr'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you practice an Income Generating Activity (IGA)?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.economie.Activites_GR.ECO1_pratique_agr')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 179
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ECO2_type_activite_exerce'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What kind of activities do you do?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.economie.Activites_GR.ECO2_type_activite_exerce')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 181
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ECO3_activite_hors_foyer'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do you work outside the matrimonial home?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.economie.Activites_GR.ECO3_activite_hors_foyer')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 182
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ECO3x1_type_activite_exerce'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' What type of activity are you running?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.economie.Activites_GR.ECO3x1_type_activite_exerce')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 186
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CGC1_niveau_de_satisfaction'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is your level of satisfaction with the CMCs work?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.cgc.classe_et_cgc.CGC1_niveau_de_satisfaction')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 187
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'CGC_satisfaire_besoins_com'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' There are community members who say that CMC activities have helped meet the needs of the community. Others say otherwise. What are you saying?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.cgc.classe_et_cgc.CGC_satisfaire_besoins_com')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 188
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'la_mise_en_oeuvre_du_plan_daction'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Are you involve in the implementation of CMC action plan?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.cgc.classe_et_cgc.posez_la_question_etes_vous_impliqus_dans_la_mise_en_oeuvre_du_plan_daction')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 191
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ADP1_adoption_augmente_connaissance'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'From your perspective, did adoption contribute to your knowledge?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.adoption.adoption.ADP1_adoption_augmente_connaissance')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 192
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ADP1x1_comment'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.adoption.adoption.ADP1x1_comment')),
      relationship('RecordType', 'Name', 'Answer')
    ))
)
