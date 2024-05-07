const { app } = require('./src/app');
const { connectDB } = require('./src/db/connection');

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, (err) => {
      if (err)  throw new Error('Error at server launch', err)
      console.log(`Server running on port ${PORT}`);
    })
  } catch (err) {
    console.log(err);
  }
}

startServer();