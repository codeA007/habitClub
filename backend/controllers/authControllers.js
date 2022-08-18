const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const link = req.body.link;
    const findUser = await User.findOne({ username: username });
    if (findUser) return res.status(401).json({ message: "user found" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        username: username,
        password: hashedPassword,
        totalStreaks: 0,
        link
    });
    const savedUser = await user.save();
    const token = jwt.sign({
        id: savedUser._id
    }, "code");
    res.status(201).json({ message: "user created", token })
}

exports.loginUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const findUser = await User.findOne({ username: username });
    if (!findUser) return res.status(404).json({ message: 'user not found' });
    const hashedPassword = await bcrypt.compare(password, findUser.password);
    console.log(hashedPassword);
    if (!hashedPassword) return res.status(404).json({ message: 'password or username incorrect' });
    const token = jwt.sign(
        {
            id: findUser.id
        },
        'code');

    return res.status(200).json({ message: 'success', token: token })
}

exports.getUser = async (req, res, next) => {
    let user = await User.findOne({ _id: req.userId });
    res.status(200).json({ user: user })
}

exports.leaderBoard = async (req, res, next) => {
    let ranks = await User.find({}).sort({ totalStreaks: 'desc' });
    res.status(200).json({ ranks: ranks });
}