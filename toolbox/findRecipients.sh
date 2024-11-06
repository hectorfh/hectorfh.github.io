#!/bin/sh

curl http://tito.tito.local/admin/dashboard/emailCampaign/findRecipientsFilter \
	-X POST \
        -H "Cookie: PHPSESSID=2c656d7a200dfa1eeea5a72c25b79c36" \
        -H "Content-Type: application/json" \
        -d '{
"order":"asc",
"offset":0,
"limit":50,
"recipientTypes":[],
"dealsId":[],
"investorIds":[174,172],
"campaignId":"2230",
"recipientListIds":[],
"selectedGroupId":"175"
	}'
