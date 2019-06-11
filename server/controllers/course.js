import Course from '../models/Course';
import User from '../models/User';
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
export function getEnrolledCourses(req, res) {
    var filter = {'enrolled': req.payload._id};
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
    Course.findById(req.params.id).populate('assignments').populate('enrolled', 'name email')
     .exec(function (err, course) {
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
    Course.findOneAndDelete(req.params.id).exec(function (err, course) {
        if (err){
            res.json(err);
        }else if (req.payload._id !== course.instructor._id){
            res.status(401).json({
                "message" : "UnauthorizedError: Not course owner"
            });
        }else {
        Assignment.deleteMany({_id: { $in: course.assignments }})
        .exec(function (err){
            if (err)res.status(400).send('this error sucks '+ err )
        })
        res.json('Removed successfully');
    }})
}

export function addAssignment(req, res) {
    var assignment = new Assignment();
    var courseid = req.params.id
    assignment.title = req.body.title;
    assignment.description = req.body.description;
    assignment.dueDate = req.body.dueDate;
    assignment.pointValue = req.body.pointValue;
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

export function enrollInCourse(req, res){
    var courseid = req.params.id
    var regCode = req.body.regCode
    
    Course.findById({_id: courseid },(err, course) => {
        /* var user = User.find({_id: { $in: course.enrolled }}) */
        if (!course) {
            res.json(err);
        }else if (regCode !== course.regCode) {
            res.status(400).send('Invalid Registration Code'+ regCode);
        }else /* if (user){
            res.json('already enrolled')
        }else if (!user) */    
            course.enrolled.push( { _id: req.payload._id  })
            course.save()
            res.json('successfully enrolled');
        }).catch(err => {
        res.status(400).send('failed to enroll');
    });
}
export function dropFromCourse(req, res){
    var courseid = req.params.id
    var  userID = req.body._id
    Course.findById({_id: courseid },(err, course) => {
        course.enrolled.pull( { _id: userID  })
            course.save()
            res.json('successfully dropped');
    })

}
