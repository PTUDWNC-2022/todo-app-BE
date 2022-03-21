const { MongoClient } = require('mongodb')

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

exports.connect = () => {
	return client.connect()
}

exports.db = () => {
	return client.db()
}
