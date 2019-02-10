module.exports = function({ database }) {
  const Schema = database.mongoose.Schema
  const deviceSchema = new Schema({
    name: {
      type: String,
      required: true
    }
  })
  deviceSchema.methods.speak = () => {
    const greeting = this.name ? `My name is ${this.name}` : 'No name'
    return greeting
  }
  const Device = database.mongoose.model('Device', deviceSchema)
  return Device
}
