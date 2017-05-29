var redis = require("redis"),
    client = redis.createClient({
        host: '127.0.0.1',
        port: '6379'
    });

client.on("error", function(err) {
    console.log("Error " + err);
});
module.exports = client;
// module.exports = {
//     sadd: function(key, value) {
//         client.sadd(key, value);
//     },
//     hmset: function(key, jsonObj) {
//         client.hmset(key, jsonObj, function(err, res) {
//             console.log("hmset: " + res);
//         });
//     },
//     hgetall: function(key) {
//         client.hgetall(key, function(err, res) {
//             console.log(key + " hgetall: " + res);
//             return res;
//         });
//     },
//     zadd: function(key, weight, value) {
//         console.log("zadd:" + key + " " + weight + " " + value);
//         client.zadd(key, weight, value, function(err, replies) {
//             if (replies) {
//                 console.log("============== replies:" + replies);
//                 replies.forEach(function(reply, i) {
//                     console.log("    " + i + ": " + reply);
//                 });
//             }
//             client.quit();
//         });
//     },
//     zrange: function(key) {
//         return client.zrange(key, 0, -1);
//     }
// };