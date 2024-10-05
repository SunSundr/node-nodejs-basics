import { styleText } from 'node:util';

/**
 * Formats and returns a message based on the output destination.
 * If the output is directed to a terminal, the message is styled using the specified format.
 * If the output is not directed to a terminal, the message is returned without styling.
 *
 * @param {string} format - The format to apply to the message (e.g., 'red', 'green').
 * @param {string} msg - The message to be formatted.
 * @returns {string} - The formatted or unformatted message based on the output destination.
 */
export function output(format, msg) {
    if (process.stdout.isTTY) {
        return styleText(format, msg);
    } else {
        return msg;
    }
}