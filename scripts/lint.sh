#!/bin/sh

tslint -p tsconfig.json
FILECOUNT=$(expr $(git status --porcelain 2>/dev/null| grep "??" | wc -l));
if [ $FILECOUNT != "0" ]; then
  echo "Unstaged files!"
  exit $FILECOUNT
fi
