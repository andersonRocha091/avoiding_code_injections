import http from "http";

const port = process.env.PORT || 3000;

async function runCommandWithExec(){

}

http.createServer(async (req,res)=>{
  //Removing everything which is not a word
  const path = req.url.replace(/\W/,'');
  const routes = {
    exec: runCommandWithExec
  }
  console.log('URL: ', path);
  for await(const data of req){
    console.log('data', data.toString());
  }
  res.write('received!!');
  res.end();
}).listen(port, () => {
  console.log("Running at: ", port);
})