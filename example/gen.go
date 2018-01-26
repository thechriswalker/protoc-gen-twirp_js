package example

//go:generate protoc -I . service.proto --js_out=import_style=commonjs,binary:./browser --twirp_js_out=./browser
