import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true }
});
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/;
const passwordValidator = (password) => {
    return passwordRegex.test(password);
}
UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
}
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};
UserSchema.pre('save', async function(next) {
  const saltRounds = 10; // You can adjust the number of salt rounds
  //const user = this;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
  } catch (error) {
     next(error);
  }

  } else {
      next();
  }
});


UserSchema.path("password").validate(passwordValidator, "The length of the password must be between six and eighteen characters, with a minimum of one letter, one number, and one special character.");
export default mongoose.model('User', UserSchema);