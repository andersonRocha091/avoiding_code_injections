import http from "http";
import { exec, spawn } from "child_process";
// exec allows multiple commands to be running
//which is not a good practice

const port = process.env.PORT || 3000;

//runs commands in a individual way
//better control of what can be ran, and where
async function runCommandWithSpawn(command) {
  //separating commands from arguments
  //splititing by spaces removing empty lines

  //running straight at documments, so avoiding user
  //getting into paths not allowed
  const [cmd, ...args] = command.split(/\s/);
  console.log('argument: ', cmd, args);
  const {stdout, stderr} = spawn(cmd, args || [],{cwd: './documents'});
  for await(const result of stdout){

    return result.toString().split('\n').filter(i=>!!i);
  }
}

async function runCommandWithExec(command) {
  const promise = new Promise((resolve, reject) => {
    exec(command, (err, res) => (err ? reject(err) : resolve(res)));
  });
  //splitting string into array and only retunning not empty lines
  const response = (await promise).split('\n').filter(line => !!line);
  return response;
}

http.createServer(async (req,res)=>{
  //Removing everything which is not a word
  const path = req.url.replace(/\W/,'');
  const routes = {
    exec: runCommandWithExec,
    spawn: runCommandWithSpawn
  }
  console.log('URL: ', path);
  for await (const data of req) {
    const { command } = JSON.parse(data);
    const response = await routes[path](command);
    console.log("response ", response);
    res.write(JSON.stringify(response));
    res.end();
  }
}).listen(port, () => {
  console.log("Running at: ", port);
})