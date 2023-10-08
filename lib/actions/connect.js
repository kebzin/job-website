import mongoose from "mongoose";
export const connect = () => {
  // function that connect my app to the server
  return mongoose.connect(process.env.MONOGDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  });
};
