# Tostan-CommCare-Amp
An integration between Tostan's CommCare and Amp Impact implementations.

***N.B.: all commits to master will sync to OpenFn.org***

## Solution Overview
Tostan uses CommCare for M&E data collection. To integrate CommCare with Salesforce Amp Impact for centralized monitoring and analysis of survey responses, OpenFn integrates select CommCare forms with Salesforce `Surveys`. 

Every CommCare form submission --> creates: 
- 1 "Survey" record (1 `ampi__Submission__c` for every CC form) and 
- X number of related "Question" records (1 `ampi__Question___c` record for every CC question to be mapped to SF)

Note that Question records are upserted following a specific Amp Impact data structure. This requires all `ampi__Question___c` records to include: 
1. `Question_ID__c`: uuid created by OpenFn for upserting these records
2. `Submission_ID__c`: every Question record is linked to the parent `ampi__Submission__c` record via the CC form `id`
3. `RecordType.Name`: all Question records are created with the Salesforce RecordType `Answer`
4. `ampi__Description__c`: Question label that is user-friendly
5. `ampi__Response_Type__c`: Options include `Picklist`, `Number`, or `Qualitative`
6. The CC question answer is mapped to either `ampi__Picklist_Response__c`|| `ampi__Number_Response__c` || `ampi__Text_Response__c` depending on what is specified for #5 above
