#!/bin/bash
# Container runtime configuration script
# Gets secrets config file from S3 and uses Deco to substitute parameter values, then executes the supplied arguments as a command
# This script expects S3URL env variable with the full S3 path to the encrypted config file

if [ "${USE_LOCAL_CONFIG_JSON}" != "yes" ]; then
  if [ -z "$S3URL" ]; then
    echo "ERROR: S3URL variable not set!"
    exit 1
  fi

  echo "aws cli: $(aws --version)"
  echo "nodejs: $(node --version)"

  echo "Getting config file from S3 (${S3URL}) ..."
  aws --region us-east-1 s3 cp ${S3URL}/config.encrypted ./config.encrypted
  aws --region us-east-1 kms decrypt --ciphertext-blob fileb://config.encrypted --output text --query Plaintext | base64 -d > config.json
else
  echo "Using local config.json"
fi

# The $ before the single quoted string makes it work in bash
# to escape the single quotes around (.value).
# Values needs to be quoted because passwords may contain special
# characters.
cat config.json| jq -r $'.[] | "export \(.key)=\'\(.value)\'"' > ./.env

if [ "${USE_LOCAL_CONFIG_JSON}" != "yes" ]; then
  rm -f config.json config.encrypted
fi

echo "/app:"
ls -lrt /app
echo "df:"
df -h
echo "free:"
free

echo "Running the nodejs server..."
node index.js
echo "Task stopped with ${?}"
