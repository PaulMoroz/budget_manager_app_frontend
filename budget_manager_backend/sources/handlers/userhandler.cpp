#include "userhandler.h"
#include "userjsonbuilder.h"

UserHandler::UserHandler(std::shared_ptr<IDBManager> dbManager, std::shared_ptr<IParserManager> parserManager)
{
    this->_dbManager = dbManager;
    this->_parserManager = parserManager;
    parser.reset(_parserManager->getUserParser());
    repository.reset(_dbManager->getUserRepository());
}

AbstractHandler *UserHandler::getCopy()
{
    return new UserHandler(_dbManager, _parserManager);
}

void UserHandler::get(Poco::Net::HTTPServerRequest &request, Poco::Net::HTTPServerResponse &response)
{
    try {
    QMap<QString,QString> uriValue =getParametrsFromUrl(Poco::URI(request.getURI()));

    QString mail = uriValue.constFind(parser::EMAIL).value();
    QString password = uriValue.constFind(parser::PASSWORD).value();


    QString query = "SELECT * FROM users WHERE " + dal::MAIL + "='" + mail+ "'AND " + dal::PASSWORD + "='" +password + "';" ;
    QVector<User> users = repository->select(query);
    UserJsonBuilder builder;

    if(!users.isEmpty()){
        QJsonObject jsonObject =builder.buildJson(users.first());
        QString jsonString = QJsonDocument(jsonObject).toJson(QJsonDocument::Compact);

        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_OK);
        response.setContentType("application/json");
        response.set("Access-Control-Allow-Origin","*");

        std::ostream& ostr = response.send();
        ostr<< jsonString.toStdString();
    }else{
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_NOT_FOUND);
        response.set("Access-Control-Allow-Origin","*");
        response.send();
    }

    } catch (...) {
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_BAD_GATEWAY);
        response.set("Access-Control-Allow-Origin","*");
        response.send();
    }
}

void UserHandler::post(Poco::Net::HTTPServerRequest &request, Poco::Net::HTTPServerResponse &response)
{
    try {

    QJsonObject json = convertIstreamToJson(request.stream());
    User user = parser->parse(json);

    QVector<User> users = repository->select("SELECT * FROM users WHERE "+ dal::MAIL + "='"+user.getEmail()+"';" );
    if(users.empty()){

        repository->add(user);
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_CREATED);
    }
    else{
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_FORBIDDEN);
    }

    } catch (...) {
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_BAD_GATEWAY);
    }

    response.send();
}

void UserHandler::put(Poco::Net::HTTPServerRequest &request, Poco::Net::HTTPServerResponse &response)
{
    try {
    QJsonObject json = convertIstreamToJson(request.stream());
    User user = parser->parse(json);

    QVector<User> users = repository->select("SELECT * FROM users WHERE "+ dal::ID + "=" + std::to_string(user.getId()).c_str() + ";" );

    if(!users.empty()){
        users = repository->select("SELECT * FROM users WHERE "+ dal::MAIL + "='" + user.getEmail() + "';" );
        if(users.isEmpty() || users[0].getId() == user.getId()){
            repository->update(user);
            response.setStatus(Poco::Net::HTTPServerResponse::HTTP_ACCEPTED);
        }else{
            response.setStatus(Poco::Net::HTTPServerResponse::HTTP_FORBIDDEN);
        }
    }
    else{
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_NOT_FOUND);
    }

    } catch (...) {
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_BAD_GATEWAY);
    }

    response.send();
}

void UserHandler::del(Poco::Net::HTTPServerRequest &request, Poco::Net::HTTPServerResponse &response)
{
    try {

    QJsonObject json = convertIstreamToJson(request.stream());
    int id = json.value(parser::ID).toInt();

    QVector<User> users = repository->select("SELECT * FROM users WHERE "+ dal::ID + "=" + std::to_string(id).c_str() + ";" );

    if(!users.isEmpty()){
        repository->deleteObject(id);
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_OK);
    }else{
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_NOT_FOUND);
    }

    } catch (...) {
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_BAD_GATEWAY);
    }

    response.send();
}

void UserHandler::handleRequest(
    Poco::Net::HTTPServerRequest& request,
    Poco::Net::HTTPServerResponse& response){

    response.set("Access-Control-Allow-Origin","*");
    response.set("Allow","OPTIONS, HEAD, GET, POST, PUT, DELETE");
    response.set("Access-Control-Allow-Headers","Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token,Origin");
    response.set("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, POST, PUT, DELETE");
    response.set("Connection","Open");
    if(request.getMethod() == Poco::Net::HTTPRequest::HTTP_GET){
        get(request, response);

    }else if(request.getMethod() == Poco::Net::HTTPRequest::HTTP_POST){
        post(request, response);

    }else if(request.getMethod() == Poco::Net::HTTPRequest::HTTP_PUT){
        put(request, response);

    }else if(request.getMethod() == Poco::Net::HTTPRequest::HTTP_DELETE){
        del(request, response);
    }
    else if(request.getMethod() == Poco::Net::HTTPRequest::HTTP_OPTIONS){
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_OK);
        response.send();
    }
    else{
        response.setStatus(Poco::Net::HTTPServerResponse::HTTP_BAD_REQUEST);

        response.send();
    }
}
