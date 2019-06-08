import Course from '../models/Course';

export function getAllCourses(req, res) {
      Course.find().exec(function(err, courses) {
      res.status(200).json(courses);
    });
}
export function getAllCoursesByInstrctor(req, res) {
    Course.find().exec(function(err, courses) {
    res.status(200).json(courses).where(course.description._id = req.params.id);
  });
}

export function addCourse(req, res) {
    var course = new Course();
    course.title = req.body.title;
    course.description = req.body.description;
    course.instructor = {_id: req.body.instructor._id, name: req.body.instructor.name, email: req.body.instructor.email};
    course.instructorId = req.body.instructorId;
    course.regCode = req.body.regCode;

    course.save().then(course => {
        res.status(200).json(course)
    }).catch(err => {
        res.status(400).send('failed to create course');
    });
}
export function getCourseById(req, res) {
    Course.findById(req.params.id, (err, course) => {
        if (err)
            res.status(400).send('Course not Found');
        else {
            res.status(200).json(course);
        }
    });
}

export function editCourse(req, res) {
    Course.findById(req.params.id, (err, course) => {
        if (!course)
            res.json(err);
        else {
            course.title = req.body.title;
            course.description = req.body.description;
            course.regCode = req.body.regCode;

            course.save().then(course => {
                res.json('Edit done');
            }).catch(err => {
                res.status(400).send('Edit failed');
            });
        }
    });
}
