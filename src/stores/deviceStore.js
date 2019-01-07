function deviceStore(mongodb, logger) {
  let collection
  try {
    collection = mongodb.db.collection('devices')
  } catch (err) {
    logger.error(err)
  }

  return {
    async create(data) {
      logger.info(data)
      try {
        return collection.insertOne(data)
      } catch (err) {
        logger.error('Error inserting to MongoDB')
      }
    }
  }
}

module.exports = deviceStore
