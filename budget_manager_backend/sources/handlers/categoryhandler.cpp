#include "categoryhandler.h"
#include "categoryjsonbuilder.h"


CategoryHandler::CategoryHandler(std::shared_ptr<IDBManager> dbManager, std::shared_ptr<IParserManager> parserManager)
{
    this->_dbManager = dbManager;
    this->_parserManager = parserManager;
    parser.reset(_parserManager->getCategoryParser());
    repository.reset(_dbManager->getCategoryRepository());
}

AbstractHandler *CategoryHandler::getCopy()
{
    return new CategoryHandler(_dbManager, _parserManager);
}


void CategoryHandler::get(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response){
    try {
    QMap<QString,QString> map = getParametrsFromUrl(Poco::URI(request.getURI()));
    int user_id;

    user_id = std::stoi(map[dal::USER_ID].toStdString());

    QString query(QString("SELECT * FROM %1 WHERE user_id = %2 ORDER BY %3 ASC").
                  arg(dal::CATEGORY, QString::number(user_id), dal::ID));

    QVector<Category> categories = repository->select(query);
    CategoryJsonBuilder categoryJsonBuilder;
    QJsonArray jsonArr;

    for (const auto &category : categories){
        jsonArr.append(categoryJsonBuilder.buildJson(category));
    }

    QJsonDocument doc;
    doc.setArray(jsonArr);
    QString jsonString = doc.toJson();

    response.setContentType("application/json");

    std::ostream& ostr = response.send();
    response.setStatus(Poco::Net::HTTPServerResponse::HTTP_OK);
    ostr<< jsonString.toStdString();
    }
    catch (...) {
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_BAD_GATEWAY);
    }
}

void CategoryHandler::put(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response){
    QJsonObject bodyObj = convertIstreamToJson(request.stream());

    Category category = parser->parse(bodyObj);

    repository->update(category);

    response.setStatus(Poco::Net::HTTPServerResponse::HTTP_OK);
    response.send();
}


void CategoryHandler::post(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response){
    QJsonObject bodyObj = convertIstreamToJson(request.stream());

    Category category = parser->parse(bodyObj);

    repository->add(category);

    response.setStatus(Poco::Net::HTTPServerResponse::HTTP_OK);
    response.send();
}

void CategoryHandler::del(Poco::Net::HTTPServerRequest& request, Poco::Net::HTTPServerResponse& response){
    QJsonObject bodyObj = convertIstreamToJson(request.stream());
    Category category = parser->parse(bodyObj);

    repository->deleteObject(category.getId());

    response.setStatus(Poco::Net::HTTPServerResponse::HTTP_OK);
    response.send();
}

void CategoryHandler::handleRequest(Poco::Net::HTTPServerRequest &request, Poco::Net::HTTPServerResponse &response)
{
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

