const express = require("express")
const os = require("os")
const cluster = require("cluster")
 
const PORT = process.env.PORT || 8080
 
const clusterWorkerSize = os.cpus().length
 
if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i=0; i < clusterWorkerSize; i++) {
      cluster.fork()
    }
 
    cluster.on("exit", function(worker) {
      console.log("Worker", worker.id, " has exitted.")
    })
  } else {
    const app = express()
    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(PORT, function () {
      console.log(`Express server listening on port ${PORT} and worker ${process.pid}`)
    })
  }
} else {
  const app = express()
  app.get('/', (req, res) => res.send('Hello World!'))
  app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT} with the single worker ${process.pid}`)
  })
}
