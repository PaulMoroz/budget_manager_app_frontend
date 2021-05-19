#ifndef ABSTRACTHANDLER_H
#define ABSTRACTHANDLER_H

#include "idbmanager.h"
#include "iparsermanager.h"
#include "ijsonparser.h"
#include <Poco/Net/HTTPRequestHandler.h>
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/Net/HTTPServerResponse.h>
#include <Poco/JSON/Object.h>
#include <Poco/URI.h>
#include <QMap>
#include <memory>

class AbstractHandler : public Poco::Net::HTTPRequestHandler
{
protected:
    std::shared_ptr <IDBManager> _dbManager;
    std::shared_ptr <IParserManager> _parserManager;

    virtual void get(Poco::Net::HTTPServerRequest& request,
                     Poco::Net::HTTPServerResponse& response) = 0;
    virtual void post(Poco::Net::HTTPServerRequest& request,
                      Poco::Net::HTTPServerResponse& response) = 0;
    virtual void put(Poco::Net::HTTPServerRequest& request,
                     Poco::Net::HTTPServerResponse& response) = 0;
    virtual void del(Poco::Net::HTTPServerRequest& request,
                     Poco::Net::HTTPServerResponse& response) = 0;

public:
    virtual AbstractHandler* getCopy() = 0;

    QJsonObject convertIstreamToJson(std::istream &body);
    QMap<QString,QString> getParametrsFromUrl(const Poco::URI &uri);
};

#endif // ABSTRACTHANDLER_H
