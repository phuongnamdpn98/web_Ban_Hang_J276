const mong_db = require("mongodb");
const MongoClient = mong_db.MongoClient;
const uri = "mongodb://nam:xxx@ac-wt3wx5x-shard-00-00.mhwkc5q.mongodb.net:27017,ac-wt3wx5x-shard-00-01.mhwkc5q.mongodb.net:27017,ac-wt3wx5x-shard-00-02.mhwkc5q.mongodb.net:27017/?replicaSet=atlas-r3nf95-shard-0&ssl=true&authSource=admin";

//mongodb+srv://nam:<password>@cluster0.mhwkc5q.mongodb.net/
const dbName = "js276";

class mongoDB{
    getAll(collection_name,filter={}){
        return MongoClient.connect(uri).then(client => {
            let collection=client.db(dbName).collection(collection_name);
            return collection.find(filter).toArray()
        }).catch(err => {
            console.log(err)
        })
    }
    getOne(collection_name,filter={}){
        return MongoClient.connect(uri).then(client => {
            let collection=client.db(dbName).collection(collection_name);
            return collection.findOne(filter)
        }).catch(err => {
            console.log(err)
        })
    }
    insertOne(collection_name,document){
        return MongoClient.connect(uri).then(client => {
            let collection=client.db(dbName).collection(collection_name);
            return collection.insertOne(document);
        }).catch(err => {
            console.log(err)
        })
    }

    updateOne(collection_name, filter, document){
        return MongoClient.connect(uri).then(client => {
            let collection=client.db(dbName).collection(collection_name);
            return collection.updateOne(filter,document);
        }).catch(err => {
            console.log(err)
        })

    }

    deleteOne(collection_name, filter){
        return MongoClient.connect(uri).then(client => {
            let collection=client.db(dbName).collection(collection_name);
            return collection.deleteOne(filter);
        }).catch(err => {
            console.log(err)
        })
    }
}

let db=new mongoDB()
module.exports = db;
