// how many result records get created from a single CommCare form submission?
// can you show me the JSON for a monitoring form submission?

upsert('ampi__Result__c', 'CommCare_Form_Id__c', fields(
  // these are all lookups or MDs, yes?
  relationship('Unique_Community_Name__c', 'externalId', dataValue('form.communityName'),
  relationship('ampi__Project_Indicator_Reporting_Period__c','externalId', dataValue('form.period'),
  relationship('ampi__Project_Indicator__c', 'externalId', dataValue('form.questionId'),
  relationship('ampi__Project_Indicator_Geographic_Area__r', 'externalId', dataValue('geographicId'),
  // function which returns either...
    field('ampi__Result_Value__c', dataValue('form.value'), // or
    field('ampi__Result_Qualitative_Value__c', dataValue('form.value'), // this.
  field('CommCare_Form_Id__c', dataValue('form.meta.submissionId')
));
