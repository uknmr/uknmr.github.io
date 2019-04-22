#!/usr/bin/env bash

set -e

# gitの諸々の設定
git config --global push.default simple
git config --global user.email $(git --no-pager show -s --format='%ae' HEAD)
git config --global user.name $CIRCLE_USERNAME

if git status |grep 'docs/' >/dev/null; then
  git add docs/
  git commit --message ":rocket: GitHub Pages に自動でデプロイする #$CIRCLE_BUILD_NUM [skip ci]"
  git push
  git subtree push --prefix docs/ origin master
else
  echo 'No change.'
fi
