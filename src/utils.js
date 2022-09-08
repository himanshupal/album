/**
 * @param {string|number} data a valid number whether as string or numeric
 * @returns 0x padded hexadecimal string
 */
export const toHex = (data) => '0x' + Number(data).toString(16)
