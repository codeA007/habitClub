const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const habitModel = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    habitName: {
        required: true,
        type: 'string'
    },
    createdDate: {
        required: true,
        type: 'string'
    },
    totalDays: {
        required: true,
        type: Number
    },
    daysLeft: {
        required: true,
        type: Number
    },
    competedDates: [],
    failedDates: [],
    success: {
        required: true,
        type: 'boolean'
    },
    streakCount: {
        required: true,
        type: Number
    },
    completedToday: {
        required: true,
        type: 'boolean'
    }
})

// habitModel.virtual('status').get(function () {
//     return `Completed ${this.habitName}`;
// });
habitModel.methods.status = function () {
    const todayDate = moment().format("DD/MM/YY");
    this.completedToday = 'true';
    // if (this.competedDates.length <= 0 || !this.completedDates.includes(todayDate)) {
    // }
    // else {
    //     return this.completedToday = false;
    // }
}

module.exports = mongoose.model('Habit', habitModel);