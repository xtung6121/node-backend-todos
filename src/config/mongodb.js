import { env } from '~/config/environment'


import { MongoClient, ServerApiVersion } from 'mongodb'

// Khởi tạo một đối tượng trelloDatabaseInstance ban đầu là một null (vì chúng ta chưa connect)
let trelloDatabaseInstance = null

// Khởi tạo một đối tượng Client Instance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Lưu ý: serverAPI có từ phiên bản MongoDB từ 5.0 trở lên, có thể không dùng đến nó, còn nếu dùng đến nó chúng ta
  // sẽ chỉ định một cái Stable API Version của MongoDB
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})


// Connect tới Database
export const CONNECT_DB = async() => {
  // gọi kết nối tới MongoAtlas tới URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  // kết nối thành công lấy ra Database theo tên và gán ngược nó lại vào biến trelloDatabaseInstance ở trên của chúng ta
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}


// Function GET_DB (không async) có nhiệm vụ export ra Trello Database Instance sau khi đã connect thành công tới MongoDb
// để chúng ta sử dụng ở nhiều nơi trong code
// Lưu ý: Phải đảm bảo gọi GET_DB này sau khi đã kết nối thành công đến MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}