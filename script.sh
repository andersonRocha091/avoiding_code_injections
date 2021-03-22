# exec
curl -X POST http://localhost:3000/exec --data '{"command":"ls -la"}'
curl -X POST http://localhost:3000/exec --data '{"command":"cd documents && ls -la"}' | jq
curl -X POST http://localhost:3000/exec --data '{"command":"cd documents && echo aeee > newfile.txt"}'| jq
curl -X POST http://localhost:3000/exec --data '{"command":"cd documents && cat newfile.txt"}'| jq
curl -X POST http://localhost:3000/exec --data '{"command":"ls -la ~"}'| jq

#spawn
curl -X POST http://localhost:3000/spawn --data '{"command":"cd documents && ls -la"}' | jq
curl -X POST http://localhost:3000/spawn --data '{"command":"ls -la ~"}' | jq

#docker cmd
docker run -it \
  -v "$PWD"/documents:/documents \
  node:14-alpine sh

docker run -rm \
  -v "$PWD"/documents:/documents \
  node:14-alpine node -e 'console.log("aeee")'

#docker
curl -X POST http://localhost:3000/docker --data '{"command":"ls -la"}' | jq
