#!/bin/sh

git log --name-status --diff-filter=A --format='> %aN' \
    | awk '/^>/ {tagline=$0} /^A\t/ {print tagline "\t" $0}'
