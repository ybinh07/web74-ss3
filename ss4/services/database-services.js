import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sessionmongo.tpsqgdh.mongodb.net/`;

class DatabaseService {
  static client; // Thêm thuộc tính tĩnh để lưu trữ đối tượng client để fetchData dùng
  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_NAME)
  }
  async run() {
    try {
      await this.db.command({
        ping: 1,
      });
      console.log(
        `Pinged your developed. Your connection successfully to MongoBD`
      );
    } catch (err) {
      console.log(`Cannot access to mongoDB`, err);
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;


