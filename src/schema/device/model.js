const { Schema, model } = require('mongoose')
const deviceSchema = Schema({
  name: String
})

deviceSchema.methods.speak = () => {
  const greeting = this.name ? `My name is ${this.name}` : 'No name'
  console.log(greeting)
}

const Device = model('Device', deviceSchema)

const android = new Device({
  name: 'Android'
})
android.save((err, android) => {
  if (err) return console.error(err)
  android.speak()
})
console.log(android.name)
