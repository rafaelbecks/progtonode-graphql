import mongoose from 'mongoose'

const DiseasesSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    require: true,
  },
  symptons: {
    type: [mongoose.Schema.Types.String],
  },
  createdAt: {
        type: Date,
        default: Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  }
});

const Diseases = mongoose.model('Diseases', DiseasesSchema)

export default Diseases;