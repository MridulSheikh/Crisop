
// _id
// 6831ba20c4fa64d683d75bf6
// name
// "Mridul Sheikh2"
// email
// "prince9azir2@gmail.com"
// password
// "$2b$16$6p5/d2PxK62xXbs6F1XLi.XuZQXO1sNv9Any6dlsWb1TrJnpBOqBK"
// refreshToken
// ""
// sessionToken
// ""
// image
// "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3F…"
// createdAt
// 2025-05-24T12:22:56.278+00:00
// updatedAt
// 2025-05-24T12:22:56.278+00:00
// __v
// 0
// role
// "admin"

export type TUser = {
    _id: string,
    name: string,
    email: string,
    image: string,
    role: 'admin' | 'manager' | 'user'
}
export type TUserBuilderQueries = {
    data: TUser[];
}