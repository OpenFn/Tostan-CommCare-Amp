// UPSERT PARENT SUBMISSION ====================================================
upsert(
  'ampi__Submission__c',
  'Submission_ID__c',
  fields(
    field('ampi__Description__c', dataValue('form.@name')),
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
  const { form } = state.data;

  function makeSet(a, b, c) {
    let fieldSet = {
      Question_ID__c: `${pId}-${a}`,
      ampi__Description__c: a
    };

    switch (b) {
      case 'ampi__Picklist_Response__c':
        fieldSet.ampi__Response__Type__c = 'Picklist'
        break;

      case 'ampi__Number_Response__c':
        fieldSet.ampi__Response__Type__c = 'Number'
        break;

      case 'ampi__Text__Response__c':
        fieldSet.ampi__Response__Type__c = 'Qualitative'
        break;
    
      default:
        break;
    }

    fieldSet[b] = c;

    return fieldSet;
  }

  state.fieldSets = [
    makeSet(
      'departement',
      'ampi__Picklist_Response__c',
      form.fixture_localization.departement
    ),
    makeSet(
      'departement',
      'ampi__Picklist_Response__c',
      form.fixture_localization.departement
    ),
    makeSet(
      'commune',
      'ampi__Picklist_Response__c',
      form.fixture_localization['commune']
    ),
    makeSet(
      'village',
      'ampi__Picklist_Response__c',
      form.fixture_localization['village']
    ),
    // makeSet('pays', 'ampi__Picklist_Response__c', form.XX['pays']),
    makeSet(
      'coordonnes_gps',
      'ampi__Submisison__c.Location__c',
      form['coordonnes_gps']
    ),
    makeSet(
      'date_de_lenregistrement',
      'ampi__Submission__c.CreatedDate',
      form['date_de_lenregistrement']
    ),
    makeSet(
      'mois-collecte',
      'ampi__Picklist_Response__c',
      form['mois-collecte']
    ),
    makeSet(
      'module_en_cours',
      'ampi__Picklist_Response__c',
      form['module_en_cours']
    ),
    makeSet(
      'nombre_de_sances_prvues',
      'ampi__Number_Response__c',
      form['nombre_de_sances_prvues']
    ),
    makeSet(
      'nombre_senaces_realisees',
      'ampi__Number_Response__c',
      form['nombre_senaces_realisees']
    ),
    makeSet(
      'plus_dune_cohorte_dans_classe',
      'ampi__Picklist_Response__c',
      form['plus_dune_cohorte_dans_classe']
    ),
    makeSet(
      'type_de_cohorte',
      'ampi__Picklist_Response__c',
      form['type_de_cohorte']
    ),
    makeSet(
      'PRES-HOM-01x1',
      'ampi__Number_Response__c',
      form.Situation_demographique['FS-FACIL-01']['PRES-HOM-01x1']
    ),
    makeSet(
      'PRES-FEM-01x2',
      'ampi__Number_Response__c',
      form.Situation_demographique['FS-FACIL-01']['PRES-FEM-01x2']
    ),
    makeSet(
      'PRES-FILL-01x3',
      'ampi__Number_Response__c',
      form.Situation_demographique['FS-FACIL-01']['PRES-FILL-01x3']
    ),
    makeSet(
      'PRES-GAR-01x4',
      'ampi__Number_Response__c',
      form.Situation_demographique['FS-FACIL-01']['PRES-GAR-01x4']
    ),
    makeSet(
      'Total_participants',
      'ampi__Number_Response__c',
      form.Situation_demographique['FS-FACIL-01']['Total_participants']
    ),
    // makeSet(
    //   'Number_of_men_who_have_been_away_for_the_entirety_of_the_last_month',
    //   'ampi__Number_Response__c',
    //   form.XX[
    //     'Number_of_men_who_have_been_away_for_the_entirety_of_the_last_month'
    //   ]
    // ),
    makeSet(
      'ABS-FEM-02x2',
      'ampi__Number_Response__c',
      form.Situation_demographique['FS-FACIL-02']['ABS-FEM-02x2']
    ),
    makeSet(
      'ABS-FILL-02x3',
      'ampi__Number_Response__c',
      form.Situation_demographique['FS-FACIL-02']['ABS-FILL-02x3']
    ),
    makeSet(
      'ABS-GAR-02x4',
      'ampi__Number_Response__c',
      form.Situation_demographique['FS-FACIL-02']['ABS-GAR-02x4']
    ),
    makeSet(
      'Total_absences',
      'ampi__Number_Response__c',
      form.Situation_demographique['FS-FACIL-02']['Total_absences']
    ),
    makeSet(
      'ABND-03x1',
      'ampi__Number_Response__c',
      form.Situation_demographique['FS-FACIL-03']['ABND-03x1']
    ),
    makeSet(
      'ABND-rais-03x2',
      'ampi__Text__Response__c',
      form.Situation_demographique['FS-FACIL-03']['ABND-rais-03x2']
    ),
    makeSet(
      'ADPT-04',
      'ampi__Number_Response__c',
      form.Situation_demographique['adoption_des_participants']['ADPT-04']
    ),
    makeSet(
      'STAND-QUAL-05',
      'ampi__Picklist_Response__c',
      form.Standard_qualite.question2['STAND-QUAL-05']
    ),
    makeSet(
      'STAND-QUAL-06',
      'ampi__Picklist_Response__c',
      form.Standard_qualite.question2['STAND-QUAL-06']
    ),
    makeSet(
      'STAND-QUAL-07',
      'ampi__Picklist_Response__c',
      form.Standard_qualite.question2['STAND-QUAL-07']
    ),
    makeSet(
      'STAND-QUAL-08',
      'ampi__Picklist_Response__c',
      form.Standard_qualite.question2['STAND-QUAL-08']
    ),
    makeSet(
      'STAND-QUAL-09',
      'ampi__Picklist_Response__c',
      form.Standard_qualite.question2['STAND-QUAL-09']
    ),
    makeSet(
      'STAND-QUAL-10',
      'ampi__Picklist_Response__c',
      form.Standard_qualite.question2['STAND-QUAL-10']
    ),
    makeSet(
      'STAND-QUAL-11',
      'ampi__Number_Response__c',
      form.Standard_qualite.question1['STAND-QUAL-11']
    ),
    makeSet(
      'STAND-QUAL-12',
      'ampi__Number_Response__c',
      form.Standard_qualite.question1['STAND-QUAL-12']
    ),
    makeSet(
      'STAND-QUAL-13',
      'ampi__Picklist_Response__c',
      form.Standard_qualite.question1['STAND-QUAL-13']
    ),
    makeSet(
      'STAND-QUAL-14',
      'ampi__Picklist_Response__c',
      form.Standard_qualite.question1['STAND-QUAL-14']
    ),
    // makeSet(
    //   'les_participants_manifestent_de_lintrt_pour_le_contenu_de_la_sance',
    //   'ampi__Picklist_Response__c',
    //   form.XX[
    //     'les_participants_manifestent_de_lintrt_pour_le_contenu_de_la_sance'
    //   ]
    // ),
    makeSet(
      'CONTR-FAC-16',
      'ampi__Text__Response__c',
      form.points_fort_contraintes_facilitateur['CONTR-FAC-16']
    ),
    makeSet(
      'points_forts',
      'ampi__Text__Response__c',
      form.points_fort_contraintes_facilitateur['points_forts']
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
