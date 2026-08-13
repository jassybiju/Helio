#!/bin/sh

set -e

cat > /app/public/runtime-config.json <<EOF
{
    "backendUrl" : "${SERVER_BACKEND_URL}"
}
EOF

exec "$@"
