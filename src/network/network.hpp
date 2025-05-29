#pragma once

#include <boost/beast/core.hpp>
#include <boost/beast/http.hpp>
#include <boost/beast/ssl.hpp>
#include <boost/asio/ip/tcp.hpp>
#include <boost/asio/ssl/stream.hpp>
#include <string>

namespace beast = boost::beast;
namespace http = beast::http;
namespace net = boost::asio;
namespace ssl = net::ssl;
using tcp = net::ip::tcp;

ssl::context setup_ssl_context();

beast::ssl_stream<beast::tcp_stream> connect_tcp_stream(
    net::io_context &io_context,
    ssl::context &ssl_context,
    const std::string &host);

http::response<http::string_body> send_request(
    beast::ssl_stream<beast::tcp_stream> &tcp_stream,
    const std::string &host,
    const std::string &target);
