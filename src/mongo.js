const MongoClient = require('mongodb')

class Mongo {
  constructor(uri) {
    this.uri = uri
    this.db = {}
    return this
  }

  connect() {
    MongoClient.connect(
      this.uri,
      { useNewUrlParser: true },
      (err, db) => {
        if (err) console.log('Error connecting to mongo')
        console.log('Connected to mongo')
        this.db = db
      }
    )
  }
}

module.exports = Mongo
