#!/bin/sh

. ./.env_local

curl $URL/api_auth/user_jwt?prueba=1 \
	-X POST \
	-H "Accept: application/json" \
	-H "Authorization: Bearer $TOKEN" \
	-H "x-platform-name: ipartners" \
	-d '{
		"user_id":4305,
		"authSecret":"sarlanga"
	}'

