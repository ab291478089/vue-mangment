const express = require('express')
const mongoose = require('mongoose')
const app = express()
//获取post 信息
const bodyParser = require('body-parser')
// 验证token
const passport = require('passport')

//DB config
const db = require('./config/keys').mongoURI

//Connect to mongodb
mongoose.connect(db)
        .then(() => console.log("Mongodb connect"))
        .catch(() => console.log("Mongodb disconnect"))

//router
const users = require('./routers/api/users')
const profiles = require('./routers/api/profiles')

// 使用body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 中间件
app.use('/api/users',users)
app.use('/api/profiles',profiles)

// passport初始化
app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running ${port}`)
})