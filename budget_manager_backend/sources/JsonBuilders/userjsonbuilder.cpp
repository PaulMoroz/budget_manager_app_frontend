#include "userjsonbuilder.h"
#include "constants.h"
#include <QJsonValue>


QJsonObject UserJsonBuilder::buildJson(User user){
    QJsonObject jObj;
    jObj.insert(parser::ID, QJsonValue::fromVariant(user.getId()));
    jObj.insert(parser::NAME, QJsonValue::fromVariant(user.getName()));
    jObj.insert(parser::EMAIL, QJsonValue::fromVariant(user.getEmail()));
    jObj.insert(parser::PASSWORD, QJsonValue::fromVariant(user.getPassword()));
    jObj.insert(parser::BALANCE, QJsonValue::fromVariant(user.getBalance()));
    return jObj;
}
