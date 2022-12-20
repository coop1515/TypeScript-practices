
// 아래의 명령어로 js파일내에서 tscheck를 가능하게함. 
// @ts-check

/** JSDoc
 * Initializes the project
 * @param {object} config 
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */
export function init(config) {
    return true;
}

/**
 * Exits the program
 * @param {number} code 
 * @returns number
 */
export function exit(code) {
    return code + 1;
}
