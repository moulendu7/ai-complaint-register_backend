const mongoose= require('mongoose');

const connect = async () => {
  await mongoose.connect(String(process.env.MONGO_URI));
}
module.exports = connect;