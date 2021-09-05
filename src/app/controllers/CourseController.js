const Course = require('../models/Course')
const MongooseHelper = require('../../util/mongoose')
    // const slug = require('mongoose-slug-generator')

class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                // res.send(typeof course)
                res.render('courses/show', course)
            })
            .catch(next)
    }

    //[GET] /create
    create(req, res, next) {
        res.render('courses/create')
    }

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findOne({ _id: req.params.id })
            .then((course) => {
                res.render('courses/edit', course)
            })
            .catch(next)
    }

    //[POST]/store
    store(req, res, next) {
            const formData = req.body
            formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`
            const newCourse = new Course(formData)
            newCourse
                .save()
                .then(() => {
                    res.redirect('/')
                })
                .catch((err) => {})
        }
        //[PUT] /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then((course) => {
                res.redirect('/me/stored/courses')
            })
    }

    //[DELETE] /course/:id
    delete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }
}

module.exports = new CourseController()