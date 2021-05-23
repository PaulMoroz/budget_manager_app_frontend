QT += gui sql

CONFIG += c++11
TEMPLATE = app
CONFIG += console

# You can make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0


INCLUDEPATH += \
    $$PWD/sources \
    $$PWD/headers \
    $$PWD/sources/parsers \
    $$PWD/sources/handlers \
    $$PWD/sources/dbManager \
    $$PWD/sources/JsonBuilders \
    $$PWD/sources/ParserManager \
    $$PWD/headers/parsers \
    $$PWD/headers/handlers \
    $$PWD/headers/dbManager \
    $$PWD/headers/JsonBuilders \
    $$PWD/headers/ParserManager

HEADERS += \
    headers/dbManager/idbmanager.h \
    headers/handlers/abstracthandler.h \
    headers/parserManager/iparsermanager.h \
    headers/parserManager/parsermanager.h \
    headers/parsers/categoryparser.h \
    headers/parsers/ijsonparser.h \
    headers/parsers/transactionparser.h \
    headers/parsers/userparser.h \
    headers/applicationservice.h \
    headers/handlerfactory.h \
    headers/handlers/transactionhandler.h \
    headers/handlers/userhandler.h\
    headers/handlers/categoryhandler.h\
    headers/dbManager/dbmanager.h \
    headers/JsonBuilders/IJsonBuilder.h \
    headers/JsonBuilders/categoryjsonbuilder.h \
    headers/JsonBuilders/transactionjsonbuilder.h \
    headers/JsonBuilders/userjsonbuilder.h

SOURCES += \
    main.cpp \
    sources/handlers/abstracthandler.cpp \
    sources/parsers/userparser.cpp \
    sources/parsers/categoryparser.cpp \
    sources/parsers/transactionparser.cpp \
    sources/parserManager/parsermanager.cpp \
    sources/applicationservice.cpp \
    sources/handlerfactory.cpp \
    sources/handlers/transactionhandler.cpp \
    sources/handlers/userhandler.cpp \
    sources/handlers/categoryhandler.cpp \
    sources/dbManager/dbmanager.cpp \
    sources/JsonBuilders/transactionjsonbuilder.cpp \
    sources/JsonBuilders/userjsonbuilder.cpp \
    sources/JsonBuilders/categoryjsonbuilder.cpp \

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

LIBS += \
    -L../build-DAL-Desktop_Qt_6_0_2_clang_64bit-Debug -lDAL \

INCLUDEPATH += \
    ../DAL/headers \
    ../DAL/headers/models \
    ../DAL/headers/repositories \
DEPENDPATH += \
    ../DAL/headers \
    ../DAL/headers/models \
    ../DAL/headers/repositories


win32:CONFIG(release, debug|release): LIBS += -L$$PWD/../../poco/cmake-build/lib/release/ -lPocoData.71 -lPocoDataPostgreSQL.71 -lPocoDataSQLite.71\
-lPocoEncodings.71 -lPocoFoundation.71 -lPocoJSON.71 -lPocoMongoDB.71 -lPocoNet.71 -lPocoRedis.71 -lPocoUtil.71\
-lPocoXML.71 -lPocoZip.71
else:win32:CONFIG(debug, debug|release): LIBS += -L$$PWD/../../poco/cmake-build/lib/debug/ -lPocoData.71 -lPocoDataPostgreSQL.71 -lPocoDataSQLite.71\
-lPocoEncodings.71 -lPocoFoundation.71 -lPocoJSON.71 -lPocoMongoDB.71 -lPocoNet.71 -lPocoRedis.71 -lPocoUtil.71\
-lPocoXML.71 -lPocoZip.71
else:unix: LIBS += -L$$PWD/../../poco/cmake-build/lib/ -lPocoData.71 -lPocoDataPostgreSQL.71 -lPocoDataSQLite.71\
-lPocoEncodings.71 -lPocoFoundation.71 -lPocoJSON.71 -lPocoMongoDB.71 -lPocoNet.71 -lPocoRedis.71 -lPocoUtil.71\
-lPocoXML.71 -lPocoZip.71

INCLUDEPATH += $$PWD/../../poco/Foundation/include
INCLUDEPATH += $$PWD/../../poco/Net/include
INCLUDEPATH += $$PWD/../../poco/Util/include
INCLUDEPATH += $$PWD/../../poco/JSON/include

DEPENDPATH += $$PWD/../../poco/Foundation/include
DEPENDPATH += $$PWD/../../poco/Net/include
DEPENDPATH += $$PWD/../../poco/Util/include
DEPENDPATH += $$PWD/../../poco/JSON/include
