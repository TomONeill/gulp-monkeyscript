"use-strict";

function Compiler(config) {}

Compiler.compile = function(config) {
    var userScript = "// ==UserScript==\n";

    if (config.name) {
        userScript += "// @name\t\t\t" + config.name + "\n";
    }

    if (config.namespace) {
        userScript += "// @namespace\t\t" + config.namespace + "\n";
    }

    if (config.version) {
        userScript += "// @version\t\t\t" + config.version + "\n";
    }

    if (config.author) {
        userScript += "// @author\t\t\t" + config.author + "\n";
    }

    if (config.description) {
        userScript += "// @description\t\t" + config.description + "\n";
    }

    if (config.homepage) {
        userScript += "// @homepage\t\t" + config.homepage + "\n";
    }

    if (config.homepageUrl) {
        userScript += "// @homepageURL\t\t" + config.homepageUrl + "\n";
    }

    if (config.website) {
        userScript += "// @website\t\t\t" + config.website + "\n";
    }

    if (config.source) {
        userScript += "// @source\t\t\t" + config.source + "\n";
    }

    if (config.icon) {
        userScript += "// @icon\t\t\t" + config.icon + "\n";
    }

    if (config.iconUrl) {
        userScript += "// @iconURL\t\t\t" + config.iconUrl + "\n";
    }

    if (config.defaultIcon) {
        userScript += "// @defaulticon\t\t" + config.defaultIcon + "\n";
    }

    if (config.icon64) {
        userScript += "// @icon64\t\t\t" + config.icon64 + "\n";
    }

    if (config.icon64Url) {
        userScript += "// @icon64URL\t\t" + config.icon64Url + "\n";
    }

    if (config.updateUrl) {
        if (!config.version) {
            console.warn("MonkeyScript: WARNING: version was not present but it is required for updateUrl to work.");
        }

        userScript += "// @updateURL\t\t" + config.updateUrl + "\n";
    }
    
    if (config.downloadUrl) {
        userScript += "// @downloadURL\t\t" + config.downloadUrl + "\n";
    }
    
    if (config.supportUrl) {
        userScript += "// @supportURL\t\t" + config.supportUrl + "\n";
    }
    
    if (config.include) {
        if (typeof config.include === "string") {
            console.error("MonkeyScript: Include expected an array, but got string.");
        }

        var hasStringIncludesSupport = typeof String.prototype.includes !== 'undefined'
        
        config.include.forEach(function(includeItem) {
            var logError = function() {
                console.error("MonkeyScript: Include contains a URL with a hash parameter which is not supported.");
                process.exit();
            };

            if (hasStringIncludesSupport) {
                if (includeItem.includes("#")) {
                    logError();
                }
            } else {
                if (includeItem.indexOf("#") > -1) {
                    logError();
                }
            }

            userScript += "// @include\t\t\t" + includeItem + "\n";
        });
    }

    if (config.match) {
        if (typeof config.match === "string") {
            console.error("MonkeyScript: Match expected an array, but got string.");
            process.exit();
        }

        config.match.forEach(function(matchItem) {
            userScript += "// @match\t\t\t" + matchItem + "\n";
        });
    }

    if (config.exclude) {
        if (typeof config.exclude === "string") {
            console.error("MonkeyScript: Exclude expected an array, but got string.");
            process.exit();
        }

        config.exclude.forEach(function(excludeItem) {
            userScript += "// @exclude\t\t\t" + excludeItem + "\n";
        });
    }

    if (config.require) {
        if (typeof config.require === "string") {
            console.error("MonkeyScript: Require expected an array, but got string.");
            process.exit();
        }

        if (config.useStrict) {
            console.warn("MonkeyScript: WARNING: useStrict might influence the @require scripts.");
        }

        config.require.forEach(function(requireItem) {
            userScript += "// @require\t\t\t" + requireItem + "\n";
        });
    }

    if (config.resource) {
        if (typeof config.resource === "string") {
            console.error("MonkeyScript: Resource expected an array, but got string.");
            process.exit();
        }

        config.resource.forEach(function(resourceItem) {
            if (typeof resourceItem !== "object") {
                console.error("MonkeyScript: A resource should be of type array containing objects with key/value pairs.");
                process.exit();
            }

            var key = Object.keys(resourceItem)[0];
            var value = resourceItem[key];
            
            userScript += "// @resource\t\t" + key + " " + value + "\n";
        });
    }

    if (config.connect) {
        if (typeof config.connect === "string") {
            console.error("MonkeyScript: Connect expected an array, but got string.");
            process.exit();
        }

        config.connect.forEach(function(connectItem) {
            userScript += "// @connect\t\t\t" + connectItem + "\n";
        });
    }

    if (config.domain) {
        if (typeof config.domain === "string") {
            console.error("MonkeyScript: Domain expected an array, but got string.");
            process.exit();
        }

        config.domain.forEach(function(domainItem) {
            userScript += "// @domain\t\t\t" + domainItem + "\n";
        });
    }

    if (config.runAt) {
        userScript += "// @run-at\t\t\t" + config.runAt + "\n";
    }

    if (config.grant) {
        if (typeof config.grant === "string") {
            console.error("MonkeyScript: Grant expected an array, but got string.");
            process.exit();
        }

        config.grant.forEach(function(grantItem) {
            userScript += "// @grant\t\t\t" + grantItem + "\n";
        });
    }

    if (config.noFrames) {
        userScript += "// @noframes\n";
    }

    if (config.unwrap) {
        userScript += "// @unwrap\n";
    }

    if (config.noCompat) {
        userScript += "// @nocompat\t\t" + config.noCompat + "\n";
    }

    if (config.copyright) {
        userScript += "// @copyright\t\t" + config.copyright + "\n";
    }

    userScript += "// ==/UserScript==\n";

    if (config.useStrict) {
        userScript += "'use strict';\n";
    }
    
    return userScript += "\n";
}

module.exports = Compiler;