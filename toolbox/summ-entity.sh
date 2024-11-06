#!/bin/sh

# TODO:
# - \DateTime should be DateTime
# - AuditInfo

[ $# -eq 1 ] || exit 1

egrep 'var|private|protected' "$1" | \
grep -vi platformLayout | \
sed 'N;s/^.*var \(.*\)\n.*$\(.*\);/\1 \2/' | \
grep -v 'AuditInfo auditInfo' | \
grep -v 'Platform platform' | \
grep -v 'ContentManagement contentManagement' | \
grep -v 'integer id'
