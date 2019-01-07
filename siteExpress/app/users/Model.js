var mongodb = require('mongodb');
var db = require('../Db');
var log = require('libs/log')(module);
var AppError = require('app/AppError');
var AppErrorToUser = require('app/AppErrorToUser');

class Model {
    static getCollection(callback) {
        db.getConnection(function (err, client) {
            if (err) {
                return callback(AppError.createErrorOrAtach(err, new Error("Не удалось получить соединение")));
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
                return callback(AppError.createErrorOrAtach(err, new Error("Не удалось получить список пользователей/1")));
            }
            collection.find(filters)
                .skip(0)    // @TODO: реализовать пагинацию
                .limit(100) // @TODO: реализовать пагинацию
                .toArray(function (err, results) {
                    client.close();
                    if (err) {
                        return callback(AppError.createErrorOrAtach(err, new Error("Не удалось получить список пользователей/2")));
                    }
                    log.info(results);
                    callback(err, results);
                });
        });
    }

    getUser(callback, userId) {
        if ('' == userId) {
            return callback(new AppErrorToUser("id не указан"));
        }
        Model.getCollection(function (err, collection, client) {
            if (err) {
                return callback(err);
            }
            collection.findOne({
                _id: new mongodb.ObjectID(userId)
            }, (err, results) => {
                client.close();
                if (err) {
                    return callback(AppError.createErrorOrAtach(err, new Error("Не удалось получить список пользователей/2")));
                }
                log.info('getUser', results);
                callback(err, results);
            });
        });
    }

    addUser(callback, userJson) {
        if ('' == userJson.login) {
            return callback(new AppErrorToUser("Логин не указан"));
        }
        Model.getCollection(function (err, collection, client) {
            if (err) {
                return callback(AppError.createErrorOrAtach(err, new Error("Не удалось получить коллекцию")));
            }
            collection.findOne({
                login: userJson.login
            }, function (err, result) {
                if (err) {
                    client.close();
                    return callback(err);
                } else if (null !== result) {
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

    updateUser(callback, userId, userJson) {
        if ('' == userId) {
            return callback(new AppErrorToUser("id не указан"));
        }
        Model.getCollection(function (err, collection, client) {
            if (err) {
                return callback(AppError.createErrorOrAtach(err, new Error("Не удалось получить коллекцию")));
            }
            collection.findOneAndUpdate({
                _id: new mongodb.ObjectID(userId)
            }, {
                $set: userJson
            }, {
                returnOriginal: false
            }, (err, result) => {
                client.close();
                if (err) {
                    return callback(err);
                }
                log.info('updateUser/', result);
                callback(err, result);
            })

        });
    }

    removeUser(callback, userId) {
        if ('' == userId) {
            return callback(new AppErrorToUser("id не указан"));
        }
        Model.getCollection(function (err, collection, client) {
            if (err) {
                return callback(AppError.createErrorOrAtach(err, new Error("Не удалось получить коллекцию")));
            }
            collection.deleteOne({
                _id: new mongodb.ObjectID(userId)
            }, function (err, result) {
                client.close();
                if (err) {
                    return callback(err);
                }
                log.info('removeUser/', result);
                callback(err, result);
            })

        });
    }
}

module.exports = new Model();