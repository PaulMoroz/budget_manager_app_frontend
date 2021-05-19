#ifndef HANDLERFACTORY_H
#define HANDLERFACTORY_H

#include <Poco/Net/HTTPRequestHandlerFactory.h>
#include <Poco/URI.h>
#include <map>
#include <memory>
#include "idbmanager.h"
#include "iparsermanager.h"
#include "abstracthandler.h"

namespace handlers
{
class HandlerFactory : public Poco::Net::HTTPRequestHandlerFactory
{
private:
    std::shared_ptr <IDBManager> _dbManager;
    std::shared_ptr <IParserManager> _parserManager;
    std::map <std::string, AbstractHandler*> handlers;

    Poco::Net::HTTPRequestHandler* createRequestHandler(const Poco::Net::HTTPServerRequest& request) override;
public:
    HandlerFactory();

    void addHandler(std::string uri, AbstractHandler* handler);
};

}

#endif // HANDLERFACTORY_H
