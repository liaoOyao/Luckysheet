import pako from 'pako'
/**
 * @DESC 导出解压方法
 * @param { string } str
 * @returns
 */
exports.ws_unzip = (str) => {
  let chartData = str
    .toString()
    .split("")
    .map((i) => i.charCodeAt(0));
 
  let binData = new Uint8Array(chartData);
 
  let data = pako.inflate(binData);
 
  return decodeURIComponent(
    String.fromCharCode.apply(null, new Uint16Array(data))
  );
};
exports.arrayBufferToBase64 = (buffer)=> {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};