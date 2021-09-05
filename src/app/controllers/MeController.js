const Course = require('../models/Course')
const MongooseHelper = require('../../util/mongoose')

class meController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then(function(courses) {
                res.render('me/storedCourses', { courses: MongooseHelper.multiMgToObject(courses) })
            })
            .catch(next)
    }


    //[GET] /me/blogs
    blogs(req, res, next) {
        res.send('blog')
    }
}

module.exports = new meController()