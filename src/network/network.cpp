#include "network.hpp"

ssl::context setup_ssl_context()
{
    ssl::context ssl_context(ssl::context::sslv23_client);
    ssl_context.set_default_verify_paths();
    return ssl_context;
}

beast::ssl_stream<beast::tcp_stream> connect_tcp_stream(
    net::io_context &io_context, ssl::context &ssl_context, const std::string &host)
{
    tcp::resolver resolver(io_context);
    auto results = resolver.resolve(host, "443");

    beast::ssl_stream<beast::tcp_stream> tcp_stream(io_context, ssl_context);
    beast::get_lowest_layer(tcp_stream).connect(results);
    tcp_stream.handshake(ssl::stream_base::client);

    return tcp_stream;
}

http::response<http::string_body> send_request(
    beast::ssl_stream<beast::tcp_stream> &tcp_stream,
    const std::string &host,
    const std::string &target)
{
    http::request<http::string_body> request(http::verb::get, target, 11);
    request.set(http::field::host, host);

    http::write(tcp_stream, request);

    beast::flat_buffer buffer;
    http::response<http::string_body> response;
    http::read(tcp_stream, buffer, response);

    return response;
}
