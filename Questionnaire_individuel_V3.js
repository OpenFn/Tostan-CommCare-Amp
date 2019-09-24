// M&E Tools Questionnaire Individuel V3
steps(
  upsert('ampi__Submission__c', 'CommCare_ID__c', fields(
    field('Name', "Questionnaire Individuel V3"),
    field('ampi__Description__c', dataValue('form.@name')),
    field('CommCare_ID__c', dataValue('id')), //FIELD DOES NOT EXIST
    field('Location__c', dataValue('form.coordonnes_gps')), //FIELD DOES NOT EXIST
    relationship('Project__r', 'Project_ID__c', (state)=>{ //FIELD DOES NOT EXIST
      const projID = state.data.id + state.data.form.fixture_localization.village //confirm format of ID
      return projID;
    })
  )),
  each( //For each Submission, bulk insert child Question records
    bulk('ampi__Question__c', 'upsert', { failOnError: true, extIdField: 'Question_ID__c'}, state => {
      return state.data.map(state=> {
        //HARDCODED QUESTIONS BELOW

/***** Receiving Error: Line 21: Unexpected token. How to return an array? ********/
        return {
        [ //ROW 9
          'Question_ID__c': state.id + 'village', //TO DICUSS - what Ext ID to use for upserting questions?
          'ampi__Description__c': 'village',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.fixture_localization.village,
          'RecordType.Name' : 'Answer' //Confirm mapping will work in Sandbox
        ],
        [ //ROW 10
          'Question_ID__c': state.id + 'type_de_communaut',
          'ampi__Description__c': 'Type of community',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.type_de_communaut,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 11
          'Question_ID__c': state.id + 'type_evaluation',
          'ampi__Description__c': 'Evaluation type',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.type_evaluation,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 13
          'Question_ID__c': state.id + 'interviewer',
          'ampi__Description__c': 'Respondent status',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.interviewer,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 17
          'Question_ID__c': state.id + 'nbre_groupe_ethnique',
          'ampi__Description__c': 'Number of ethnic groups in the village',
          'ampi__Response_Type__c': 'Number',
          'ampi__Picklist_Response__c': state.form.ethnie.nbre_groupe_ethnique,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 23
          'Question_ID__c': state.id + 'CE2_sexe',
          'ampi__Description__c': 'Observe: Gender of the respondent',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE1_caracteristiques_enquete.CE2_sexe,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 24
          'Question_ID__c': state.id + 'CE3_groupe_ethnique',
          'ampi__Description__c': 'What is your ethnic group',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE1_caracteristiques_enquete.CE3_groupe_ethnique,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 26
          'Question_ID__c': state.id + 'CE4x1_connait_age',
          'ampi__Description__c': 'Do you know your age?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE4_age_enquete.CE4x1_connait_age,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 27
          'Question_ID__c': state.id + 'CE4x1a_age_exact',
          'ampi__Description__c': 'What is your age?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE1_caracteristiques_enquete.CE4_age_enquete.CE4x1a_age_exact,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 29
          'Question_ID__c': state.id + 'categorie_age',
          'ampi__Description__c': 'What is your age group?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE1_caracteristiques_enquete.CE4_age_enquete.categorie_age,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 30
          'Question_ID__c': state.id + 'CE5_etat_matrimonial',
          'ampi__Description__c': 'What is your marital status?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE1_caracteristiques_enquete.CE5_etat_matrimonial,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 32
          'Question_ID__c': state.id + 'CE6x1_freq_ecole',
          'ampi__Description__c': 'Did you attend a formal school?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x1_freq_ecole,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 33
          'Question_ID__c': state.id + 'CE6x2_niveau_etude',
          'ampi__Description__c': 'What is the highest level of education attained?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x2_niveau_etude,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 34  DOES NOT EXIST
          'Question_ID__c': state.id + 'CE6x2a_nbre_annees_etudes',
          'ampi__Description__c': 'Years of study in primary school',
          'ampi__Response_Type__c': 'Number',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x2a_nbre_annees_etudes,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 35
          'Question_ID__c': state.id + 'CE6x3_arret_scolarite',
          'ampi__Description__c': 'Did you drop out of school?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x3_arret_scolarite,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 36
          'Question_ID__c': state.id + 'CE6x3a_raisons_arret_scolarite',
          'ampi__Description__c': 'What are the reasons?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x3a_raisons_arret_scolarite,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 37
          'Question_ID__c': state.id + 'CE6x3b_autre_raisons',
          'ampi__Description__c': 'Other',
          'ampi__Response_Type__c': 'Qualitative',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE6_niveau_etude_enquete.CE6x3b_autre_raisons,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 39
          'Question_ID__c': state.id + 'CE7x1_poste_occupe',
          'ampi__Description__c': 'Do you hold a position or positions among those listed, or one that is not listed?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE7_poste_occupe.CE7x1_poste_occupe,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 40
          'Question_ID__c': state.id + 'CE7x1a_specifier_autre_poste',
          'ampi__Description__c': 'Specify another position',
          'ampi__Response_Type__c': 'Qualitative',
          'ampi__Picklist_Response__c': state.form.CE_caracteristiques_demog_enquete.CE7_poste_occupe.CE7x1a_specifier_autre_poste,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 44
          'Question_ID__c': state.id + 'CEE_intro_nombre_fille',
          'ampi__Description__c': 'First I want to know how many girls you have in total? If the respondent would rather not answer type 99',
          'ampi__Response_Type__c': 'Number',
          'ampi__Picklist_Response__c': state.form.CEE_carateristiques_enfants_enquete.copy-1-of-nombre_denfants.CEE_intro_nombre_fille, //TEST
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 48
          'Question_ID__c': state.id + 'CEE_intro_nombre_garcon',
          'ampi__Description__c': 'How many boys do you have in total? If the respondent rather not answer type 99',
          'ampi__Response_Type__c': 'Number',
          'ampi__Picklist_Response__c': state.form.CEE_carateristiques_enfants_enquete.copy-1-of-nombre_denfants.CEE_intro_nombre_garcon, //TEST
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 52
          'Question_ID__c': state.id + 'total_enfant',
          'ampi__Description__c': 'How many boys do you have in total? If the respondent rather not answer type 99',
          'ampi__Response_Type__c': 'Number',
          'ampi__Picklist_Response__c': state.form.CEE_carateristiques_enfants_enquete.copy-1-of-nombre_denfants.total_enfant, //TEST
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 56
          'Question_ID__c': state.id + 'GOUV1_possession_CIN',
          'ampi__Description__c': 'Do you have a National Identity Card?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.gouvernance.elections.GOUV1_possession_CIN,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 57
          'Question_ID__c': state.id + 'GOUV2_inscrit_liste_electorale',
          'ampi__Description__c': 'Are you a registered voter?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.gouvernance.elections.GOUV2_inscrit_liste_electorale,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 58
          'Question_ID__c': state.id + 'GOUV3_Vote_derniere_election',
          'ampi__Description__c': 'Did you vote in the last election?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.gouvernance.elections.GOUV3_Vote_derniere_election,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 60
          'Question_ID__c': state.id + 'GOUV4_nbre_fille_enregistre',
          'ampi__Description__c': 'How many of your girls are legally registered?',
          'ampi__Response_Type__c': 'Number',
          'ampi__Picklist_Response__c': state.form.gouvernance.participation_des_femmes.GOUV4_nbre_fille_enregistre,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 61 CC PROPERTY EXISTS?
          'Question_ID__c': state.id + 'GOUV5_nbre_garcon_enregistre',
          'ampi__Description__c': 'How many of your sons are legally registered?',
          'ampi__Response_Type__c': 'Number',
          'ampi__Picklist_Response__c': state.form.gouvernance.participation_des_femmes.GOUV5_nbre_garcon_enregistre,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 63
          'Question_ID__c': state.id + 'GOUV6_nbre_rencontre_villageoise',
          'ampi__Description__c': 'How many village meetings have you attended in the last 12 months?',
          'ampi__Response_Type__c': 'Number',
          'ampi__Picklist_Response__c': state.form.gouvernance.participation_des_femmes.GOUV6_nbre_rencontre_villageoise,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 64
          'Question_ID__c': state.id + 'GOUV7_partage_idee',
          'ampi__Description__c': 'Over the past 12 months, when you came up with a good idea for the community, have you shared it with others at a village meeting?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.gouvernance.participation_des_femmes.GOUV7_partage_idee,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 65
          'Question_ID__c': state.id + 'GOUV8_prise_decision_famille',
          'ampi__Description__c': 'During the past 6 months, who *** in your family  ***  took most of the decisions about:',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.gouvernance.participation_des_femmes.GOUV8_prise_decision_famille,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 66
          'Question_ID__c': state.id + 'GOUV8x1_runion_communautaire',
          'ampi__Description__c': 'If the woman has to attend a community meeting',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.gouvernance.participation_des_femmes.GOUV8x1_runion_communautaire,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 67
          'Question_ID__c': state.id + 'GOUV8x2_cgc_ou_association',
          'ampi__Description__c': 'If the woman must be a member of CMC or association',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.gouvernance.participation_des_femmes.GOUV8x2_cgc_ou_association,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 68
          'Question_ID__c': state.id + 'GOUV8x3_enfants_aller__lcole',
          'ampi__Description__c': 'If children are going to school',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.gouvernance.participation_des_femmes.GOUV8x3_enfants_aller__lcole,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 69
          'Question_ID__c': state.id + 'GOUV8x4_pratique_espacement_naissances',
          'ampi__Description__c': 'If the woman should practice birth spacing',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.gouvernance.participation_des_femmes.GOUV8x4_pratique_espacement_naissances,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 71
          'Question_ID__c': state.id + 'DH1_connaissance_DH',
          'ampi__Description__c': 'Do you know of Human Rights?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.gouvernance.droits_humains.DH1_connaissance_DH,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 72
          'Question_ID__c': state.id + 'DH2_apporter_changement',
          'ampi__Description__c': 'Has knowledge of Human Rights made a change in your life or your behavior?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.gouvernance.droits_humains.DH2_apporter_changement,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 73
          'Question_ID__c': state.id + 'DH2x1_liste_changements',
          'ampi__Description__c': 'What are the changes that knowledge of human rights brought into your life or behavior?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.gouvernance.droits_humains.DH2x1_liste_changements,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 76
          'Question_ID__c': state.id + 'EDU1_nombre_fille_scolarisee',
          'ampi__Description__c': 'How many of your daughters are in school?',
          'ampi__Response_Type__c': 'Number',
          'ampi__Picklist_Response__c': state.form.question22.CEE7_education_enfant.EDU1_nombre_fille_scolarisee,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 77
          'Question_ID__c': state.id + 'EDU2_nombre_garcon_scolarise',
          'ampi__Description__c': 'How many of your sons are in school?',
          'ampi__Response_Type__c': 'Number',
          'ampi__Picklist_Response__c': state.form.question22.CEE7_education_enfant.EDU2_nombre_garcon_scolarise,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 78
          'Question_ID__c': state.id + 'EDU3_retrait_fille_ecole',
          'ampi__Description__c': 'Is it acceptable to remove a girl from school?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.question22.CEE7_education_enfant.EDU3_retrait_fille_ecole,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 79
          'Question_ID__c': state.id + 'EDU4_retrait_garcon_ecole',
          'ampi__Description__c': 'Is it acceptable to remove a boy from school?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.question22.CEE7_education_enfant.EDU4_retrait_garcon_ecole,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 82
          'Question_ID__c': state.id + 'LEE1_associer_image_mot',
          'ampi__Description__c': 'Can you can associate each word with the corresponding image?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.question22.lecture_et_criture.LEE1_associer_image_mot,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 83
          'Question_ID__c': state.id + 'LEE1x1_nombre_association',
          'ampi__Description__c': 'How many images and words did the respondent associate?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.question22.lecture_et_criture.LEE1x1_nombre_association,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 85
          'Question_ID__c': state.id + 'LEE2_ecriture_nom_village',
          'ampi__Description__c': 'Can you write the name of your village?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.question22.lecture_et_criture.LEE2_ecriture_nom_village,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 86
          'Question_ID__c': state.id + 'LEE2x1_capable_ecrire_v',
          'ampi__Description__c': 'Is the respondent able to write the name of his / her village?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.question22.lecture_et_criture.LEE2x1_capable_ecrire_v,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 88
          'Question_ID__c': state.id + 'LEE3_ecriture_nom_propre',
          'ampi__Description__c': 'Can you write your name?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.question22.lecture_et_criture.LEE3_ecriture_nom_propre,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 89
          'Question_ID__c': state.id + 'LEE3x1_capable_ecrire_nom',
          'ampi__Description__c': 'Is the respondent able to write his / her name?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.question22.lecture_et_criture.LEE3x1_capable_ecrire_nom,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 92
          'Question_ID__c': state.id + 'AME1_connait_avantages',
          'ampi__Description__c': 'Do you know the benefits of EBF in children?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.sante.allaitement_maternel_exclusif_ame.AME1_connait_avantages,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 93
          'Question_ID__c': state.id + 'AME1x1_liste_avantages',
          'ampi__Description__c': 'What benefit (s) do you know of?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.sante.allaitement_maternel_exclusif_ame.AME1x1_liste_avantages,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 94
          'Question_ID__c': state.id + 'AME2_reaction_decision_AME',
          'ampi__Description__c': 'If a woman you know decides to breastfeed her child only until the age of 6 months, what will be your attitude?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.sante.allaitement_maternel_exclusif_ame.AME2_reaction_decision_AME,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 96
          'Question_ID__c': state.id + 'SRO1_connaissance_SRO',
          'ampi__Description__c': 'Do you know about oral rehydration solutions (ORS)?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.sante.solution_de_rhydration_orale_sro.SRO1_connaissance_SRO,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 97
          'Question_ID__c': state.id + 'SRO2_reaction_diarrhee',
          'ampi__Description__c': 'Comment réagiriez-vous face à un enfant qui a la diarrhée?',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.sante.solution_de_rhydration_orale_sro.SRO2_reaction_diarrhee,
          'RecordType.Name' : 'Answer'
        ]

      }
     })
    });
  )
);
