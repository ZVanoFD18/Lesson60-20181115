var db = require('../Db');
var log = require('libs/log')(module);
var AppError = require('app/AppError');
var AppErrorToUser = require('app/AppErrorToUser');

class Model {
    static getCollection(callback) {
        db.getConnection(function (err, client) {
            if (err) {
                return callback(AppError.createErrorOrAtach(err,  new Error("Не удалось получить соединение")));
            }
            let db = client.db('app1');
            const collection = db.collection('users');
            callback(null, collection, client);
        });
    }

    getUsers(callback, filters) {
        filters = filters || {};
        Model.getCollection(function (err, collection, client) {
            if (err) {
                return callback(AppError.createErrorOrAtach(err,  new Error("Не удалось получить список пользователей/1")));
            }
            collection.find(filters).toArray(function (err, results) {
                client.close();
                if (err) {
                    return callback(AppError.createErrorOrAtach(err,  new Error("Не удалось получить список пользователей/2")));
                }
                log.info(results);
                callback(err, results);
            });
        });
    }

    getUser(callback, userId) {
        res.send('@TODO: user info');
    }

    addUser(callback, userJson) {
        if ('' == userJson.login ){
            return callback(new AppErrorToUser("Логин не указан"));
        }
        // callback(null, userJson);
        Model.getCollection(function (err, collection, client) {
            if (err) {
                return callback(AppError.createErrorOrAtach(err, new Error("Не удалось получить коллекцию")));
            }
            collection.findOne({
                login : userJson.login
            }, function (err, result) {
                if (err) {
                    client.close();
                    return callback(err);
                } else if (null !== result){
                    return callback(new AppErrorToUser("Пользователь уже существует"));
                }
                collection.insertOne(userJson, function (err, result) {
                    client.close();
                    if (err) {
                        return callback(err);
                    }
                    log.info(result.ops);
                    callback(err, result.ops);
                })
            })
        });
    }

    updateUser(callback, login, userJson) {

    }

    removeUser(req, res, next) {
        res.send('@TODO: Users remove');
    }
}

module.exports = new Model();