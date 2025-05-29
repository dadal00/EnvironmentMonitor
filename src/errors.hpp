#pragma once
#include <stdexcept>
#include <string>

class MissingEnvError : public std::runtime_error
{
public:
    explicit MissingEnvError(const std::string &msg)
        : std::runtime_error("MissingEnvError: " + msg) {}
};
