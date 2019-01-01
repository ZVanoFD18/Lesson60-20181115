var AppError = require('app/AppError');
var config = require('config');
class Db {
    static getConnection(callback){
        let mongoClient = require("mongodb").MongoClient;
        let cStr =  config.get('db:connString');
        let cOpts =  config.get('db:options');
        mongoClient.connect(cStr, cOpts, function (err, client) {
            if (err){
                return callback(AppError.createErrorOrAtach(err,  new Error('Не удалось установить соединение с БД')));
            }
            callback(err, client);
        });
    }
}
module.exports =  Db;