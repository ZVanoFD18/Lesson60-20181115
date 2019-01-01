var AppError = require('app/AppError');
var AppErrorToUser = require('app/AppErrorToUser');
var model = require('./Model');
class Controller {
    list (req, res, next){
        let params = req.method === 'GET' ? req.query : req.body;
        model.getUsers(function (err, result) {
            if (err){
                res.send({
                    success : false,
                    message : 'Не удалось получить список пользователей'
                });
            }
            res.send(result);
        }, params)
    }
    item (req, res, next){
        res.send('@TODO: user info');
    }
    add(req, res, next){
        let params = req.method === 'GET' ? req.query : req.body;
        model.addUser(function (err, result) {
            if (err){
                if (err instanceof  AppErrorToUser){
                    return res.send({
                        success : false,
                        message : err.message
                    });
                }
                return res.send(500);
            }
            res.send({
                success : true,
                debug  : result,
                result : result[0]._id
            });
        }, params);
    }
    remove(req, res, next){
        res.send('@TODO: Users remove');
    }
}
module.exports  = new Controller();