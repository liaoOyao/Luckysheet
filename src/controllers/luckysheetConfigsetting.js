const luckysheetConfigsetting = {
    autoFormatw: false,
    accuracy: undefined,
    total: 0,

    allowCopy: true,
    showtoolbar: true,
    showinfobar: true,
    showsheetbar: true,
    showstatisticBar: true,
    pointEdit: false,
    pointEditUpdate: null,
    pointEditZoom: 1,

    userInfo: false,
    userMenuItem: [],
    myFolderUrl: null,
    functionButton: null,

    showConfigWindowResize: true,
    enableAddRow: true,
    addRowCount: 5,//默认为5
    enableAddBackTop: true,
    enablePage: true,
    pageInfo: null,


    editMode: false,
    beforeCreateDom: null,
    workbookCreateBefore: null,
    workbookCreateAfter: null,
    remoteFunction: null,
    fireMousedown: null,
    plugins:[],
    forceCalculation:false,//强制刷新公式，公式较多会有性能问题，慎用

    defaultColWidth:120,
    defaultRowHeight:40,

    defaultTextColor: '#000',
    defaultCellColor: '#fff',
    show_select_count: true,
    defaultHT:"0", // 水平对齐 0 居中、1 左、2右
    defaultVT:"0",  // 垂直对齐  0 中间、1 上、2下
    defaultCellStyle:{
        "font-weight": "normal",
    }
}

export default luckysheetConfigsetting;
