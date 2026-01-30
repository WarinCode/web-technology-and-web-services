import express from "express"
import bodyParser from "body-parser"
import session from "express-session"
const app = express()
const port = 3000

app.use(bodyParser.json())
// 1.สร้าง Session
app.use(session({
    secret: 'thailandgogo',
    //กำหนดว่าจะบันทึก session ลงใน storage ทุกครั้งที่ request มาหรือไม่ 
    // ถึงแม้ว่า session นั้นจะไม่มีการเปลี่ยนแปลงใดๆ
    resave: false,
    saveUninitialized: true //กำหนดว่าจะบันทึก session ที่ยังไม่ได้ถูก initialize (ยังไม่มีข้อมูล) ลงใน storage หรือไม่
}))

// 2.ส่วนรับค่าจาก Body เหมือนเป็นการทำ Login แล้วบันทึกลงตัวแปร Session
app.post('/login',(req,res)=>{
    console.log("POST / is requested")
    const bodydata=req.body
    console.log(bodydata)
    req.session.userid=bodydata.id
    req.session.username=bodydata.name
    req.session.userrole=bodydata.role
    return res.status(201).json({message:"Success"})
})

// 3.ส่วนอ่านค่าจาก Session เพื่อส่งกลับไปให้ Frontend
app.get('/get_session',(req,res)=>{
    console.log("GET /SESSION is requested")
    // อ่านค่าจะ Session แต่ละตัวแล้วส่ง Object กลับไป
    const thedata={
        id:req.session.userid, 
        name:req.session.username,
        role:req.session.userrole
    }
    console.log(thedata)
    return res.status(200).json(thedata)
})
// 4.สร้าง HTTP Server
app.listen(port,()=>{
    console.log(`Server is Running [SESSION] on port ${port}`)
})