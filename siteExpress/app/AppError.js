/**
 * Системные сбои приложения.
 * Залогировать исключение и отправить извещение администратору, а пользователю выдать ошибку 500.
 */
class AppError extends Error{
    static createErrorOrAtach(err, message){
        if(err instanceof AppError){
            return err.addError(message);
        }
        return new AppError(message).addError(err);
    }
    addError (err){
        this.errors = this.errors || [];
        this.errors.push(err);
        return this;
    }
}
module.exports =  AppError;