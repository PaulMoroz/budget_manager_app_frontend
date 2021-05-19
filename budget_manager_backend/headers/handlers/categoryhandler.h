#ifndef CATEGORYHANDLER_H
#define CATEGORYHANDLER_H

#include "abstracthandler.h"
#include "categoryparser.h"
#include "categoryrepository.h"

class CategoryHandler : public AbstractHandler
{
protected:
    CategoryParser::ptr parser;
    CategoryRepository::ptr repository;

    void get(Poco::Net::HTTPServerRequest& request,
            Poco::Net::HTTPServerResponse& response) override;
    void post(Poco::Net::HTTPServerRequest& request,
            Poco::Net::HTTPServerResponse& response) override;
    void put(Poco::Net::HTTPServerRequest& request,
            Poco::Net::HTTPServerResponse& response) override;
    void del(Poco::Net::HTTPServerRequest& request,
            Poco::Net::HTTPServerResponse& response) override;

public:
    CategoryHandler(std::shared_ptr<IDBManager> dbManager, std::shared_ptr<IParserManager> parserManager);
    AbstractHandler* getCopy() override;

    void handleRequest(
            Poco::Net::HTTPServerRequest& request,
            Poco::Net::HTTPServerResponse& response) override;
};

#endif // CATEGORYHANDLER_H
