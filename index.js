import http from "http";
import { exec } from "child_process";

const port = process.env.PORT || 3000;

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
    exec: runCommandWithExec
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