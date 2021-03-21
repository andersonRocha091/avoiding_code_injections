import http from "http";

const port = process.env.PORT || 3000;

async function runCommandWithExec(command){
  return `Hello world`;
}

http.createServer(async (req,res)=>{
  //Removing everything which is not a word
  const path = req.url.replace(/\W/,'');
  const routes = {
    exec: runCommandWithExec
  }
  console.log('URL: ', path);
  for await(const data of req){
    const command = JSON.parse(data);
    const response = await routes[path](command);
    console.log('response ', response);
    res.write(response);
    res.end();
  }
}).listen(port, () => {
  console.log("Running at: ", port);
})