#!/bin/sh

node -e "const crypto = require('crypto'); const fs = require('fs'); const file = '/var/www/theclasscode/dumps/staging.sql.bz2'; const password = 'n1Co1234!@'; const iv = crypto.randomBytes(16); console.log('iv: ' + iv.toString('base64')); const key = crypto.createHash('sha256').update(password).digest(); const cipher = crypto.createCipheriv('aes-256-cbc', key, iv); const input = fs.createReadStream(file); const output = fs.createWriteStream(file + '.enc'); input.pipe(cipher).pipe(output);"
