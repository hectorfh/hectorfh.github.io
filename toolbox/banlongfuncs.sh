#!/bin/bash

f() {
    SRC="${1:2}"
    REGEX='s/.*[ \t]*function[ \t]*\([a-zA-Z_][a-zA-Z0-9_]*\).*/f \1/g'

    sed "$REGEX" "$SRC" | \
    awk -v src="$SRC" '
        /^f [a-zA-Z0-9]+$/ {
            MAX = 100
            if (start != "") {
                nlines = end - start
                if (nlines > MAX) {
                    print substr(src, 1, length(src)-4) " " func
                }
            }
            start = NR
            func = $2
        }
        /^[ \t]*}[ \t]*$/{
            end = NR;
        }
    '
}

export -f f
find src -type f -name '*.php' -execdir bash -c 'f "$1"' - {} ';' | \
    sort > /tmp/longfuncs.csv

diff docs/longfuncs.csv /tmp/longfuncs.csv

if [ "$?" -eq 1 ]; then
    echo "Function too long!"
    exit 1
fi
