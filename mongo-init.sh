#!/bin/bash
cp /etc/mongo-keyfile /tmp/mongo-keyfile
chown mongodb:mongodb /tmp/mongo-keyfile
chmod 400 /tmp/mongo-keyfile

# Start without auth first
mongod --replSet rs0 --bind_ip_all --port 27017 &
MONGOD_PID=$!

until mongosh --eval "db.adminCommand('ping')" &>/dev/null; do
  sleep 1
done

# Create admin user only if not exists
mongosh admin --eval "
  if (db.getUser('admin') === null) {
    db.createUser({
      user: 'admin',
      pwd: 'secret',
      roles: [{ role: 'root', db: 'admin' }]
    })
  }
"

kill $MONGOD_PID
wait $MONGOD_PID 2>/dev/null

exec mongod --replSet rs0 --bind_ip_all --keyFile /tmp/mongo-keyfile --auth