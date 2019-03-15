steps(
  upsert('Amp__Submission__c', 'Submission_Ext_Id__c', fields(
    field('Submission_Ext_Id__c', dataValue('form.submissionId'),
    relationship('Amp__Project__r', dataValue('form.communityId'),
    field('Date__c', dataValue('form.date'))
  )),
  each(
    state.data.form.questions[*],
    upsert('Amp__Question_Response__c', 'Response_Id__c', fields(
      field('Response_Id__c', dataValue('submissionId'),
      relationship('Amp__Submission__r', dataValue('submissionId'),
      relationship('Question_r', dataValue('questionId')),
      field('Value__c', dataValue('response'))
    ))
  )
);
