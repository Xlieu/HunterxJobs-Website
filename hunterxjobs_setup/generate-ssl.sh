#!/bin/bash

# Script to generate self-signed SSL certificates for development
# For production, replace with certificates from a trusted CA like Let's Encrypt

# Create directory for SSL certificates
mkdir -p /home/ubuntu/HunterXJobs/ssl

# Generate private key
openssl genrsa -out /home/ubuntu/HunterXJobs/ssl/hunterxjobs.com.key 2048

# Generate CSR (Certificate Signing Request)
openssl req -new -key /home/ubuntu/HunterXJobs/ssl/hunterxjobs.com.key -out /home/ubuntu/HunterXJobs/ssl/hunterxjobs.com.csr -subj "/C=US/ST=State/L=City/O=HunterXJobs/OU=IT/CN=hunterxjobs.com"

# Generate self-signed certificate (valid for 365 days)
openssl x509 -req -days 365 -in /home/ubuntu/HunterXJobs/ssl/hunterxjobs.com.csr -signkey /home/ubuntu/HunterXJobs/ssl/hunterxjobs.com.key -out /home/ubuntu/HunterXJobs/ssl/hunterxjobs.com.crt

echo "Self-signed SSL certificates generated successfully."
echo "For production, replace these with certificates from a trusted CA like Let's Encrypt."
