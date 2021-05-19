#ifndef IPARSERMANAGER_H
#define IPARSERMANAGER_H

#include "userparser.h"
#include "categoryparser.h"
#include "transactionparser.h"

class IParserManager{
public:
    virtual IJsonParser<User> *getUserParser() = 0;
    virtual IJsonParser<Category> *getCategoryParser() = 0;
    virtual IJsonParser<Transaction> *getTransactionParser() = 0;
};


#endif // IPARSERMANAGER_H
