#!/bin/sh

[ $# -eq 1 ] || exit 1

egrep '(var|private \$)' "$1" | \
sed 'N;s/^.*@var \(.*\)\n.*$\(.*\);/\1 \2/' | \
awk '{
print "        $dto->set" toupper(substr($2, 1, 1)) substr($2, 2) "($e->get" toupper(substr($2, 1, 1)) substr($2, 2) "());"
}'
