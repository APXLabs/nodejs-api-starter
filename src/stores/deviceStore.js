async function deviceStore(db, logger) {
  logger.info(db.db)
  let collection
  try {
    collection = await db.db.collection('devices')
  } catch (err) {
    logger.error(err)
  }

  return {
    async create(data) {
      try {
        return collection.insertMany(data)
      } catch (err) {
        logger.error('Error inserting to MongoDB')
      }
    }
  }
}

module.exports = deviceStore
