#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi
domains=(94.131.89.67)
rsa_key_size=4096
data_path="./data/certbot"
email="your-email@example.com"  # Add this line after the domains line
staging=1

# Check if domains are set
if [ -z "$domains" ]; then
  echo "ERROR: Set the domains and email environment variables in init-letsencrypt.sh before continuing." >&2
  exit 1
fi

# Check if the data_path exists, if not create it
if [ ! -d "$data_path" ]; then
  echo "### Creating $data_path directory..."
  mkdir -p "$data_path/{www,conf}"
fi

# Create a temporary nginx configuration
cat > ./nginx/nginx-temp.conf << EOF
server {
    listen 80;
    server_name ${domains[0]} ${domains[@]:1};
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
}
EOF

# Start nginx with the temporary configuration
echo "### Starting nginx..."
docker-compose -f docker-compose-ssl.yml up --force-recreate -d nginx

# Create dummy certificate for the domains
echo "### Creating dummy certificate for ${domains[0]}..."
docker-compose -f docker-compose-ssl.yml run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    --email $email \
    -d ${domains[0]} \
    ${domains[@]/#/-d } \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal \
    $staging_arg" certbot

echo "### Reloading nginx..."
docker-compose -f docker-compose-ssl.yml exec nginx nginx -s reload
