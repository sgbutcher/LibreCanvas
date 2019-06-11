import mongoose from 'mongoose';

var assignmentSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
      },
    description: {
      type: String,
      required: true
      },
})
export default mongoose.model('Assignment', assignmentSchema);