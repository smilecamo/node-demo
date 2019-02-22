const express = require('express')
const passport = require('passport')
const Profile = require('../../models/Profile')
const jwt = require('jsonwebtoken');
const router = express.Router()
// @route POST api/profile/add
// @desc 添加商品
// @access Private
router.post('/add', passport.authenticate('jwt',{session:false}),(req, res) => {
  const profileFilelds = {}

  if (req.body.type) profileFilelds.type = req.body.type;
  if (req.body.describe) profileFilelds.describe = req.body.describe;
  if (req.body.income) profileFilelds.income = req.body.income;
  if (req.body.expend) profileFilelds.expend = req.body.expend;
  if (req.body.cash) profileFilelds.cash = req.body.cash;
  if (req.body.remark) profileFilelds.remark = req.body.remark;

  new Profile(profileFilelds).save()
    .then((profile) => {
      res.send(profile)
    })
    .catch((err)=>{
      res.send(err)
    })
})

// @route POST api/profile/edit
// @desc 编辑商品
// @access Private
router.post('/edit/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const profileFilelds = {}

  if (req.body.type) profileFilelds.type = req.body.type;
  if (req.body.describe) profileFilelds.describe = req.body.describe;
  if (req.body.income) profileFilelds.income = req.body.income;
  if (req.body.expend) profileFilelds.expend = req.body.expend;
  if (req.body.cash) profileFilelds.cash = req.body.cash;
  if (req.body.remark) profileFilelds.remark = req.body.remark;

  Profile.findOneAndUpdate(
    {_id: req.params.id},
    {$set: profileFilelds},
    {new:true}
  )
    .then((profile)=>{
      res.json(profile)
    })
})

// @route POST api/profile
// @desc 获取信息
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.find()
    .then((profile)=>{
      if (!profile){
        return res.status(400).json('暂无信息')
      }
      res.json(profile)
    })
    .catch((err)=>{
      res.status(404).json(err)
    })
})

// @route POST api/profile/:id
// @desc 获取单个信息
// @access Private
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({_id:req.params.id})
    .then((profile)=>{
      if (!profile){
        return res.status(400).json('暂无信息')
      }
      res.json(profile)
    })
    .catch((err)=>{
      res.status(404).json(err)
    })
})

// @route POST api/delete/:id
// @desc 删除单个信息
// @access Private
router.post('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOneAndDelete({_id:req.params.id})
    .then(()=>{
      res.json('success')
    })
    .catch(()=>{
      res.status(404).json('删除失败')
    })
})

module.exports=router