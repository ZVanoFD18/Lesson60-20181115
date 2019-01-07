var AppError = require('app/AppError');
var AppErrorToUser = require('app/AppErrorToUser');
var log = require('libs/log')(module);
var model = require('./Model');

class Controller {
    list(req, res, next) {
        let params = req.method === 'GET' ? req.query : req.body;
        model.getUsers(function (err, result) {
            if (err) {
                res.send({
                    success: false,
                    message: 'Не удалось получить список пользователей'
                });
            }
            let listResult = [];
            result.forEach((user) => {
                listResult.push({
                    id: user.id || user._id || undefined,
                    login: user.login || undefined,
                    name: user.name || undefined,
                    email: user.email || undefined,
                    phone: user.phone || undefined
                })
            });
            res.send(listResult);
        }, params)
    }

    item(req, res, next) {
        let params = req.method === 'GET' ? req.query : req.body;
        model.getUser((err, result) => {
            if (err) {
                if (err instanceof AppErrorToUser) {
                    return res.send({
                        success: false,
                        message: err.message
                    });
                }
                log.error('/item/', err);
                return res.send(500);
            }
            res.send({
                success: true,
                result: result
            });
        }, params.id);
    }

    add(req, res, next) {
        let params = req.method === 'GET' ? req.query : req.body;
        let userData = JSON.parse(params.user);
        delete userData.id;
        model.addUser((err, result) => {
            if (err) {
                if (err instanceof AppErrorToUser) {
                    return res.send({
                        success: false,
                        message: err.message
                    });
                }
                return res.send(500);
            }
            res.send({
                success: true,
                debug: result,
                result: result[0]._id
            });
        }, userData);
    }

    edit(req, res, next) {
        let params = req.method === 'GET' ? req.query : req.body;
        let userData = JSON.parse(params.user);
        let userId = userData.id;
        delete userData.id;

        model.updateUser((err, result) => {
            if (err) {
                if (err instanceof AppErrorToUser) {
                    return res.send({
                        success: false,
                        message: err.message
                    });
                }
                log.error('/edit/', err);
                return res.send(500);
            }
            res.send({
                debug: result,
                success: true,
                result: 1
            });
        }, userId, userData);
    }

    remove(req, res, next) {
        let params = req.method === 'GET' ? req.query : req.body;
        model.removeUser((err, result) => {
            if (err) {
                if (err instanceof AppErrorToUser) {
                    return res.send({
                        success: false,
                        message: err.message
                    });
                }
                log.error('/remove/', err);
                return res.send(500);
            }
            res.send({
                success: true,
                debug: result,
                result: 1
            });
        }, params.id);
    }
}

module.exports = new Controller();