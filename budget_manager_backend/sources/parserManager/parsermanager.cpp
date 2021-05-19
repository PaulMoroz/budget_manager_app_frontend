#include "parsermanager.h"


IJsonParser<User> *ParserManager::getUserParser()
{
    return new UserParser();
}

IJsonParser<Category> *ParserManager::getCategoryParser()
{
    return new CategoryParser();
}

IJsonParser<Transaction> *ParserManager::getTransactionParser()
{
    return new TransactionParser();
}
