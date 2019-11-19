const express = require('express')
const router = express.Router()
//hash 加密
const bcrypt = require('bcrypt');
//头像
const gravatar = require('gravatar');
//token
const jwt = require('jsonwebtoken');
//token 名字
const keys = require('../../config/keys')
const User = require('../../modules/Users')
//验证token
const passport = require('passport')
//测试接口
router.get('/test', (req,res) => {
    res.send({err:0, msg: '哈哈'})
})

//注册接口
router.post('/register', (req,res) => {
    console.log(req.body)
    User.findOne({email:req.body.email})
        .then((user) => {
            if(user) {
              return res.status(400).json({email: "邮箱已被注册！"})
            }else {
             //头像处理  使用插件 gravatar
             const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
             const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
                identity: req.body.identity
              })
              //对密码进行hash加密
              bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                           .then(user => res.json(user))
                           .catch(err => console.log(err))
                });
              });
            }           
        })
})

//登录接口
router.post('/login', (req,res) => {
    let email = req.body.email
    let password = req.body.password
    User.findOne({email})
         .then((user) => {
             if(user)//存在用户名 
             { 
                 //密码匹配
               bcrypt.compare(password, user.password)
                     .then((isMatch) => {
                        if(isMatch) {
                         //token 规则
                         const rule = {id:user.id, name:user.name, avatar:user.avatar, identity:user.identity}
                         jwt.sign(rule, keys.secretOrKey, {expiresIn: 7200}, (err,token) => {
                             if(err) throw err
                             res.json({err:isMatch, msg:'登陆成功!', token:"Bearer " + token})
                         });
                        } else {
                          res.json({err:isMatch, msg:"密码错误!"})  
                        }
                     })
            }else {
             res.json({err:-1, msg:'用户名不存在，请重新输入！'})   
             }
         })
})

// 获取用户信息 token验证
router.get('/current',  (req,res) => {
    const user = {
     name: req.user.name,
     email: req.user.email,
     avatar: req.user.avatar,
     identity: req.user.identity
    }
    res.json({msg:'查询成功', detail:user})
})


module.exports = router