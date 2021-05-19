#include "handlerfactory.h"
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/URI.h>
#include "dbmanager.h"
#include "parsermanager.h"
#include "userhandler.h"
#include "categoryhandler.h"
#include "transactionhandler.h"

namespace handlers
{

HandlerFactory::HandlerFactory(){
    _dbManager.reset(new DBManager);
    _parserManager.reset(new ParserManager);

    addHandler("/user", new UserHandler(_dbManager, _parserManager));
    addHandler("/category", new CategoryHandler(_dbManager, _parserManager));
    addHandler("/transaction", new TransactionHandler(_dbManager, _parserManager));
}

Poco::Net::HTTPRequestHandler* HandlerFactory::createRequestHandler(
    const Poco::Net::HTTPServerRequest& request)
{
    if(handlers[Poco::URI(request.getURI()).getPath()])
            return handlers[Poco::URI(request.getURI()).getPath()]->getCopy();
    return nullptr;
}

void HandlerFactory::addHandler(std::string uri, AbstractHandler* handler)
{
    handlers[uri] = handler;
}

}
