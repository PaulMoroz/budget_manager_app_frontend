#include "dbmanager.h"


IRepository<User> *DBManager::getUserRepository()
{
    return new UserRepository();
}

IRepository<Category> *DBManager::getCategoryRepository()
{
    return new CategoryRepository();
}

IRepository<Transaction> *DBManager::getTransactionRepository()
{
    return new TransactionRepository();
}
