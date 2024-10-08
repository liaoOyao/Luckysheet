export default function setInputBoxHorizontalAlignment(luckysheetConfigsetting) {
  let v= 'center'
  // 根据 defaultHT 属性值设置 text-align
  switch (luckysheetConfigsetting.defaultHT) {
    case "0": // 居中
      v = 'center'
      break;
    case "1": // 左对齐
      v = 'left'
      break;
    case "2": // 右对齐
      v = 'right'
      break;
    default:
       // 默认居中
      break;
  }
  return v
}
