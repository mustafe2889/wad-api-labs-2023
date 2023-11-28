import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true }
});
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/;
const passwordValidator = (password) => {
    return passwordRegex.test(password);
}
UserSchema.path("password").validate(passwordValidator, "The length of the password must be between six and eighteen characters, with a minimum of one letter, one number, and one special character.");
export default mongoose.model('User', UserSchema);