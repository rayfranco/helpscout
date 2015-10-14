module.exports = Hooks;

function Hooks(helpscout) {
    this.helpscout = helpscout;
}

function extractHookId(res) {
    return Number(/hooks\/([\d]+).json$/.exec(res.header.location)[1]);
}

Hooks.prototype.create = function(hook, callback) {
    this.helpscout.request({
        method: 'post',
        path: '/hooks.json',
        data: hook,
        returnFullResponse: true,
        callback: function (err, res) {
            if (res && res.body) {
                res.body.webhookId = extractHookId(res);
            }

            callback(err, res && res.body);
        }
    });
};
