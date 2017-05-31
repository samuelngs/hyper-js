/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
import * as $protobuf from "protobufjs";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const sync = $root.sync = (() => {

    /**
     * Namespace sync.
     * @exports sync
     * @namespace
     */
    const sync = {};

    sync.Packet = (function() {

        /**
         * Properties of a Packet.
         * @typedef sync.Packet$Properties
         * @type {Object}
         * @property {string} [ID] Packet ID.
         * @property {boolean} [Signature] Packet Signature.
         * @property {number} [Action] Packet Action.
         * @property {string} [Namespace] Packet Namespace.
         * @property {string} [Channel] Packet Channel.
         * @property {string} [Call] Packet Call.
         * @property {Uint8Array} [Message] Packet Message.
         * @property {string} [Error] Packet Error.
         */

        /**
         * Constructs a new Packet.
         * @exports sync.Packet
         * @constructor
         * @param {sync.Packet$Properties=} [properties] Properties to set
         */
        function Packet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Packet ID.
         * @type {string}
         */
        Packet.prototype.ID = "";

        /**
         * Packet Signature.
         * @type {boolean}
         */
        Packet.prototype.Signature = false;

        /**
         * Packet Action.
         * @type {number}
         */
        Packet.prototype.Action = 0;

        /**
         * Packet Namespace.
         * @type {string}
         */
        Packet.prototype.Namespace = "";

        /**
         * Packet Channel.
         * @type {string}
         */
        Packet.prototype.Channel = "";

        /**
         * Packet Call.
         * @type {string}
         */
        Packet.prototype.Call = "";

        /**
         * Packet Message.
         * @type {Uint8Array}
         */
        Packet.prototype.Message = $util.newBuffer([]);

        /**
         * Packet Error.
         * @type {string}
         */
        Packet.prototype.Error = "";

        /**
         * Creates a new Packet instance using the specified properties.
         * @param {sync.Packet$Properties=} [properties] Properties to set
         * @returns {sync.Packet} Packet instance
         */
        Packet.create = function create(properties) {
            return new Packet(properties);
        };

        /**
         * Encodes the specified Packet message. Does not implicitly {@link sync.Packet.verify|verify} messages.
         * @param {sync.Packet$Properties} message Packet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Packet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ID != null && message.hasOwnProperty("ID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ID);
            if (message.Signature != null && message.hasOwnProperty("Signature"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.Signature);
            if (message.Action != null && message.hasOwnProperty("Action"))
                writer.uint32(/* id 20, wireType 0 =*/160).int32(message.Action);
            if (message.Namespace != null && message.hasOwnProperty("Namespace"))
                writer.uint32(/* id 30, wireType 2 =*/242).string(message.Namespace);
            if (message.Channel != null && message.hasOwnProperty("Channel"))
                writer.uint32(/* id 40, wireType 2 =*/322).string(message.Channel);
            if (message.Call != null && message.hasOwnProperty("Call"))
                writer.uint32(/* id 50, wireType 2 =*/402).string(message.Call);
            if (message.Message != null && message.hasOwnProperty("Message"))
                writer.uint32(/* id 60, wireType 2 =*/482).bytes(message.Message);
            if (message.Error != null && message.hasOwnProperty("Error"))
                writer.uint32(/* id 70, wireType 2 =*/562).string(message.Error);
            return writer;
        };

        /**
         * Encodes the specified Packet message, length delimited. Does not implicitly {@link sync.Packet.verify|verify} messages.
         * @param {sync.Packet$Properties} message Packet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Packet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Packet message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.Packet} Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Packet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.Packet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ID = reader.string();
                    break;
                case 10:
                    message.Signature = reader.bool();
                    break;
                case 20:
                    message.Action = reader.int32();
                    break;
                case 30:
                    message.Namespace = reader.string();
                    break;
                case 40:
                    message.Channel = reader.string();
                    break;
                case 50:
                    message.Call = reader.string();
                    break;
                case 60:
                    message.Message = reader.bytes();
                    break;
                case 70:
                    message.Error = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Packet message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {sync.Packet} Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Packet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Packet message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Packet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ID != null && message.hasOwnProperty("ID"))
                if (!$util.isString(message.ID))
                    return "ID: string expected";
            if (message.Signature != null && message.hasOwnProperty("Signature"))
                if (typeof message.Signature !== "boolean")
                    return "Signature: boolean expected";
            if (message.Action != null && message.hasOwnProperty("Action"))
                if (!$util.isInteger(message.Action))
                    return "Action: integer expected";
            if (message.Namespace != null && message.hasOwnProperty("Namespace"))
                if (!$util.isString(message.Namespace))
                    return "Namespace: string expected";
            if (message.Channel != null && message.hasOwnProperty("Channel"))
                if (!$util.isString(message.Channel))
                    return "Channel: string expected";
            if (message.Call != null && message.hasOwnProperty("Call"))
                if (!$util.isString(message.Call))
                    return "Call: string expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!(message.Message && typeof message.Message.length === "number" || $util.isString(message.Message)))
                    return "Message: buffer expected";
            if (message.Error != null && message.hasOwnProperty("Error"))
                if (!$util.isString(message.Error))
                    return "Error: string expected";
            return null;
        };

        /**
         * Creates a Packet message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {sync.Packet} Packet
         */
        Packet.fromObject = function fromObject(object) {
            if (object instanceof $root.sync.Packet)
                return object;
            let message = new $root.sync.Packet();
            if (object.ID != null)
                message.ID = String(object.ID);
            if (object.Signature != null)
                message.Signature = Boolean(object.Signature);
            if (object.Action != null)
                message.Action = object.Action | 0;
            if (object.Namespace != null)
                message.Namespace = String(object.Namespace);
            if (object.Channel != null)
                message.Channel = String(object.Channel);
            if (object.Call != null)
                message.Call = String(object.Call);
            if (object.Message != null)
                if (typeof object.Message === "string")
                    $util.base64.decode(object.Message, message.Message = $util.newBuffer($util.base64.length(object.Message)), 0);
                else if (object.Message.length)
                    message.Message = object.Message;
            if (object.Error != null)
                message.Error = String(object.Error);
            return message;
        };

        /**
         * Creates a Packet message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link sync.Packet.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {sync.Packet} Packet
         */
        Packet.from = Packet.fromObject;

        /**
         * Creates a plain object from a Packet message. Also converts values to other types if specified.
         * @param {sync.Packet} message Packet
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Packet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.ID = "";
                object.Signature = false;
                object.Action = 0;
                object.Namespace = "";
                object.Channel = "";
                object.Call = "";
                object.Message = options.bytes === String ? "" : [];
                object.Error = "";
            }
            if (message.ID != null && message.hasOwnProperty("ID"))
                object.ID = message.ID;
            if (message.Signature != null && message.hasOwnProperty("Signature"))
                object.Signature = message.Signature;
            if (message.Action != null && message.hasOwnProperty("Action"))
                object.Action = message.Action;
            if (message.Namespace != null && message.hasOwnProperty("Namespace"))
                object.Namespace = message.Namespace;
            if (message.Channel != null && message.hasOwnProperty("Channel"))
                object.Channel = message.Channel;
            if (message.Call != null && message.hasOwnProperty("Call"))
                object.Call = message.Call;
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = options.bytes === String ? $util.base64.encode(message.Message, 0, message.Message.length) : options.bytes === Array ? Array.prototype.slice.call(message.Message) : message.Message;
            if (message.Error != null && message.hasOwnProperty("Error"))
                object.Error = message.Error;
            return object;
        };

        /**
         * Creates a plain object from this Packet message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Packet.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Packet to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Packet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Packet;
    })();

    return sync;
})();

export { $root as default };
