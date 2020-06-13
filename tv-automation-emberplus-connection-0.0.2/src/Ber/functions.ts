/**  ITU-TX.690 (08/2015) 8.1.2 */
function APPLICATION(x: number): number {
	return x | 0x60
}
function CONTEXT(x: number): number {
	return x | 0xa0
}
function UNIVERSAL(x: number): number {
	return x
}

export { APPLICATION, CONTEXT, UNIVERSAL }
