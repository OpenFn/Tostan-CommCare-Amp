// UPSERT PARENT SUBMISSION ====================================================
upsert(
  'ampi__Submission__c',
  'Submission_ID__c',
  fields(
    field('ampi__Description__c', dataValue('form.@name')),
    field(
      'Location__latitude__s',
      state => state.data.form.coordonnes_gps.split(' ')[0]
    ),
    field(
      'Location__longitude__s',
      state => state.data.form.coordonnes_gps.split(' ')[1]
    ),
    field('Submission_ID__c', dataValue('id')),
    relationship(
      'Project__r',
      'Project_ID__c',
      `${state.data.form.fixture_localization.village}-CEP`
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
      'commune',
      'ampi__Picklist_Response__c',
      'form.fixture_localization.commune'
    ),
    makeSet(
      'village',
      'ampi__Picklist_Response__c',
      'form.fixture_localization.village'
    ),
    makeSet('pays', 'ampi__Picklist_Response__c', 'form.copy-1-of-pays'),
    makeSet('Months', 'ampi__Picklist_Response__c', 'form.mois-collecte'),
    makeSet(
      'Module en cours',
      'ampi__Picklist_Response__c',
      'form.module_en_cours'
    ),
    makeSet(
      'Number of scheduled sessions',
      'ampi__Number_Response__c',
      'form.nombre_de_sances_prvues'
    ),
    makeSet(
      'Number of completed sessions',
      'ampi__Number_Response__c',
      'form.nombre_senaces_realisees'
    ),
    makeSet(
      'Is there more than one cohort in this class?',
      'ampi__Picklist_Response__c',
      'form.plus_dune_cohorte_dans_classe'
    ),
    makeSet(
      'Type of cohort',
      'ampi__Picklist_Response__c',
      'form.type_de_cohorte'
    ),
    makeSet(
      'Number of men in the class',
      'ampi__Number_Response__c',
      'form.Situation_demographique.FS-FACIL-01.PRES-HOM-01x1'
    ),
    makeSet(
      'Number of women in class',
      'ampi__Number_Response__c',
      'form.Situation_demographique.FS-FACIL-01.PRES-FEM-01x2'
    ),
    makeSet(
      'Number of girls in class',
      'ampi__Number_Response__c',
      'form.Situation_demographique.FS-FACIL-01.PRES-FILL-01x3'
    ),
    makeSet(
      'Number of boys in class',
      'ampi__Number_Response__c',
      'form.Situation_demographique.FS-FACIL-01.PRES-GAR-01x4'
    ),
    makeSet(
      'Total_participants',
      'ampi__Number_Response__c',
      'form.Situation_demographique.FS-FACIL-01.le_nombre_total_de_participants_est_de_total_participants'
    ),
    makeSet(
      'Number of men who have been away for the entirety of the last month',
      'ampi__Number_Response__c',
      'form.Situation_demographique.FS-FACIL-02.ABS-HOM-02x1'
    ),
    makeSet(
      'Number of women who have been absent for the entirety of the last month',
      'ampi__Number_Response__c',
      'form.Situation_demographique.FS-FACIL-02.ABS-FEM-02x2'
    ),
    makeSet(
      'Number of girls who have been absent for the entirety of the last month',
      'ampi__Number_Response__c',
      'form.Situation_demographique.FS-FACIL-02.ABS-FILL-02x3'
    ),
    makeSet(
      'Number of boys who have been absent for the entirety of the last month',
      'ampi__Number_Response__c',
      'form.Situation_demographique.FS-FACIL-02.ABS-GAR-02x4'
    ),
    makeSet(
      'Total absences',
      'ampi__Number_Response__c',
      'form.Situation_demographique.FS-FACIL-02.Total_absences'
    ),
    makeSet(
      'Number of participants who dropped out last month',
      'ampi__Number_Response__c',
      'form.Situation_demographique.FS-FACIL-03.ABND-03x1'
    ),
    makeSet(
      'What is the main reason for abandonment (the most common reason for abandonment)',
      'ampi__Text_Response__c',
      'form.Situation_demographique.FS-FACIL-03.ABND-rais-03x2'
    ),
    makeSet(
      'Total number of people adopted by participants (cumulative)',
      'ampi__Number_Response__c',
      'form.Situation_demographique.adoption_des_participants.ADPT-04'
    ),
    makeSet(
      'Are the participants sitting in a semi-circle?',
      'ampi__Picklist_Response__c',
      'form.Standard_qualite.question2.STAND-QUAL-05'
    ),
    makeSet(
      "Is the drawing that represents the participants' vision for their community displayed?",
      'ampi__Picklist_Response__c',
      'form.Standard_qualite.question2.STAND-QUAL-06'
    ),
    makeSet(
      'Is the participant list displayed?',
      'ampi__Picklist_Response__c',
      'form.Standard_qualite.question2.STAND-QUAL-07'
    ),
    makeSet(
      'Is the schedule posted?',
      'ampi__Picklist_Response__c',
      'form.Standard_qualite.question2.STAND-QUAL-08'
    ),
    makeSet(
      'Is the list of CMC members with their position displayed?',
      'ampi__Picklist_Response__c',
      'form.Standard_qualite.question2.STAND-QUAL-09'
    ),
    makeSet(
      'Did the participants respect the class schedule?',
      'ampi__Picklist_Response__c',
      'form.Standard_qualite.question2.STAND-QUAL-10'
    ),
    makeSet(
      'Number of sessions attended by the supervisor',
      'ampi__Number_Response__c',
      'form.Standard_qualite.question1.STAND-QUAL-11'
    ),
    makeSet(
      'Number of women participants holding leadership positions in their communities',
      'ampi__Number_Response__c',
      'form.Standard_qualite.question1.STAND-QUAL-12'
    ),
    makeSet(
      'Does the majority of men take part in the discussions?',
      'ampi__Picklist_Response__c',
      'form.Standard_qualite.question1.STAND-QUAL-13'
    ),
    makeSet(
      'Does the majority of women take part in the discussions?',
      'ampi__Picklist_Response__c',
      'form.Standard_qualite.question1.STAND-QUAL-14'
    ),
    makeSet(
      'Do participants show interest in the content of the session?',
      'ampi__Picklist_Response__c',
      'form.Standard_qualite.question1.STAND-QUAL-15'
    ),
    makeSet(
      'Major constraint encountered by the facilitator in implementing the program',
      'ampi__Text_Response__c',
      'form.points_fort_contraintes_facilitateur.CONTR-FAC-16'
    ),
    makeSet(
      'What are the strengths noted during this month?',
      'ampi__Text_Response__c',
      'form.points_fort_contraintes_facilitateur.points_forts'
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
