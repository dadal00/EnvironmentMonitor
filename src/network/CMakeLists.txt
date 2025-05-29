add_library(network STATIC 
    network.cpp 
    network.hpp
)
target_include_directories(network PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/../..)
