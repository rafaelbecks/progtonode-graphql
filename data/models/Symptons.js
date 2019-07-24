import mongoose from 'mongoose'

const SymptonsSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    require: true,
  },
  TFIDFScore: {
    type: mongoose.Schema.Types.Number,
  },
  diseases: {
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

const Symptons = mongoose.model('Symptons', SymptonsSchema)

export default Symptons;