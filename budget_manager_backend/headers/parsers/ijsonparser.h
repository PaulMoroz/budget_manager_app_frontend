#ifndef IJSONPARSER_H
#define IJSONPARSER_H

#include <QJsonObject>
#include <QJsonArray>
#include <QJsonDocument>
#include <QVector>
#include <memory>


template <typename  T>
class IJsonParser
{
public:
//    using parsPtr = std::shared_ptr<IJsonParser<T>>;
    virtual T parse(QJsonObject json) = 0;
    virtual QVector<T> parseVector(QJsonArray jsonArray) = 0;
};

#endif // IJSONPARSER_H
