#!/bin/bash

echo Content-type: text/plain
echo ""

cd /var/www/CMB_dev
git pull https://github.com/scubbo/CMB2013.git dev

echo "Pull complete"
