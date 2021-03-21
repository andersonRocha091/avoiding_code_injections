curl -X POST http://localhost:3000/exec --data '{"command":"ls -la"}'
curl -X POST http://localhost:3000/exec --data '{"command":"cd documents && ls -la"}' | jq
curl -X POST http://localhost:3000/exec --data '{"command":"cd documents && echo aeee > newfile.txt"}'| jq
curl -X POST http://localhost:3000/exec --data '{"command":"cd documents && cat newfile.txt"}'| jq