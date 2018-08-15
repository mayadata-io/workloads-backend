const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;
const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });
const namespaces = await client.api.v1.namespaces.get();
console.log(namespaces);
console.log('this is name spaces file');