#!/bin/sh

[ $# -eq 1 ] || exit 1

echo '<?php'
echo
echo namespace AppBundle\Dto;
echo
echo use JMS\Serializer\Annotation as JMS;
echo
echo 'class $1'
echo '{'
echo

cat "$1" | \
awk '{

print "    /**";
print "     * @var " $1;
print "     * @JMS\Type(\"" $1 "\")";
print "     */";
print "    private $" $2 ";";
print "";
}'

echo
echo

cat "$1" | \
awk '{
prefix = "get";
if ($1 == "bool" || $1 == "boolean") {
  prefix = "is";
}

print "    /**";
print "     * @return " $1;
print "     */";
print "    public function " prefix toupper(substr($2, 1, 1)) substr($2, 2) "()";
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

echo '}'
#    /**
#     * @var string
#     * @JMS\Type("string")
#     * @JMS\SerializedName("Lead_Source_Other__c")
#     */
#    private $registrationOriginOtherName;
