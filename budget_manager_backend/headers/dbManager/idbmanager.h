#ifndef IDBMANAGER_H
#define IDBMANAGER_H

#include "userrepository.h"
#include "categoryrepository.h"
#include "transactionrepository.h"

class IDBManager{
public:
    virtual IRepository<User> *getUserRepository() = 0;
    virtual IRepository<Category> *getCategoryRepository() = 0;
    virtual IRepository<Transaction> *getTransactionRepository() = 0;
};

#endif // IDBMANAGER_H
