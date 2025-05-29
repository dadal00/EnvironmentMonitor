#include <iostream>

#include "models.hpp"
#include "network/network.hpp"
#include "config/config.hpp"
#include "errors.hpp"

int main()
{
    try
    {
        struct WeatherRequest request = load_env();
        net::io_context io_context;

        auto ssl_context = setup_ssl_context();
        auto tcp_stream = connect_tcp_stream(io_context, ssl_context, request.host);
        auto response = send_request(tcp_stream, request.host, request.target);

        std::cout << response << std::endl;

        beast::error_code ec;
        tcp_stream.shutdown(ec);
        if (ec == net::error::eof)
        {
            ec = {};
        }
        if (ec)
        {
            throw beast::system_error{ec};
        }
    }
    catch (const MissingEnvError &e)
    {
        std::cerr << "Missing env: " << e.what() << "\n";
        return EXIT_FAILURE;
    }
    catch (std::exception const &e)
    {
        std::cerr << "Unexpected error: " << e.what() << "\n";
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}
