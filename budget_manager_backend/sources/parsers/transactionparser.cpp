#include "transactionparser.h"
#include "constants.h"


Transaction TransactionParser::parse(QJsonObject json)
{
    int id = json.value(parser::ID).toInt();
    int amount = json.value(parser::AMOUNT).toInt();
    QDate date = json.value(parser::DATE).toVariant().toDate();
    QString description = json.value(parser::DESCRIPTION).toString();
    int categoryId = json.value(parser::CATEGORY_ID).toInt();

    return Transaction(id, amount, date, description, categoryId);
}


QVector<Transaction> TransactionParser::parseVector(QJsonArray jsonArray)
{
    QVector<Transaction> transactions;
    foreach(QJsonValue json, jsonArray)
        transactions.append(this->parse(json.toObject()));

    return transactions;
}
