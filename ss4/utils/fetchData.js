import { config } from "dotenv";
import { MongoClient } from "mongodb";

config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sessionmongo.tpsqgdh.mongodb.net/`;

export const fetchdb = async () => {
  try {
    const client = new MongoClient(uri);

    await client.connect();
    const dbUse = client.db(process.env.DB_NAME);
    const listaData = await dbUse.collection("students").find().toArray();
    // console.log("data in database: ", listaData);
    return listaData
    
  } catch (err) {
    console.log(err);
  }
};
