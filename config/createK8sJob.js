//Entrypoint main
function initJob(app) {
  const Client = require("kubernetes-client").Client;
  const config = require("kubernetes-client").config;

  const deploymentManifest = require("./" + app);
  createJob();
}

async function createJob() {
  try {
    const client = new Client({
      config: config.fromKubeconfig(),
      version: "1.9"
    });
    const create = await client.apis.batch.v1
      .namespaces("litmus")
      .jobs.post({ body: deploymentManifest });
    console.log("Result: ", create);
  } catch (err) {
    console.error("Error: ", err);
  }
}

module.exports = createJob;
