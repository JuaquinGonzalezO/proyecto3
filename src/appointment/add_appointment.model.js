import { Schema, model } from "mongoose";

const Add_appointmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    symptom: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    keeper: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,  
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,  
    versionKey: false,
  }
);

Add_appointmentSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default model("Add_appointment", Add_appointmentSchema);
