const Seneca = require('seneca');
const bcrypt = require('bcrypt');

const seneca = Seneca({log: 'silent'});

seneca.add('role:utils,cmd:hashPassword', async (msg, reply) => {
  const {password} = msg;
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  reply({hash});
});

seneca.listen(process.env.PORT || 9010);
