/*!
 * keyboard-link 0.2.2 (https://github.com/zhaitianye/keyboard-link)
 * API https://github.com/zhaitianye/keyboard-link/blob/master/doc/api.md
 * Copyright 2024-2024 zhaitianye. All Rights Reserved
 * Licensed under MIT (https://github.com/zhaitianye/keyboard-link/blob/master/LICENSE)
 */

'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var WebSocketBase = (function () {
    function WebSocketBase(_a) {
        var host = _a.host, port = _a.port;
        var _this = this;
        this.content = function () {
            if (_this.isConnect) {
                return;
            }
            _this.ws = new WebSocket(_this.url);
            _this.ws.onopen = function () {
                console.log("keyboard-link is connect");
                _this.isConnect = true;
            };
            _this.ws.onmessage = function (data) {
                _this.receive(JSON.parse(data.data));
            };
            _this.ws.onerror = function () {
                _this.isConnect = false;
            };
            _this.ws.onclose = function () {
                _this.isConnect = false;
                _this.content();
            };
        };
        this.send = function (params) {
            if (!_this.ws || !_this.isConnect) {
                return { success: false, msg: "ws not connect", data: null };
            }
            var id = _this.utilsGenerateId();
            var sendData = JSON.stringify({
                id: id,
                method: params.method,
                data: params.data,
            });
            _this.ws.send(sendData);
            return { success: true, msg: null, data: null };
        };
        this.sendReceive = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var id, sendData;
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.ws || !this.isConnect) {
                    return [2, { success: false, msg: "ws not connect", data: null }];
                }
                id = this.utilsGenerateId();
                sendData = JSON.stringify({
                    id: id,
                    method: params.method,
                    data: params.data,
                });
                this.ws.send(sendData);
                return [2, new Promise(function (resolve) {
                        _this.messageCallbacks[id] = resolve;
                    })];
            });
        }); };
        this.receive = function (data) {
            var id = data.id, callMethod = data.callMethod, payload = data.payload;
            if (id && _this.messageCallbacks[id]) {
                _this.messageCallbacks[id]({ success: true, msg: "OK", data: payload });
                delete _this.messageCallbacks[id];
            }
            if (!id && callMethod && _this[callMethod]) {
                _this[callMethod](data.payload);
            }
        };
        this.utilsGenerateId = function () {
            var timestamp = Date.now().toString();
            var random = Math.random().toString(36).substring(2);
            var id = timestamp + "-" + random;
            return id;
        };
        this.ws = null;
        this.isConnect = false;
        this.url = host + ":" + port;
        this.messageCallbacks = new Map();
        this.content();
    }
    return WebSocketBase;
}());

var WebSocketHandler = (function (_super) {
    __extends(WebSocketHandler, _super);
    function WebSocketHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sendActiveInputValue = function (value) {
            _this.send({
                method: "activeInputValue",
                data: value,
            });
        };
        _this.testSend = function (_a) {
            var method = _a.method, data = _a.data;
            _this.send({
                method: method,
                data: data,
            });
        };
        _this.testSendReceive = function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.sendReceive({
                            method: "test",
                            data: data,
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        }); };
        _this.handleTest = function (data) {
            console.log("服务端调用测试自定义方法", data);
        };
        return _this;
    }
    return WebSocketHandler;
}(WebSocketBase));

var KeyboardLink = (function () {
    function KeyboardLink(_a) {
        var host = _a.host, port = _a.port, _b = _a.useTimer, useTimer = _b === void 0 ? false : _b;
        var _this = this;
        this.init = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                document.addEventListener("focusin", this.focusInChange);
                document.addEventListener("focusout", this.focusOutChange);
                return [2];
            });
        }); };
        this.inputChange = function (event) {
            if (!_this.ws ||
                !_this.nowElement ||
                !(_this.nowElement instanceof HTMLInputElement || _this.nowElement instanceof HTMLTextAreaElement)) {
                _this.handleClearTimer();
                return;
            }
            if (event.target.value !== _this.timerCache) {
                _this.timerCache = event.target.value;
                _this.ws.sendActiveInputValue(event.target.value || "");
                return;
            }
        };
        this.sendTimerValue = function () {
            if (!_this.ws ||
                !_this.nowElement ||
                !(_this.nowElement instanceof HTMLInputElement || _this.nowElement instanceof HTMLTextAreaElement)) {
                _this.handleClearTimer();
                return;
            }
            if (_this.nowElement.value !== _this.timerCache) {
                _this.timerCache = _this.nowElement.value;
                _this.ws.sendActiveInputValue(_this.nowElement.value || "");
                return;
            }
        };
        this.handleClearTimer = function () {
            if (_this.timer) {
                clearInterval(_this.timer);
                _this.timer = null;
                _this.timerCache = null;
            }
        };
        this.focusInChange = function () { return __awaiter(_this, void 0, void 0, function () {
            var focusedElement;
            return __generator(this, function (_a) {
                focusedElement = document.activeElement;
                if (this.ws) {
                    this.ws.sendActiveInputValue(focusedElement.value || "");
                }
                this.nowElement = focusedElement;
                this.nowElement.addEventListener("input", this.inputChange);
                if (this.useTimer) {
                    this.handleClearTimer();
                    this.timer = setInterval(this.sendTimerValue, 200);
                }
                return [2];
            });
        }); };
        this.focusOutChange = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.handleClearTimer();
                if (this.nowElement) {
                    this.nowElement.removeEventListener("input", this.inputChange);
                }
                return [2];
            });
        }); };
        if (!host || !port) {
            throw new Error("host or port is null");
        }
        this.host = host;
        this.port = port;
        this.ws = new WebSocketHandler({
            host: this.host,
            port: this.port,
        });
        this.useTimer = useTimer;
        this.timer = null;
        this.timerCache = null;
        this.init();
    }
    return KeyboardLink;
}());

module.exports = KeyboardLink;
