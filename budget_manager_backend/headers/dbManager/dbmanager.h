#ifndef DBMANAGER_H
#define DBMANAGER_H

#include "idbmanager.h"

class DBManager : public IDBManager
{

public:
    IRepository<User> *getUserRepository() override;
    IRepository<Category> *getCategoryRepository() override;
    IRepository<Transaction> *getTransactionRepository() override;
};

#endif // DBMANAGER_H
