module.exports = function({ database }) {
  const Schema = database.mongoose.Schema
  const userSchema = new Schema({
    name: {
      type: String,
      required: true
    }
  })
  userSchema.methods.speak = () => {
    const greeting = this.name ? `My name is ${this.name}` : 'No name'
    return greeting
  }
  const User = database.mongoose.model('user', userSchema)
  return User
}
