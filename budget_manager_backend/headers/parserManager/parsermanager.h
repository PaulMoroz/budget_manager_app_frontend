#ifndef PARSERMANAGER_H
#define PARSERMANAGER_H

#include "iparsermanager.h"

class ParserManager : public IParserManager
{
public:
    IJsonParser<User> *getUserParser() override;
    IJsonParser<Category> *getCategoryParser() override;
    IJsonParser<Transaction> *getTransactionParser() override;
};

#endif // PARSERMANAGER_H
