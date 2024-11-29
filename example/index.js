import winston from "winston";
import { magenta } from "@xeraph-dev/colors";
import { Logger, Timestamp, CapitalizeLevel, CustomFormat } from "js_logger";

const transports = [
	new winston.transports.Console({
		level: "debug",
		format: winston.format.combine(
			new Timestamp(magenta),
			new CapitalizeLevel(),
			winston.format.colorize(),
			new CustomFormat(),
		),
	}),
];
const winston_logger = winston.createLogger({
	transports: transports,
	exitOnError: false,
});
const logger = new Logger(winston_logger);
const jsonlogger = new Logger(winston.createLogger({
	transports: new winston.transports.Console({
		format: winston.format.combine(
			new Timestamp(),
			winston.format.json(),
		),
	})
}));
logger.info({ message: "comida" });
jsonlogger.info({ message: "comida" });

logger.info({ message: "comida", error: "error", extra: {"asd": 12} });
jsonlogger.info({ message: "comida", error: "error", extra: {"asd": 12} });

logger.info({ 
	message: "comida", 
	error: "error", 
	extra: {"asd": 12}, 
	type: "request", 
	method: "GET", 
	client_ip: "12", 
	status: 123,
	path: "s/sd/d",
	response_size: 123,
});
jsonlogger.info({ 
	message: "comida", 
	error: "error", 
	extra: {"asd": 12}, 
	type: "request", 
	method: "GET", 
	client_ip: "12", 
	status: 123,
	path: "s/sd/d",
	response_size: 123,
});
