package clientcompat

//go:generate protoc --proto_path=. --twirp_js_out=. --js_out=import_style=commonjs,binary:. clientcompat.proto
