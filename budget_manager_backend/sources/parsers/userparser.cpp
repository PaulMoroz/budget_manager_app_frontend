#include "userparser.h"
#include "constants.h"


User UserParser::parse(QJsonObject json)
{
    int id = json.value(parser::ID).toInt();
    QString name = json.value(parser::NAME).toString();
    QString email = json.value(parser::EMAIL).toString();
    QString password = json.value(parser::PASSWORD).toString();
    int balance = json.value(parser::BALANCE).toInt();
    return User(id, name, email, password, balance);
}


QVector<User> UserParser::parseVector(QJsonArray jsonArray)
{
    QVector<User> users;
    foreach(QJsonValue json, jsonArray)
        users.append(this->parse(json.toObject()));

    return users;
}
