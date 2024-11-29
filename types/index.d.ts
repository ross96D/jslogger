/**
 * @typedef {import('winston').Logger} WinstonLogger
 * @typedef { { [key: string]: string | number | boolean | JsonObject | JsonObject[] } } JsonObject
 * @export @typedef { 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH' } Method
 * @export @typedef { {message: string, extra?: JsonObject, error?: any} } Message
 * @export @typedef { Message & { method: Method, ad: number, client_ip: string, path: string, response_size: number, elapsed?: number, type: 'request' } } RequestResponse
 */
export class Logger {
    /**
     * Small wrapper arround winston logger for consistency across projects
     *
     * @param {WinstonLogger} logger
     */
    constructor(logger: WinstonLogger);
    logger: import("winston").Logger;
    /**
     *
     * @overload
     * Log with trace level.
     * - NOTE: If this is run in dev mode only the message is printed to the console.
     *
     * Examples of the calling function:
     * ```ts
     * logger.trace({message: "hello world"})
     * // json output:
     * // {
     * //   level: "trace",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world"
     * // }
     * logger.trace({message: "hello world", extra: {"key": "value", "key1": "value"}})
     * // json output:
     * // {
     * //   level: "trace",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "key": "value",
     * //   "key1": "value"
     * // }
     *
     * logger.trace({message: "hello world", error: err})
     * // json output:
     * // {
     * //   level: "trace",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "error": "<err transformed to string>"
     * // }
     * ```
     * @param { Message } obj
     * @return { void }
     */
    trace(obj: Message): void;
    /**
     *
     * @overload
     * Log with info level.
     * - NOTE: If this is run in dev mode only the message is printed to the console.
     *
     * Examples of the calling function:
     * ```ts
     * let request_log_obj: LogRequestResponse = {...}
     * logger.trace(request_log_obj)
     * // json output:
     * // {
     * //   level: "trace",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "method": "GET",
     * //   "status": 200,
     * //   ...
     * // }
     * ```
     * @param { RequestResponse } obj
     * @return { void }
     */
    trace(obj: RequestResponse): void;
    /**
     *
     * @overload
     * Log with info level.
     * - NOTE: If this is run in dev mode only the message is printed to the console.
     *
     * Examples of the calling function:
     * ```ts
     * logger.debug({message: "hello world"})
     * // json output:
     * // {
     * //   level: "debug",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world"
     * // }
     * logger.debug({message: "hello world", extra: {"key": "value", "key1": "value"}})
     * // json output:
     * // {
     * //   level: "debug",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "key": "value",
     * //   "key1": "value"
     * // }
     *
     * logger.debug({message: "hello world", error: err})
     * // json output:
     * // {
     * //   level: "debug",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "error": "<err transformed to string>"
     * // }
     * ```
     * @param { Message } obj
     * @return { void }
     */
    debug(obj: Message): void;
    /**
     *
     * @overload
     * Log with info level.
     * - NOTE: If this is run in dev mode only the message is printed to the console.
     *
     * Examples of the calling function:
     * ```ts
     * let request_log_obj: LogRequestResponse = {...}
     * logger.debug(request_log_obj)
     * // json output:
     * // {
     * //   level: "debug",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "method": "GET",
     * //   "status": 200,
     * //   ...
     * // }
     * ```
     * @param { RequestResponse } obj
     * @return { void }
     */
    debug(obj: RequestResponse): void;
    /**
     *
     * @overload
     * Log with info level.
     * - NOTE: If this is run in dev mode only the message is printed to the console.
     *
     * Examples of the calling function:
     * ```ts
     * logger.info({message: "hello world"})
     * // json output:
     * // {
     * //   level: "info",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world"
     * // }
     * logger.info({message: "hello world", extra: {"key": "value", "key1": "value"}})
     * // json output:
     * // {
     * //   level: "info",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "key": "value",
     * //   "key1": "value"
     * // }
     *
     * logger.info({message: "hello world", error: err})
     * // json output:
     * // {
     * //   level: "info",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "error": "<err transformed to string>"
     * // }
     * ```
     * @param { Message } obj
     * @return { void }
     */
    info(obj: Message): void;
    /**
     *
     * @overload
     * Log with info level.
     * - NOTE: If this is run in dev mode only the message is printed to the console.
     *
     * Examples of the calling function:
     * ```ts
     * let request_log_obj: LogRequestResponse = {...}
     * logger.info(request_log_obj)
     * // json output:
     * // {
     * //   level: "info",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "method": "GET",
     * //   "status": 200,
     * //   ...
     * // }
     * ```
     * @param { RequestResponse } obj
     * @return { void }
     */
    info(obj: RequestResponse): void;
    /**
     *
     * @overload
     * Log with warn level.
     * - NOTE: If this is run in dev mode only the message is printed to the console.
     *
     * Examples of the calling function:
     * ```ts
     * logger.warn({message: "hello world"})
     * // json output:
     * // {
     * //   level: "warn",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world"
     * // }
     * logger.warn({message: "hello world", extra: {"key": "value", "key1": "value"}})
     * // json output:
     * // {
     * //   level: "warn",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "key": "value",
     * //   "key1": "value"
     * // }
     *
     * logger.warn({message: "hello world", error: err})
     * // json output:
     * // {
     * //   level: "warn",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "error": "<err transformed to string>"
     * // }
     * ```
     * @param { Message } obj
     * @return { void }
     */
    warn(obj: Message): void;
    /**
     *
     * @overload
     * Log with info level.
     * - NOTE: If this is run in dev mode only the message is printed to the console.
     *
     * Examples of the calling function:
     * ```ts
     * let request_log_obj: LogRequestResponse = {...}
     * logger.warn(request_log_obj)
     * // json output:
     * // {
     * //   level: "warn",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "method": "GET",
     * //   "status": 200,
     * //   ...
     * // }
     * ```
     * @param { RequestResponse } obj
     * @return { void }
     */
    warn(obj: RequestResponse): void;
    /**
     *
     * @overload
     * Log with error level.
     * - NOTE: If this is run in dev mode only the message is printed to the console.
     *
     * Examples of the calling function:
     * ```ts
     * logger.error({message: "hello world"})
     * // json output:
     * // {
     * //   level: "error",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world"
     * // }
     * logger.error({message: "hello world", extra: {"key": "value", "key1": "value"}})
     * // json output:
     * // {
     * //   level: "error",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "key": "value",
     * //   "key1": "value"
     * // }
     *
     * logger.error({message: "hello world", error: err})
     * // json output:
     * // {
     * //   level: "error",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "error": "<err transformed to string>"
     * // }
     * ```
     * @param { Message } obj
     * @return { void }
     */
    error(obj: Message): void;
    /**
     *
     * @overload
     * Log with info level.
     * - NOTE: If this is run in dev mode only the message is printed to the console.
     *
     * Examples of the calling function:
     * ```ts
     * let request_log_obj: LogRequestResponse = {...}
     * logger.error(request_log_obj)
     * // json output:
     * // {
     * //   level: "error",
     * //   "time": <TIMESTAMP>,
     * //   "message": "hello world",
     * //   "method": "GET",
     * //   "status": 200,
     * //   ...
     * // }
     * ```
     * @param { RequestResponse } obj
     * @return { void }
     */
    error(obj: RequestResponse): void;
    /**
     * DO NOT USE Unimplemented method
     * @param { RequestResponse } obj
     * @return { void }
     */
    fatal({ message, error, extra, method, elapsed, ad: status, client_ip, path, response_size, type, }: RequestResponse): void;
    #private;
}
export type WinstonLogger = import('winston').Logger;
export type JsonObject = {
    [key: string]: string | number | boolean | JsonObject | JsonObject[];
};
export type Method = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
export type Message = {
    message: string;
    extra?: JsonObject;
    error?: any;
};
export type RequestResponse = Message & {
    method: Method;
    ad: number;
    client_ip: string;
    path: string;
    response_size: number;
    elapsed?: number;
    type: 'request';
};
//# sourceMappingURL=index.d.ts.map