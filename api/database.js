import { MongoClient } from "mongodb";

const client = new MongoClient(process.env['CONNECTION_STRING']);

const databaseName = 'dogs';
const collectionName = 'dogs';

export async function connect() {
    return await client.connect();
}

export async function close() {
    return await client.close();
}

export async function get() {
    return await getCollection().find().toArray();
}

export async function getOne(id) {
    return await getCollection().findOne({_id: id});
}

export async function create(dog) {
    await getCollection().insertOne(dog);
    return dog;
}

export async function getBreeds() {
    return await client.db().collection('breeds').find().toArray();
}

function getCollection() {
    const database = client.db();
    const collection = database.collection(collectionName);
    return collection;
}
