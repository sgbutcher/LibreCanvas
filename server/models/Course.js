import mongoose from 'mongoose';

var courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: { _id: String,  name:  String, email: String },
    
  regCode: {
    type: String,
    required: true
  },
});

export default mongoose.model('Course', courseSchema);