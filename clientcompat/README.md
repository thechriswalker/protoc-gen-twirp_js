# clientcompat tests for Twirp RPC

The executable here, `jscompat-node.js` reacts to the environment
variable: `USE_JSON`. If this is set to `1` then the client will
communicate with the TwirpRPC with JSON instead of protobuf. The
input/output handling is identical in either case.

The generated files where generated from the `.proto` here, which is from:
https://github.com/twitchtv/twirp/blob/e2117e5759cedf4aaaf7dfa919d6f162fc9726c8/clientcompat/clientcompat.proto
