# `protoc-gen-twirp_js`

Creates javascript bindings compatible with both the browser and node.js as
common-js modules. This means that you should run your `protoc` with options
for the `--js-out` as `--js-out=import_style=commonjs;binary:<path>`.

The resulting javascript files `<service>_pb.js` and `<service>_pb_twirp.js` will
be compatible with all commonjs aware module systems, for example, nodejs, browserify,
webpack, rollup, etc...
