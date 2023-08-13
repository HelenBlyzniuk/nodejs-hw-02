import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdate } from "../hooks/hooks.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      match: /.+\@.+\..+/,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    avatarURL: {
      type: String,
    },
    verify:{
      type:Boolean,
      dafault:false,
    },
    verificationToken:{
      type:String,
      required: [ true,'Verify token is required'],
      default:'',
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", handleUpdate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
