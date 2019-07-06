const User = require('./models/user');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true });

async function main() {
  try {
    await User.deleteMany({});
    const u1 = await User.create({ email: 'ynon@gmail.com', password: '10203040' });
    const u2 = await User.create({ email: 'admin@gmail.com', password: '10203040' });
    const u3 = await User.create({ email: 'darth@deathstar.io', password: '10203040', secret_identity: 'Anakin Skywalker' });
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
}

main();
