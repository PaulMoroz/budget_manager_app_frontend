#include "transactionhandler.h"
#include "transactionjsonbuilder.h"
#include <Poco/URI.h>

TransactionHandler::TransactionHandler(std::shared_ptr<IDBManager> dbManager, std::shared_ptr<IParserManager> parserManager)
{
    this->_dbManager = dbManager;
    this->_parserManager = parserManager;
    parser.reset(_parserManager->getTransactionParser());
    repository.reset(_dbManager->getTransactionRepository());
}

AbstractHandler *TransactionHandler::getCopy()
{
    return new TransactionHandler(_dbManager, _parserManager);
}

void TransactionHandler::get(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response)
{    
    QMap<QString,QString> uri_map =getParametrsFromUrl(Poco::URI(request.getURI()));

    QString user_id = QString(uri_map[parser::USER_ID].toStdString().c_str());
    QString start_date = QString(uri_map[parser::START_DATE].toStdString().c_str());
    QString end_date = QString(uri_map[parser::END_DATE].toStdString().c_str());

    QString select = "SELECT transaction.*, category.name, category.color, category.type FROM category INNER JOIN "
                     "transaction ON category.id = transaction.category_id WHERE category.user_id = "+ user_id +
                     " AND transaction.date > '"+start_date+"'::date AND transaction.date < '"+end_date+"'::date";

    QVector<Transaction> transactions = repository->select(select);
    TransactionJsonBuilder transactionJsonBuilder;
    QJsonArray jsonArr;
    for(const auto &transaction : transactions)
    {
        jsonArr.append(transactionJsonBuilder.buildJson(transaction));
    }
    QJsonDocument doc;
    doc.setArray(jsonArr);
    QString jsonString = doc.toJson();
    response.setContentType("application/json");
    response.setStatus(Poco::Net::HTTPServerResponse::HTTP_OK);
    std::ostream& ostr = response.send();
    ostr<< jsonString.toStdString();
}

void TransactionHandler::post(Poco::Net::HTTPServerRequest& request,
                       Poco::Net::HTTPServerResponse& response)
{
    QJsonObject bodyObj = convertIstreamToJson(request.stream());
    Transaction transaction = parser->parse(bodyObj);
    repository->add(transaction);

    response.setStatus(Poco::Net::HTTPServerResponse::HTTP_OK);
    response.send();
}

void TransactionHandler::put(Poco::Net::HTTPServerRequest& request,
                      Poco::Net::HTTPServerResponse& response)
{
    QJsonObject bodyObj = convertIstreamToJson(request.stream());
    Transaction transaction = parser->parse(bodyObj);
    repository->update(transaction);

    response.setStatus(Poco::Net::HTTPServerResponse::HTTP_OK);
    response.send();
}

void TransactionHandler::del(Poco::Net::HTTPServerRequest& request,
                      Poco::Net::HTTPServerResponse& response)
{
    QJsonObject bodyObj = convertIstreamToJson(request.stream());
    int user_id = bodyObj.value("id").toInt();
    repository->deleteObject(user_id);

    response.setStatus(Poco::Net::HTTPServerResponse::HTTP_OK);
    response.send();
}

void TransactionHandler::handleRequest(
    Poco::Net::HTTPServerRequest& request,
    Poco::Net::HTTPServerResponse& response){

    if(request.getMethod() == Poco::Net::HTTPRequest::HTTP_GET){
           get(request, response);
    }else if(request.getMethod() == Poco::Net::HTTPRequest::HTTP_POST){
        post(request, response);
    }else if(request.getMethod() == Poco::Net::HTTPRequest::HTTP_PUT){
        put(request, response);
    }else if(request.getMethod() == Poco::Net::HTTPRequest::HTTP_DELETE){
        del(request, response);
    }
}
