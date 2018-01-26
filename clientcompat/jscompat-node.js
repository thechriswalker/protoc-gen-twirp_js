#!/usr/bin/env node
const { ClientCompatMessage, Req, Resp, Empty } = require("./clientcompat_pb");
const { createCompatServiceClient } = require("./clientcompat_pb_twirp.js")
const fs = require("fs");

const useJSON = process.env.USE_JSON === "1";

const write = (data) => {
    return new Promise((resolve) => {
        process.stdout.write(data, resolve);
    });
}
const writeErr = (data) => {
    return new Promise((resolve) => {
        process.stderr.write(data, resolve);
    });
}

const main = async () => {
    try {
        // read stdin as binary.
        const buf = fs.readFileSync(process.stdin.fd, { encoding: null });
        //deserialize into ClientCompatMessage
        const input = ClientCompatMessage.deserializeBinary(new Uint8Array(buf));
        // find out what and where to call.
        const address = input.getServiceAddress();
        // create client
        const client = createCompatServiceClient(address, useJSON);
        // make call
        let call;
        switch (input.getMethod()) {
            case ClientCompatMessage.CompatServiceMethod.NOOP:
                call = client.noopMethod({}).then(() => {
                    //encode as protobuf again, but it is just empty...
                    return new Empty().serializeBinary()
                })
                break;
            case ClientCompatMessage.CompatServiceMethod.METHOD:
                const req = Req.deserializeBinary(input.getRequest())
                call = client.method({ v: req.getV() }).then(res => {
                    const msg = new Resp();
                    msg.setV(res.v);
                    return msg.serializeBinary();
                })
                break;
            default:
                throw new Error("invalid input.getMethod(): " + input.getMethod())
        }

        try {
            const res = await call;
            // this is as object.
            // but we want to output the protobuf message...
            await write(res);
        } catch (err) {
            //actually need to handle this.
            if (err.code) {
                await writeErr(err.code);
            } else {
                await writeErr(err.stack);
            }
        }
    } catch (e) {
        await writeErr(e.stack);
    }
}

main()
