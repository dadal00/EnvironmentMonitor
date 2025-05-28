CXX := g++
CXXFLAGS := -std=c++20 -Wall -Wextra -O2

SRC := src/main.cpp
TARGET := build/example

all: $(TARGET)

$(TARGET): $(SRC) | build
	$(CXX) $(CXXFLAGS) $< -o $@

build:
	mkdir -p build

clean:
	rm -rf $(TARGET)

.PHONY: all clean build
