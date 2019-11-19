const express = require('express')
const router = express.Router()

//token 名字
const keys = require('../../config/keys')
const Profile = require('../../modules/Profile')
//验证token
const passport = require('passport')

//测试接口
router.get('/test', (req,res) => {
    res.json("123")
})

// 添加信息接口  params：type describe income expend cash remark
// token验证
router.post('/add', passport.authenticate('jwt', { session:false }), (req,res) => {
    const ProfilesObj = {}
    if(req.body.type) ProfilesObj.type = req.body.type
    if(req.body.describe) ProfilesObj.describe = req.body.describe
    if(req.body.income) ProfilesObj.income = req.body.income
    if(req.body.expend) ProfilesObj.expend = req.body.expend
    if(req.body.cash) ProfilesObj.cash = req.body.cash
    if(req.body.remark) ProfilesObj.remark = req.body.remark
    new Profile(ProfilesObj).save()
                            .then((success) => {
                                res.json({msg:'添加成功',success:success})
                            })

})

// 获取所有信息接口 token验证
router.get('/', passport.authenticate('jwt', { session:false }), (req,res) => {
    Profile.find()
            .then((success) => {
                if(!success) {
                  res.json({msg:'查询成功,没有任何内容', success:success})
                }
                res.json({msg:'查询成功', success:success})
            })
            .catch(err => res.status(404).json(err))
})

// 获取指定id 信息  token验证
router.get('/:id', passport.authenticate('jwt', { session:false }), (req,res) => {
    Profile.findOne({_id: req.params.id})
           .then((success) => {
            if(!success) {
                res.json({msg:'查询成功,没有任何内容', success:success})
              }
              res.json({msg:'查询成功', success:success})
           })
           .catch(err => res.status(404).json(err))
})

// 编辑信息接口  token验证
router.post('/edit/:id', passport.authenticate('jwt', { session:false }), (req,res) => {
    const ProfilesObj = {}
    if(req.body.type) ProfilesObj.type = req.body.type
    if(req.body.describe) ProfilesObj.describe = req.body.describe
    if(req.body.income) ProfilesObj.income = req.body.income
    if(req.body.expend) ProfilesObj.expend = req.body.expend
    if(req.body.cash) ProfilesObj.cash = req.body.cash
    if(req.body.remark) ProfilesObj.remark = req.body.remark
    Profile.findOneAndUpdate(
        { _id: req.params.id },
        { $set: ProfilesObj },
        { new: true }
        ).then(profile => res.json({msg: '更新成功', success:profile}))
         .catch(err => res.json(err))
})

// 删除信息接口 token验证
router.delete('/delete/:id', passport.authenticate('jwt', { session:false }), (req,res) => {
    Profile.findOneAndRemove({ _id: req.params.id})
           .then((profile) => {
              profile.save()  
                     .then(profile => res.json(profile))
           })
           .catch(err => res.status(404).json("删除失败！"))
})

module.exports = router