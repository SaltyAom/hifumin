vcl 4.1;

backend hifumin {
    .host = "127.0.0.1";
    .port = "3001";
    .max_connections = 1500;
    .probe = {
        .url = "/";
    }
    .connect_timeout        = 30s;
    .first_byte_timeout     = 30s;
    .between_bytes_timeout  = 3s;
}

sub vcl_backend_response {
    # Going to be replaced by Cloud Run instance anyway
    set beresp.ttl = 1d;
}