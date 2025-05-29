#include "../models.hpp"
#include "config.hpp"
#include "../errors.hpp"
#include <sstream>

struct WeatherRequest load_env()
{
    const char *host = std::getenv("WEATHER_HOST");
    const char *path = std::getenv("WEATHER_TARGET");
    const char *key = std::getenv("WEATHER_KEY");
    const char *query = std::getenv("WEATHER_QUERY");
    const char *aqi = std::getenv("WEATHER_AQI");

    if (!host || !path || !key || !query || !aqi)
    {
        throw MissingEnvError("Missing one or more environment variables: WEATHER_KEY, WEATHER_QUERY, WEATHER_AQI");
    }

    std::ostringstream oss;
    oss << path << "?key=" << key << "&q=" << query << "&aqi=" << aqi;
    return WeatherRequest{host, oss.str()};
}
