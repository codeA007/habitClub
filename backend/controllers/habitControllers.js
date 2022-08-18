const moment = require('moment');
const Habit = require('../models/habitModel');
const User = require('../models/userModel');

exports.addHabit = async (req, res, next) => {
    const userId = req.userId;
    const habitName = req.body.habitName;
    const days = req.body.days || 30;

    const habit = new Habit({
        userId: userId,
        habitName: habitName,
        totalDays: days,
        daysLeft: days,
        success: false,
        createdDate: moment().format("DD/MM/YY"),
        streakCount: 0,
        completedToday: false
    });
    const savedHabit = await habit.save();
    return res.status(201).json({ message: "habit Created", savedHabit });
}
exports.statusCompleted = async (req, res, next) => {
    const data = await Habit.findOne({ _id: req.body.id });
    const user = await User.findOne({ _id: req.userId });
    let todayDate = moment().format("DD/MM/YY");
    console.log(todayDate);
    if (data.competedDates.includes(todayDate) === false) {
        let lastDate = data.competedDates[data.competedDates.length - 1];
        data.competedDates.push(todayDate);
        data.daysLeft = data.totalDays - data.competedDates.length;
        lastDate = moment(lastDate, 'DD-MM-YY');
        console.log(lastDate);
        let date1 = moment();
        let diff = date1.diff(lastDate, 'days');
        console.log(diff);
        if (diff >= 2) {
            user.totalStreaks = user.totalStreaks - data.streakCount;
            data.streakCount = 0;
        }
        else {
            data.streakCount = data.streakCount + 1;
            user.totalStreaks = user.totalStreaks + 1;
        }
        if (data.daysLeft === 0) {
            data.success = true;
            user.totalStreaks = user.totalStreaks + 3;
            // return res.status(200).json({ data: saved, completed: true, message: "successfully completed task" })
        }
        data.completedToday = true;
        const saved = await data.save();
        const usersaved = await user.save()
        // console.log(usersaved);

        return res.status(200).json({ message: saved, diff })
    } else {
        data.competedDates.pop();
        data.daysLeft = data.totalDays - data.competedDates.length;
        let lastDate = data.competedDates[data.competedDates.length - 1];
        lastDate = moment(lastDate, 'DD-MM-YY');
        let date1 = moment();
        let diff = date1.diff(lastDate, 'days');
        if (diff >= 2) {
            user.totalStreaks = user.totalStreaks - data.streakCount;
            data.streakCount = 0;
        }
        else {
            data.streakCount = data.streakCount - 1;
            user.totalStreaks = user.totalStreaks - 1;
        }
        data.completedToday = true;
        const saved = await data.save();
        const usersaved = await user.save();
        console.log(usersaved);
        if (data.daysLeft === 0) {
            data.success = true;
            // return res.status(200).json({ data: saved, completed: true, message: "successfully completed task" })
        }
        return res.status(200).json({ message: saved })
    }
    let lastDate = data.competedDates[data.competedDates.length - 1];
    lastDate = moment(lastDate, 'DD-MM-YY');
    let date1 = moment();
    let diff = date1.diff(lastDate, 'days');
    if (diff >= 2) {
        user.totalStreaks = user.totalStreaks - data.streakCount;
        data.streakCount = 0;
    }
    else {
        data.streakCount = data.streakCount + 1;
        user.totalStreaks = user.totalStreaks + 1;
    }
    console.log(data);
    console.log(user);
    const saved = await data.save();
    await user.save()
    if (data.daysLeft === 0) {
        return res.status(200).json({ data: saved, completed: true })
    }
    return res.status(200).json({ data: saved, completed: false });
}

exports.fetchHabits = async (req, res, next) => {
    // console.log(moment().format("DD/MM/YY"));
    const todayDate = moment().format("DD/MM/YY");
    const user = await User.findOne({ _id: req.userId });
    const datas = await Habit.find({ userId: req.userId })
    let m = datas.map(data => {
        if (data.competedDates.includes(todayDate)) {
            data.completedToday = true;
        }
        else {
            data.completedToday = false;
        }
        return data;
    })
    return res.status(200).json({ data: m, user })
}

exports.deleteHabit = async (req, res) => {
    await Habit.deleteOne({ _id: req.body.id });
    return res.status(200).json({ message: "deleted" })
}

exports.getHabit = async (req, res, next) => {
    const habit = Habit.findOne({ _id: req.body.id });
    return res.status(200).json({ data: habit })
}

// console.log(moment().format());

//getters

// console.log(moment().date());

// substraction
// const date1 = moment("2022-07-28");
// const date2 = moment();

// var diff = date2.diff(date1, 'days');
// console.log(diff);

// var dates = [];

// var currDate = moment('1/1/2014').startOf('day');
// var lastDate = moment('1/6/2014').startOf('day');

// while (currDate.add(1, 'days').diff(lastDate) <= 0) {
//     console.log(currDate.toDate());
//     dates.push(currDate.clone().toDate());
// }
// console.log(dates);