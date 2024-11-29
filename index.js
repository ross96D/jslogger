import { MESSAGE } from "triple-beam";
import winston from "winston";

/**
 * @typedef {import('winston').Logger} WinstonLogger
 * @typedef { { [key: string]: string | number | boolean | JsonObject | JsonObject[] } } JsonObject
 * @export @typedef { 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH' } Method
 * @export @typedef { {message: string, extra?: JsonObject, error?: any} } Message
 * @export @typedef { Message & { method: Method, status: number, client_ip: string, path: string, response_size: number, elapsed?: number, type: 'request' } } RequestResponse
 */

export class Logger {
	logger;

	/**
	 * Small wrapper arround winston logger for consistency across projects
	 *
	 * @param {WinstonLogger} logger
	 */
	constructor(logger) {
		this.logger = logger;
	}

	#add_error(obj, error) {
		if (error === undefined) {
			return;
		}
		if (error instanceof globalThis.Error) {
			let errmessage = error.message;
			if (error.stack) {
				errmessage = `${errmessage}\n ${error.stack}`;
			}
			obj.error = errmessage;
		} else {
			obj.error = `${error}`;
		}
	}
	#add_extra(obj, extra) {
		if (extra) {
			for (const key in extra) {
				if (Object.prototype.hasOwnProperty.call(extra, key)) {
					obj[key] = extra[key];
				}
			}
		}
	}
	#add_request_response(obj, log) {
		if (
			!(
				log.client_ip &&
				log.method &&
				log.status &&
				log.path &&
				log.type === "request"
			)
		) {
			return;
		}
		obj.http_method = log.method;
		obj.http_status = log.status;
		obj.http_client_ip = log.client_ip;
		obj.http_url = log.path;
		obj.http_response_size = log.response_size;
		obj.http_elapsed = log.elapsed;
	}

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
	 *//**
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
	trace({
		message,
		error,
		extra,
		method,
		elapsed,
		status,
		client_ip,
		path,
		response_size,
		type,
	}) {}

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
	 *//**
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
	debug({
		message,
		error,
		extra,
		method,
		elapsed,
		status,
		client_ip,
		path,
		response_size,
		type,
	}) {
		const obj = { message: message };
		this.#add_error(obj, error);
		this.#add_extra(obj, extra);
		this.#add_request_response(obj, {
			client_ip,
			message,
			method,
			response_size,
			type,
			path,
			status,
			elapsed,
		});

		this.logger.debug(obj);
	}

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
	 *//**
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
	info({
		message,
		error,
		extra,
		method,
		elapsed,
		status,
		client_ip,
		path,
		response_size,
		type,
	}) {
		const obj = { message: message };
		this.#add_error(obj, error);
		this.#add_extra(obj, extra);
		this.#add_request_response(obj, {
			client_ip,
			message,
			method,
			response_size,
			type,
			path,
			status,
			elapsed,
		});

		this.logger.info(obj);
	}

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
	 *//**
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
	warn({
		message,
		error,
		extra,
		method,
		elapsed,
		status,
		client_ip,
		path,
		response_size,
		type,
	}) {
		const obj = { message: message };
		this.#add_error(obj, error);
		this.#add_extra(obj, extra);
		this.#add_request_response(obj, {
			client_ip,
			message,
			method,
			response_size,
			type,
			path,
			status,
			elapsed,
		});

		this.logger.warn(obj);
	}

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
	 *//**
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
	error({
		message,
		error,
		extra,
		method,
		elapsed,
		status,
		client_ip,
		path,
		response_size,
		type,
	}) {
		const obj = { message: message };
		this.#add_error(obj, error);
		this.#add_extra(obj, extra);
		this.#add_request_response(obj, {
			client_ip,
			message,
			method,
			response_size,
			type,
			path,
			status,
			elapsed,
		});

		this.logger.error(obj);
	}

	/**
	 * DO NOT USE Unimplemented method
	 * @param { RequestResponse } obj
	 * @return { void }
	 */
	fatal({
		message,
		error,
		extra,
		method,
		elapsed,
		ad: status,
		client_ip,
		path,
		response_size,
		type,
	}) {}
}

export class Timestamp {
	color;
	/**
	 *
	 * @param {(s: string) => string} [color]
	 */
	constructor(color) {
		this.color = color;
	}

	transform(info) {
		if (this.color) {
			info.time = this.color(`${toIsoString(new Date())}`);
		} else {
			info.time = `${toIsoString(new Date())}`;
		}
		return info;
	}
}

export class CustomFormat {
	transform(info) {
		info[MESSAGE] = `${info.time} ${info.level} ${info.message}`;
		return info;
	}
}

export class CapitalizeLevel {
	transform(info) {
		if (
			info &&
			(typeof info.level === "string" || info.level instanceof String)
		) {
			info.level = info.level.toUpperCase();
		}
		return info;
	}
}

/**
 *
 * @param {Date} date
 * @returns {string}
 */
function toIsoString(date) {
	const tzo = -date.getTimezoneOffset();
	const dif = tzo >= 0 ? "+" : "-";
	const pad = (num) => (num < 10 ? "0" : "") + num;
	const pad3 = (num) => {
		if (num < 10) {
			return `00${num.toString()}`;
		}
		if (num < 100) {
			return `0${num.toString()}`;
		}
		return num.toString();
	};

	return (
		// biome-ignore lint/style/useTemplate: <explanation>
		date.getFullYear() +
		"-" +
		pad(date.getMonth() + 1) +
		"-" +
		pad(date.getDate()) +
		"T" +
		pad(date.getHours()) +
		":" +
		pad(date.getMinutes()) +
		":" +
		pad(date.getSeconds()) +
		"." +
		pad3(date.getMilliseconds()) +
		dif +
		pad(Math.floor(Math.abs(tzo) / 60)) +
		":" +
		pad(Math.abs(tzo) % 60)
	);
}
