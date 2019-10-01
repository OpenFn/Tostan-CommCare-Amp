// M&E Tools Questionnaire Individuel V3
steps(
  upsert('ampi__Submission__c', 'Submission_ID__c', fields(
      field('ampi__Description__c', dataValue('form.@name')),
      field('Submission_ID__c', dataValue('id')),
      field('Location__c', dataValue('form.coordonnes_gps')), //FIELD DOES NOT EXIST
      relationship('Project__r', 'Project_ID__c', (state)=>{ //FIELD DOES NOT EXIST
        const projID = state.data.id + state.data.form.fixture_localization.village //confirm format of ID
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
        return state.data.id + 'pays'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'pays'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.pays')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 12
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'statut_du_rpondant'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Respondent status'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.statut_du_rpondant')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 13
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'prciser_autre'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.prciser_autre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 16
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'DEM1_population_totale'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is the population of the village?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.profil_demographique.question4.DEM1_population_totale')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 17
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'DEM2_nombre_de_concessions'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many concessions are there in the village?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.profil_demographique.question4.DEM2_nombre_de_concessions')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 18
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'nombre_groupes_ethniques'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' How many ethnic groups are there in this village?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.profil_demographique.question4.nombre_groupes_ethniques')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 20
    upsert('ampi__Question__c', 'Question_ID__c', fields( //****HOW TO MAP REPEAT GROUP???
      field('Question_ID__c', (state)=>{
        return state.data.id + 'donner_le_nom_de_chaque_thnie'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many ethnic groups are there in this village?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.profil_demographique.question4.preciser_les_ethnies.donner_le_nom_de_chaque_thnie')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 23
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFedu1_existence_structure_educative'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Is there any functional educational structure (s) in the village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_et_services.INFedu1_existence_structure_educative')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 24
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFedu2_infrastructure'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify which one or however more'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_et_services.INFedu2_infrastructure')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 25
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'nbre_structures_educatives'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'nbre_structures_educatives'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_et_services.nbre_structures_educatives')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 26
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFedu3_distance'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'At what distance in kilometers is the nearest educational structure?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_et_services.INFedu3_distance')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 27
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFedu4_preciser_infrastructure'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify the nature of the educational structure'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_et_services.INFedu4_preciser_infrastructure')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 28
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'infedu5_program_alpha'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Has there been any literacy program (s) in the past?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_et_services.infedu5_program_alpha')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 29
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFedu5x1_lister_programme'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What program (s) is/are there?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_et_services.INFedu5x1_lister_programme')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 31
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFsan1_existence_infrastructure_sanitaire'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Is there any functional health facility (s) in the village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_sanitaires.INFsan1_existence_infrastructure_sanitaire')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 32
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFsan2_preciser_infrastructure'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify which one or however more'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_sanitaires.INFsan2_preciser_infrastructure')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 33
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFsan3_distance'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Veterinary Services'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.Inf_et_Service.infrastructures_sanitaires.INFsan3_distance')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 34
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFsan4_preciser_infrastructure'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify which one or however more'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_sanitaires.INFsan4_preciser_infrastructure')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 36
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFfin1_existence_infrastructure_financiere'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Is there any financial structure (s) in the village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_financires.INFfin1_existence_infrastructure_financiere')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 37
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFfin2_preciser_infrasructure_financiere'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify which one or however more'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_financires.INFfin2_preciser_infrasructure_financiere')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 38
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFfin3_distance'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' At what distance (in kilometers) is the nearest financial structure?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.Inf_et_Service.infrastructures_financires.INFfin3_distance')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 39
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFfin4_preciser_infrasructure_financiere'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify the nature of the infrastructure'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.Inf_et_Service.infrastructures_financires.INFfin4_preciser_infrasructure_financiere')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 40
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFfin5_acces_credit'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Do CBOs and women benefit from bank loans from these financial facilities?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_financires.INFfin5_acces_credit')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 41
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFfin6_caisse_communautaire'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Are there any community funds in this village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_financires.INFfin6_caisse_communautaire')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 42
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFedu6x1_liste_caisse_com'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' What are these community funds?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_financires.INFedu6x1_liste_caisse_com')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 43
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'prciser_autre_caisse'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other fund'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.Inf_et_Service.infrastructures_financires.prciser_autre_caisse')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 45
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFfin1_existence_infrastructure_economique'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Is there any economic structure (s) in the village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_conomiques.INFfin1_existence_infrastructure_economique')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 46
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INF2_preciser_infrstructure_economique'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify which one or however more'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_conomiques.INF2_preciser_infrstructure_economique')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 47
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFfin4_distance'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' At what distance (in kilometers) is the nearest economic structure?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_conomiques.INFfin4_distance')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 48
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INF4_preciser_infrstructure_economique'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify the nature of the infrastructure'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_conomiques.INF4_preciser_infrstructure_economique')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 50
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFocb1_existence_infrastructure'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Is there any community organization (s) in the village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_socit_civile.INFocb1_existence_infrastructure')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 51
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFocb2_preciser_la_ou_lesquelles'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify which one or however more'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_socit_civile.INFocb2_preciser_la_ou_lesquelles')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 51
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFocb2_preciser_la_ou_lesquelles'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify which one or however more'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_socit_civile.INFocb2_preciser_la_ou_lesquelles')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 53
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFcom1_existence_infra_communication'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Is there any communication infrastructure (s) in the village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_de_communication.INFcom1_existence_infra_communication')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 54
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFcom2_preciser_la_ou_lesquelles'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify which one or however more'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_de_communication.INFcom2_preciser_la_ou_lesquelles')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 55
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFcom3_distance'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' How far is the nearest communication infrastructure?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_de_communication.INFcom3_distance')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 56
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'INFcom4_preciser_la_ou_lesquelles'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify the nature of the infrastructure'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.Inf_et_Service.infrastructures_de_communication.INFcom4_preciser_la_ou_lesquelles')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 59
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ACE1_3_principaux_secteurs'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' What are the three (3) main sectors of activity of the villagers?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.activites_economiques_eau_electricite.economie_eau_et_lectricit.ACE1_3_principaux_secteurs')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 60
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'prciser_autre_ace1_3'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.activites_economiques_eau_electricite.economie_eau_et_lectricit.prciser_autre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 61
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ACE2_sources_appro_eau'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What are the sources of water supply for the villagers?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.activites_economiques_eau_electricite.economie_eau_et_lectricit.ACE2_sources_appro_eau')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 62
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ACE3_principal_combustible'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is the main fuel used for cooking in this village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.activites_economiques_eau_electricite.economie_eau_et_lectricit.ACE3_principal_combustible')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 63
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ACE4_existence_electricite'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Is there electricity in the village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.activites_economiques_eau_electricite.economie_eau_et_lectricit.ACE4_existence_electricite')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 64
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ACE4x1_source_electricite'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Where does it come from?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.activites_economiques_eau_electricite.economie_eau_et_lectricit.ACE4x1_source_electricite')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 65
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'proportion'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is the proportion of the village that has it?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.activites_economiques_eau_electricite.economie_eau_et_lectricit.proportion')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 66
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ACE4x2_preciser_autre'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.activites_economiques_eau_electricite.economie_eau_et_lectricit.ACE4x2_preciser_autre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 69
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PPD1-presence_partenaire'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Have you had any development partners in the past?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaire.PPD1-presence_partenaire')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 70
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'nombre_ONG'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many NGOs or partner organizations have intervened in this village?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaire.nombre_ONG')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //*** Repeat Group - question3 ***//
    //Row 72
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PPD3_cibles_partenaires'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' What were their target populations?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaires_prsents.PPD3_cibles_partenaires')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 73
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PPD3x1prciser_autre'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaires_prsents.PPD3x1prciser_autre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 74
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PPD4_domaine_intervention'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What was their area (s) of intervention?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaires_prsents.PPD4_domaine_intervention')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 75
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PPD5x1_date_debut'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' What was the start date of activities of the NGO or Partner Organization?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaires_prsents.PPD5x1_date_debut')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 76
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PPD5x2_date_fin'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What was the date of the end of the NGOs or Partner Organizations activities?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaires_prsents.PPD5x2_date_fin')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 77
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'Duree_mise_en_oeuvre'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Duree_mise_en_oeuvre'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaires_prsents.Duree_mise_en_oeuvre')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 80
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PPD6_programme_en_cours'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Is there any NGO or Development Organization program (s) operating in this village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaires_prsents.PPD6_programme_en_cours')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 81
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PPD7_nombre_de_programme'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'How many NGOs or development agencies are there in this village?'),
      field('ampi__Response_Type__c', 'Number'),
      field('ampi__Number_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaires_prsents.PPD7_nombre_de_programme')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 83
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PPD7x1_nom_ONG'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' What are the NGOs or Development Organizations?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaires_prsents.informations_sur_programmes.PPD7x1_nom_ONG')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 84
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PPD7x2_domaine_activite'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is its field of activity?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaires_prsents.informations_sur_programmes.PPD7x2_domaine_activite')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 85
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PPD7x3_cibles_partenaires_actuels'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' What is its target population?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaires_prsents.informations_sur_programmes.PPD7x3_cibles_partenaires_actuels')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 86
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'la_date_de_dmarrage_du_projet'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' What is the starting date of the project?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.presence_de_partenaires_au_developpement_ong.partenaires_prsents.informations_sur_programmes.la_date_de_dmarrage_du_projet')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //***** END of Repeat Group *****//
    //Row 89
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ICV1_centre_religieux_reference'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What is the religious center the community refers to for religious instructions or recommendations?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.interactions_avec_les_communautes_voisines.reseau_communautaire.ICV1_centre_religieux_reference')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 90
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ICV2_centre_coutumier_reference'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' What is the customary center the village refers to for instructions or recommendations on tradition?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.interactions_avec_les_communautes_voisines.reseau_communautaire.ICV2_centre_coutumier_reference')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 91
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ICV3_liens_de_parente'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What are the two communities with which you have the most kinship?'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.interactions_avec_les_communautes_voisines.reseau_communautaire.ICV3_liens_de_parente')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 92
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'ICV4_decision_majeure'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Which communities do you consult most when making major decisions in the village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.interactions_avec_les_communautes_voisines.reseau_communautaire.ICV4_decision_majeure')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 95
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PDA1_prise_de_decision'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', ' Who in this village makes decisions about community activities?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.decision_activtes_communautaires.dcision_et_activits_communautaires.PDA1_prise_de_decision')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 96
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PDA2_activites_communautaires'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'What community development activities have been carried out in the last 12 months in this village?'),
      field('ampi__Response_Type__c', 'Picklist'),
      field('ampi__Picklist_Response__c', dataValue('form.decision_activtes_communautaires.dcision_et_activits_communautaires.PDA2_activites_communautaires')),
      relationship('RecordType', 'Name', 'Answer')
    )),
    //Row 97
    upsert('ampi__Question__c', 'Question_ID__c', fields(
      field('Question_ID__c', (state)=>{
        return state.data.id + 'PDA3_autre_activite'
      }),
      relationship('ampi__Submission__r', 'Submission_ID__c', dataValue('id')),
      field('ampi__Description__c', 'Specify other activities'),
      field('ampi__Response_Type__c', 'Qualitative'),
      field('ampi__Text_Response__c', dataValue('form.decision_activtes_communautaires.dcision_et_activits_communautaires.PDA3_autre_activite')),
      relationship('RecordType', 'Name', 'Answer')
    ))
)
