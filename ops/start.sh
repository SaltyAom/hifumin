#!/bin/sh
varnishd \
    -f /etc/varnish/default.vcl \
    -a :3002 \
    -T localhost:6082 \
    -s malloc,256m \
    -t 10800

nginx -c /etc/nginx/conf.d/default.conf

node build
