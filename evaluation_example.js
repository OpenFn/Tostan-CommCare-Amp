// please upload sample submission JSON from commcare.

steps(
  upsert('ampi__Submission__c', 'CommCare_Id__c', fields(
    field('CommCare_Id__c', dataValue('form.meta.submissionId')),
    relationship('ampi__Parent_Submission__c', dataValue('???')),
    relationship('Amp__Project__r', dataValue('form.communityId'))
  )),
  each(
    state.data.form.questions[*],
    upsert('ampi__Question__c', 'Response_Id__c', fields(
      field('Response_Id__c', state.data.form.meta.submissionId + question_number),
      relationship('ampi__Parent_Question__r', dataValue('questionId'),
      field('ampi__Description__c', state.question.description),
      field('ampi__Response_Type__c', state.question.type),
      // function returns either
        field('ampi__Text_Response__c', ...),
        field('ampi__Number_Response__c', ...),
        field('ampi__Picklist_Response__c', ...),
    ))
  )
);
