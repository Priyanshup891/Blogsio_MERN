const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: [true, "Please provide a name"],
      unique: false,
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: [true, "Please provide an different e-mail"],
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please provide a valid e-mail",
      ],
    },
    password: {
      type: Schema.Types.String,
      required: true,
      minlength: [6, "Please provide a longer password."],
    },
    profile_image: {
      id: {
        type: Schema.Types.String,
      },
      url: {
        type: Schema.Types.String,
        default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
