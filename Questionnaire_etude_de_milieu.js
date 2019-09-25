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
    ))
)
