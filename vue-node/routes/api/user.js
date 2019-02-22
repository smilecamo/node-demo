const express = require('express')
// 加密
const bcrypt = require('bcrypt');
// 头像
const gravatar = require('gravatar');
// token
const jwt = require('jsonwebtoken');
// 验证token
const passport = require('passport')
const router = express.Router()
const User = require('../../models/users')
const key = require('../../config/keys')

// $route  POST api/user/register
// @desc 返回的请求数据
// @access 接口是否公开 public

router.post('/register',(req,res)=>{
  // console.log(req.body);
  // 查询数据库是否拥有此邮箱
  User.findOne({email:req.body.email})
    .then((user)=>{
      if(user){
        return res.status(400).json('邮箱已被注册!')
      }else{
        // 头像
        const avatar = gravatar.url('emerleite@gmail.com', {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
        // 创建新用户
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          identity: req.body.identity,
          password: req.body.password
        })
        // 加密密码
        bcrypt.genSalt(10,  (err, salt) => {
          bcrypt.hash(newUser.password, salt,  (err, hash) => {
            // err 代表错误
            // hash 代表加密后的密码
            if(err) throw err;
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err=>console.log(err))
          });
        });
      }
    })
})

// $route  POST api/user/login
// @desc 返回token jwt passport
// @access 接口是否公开 public

router.post('/login',(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库里是否拥有
  User.findOne({email})
    .then(user=>{
      // 如果用户不存在
      if(!user){
        return res.status(400).json('用户不存在')
      }
      // 密码匹配
      bcrypt.compare(password, user.password)
        .then(isMatch=>{
          if(isMatch){
            // 设置token
            // jwt.sign('规则','加密名字','过期时间',函数)
            // 规则
            const rule = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              identity: user.identity
            }
            jwt.sign(rule, key.secretOrkey, {expiresIn: 60*60},(err,token)=>{
              if(err) throw err
              res.json({
                code: 200,
                token: "Bearer "+token
              })
            })
          }else{
            return res.status(400).json({password:'密码错误'})
          }
        })
    })
})

// $route  GET api/user/current
// @desc 返回user
// @access 接口是否公开 Private

// 验证token
router.get('/current', passport.authenticate('jwt',{session:false}),(req, res) => {
  res.json({
    code: 200,
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  })
})

module.exports = router