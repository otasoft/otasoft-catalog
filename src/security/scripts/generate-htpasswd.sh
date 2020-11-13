. ../../../.env

htpasswd -B -c -b ../secrets/.htpasswd $PROXY_BASIC_AUTH_USERNAME $PROXY_BASIC_AUTH_PASSWORD