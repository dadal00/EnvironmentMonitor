cmake_minimum_required(VERSION 3.16)
project(WeatherClient)

if(POLICY CMP0167)
    cmake_policy(SET CMP0167 NEW)
endif()

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Boost REQUIRED COMPONENTS system)
find_package(OpenSSL REQUIRED)

add_subdirectory("src/config")
add_subdirectory("src/network")

add_executable(weather_client src/main.cpp)

target_link_libraries(network PRIVATE 
    Boost::system
    OpenSSL::SSL 
    OpenSSL::Crypto
)

target_include_directories(weather_client PRIVATE
    ${CMAKE_SOURCE_DIR}/src
    ${CMAKE_SOURCE_DIR}/src/config
    ${CMAKE_SOURCE_DIR}/src/network
)

target_link_libraries(weather_client
    config
    network
    Boost::system
    OpenSSL::SSL
    OpenSSL::Crypto
)
