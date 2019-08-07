const Seneca = require('seneca');
const Promise = require('bluebird');


const init = () => {
  const seneca = Seneca({log: 'silent'});
  const utilsClient = seneca.client(process.env.UTILS_SERICE_PORT || 9010);
  const act = Promise.promisify(utilsClient.act, {context: utilsClient});

  return async (req, res) => {
    const {body} = req;
    const {password} = body;
    try {
      const {hash} = await act('role:utils,cmd:hashPassword', {password});
      res.send(`hash: ${hash}`);
    } catch (error) {
      res.send("Could not hash the password, it seems that the utils microservice isn't started");
    }
  };
};

module.exports = init;

