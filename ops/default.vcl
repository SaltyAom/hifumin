vcl 4.1;

backend hifumin {
    .host = "127.0.0.1";
    .port = "3001";
    .max_connections = 1500;
    .probe = {
        .url = "/";
        .interval = 0.1s;
        .timeout = 3s;
        .threshold = 1;
    }
    .connect_timeout        = 30s;
    .first_byte_timeout     = 30s;
    .between_bytes_timeout  = 3s;
}

sub vcl_backend_response {
    # Going to be replaced by Cloud Run instance anyway
    set beresp.ttl = 1d;

    set beresp.grace = 30s;
    set beresp.keep = 30s;
}
