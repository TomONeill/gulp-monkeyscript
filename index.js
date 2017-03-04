"use strict";
var fs = require('fs');
var Stream = require('readable-stream');
var StreamQueue = require('streamqueue');
var compiler = require('./compiler');

function MonkeyScript(config) {
    this.createProject(config);
}

MonkeyScript.createProject = function(input) {
    throwIfInvalid(input);

    var config = getConfiguration(input);
    
    if (!config) {
        console.error("MonkeyScript: Could not create a new project: The provided configuration was neither a string nor an object.");
        process.exit();
    }

    var userScript = compiler.compile(config);

    return () => {
        var stream = new Stream.Transform({objectMode: true});
        stream._transform = function(file, unused, cb) {
            if (file.isNull()) {
                return cb(null, file);
            }
            var prependedBuffer = new Buffer(getInsertString(userScript, file));
            if (file.isStream()) {
                file.contents = new StreamQueue(
                    getStreamFromBuffer(prependedBuffer),
                    file.contents
                );
                return cb(null, file);
            }
            file.contents = Buffer.concat([prependedBuffer, file.contents],
            prependedBuffer.length + file.contents.length);
            cb(null, file);
        };
		
        function getStreamFromBuffer(string) {
            var stream = new Stream.Readable();
            stream._read = function() {
                stream.push(new Buffer(string));
                stream._read = stream.push.bind(stream, null);
            };
            return stream;
        }

        function getInsertString(arg, file) {
            if(typeof arg === 'function') {
                return arg(file);
            } else {
                return arg;
            }
        }

        return stream;
    }
};

function throwIfInvalid(input) {
    if (!input) {
        console.error("MonkeyScript: Could not create a new project: No configuration was given.");
        process.exit();
    }
}

function getConfiguration(input) {
    if (typeof input === "string") {
        var configText = fs.readFileSync(input).toString();
        return JSON.parse(configText);
    } else if (typeof input === "object") {
        return input;
    }
}

module.exports = MonkeyScript;