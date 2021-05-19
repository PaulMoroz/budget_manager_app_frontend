#ifndef TRANSACTIONJSONBUILDER_H
#define TRANSACTIONJSONBUILDER_H

#include "transaction.h"
#include "IJsonBuilder.h"

class TransactionJsonBuilder: public IJsonBuilder<Transaction>
{
public:
    QJsonObject buildJson(Transaction transaction) override;
};

#endif // TRANSACTIONJSONBUILDER_H
