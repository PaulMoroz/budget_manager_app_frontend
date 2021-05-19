#include "transactionjsonbuilder.h"
#include "constants.h"
#include <QJsonValue>

QJsonObject TransactionJsonBuilder::buildJson(Transaction transaction){
    QJsonObject jObj;
    jObj.insert(dal::ID, QJsonValue::fromVariant(transaction.getId()));
    jObj.insert(dal::AMOUNT, QJsonValue::fromVariant(transaction.getAmount()));
    jObj.insert(dal::DATE, QJsonValue::fromVariant(transaction.getDate()));
    jObj.insert(dal::DESCRIPTION, QJsonValue::fromVariant(transaction.getDescription()));
    jObj.insert(dal::CATEGORY_ID, QJsonValue::fromVariant(transaction.getCategoryId()));
    jObj.insert(dal::CATEGORY_NAME, QJsonValue::fromVariant(transaction.getCategoryName()));
    jObj.insert(dal::COLOR, QJsonValue::fromVariant(transaction.getColor()));
    jObj.insert(dal::TYPE, QJsonValue::fromVariant(transaction.getType()));
    return jObj;
}
