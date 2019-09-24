// M&E Tools Questionnaire Individuel V3
steps(
  upsert('ampi__Submission__c', 'CommCare_Id__c', fields(
    field('ampi__Description__c', dataValue('form.@name')),
    field('CommCare_Id__c', dataValue('id')),
    field('Location__c', dataValue('form.coordonnes_gps')), //reformat?
    relationship('Project__r', 'Project_ID__c', (state)=>{
      const projID = state.data.id + state.data.form.fixture_localization.village //confirm format
    })
  )),
  each( //For each Submission, bulk insert child Question records
    bulk('ampi__Question__c', 'upsert', { failOnError: true, extIdField: 'Question_Id__c'}, state => {
      return state.data.map(state=> {
        //HARDCODED QUESTIONS BELOW
        return {
        [ //ROW 9
          'Question_ID__c': state.id + 'village' //TO DICUSS - what Ext ID to use for upserting questions?
          'ampi__Description__c': 'village',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.fixture_localization.village,
          'RecordType.Name' : 'Answer' //Confirm mapping will work in Sandbox
        ],
        [ //ROW 10
          'Question_ID__c': state.id + 'type_de_communaut'
          'ampi__Description__c': 'Type of community',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.type_de_communaut,
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 11
          'Question_ID__c': state.id + 'type_evaluation'
          'ampi__Description__c': 'Evaluation type',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.type_evaluation
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 13
          'Question_ID__c': state.id + 'interviewer'
          'ampi__Description__c': 'Respondent status',
          'ampi__Response_Type__c': 'Picklist',
          'ampi__Picklist_Response__c': state.form.interviewer
          'RecordType.Name' : 'Answer'
        ],
        [ //ROW 17
          'Question_ID__c': state.id + 'nbre_groupe_ethnique'
          'ampi__Description__c': 'Number of ethnic groups in the village',
          'ampi__Response_Type__c': 'Number',
          'ampi__Picklist_Response__c': state.form.ethnie.nbre_groupe_ethnique
          'RecordType.Name' : 'Answer'
        ]

      }
     })
    });
  )
);
