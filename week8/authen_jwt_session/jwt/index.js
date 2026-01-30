import jwt from "jsonwebtoken"
//ส่วนข้อมูล เพื่อสร้าง Payload ของ Token
const theuser={
    id:"001",
    name:"roterit",
    role:"admin"
}

//Secretkey สำหรับสร้าง Signature
const secretkey="thailandgogo" 

// ทำการสร้าง Token โดยกำหนด Expire ใน 1 ชั่วโมง
const token = jwt.sign(theuser,secretkey,{expiresIn:'1h'})
console.log(token)
