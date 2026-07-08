#!/bin/sh

node -e "const crypto = require('crypto'); const fs = require('fs'); const file = 'staging.sql.bz2.enc'; const password = 'PASSWORD'; const ivStr = 'IV'; const iv = Buffer.from(ivStr, 'base64'); const key = crypto.createHash('sha256').update(password).digest(); const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv); const input = fs.createReadStream(file); const output = fs.createWriteStream('staging.sql.bz2'); input.pipe(decipher).pipe(output);"
