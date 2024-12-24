var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/is-observable/index.js
var require_is_observable = __commonJS({
  "node_modules/is-observable/index.js"(exports, module) {
    "use strict";
    module.exports = (value) => {
      if (!value) {
        return false;
      }
      if (typeof Symbol.observable === "symbol" && typeof value[Symbol.observable] === "function") {
        return value === value[Symbol.observable]();
      }
      if (typeof value["@@observable"] === "function") {
        return value === value["@@observable"]();
      }
      return false;
    };
  }
});

// node_modules/threads/dist/serializers.js
var require_serializers = __commonJS({
  "node_modules/threads/dist/serializers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultSerializer = exports.extendSerializer = void 0;
    function extendSerializer(extend, implementation) {
      const fallbackDeserializer = extend.deserialize.bind(extend);
      const fallbackSerializer = extend.serialize.bind(extend);
      return {
        deserialize(message) {
          return implementation.deserialize(message, fallbackDeserializer);
        },
        serialize(input) {
          return implementation.serialize(input, fallbackSerializer);
        }
      };
    }
    exports.extendSerializer = extendSerializer;
    var DefaultErrorSerializer = {
      deserialize(message) {
        return Object.assign(Error(message.message), {
          name: message.name,
          stack: message.stack
        });
      },
      serialize(error) {
        return {
          __error_marker: "$$error",
          message: error.message,
          name: error.name,
          stack: error.stack
        };
      }
    };
    var isSerializedError = (thing) => thing && typeof thing === "object" && "__error_marker" in thing && thing.__error_marker === "$$error";
    exports.DefaultSerializer = {
      deserialize(message) {
        if (isSerializedError(message)) {
          return DefaultErrorSerializer.deserialize(message);
        } else {
          return message;
        }
      },
      serialize(input) {
        if (input instanceof Error) {
          return DefaultErrorSerializer.serialize(input);
        } else {
          return input;
        }
      }
    };
  }
});

// node_modules/threads/dist/common.js
var require_common = __commonJS({
  "node_modules/threads/dist/common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialize = exports.deserialize = exports.registerSerializer = void 0;
    var serializers_1 = require_serializers();
    var registeredSerializer = serializers_1.DefaultSerializer;
    function registerSerializer2(serializer) {
      registeredSerializer = serializers_1.extendSerializer(registeredSerializer, serializer);
    }
    exports.registerSerializer = registerSerializer2;
    function deserialize(message) {
      return registeredSerializer.deserialize(message);
    }
    exports.deserialize = deserialize;
    function serialize(input) {
      return registeredSerializer.serialize(input);
    }
    exports.serialize = serialize;
  }
});

// node_modules/threads/dist/symbols.js
var require_symbols = __commonJS({
  "node_modules/threads/dist/symbols.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$worker = exports.$transferable = exports.$terminate = exports.$events = exports.$errors = void 0;
    exports.$errors = Symbol("thread.errors");
    exports.$events = Symbol("thread.events");
    exports.$terminate = Symbol("thread.terminate");
    exports.$transferable = Symbol("thread.transferable");
    exports.$worker = Symbol("thread.worker");
  }
});

// node_modules/threads/dist/transferable.js
var require_transferable = __commonJS({
  "node_modules/threads/dist/transferable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Transfer = exports.isTransferDescriptor = void 0;
    var symbols_1 = require_symbols();
    function isTransferable(thing) {
      if (!thing || typeof thing !== "object")
        return false;
      return true;
    }
    function isTransferDescriptor(thing) {
      return thing && typeof thing === "object" && thing[symbols_1.$transferable];
    }
    exports.isTransferDescriptor = isTransferDescriptor;
    function Transfer2(payload, transferables) {
      if (!transferables) {
        if (!isTransferable(payload))
          throw Error();
        transferables = [payload];
      }
      return {
        [symbols_1.$transferable]: true,
        send: payload,
        transferables
      };
    }
    exports.Transfer = Transfer2;
  }
});

// node_modules/threads/dist/types/messages.js
var require_messages = __commonJS({
  "node_modules/threads/dist/types/messages.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkerMessageType = exports.MasterMessageType = void 0;
    var MasterMessageType;
    (function(MasterMessageType2) {
      MasterMessageType2["cancel"] = "cancel";
      MasterMessageType2["run"] = "run";
    })(MasterMessageType = exports.MasterMessageType || (exports.MasterMessageType = {}));
    var WorkerMessageType;
    (function(WorkerMessageType2) {
      WorkerMessageType2["error"] = "error";
      WorkerMessageType2["init"] = "init";
      WorkerMessageType2["result"] = "result";
      WorkerMessageType2["running"] = "running";
      WorkerMessageType2["uncaughtError"] = "uncaughtError";
    })(WorkerMessageType = exports.WorkerMessageType || (exports.WorkerMessageType = {}));
  }
});

// node_modules/threads/dist/worker/implementation.browser.js
var require_implementation_browser = __commonJS({
  "node_modules/threads/dist/worker/implementation.browser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isWorkerRuntime = function isWorkerRuntime2() {
      const isWindowContext = typeof self !== "undefined" && typeof Window !== "undefined" && self instanceof Window;
      return typeof self !== "undefined" && self.postMessage && !isWindowContext ? true : false;
    };
    var postMessageToMaster = function postMessageToMaster2(data, transferList) {
      self.postMessage(data, transferList);
    };
    var subscribeToMasterMessages = function subscribeToMasterMessages2(onMessage) {
      const messageHandler = (messageEvent) => {
        onMessage(messageEvent.data);
      };
      const unsubscribe = () => {
        self.removeEventListener("message", messageHandler);
      };
      self.addEventListener("message", messageHandler);
      return unsubscribe;
    };
    exports.default = {
      isWorkerRuntime,
      postMessageToMaster,
      subscribeToMasterMessages
    };
  }
});

// node_modules/threads/dist/worker/index.js
var require_worker = __commonJS({
  "node_modules/threads/dist/worker/index.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.expose = exports.isWorkerRuntime = exports.Transfer = exports.registerSerializer = void 0;
    var is_observable_1 = __importDefault(require_is_observable());
    var common_1 = require_common();
    var transferable_1 = require_transferable();
    var messages_1 = require_messages();
    var implementation_1 = __importDefault(require_implementation_browser());
    var common_2 = require_common();
    Object.defineProperty(exports, "registerSerializer", { enumerable: true, get: function() {
      return common_2.registerSerializer;
    } });
    var transferable_2 = require_transferable();
    Object.defineProperty(exports, "Transfer", { enumerable: true, get: function() {
      return transferable_2.Transfer;
    } });
    exports.isWorkerRuntime = implementation_1.default.isWorkerRuntime;
    var exposeCalled = false;
    var activeSubscriptions = /* @__PURE__ */ new Map();
    var isMasterJobCancelMessage = (thing) => thing && thing.type === messages_1.MasterMessageType.cancel;
    var isMasterJobRunMessage = (thing) => thing && thing.type === messages_1.MasterMessageType.run;
    var isObservable = (thing) => is_observable_1.default(thing) || isZenObservable(thing);
    function isZenObservable(thing) {
      return thing && typeof thing === "object" && typeof thing.subscribe === "function";
    }
    function deconstructTransfer(thing) {
      return transferable_1.isTransferDescriptor(thing) ? { payload: thing.send, transferables: thing.transferables } : { payload: thing, transferables: void 0 };
    }
    function postFunctionInitMessage() {
      const initMessage = {
        type: messages_1.WorkerMessageType.init,
        exposed: {
          type: "function"
        }
      };
      implementation_1.default.postMessageToMaster(initMessage);
    }
    function postModuleInitMessage(methodNames) {
      const initMessage = {
        type: messages_1.WorkerMessageType.init,
        exposed: {
          type: "module",
          methods: methodNames
        }
      };
      implementation_1.default.postMessageToMaster(initMessage);
    }
    function postJobErrorMessage(uid, rawError) {
      const { payload: error, transferables } = deconstructTransfer(rawError);
      const errorMessage = {
        type: messages_1.WorkerMessageType.error,
        uid,
        error: common_1.serialize(error)
      };
      implementation_1.default.postMessageToMaster(errorMessage, transferables);
    }
    function postJobResultMessage(uid, completed, resultValue) {
      const { payload, transferables } = deconstructTransfer(resultValue);
      const resultMessage = {
        type: messages_1.WorkerMessageType.result,
        uid,
        complete: completed ? true : void 0,
        payload
      };
      implementation_1.default.postMessageToMaster(resultMessage, transferables);
    }
    function postJobStartMessage(uid, resultType) {
      const startMessage = {
        type: messages_1.WorkerMessageType.running,
        uid,
        resultType
      };
      implementation_1.default.postMessageToMaster(startMessage);
    }
    function postUncaughtErrorMessage(error) {
      try {
        const errorMessage = {
          type: messages_1.WorkerMessageType.uncaughtError,
          error: common_1.serialize(error)
        };
        implementation_1.default.postMessageToMaster(errorMessage);
      } catch (subError) {
        console.error("Not reporting uncaught error back to master thread as it occured while reporting an uncaught error already.\nLatest error:", subError, "\nOriginal error:", error);
      }
    }
    function runFunction(jobUID, fn, args) {
      return __awaiter(this, void 0, void 0, function* () {
        let syncResult;
        try {
          syncResult = fn(...args);
        } catch (error) {
          return postJobErrorMessage(jobUID, error);
        }
        const resultType = isObservable(syncResult) ? "observable" : "promise";
        postJobStartMessage(jobUID, resultType);
        if (isObservable(syncResult)) {
          const subscription = syncResult.subscribe((value) => postJobResultMessage(jobUID, false, common_1.serialize(value)), (error) => {
            postJobErrorMessage(jobUID, common_1.serialize(error));
            activeSubscriptions.delete(jobUID);
          }, () => {
            postJobResultMessage(jobUID, true);
            activeSubscriptions.delete(jobUID);
          });
          activeSubscriptions.set(jobUID, subscription);
        } else {
          try {
            const result = yield syncResult;
            postJobResultMessage(jobUID, true, common_1.serialize(result));
          } catch (error) {
            postJobErrorMessage(jobUID, common_1.serialize(error));
          }
        }
      });
    }
    function expose2(exposed) {
      if (!implementation_1.default.isWorkerRuntime()) {
        throw Error("expose() called in the master thread.");
      }
      if (exposeCalled) {
        throw Error("expose() called more than once. This is not possible. Pass an object to expose() if you want to expose multiple functions.");
      }
      exposeCalled = true;
      if (typeof exposed === "function") {
        implementation_1.default.subscribeToMasterMessages((messageData) => {
          if (isMasterJobRunMessage(messageData) && !messageData.method) {
            runFunction(messageData.uid, exposed, messageData.args.map(common_1.deserialize));
          }
        });
        postFunctionInitMessage();
      } else if (typeof exposed === "object" && exposed) {
        implementation_1.default.subscribeToMasterMessages((messageData) => {
          if (isMasterJobRunMessage(messageData) && messageData.method) {
            runFunction(messageData.uid, exposed[messageData.method], messageData.args.map(common_1.deserialize));
          }
        });
        const methodNames = Object.keys(exposed).filter((key) => typeof exposed[key] === "function");
        postModuleInitMessage(methodNames);
      } else {
        throw Error(`Invalid argument passed to expose(). Expected a function or an object, got: ${exposed}`);
      }
      implementation_1.default.subscribeToMasterMessages((messageData) => {
        if (isMasterJobCancelMessage(messageData)) {
          const jobUID = messageData.uid;
          const subscription = activeSubscriptions.get(jobUID);
          if (subscription) {
            subscription.unsubscribe();
            activeSubscriptions.delete(jobUID);
          }
        }
      });
    }
    exports.expose = expose2;
    if (typeof self !== "undefined" && typeof self.addEventListener === "function" && implementation_1.default.isWorkerRuntime()) {
      self.addEventListener("error", (event) => {
        setTimeout(() => postUncaughtErrorMessage(event.error || event), 250);
      });
      self.addEventListener("unhandledrejection", (event) => {
        const error = event.reason;
        if (error && typeof error.message === "string") {
          setTimeout(() => postUncaughtErrorMessage(error), 250);
        }
      });
    }
    if (typeof process !== "undefined" && typeof process.on === "function" && implementation_1.default.isWorkerRuntime()) {
      process.on("uncaughtException", (error) => {
        setTimeout(() => postUncaughtErrorMessage(error), 250);
      });
      process.on("unhandledRejection", (error) => {
        if (error && typeof error.message === "string") {
          setTimeout(() => postUncaughtErrorMessage(error), 250);
        }
      });
    }
  }
});

// node_modules/threads/worker.mjs
var import_worker = __toESM(require_worker(), 1);
var expose = import_worker.default.expose;
var registerSerializer = import_worker.default.registerSerializer;
var Transfer = import_worker.default.Transfer;

// node_modules/@math.gl/polygon/dist/polygon-utils.js
var DimIndex = {
  x: 0,
  y: 1,
  z: 2
};
function getPolygonSignedArea(points, options = {}) {
  const { start = 0, end = points.length, plane = "xy" } = options;
  const dim = options.size || 2;
  let area2 = 0;
  const i0 = DimIndex[plane[0]];
  const i1 = DimIndex[plane[1]];
  for (let i = start, j = end - dim; i < end; i += dim) {
    area2 += (points[i + i0] - points[j + i0]) * (points[i + i1] + points[j + i1]);
    j = i;
  }
  return area2 / 2;
}

// node_modules/@math.gl/polygon/dist/earcut.js
function earcut(positions, holeIndices, dim = 2, areas, plane = "xy") {
  const hasHoles = holeIndices && holeIndices.length;
  const outerLen = hasHoles ? holeIndices[0] * dim : positions.length;
  let outerNode = linkedList(positions, 0, outerLen, dim, true, areas && areas[0], plane);
  const triangles = [];
  if (!outerNode || outerNode.next === outerNode.prev)
    return triangles;
  let invSize;
  let maxX;
  let maxY;
  let minX;
  let minY;
  let x;
  let y;
  if (hasHoles)
    outerNode = eliminateHoles(positions, holeIndices, outerNode, dim, areas, plane);
  if (positions.length > 80 * dim) {
    minX = maxX = positions[0];
    minY = maxY = positions[1];
    for (let i = dim; i < outerLen; i += dim) {
      x = positions[i];
      y = positions[i + 1];
      if (x < minX)
        minX = x;
      if (y < minY)
        minY = y;
      if (x > maxX)
        maxX = x;
      if (y > maxY)
        maxY = y;
    }
    invSize = Math.max(maxX - minX, maxY - minY);
    invSize = invSize !== 0 ? 32767 / invSize : 0;
  }
  earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);
  return triangles;
}
function linkedList(data, start, end, dim, clockwise, area2, plane) {
  let i;
  let last;
  if (area2 === void 0) {
    area2 = getPolygonSignedArea(data, { start, end, size: dim, plane });
  }
  let i0 = DimIndex[plane[0]];
  let i1 = DimIndex[plane[1]];
  if (clockwise === area2 < 0) {
    for (i = start; i < end; i += dim)
      last = insertNode(i, data[i + i0], data[i + i1], last);
  } else {
    for (i = end - dim; i >= start; i -= dim)
      last = insertNode(i, data[i + i0], data[i + i1], last);
  }
  if (last && equals(last, last.next)) {
    removeNode(last);
    last = last.next;
  }
  return last;
}
function filterPoints(start, end) {
  if (!start)
    return start;
  if (!end)
    end = start;
  let p = start;
  let again;
  do {
    again = false;
    if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
      removeNode(p);
      p = end = p.prev;
      if (p === p.next)
        break;
      again = true;
    } else {
      p = p.next;
    }
  } while (again || p !== end);
  return end;
}
function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
  if (!ear)
    return;
  if (!pass && invSize)
    indexCurve(ear, minX, minY, invSize);
  let stop = ear;
  let prev;
  let next;
  while (ear.prev !== ear.next) {
    prev = ear.prev;
    next = ear.next;
    if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
      triangles.push(prev.i / dim | 0);
      triangles.push(ear.i / dim | 0);
      triangles.push(next.i / dim | 0);
      removeNode(ear);
      ear = next.next;
      stop = next.next;
      continue;
    }
    ear = next;
    if (ear === stop) {
      if (!pass) {
        earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);
      } else if (pass === 1) {
        ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
        earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);
      } else if (pass === 2) {
        splitEarcut(ear, triangles, dim, minX, minY, invSize);
      }
      break;
    }
  }
}
function isEar(ear) {
  const a = ear.prev;
  const b = ear;
  const c = ear.next;
  if (area(a, b, c) >= 0)
    return false;
  const ax = a.x;
  const bx = b.x;
  const cx = c.x;
  const ay = a.y;
  const by = b.y;
  const cy = c.y;
  const x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx;
  const y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy;
  const x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx;
  const y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
  let p = c.next;
  while (p !== a) {
    if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
      return false;
    p = p.next;
  }
  return true;
}
function isEarHashed(ear, minX, minY, invSize) {
  const a = ear.prev;
  const b = ear;
  const c = ear.next;
  if (area(a, b, c) >= 0)
    return false;
  const ax = a.x;
  const bx = b.x;
  const cx = c.x;
  const ay = a.y;
  const by = b.y;
  const cy = c.y;
  const x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx;
  const y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy;
  const x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx;
  const y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
  const minZ = zOrder(x0, y0, minX, minY, invSize);
  const maxZ = zOrder(x1, y1, minX, minY, invSize);
  let p = ear.prevZ;
  let n = ear.nextZ;
  while (p && p.z >= minZ && n && n.z <= maxZ) {
    if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
      return false;
    p = p.prevZ;
    if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0)
      return false;
    n = n.nextZ;
  }
  while (p && p.z >= minZ) {
    if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
      return false;
    p = p.prevZ;
  }
  while (n && n.z <= maxZ) {
    if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0)
      return false;
    n = n.nextZ;
  }
  return true;
}
function cureLocalIntersections(start, triangles, dim) {
  let p = start;
  do {
    const a = p.prev;
    const b = p.next.next;
    if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
      triangles.push(a.i / dim | 0);
      triangles.push(p.i / dim | 0);
      triangles.push(b.i / dim | 0);
      removeNode(p);
      removeNode(p.next);
      p = start = b;
    }
    p = p.next;
  } while (p !== start);
  return filterPoints(p);
}
function splitEarcut(start, triangles, dim, minX, minY, invSize) {
  let a = start;
  do {
    let b = a.next.next;
    while (b !== a.prev) {
      if (a.i !== b.i && isValidDiagonal(a, b)) {
        let c = splitPolygon(a, b);
        a = filterPoints(a, a.next);
        c = filterPoints(c, c.next);
        earcutLinked(a, triangles, dim, minX, minY, invSize, 0);
        earcutLinked(c, triangles, dim, minX, minY, invSize, 0);
        return;
      }
      b = b.next;
    }
    a = a.next;
  } while (a !== start);
}
function eliminateHoles(data, holeIndices, outerNode, dim, areas, plane) {
  const queue = [];
  let i;
  let len;
  let start;
  let end;
  let list;
  for (i = 0, len = holeIndices.length; i < len; i++) {
    start = holeIndices[i] * dim;
    end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
    list = linkedList(data, start, end, dim, false, areas && areas[i + 1], plane);
    if (list === list.next)
      list.steiner = true;
    queue.push(getLeftmost(list));
  }
  queue.sort(compareX);
  for (i = 0; i < queue.length; i++) {
    outerNode = eliminateHole(queue[i], outerNode);
  }
  return outerNode;
}
function compareX(a, b) {
  return a.x - b.x;
}
function eliminateHole(hole, outerNode) {
  const bridge = findHoleBridge(hole, outerNode);
  if (!bridge) {
    return outerNode;
  }
  const bridgeReverse = splitPolygon(bridge, hole);
  filterPoints(bridgeReverse, bridgeReverse.next);
  return filterPoints(bridge, bridge.next);
}
function findHoleBridge(hole, outerNode) {
  let p = outerNode;
  const hx = hole.x;
  const hy = hole.y;
  let qx = -Infinity;
  let m;
  do {
    if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
      const x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
      if (x <= hx && x > qx) {
        qx = x;
        m = p.x < p.next.x ? p : p.next;
        if (x === hx)
          return m;
      }
    }
    p = p.next;
  } while (p !== outerNode);
  if (!m)
    return null;
  const stop = m;
  const mx = m.x;
  const my = m.y;
  let tanMin = Infinity;
  let tan;
  p = m;
  do {
    if (hx >= p.x && p.x >= mx && hx !== p.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
      tan = Math.abs(hy - p.y) / (hx - p.x);
      if (locallyInside(p, hole) && (tan < tanMin || tan === tanMin && (p.x > m.x || p.x === m.x && sectorContainsSector(m, p)))) {
        m = p;
        tanMin = tan;
      }
    }
    p = p.next;
  } while (p !== stop);
  return m;
}
function sectorContainsSector(m, p) {
  return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
}
function indexCurve(start, minX, minY, invSize) {
  let p = start;
  do {
    if (p.z === 0)
      p.z = zOrder(p.x, p.y, minX, minY, invSize);
    p.prevZ = p.prev;
    p.nextZ = p.next;
    p = p.next;
  } while (p !== start);
  p.prevZ.nextZ = null;
  p.prevZ = null;
  sortLinked(p);
}
function sortLinked(list) {
  let e;
  let i;
  let inSize = 1;
  let numMerges;
  let p;
  let pSize;
  let q;
  let qSize;
  let tail;
  do {
    p = list;
    list = null;
    tail = null;
    numMerges = 0;
    while (p) {
      numMerges++;
      q = p;
      pSize = 0;
      for (i = 0; i < inSize; i++) {
        pSize++;
        q = q.nextZ;
        if (!q)
          break;
      }
      qSize = inSize;
      while (pSize > 0 || qSize > 0 && q) {
        if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
          e = p;
          p = p.nextZ;
          pSize--;
        } else {
          e = q;
          q = q.nextZ;
          qSize--;
        }
        if (tail)
          tail.nextZ = e;
        else
          list = e;
        e.prevZ = tail;
        tail = e;
      }
      p = q;
    }
    tail.nextZ = null;
    inSize *= 2;
  } while (numMerges > 1);
  return list;
}
function zOrder(x, y, minX, minY, invSize) {
  x = (x - minX) * invSize | 0;
  y = (y - minY) * invSize | 0;
  x = (x | x << 8) & 16711935;
  x = (x | x << 4) & 252645135;
  x = (x | x << 2) & 858993459;
  x = (x | x << 1) & 1431655765;
  y = (y | y << 8) & 16711935;
  y = (y | y << 4) & 252645135;
  y = (y | y << 2) & 858993459;
  y = (y | y << 1) & 1431655765;
  return x | y << 1;
}
function getLeftmost(start) {
  let p = start;
  let leftmost = start;
  do {
    if (p.x < leftmost.x || p.x === leftmost.x && p.y < leftmost.y)
      leftmost = p;
    p = p.next;
  } while (p !== start);
  return leftmost;
}
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
  return (cx - px) * (ay - py) >= (ax - px) * (cy - py) && (ax - px) * (by - py) >= (bx - px) * (ay - py) && (bx - px) * (cy - py) >= (cx - px) * (by - py);
}
function isValidDiagonal(a, b) {
  return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && // dones't intersect other edges
  (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && // locally visible
  (area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
  equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0);
}
function area(p, q, r) {
  return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}
function equals(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}
function intersects(p1, q1, p2, q2) {
  const o1 = sign(area(p1, q1, p2));
  const o2 = sign(area(p1, q1, q2));
  const o3 = sign(area(p2, q2, p1));
  const o4 = sign(area(p2, q2, q1));
  if (o1 !== o2 && o3 !== o4)
    return true;
  if (o1 === 0 && onSegment(p1, p2, q1))
    return true;
  if (o2 === 0 && onSegment(p1, q2, q1))
    return true;
  if (o3 === 0 && onSegment(p2, p1, q2))
    return true;
  if (o4 === 0 && onSegment(p2, q1, q2))
    return true;
  return false;
}
function onSegment(p, q, r) {
  return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}
function sign(num) {
  return num > 0 ? 1 : num < 0 ? -1 : 0;
}
function intersectsPolygon(a, b) {
  let p = a;
  do {
    if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b))
      return true;
    p = p.next;
  } while (p !== a);
  return false;
}
function locallyInside(a, b) {
  return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}
function middleInside(a, b) {
  let p = a;
  let inside = false;
  const px = (a.x + b.x) / 2;
  const py = (a.y + b.y) / 2;
  do {
    if (p.y > py !== p.next.y > py && p.next.y !== p.y && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x)
      inside = !inside;
    p = p.next;
  } while (p !== a);
  return inside;
}
function splitPolygon(a, b) {
  const a2 = new Vertex(a.i, a.x, a.y);
  const b2 = new Vertex(b.i, b.x, b.y);
  const an = a.next;
  const bp = b.prev;
  a.next = b;
  b.prev = a;
  a2.next = an;
  an.prev = a2;
  b2.next = a2;
  a2.prev = b2;
  bp.next = b2;
  b2.prev = bp;
  return b2;
}
function insertNode(i, x, y, last) {
  const p = new Vertex(i, x, y);
  if (!last) {
    p.prev = p;
    p.next = p;
  } else {
    p.next = last.next;
    p.prev = last;
    last.next.prev = p;
    last.next = p;
  }
  return p;
}
function removeNode(p) {
  p.next.prev = p.prev;
  p.prev.next = p.next;
  if (p.prevZ)
    p.prevZ.nextZ = p.nextZ;
  if (p.nextZ)
    p.nextZ.prevZ = p.prevZ;
}
var Vertex = class {
  constructor(i, x, y) {
    this.prev = null;
    this.next = null;
    this.z = 0;
    this.prevZ = null;
    this.nextZ = null;
    this.steiner = false;
    this.i = i;
    this.x = x;
    this.y = y;
  }
};

// src/child.ts
function getPointChild(input) {
  if ("data" in input) {
    return input.getChildAt(0);
  }
  return input.children[0];
}
function getLineStringChild(input) {
  if ("data" in input) {
    return input.getChildAt(0);
  }
  return input.children[0];
}
function getPolygonChild(input) {
  if ("data" in input) {
    return input.getChildAt(0);
  }
  return input.children[0];
}

// src/algorithm/earcut.ts
function earcut2(input) {
  if ("data" in input) {
    return input.data.map((data) => earcut2(data));
  }
  const trianglesResults = [];
  let outputSize = 0;
  for (let geomIndex = 0; geomIndex < input.length; geomIndex++) {
    const triangles = earcutSinglePolygon(input, geomIndex);
    trianglesResults.push(triangles);
    outputSize += triangles.length;
  }
  const outputArray = new Uint32Array(outputSize);
  let idx = 0;
  for (const triangles of trianglesResults) {
    for (const value of triangles) {
      outputArray[idx] = value;
      idx += 1;
    }
  }
  return outputArray;
}
function earcutSinglePolygon(data, geomIndex) {
  const geomOffsets = data.valueOffsets;
  const rings = getPolygonChild(data);
  const ringOffsets = rings.valueOffsets;
  const coords = getLineStringChild(rings);
  const dim = coords.type.listSize;
  const flatCoords = getPointChild(coords);
  const ringBegin = geomOffsets[geomIndex];
  const ringEnd = geomOffsets[geomIndex + 1];
  const coordsBegin = ringOffsets[ringBegin];
  const coordsEnd = ringOffsets[ringEnd];
  const slicedFlatCoords = flatCoords.values.subarray(
    coordsBegin * dim,
    coordsEnd * dim
  );
  const initialCoordIndex = ringOffsets[ringBegin];
  const holeIndices = [];
  for (let holeRingIdx = ringBegin + 1; holeRingIdx < ringEnd; holeRingIdx++) {
    holeIndices.push(ringOffsets[holeRingIdx] - initialCoordIndex);
  }
  const triangles = earcut(slicedFlatCoords, holeIndices, dim);
  for (let i = 0; i < triangles.length; i++) {
    triangles[i] += initialCoordIndex;
  }
  return triangles;
}

// src/worker-bundle/earcut.ts
function earcutWorker(polygonData) {
  const earcutTriangles = earcut2(polygonData);
  return Transfer(earcutTriangles, [earcutTriangles.buffer]);
}
expose(earcutWorker);
