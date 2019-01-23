#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  VERSION=$VERSION 

  npm version $VERSION --message "[release] $VERSION" --allow-same-version

  # build
  npm run build
  
  # tag
  # git tag v$VERSION
  git push origin refs/tags/v$VERSION

  # publish
  if [[ $VERSION =~ "beta" ]]
  then
    npm publish --tag beta
  else
    npm publish
  fi
fi