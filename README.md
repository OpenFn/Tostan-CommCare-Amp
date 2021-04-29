# Tostan-CommCare-Amp
An integration between Tostan's CommCare and Amp Impact (Salesforce) implementations.

***N.B.: all commits to master will sync to OpenFn.org***

## Implementation Overview
Tostan uses CommCare for M&E data collection. It would like to begin analyzing this data in a central location and requested that survey data for specific pilot forms be mapped to Salesforce. In 2019/2020, OpenFn implemented integrations for [18 CommCare forms](https://docs.google.com/spreadsheets/d/1GtmP04kuE0FFtCREgJ3Ib9Qi4WPnFUBzQNZEAcpOpQ8/edit#gid=1839537688), but in May 2020 Tostan requested that integrations only be activated for the following pilot forms. _These integrations have not been tested as Tostan is deliberating on how to report on this data in Salesforce.)_
1. Suivi prison
2. Questionnaire individuel V3 dernière version (Questionnaire Individuel Version Finale)
3. Suivi Mensuel Classes BG (suivi classe new) 
4. Suivi Mensuel CGC BG (Suivi CGC BG new)
5. Questionnaire étude de milieu
6. Suivi CGC Harmonisé Tout Projet 2020 (new combined tool)
7. Outil de Suivi des Collectivités Territoriales


**January 2021 Email: Update on Questionnaire Individuel V3 for Testing:**
[This Questionnaire Individuel V3](https://www.commcarehq.org/a/seratostan/reports/form_data/1c9f75b6-e14a-4ae5-ab20-afaa0ace1913/) form submission has been synced to Salesforce for Tostan & Vera review and consideration for reporting. [See related Salesforce Survey](https://tostan.my.salesforce.com/?ec=302&startURL=%2Fvisualforce%2Fsession%3Furl%3Dhttps%253A%252F%252Ftostan.lightning.force.com%252Flightning%252Fr%252Fampi__Question__c%252Fa2t1Y000004GQJvQAO%252Frelated%252Fampi__Questions__r%252Fview) record with related Questions and Answers (when completed by respondent). Please note...
- In the original design with Vera, we related Surveys to Projects in Salesforce based on the reported Village Name. The Project ID field was missing from production all together and I did not see any records reflecting village names. Tostan to updat
- We added in the variable mappings Ibrahima requested, however it is hard to fully check our work until we better understand your reporting requirements. Hoping you can work with Vera to determine the optimal reporting output and how to best use the Amp Impact Submissions functionality, and then we're happy to make changes to determine the best way to structure/ reformat the data. 

## Technical Solution Overview
Tostan uses CommCare for M&E data collection. To integrate CommCare with Salesforce Amp Impact for centralized monitoring and analysis of survey responses, OpenFn integrates select CommCare forms with Salesforce `Surveys` (Amp Impact `ampi__Submission__c` object). 

**N.B. CommCare surveys were mapped to Salesforce per the specifications provided by Vera Solutions. At the time of implementation, it is unclear how this data would be used and reported on in Salesforce, so very few data transformations were implemented to optimize analysis.**

For every CommCare form submission --> OpenFn will create the following in Salesforce: 
- 1 "Survey" record (1 `ampi__Submission__c` for every CC form) and 
- X number of related "Question" records (1 `ampi__Question___c` record for every CC question to be mapped to SF)

Note that Question records are upserted following a specific Amp Impact data structure. This requires all `ampi__Question___c` records to include: 
1. `Question_ID__c`: uuid created by OpenFn for upserting these records (e.g., `'question1' + state.data.id`)
2. `Submission_ID__c`: every Question record is linked to the parent `ampi__Submission__c` record via the CC form `id`
3. `RecordType.Name`: all Question records are created with the Salesforce RecordType `Answer`
4. `ampi__Description__c`: Question label that is user-friendly (e.g., `'In what village do you live?`)
5. `ampi__Response_Type__c`: Options include `Picklist`, `Number`, or `Qualitative`
6. The CC question answer (e.g., `state.data.form.question1`) is mapped to either `ampi__Picklist_Response__c`|| `ampi__Number_Response__c` || `ampi__Text_Response__c` depending on what is specified for #5 above
