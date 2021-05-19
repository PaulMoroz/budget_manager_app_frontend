#ifndef APPLICATIONSERVICE_H
#define APPLICATIONSERVICE_H

#include <Poco/Util/ServerApplication.h>

class ApplicationService : public Poco::Util::ServerApplication
{
public:
    ApplicationService();
    ~ApplicationService() override;
protected:
    int main(const std::vector<std::string>& args) override;
};

#endif // APPLICATIONSERVICE_H
