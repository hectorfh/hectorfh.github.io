#!/bin/sh

[ $# -eq 1 ] || exit 1

cat "$1" | \
awk '{
prefix = "get";
if ($1 == "bool" || $1 == "boolean") {
  prefix = "is";
}
print "        $dto->set" toupper(substr($2, 1, 1)) substr($2, 2) "($entity->" prefix toupper(substr($2, 1, 1)) substr($2, 2)  "());";
}'
