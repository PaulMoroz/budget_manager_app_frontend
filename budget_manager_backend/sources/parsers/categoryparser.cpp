#include "categoryparser.h"
#include "constants.h"


Category CategoryParser::parse(QJsonObject json)
{
    int id = json.value(parser::ID).toInt();
    QString name = json.value(parser::NAME).toString();
    int type = json.value(parser::TYPE).toInt();
    QColor color(json.value(parser::COLOR).toString());
    int userId = json.value(parser::USER_ID).toInt();
    return Category(id, name, (Type)type, color, userId);
}


QVector<Category> CategoryParser::parseVector(QJsonArray jsonArray)
{
    QVector<Category> categories;
    foreach(QJsonValue json, jsonArray)
        categories.append(this->parse(json.toObject()));

    return categories;
}
