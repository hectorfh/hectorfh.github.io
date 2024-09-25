#!/bin/sh

[ $# -eq 1 ] || exit 1

egrep '(var|private \$)' "$1" | \
sed 'N;s/^.*@var \(.*\)\n.*$\(.*\);/\1 \2/' | \
awk '{

print "    /**";
print "     * @return " $1;
print "     */";
print "    public function get" toupper(substr($2, 1, 1)) substr($2, 2) "()";
print "    {";
print "        return $this->" $2 ";";
print "    }";
print "";
print "    /**";
print "     * @param " $1 " $" $2;
print "     */";
print "    public function set" toupper(substr($2, 1, 1)) substr($2, 2) "($" $2 ")";
print "    {";
print "        $this->" $2 " = $" $2 ";";
print "    }";
print "";
}'
