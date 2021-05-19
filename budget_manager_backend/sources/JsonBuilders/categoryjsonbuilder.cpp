#include "categoryjsonbuilder.h"
#include "constants.h"
#include <QJsonValue>

QJsonObject CategoryJsonBuilder::buildJson(Category category){
    QJsonObject jObj;

    jObj.insert(dal::ID, QJsonValue::fromVariant(category.getId()));
    jObj.insert(dal::NAME, QJsonValue::fromVariant(category.getName()));
    jObj.insert(dal::TYPE, QJsonValue::fromVariant(category.getType()));
    jObj.insert(dal::COLOR, QJsonValue::fromVariant(category.getColor().name()));

    return jObj;
}
