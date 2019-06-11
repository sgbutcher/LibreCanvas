import Course from '../models/Course';
import Assignment from '../models/Assignment';
import { isNullOrUndefined } from 'util';

export function getAllCourses(req, res) {
      Course.find().exec(function(err, courses) {
      res.status(200).json(courses);
    });
}
export function getPublishedCourses(req, res) {
    Course.find({'published': true}).exec(function(err, courses) {
    res.status(200).json(courses);
  });
}
export function getCoursesByInstructor(req, res) {
    var filter = {'instructor._id': req.payload._id};
    Course.find(filter).exec(function(err, courses) {
        if (err ||  isNullOrUndefined(courses))
            res.status(400).send('Course inst not Found');
        else {
            res.status(200).json(courses);
        }
  });
}

export function addCourse(req, res) {
    var course = new Course();
    course.title = req.body.title;
    course.description = req.body.description;
    course.instructor = {_id: req.body.instructor._id, name: req.body.instructor.name, email: req.body.instructor.email};
    course.instructorId = req.body.instructorId;
    course.regCode = req.body.regCode;
    course.published = req.body.published;

    course.save().then(course => {
        res.status(200).json(course)
    }).catch(err => {
        res.status(400).send('failed to create course');
    });
}
export function getCourseById(req, res) {
    Course.findById(req.params.id).populate('assignments')
     .exec(function (err, course) {
        if (err)
            res.status(400).send('Course 44 not Found');
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
            course.published = req.body.published;

            course.save().then(course => {
                res.json('Edit done');
            }).catch(err => {
                res.status(400).send('Edit failed');
            });
        }
    });
}

export function deleteCourse(req, res) {
    Course.findByIdAndRemove({_id: req.params.id}, (err, course) => {
        if (err){
            res.json(err);
        }else if (req.payload._id !== course.instructor._id){
            res.status(401).json({
                "message" : "UnauthorizedError: Not course owner"
            });
        }else {
            res.json('Removed successfully');
        }
    });
}

export function addAssignment(req, res) {
    var assignment = new Assignment();
    var courseid = req.params.id
    assignment.title = req.body.title;
    assignment.description = req.body.description;
    assignment.save().then(assignment => {
            Course.findById({_id: courseid },(err, course) => {
                if (!course)
                res.json(err);
                else { course.assignments.push( { _id: assignment._id  })
                course.save()
            }})
        res.status(200).json(assignment)
    }).catch(err => {
        res.status(400).send('failed to create assignment');
    });
}
