#ifndef USERJSONBUILDER_H
#define USERJSONBUILDER_H

#include "user.h"
#include "IJsonBuilder.h"

class UserJsonBuilder: public IJsonBuilder<User>
{
public:
    QJsonObject buildJson(User user) override;
};

#endif // USERJSONBUILDER_H
