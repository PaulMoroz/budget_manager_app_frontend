#include "abstracthandler.h"
#include <QJsonObject>
#include <QJsonDocument>
#include <Poco/Net/HTMLForm.h>
#include <Poco/Net/NameValueCollection.h>
QJsonObject AbstractHandler::convertIstreamToJson(std::istream &body)
{
    std::string sBody;
    sBody = std::string((std::istreambuf_iterator<char>(body)), std::istreambuf_iterator<char>());

    QString qBody = QString::fromStdString(sBody);
    QByteArray br = qBody.toUtf8();
    QJsonDocument doc = QJsonDocument::fromJson(br);
    QJsonObject obj = doc.object();

    return obj;
}

QMap<QString,QString> AbstractHandler::getParametrsFromUrl(const Poco::URI &uri)
{
    QMap<QString,QString> map;
    Poco::URI::QueryParameters queryParametrs =uri.getQueryParameters();

    for(auto itr = queryParametrs.begin();itr!=queryParametrs.end();itr++){
        map.insert(QString::fromStdString(itr->first),QString::fromStdString(itr->second));
    }

    return map;
}
