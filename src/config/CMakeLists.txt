add_library(config STATIC 
    config.cpp 
    config.hpp
)
target_include_directories(config PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/../..)
