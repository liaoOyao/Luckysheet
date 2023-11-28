import mobileinit from "./mobile";
import luckysheetConfigsetting from "./luckysheetConfigsetting";
import luckysheetFreezen from "./freezen";
import pivotTable from "./pivotTable";
import luckysheetDropCell from "./dropCell";
import luckysheetPostil from "./postil";
import imageCtrl from "./imageCtrl";
import hyperlinkCtrl from "./hyperlinkCtrl";
import dataVerificationCtrl from "./dataVerificationCtrl";
import menuButton from "./menuButton";
import conditionformat from "./conditionformat";
import alternateformat from "./alternateformat";
import ifFormulaGenerator from "./ifFormulaGenerator";
import sheetmanage from "./sheetmanage";
import server from "./server";
import { luckysheetupdateCell } from "./updateCell";
import { luckysheet_searcharray } from "./sheetSearch";
import luckysheetsizeauto from "./resize";
import { luckysheetMoveHighlightCell } from "./sheetMove";
import {
    selectHightlightShow,
    selectIsOverlap,
    selectionCopyShow,
    luckysheet_count_show,
    selectHelpboxFill,
} from "./select";
import selection from "./selection";
import controlHistory from "./controlHistory";
import splitColumn from "./splitColumn";
import { hideMenuByCancel } from "../global/cursorPos";
import { luckysheetdefaultstyle } from "./constant";
import {
    checkProtectionLockedRangeList,
    checkProtectionAllSelected,
    checkProtectionSelectLockedOrUnLockedCells,
    checkProtectionNotEnable,
    checkProtectionAuthorityNormal,
} from "./protection";
import { openCellFormatModel } from "./cellFormat";

import {
    replaceHtml,
    getObjType,
    chatatABC,
    ArrayUnique,
    showrightclickmenu,
    luckysheetactiveCell,
    luckysheetContainerFocus,
    $$,
} from "../utils/util";
import { getSheetIndex, getRangetxt } from "../methods/get";
import { rowLocation, colLocation, mouseposition } from "../global/location";
import { rowlenByRange } from "../global/getRowlen";
import { isRealNull, hasPartMC, isEditMode, checkIsAllowEdit } from "../global/validate";
import { countfunc } from "../global/count";
import browser from "../global/browser";
import formula from "../global/formula";
import { luckysheetextendtable } from "../global/extend";
import luckysheetscrollevent from "../global/scroll";
import { jfrefreshgrid, jfrefreshgrid_rhcw, luckysheetrefreshgrid } from "../global/refresh";
import { getdatabyselection, datagridgrowth } from "../global/getdata";
import tooltip from "../global/tooltip";
import editor from "../global/editor";
import { genarate, update } from "../global/format";
import method from "../global/method";
import { getBorderInfoCompute } from "../global/border";
import { luckysheetDrawMain } from "../global/draw";
import locale from "../locale/locale";
import Store from "../store";
import { createLuckyChart, hideAllNeedRangeShow } from "../expendPlugins/chart/plugin";
import luckysheetformula from "../global/formula";
import {createExportDialog,fetchAndDownloadXlsx} from "../expendPlugins/exportXlsx/plugin";

//, columeflowset, rowflowset
export default function luckysheetHandler() {
    const os = browser.detectOS(),
        isMobile = browser.mobilecheck();

    //移动端
    if (isMobile) {
        mobileinit();
    }
    if (!Date.now)
        Date.now = function() {
            return new Date().getTime();
        };
    //requestAnimationFrame method
    (function() {
        "use strict";

        var vendors = ["webkit", "moz"];
        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            var vp = vendors[i];
            window.requestAnimationFrame = window[vp + "RequestAnimationFrame"];
            window.cancelAnimationFrame =
                window[vp + "CancelAnimationFrame"] || window[vp + "CancelRequestAnimationFrame"];
        }
        if (
            /iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || // iOS6 is buggy
            !window.requestAnimationFrame ||
            !window.cancelAnimationFrame
        ) {
            var lastTime = 0;
            window.requestAnimationFrame = function(callback) {
                var now = Date.now();
                var nextTime = Math.max(lastTime + 16, now);
                return setTimeout(function() {
                    callback((lastTime = nextTime));
                }, nextTime - now);
            };
            window.cancelAnimationFrame = clearTimeout;
        }
    })();

    $("#luckysheet-sheet-container-c").mousewheel(function(event, delta) {
        let scrollNum = event.deltaFactor < 40 ? 1 : event.deltaFactor < 80 ? 2 : 3;
        let scrollLeft = $(this).scrollLeft();
        if (event.deltaY != 0) {
            if (event.deltaY < 0) {
                scrollLeft = scrollLeft + 10 * scrollNum;
            } else {
                scrollLeft = scrollLeft - 10 * scrollNum;
            }
        } else if (event.deltaX != 0) {
            if (event.deltaX > 0) {
                scrollLeft = scrollLeft + 10 * scrollNum;
            } else {
                scrollLeft = scrollLeft - 10 * scrollNum;
            }
        }
        $(this).scrollLeft(scrollLeft);
        event.preventDefault();
    });

    //滚动监听
    $("#luckysheet-cell-main")
        .scroll(function() {})
        .mousewheel(function(event, delta) {
            event.preventDefault();
        });

    const _locale = locale();
    const locale_drag = _locale.drag;
    const locale_info = _locale.info;
    let prev, mousewheelArrayUniqueTimeout;
    $("#luckysheet-grid-window-1").mousewheel(function(event, delta) {
        let scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft(),
            scrollTop = $("#luckysheet-scrollbar-y").scrollTop();
        let visibledatacolumn_c = Store.visibledatacolumn,
            visibledatarow_c = Store.visibledatarow;

        if (luckysheetFreezen.freezenhorizontaldata != null) {
            visibledatarow_c = luckysheetFreezen.freezenhorizontaldata[3];
        }

        if (luckysheetFreezen.freezenverticaldata != null) {
            visibledatacolumn_c = luckysheetFreezen.freezenverticaldata[3];
        }

        clearTimeout(mousewheelArrayUniqueTimeout);

        // if(Store.visibledatacolumn.length!=visibledatacolumn_c.length){
        if (Store.visibledatacolumn_unique != null) {
            visibledatacolumn_c = Store.visibledatacolumn_unique;
        } else {
            visibledatacolumn_c = ArrayUnique(visibledatacolumn_c);
            Store.visibledatacolumn_unique = visibledatacolumn_c;
        }
        // }

        // if(Store.visibledatarow.length!=visibledatarow_c.length){
        if (Store.visibledatarow_unique != null) {
            visibledatarow_c = Store.visibledatarow_unique;
        } else {
            visibledatarow_c = ArrayUnique(visibledatarow_c);
            Store.visibledatarow_unique = visibledatarow_c;
        }
        // }

        // visibledatacolumn_c = ArrayUnique(visibledatacolumn_c);
        // visibledatarow_c = ArrayUnique(visibledatarow_c);

        let col_st = luckysheet_searcharray(visibledatacolumn_c, scrollLeft);
        let row_st = luckysheet_searcharray(visibledatarow_c, scrollTop);

        if (luckysheetFreezen.freezenhorizontaldata != null) {
            row_st = luckysheet_searcharray(visibledatarow_c, scrollTop + luckysheetFreezen.freezenhorizontaldata[0]);
        }

        let colscroll = 0;
        let rowscroll = 0;

        let scrollNum = event.deltaFactor < 40 ? 1 : event.deltaFactor < 80 ? 2 : 3;
        //一次滚动三行或三列
        if (event.deltaY != 0) {
            let row_ed,
                step = Math.round(scrollNum / Store.zoomRatio);
            step = step < 1 ? 1 : step;
            if (event.deltaY < 0) {
                row_ed = row_st + step;

                if (row_ed >= visibledatarow_c.length) {
                    row_ed = visibledatarow_c.length - 1;
                }
            } else {
                row_ed = row_st - step;

                if (row_ed < 0) {
                    row_ed = 0;
                }
            }

            rowscroll = row_ed == 0 ? 0 : visibledatarow_c[row_ed - 1];

            if (luckysheetFreezen.freezenhorizontaldata != null) {
                rowscroll -= luckysheetFreezen.freezenhorizontaldata[0];
            }

            $("#luckysheet-scrollbar-y").scrollTop(rowscroll);
        } else if (event.deltaX != 0) {
            let col_ed;

            // if((isMac && event.deltaX >0 ) || (!isMac && event.deltaX < 0)){
            if (event.deltaX > 0) {
                scrollLeft = scrollLeft + 20 * Store.zoomRatio;

                // if(col_ed >= visibledatacolumn_c.length){
                //     col_ed = visibledatacolumn_c.length - 1;
                // }
            } else {
                scrollLeft = scrollLeft - 20 * Store.zoomRatio;

                // if(col_ed < 0){
                //     col_ed = 0;
                // }
            }

            // colscroll = col_ed == 0 ? 0 : visibledatacolumn_c[col_ed - 1];

            $("#luckysheet-scrollbar-x").scrollLeft(scrollLeft);
        }

        mousewheelArrayUniqueTimeout = setTimeout(() => {
            Store.visibledatacolumn_unique = null;
            Store.visibledatarow_unique = null;
        }, 500);
    });

    $("#luckysheet-scrollbar-x")
        .scroll(function() {
            // setTimeout(function(){
            luckysheetscrollevent();
            // },10);
        })
        .mousewheel(function(event, delta) {
            event.preventDefault();
        });

    $("#luckysheet-scrollbar-y")
        .scroll(function() {
            // setTimeout(function(){
            luckysheetscrollevent();
            // },10);
        })
        .mousewheel(function(event, delta) {
            event.preventDefault();
        });

    //页面resize
    $(window).resize(function() {
        let luckysheetDocument = document.getElementById(Store.container);
        if (luckysheetDocument) {
            luckysheetsizeauto();
        }
    });

    $("#luckysheet-rich-text-editor").mouseup(function(e) {
        menuButton.inputMenuButtonFocus(e.target);
    });

    //表格mousedown
    $("#luckysheet-cell-main, #luckysheetTableContent")
        .mousedown(function(event) { // hz-flag  鼠标按下时拖拽
            // debugger;
            if ($(event.target).hasClass("luckysheet-mousedown-cancel")) {
                return;
            }

            // 协同编辑其他用户不在操作的时候，用户名框隐藏
            hideUsername();

            $("#luckysheet-cell-selected")
                .find(".luckysheet-cs-fillhandle")
                .css("cursor", "default")
                .end()
                .find(".luckysheet-cs-draghandle")
                .css("cursor", "default");
            $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor", "default");

            //有批注在编辑时
            luckysheetPostil.removeActivePs();

            //图片 active/cropping
            if (
                $("#luckysheet-modal-dialog-activeImage").is(":visible") ||
                $("#luckysheet-modal-dialog-cropping").is(":visible")
            ) {
                imageCtrl.cancelActiveImgItem();
            }

            //luckysheetautoadjustmousedown = 1;
            let mouse = mouseposition(event.pageX, event.pageY);
            if (
                mouse[0] >= Store.cellmainWidth - Store.cellMainSrollBarSize ||
                mouse[1] >= Store.cellmainHeight - Store.cellMainSrollBarSize
            ) {
                return;
            }

            let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
            let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

            if (
                luckysheetFreezen.freezenverticaldata != null &&
                mouse[0] < luckysheetFreezen.freezenverticaldata[0] - luckysheetFreezen.freezenverticaldata[2]
            ) {
                x = mouse[0] + luckysheetFreezen.freezenverticaldata[2];
            }

            if (
                luckysheetFreezen.freezenhorizontaldata != null &&
                mouse[1] < luckysheetFreezen.freezenhorizontaldata[0] - luckysheetFreezen.freezenhorizontaldata[2]
            ) {
                y = mouse[1] + luckysheetFreezen.freezenhorizontaldata[2];
            }

            let sheetFile = sheetmanage.getSheetByIndex();
            let luckysheetTableContent = $("#luckysheetTableContent")
                .get(0)
                .getContext("2d");

            let row_location = rowLocation(y),
                row = row_location[1],
                row_pre = row_location[0],
                row_index = row_location[2];

            let col_location = colLocation(x),
                col = col_location[1],
                col_pre = col_location[0],
                col_index = col_location[2];

            let row_index_ed = row_index,
                col_index_ed = col_index;
            let margeset = menuButton.mergeborer(Store.flowdata, row_index, col_index);
            if (!!margeset) {
                row = margeset.row[1];
                row_pre = margeset.row[0];
                row_index = margeset.row[2];
                row_index_ed = margeset.row[3];

                col = margeset.column[1];
                col_pre = margeset.column[0];
                col_index = margeset.column[2];
                col_index_ed = margeset.column[3];
            }

            //单元格单击之前
            if (
                !method.createHookFunction(
                    "cellMousedownBefore",
                    Store.flowdata[row_index][col_index],
                    {
                        r: row_index,
                        c: col_index,
                        start_r: row_pre,
                        start_c: col_pre,
                        end_r: row,
                        end_c: col,
                    },
                    sheetFile,
                    luckysheetTableContent,
                )
            ) {
                return;
            }

            //数据验证 单元格聚焦
            dataVerificationCtrl.cellFocus(row_index, col_index, true);
            luckysheetformula.cellFocus(row_index, col_index);

            //若点击单元格部分不在视图内
            if (col_pre < $("#luckysheet-cell-main").scrollLeft()) {
                $("#luckysheet-scrollbar-x").scrollLeft(col_pre);
            }

            if (row_pre < $("#luckysheet-cell-main").scrollTop()) {
                $("#luckysheet-scrollbar-y").scrollTop(row_pre);
            }

            //mousedown是右键
            if (event.which == "3") {
                $("#luckysheet-dataVerification-showHintBox").hide();

                let isright = false;

                for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                    if (
                        Store.luckysheet_select_save[s]["row"] != null &&
                        row_index >= Store.luckysheet_select_save[s]["row"][0] &&
                        row_index <= Store.luckysheet_select_save[s]["row"][1] &&
                        col_index >= Store.luckysheet_select_save[s]["column"][0] &&
                        col_index <= Store.luckysheet_select_save[s]["column"][1]
                    ) {
                        isright = true;
                        break;
                    }
                }

                if (isright) {
                    return;
                }
            }

            //单元格数据下钻
            if (
                Store.flowdata[row_index] != null &&
                Store.flowdata[row_index][col_index] != null &&
                Store.flowdata[row_index][col_index].dd != null
            ) {
                if (
                    luckysheetConfigsetting.fireMousedown != null &&
                    getObjType(luckysheetConfigsetting.fireMousedown) == "function"
                ) {
                    luckysheetConfigsetting.fireMousedown(Store.flowdata[row_index][col_index].dd);
                    return;
                }
            }

            //链接 单元格聚焦
            if (hyperlinkCtrl.hyperlink && hyperlinkCtrl.hyperlink[row_index + "_" + col_index] && event.which != "3") {
                hyperlinkCtrl.cellFocus(row_index, col_index);
                return;
            }

            Store.luckysheet_scroll_status = true;

            //公式相关
            let $input = $("#luckysheet-input-box");
            if (parseInt($input.css("top")) > 0) {
                if (
                    formula.rangestart ||
                    formula.rangedrag_column_start ||
                    formula.rangedrag_row_start ||
                    formula.israngeseleciton()
                ) {
                    //公式选区
                    let rowseleted = [row_index, row_index_ed];
                    let columnseleted = [col_index, col_index_ed];

                    let left = col_pre;
                    let width = col - col_pre - 1;
                    let top = row_pre;
                    let height = row - row_pre - 1;

                    if (event.shiftKey) {
                        let last = formula.func_selectedrange;

                        let top = 0,
                            height = 0,
                            rowseleted = [];
                        if (last.top > row_pre) {
                            top = row_pre;
                            height = last.top + last.height - row_pre;

                            if (last.row[1] > last.row_focus) {
                                last.row[1] = last.row_focus;
                            }

                            rowseleted = [row_index, last.row[1]];
                        } else if (last.top == row_pre) {
                            top = row_pre;
                            height = last.top + last.height - row_pre;
                            rowseleted = [row_index, last.row[0]];
                        } else {
                            top = last.top;
                            height = row - last.top - 1;

                            if (last.row[0] < last.row_focus) {
                                last.row[0] = last.row_focus;
                            }

                            rowseleted = [last.row[0], row_index];
                        }

                        let left = 0,
                            width = 0,
                            columnseleted = [];
                        if (last.left > col_pre) {
                            left = col_pre;
                            width = last.left + last.width - col_pre;

                            if (last.column[1] > last.column_focus) {
                                last.column[1] = last.column_focus;
                            }

                            columnseleted = [col_index, last.column[1]];
                        } else if (last.left == col_pre) {
                            left = col_pre;
                            width = last.left + last.width - col_pre;
                            columnseleted = [col_index, last.column[0]];
                        } else {
                            left = last.left;
                            width = col - last.left - 1;

                            if (last.column[0] < last.column_focus) {
                                last.column[0] = last.column_focus;
                            }

                            columnseleted = [last.column[0], col_index];
                        }

                        let changeparam = menuButton.mergeMoveMain(
                            columnseleted,
                            rowseleted,
                            last,
                            top,
                            height,
                            left,
                            width,
                        );
                        if (changeparam != null) {
                            columnseleted = changeparam[0];
                            rowseleted = changeparam[1];
                            top = changeparam[2];
                            height = changeparam[3];
                            left = changeparam[4];
                            width = changeparam[5];
                        }

                        luckysheet_count_show(left, top, width, height, rowseleted, columnseleted);

                        last["row"] = rowseleted;
                        last["column"] = columnseleted;

                        last["left_move"] = left;
                        last["width_move"] = width;
                        last["top_move"] = top;
                        last["height_move"] = height;

                        formula.func_selectedrange = last;
                    } else if (
                        event.ctrlKey &&
                        $("#luckysheet-rich-text-editor")
                            .find("span")
                            .last()
                            .text() != ","
                    ) {
                        //按住ctrl 选择选区时  先处理上一个选区
                        let vText = $("#luckysheet-rich-text-editor").text();

                        if (vText[vText.length - 1] === ")") {
                            vText = vText.substr(0, vText.length - 1); //先删除最后侧的圆括号)
                        }

                        if (vText.length > 0) {
                            let lastWord = vText.substr(vText.length - 1, 1);
                            if (lastWord != "," && lastWord != "=" && lastWord != "(") {
                                vText += ",";
                            }
                        }
                        if (vText.length > 0 && vText.substr(0, 1) == "=") {
                            vText = formula.functionHTMLGenerate(vText);

                            if (window.getSelection) {
                                // all browsers, except IE before version 9
                                let currSelection = window.getSelection();
                                formula.functionRangeIndex = [
                                    $(currSelection.anchorNode)
                                        .parent()
                                        .index(),
                                    currSelection.anchorOffset,
                                ];
                            } else {
                                // Internet Explorer before version 9
                                let textRange = document.selection.createRange();
                                formula.functionRangeIndex = textRange;
                            }

                            /* 在显示前重新 + 右侧的圆括号) */

                            $("#luckysheet-rich-text-editor").html(vText + ")");

                            formula.canceFunctionrangeSelected();
                            formula.createRangeHightlight();
                        }

                        formula.rangestart = false;
                        formula.rangedrag_column_start = false;
                        formula.rangedrag_row_start = false;

                        $("#luckysheet-functionbox-cell").html(vText + ")");
                        formula.rangeHightlightselected($("#luckysheet-rich-text-editor"));

                        //再进行 选区的选择
                        formula.israngeseleciton();
                        formula.func_selectedrange = {
                            left: left,
                            width: width,
                            top: top,
                            height: height,
                            left_move: left,
                            width_move: width,
                            top_move: top,
                            height_move: height,
                            row: rowseleted,
                            column: columnseleted,
                            row_focus: row_index,
                            column_focus: col_index,
                        };
                    } else {
                        formula.func_selectedrange = {
                            left: left,
                            width: width,
                            top: top,
                            height: height,
                            left_move: left,
                            width_move: width,
                            top_move: top,
                            height_move: height,
                            row: rowseleted,
                            column: columnseleted,
                            row_focus: row_index,
                            column_focus: col_index,
                        };
                    }

                    formula.rangeSetValue({ row: rowseleted, column: columnseleted });

                    formula.rangestart = true;
                    formula.rangedrag_column_start = false;
                    formula.rangedrag_row_start = false;

                    $("#luckysheet-formula-functionrange-select")
                        .css({
                            left: left,
                            width: width,
                            top: top,
                            height: height,
                        })
                        .show();
                    $("#luckysheet-formula-help-c").hide();
                    luckysheet_count_show(left, top, width, height, rowseleted, columnseleted);

                    setTimeout(function() {
                        let currSelection = window.getSelection();
                        let anchorOffset = currSelection.anchorNode;

                        let $editor;
                        if (
                            $("#luckysheet-search-formula-parm").is(":visible") ||
                            $("#luckysheet-search-formula-parm-select").is(":visible")
                        ) {
                            $editor = $("#luckysheet-rich-text-editor");
                            formula.rangechangeindex = formula.data_parm_index;
                        } else {
                            $editor = $(anchorOffset).closest("div");
                        }

                        let $span = $editor.find("span[rangeindex='" + formula.rangechangeindex + "']");
                        if ($span && $span != undefined && $span != null && $span ) {
                            if($span.html()){
                                if($span.html().length){
                                    formula.setCaretPosition($span.get(0), 0, $span.html().length);
                                }
                            }
                        }
                    }, 1);
                    return;
                } else {
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    Store.luckysheet_select_status = true;

                    if ($("#luckysheet-info").is(":visible")) {
                        Store.luckysheet_select_status = false;
                    }
                }
            } else {
                if (checkProtectionSelectLockedOrUnLockedCells(row_index, col_index, Store.currentSheetIndex)) {
                    Store.luckysheet_select_status = true;
                }
            }

            //条件格式 应用范围可选择多个单元格
            if ($("#luckysheet-multiRange-dialog").is(":visible")) {
                conditionformat.selectStatus = true;
                Store.luckysheet_select_status = false;

                if (event.shiftKey) {
                    let last = conditionformat.selectRange[conditionformat.selectRange.length - 1];

                    let top = 0,
                        height = 0,
                        rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;

                        if (last.row[1] > last.row_focus) {
                            last.row[1] = last.row_focus;
                        }

                        rowseleted = [row_index, last.row[1]];
                    } else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [row_index, last.row[0]];
                    } else {
                        top = last.top;
                        height = row - last.top - 1;

                        if (last.row[0] < last.row_focus) {
                            last.row[0] = last.row_focus;
                        }

                        rowseleted = [last.row[0], row_index];
                    }

                    let left = 0,
                        width = 0,
                        columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;

                        if (last.column[1] > last.column_focus) {
                            last.column[1] = last.column_focus;
                        }

                        columnseleted = [col_index, last.column[1]];
                    } else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [col_index, last.column[0]];
                    } else {
                        left = last.left;
                        width = col - last.left - 1;

                        if (last.column[0] < last.column_focus) {
                            last.column[0] = last.column_focus;
                        }

                        columnseleted = [last.column[0], col_index];
                    }

                    let changeparam = menuButton.mergeMoveMain(
                        columnseleted,
                        rowseleted,
                        last,
                        top,
                        height,
                        left,
                        width,
                    );
                    if (changeparam != null) {
                        columnseleted = changeparam[0];
                        rowseleted = changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                        left = changeparam[4];
                        width = changeparam[5];
                    }

                    last["row"] = rowseleted;
                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;
                    last["top_move"] = top;
                    last["height_move"] = height;

                    conditionformat.selectRange[conditionformat.selectRange.length - 1] = last;
                } else if (event.ctrlKey) {
                    conditionformat.selectRange.push({
                        left: col_pre,
                        width: col - col_pre - 1,
                        top: row_pre,
                        height: row - row_pre - 1,
                        left_move: col_pre,
                        width_move: col - col_pre - 1,
                        top_move: row_pre,
                        height_move: row - row_pre - 1,
                        row: [row_index, row_index_ed],
                        column: [col_index, col_index_ed],
                        row_focus: row_index,
                        column_focus: col_index,
                    });
                } else {
                    conditionformat.selectRange = [];
                    conditionformat.selectRange.push({
                        left: col_pre,
                        width: col - col_pre - 1,
                        top: row_pre,
                        height: row - row_pre - 1,
                        left_move: col_pre,
                        width_move: col - col_pre - 1,
                        top_move: row_pre,
                        height_move: row - row_pre - 1,
                        row: [row_index, row_index_ed],
                        column: [col_index, col_index_ed],
                        row_focus: row_index,
                        column_focus: col_index,
                    });
                }

                selectionCopyShow(conditionformat.selectRange);

                let range = conditionformat.getTxtByRange(conditionformat.selectRange);
                $("#luckysheet-multiRange-dialog input").val(range);

                return;
            } else {
                conditionformat.selectStatus = false;
                conditionformat.selectRange = [];
            }

            //条件格式 条件值只能选择单个单元格
            if ($("#luckysheet-singleRange-dialog").is(":visible")) {
                Store.luckysheet_select_status = false;

                selectionCopyShow([{ row: [row_index, row_index], column: [col_index, col_index] }]);

                let range = getRangetxt(
                    Store.currentSheetIndex,
                    { row: [row_index, row_index], column: [col_index, col_index] },
                    Store.currentSheetIndex,
                );
                $("#luckysheet-singleRange-dialog input").val(range);

                return;
            }

            //数据验证 单元格范围选择
            if ($("#luckysheet-dataVerificationRange-dialog").is(":visible")) {
                dataVerificationCtrl.selectStatus = true;
                Store.luckysheet_select_status = false;

                if (event.shiftKey) {
                    let last = dataVerificationCtrl.selectRange[dataVerificationCtrl.selectRange.length - 1];

                    let top = 0,
                        height = 0,
                        rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;

                        if (last.row[1] > last.row_focus) {
                            last.row[1] = last.row_focus;
                        }

                        rowseleted = [row_index, last.row[1]];
                    } else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [row_index, last.row[0]];
                    } else {
                        top = last.top;
                        height = row - last.top - 1;

                        if (last.row[0] < last.row_focus) {
                            last.row[0] = last.row_focus;
                        }

                        rowseleted = [last.row[0], row_index];
                    }

                    let left = 0,
                        width = 0,
                        columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;

                        if (last.column[1] > last.column_focus) {
                            last.column[1] = last.column_focus;
                        }

                        columnseleted = [col_index, last.column[1]];
                    } else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [col_index, last.column[0]];
                    } else {
                        left = last.left;
                        width = col - last.left - 1;

                        if (last.column[0] < last.column_focus) {
                            last.column[0] = last.column_focus;
                        }

                        columnseleted = [last.column[0], col_index];
                    }

                    let changeparam = menuButton.mergeMoveMain(
                        columnseleted,
                        rowseleted,
                        last,
                        top,
                        height,
                        left,
                        width,
                    );
                    if (changeparam != null) {
                        columnseleted = changeparam[0];
                        rowseleted = changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                        left = changeparam[4];
                        width = changeparam[5];
                    }

                    last["row"] = rowseleted;
                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;
                    last["top_move"] = top;
                    last["height_move"] = height;

                    dataVerificationCtrl.selectRange[dataVerificationCtrl.selectRange.length - 1] = last;
                } else {
                    dataVerificationCtrl.selectRange = [];
                    dataVerificationCtrl.selectRange.push({
                        left: col_pre,
                        width: col - col_pre - 1,
                        top: row_pre,
                        height: row - row_pre - 1,
                        left_move: col_pre,
                        width_move: col - col_pre - 1,
                        top_move: row_pre,
                        height_move: row - row_pre - 1,
                        row: [row_index, row_index_ed],
                        column: [col_index, col_index_ed],
                        row_focus: row_index,
                        column_focus: col_index,
                    });
                }

                selectionCopyShow(dataVerificationCtrl.selectRange);

                let range = dataVerificationCtrl.getTxtByRange(dataVerificationCtrl.selectRange);
                if (formula.rangetosheet && formula.rangetosheet != Store.currentSheetIndex) {
                    range = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].name + "!" + range;
                }
                $("#luckysheet-dataVerificationRange-dialog input").val(range);

                return;
            } else {
                dataVerificationCtrl.selectStatus = false;
                dataVerificationCtrl.selectRange = [];
            }

            //if公式生成器
            if (ifFormulaGenerator.singleRangeFocus) {
                $("#luckysheet-ifFormulaGenerator-dialog .singRange").click();
            }
            if ($("#luckysheet-ifFormulaGenerator-singleRange-dialog").is(":visible")) {
                //选择单个单元格
                Store.luckysheet_select_status = false;
                formula.rangestart = false;

                $("#luckysheet-formula-functionrange-select")
                    .css({
                        left: col_pre,
                        width: col - col_pre - 1,
                        top: row_pre,
                        height: row - row_pre - 1,
                    })
                    .show();
                $("#luckysheet-formula-help-c").hide();

                let range = getRangetxt(
                    Store.currentSheetIndex,
                    { row: [row_index, row_index], column: [col_index, col_index] },
                    Store.currentSheetIndex,
                );
                $("#luckysheet-ifFormulaGenerator-singleRange-dialog input").val(range);

                return;
            }
            if ($("#luckysheet-ifFormulaGenerator-multiRange-dialog").is(":visible")) {
                //选择范围
                Store.luckysheet_select_status = false;
                formula.func_selectedrange = {
                    left: col_pre,
                    width: col - col_pre - 1,
                    top: row_pre,
                    height: row - row_pre - 1,
                    left_move: col_pre,
                    width_move: col - col_pre - 1,
                    top_move: row_pre,
                    height_move: row - row_pre - 1,
                    row: [row_index, row_index],
                    column: [col_index, col_index],
                    row_focus: row_index,
                    column_focus: col_index,
                };
                formula.rangestart = true;

                $("#luckysheet-formula-functionrange-select")
                    .css({
                        left: col_pre,
                        width: col - col_pre - 1,
                        top: row_pre,
                        height: row - row_pre - 1,
                    })
                    .show();
                $("#luckysheet-formula-help-c").hide();

                let range = getRangetxt(
                    Store.currentSheetIndex,
                    { row: [row_index, row_index], column: [col_index, col_index] },
                    Store.currentSheetIndex,
                );
                $("#luckysheet-ifFormulaGenerator-multiRange-dialog input").val(range);

                $("#luckysheet-row-count-show").hide();
                $("#luckysheet-column-count-show").hide();

                return;
            }

            if (Store.luckysheet_select_status) {
                if (event.shiftKey) {
                    //按住shift点击，选择范围
                    let last = $.extend(
                        true,
                        {},
                        Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1],
                    ); //选区最后一个

                    let top = 0,
                        height = 0,
                        rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;

                        if (last.row[1] > last.row_focus) {
                            last.row[1] = last.row_focus;
                        }

                        rowseleted = [row_index, last.row[1]];
                    } else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [row_index, last.row[0]];
                    } else {
                        top = last.top;
                        height = row - last.top - 1;

                        if (last.row[0] < last.row_focus) {
                            last.row[0] = last.row_focus;
                        }

                        rowseleted = [last.row[0], row_index];
                    }

                    let left = 0,
                        width = 0,
                        columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;

                        if (last.column[1] > last.column_focus) {
                            last.column[1] = last.column_focus;
                        }

                        columnseleted = [col_index, last.column[1]];
                    } else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [col_index, last.column[0]];
                    } else {
                        left = last.left;
                        width = col - last.left - 1;

                        if (last.column[0] < last.column_focus) {
                            last.column[0] = last.column_focus;
                        }

                        columnseleted = [last.column[0], col_index];
                    }

                    let changeparam = menuButton.mergeMoveMain(
                        columnseleted,
                        rowseleted,
                        last,
                        top,
                        height,
                        left,
                        width,
                    );
                    if (changeparam != null) {
                        columnseleted = changeparam[0];
                        rowseleted = changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                        left = changeparam[4];
                        width = changeparam[5];
                    }

                    last["row"] = rowseleted;
                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;
                    last["top_move"] = top;
                    last["height_move"] = height;

                    Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1] = last;

                    //交替颜色选择范围
                    if ($("#luckysheet-alternateformat-rangeDialog").is(":visible")) {
                        $("#luckysheet-alternateformat-rangeDialog input").val(
                            getRangetxt(Store.currentSheetIndex, Store.luckysheet_select_save),
                        );
                    }

                    if (pivotTable.luckysheet_pivotTable_select_state) {
                        $("#luckysheet-pivotTable-range-selection-input").val(
                            Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].name +
                                "!" +
                                chatatABC(Store.luckysheet_select_save[0]["column"][0]) +
                                (Store.luckysheet_select_save[0]["row"][0] + 1) +
                                ":" +
                                chatatABC(Store.luckysheet_select_save[0]["column"][1]) +
                                (Store.luckysheet_select_save[0]["row"][1] + 1),
                        );
                    }
                } else if (event.ctrlKey) {
                    //选区添加
                    Store.luckysheet_select_save.push({
                        left: col_pre,
                        width: col - col_pre - 1,
                        top: row_pre,
                        height: row - row_pre - 1,
                        left_move: col_pre,
                        width_move: col - col_pre - 1,
                        top_move: row_pre,
                        height_move: row - row_pre - 1,
                        row: [row_index, row_index_ed],
                        column: [col_index, col_index_ed],
                        row_focus: row_index,
                        column_focus: col_index,
                    });
                } else {
                    Store.luckysheet_select_save.length = 0;
                    Store.luckysheet_select_save.push({
                        left: col_pre,
                        width: col - col_pre - 1,
                        top: row_pre,
                        height: row - row_pre - 1,
                        left_move: col_pre,
                        width_move: col - col_pre - 1,
                        top_move: row_pre,
                        height_move: row - row_pre - 1,
                        row: [row_index, row_index_ed],
                        column: [col_index, col_index_ed],
                        row_focus: row_index,
                        column_focus: col_index,
                    });

                    //单元格格式icon对应
                    menuButton.menuButtonFocus(Store.flowdata, row_index, col_index);
                    //函数公式显示栏
                    formula.fucntionboxshow(row_index, col_index);
                }

                selectHightlightShow();

                if (luckysheetFreezen.freezenhorizontaldata != null || luckysheetFreezen.freezenverticaldata != null) {
                    luckysheetFreezen.scrollAdaptOfselect();
                }

                if (!browser.mobilecheck()) {
                    //非移动端聚焦输入框
                    luckysheetactiveCell();
                }

                //允许编辑后的后台更新时
                server.saveParam("mv", Store.currentSheetIndex, Store.luckysheet_select_save);
            }

            //交替颜色
            if (alternateformat.rangefocus) {
                alternateformat.rangefocus = false;
                $("#luckysheet-alternateformat-range .fa-table").click();
            }

            $("#luckysheet-row-count-show, #luckysheet-column-count-show").hide();

            if (!isEditMode()) {
                //chartMix 隐藏当前页的数据选择区域高亮
                hideAllNeedRangeShow();
            }

            // selectHelpboxFill();

            //数据透视表
            pivotTable.pivotclick(row_index, col_index, Store.currentSheetIndex);

            luckysheetContainerFocus();

            method.createHookFunction(
                "cellMousedown",
                Store.flowdata[row_index][col_index],
                {
                    r: row_index,
                    c: col_index,
                    start_r: row_pre,
                    start_c: col_pre,
                    end_r: row,
                    end_c: col,
                },
                sheetFile,
                luckysheetTableContent,
            );

            //$("#luckysheet-cols-h-c .luckysheet-cols-h-cells-c .luckysheet-cols-h-cells-clip .luckysheet-cols-h-cell-sel").removeClass("luckysheet-cols-h-cell-sel").addClass("luckysheet-cols-h-cell-nosel");

            //$("#luckysheet-rows-h .luckysheet-rows-h-cells .luckysheet-rows-h-cells-c .luckysheet-rows-h-cells-clip .luckysheet-rows-h-cell-sel").removeClass("luckysheet-rows-h-cell-sel").addClass("luckysheet-rows-h-cell-nosel");

            //$("#luckysheet-cols-h-c .luckysheet-cols-h-cells-c .luckysheet-cols-h-cells-clip .luckysheet-cols-h-cell-nosel").eq(col_index).removeClass("luckysheet-cols-h-cell-nosel").addClass("luckysheet-cols-h-cell-sel");

            //$("#luckysheet-rows-h .luckysheet-rows-h-cells .luckysheet-rows-h-cells-c .luckysheet-rows-h-cells-clip .luckysheet-rows-h-cell-nosel").eq(row_index).removeClass("luckysheet-rows-h-cell-nosel").addClass("luckysheet-rows-h-cell-sel");

            //event.stopImmediatePropagation();
        })
        .mouseup(function(event) {
            if (event.which == "3") {
                //禁止前台编辑(只可 框选单元格、滚动查看表格)
                if (!Store.allowEdit) {
                    return;
                }

                if (isEditMode()) {
                    //非编辑模式下禁止右键功能框
                    return;
                }

                let x = event.pageX;
                let y = event.pageY;
                let data = Store.flowdata;

                let obj_s = Store.luckysheet_select_save[0];

                const cellRightClickConfig = luckysheetConfigsetting.cellRightClickConfig;

                $("#luckysheet-cols-rows-data").show();
                $("#luckysheet-cols-rows-handleincell").show();
                $("#luckysheet-cols-rows-add, #luckysheet-cols-rows-shift").hide();

                $$("#luckysheet-cols-rows-data .luckysheet-menuseparator").style.display = "block";
                $$("#luckysheet-cols-rows-handleincell .luckysheet-menuseparator").style.display = "block";

                if (obj_s["row"] != null && obj_s["row"][0] == 0 && obj_s["row"][1] == Store.flowdata.length - 1) {
                    // 如果全部按钮都隐藏，则整个菜单容器也要隐藏
                    if (
                        !cellRightClickConfig.copy &&
                        !cellRightClickConfig.copyAs &&
                        !cellRightClickConfig.paste &&
                        !cellRightClickConfig.insertColumn &&
                        !cellRightClickConfig.deleteColumn &&
                        !cellRightClickConfig.hideColumn &&
                        !cellRightClickConfig.columnWidth &&
                        !cellRightClickConfig.clear &&
                        !cellRightClickConfig.matrix &&
                        !cellRightClickConfig.sort &&
                        !cellRightClickConfig.filter &&
                        !cellRightClickConfig.chart &&
                        !cellRightClickConfig.image &&
                        !cellRightClickConfig.link &&
                        !cellRightClickConfig.data &&
                        !cellRightClickConfig.cellFormat
                    ) {
                        return;
                    }

                    Store.luckysheetRightHeadClickIs = "column";

                    $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word").text(locale().rightclick.column);
                    $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-size").text(locale().rightclick.width);
                    $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left").text(locale().rightclick.left);
                    $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right").text(locale().rightclick.right);

                    $("#luckysheet-cols-rows-add").show();
                    // $("#luckysheet-cols-rows-data").show();
                    $("#luckysheet-cols-rows-shift").hide();
                    $("#luckysheet-cols-rows-handleincell").hide();
                    Store.luckysheet_cols_menu_status = true;

                    $$("#luckysheet-cols-rows-add .luckysheet-menuseparator").style.display = "block";

                    // 自定义右键菜单：向左向右增加列，删除列，隐藏显示列，设置列宽
                    $$("#luckysheet-top-left-add-selected").style.display = cellRightClickConfig.insertColumn
                        ? "block"
                        : "none";
                    $$("#luckysheet-bottom-right-add-selected").style.display = cellRightClickConfig.insertColumn
                        ? "block"
                        : "none";
                    $$("#luckysheet-del-selected").style.display = cellRightClickConfig.deleteColumn ? "block" : "none";
                    $$("#luckysheet-hide-selected").style.display = cellRightClickConfig.hideColumn ? "block" : "none";
                    $$("#luckysheet-show-selected").style.display = cellRightClickConfig.hideColumn ? "block" : "none";
                    $$("#luckysheet-column-row-width-selected").style.display = cellRightClickConfig.columnWidth
                        ? "block"
                        : "none";

                    // 1. 当一个功能菜单块上方的功能块按钮都隐藏的时候，下方的功能块的顶部分割线也需要隐藏
                    if (!cellRightClickConfig.copy && !cellRightClickConfig.copyAs && !cellRightClickConfig.paste) {
                        $$("#luckysheet-cols-rows-add .luckysheet-menuseparator").style.display = "none";

                        if (
                            !cellRightClickConfig.insertColumn &&
                            !cellRightClickConfig.deleteColumn &&
                            !cellRightClickConfig.hideColumn &&
                            !cellRightClickConfig.columnWidth
                        ) {
                            $$("#luckysheet-cols-rows-data .luckysheet-menuseparator").style.display = "none";
                        }
                    }

                    // 2.当一个功能菜单块内所有的按钮都隐藏的时候，它顶部的分割线也需要隐藏掉
                    if (
                        !cellRightClickConfig.insertColumn &&
                        !cellRightClickConfig.deleteColumn &&
                        !cellRightClickConfig.hideColumn &&
                        !cellRightClickConfig.columnWidth
                    ) {
                        $$("#luckysheet-cols-rows-add .luckysheet-menuseparator").style.display = "none";
                    }

                    //列宽默认值
                    let cfg = $.extend(true, {}, Store.config);
                    if (cfg["columnlen"] == null) {
                        cfg["columnlen"] = {};
                    }

                    let first_collen =
                        cfg["columnlen"][Store.luckysheet_select_save[0].column[0]] == null
                            ? Store.defaultcollen
                            : cfg["columnlen"][Store.luckysheet_select_save[0].column[0]];
                    let isSame = true;

                    for (let i = 0; i < Store.luckysheet_select_save.length; i++) {
                        let s = Store.luckysheet_select_save[i];
                        let c1 = s.column[0],
                            c2 = s.column[1];

                        for (let c = c1; c <= c2; c++) {
                            let collen = cfg["columnlen"][c] == null ? Store.defaultcollen : cfg["columnlen"][c];

                            if (collen != first_collen) {
                                isSame = false;
                                break;
                            }
                        }
                    }

                    // if (isSame) {
                    //     $("#luckysheet-cols-rows-add")
                    //         .find("input[type='number'].rcsize")
                    //         .val(first_collen);
                    // } else {
                    //     $("#luckysheet-cols-rows-add")
                    //         .find("input[type='number'].rcsize")
                    //         .val("");
                    // }
                } else if (
                    obj_s["column"] != null &&
                    obj_s["column"][0] == 0 &&
                    obj_s["column"][1] == Store.flowdata[0].length - 1
                ) {
                    // 如果全部按钮都隐藏，则整个菜单容器也要隐藏
                    if (
                        !cellRightClickConfig.copy &&
                        !cellRightClickConfig.copyAs &&
                        !cellRightClickConfig.paste &&
                        !cellRightClickConfig.insertRow &&
                        !cellRightClickConfig.deleteRow &&
                        !cellRightClickConfig.hideRow &&
                        !cellRightClickConfig.rowHeight &&
                        !cellRightClickConfig.clear &&
                        !cellRightClickConfig.matrix &&
                        !cellRightClickConfig.sort &&
                        !cellRightClickConfig.filter &&
                        !cellRightClickConfig.chart &&
                        !cellRightClickConfig.image &&
                        !cellRightClickConfig.link &&
                        !cellRightClickConfig.data &&
                        !cellRightClickConfig.cellFormat
                    ) {
                        return;
                    }

                    Store.luckysheetRightHeadClickIs = "row";

                    $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word").text(locale().rightclick.row);
                    $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-size").text(locale().rightclick.height);
                    $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left").text(locale().rightclick.top);
                    $("#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right").text(locale().rightclick.bottom);
                    $("#luckysheet-cols-rows-add").show();
                    // $("#luckysheet-cols-rows-data").show();
                    $("#luckysheet-cols-rows-shift").hide();
                    $("#luckysheet-cols-rows-handleincell").hide();
                    Store.luckysheet_cols_menu_status = true;

                    $$("#luckysheet-cols-rows-add .luckysheet-menuseparator").style.display = "block";

                    // 自定义右键菜单：向上向下增加行，删除行，隐藏显示行，设置行高
                    $$("#luckysheet-top-left-add-selected").style.display = cellRightClickConfig.insertRow
                        ? "block"
                        : "none";
                    $$("#luckysheet-bottom-right-add-selected").style.display = cellRightClickConfig.insertRow
                        ? "block"
                        : "none";
                    $$("#luckysheet-del-selected").style.display = cellRightClickConfig.deleteRow ? "block" : "none";
                    $$("#luckysheet-hide-selected").style.display = cellRightClickConfig.hideRow ? "block" : "none";
                    $$("#luckysheet-show-selected").style.display = cellRightClickConfig.hideRow ? "block" : "none";
                    $$("#luckysheet-column-row-width-selected").style.display = cellRightClickConfig.rowHeight
                        ? "block"
                        : "none";

                    // 1. 当一个功能菜单块上方的功能块按钮都隐藏的时候，下方的功能块的顶部分割线也需要隐藏
                    if (!cellRightClickConfig.copy && !cellRightClickConfig.copyAs && !cellRightClickConfig.paste) {
                        $$("#luckysheet-cols-rows-add .luckysheet-menuseparator").style.display = "none";

                        if (
                            !cellRightClickConfig.insertRow &&
                            !cellRightClickConfig.deleteRow &&
                            !cellRightClickConfig.hideRow &&
                            !cellRightClickConfig.rowHeight
                        ) {
                            $$("#luckysheet-cols-rows-data .luckysheet-menuseparator").style.display = "none";
                        }
                    }

                    // 2. 当一个功能菜单块内所有的按钮都隐藏的时候，它顶部的分割线也需要隐藏掉
                    if (
                        !cellRightClickConfig.insertRow &&
                        !cellRightClickConfig.deleteRow &&
                        !cellRightClickConfig.hideRow &&
                        !cellRightClickConfig.rowHeight
                    ) {
                        $$("#luckysheet-cols-rows-add .luckysheet-menuseparator").style.display = "none";
                    }

                    //行高默认值
                    let cfg = $.extend(true, {}, Store.config);
                    if (cfg["rowlen"] == null) {
                        cfg["rowlen"] = {};
                    }

                    let first_rowlen =
                        cfg["rowlen"][Store.luckysheet_select_save[0].row[0]] == null
                            ? Store.defaultrowlen
                            : cfg["rowlen"][Store.luckysheet_select_save[0].row[0]];
                    let isSame = true;

                    for (let i = 0; i < Store.luckysheet_select_save.length; i++) {
                        let s = Store.luckysheet_select_save[i];
                        let r1 = s.row[0],
                            r2 = s.row[1];

                        for (let r = r1; r <= r2; r++) {
                            let rowlen = cfg["rowlen"][r] == null ? Store.defaultrowlen : cfg["rowlen"][r];

                            if (rowlen != first_rowlen) {
                                isSame = false;
                                break;
                            }
                        }
                    }

                    if (isSame) {
                        $("#luckysheet-cols-rows-add")
                            .find("input[type='number'].rcsize")
                            .val(first_rowlen);
                    } else {
                        $("#luckysheet-cols-rows-add")
                            .find("input[type='number'].rcsize")
                            .val("");
                    }
                } else {
                    // 如果全部按钮都隐藏，则整个菜单容器也要隐藏
                    if (
                        !cellRightClickConfig.copy &&
                        !cellRightClickConfig.copyAs &&
                        !cellRightClickConfig.paste &&
                        !cellRightClickConfig.insertRow &&
                        !cellRightClickConfig.insertColumn &&
                        !cellRightClickConfig.deleteRow &&
                        !cellRightClickConfig.deleteColumn &&
                        !cellRightClickConfig.deleteCell &&
                        !cellRightClickConfig.clear &&
                        !cellRightClickConfig.matrix &&
                        !cellRightClickConfig.sort &&
                        !cellRightClickConfig.filter &&
                        !cellRightClickConfig.chart &&
                        !cellRightClickConfig.image &&
                        !cellRightClickConfig.link &&
                        !cellRightClickConfig.data &&
                        !cellRightClickConfig.cellFormat
                    ) {
                        return;
                    }

                    // 当一个功能菜单块上方的功能块按钮都隐藏的时候，下方的功能块的顶部分割线也需要隐藏
                    if (!cellRightClickConfig.copy && !cellRightClickConfig.copyAs && !cellRightClickConfig.paste) {
                        $$("#luckysheet-cols-rows-handleincell .luckysheet-menuseparator").style.display = "none";

                        if (
                            !cellRightClickConfig.insertRow &&
                            !cellRightClickConfig.insertColumn &&
                            !cellRightClickConfig.deleteRow &&
                            !cellRightClickConfig.deleteColumn &&
                            !cellRightClickConfig.deleteCell
                        ) {
                            $$("#luckysheet-cols-rows-data .luckysheet-menuseparator").style.display = "none";
                        }
                    }

                    if (
                        !cellRightClickConfig.insertRow &&
                        !cellRightClickConfig.insertColumn &&
                        !cellRightClickConfig.deleteRow &&
                        !cellRightClickConfig.deleteColumn &&
                        !cellRightClickConfig.deleteCell
                    ) {
                        $$("#luckysheet-cols-rows-handleincell .luckysheet-menuseparator").style.display = "none";
                    }
                }

                // 当一个功能菜单块内所有的按钮都隐藏的时候，它顶部的分割线也需要隐藏掉
                if (
                    !cellRightClickConfig.clear &&
                    !cellRightClickConfig.matrix &&
                    !cellRightClickConfig.sort &&
                    !cellRightClickConfig.filter &&
                    !cellRightClickConfig.chart &&
                    !cellRightClickConfig.image &&
                    !cellRightClickConfig.link &&
                    !cellRightClickConfig.data &&
                    !cellRightClickConfig.cellFormat
                ) {
                    $$("#luckysheet-cols-rows-data .luckysheet-menuseparator").style.display = "none";
                }

                showrightclickmenu($("#luckysheet-rightclick-menu"), x, y);
            }

            // 备注：在mousedown中发送光标信息会漏处理部分(选区)范围
            server.saveParam("mv", Store.currentSheetIndex, Store.luckysheet_select_save);
        })
        .dblclick(function(event) { // 双击进入单元格执行的是这个方法
            if ($(event.target).hasClass("luckysheet-mousedown-cancel")) {
                return;
            }

            //禁止前台编辑(只可 框选单元格、滚动查看表格)
            if (!Store.allowEdit) {
                return;
            }

            if (parseInt($("#luckysheet-input-box").css("top")) > 0) {
                return;
            }

            let mouse = mouseposition(event.pageX, event.pageY);
            if (
                mouse[0] >= Store.cellmainWidth - Store.cellMainSrollBarSize ||
                mouse[1] >= Store.cellmainHeight - Store.cellMainSrollBarSize
            ) {
                return;
            }

            let scrollLeft = $("#luckysheet-cell-main").scrollLeft(),
                scrollTop = $("#luckysheet-cell-main").scrollTop();
            let x = mouse[0] + scrollLeft;
            let y = mouse[1] + scrollTop;

            if (
                luckysheetFreezen.freezenverticaldata != null &&
                mouse[0] < luckysheetFreezen.freezenverticaldata[0] - luckysheetFreezen.freezenverticaldata[2]
            ) {
                x = mouse[0] + luckysheetFreezen.freezenverticaldata[2];
            }

            if (
                luckysheetFreezen.freezenhorizontaldata != null &&
                mouse[1] < luckysheetFreezen.freezenhorizontaldata[0] - luckysheetFreezen.freezenhorizontaldata[2]
            ) {
                y = mouse[1] + luckysheetFreezen.freezenhorizontaldata[2];
            }

            let row_location = rowLocation(y),
                row_index = row_location[2];

            let col_location = colLocation(x),
                col_index = col_location[2];

            let margeset = menuButton.mergeborer(Store.flowdata, row_index, col_index);
            if (!!margeset) {
                row_index = margeset.row[2];
                col_index = margeset.column[2];
            }

            if (pivotTable.isPivotRange(row_index, col_index)) {
                //数据透视表没有 任何数据
                if (
                    (pivotTable.filter == null || pivotTable.filter.length == 0) &&
                    (pivotTable.row == null || pivotTable.row.length == 0) &&
                    (pivotTable.column == null || pivotTable.column.length == 0) &&
                    (pivotTable.values == null || pivotTable.values.length == 0)
                ) {
                    return;
                }

                //数据透视表没有 数值数据
                if (pivotTable.values == null || pivotTable.values.length == 0) {
                    return;
                }

                //点击位置不是 数值数据 所在区域
                if (row_index == 0 || col_index == 0) {
                    return;
                }

                if (pivotTable.column != null && pivotTable.column.length > 0) {
                    if (pivotTable.values.length >= 2 && pivotTable.showType == "column") {
                        if (
                            row_index <= pivotTable.column.length ||
                            col_index >= pivotTable.pivotDatas[0].length - pivotTable.values.length
                        ) {
                            return;
                        }
                    } else {
                        if (
                            row_index <= pivotTable.column.length - 1 ||
                            col_index >= pivotTable.pivotDatas[0].length - 1
                        ) {
                            return;
                        }
                    }
                }

                if (pivotTable.row != null && pivotTable.row.length > 0) {
                    if (pivotTable.values.length >= 2 && pivotTable.showType == "row") {
                        if (
                            col_index <= pivotTable.row.length ||
                            row_index >= pivotTable.pivotDatas.length - pivotTable.values.length
                        ) {
                            return;
                        }
                    } else {
                        if (col_index <= pivotTable.row.length - 1 || row_index >= pivotTable.pivotDatas.length - 1) {
                            return;
                        }
                    }
                }

                sheetmanage.addNewSheet(event);

                pivotTable.drillDown(row_index, col_index);
                return;
            }

            if (
                $("#luckysheet-search-formula-parm").is(":visible") ||
                $("#luckysheet-search-formula-parm-select").is(":visible")
            ) {
                //公式参数栏显示
                $("#luckysheet-cell-selected").hide();
            } else if (
                $("#luckysheet-conditionformat-dialog").is(":visible") ||
                $("#luckysheet-administerRule-dialog").is(":visible") ||
                $("#luckysheet-newConditionRule-dialog").is(":visible") ||
                $("#luckysheet-editorConditionRule-dialog").is(":visible") ||
                $("#luckysheet-singleRange-dialog").is(":visible") ||
                $("#luckysheet-multiRange-dialog").is(":visible")
            ) {
                //条件格式
                return;
            } else if (
                $("#luckysheet-modal-dialog-slider-alternateformat").is(":visible") ||
                $("#luckysheet-alternateformat-rangeDialog").is(":visible")
            ) {
                //交替颜色
                return;
            } else {
                if (menuButton.luckysheetPaintModelOn) {
                    menuButton.cancelPaintModel();
                }

                // 检查当前坐标和焦点坐标是否一致，如果不一致那么进行修正
                let column_focus = Store.luckysheet_select_save[0]["column_focus"];
                let row_focus = Store.luckysheet_select_save[0]["row_focus"];
                if (column_focus !== col_index || row_focus !== row_index) {
                    row_index = row_focus;
                    col_index = column_focus;
                }
                luckysheetupdateCell(row_index, col_index, Store.flowdata);

                /* 设置选区高亮 */
                selectHightlightShow();
            }
        });

    //监听拖拽
    document.getElementById("luckysheet-cell-main").addEventListener(
        "drop",
        function(e) {
            e.preventDefault();
            e.stopPropagation();

            let files = e.dataTransfer.files;

            //拖拽插入图片
            if (files.length == 1 && files[0].type.indexOf("image") > -1) {
                if (!checkProtectionAuthorityNormal(Store.currentSheetIndex, "editObjects")) {
                    return;
                }
                imageCtrl.insertImg(files[0]);
            }
            handleCellDragStopEvent(e);
        },
        false,
    );
    document.getElementById("luckysheet-cell-main").addEventListener(
        "dragover",
        function(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        false,
    );

    /**
     * 处理单元格上鼠标拖拽停止事件
     * @param {DragEvent} event
     */
    function handleCellDragStopEvent(event) {
        if (luckysheetConfigsetting && luckysheetConfigsetting.hook && luckysheetConfigsetting.hook.cellDragStop) {
            let mouse = mouseposition(event.pageX, event.pageY);
            let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
            let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

            let row_location = rowLocation(y),
                row = row_location[1],
                row_pre = row_location[0],
                row_index = row_location[2];
            let col_location = colLocation(x),
                col = col_location[1],
                col_pre = col_location[0],
                col_index = col_location[2];

            let margeset = menuButton.mergeborer(Store.flowdata, row_index, col_index);
            if (!!margeset) {
                row = margeset.row[1];
                row_pre = margeset.row[0];
                row_index = margeset.row[2];

                col = margeset.column[1];
                col_pre = margeset.column[0];
                col_index = margeset.column[2];
            }

            let sheetFile = sheetmanage.getSheetByIndex();

            let luckysheetTableContent = $("#luckysheetTableContent")
                .get(0)
                .getContext("2d");
            method.createHookFunction(
                "cellDragStop",
                Store.flowdata[row_index][col_index],
                {
                    r: row_index,
                    c: col_index,
                    start_r: row_pre,
                    start_c: col_pre,
                    end_r: row,
                    end_c: col,
                },
                sheetFile,
                luckysheetTableContent,
                event,
            );
        }
    }

    //表格mousemove
    $(document).on("mousemove.luckysheetEvent", function(event) {
        luckysheetPostil.overshow(event); //有批注显示
        hyperlinkCtrl.overshow(event); //链接提示显示

        window.cancelAnimationFrame(Store.jfautoscrollTimeout);

        if (luckysheetConfigsetting && luckysheetConfigsetting.hook && luckysheetConfigsetting.hook.sheetMousemove) {
            let mouse = mouseposition(event.pageX, event.pageY);
            let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
            let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

            let row_location = rowLocation(y),
                row = row_location[1],
                row_pre = row_location[0],
                row_index = row_location[2];
            let col_location = colLocation(x),
                col = col_location[1],
                col_pre = col_location[0],
                col_index = col_location[2];

            let margeset = menuButton.mergeborer(Store.flowdata, row_index, col_index);
            if (!!margeset) {
                row = margeset.row[1];
                row_pre = margeset.row[0];
                row_index = margeset.row[2];

                col = margeset.column[1];
                col_pre = margeset.column[0];
                col_index = margeset.column[2];
            }

            // if(Store.flowdata[row_index] && Store.flowdata[row_index][col_index]){
            let sheetFile = sheetmanage.getSheetByIndex();

            let moveState = {
                functionResizeStatus: formula.functionResizeStatus,
                horizontalmoveState: !!luckysheetFreezen.horizontalmovestate,
                verticalmoveState: !!luckysheetFreezen.verticalmovestate,
                pivotTableMoveState: !!pivotTable && pivotTable.movestate,
                sheetMoveStatus: Store.luckysheet_sheet_move_status,
                scrollStatus: !!Store.luckysheet_scroll_status,
                selectStatus: !!Store.luckysheet_select_status,
                rowsSelectedStatus: !!Store.luckysheet_rows_selected_status,
                colsSelectedStatus: !!Store.luckysheet_cols_selected_status,
                cellSelectedMove: !!Store.luckysheet_cell_selected_move,
                cellSelectedExtend: !!Store.luckysheet_cell_selected_extend,
                colsChangeSize: !!Store.luckysheet_cols_change_size,
                rowsChangeSize: !!Store.luckysheet_rows_change_size,
                chartMove: !!Store.chartparam.luckysheetCurrentChartMove,
                chartResize: !!Store.chartparam.luckysheetCurrentChartResize,
                rangeResize: !!formula.rangeResize,
                rangeMove: !!formula.rangeMove,
            };

            let luckysheetTableContent = $("#luckysheetTableContent")
                .get(0)
                .getContext("2d");

            if (Store.flowdata && Store.flowdata[row_index]) {
                method.createHookFunction(
                    "sheetMousemove",
                    Store.flowdata[row_index][col_index],
                    {
                        r: row_index,
                        c: col_index,
                        start_r: row_pre,
                        start_c: col_pre,
                        end_r: row,
                        end_c: col,
                    },
                    sheetFile,
                    moveState,
                    luckysheetTableContent,
                );
            }
            // }
        }

        if (formula.functionResizeStatus) {
            let y = event.pageY;
            let movepx = y - formula.functionResizeData.y;
            let mpx = formula.functionResizeData.calculatebarHeight + movepx;
            let winh = Math.round($(window).height() / 2);

            if (mpx <= 28) {
                if (mpx <= 20) {
                    return;
                }
                mpx = 28;
            } else if (mpx >= winh) {
                if (mpx >= winh + 8) {
                    return;
                }
                mpx = winh;
            }

            Store.calculatebarHeight = mpx;
            $("#luckysheet-wa-calculate").css("height", Store.calculatebarHeight - 2);
            $("#luckysheet-wa-calculate-size").css({ background: "#5e5e5e", cursor: "ns-resize" });

            clearTimeout(formula.functionResizeTimeout);
            formula.functionResizeTimeout = setTimeout(function() {
                luckysheetsizeauto();
            }, 15);
        } else if (!!luckysheetFreezen.horizontalmovestate) {
            let mouse = mouseposition(event.pageX, event.pageY);
            let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            let scrollTop = $("#luckysheet-cell-main").scrollTop();
            let x = mouse[0] + scrollLeft;
            let y = mouse[1] + scrollTop;

            let row_location = rowLocation(y),
                row = row_location[1],
                row_pre = row_location[0],
                row_index = row_location[2];
            let top = mouse[1] + Store.columnHeaderHeight;

            if (top < Store.columnHeaderHeight) {
                top = Store.columnHeaderHeight;
            }

            if (top > luckysheetFreezen.windowHeight - 4) {
                top = luckysheetFreezen.windowHeight - 4;
            }

            $("#luckysheet-freezebar-horizontal")
                .find(".luckysheet-freezebar-horizontal-handle")
                .css({ top: top });

            if (top + scrollTop - Store.columnHeaderHeight >= row_pre + (row - row_pre) / 2) {
                top = row - 2 - scrollTop + Store.columnHeaderHeight;
                luckysheetFreezen.freezenhorizontaldata = [
                    row,
                    row_index + 1,
                    scrollTop,
                    luckysheetFreezen.cutVolumn(Store.visibledatarow, row_index + 1),
                    top,
                ];
            } else {
                top = row_pre - 2 - scrollTop + Store.columnHeaderHeight;
                luckysheetFreezen.freezenhorizontaldata = [
                    row_pre,
                    row_index,
                    scrollTop,
                    luckysheetFreezen.cutVolumn(Store.visibledatarow, row_index),
                    top,
                ];
            }

            $("#luckysheet-freezebar-horizontal")
                .find(".luckysheet-freezebar-horizontal-drop")
                .css({ top: top });
            luckysheetFreezen.saveFreezen(luckysheetFreezen.freezenhorizontaldata, top, null, null);
        } else if (!!luckysheetFreezen.verticalmovestate) {
            let mouse = mouseposition(event.pageX, event.pageY);
            let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            let scrollTop = $("#luckysheet-cell-main").scrollTop();
            let x = mouse[0] + scrollLeft;
            let y = mouse[1] + scrollTop;

            let col_location = colLocation(x),
                col = col_location[1],
                col_pre = col_location[0],
                col_index = col_location[2];

            let left = mouse[0] + Store.rowHeaderWidth;

            if (left < Store.rowHeaderWidth) {
                left = Store.rowHeaderWidth;
            }

            if (left > luckysheetFreezen.windowWidth - 4) {
                left = luckysheetFreezen.windowWidth - 4;
            }

            $("#luckysheet-freezebar-vertical")
                .find(".luckysheet-freezebar-vertical-handle")
                .css({ left: left });

            if (left + scrollLeft - Store.rowHeaderWidth >= col_pre + (col - col_pre) / 2) {
                left = col - 2 - scrollLeft + Store.rowHeaderWidth;
                luckysheetFreezen.freezenverticaldata = [
                    col,
                    col_index + 1,
                    scrollLeft,
                    luckysheetFreezen.cutVolumn(Store.visibledatacolumn, col_index + 1),
                    left,
                ];
            } else {
                left = col_pre - 2 - scrollLeft + Store.rowHeaderWidth;
                luckysheetFreezen.freezenverticaldata = [
                    col_pre,
                    col_index,
                    scrollLeft,
                    luckysheetFreezen.cutVolumn(Store.visibledatacolumn, col_index),
                    left,
                ];
            }

            $("#luckysheet-freezebar-vertical")
                .find(".luckysheet-freezebar-vertical-drop")
                .css({ left: left });
            luckysheetFreezen.saveFreezen(null, null, luckysheetFreezen.freezenverticaldata, left);
            luckysheetsizeauto(); //调节选区时下部单元格溢出
        } else if (!!pivotTable && pivotTable.movestate) {
            let x = event.pageX,
                y = event.pageY;
            $("#luckysheet-modal-dialog-slider-pivot-move").css({
                left: x - pivotTable.movesave.width / 2,
                top: y - pivotTable.movesave.height,
            });
        } else if (Store.luckysheet_sheet_move_status) {
            let scrollLeft = $("#luckysheet-sheet-container-c").scrollLeft();
            let x = event.pageX + scrollLeft;

            if (Math.abs(event.pageX - Store.luckysheet_sheet_move_data.pageX) < 3) {
                return;
            }

            let winW = $("#luckysheet-sheet-container").width();
            let left = x - Store.luckysheet_sheet_move_data.curleft - $("#luckysheet-sheet-container").offset().left;
            Store.luckysheet_sheet_move_data.activeobject.css({ left: left });

            let row_index = luckysheet_searcharray(
                Store.luckysheet_sheet_move_data.widthlist,
                left + Store.luckysheet_sheet_move_data.curleft,
            );
            Store.luckysheet_sheet_move_data.cursorobject.css({ cursor: "move" });

            if (left - scrollLeft <= 6) {
                $("#luckysheet-sheets-leftscroll").click();
            }

            if (left - scrollLeft >= winW - 40) {
                $("#luckysheet-sheets-rightscroll").click();
            }

            if (row_index != Store.luckysheet_sheet_move_data.curindex) {
                if (row_index == -1 && left > 0) {
                    row_index = Store.luckysheet_sheet_move_data.widthlist.length - 1;
                    $("#luckysheet-sheets-item-clone").insertAfter(
                        $("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").eq(row_index),
                    );
                } else if (row_index == -1 && left <= 0) {
                    $("#luckysheet-sheets-item-clone").insertBefore(
                        $("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").eq(0),
                    );
                } else {
                    $("#luckysheet-sheets-item-clone").insertAfter(
                        $("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").eq(row_index),
                    );
                }

                Store.luckysheet_sheet_move_data.widthlist = [];
                $("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").each(function(i) {
                    if (i == 0) {
                        Store.luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth()));
                    } else {
                        Store.luckysheet_sheet_move_data.widthlist.push(
                            parseInt($(this).outerWidth()) + Store.luckysheet_sheet_move_data.widthlist[i - 1],
                        );
                    }
                });

                Store.luckysheet_sheet_move_data.curindex = $(
                    "#luckysheet-sheet-area div.luckysheet-sheets-item:visible",
                ).index($("#luckysheet-sheets-item-clone"));
            }
        } else if (Store.luckysheet_model_move_state) {
            let scrollTop = $(document).scrollTop(),
                scrollLeft = $(document).scrollLeft();
            let y = event.pageY + scrollTop,
                x = event.pageX + scrollLeft;
            let winH = $(window).height(),
                winW = $(window).width();
            let myh = Store.luckysheet_model_move_obj.height(),
                myw = Store.luckysheet_model_move_obj.width();
            let top = y - Store.luckysheet_model_xy[1],
                left = x - Store.luckysheet_model_xy[0];

            if (top < 0) {
                top = 0;
            }

            if (top + myh + 62 > winH) {
                top = winH - myh - 62;
            }

            if (left < 0) {
                left = 0;
            }

            if (left + myw + 86 > winW) {
                left = winW - myw - 86;
            }

            Store.luckysheet_model_move_obj.css({ top: top, left: left });
            event.preventDefault();
        } else if (
            !!Store.luckysheet_scroll_status ||
            !!Store.luckysheet_select_status ||
            !!Store.luckysheet_rows_selected_status ||
            !!Store.luckysheet_cols_selected_status ||
            !!Store.luckysheet_cell_selected_move ||
            !!Store.luckysheet_cell_selected_extend ||
            !!Store.luckysheet_cols_change_size ||
            !!Store.luckysheet_rows_change_size ||
            !!Store.chartparam.luckysheetCurrentChartMove ||
            !!Store.chartparam.luckysheetCurrentChartResize ||
            !!formula.rangeResize ||
            !!formula.rangeMove
        ) {
            if (Store.luckysheet_select_status) {
                clearTimeout(Store.countfuncTimeout);
                Store.countfuncTimeout = setTimeout(function() {
                    countfunc();
                }, 500);
            }

            function mouseRender() {
                if (
                    Store.luckysheet_scroll_status &&
                    !Store.luckysheet_cols_change_size &&
                    !Store.luckysheet_rows_change_size
                ) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let left = $("#luckysheet-scrollbar-x").scrollLeft(),
                        top = $("#luckysheet-scrollbar-y").scrollTop();
                    let x = mouse[0];
                    let y = mouse[1];
                    let winH = $("#luckysheet-cell-main").height() - 20 * Store.zoomRatio,
                        winW = $("#luckysheet-cell-main").width() - 60 * Store.zoomRatio;

                    if (y < 0 || y > winH) {
                        let stop;
                        if (y < 0) {
                            stop = top + y / 2;
                        } else {
                            stop = top + (y - winH) / 2;
                        }
                        $("#luckysheet-scrollbar-y").scrollTop(stop);
                    }

                    if (x < 0 || x > winW) {
                        let sleft;
                        if (x < 0) {
                            sleft = left + x / 2;
                        } else {
                            sleft = left + (x - winW) / 2;
                        }

                        $("#luckysheet-scrollbar-x").scrollLeft(sleft);
                    }
                }
                if (Store.luckysheet_select_status) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    let row_location = rowLocation(y),
                        row = row_location[1],
                        row_pre = row_location[0],
                        row_index = row_location[2];
                    let col_location = colLocation(x),
                        col = col_location[1],
                        col_pre = col_location[0],
                        col_index = col_location[2];

                    if (!checkProtectionSelectLockedOrUnLockedCells(row_index, col_index, Store.currentSheetIndex)) {
                        // Store.luckysheet_select_status = false;
                        return;
                    }

                    let last = $.extend(
                        true,
                        {},
                        Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1],
                    );

                    let top = 0,
                        height = 0,
                        rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;

                        if (last.row[1] > last.row_focus) {
                            last.row[1] = last.row_focus;
                        }

                        rowseleted = [row_index, last.row[1]];
                    } else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [row_index, last.row[0]];
                    } else {
                        top = last.top;
                        height = row - last.top - 1;

                        if (last.row[0] < last.row_focus) {
                            last.row[0] = last.row_focus;
                        }

                        rowseleted = [last.row[0], row_index];
                    }

                    let left = 0,
                        width = 0,
                        columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;

                        if (last.column[1] > last.column_focus) {
                            last.column[1] = last.column_focus;
                        }

                        columnseleted = [col_index, last.column[1]];
                    } else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [col_index, last.column[0]];
                    } else {
                        left = last.left;
                        width = col - last.left - 1;

                        if (last.column[0] < last.column_focus) {
                            last.column[0] = last.column_focus;
                        }

                        columnseleted = [last.column[0], col_index];
                    }

                    let changeparam = menuButton.mergeMoveMain(
                        columnseleted,
                        rowseleted,
                        last,
                        top,
                        height,
                        left,
                        width,
                    );
                    if (changeparam != null) {
                        columnseleted = changeparam[0];
                        rowseleted = changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                        left = changeparam[4];
                        width = changeparam[5];
                    }

                    last["row"] = rowseleted;
                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;
                    last["top_move"] = top;
                    last["height_move"] = height;

                    Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1] = last;

                    selectHightlightShow();
                    luckysheetFreezen.scrollFreezen();

                    // selectHelpboxFill();

                    //交替颜色选择范围
                    if ($("#luckysheet-alternateformat-rangeDialog").is(":visible")) {
                        $("#luckysheet-alternateformat-rangeDialog input").val(
                            getRangetxt(
                                Store.currentSheetIndex,
                                Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1],
                            ),
                        );
                    }

                    if (pivotTable.luckysheet_pivotTable_select_state) {
                        $("#luckysheet-pivotTable-range-selection-input").val(
                            Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].name +
                                "!" +
                                chatatABC(Store.luckysheet_select_save[0]["column"][0]) +
                                (Store.luckysheet_select_save[0]["row"][0] + 1) +
                                ":" +
                                chatatABC(Store.luckysheet_select_save[0]["column"][1]) +
                                (Store.luckysheet_select_save[0]["row"][1] + 1),
                        );
                    }
                } else if (conditionformat.selectStatus) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    let row_location = rowLocation(y),
                        row = row_location[1],
                        row_pre = row_location[0],
                        row_index = row_location[2];
                    let col_location = colLocation(x),
                        col = col_location[1],
                        col_pre = col_location[0],
                        col_index = col_location[2];

                    let last = conditionformat.selectRange[conditionformat.selectRange.length - 1];

                    let top = 0,
                        height = 0,
                        rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;

                        if (last.row[1] > last.row_focus) {
                            last.row[1] = last.row_focus;
                        }

                        rowseleted = [row_index, last.row[1]];
                    } else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [row_index, last.row[0]];
                    } else {
                        top = last.top;
                        height = row - last.top - 1;

                        if (last.row[0] < last.row_focus) {
                            last.row[0] = last.row_focus;
                        }

                        rowseleted = [last.row[0], row_index];
                    }

                    let left = 0,
                        width = 0,
                        columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;

                        if (last.column[1] > last.column_focus) {
                            last.column[1] = last.column_focus;
                        }

                        columnseleted = [col_index, last.column[1]];
                    } else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [col_index, last.column[0]];
                    } else {
                        left = last.left;
                        width = col - last.left - 1;

                        if (last.column[0] < last.column_focus) {
                            last.column[0] = last.column_focus;
                        }

                        columnseleted = [last.column[0], col_index];
                    }

                    let changeparam = menuButton.mergeMoveMain(
                        columnseleted,
                        rowseleted,
                        last,
                        top,
                        height,
                        left,
                        width,
                    );
                    if (changeparam != null) {
                        columnseleted = changeparam[0];
                        rowseleted = changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                        left = changeparam[4];
                        width = changeparam[5];
                    }

                    last["row"] = rowseleted;
                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;
                    last["top_move"] = top;
                    last["height_move"] = height;

                    conditionformat.selectRange[conditionformat.selectRange.length - 1] = last;

                    selectionCopyShow(conditionformat.selectRange);

                    let range = conditionformat.getTxtByRange(conditionformat.selectRange);
                    $("#luckysheet-multiRange-dialog input").val(range);
                } else if (dataVerificationCtrl.selectStatus) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    let row_location = rowLocation(y),
                        row = row_location[1],
                        row_pre = row_location[0],
                        row_index = row_location[2];
                    let col_location = colLocation(x),
                        col = col_location[1],
                        col_pre = col_location[0],
                        col_index = col_location[2];

                    let last = dataVerificationCtrl.selectRange[dataVerificationCtrl.selectRange.length - 1];

                    let top = 0,
                        height = 0,
                        rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;

                        if (last.row[1] > last.row_focus) {
                            last.row[1] = last.row_focus;
                        }

                        rowseleted = [row_index, last.row[1]];
                    } else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [row_index, last.row[0]];
                    } else {
                        top = last.top;
                        height = row - last.top - 1;

                        if (last.row[0] < last.row_focus) {
                            last.row[0] = last.row_focus;
                        }

                        rowseleted = [last.row[0], row_index];
                    }

                    let left = 0,
                        width = 0,
                        columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;

                        if (last.column[1] > last.column_focus) {
                            last.column[1] = last.column_focus;
                        }

                        columnseleted = [col_index, last.column[1]];
                    } else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [col_index, last.column[0]];
                    } else {
                        left = last.left;
                        width = col - last.left - 1;

                        if (last.column[0] < last.column_focus) {
                            last.column[0] = last.column_focus;
                        }

                        columnseleted = [last.column[0], col_index];
                    }

                    let changeparam = menuButton.mergeMoveMain(
                        columnseleted,
                        rowseleted,
                        last,
                        top,
                        height,
                        left,
                        width,
                    );
                    if (changeparam != null) {
                        columnseleted = changeparam[0];
                        rowseleted = changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                        left = changeparam[4];
                        width = changeparam[5];
                    }

                    last["row"] = rowseleted;
                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;
                    last["top_move"] = top;
                    last["height_move"] = height;

                    dataVerificationCtrl.selectRange[dataVerificationCtrl.selectRange.length - 1] = last;

                    selectionCopyShow(dataVerificationCtrl.selectRange);

                    let range = dataVerificationCtrl.getTxtByRange(dataVerificationCtrl.selectRange);
                    if (formula.rangetosheet && formula.rangetosheet != Store.currentSheetIndex) {
                        range = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].name + "!" + range;
                    }
                    $("#luckysheet-dataVerificationRange-dialog input").val(range);
                } else if (formula.rangestart) {
                    formula.rangedrag(event);
                } else if (formula.rangedrag_row_start) {
                    formula.rangedrag_row(event);
                } else if (formula.rangedrag_column_start) {
                    formula.rangedrag_column(event);
                } else if (Store.luckysheet_rows_selected_status) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let y = mouse[1] + $("#luckysheet-rows-h").scrollTop();
                    if (y < 0) {
                        return false;
                    }

                    let row_location = rowLocation(y),
                        row = row_location[1],
                        row_pre = row_location[0],
                        row_index = row_location[2];
                    let col_index = Store.visibledatacolumn.length - 1,
                        col = Store.visibledatacolumn[col_index],
                        col_pre = 0;

                    let last = $.extend(
                        true,
                        {},
                        Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1],
                    );

                    let top = 0,
                        height = 0,
                        rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;

                        if (last.row[1] > last.row_focus) {
                            last.row[1] = last.row_focus;
                        }

                        rowseleted = [row_index, last.row[1]];
                    } else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [row_index, last.row[0]];
                    } else {
                        top = last.top;
                        height = row - last.top - 1;

                        if (last.row[0] < last.row_focus) {
                            last.row[0] = last.row_focus;
                        }

                        rowseleted = [last.row[0], row_index];
                    }

                    last["row"] = rowseleted;

                    last["top_move"] = top;
                    last["height_move"] = height;

                    Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1] = last;

                    selectHightlightShow();
                    clearTimeout(Store.countfuncTimeout);
                    Store.countfuncTimeout = setTimeout(function() {
                        countfunc();
                    }, 500);
                } else if (Store.luckysheet_cols_selected_status) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let x = mouse[0] + $("#luckysheet-cols-h-c").scrollLeft();
                    if (x < 0) {
                        return false;
                    }

                    let row_index = Store.visibledatarow.length - 1,
                        row = Store.visibledatarow[row_index],
                        row_pre = 0;
                    let col_location = colLocation(x),
                        col = col_location[1],
                        col_pre = col_location[0],
                        col_index = col_location[2];

                    let last = $.extend(
                        true,
                        {},
                        Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1],
                    );

                    let left = 0,
                        width = 0,
                        columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;

                        if (last.column[1] > last.column_focus) {
                            last.column[1] = last.column_focus;
                        }

                        columnseleted = [col_index, last.column[1]];
                    } else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [col_index, last.column[0]];
                    } else {
                        left = last.left;
                        width = col - last.left - 1;

                        if (last.column[0] < last.column_focus) {
                            last.column[0] = last.column_focus;
                        }

                        columnseleted = [last.column[0], col_index];
                    }

                    last["column"] = columnseleted;

                    last["left_move"] = left;
                    last["width_move"] = width;

                    Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1] = last;

                    selectHightlightShow();
                    clearTimeout(Store.countfuncTimeout);
                    Store.countfuncTimeout = setTimeout(function() {
                        countfunc();
                    }, 500);
                } else if (Store.luckysheet_cell_selected_move) {
                    let mouse = mouseposition(event.pageX, event.pageY);

                    let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                    let scrollTop = $("#luckysheet-cell-main").scrollTop();

                    let x = mouse[0] + scrollLeft;
                    let y = mouse[1] + scrollTop;

                    let winH = $(window).height() + scrollTop - Store.sheetBarHeight - Store.statisticBarHeight,
                        winW = $(window).width() + scrollLeft;

                    let row_location = rowLocation(y),
                        row = row_location[1],
                        row_pre = row_location[0],
                        row_index = row_location[2];
                    let col_location = colLocation(x),
                        col = col_location[1],
                        col_pre = col_location[0],
                        col_index = col_location[2];

                    let row_index_original = Store.luckysheet_cell_selected_move_index[0],
                        col_index_original = Store.luckysheet_cell_selected_move_index[1];

                    let row_s = Store.luckysheet_select_save[0]["row"][0] - row_index_original + row_index,
                        row_e = Store.luckysheet_select_save[0]["row"][1] - row_index_original + row_index;

                    let col_s = Store.luckysheet_select_save[0]["column"][0] - col_index_original + col_index,
                        col_e = Store.luckysheet_select_save[0]["column"][1] - col_index_original + col_index;

                    if (row_s < 0 || y < 0) {
                        row_s = 0;
                        row_e = Store.luckysheet_select_save[0]["row"][1] - Store.luckysheet_select_save[0]["row"][0];
                    }

                    if (col_s < 0 || x < 0) {
                        col_s = 0;
                        col_e =
                            Store.luckysheet_select_save[0]["column"][1] - Store.luckysheet_select_save[0]["column"][0];
                    }

                    if (row_e >= Store.visibledatarow[Store.visibledatarow.length - 1] || y > winH) {
                        row_s =
                            Store.visibledatarow.length -
                            1 -
                            Store.luckysheet_select_save[0]["row"][1] +
                            Store.luckysheet_select_save[0]["row"][0];
                        row_e = Store.visibledatarow.length - 1;
                    }

                    if (col_e >= Store.visibledatacolumn[Store.visibledatacolumn.length - 1] || x > winW) {
                        col_s =
                            Store.visibledatacolumn.length -
                            1 -
                            Store.luckysheet_select_save[0]["column"][1] +
                            Store.luckysheet_select_save[0]["column"][0];
                        col_e = Store.visibledatacolumn.length - 1;
                    }

                    col_pre = col_s - 1 == -1 ? 0 : Store.visibledatacolumn[col_s - 1];
                    col = Store.visibledatacolumn[col_e];
                    row_pre = row_s - 1 == -1 ? 0 : Store.visibledatarow[row_s - 1];
                    row = Store.visibledatarow[row_e];

                    $("#luckysheet-cell-selected-move").css({
                        left: col_pre,
                        width: col - col_pre - 2,
                        top: row_pre,
                        height: row - row_pre - 2,
                        display: "block",
                    });
                } else if (Store.luckysheet_cell_selected_extend) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let scrollLeft = $("#luckysheet-cell-main").scrollLeft() - 5;
                    let scrollTop = $("#luckysheet-cell-main").scrollTop() - 5;

                    let x = mouse[0] + scrollLeft;
                    let y = mouse[1] + scrollTop;

                    let winH = $(window).height() + scrollTop - Store.sheetBarHeight - Store.statisticBarHeight,
                        winW = $(window).width() + scrollLeft;

                    let row_location = rowLocation(y),
                        row = row_location[1],
                        row_pre = row_location[0],
                        row_index = row_location[2];
                    let col_location = colLocation(x),
                        col = col_location[1],
                        col_pre = col_location[0],
                        col_index = col_location[2];

                    let row_index_original = Store.luckysheet_cell_selected_extend_index[0],
                        col_index_original = Store.luckysheet_cell_selected_extend_index[1];

                    let row_s = Store.luckysheet_select_save[0]["row"][0],
                        row_e = Store.luckysheet_select_save[0]["row"][1];
                    let col_s = Store.luckysheet_select_save[0]["column"][0],
                        col_e = Store.luckysheet_select_save[0]["column"][1];

                    if (row_s < 0 || y < 0) {
                        row_s = 0;
                        row_e = Store.luckysheet_select_save[0]["row"][1] - Store.luckysheet_select_save[0]["row"][0];
                    }

                    if (col_s < 0 || x < 0) {
                        col_s = 0;
                        col_e =
                            Store.luckysheet_select_save[0]["column"][1] - Store.luckysheet_select_save[0]["column"][0];
                    }

                    if (row_e >= Store.visibledatarow[Store.visibledatarow.length - 1] || y > winH) {
                        row_s =
                            Store.visibledatarow.length -
                            1 -
                            Store.luckysheet_select_save[0]["row"][1] +
                            Store.luckysheet_select_save[0]["row"][0];
                        row_e = Store.visibledatarow.length - 1;
                    }

                    if (col_e >= Store.visibledatacolumn[Store.visibledatacolumn.length - 1] || x > winW) {
                        col_s =
                            Store.visibledatacolumn.length -
                            1 -
                            Store.luckysheet_select_save[0]["column"][1] +
                            Store.luckysheet_select_save[0]["column"][0];
                        col_e = Store.visibledatacolumn.length - 1;
                    }

                    let top = Store.luckysheet_select_save[0].top_move,
                        height = Store.luckysheet_select_save[0].height_move;
                    let left = Store.luckysheet_select_save[0].left_move,
                        width = Store.luckysheet_select_save[0].width_move;

                    if (Math.abs(row_index_original - row_index) > Math.abs(col_index_original - col_index)) {
                        if (!(row_index >= row_s && row_index <= row_e)) {
                            if (Store.luckysheet_select_save[0].top_move >= row_pre) {
                                top = row_pre;
                                height =
                                    Store.luckysheet_select_save[0].top_move +
                                    Store.luckysheet_select_save[0].height_move -
                                    row_pre;
                            } else {
                                top = Store.luckysheet_select_save[0].top_move;
                                height = row - Store.luckysheet_select_save[0].top_move - 1;
                            }
                        }
                    } else {
                        if (!(col_index >= col_s && col_index <= col_e)) {
                            if (Store.luckysheet_select_save[0].left_move >= col_pre) {
                                left = col_pre;
                                width =
                                    Store.luckysheet_select_save[0].left_move +
                                    Store.luckysheet_select_save[0].width_move -
                                    col_pre;
                            } else {
                                left = Store.luckysheet_select_save[0].left_move;
                                width = col - Store.luckysheet_select_save[0].left_move - 1;
                            }
                        }
                    }

                    $("#luckysheet-cell-selected-extend").css({
                        left: left,
                        width: width,
                        top: top,
                        height: height,
                        display: "block",
                    });
                } else if (Store.luckysheet_cols_change_size) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let scrollLeft = $("#luckysheet-cols-h-c").scrollLeft();
                    let x = mouse[0] + scrollLeft;
                    let winW = $(window).width();

                    let row_index = Store.visibledatarow.length - 1,
                        row = Store.visibledatarow[row_index],
                        row_pre = 0;
                    let col_location = colLocation(x),
                        col = col_location[1],
                        col_pre = col_location[0],
                        col_index = col_location[2];

                    if (x + 3 - Store.luckysheet_cols_change_size_start[0] > 30 && x < winW + scrollLeft - 100) {
                        $("#luckysheet-change-size-line").css({ left: x });
                        $("#luckysheet-cols-change-size").css({ left: x - 2 });
                    }
                } else if (Store.luckysheet_rows_change_size) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let scrollTop = $("#luckysheet-rows-h").scrollTop();
                    let y = mouse[1] + scrollTop;
                    let winH = $(window).height();

                    let row_location = rowLocation(y),
                        row = row_location[1],
                        row_pre = row_location[0],
                        row_index = row_location[2];

                    if (y + 3 - Store.luckysheet_rows_change_size_start[0] > 19 && y < winH + scrollTop - 200) {
                        $("#luckysheet-change-size-line").css({ top: y });
                        $("#luckysheet-rows-change-size").css({ top: y });
                    }
                }
                // chart move
                else if (!!Store.chartparam.luckysheetCurrentChartMove) {
                    const mouse = mouseposition(event.pageX, event.pageY);
                    const x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    const y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    const myh = Store.chartparam.luckysheetCurrentChartMoveObj.height(),
                        myw = Store.chartparam.luckysheetCurrentChartMoveObj.width();
                    let top = y - Store.chartparam.luckysheetCurrentChartMoveXy[1],
                        left = x - Store.chartparam.luckysheetCurrentChartMoveXy[0];

                    if (top < 0) {
                        top = 0;
                    }

                    if (top + myh + 42 + 6 > Store.chartparam.luckysheetCurrentChartMoveWinH) {
                        top = Store.chartparam.luckysheetCurrentChartMoveWinH - myh - 42 - 6;
                    }

                    if (left < 0) {
                        left = 0;
                    }

                    if (left + myw + 22 + 36 > Store.chartparam.luckysheetCurrentChartMoveWinW) {
                        left = Store.chartparam.luckysheetCurrentChartMoveWinW - myw - 22 - 36;
                    }

                    Store.chartparam.luckysheetCurrentChartMoveObj.css({ top: top, left: left });

                    if (
                        luckysheetFreezen.freezenhorizontaldata != null ||
                        luckysheetFreezen.freezenverticaldata != null
                    ) {
                        luckysheetFreezen.scrollAdapt();

                        const toffset = Store.chartparam.luckysheetCurrentChartMoveObj.offset();
                        const tpsition = Store.chartparam.luckysheetCurrentChartMoveObj.position();
                        Store.chartparam.luckysheetCurrentChartMoveXy = [
                            event.pageX - toffset.left,
                            event.pageY - toffset.top,
                            tpsition.left,
                            tpsition.top,
                            $("#luckysheet-scrollbar-x").scrollLeft(),
                            $("#luckysheet-scrollbar-y").scrollTop(),
                        ];
                    }
                }
                // chart resize
                else if (!!Store.chartparam.luckysheetCurrentChartResize) {
                    const scrollTop = $("#luckysheet-cell-main").scrollTop(),
                        scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                    const mouse = mouseposition(event.pageX, event.pageY);
                    const x = mouse[0] + scrollLeft;
                    const y = mouse[1] + scrollTop;

                    if (x < 0 || y < 0) {
                        return false;
                    }

                    const myh = Store.chartparam.luckysheetCurrentChartResizeObj.height(),
                        myw = Store.chartparam.luckysheetCurrentChartResizeObj.width();
                    const topchange = y - Store.chartparam.luckysheetCurrentChartResizeXy[1],
                        leftchange = x - Store.chartparam.luckysheetCurrentChartResizeXy[0];

                    let top = Store.chartparam.luckysheetCurrentChartResizeXy[5],
                        height = Store.chartparam.luckysheetCurrentChartResizeXy[3],
                        left = Store.chartparam.luckysheetCurrentChartResizeXy[4],
                        width = Store.chartparam.luckysheetCurrentChartResizeXy[2];

                    if (
                        Store.chartparam.luckysheetCurrentChartResize == "lm" ||
                        Store.chartparam.luckysheetCurrentChartResize == "lt" ||
                        Store.chartparam.luckysheetCurrentChartResize == "lb"
                    ) {
                        left = x;
                        width = Store.chartparam.luckysheetCurrentChartResizeXy[2] - leftchange;
                        if (
                            left >
                            Store.chartparam.luckysheetCurrentChartResizeXy[2] +
                                Store.chartparam.luckysheetCurrentChartResizeXy[4] -
                                60
                        ) {
                            left =
                                Store.chartparam.luckysheetCurrentChartResizeXy[2] +
                                Store.chartparam.luckysheetCurrentChartResizeXy[4] -
                                60;
                            width =
                                Store.chartparam.luckysheetCurrentChartResizeXy[2] -
                                (Store.chartparam.luckysheetCurrentChartResizeXy[2] +
                                    Store.chartparam.luckysheetCurrentChartResizeXy[4] -
                                    60 -
                                    Store.chartparam.luckysheetCurrentChartResizeXy[0]);
                        } else if (left <= 0) {
                            left = 0;
                            width =
                                Store.chartparam.luckysheetCurrentChartResizeXy[2] +
                                Store.chartparam.luckysheetCurrentChartResizeXy[0];
                        }
                    }

                    if (
                        Store.chartparam.luckysheetCurrentChartResize == "rm" ||
                        Store.chartparam.luckysheetCurrentChartResize == "rt" ||
                        Store.chartparam.luckysheetCurrentChartResize == "rb"
                    ) {
                        width = Store.chartparam.luckysheetCurrentChartResizeXy[2] + leftchange;
                        if (width < 60) {
                            width = 60;
                        } else if (
                            width >=
                            Store.chartparam.luckysheetCurrentChartResizeWinW -
                                Store.chartparam.luckysheetCurrentChartResizeXy[4] -
                                22 -
                                36
                        ) {
                            width =
                                Store.chartparam.luckysheetCurrentChartResizeWinW -
                                Store.chartparam.luckysheetCurrentChartResizeXy[4] -
                                22 -
                                36;
                        }
                    }

                    if (
                        Store.chartparam.luckysheetCurrentChartResize == "mt" ||
                        Store.chartparam.luckysheetCurrentChartResize == "lt" ||
                        Store.chartparam.luckysheetCurrentChartResize == "rt"
                    ) {
                        top = y;
                        height = Store.chartparam.luckysheetCurrentChartResizeXy[3] - topchange;
                        if (
                            top >
                            Store.chartparam.luckysheetCurrentChartResizeXy[3] +
                                Store.chartparam.luckysheetCurrentChartResizeXy[5] -
                                60
                        ) {
                            top =
                                Store.chartparam.luckysheetCurrentChartResizeXy[3] +
                                Store.chartparam.luckysheetCurrentChartResizeXy[5] -
                                60;
                            height =
                                Store.chartparam.luckysheetCurrentChartResizeXy[3] -
                                (Store.chartparam.luckysheetCurrentChartResizeXy[3] +
                                    Store.chartparam.luckysheetCurrentChartResizeXy[5] -
                                    60 -
                                    Store.chartparam.luckysheetCurrentChartResizeXy[1]);
                        } else if (top <= 0) {
                            top = 0;
                            height =
                                Store.chartparam.luckysheetCurrentChartResizeXy[3] +
                                Store.chartparam.luckysheetCurrentChartResizeXy[1];
                        }
                    }

                    if (
                        Store.chartparam.luckysheetCurrentChartResize == "mb" ||
                        Store.chartparam.luckysheetCurrentChartResize == "lb" ||
                        Store.chartparam.luckysheetCurrentChartResize == "rb"
                    ) {
                        height = Store.chartparam.luckysheetCurrentChartResizeXy[3] + topchange;
                        if (height < 60) {
                            height = 60;
                        } else if (
                            height >=
                            Store.chartparam.luckysheetCurrentChartResizeWinH -
                                Store.chartparam.luckysheetCurrentChartResizeXy[5] -
                                42 -
                                6
                        ) {
                            height =
                                Store.chartparam.luckysheetCurrentChartResizeWinH -
                                Store.chartparam.luckysheetCurrentChartResizeXy[5] -
                                42 -
                                6;
                        }
                    }

                    const resizedata = { top: top, left: left, height: height, width: width };
                    Store.chartparam.luckysheetCurrentChartResizeObj.css(resizedata);
                    // resize chart
                    Store.resizeChart(Store.chartparam.luckysheetCurrentChart);
                }
                //image move
                else if (imageCtrl.move) {
                    let mouse = mouseposition(event.pageX, event.pageY);

                    let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    let imgItem = imageCtrl.images[imageCtrl.currentImgId];
                    if (imgItem.isFixedPos) {
                        x = event.pageX;
                        y = event.pageY;
                    }

                    let myh = $("#luckysheet-modal-dialog-activeImage").height(),
                        myw = $("#luckysheet-modal-dialog-activeImage").width();

                    let top = y - imageCtrl.moveXY[1],
                        left = x - imageCtrl.moveXY[0];

                    let minTop = 0,
                        maxTop = imageCtrl.currentWinH - myh - 42 - 6,
                        minLeft = 0,
                        maxLeft = imageCtrl.currentWinW - myw - 22 - 36;

                    if (imgItem.isFixedPos) {
                        minTop =
                            Store.infobarHeight +
                            Store.toolbarHeight +
                            Store.calculatebarHeight +
                            Store.columnHeaderHeight;
                        maxTop = minTop + Store.cellmainHeight - Store.cellMainSrollBarSize - myh;
                        minLeft = Store.rowHeaderWidth;
                        maxLeft = minLeft + Store.cellmainWidth - Store.cellMainSrollBarSize - myw;
                    }

                    if (top < minTop) {
                        top = minTop;
                    }

                    if (top > maxTop) {
                        top = maxTop;
                    }

                    if (left < minLeft) {
                        left = minLeft;
                    }

                    if (left > maxLeft) {
                        left = maxLeft;
                    }

                    $("#luckysheet-modal-dialog-activeImage").css({ left: left, top: top });
                }
                //image resize
                else if (!!imageCtrl.resize) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                    let scrollTop = $("#luckysheet-cell-main").scrollTop();
                    let x = mouse[0] + scrollLeft;
                    let y = mouse[1] + scrollTop;

                    if (x < 0 || y < 0) {
                        return false;
                    }

                    let resizeXY = imageCtrl.resizeXY;

                    let topchange = y - resizeXY[1],
                        leftchange = x - resizeXY[0];

                    let top = resizeXY[5],
                        height = resizeXY[3],
                        left = resizeXY[4],
                        width = resizeXY[2];

                    let resize = imageCtrl.resize;
                    let imgItem = imageCtrl.images[imageCtrl.currentImgId];

                    if (imgItem.isFixedPos) {
                        let minTop =
                            Store.infobarHeight +
                            Store.toolbarHeight +
                            Store.calculatebarHeight +
                            Store.columnHeaderHeight;
                        let minLeft = Store.rowHeaderWidth;

                        if (resize == "lt") {
                            //左上
                            left = resizeXY[4] - resizeXY[6] + leftchange;

                            if (left < minLeft) {
                                left = minLeft;
                            }

                            if (left > resizeXY[4] - resizeXY[6] + resizeXY[2] - 1) {
                                left = resizeXY[4] - resizeXY[6] + resizeXY[2] - 1;
                            }

                            width = resizeXY[4] - resizeXY[6] + resizeXY[2] - left;

                            height = Math.round(width * (resizeXY[3] / resizeXY[2]));
                            top = resizeXY[5] - resizeXY[7] + resizeXY[3] - height;

                            if (top < minTop) {
                                top = minTop;
                                height = resizeXY[5] - resizeXY[7] + resizeXY[3] - top;

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                                left = resizeXY[4] - resizeXY[6] + resizeXY[2] - width;
                            }

                            if (top > resizeXY[5] - resizeXY[7] + resizeXY[3] - 1) {
                                top = resizeXY[5] - resizeXY[7] + resizeXY[3] - 1;
                                height = resizeXY[5] - resizeXY[7] + resizeXY[3] - top;

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                                left = resizeXY[4] - resizeXY[6] + resizeXY[2] - width;
                            }
                        } else if (resize == "lm") {
                            //左中
                            left = resizeXY[4] - resizeXY[6] + leftchange;

                            if (left < minLeft) {
                                left = minLeft;
                            }

                            if (left > resizeXY[4] - resizeXY[6] + resizeXY[2] - 1) {
                                left = resizeXY[4] - resizeXY[6] + resizeXY[2] - 1;
                            }

                            width = resizeXY[4] - resizeXY[6] + resizeXY[2] - left;

                            top = resizeXY[5] - resizeXY[7];
                            height = resizeXY[3];
                        } else if (resize == "lb") {
                            //左下
                            left = resizeXY[4] - resizeXY[6] + leftchange;

                            if (left < minLeft) {
                                left = minLeft;
                            }

                            if (left > resizeXY[4] - resizeXY[6] + resizeXY[2] - 1) {
                                left = resizeXY[4] - resizeXY[6] + resizeXY[2] - 1;
                            }

                            width = resizeXY[4] - resizeXY[6] + resizeXY[2] - left;

                            height = Math.round(width * (resizeXY[3] / resizeXY[2]));

                            top = resizeXY[5] - resizeXY[7];

                            if (height < 1) {
                                height = 1;

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                                left = resizeXY[4] - resizeXY[6] + resizeXY[2] - width;
                            }

                            if (height > minTop + Store.cellmainHeight - Store.cellMainSrollBarSize - top) {
                                height = minTop + Store.cellmainHeight - Store.cellMainSrollBarSize - top;

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                                left = resizeXY[4] - resizeXY[6] + resizeXY[2] - width;
                            }
                        } else if (resize == "rt") {
                            //右上
                            left = resizeXY[4] - resizeXY[6];

                            width = resizeXY[2] + leftchange;

                            if (width < 1) {
                                width = 1;
                            }

                            if (width > minLeft + Store.cellmainWidth - Store.cellMainSrollBarSize - left) {
                                width = minLeft + Store.cellmainWidth - Store.cellMainSrollBarSize - left;
                            }

                            height = Math.round(width * (resizeXY[3] / resizeXY[2]));
                            top = resizeXY[5] - resizeXY[7] + resizeXY[3] - height;

                            if (top < minTop) {
                                top = minTop;
                                height = resizeXY[5] - resizeXY[7] + resizeXY[3] - top;

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                            }

                            if (top > resizeXY[5] - resizeXY[7] + resizeXY[3] - 1) {
                                top = resizeXY[5] - resizeXY[7] + resizeXY[3] - 1;
                                height = resizeXY[5] - resizeXY[7] + resizeXY[3] - top;

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                            }
                        } else if (resize == "rm") {
                            //右中
                            left = resizeXY[4] - resizeXY[6];

                            width = resizeXY[2] + leftchange;

                            if (width < 1) {
                                width = 1;
                            }

                            if (width > minLeft + Store.cellmainWidth - Store.cellMainSrollBarSize - left) {
                                width = minLeft + Store.cellmainWidth - Store.cellMainSrollBarSize - left;
                            }

                            top = resizeXY[5] - resizeXY[7];
                            height = resizeXY[3];
                        } else if (resize == "rb") {
                            //右下
                            left = resizeXY[4] - resizeXY[6];

                            width = resizeXY[2] + leftchange;

                            if (width < 1) {
                                width = 1;
                            }

                            if (width > minLeft + Store.cellmainWidth - Store.cellMainSrollBarSize - left) {
                                width = minLeft + Store.cellmainWidth - Store.cellMainSrollBarSize - left;
                            }

                            height = Math.round(width * (resizeXY[3] / resizeXY[2]));
                            top = resizeXY[5] - resizeXY[7];

                            if (height < 1) {
                                height = 1;

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                            }

                            if (height > minTop + Store.cellmainHeight - Store.cellMainSrollBarSize - top) {
                                height = minTop + Store.cellmainHeight - Store.cellMainSrollBarSize - top;

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                            }
                        } else if (resize == "mt") {
                            //中上
                            left = resizeXY[4] - resizeXY[6];
                            width = resizeXY[2];

                            top = resizeXY[5] - resizeXY[7] + topchange;

                            if (top < minTop) {
                                top = minTop;
                            }

                            if (top > resizeXY[5] - resizeXY[7] + resizeXY[3] - 1) {
                                top = resizeXY[5] - resizeXY[7] + resizeXY[3] - 1;
                            }

                            height = resizeXY[5] - resizeXY[7] + resizeXY[3] - top;
                        } else if (resize == "mb") {
                            //中下
                            left = resizeXY[4] - resizeXY[6];
                            width = resizeXY[2];

                            top = resizeXY[5] - resizeXY[7];

                            height = resizeXY[3] + topchange;

                            if (height < 1) {
                                height = 1;
                            }

                            if (height > minTop + Store.cellmainHeight - Store.cellMainSrollBarSize - top) {
                                height = minTop + Store.cellmainHeight - Store.cellMainSrollBarSize - top;
                            }
                        }
                    } else {
                        if (resize == "lt") {
                            //左上
                            left = x;
                            width = resizeXY[2] - leftchange;

                            if (left > resizeXY[2] + resizeXY[4] - 1) {
                                left = resizeXY[2] + resizeXY[4] - 1;
                                width = resizeXY[2] + resizeXY[0] - (resizeXY[2] + resizeXY[4] - 1);
                            } else if (left <= 0) {
                                left = 0;
                                width = resizeXY[2] + resizeXY[0];
                            }

                            height = Math.round(width * (resizeXY[3] / resizeXY[2]));
                            top = resizeXY[3] + resizeXY[1] - height;

                            if (top > resizeXY[3] + resizeXY[5] - 1) {
                                top = resizeXY[3] + resizeXY[5] - 1;
                                height = resizeXY[3] + resizeXY[1] - (resizeXY[3] + resizeXY[5] - 1);

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                                left = resizeXY[2] + resizeXY[0] - width;
                            } else if (top <= 0) {
                                top = 0;
                                height = resizeXY[3] + resizeXY[1];

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                                left = resizeXY[2] + resizeXY[0] - width;
                            }
                        } else if (resize == "lm") {
                            //左中
                            left = x;
                            width = resizeXY[2] - leftchange;

                            if (left > resizeXY[2] + resizeXY[4] - 1) {
                                left = resizeXY[2] + resizeXY[4] - 1;
                                width = resizeXY[2] + resizeXY[0] - (resizeXY[2] + resizeXY[4] - 1);
                            } else if (left <= 0) {
                                left = 0;
                                width = resizeXY[2] + resizeXY[0];
                            }
                        } else if (resize == "lb") {
                            //左下
                            left = x;
                            width = resizeXY[2] - leftchange;

                            if (left > resizeXY[2] + resizeXY[4] - 1) {
                                left = resizeXY[2] + resizeXY[4] - 1;
                                width = resizeXY[2] + resizeXY[0] - (resizeXY[2] + resizeXY[4] - 1);
                            } else if (left <= 0) {
                                left = 0;
                                width = resizeXY[2] + resizeXY[0];
                            }

                            height = Math.round(width * (resizeXY[3] / resizeXY[2]));

                            if (height < 1) {
                                height = 1;

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                                left = resizeXY[2] + resizeXY[0] - width;
                            } else if (height >= imageCtrl.currentWinH - resizeXY[5] - 42 - 6) {
                                height = imageCtrl.currentWinH - resizeXY[5] - 42 - 6;

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                                left = resizeXY[2] + resizeXY[0] - width;
                            }
                        } else if (resize == "rt") {
                            //右上
                            width = resizeXY[2] + leftchange;

                            if (width < 1) {
                                width = 1;
                            } else if (width >= imageCtrl.currentWinW - resizeXY[4] - 22 - 36) {
                                width = imageCtrl.currentWinW - resizeXY[4] - 22 - 36;
                            }

                            height = Math.round(width * (resizeXY[3] / resizeXY[2]));
                            top = resizeXY[3] + resizeXY[1] - height;

                            if (top > resizeXY[3] + resizeXY[5] - 1) {
                                top = resizeXY[3] + resizeXY[5] - 1;
                                height = resizeXY[3] + resizeXY[1] - (resizeXY[3] + resizeXY[5] - 1);

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                            } else if (top <= 0) {
                                top = 0;
                                height = resizeXY[3] + resizeXY[1];

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                            }
                        } else if (resize == "rm") {
                            //右中
                            width = resizeXY[2] + leftchange;

                            if (width < 1) {
                                width = 1;
                            } else if (width >= imageCtrl.currentWinW - resizeXY[4] - 22 - 36) {
                                width = imageCtrl.currentWinW - resizeXY[4] - 22 - 36;
                            }
                        } else if (resize == "rb") {
                            //右下
                            width = resizeXY[2] + leftchange;

                            if (width < 1) {
                                width = 1;
                            } else if (width >= imageCtrl.currentWinW - resizeXY[4] - 22 - 36) {
                                width = imageCtrl.currentWinW - resizeXY[4] - 22 - 36;
                            }

                            height = Math.round(width * (resizeXY[3] / resizeXY[2]));

                            if (height < 1) {
                                height = 1;

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                            } else if (height >= imageCtrl.currentWinH - resizeXY[5] - 42 - 6) {
                                height = imageCtrl.currentWinH - resizeXY[5] - 42 - 6;

                                width = Math.round(height * (resizeXY[2] / resizeXY[3]));
                            }
                        } else if (resize == "mt") {
                            //中上
                            top = y;
                            height = resizeXY[3] - topchange;

                            if (top > resizeXY[3] + resizeXY[5] - 1) {
                                top = resizeXY[3] + resizeXY[5] - 1;
                                height = resizeXY[3] + resizeXY[1] - (resizeXY[3] + resizeXY[5] - 1);
                            } else if (top <= 0) {
                                top = 0;
                                height = resizeXY[3] + resizeXY[1];
                            }
                        } else if (resize == "mb") {
                            //中下
                            height = resizeXY[3] + topchange;

                            if (height < 1) {
                                height = 1;
                            } else if (height >= imageCtrl.currentWinH - resizeXY[5] - 42 - 6) {
                                height = imageCtrl.currentWinH - resizeXY[5] - 42 - 6;
                            }
                        }
                    }

                    $("#luckysheet-modal-dialog-activeImage").css({
                        width: width,
                        height: height,
                        left: left,
                        top: top,
                    });

                    let scaleX = width / imgItem.crop.width;
                    let scaleY = height / imgItem.crop.height;
                    let defaultWidth = Math.round(imgItem.default.width * scaleX);
                    let defaultHeight = Math.round(imgItem.default.height * scaleY);
                    let offsetLeft = Math.round(imgItem.crop.offsetLeft * scaleX);
                    let offsetTop = Math.round(imgItem.crop.offsetTop * scaleY);

                    $("#luckysheet-modal-dialog-activeImage .luckysheet-modal-dialog-content").css({
                        "background-size": defaultWidth + "px " + defaultHeight + "px",
                        "background-position": -offsetLeft + "px " + -offsetTop + "px",
                    });
                }
                //image cropChange
                else if (!!imageCtrl.cropChange) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    if (x < 0 || y < 0) {
                        return false;
                    }

                    let cropChangeXY = imageCtrl.cropChangeXY;

                    let topchange = y - cropChangeXY[1],
                        leftchange = x - cropChangeXY[0];

                    let imgItem = imageCtrl.images[imageCtrl.currentImgId];
                    let cropChange = imageCtrl.cropChange;
                    let width, height, offsetLeft, offsetTop;

                    if (cropChange == "lt") {
                        //左上
                        offsetLeft = imgItem.crop.offsetLeft + leftchange;

                        if (offsetLeft < 0) {
                            offsetLeft = 0;
                        }

                        if (offsetLeft > imgItem.crop.width + imgItem.crop.offsetLeft - 1) {
                            offsetLeft = imgItem.crop.width + imgItem.crop.offsetLeft - 1;
                        }

                        width = imgItem.crop.width + imgItem.crop.offsetLeft - offsetLeft;

                        offsetTop = imgItem.crop.offsetTop + topchange;

                        if (offsetTop < 0) {
                            offsetTop = 0;
                        }

                        if (offsetTop > imgItem.crop.height + imgItem.crop.offsetTop - 1) {
                            offsetTop = imgItem.crop.height + imgItem.crop.offsetTop - 1;
                        }

                        height = imgItem.crop.height + imgItem.crop.offsetTop - offsetTop;
                    } else if (cropChange == "lm") {
                        //左中
                        offsetLeft = imgItem.crop.offsetLeft + leftchange;

                        if (offsetLeft < 0) {
                            offsetLeft = 0;
                        }

                        if (offsetLeft > imgItem.crop.width + imgItem.crop.offsetLeft - 1) {
                            offsetLeft = imgItem.crop.width + imgItem.crop.offsetLeft - 1;
                        }

                        width = imgItem.crop.width + imgItem.crop.offsetLeft - offsetLeft;

                        offsetTop = imgItem.crop.offsetTop;
                        height = imgItem.crop.height;
                    } else if (cropChange == "lb") {
                        //左下
                        offsetLeft = imgItem.crop.offsetLeft + leftchange;

                        if (offsetLeft < 0) {
                            offsetLeft = 0;
                        }

                        if (offsetLeft > imgItem.crop.width + imgItem.crop.offsetLeft - 1) {
                            offsetLeft = imgItem.crop.width + imgItem.crop.offsetLeft - 1;
                        }

                        width = imgItem.crop.width + imgItem.crop.offsetLeft - offsetLeft;

                        offsetTop = imgItem.crop.offsetTop;

                        height = imgItem.crop.height + topchange;

                        if (height < 1) {
                            height = 1;
                        }

                        if (height > imgItem.default.height - offsetTop) {
                            height = imgItem.default.height - offsetTop;
                        }
                    } else if (cropChange == "rt") {
                        //右上
                        offsetLeft = imgItem.crop.offsetLeft;

                        width = imgItem.crop.width + leftchange;

                        if (width < 1) {
                            width = 1;
                        }

                        if (width > imgItem.default.width - offsetLeft) {
                            width = imgItem.default.width - offsetLeft;
                        }

                        offsetTop = imgItem.crop.offsetTop + topchange;

                        if (offsetTop < 0) {
                            offsetTop = 0;
                        }

                        if (offsetTop > imgItem.crop.height + imgItem.crop.offsetTop - 1) {
                            offsetTop = imgItem.crop.height + imgItem.crop.offsetTop - 1;
                        }

                        height = imgItem.crop.height + imgItem.crop.offsetTop - offsetTop;
                    } else if (cropChange == "rm") {
                        //右中
                        offsetLeft = imgItem.crop.offsetLeft;

                        width = imgItem.crop.width + leftchange;

                        if (width < 1) {
                            width = 1;
                        }

                        if (width > imgItem.default.width - offsetLeft) {
                            width = imgItem.default.width - offsetLeft;
                        }

                        offsetTop = imgItem.crop.offsetTop;
                        height = imgItem.crop.height;
                    } else if (cropChange == "rb") {
                        //右下
                        offsetLeft = imgItem.crop.offsetLeft;

                        width = imgItem.crop.width + leftchange;

                        if (width < 1) {
                            width = 1;
                        }

                        if (width > imgItem.default.width - offsetLeft) {
                            width = imgItem.default.width - offsetLeft;
                        }

                        offsetTop = imgItem.crop.offsetTop;

                        height = imgItem.crop.height + topchange;

                        if (height < 1) {
                            height = 1;
                        }

                        if (height > imgItem.default.height - offsetTop) {
                            height = imgItem.default.height - offsetTop;
                        }
                    } else if (cropChange == "mt") {
                        //中上
                        offsetLeft = imgItem.crop.offsetLeft;
                        width = imgItem.crop.width;

                        offsetTop = imgItem.crop.offsetTop + topchange;

                        if (offsetTop < 0) {
                            offsetTop = 0;
                        }

                        if (offsetTop > imgItem.crop.height + imgItem.crop.offsetTop - 1) {
                            offsetTop = imgItem.crop.height + imgItem.crop.offsetTop - 1;
                        }

                        height = imgItem.crop.height + imgItem.crop.offsetTop - offsetTop;
                    } else if (cropChange == "mb") {
                        //中下
                        offsetLeft = imgItem.crop.offsetLeft;
                        width = imgItem.crop.width;

                        offsetTop = imgItem.crop.offsetTop;

                        height = imgItem.crop.height + topchange;

                        if (height < 1) {
                            height = 1;
                        }

                        if (height > imgItem.default.height - offsetTop) {
                            height = imgItem.default.height - offsetTop;
                        }
                    }

                    let left = imgItem.default.left + offsetLeft;
                    let top = imgItem.default.top + offsetTop;

                    if (imgItem.isFixedPos) {
                        left = imgItem.fixedLeft + offsetLeft;
                        top = imgItem.fixedTop + offsetTop;
                    }

                    $("#luckysheet-modal-dialog-cropping")
                        .show()
                        .css({
                            width: width,
                            height: height,
                            left: left,
                            top: top,
                        });

                    let imageUrlHandle = Store.toJsonOptions && Store.toJsonOptions["imageUrlHandle"];
                    let imgSrc = typeof imageUrlHandle === "function" ? imageUrlHandle(imgItem.src) : imgItem.src;

                    $("#luckysheet-modal-dialog-cropping .cropping-mask").css({
                        width: imgItem.default.width,
                        height: imgItem.default.height,
                        "background-image": "url(" + imgSrc + ")",
                        left: -offsetLeft,
                        top: -offsetTop,
                    });

                    $("#luckysheet-modal-dialog-cropping .cropping-content").css({
                        "background-image": "url(" + imgSrc + ")",
                        "background-size": imgItem.default.width + "px " + imgItem.default.height + "px",
                        "background-position": -offsetLeft + "px " + -offsetTop + "px",
                    });

                    imageCtrl.cropChangeObj = {
                        width: width,
                        height: height,
                        offsetLeft: offsetLeft,
                        offsetTop: offsetTop,
                    };
                } else if (luckysheetPostil.move) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    let myh = luckysheetPostil.currentObj.outerHeight(),
                        myw = luckysheetPostil.currentObj.outerWidth();

                    let top = y - luckysheetPostil.moveXY[1],
                        left = x - luckysheetPostil.moveXY[0];

                    if (top < 0) {
                        top = 0;
                    }

                    if (top + myh + 42 + 6 > luckysheetPostil.currentWinH) {
                        top = luckysheetPostil.currentWinH - myh - 42 - 6;
                    }

                    if (left < 0) {
                        left = 0;
                    }

                    if (left + myw + 22 + 36 > luckysheetPostil.currentWinW) {
                        left = luckysheetPostil.currentWinW - myw - 22 - 36;
                    }

                    luckysheetPostil.currentObj.css({ left: left, top: top });
                } else if (!!luckysheetPostil.resize) {
                    let mouse = mouseposition(event.pageX, event.pageY);
                    let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                    let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                    if (x < 0 || y < 0) {
                        return false;
                    }

                    let resizeXY = luckysheetPostil.resizeXY;

                    let topchange = y - resizeXY[1],
                        leftchange = x - resizeXY[0];

                    let top = resizeXY[5],
                        height = resizeXY[3],
                        left = resizeXY[4],
                        width = resizeXY[2];

                    let resize = luckysheetPostil.resize;

                    if (resize == "lm" || resize == "lt" || resize == "lb") {
                        left = x;
                        width = resizeXY[2] - leftchange;

                        if (left > resizeXY[2] + resizeXY[4] - 60) {
                            left = resizeXY[2] + resizeXY[4] - 60;
                            width = resizeXY[2] - (resizeXY[2] + resizeXY[4] - 60 - resizeXY[0]);
                        } else if (left <= 0) {
                            left = 0;
                            width = resizeXY[2] + resizeXY[0];
                        }
                    }

                    if (resize == "rm" || resize == "rt" || resize == "rb") {
                        width = resizeXY[2] + leftchange;

                        if (width < 60) {
                            width = 60;
                        } else if (width >= luckysheetPostil.currentWinW - resizeXY[4] - 22 - 36) {
                            width = luckysheetPostil.currentWinW - resizeXY[4] - 22 - 36;
                        }
                    }

                    if (resize == "mt" || resize == "lt" || resize == "rt") {
                        top = y;
                        height = resizeXY[3] - topchange;

                        if (top > resizeXY[3] + resizeXY[5] - 60) {
                            top = resizeXY[3] + resizeXY[5] - 60;
                            height = resizeXY[3] - (resizeXY[3] + resizeXY[5] - 60 - resizeXY[1]);
                        } else if (top <= 0) {
                            top = 0;
                            height = resizeXY[3] + resizeXY[1];
                        }
                    }

                    if (resize == "mb" || resize == "lb" || resize == "rb") {
                        height = resizeXY[3] + topchange;

                        if (height < 60) {
                            height = 60;
                        } else if (height >= luckysheetPostil.currentWinH - resizeXY[5] - 42 - 6) {
                            height = luckysheetPostil.currentWinH - resizeXY[5] - 42 - 6;
                        }
                    }

                    luckysheetPostil.currentObj.css({ width: width, height: height, left: left, top: top });
                } else if (!!formula.rangeResize) {
                    formula.rangeResizeDraging(
                        event,
                        formula.rangeResizeObj,
                        formula.rangeResizexy,
                        formula.rangeResize,
                        formula.rangeResizeWinW,
                        formula.rangeResizeWinH,
                        Store.ch_width,
                        Store.rh_height,
                    );
                } else if (!!formula.rangeMove) {
                    formula.rangeMoveDraging(
                        event,
                        formula.rangeMovexy,
                        formula.rangeMoveObj.data("range"),
                        formula.rangeMoveObj,
                        Store.sheetBarHeight,
                        Store.statisticBarHeight,
                    );
                } else if (!!Store.chart_selection.rangeResize) {
                    Store.chart_selection.rangeResizeDraging(event, Store.sheetBarHeight, Store.statisticBarHeight);
                } else if (!!Store.chart_selection.rangeMove) {
                    Store.chart_selection.rangeMoveDraging(event, Store.sheetBarHeight, Store.statisticBarHeight);
                }

                Store.jfautoscrollTimeout = window.requestAnimationFrame(mouseRender);
            }

            Store.jfautoscrollTimeout = window.requestAnimationFrame(mouseRender);
        }
    });
    //表格mouseup
    $(document).on("mouseup.luckysheetEvent", function(event) {
        if (luckysheetConfigsetting && luckysheetConfigsetting.hook && luckysheetConfigsetting.hook.sheetMouseup) {
            let mouse = mouseposition(event.pageX, event.pageY);
            let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
            let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

            let row_location = rowLocation(y),
                row = row_location[1],
                row_pre = row_location[0],
                row_index = row_location[2];
            let col_location = colLocation(x),
                col = col_location[1],
                col_pre = col_location[0],
                col_index = col_location[2];

            let margeset = menuButton.mergeborer(Store.flowdata, row_index, col_index);
            if (!!margeset) {
                row = margeset.row[1];
                row_pre = margeset.row[0];
                row_index = margeset.row[2];

                col = margeset.column[1];
                col_pre = margeset.column[0];
                col_index = margeset.column[2];
            }

            // if(Store.flowdata[row_index] && Store.flowdata[row_index][col_index]){
            let sheetFile = sheetmanage.getSheetByIndex();

            let moveState = {
                functionResizeStatus: formula.functionResizeStatus,
                horizontalmoveState: !!luckysheetFreezen.horizontalmovestate,
                verticalmoveState: !!luckysheetFreezen.verticalmovestate,
                pivotTableMoveState: !!pivotTable && pivotTable.movestate,
                sheetMoveStatus: Store.luckysheet_sheet_move_status,
                scrollStatus: !!Store.luckysheet_scroll_status,
                selectStatus: !!Store.luckysheet_select_status,
                rowsSelectedStatus: !!Store.luckysheet_rows_selected_status,
                colsSelectedStatus: !!Store.luckysheet_cols_selected_status,
                cellSelectedMove: !!Store.luckysheet_cell_selected_move,
                cellSelectedExtend: !!Store.luckysheet_cell_selected_extend,
                colsChangeSize: !!Store.luckysheet_cols_change_size,
                rowsChangeSize: !!Store.luckysheet_rows_change_size,
                chartMove: !!Store.chartparam.luckysheetCurrentChartMove,
                chartResize: !!Store.chartparam.luckysheetCurrentChartResize,
                rangeResize: !!formula.rangeResize,
                rangeMove: !!formula.rangeMove,
            };

            let luckysheetTableContent = $("#luckysheetTableContent")
                .get(0)
                .getContext("2d");

            method.createHookFunction(
                "sheetMouseup",
                Store.flowdata[row_index][col_index],
                {
                    r: row_index,
                    c: col_index,
                    start_r: row_pre,
                    start_c: col_pre,
                    end_r: row,
                    end_c: col,
                },
                sheetFile,
                moveState,
                luckysheetTableContent,
            );
            // }
        }

        //数据窗格主体
        if (Store.luckysheet_select_status) {
            clearTimeout(Store.countfuncTimeout);
            Store.countfuncTimeout = setTimeout(function() {
                countfunc();
            }, 0);

            //格式刷
            if (menuButton.luckysheetPaintModelOn) {
                selection.pasteHandlerOfPaintModel(Store.luckysheet_copy_save);

                if (menuButton.luckysheetPaintSingle) {
                    //单次 格式刷
                    menuButton.cancelPaintModel();
                }
            }
        }

        Store.luckysheet_select_status = false;
        window.cancelAnimationFrame(Store.jfautoscrollTimeout);
        Store.luckysheet_scroll_status = false;

        $("#luckysheet-cell-selected")
            .find(".luckysheet-cs-fillhandle")
            .css("cursor", "crosshair")
            .end()
            .find(".luckysheet-cs-draghandle")
            .css("cursor", "move");
        $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor", "default");

        //行标题窗格主体
        Store.luckysheet_rows_selected_status = false;

        //列标题窗格主体
        Store.luckysheet_cols_selected_status = false;

        Store.luckysheet_model_move_state = false;

        if (formula.functionResizeStatus) {
            formula.functionResizeStatus = false;
            $("#luckysheet-wa-calculate-size").removeAttr("style");
        }

        if (!!luckysheetFreezen.horizontalmovestate) {
            luckysheetFreezen.horizontalmovestate = false;
            $("#luckysheet-freezebar-horizontal").removeClass("luckysheet-freezebar-active");
            $("#luckysheet-freezebar-horizontal")
                .find(".luckysheet-freezebar-horizontal-handle")
                .css("cursor", "-webkit-grab");
            if (luckysheetFreezen.freezenhorizontaldata[4] <= Store.columnHeaderHeight) {
                luckysheetFreezen.cancelFreezenHorizontal();
            }
            luckysheetFreezen.createAssistCanvas();
            luckysheetrefreshgrid();
        }

        if (!!luckysheetFreezen.verticalmovestate) {
            luckysheetFreezen.verticalmovestate = false;
            $("#luckysheet-freezebar-vertical").removeClass("luckysheet-freezebar-active");
            $("#luckysheet-freezebar-vertical")
                .find(".luckysheet-freezebar-vertical-handle")
                .css("cursor", "-webkit-grab");
            if (luckysheetFreezen.freezenverticaldata[4] <= Store.rowHeaderWidth) {
                luckysheetFreezen.cancelFreezenVertical();
            }
            luckysheetFreezen.createAssistCanvas();
            luckysheetrefreshgrid();
        }

        if (!!pivotTable && pivotTable.movestate) {
            $("#luckysheet-modal-dialog-slider-pivot-move").remove();
            pivotTable.movestate = false;
            $(
                "#luckysheet-modal-dialog-pivotTable-list, #luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value",
            ).css("cursor", "default");
            if (pivotTable.movesave.containerid != "luckysheet-modal-dialog-pivotTable-list") {
                let $cur = $(event.target).closest(".luckysheet-modal-dialog-slider-config-list");
                if ($cur.length == 0) {
                    if (pivotTable.movesave.containerid == "luckysheet-modal-dialog-config-value") {
                        pivotTable.resetOrderby(pivotTable.movesave.obj);
                    }

                    pivotTable.movesave.obj.remove();
                    pivotTable.showvaluecolrow();
                    $("#luckysheet-modal-dialog-pivotTable-list")
                        .find(".luckysheet-modal-dialog-slider-list-item")
                        .each(function() {
                            $(this)
                                .find(".luckysheet-slider-list-item-selected")
                                .find("i")
                                .remove();
                        });

                    $(
                        "#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value",
                    )
                        .find(".luckysheet-modal-dialog-slider-config-item")
                        .each(function() {
                            let index = $(this).data("index");

                            $("#luckysheet-modal-dialog-pivotTable-list")
                                .find(".luckysheet-modal-dialog-slider-list-item")
                                .each(function() {
                                    let $seleted = $(this).find(".luckysheet-slider-list-item-selected");
                                    if ($(this).data("index") == index && $seleted.find("i").length == 0) {
                                        $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                                    }
                                });
                        });

                    pivotTable.refreshPivotTable();
                }
            }
        }

        if (Store.luckysheet_sheet_move_status) {
            Store.luckysheet_sheet_move_status = false;
            Store.luckysheet_sheet_move_data.activeobject.insertBefore($("#luckysheet-sheets-item-clone"));
            Store.luckysheet_sheet_move_data.activeobject.removeAttr("style");
            $("#luckysheet-sheets-item-clone").remove();
            Store.luckysheet_sheet_move_data.cursorobject.css({ cursor: "pointer" });
            Store.luckysheet_sheet_move_data = {};
            sheetmanage.reOrderAllSheet();
        }

        // chart move debounce timer clear
        clearTimeout(Store.chartparam.luckysheetCurrentChartMoveTimeout);

        //图表拖动 chartMix
        if (!!Store.chartparam.luckysheetCurrentChartMove) {
            Store.chartparam.luckysheetCurrentChartMove = false;
            if (Store.chartparam.luckysheetInsertChartTosheetChange) {
                //myTop, myLeft: 本次的chart框位置，scrollLeft,scrollTop: 上一次的滚动条位置
                var myTop = Store.chartparam.luckysheetCurrentChartMoveObj.css("top"),
                    myLeft = Store.chartparam.luckysheetCurrentChartMoveObj.css("left"),
                    scrollLeft = $("#luckysheet-cell-main").scrollLeft(),
                    scrollTop = $("#luckysheet-cell-main").scrollTop();

                //点击时候存储的信息，即上一次操作结束的图表信息，x,y: chart框位置，scrollLeft1,scrollTop1: 滚动条位置
                var x = Store.chartparam.luckysheetCurrentChartMoveXy[2];
                var y = Store.chartparam.luckysheetCurrentChartMoveXy[3];

                var scrollLeft1 = Store.chartparam.luckysheetCurrentChartMoveXy[4];
                var scrollTop1 = Store.chartparam.luckysheetCurrentChartMoveXy[5];

                var chart_id = Store.chartparam.luckysheetCurrentChartMoveObj
                    .find(".luckysheet-modal-dialog-content")
                    .attr("id");

                //去除chartobj,改用chart_id代替即可定位到此图表
                Store.jfredo.push({
                    type: "moveChart",
                    chart_id: chart_id,
                    sheetIndex: Store.currentSheetIndex,
                    myTop: myTop,
                    myLeft: myLeft,
                    scrollTop: scrollTop,
                    scrollLeft: scrollLeft,
                    x: x,
                    y: y,
                    scrollTop1: scrollTop1,
                    scrollLeft1: scrollLeft1,
                });

                // luckysheet.sheetmanage.saveChart({ "chart_id": chart_id, "sheetIndex": sheetIndex, "top": myTop, "left": myLeft });
                //存储滚动条位置//协同编辑时可能影响用户操作，可以考虑不存储滚动条位置,或者滚动条信息仅仅保存到后台，但是不分发到其他设备（google sheet没有存储滚动条位置）
                // Store.server.saveParam("c", sheetIndex, { "left":myLeft, "top":myTop,"scrollTop": scrollTop, "scrollLeft": scrollLeft }, { "op":"xy", "cid": chart_id});
            }
        }

        //图表改变大小 chartMix
        if (!!Store.chartparam.luckysheetCurrentChartResize) {
            Store.chartparam.luckysheetCurrentChartResize = null;
            if (Store.chartparam.luckysheetInsertChartTosheetChange) {
                var myHeight = Store.chartparam.luckysheetCurrentChartResizeObj.height(),
                    myWidth = Store.chartparam.luckysheetCurrentChartResizeObj.width(),
                    scrollLeft = $("#luckysheet-cell-main").scrollLeft(),
                    scrollTop = $("#luckysheet-cell-main").scrollTop();

                var myTop = Store.chartparam.luckysheetCurrentChartMoveObj.css("top"),
                    myLeft = Store.chartparam.luckysheetCurrentChartMoveObj.css("left");

                var chart_id = Store.chartparam.luckysheetCurrentChartResizeObj
                    .find(".luckysheet-modal-dialog-content")
                    .attr("id");

                var myWidth1 = Store.chartparam.luckysheetCurrentChartResizeXy[2];
                var myHeight1 = Store.chartparam.luckysheetCurrentChartResizeXy[3];
                var x = Store.chartparam.luckysheetCurrentChartResizeXy[4]; //增加上一次的位置x，y
                var y = Store.chartparam.luckysheetCurrentChartResizeXy[5];
                var scrollLeft1 = Store.chartparam.luckysheetCurrentChartResizeXy[6];
                var scrollTop1 = Store.chartparam.luckysheetCurrentChartResizeXy[7];

                Store.jfredo.push({
                    type: "resizeChart",
                    chart_id: chart_id,
                    sheetIndex: Store.currentSheetIndex,
                    myTop: myTop,
                    myLeft: myLeft,
                    myHeight: myHeight,
                    myWidth: myWidth,
                    scrollTop: scrollTop,
                    scrollLeft: scrollLeft,
                    x: x,
                    y: y,
                    myWidth1: myWidth1,
                    myHeight1: myHeight1,
                    scrollTop1: scrollTop1,
                    scrollLeft1: scrollLeft1,
                });

                //加上滚动条的位置
                // luckysheet.sheetmanage.saveChart({ "chart_id": chart_id, "sheetIndex": sheetIndex, "height": myHeight, "width": myWidth, "top": myTop, "left": myLeft, "scrollTop": scrollTop, "scrollLeft": scrollLeft });

                // Store.server.saveParam("c", sheetIndex, { "width":myWidth, "height":myHeight, "top": myTop, "left": myLeft, "scrollTop": scrollTop, "scrollLeft": scrollLeft}, { "op":"wh", "cid": chart_id});
            }
        }

        if (!!formula.rangeResize) {
            formula.rangeResizeDragged(
                event,
                formula.rangeResizeObj,
                formula.rangeResize,
                formula.rangeResizexy,
                formula.rangeResizeWinW,
                formula.rangeResizeWinH,
            );
        }

        //image move
        if (imageCtrl.move) {
            imageCtrl.moveImgItem();
        }

        //image resize
        if (imageCtrl.resize) {
            imageCtrl.resizeImgItem();
        }

        //image cropChange
        if (imageCtrl.cropChange) {
            imageCtrl.cropChangeImgItem();
        }

        //批注框 移动
        if (luckysheetPostil.move) {
            luckysheetPostil.move = false;

            let ps_id = luckysheetPostil.currentObj.closest(".luckysheet-postil-show").attr("id");

            let ps_r = ps_id.split("luckysheet-postil-show_")[1].split("_")[0];
            let ps_c = ps_id.split("luckysheet-postil-show_")[1].split("_")[1];

            let d = editor.deepCopyFlowData(Store.flowdata);
            let rc = [];

            d[ps_r][ps_c].ps.left = luckysheetPostil.currentObj.position().left;
            d[ps_r][ps_c].ps.top = luckysheetPostil.currentObj.position().top;
            d[ps_r][ps_c].ps.value = luckysheetPostil.currentObj
                .find(".formulaInputFocus")
                .html()
                .replaceAll("<div>", "\n")
                .replaceAll(/<(.*)>.*?|<(.*) \/>/g, "")
                .trim();

            rc.push(ps_r + "_" + ps_c);

            luckysheetPostil.ref(d, rc);

            $("#" + ps_id).remove();

            if (d[ps_r][ps_c].ps.isshow) {
                luckysheetPostil.buildPs(ps_r, ps_c, d[ps_r][ps_c].ps);
                $("#" + ps_id).addClass("luckysheet-postil-show-active");
                $("#" + ps_id)
                    .find(".luckysheet-postil-dialog-resize")
                    .show();
            } else {
                luckysheetPostil.editPs(ps_r, ps_c);
            }
        }

        //批注框 改变大小
        if (!!luckysheetPostil.resize) {
            luckysheetPostil.resize = null;

            let ps_id = luckysheetPostil.currentObj.closest(".luckysheet-postil-show").attr("id");

            let ps_r = ps_id.split("luckysheet-postil-show_")[1].split("_")[0];
            let ps_c = ps_id.split("luckysheet-postil-show_")[1].split("_")[1];

            let d = editor.deepCopyFlowData(Store.flowdata);
            let rc = [];

            d[ps_r][ps_c].ps.left = luckysheetPostil.currentObj.position().left;
            d[ps_r][ps_c].ps.top = luckysheetPostil.currentObj.position().top;
            d[ps_r][ps_c].ps.width = luckysheetPostil.currentObj.outerWidth();
            d[ps_r][ps_c].ps.height = luckysheetPostil.currentObj.outerHeight();
            d[ps_r][ps_c].ps.value = luckysheetPostil.currentObj
                .find(".formulaInputFocus")
                .html()
                .replaceAll("<div>", "\n")
                .replaceAll(/<(.*)>.*?|<(.*) \/>/g, "")
                .trim();

            rc.push(ps_r + "_" + ps_c);

            luckysheetPostil.ref(d, rc);

            $("#" + ps_id).remove();

            if (d[ps_r][ps_c].ps.isshow) {
                luckysheetPostil.buildPs(ps_r, ps_c, d[ps_r][ps_c].ps);
                $("#" + ps_id).addClass("luckysheet-postil-show-active");
                $("#" + ps_id)
                    .find(".luckysheet-postil-dialog-resize")
                    .show();
            } else {
                luckysheetPostil.editPs(ps_r, ps_c);
            }
        }

        //改变行高
        if (Store.luckysheet_rows_change_size) {
            Store.luckysheet_rows_change_size = false;

            $("#luckysheet-change-size-line").hide();
            $("#luckysheet-rows-change-size").css("opacity", 0);
            $("#luckysheet-sheettable, #luckysheet-rows-h, #luckysheet-rows-h canvas").css("cursor", "default");

            let mouse = mouseposition(event.pageX, event.pageY);
            let scrollTop = $("#luckysheet-rows-h").scrollTop();
            let y = mouse[1] + scrollTop;
            let winH = $(window).height();

            let row_location = rowLocation(y),
                row = row_location[1],
                row_pre = row_location[0],
                row_index = row_location[2];

            let size = y + 3 - Store.luckysheet_rows_change_size_start[0];

            if (y + 3 - Store.luckysheet_rows_change_size_start[0] < 19) {
                size = 19;
            }

            if (y >= winH - 200 + scrollTop) {
                size = winH - 200 - Store.luckysheet_rows_change_size_start[0] + scrollTop;
            }

            let cfg = $.extend(true, {}, Store.config);
            if (cfg["rowlen"] == null) {
                cfg["rowlen"] = {};
            }

            if (cfg["customHeight"] == null) {
                cfg["customHeight"] = {};
            }

            cfg["customHeight"][Store.luckysheet_rows_change_size_start[1]] = 1;

            const changeRowIndex = Store.luckysheet_rows_change_size_start[1];
            let changeRowSelected = false;
            if (Store["luckysheet_select_save"].length > 0) {
                Store["luckysheet_select_save"]
                    .filter((select) => select.row_select)
                    .some((select) => {
                        if (changeRowIndex >= select.row[0] && changeRowIndex <= select.row[1]) {
                            changeRowSelected = true;
                        }
                        return changeRowSelected;
                    });
            }
            if (changeRowSelected) {
                Store["luckysheet_select_save"]
                    .filter((select) => select.row_select)
                    .forEach((select) => {
                        for (let r = select.row[0]; r <= select.row[1]; r++) {
                            cfg["rowlen"][r] = Math.ceil(size / Store.zoomRatio);
                        }
                    });
            } else {
                cfg["rowlen"][Store.luckysheet_rows_change_size_start[1]] = Math.ceil(size / Store.zoomRatio);
            }

            let images = imageCtrl.moveChangeSize("row", Store.luckysheet_rows_change_size_start[1], size);

            if (Store.clearjfundo) {
                Store.jfundo.length = 0;

                Store.jfredo.push({
                    type: "resize",
                    ctrlType: "resizeR",
                    sheetIndex: Store.currentSheetIndex,
                    config: $.extend(true, {}, Store.config),
                    curconfig: $.extend(true, {}, cfg),
                    images: $.extend(true, {}, imageCtrl.images),
                    curImages: $.extend(true, {}, images),
                });
            }

            //config
            Store.config = cfg;
            Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;

            server.saveParam("cg", Store.currentSheetIndex, cfg["rowlen"], { k: "rowlen" });

            //images
            Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].images = images;
            server.saveParam("all", Store.currentSheetIndex, images, { k: "images" });
            imageCtrl.images = images;
            imageCtrl.allImagesShow();

            jfrefreshgrid_rhcw(Store.flowdata.length, null);
        }

        //改变列宽
        if (Store.luckysheet_cols_change_size) {
            Store.luckysheet_cols_change_size = false;
            $("#luckysheet-change-size-line").hide();
            $("#luckysheet-cols-change-size").css("opacity", 0);
            $(
                "#luckysheet-sheettable, #luckysheet-cols-h-c, .luckysheet-cols-h-cells, .luckysheet-cols-h-cells canvas",
            ).css("cursor", "default");

            let mouse = mouseposition(event.pageX, event.pageY);
            let scrollLeft = $("#luckysheet-cols-h-c").scrollLeft();
            let x = mouse[0] + scrollLeft;
            let winW = $(window).width();

            let row_index = Store.visibledatarow.length - 1,
                row = Store.visibledatarow[row_index],
                row_pre = 0;
            let col_location = colLocation(x),
                col = col_location[1],
                col_pre = col_location[0],
                col_index = col_location[2];
            let size = x + 3 - Store.luckysheet_cols_change_size_start[0];

            let firstcolumnlen = Store.defaultcollen;
            if (
                Store.config["columnlen"] != null &&
                Store.config["columnlen"][Store.luckysheet_cols_change_size_start[1]] != null
            ) {
                firstcolumnlen = Store.config["columnlen"][Store.luckysheet_cols_change_size_start[1]];
            }

            if (Math.abs(size - firstcolumnlen) < 3) {
                return;
            }
            if (x + 3 - Store.luckysheet_cols_change_size_start[0] < 30) {
                size = 30;
            }

            if (x >= winW - 100 + scrollLeft) {
                size = winW - 100 - Store.luckysheet_cols_change_size_start[0] + scrollLeft;
            }

            let cfg = $.extend(true, {}, Store.config);
            if (cfg["columnlen"] == null) {
                cfg["columnlen"] = {};
            }

            if (cfg["customWidth"] == null) {
                cfg["customWidth"] = {};
            }

            cfg["customWidth"][Store.luckysheet_cols_change_size_start[1]] = 1;

            const changeColumnIndex = Store.luckysheet_cols_change_size_start[1];
            let changeColumnSelected = false;
            if (Store["luckysheet_select_save"].length > 0) {
                Store["luckysheet_select_save"]
                    .filter((select) => select.column_select)
                    .some((select) => {
                        if (changeColumnIndex >= select.column[0] && changeColumnIndex <= select.column[1]) {
                            changeColumnSelected = true;
                        }
                        return changeColumnSelected;
                    });
            }
            if (changeColumnSelected) {
                Store["luckysheet_select_save"]
                    .filter((select) => select.column_select)
                    .forEach((select) => {
                        for (let r = select.column[0]; r <= select.column[1]; r++) {
                            cfg["columnlen"][r] = Math.ceil(size / Store.zoomRatio);
                        }
                    });
            } else {
                cfg["columnlen"][Store.luckysheet_cols_change_size_start[1]] = Math.ceil(size / Store.zoomRatio);
            }

            let images = imageCtrl.moveChangeSize("column", Store.luckysheet_cols_change_size_start[1], size);

            if (Store.clearjfundo) {
                Store.jfundo.length = 0;

                Store.jfredo.push({
                    type: "resize",
                    ctrlType: "resizeC",
                    sheetIndex: Store.currentSheetIndex,
                    config: $.extend(true, {}, Store.config),
                    curconfig: $.extend(true, {}, cfg),
                    images: $.extend(true, {}, imageCtrl.images),
                    curImages: $.extend(true, {}, images),
                });
            }

            //config
            Store.config = cfg;
            Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;

            server.saveParam("cg", Store.currentSheetIndex, cfg["columnlen"], { k: "columnlen" });

            //images
            Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].images = images;
            server.saveParam("all", Store.currentSheetIndex, images, { k: "images" });
            imageCtrl.images = images;
            imageCtrl.allImagesShow();

            jfrefreshgrid_rhcw(null, Store.flowdata[0].length);

            setTimeout(function() {
                luckysheetrefreshgrid();
            }, 1);
        }

        if (formula.rangeMove) {
            formula.rangeMoveDragged(formula.rangeMoveObj);
        }

        //改变选择框的位置并替换目标单元格
        if (Store.luckysheet_cell_selected_move) {
            $("#luckysheet-cell-selected-move").hide();

            Store.luckysheet_cell_selected_move = false;
            let mouse = mouseposition(event.pageX, event.pageY);

            if (!checkProtectionLockedRangeList(Store.luckysheet_select_save, Store.currentSheetIndex)) {
                return;
            }

            let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            let scrollTop = $("#luckysheet-cell-main").scrollTop();

            let x = mouse[0] + scrollLeft;
            let y = mouse[1] + scrollTop;

            let winH = $(window).height() + scrollTop - Store.sheetBarHeight - Store.statisticBarHeight,
                winW = $(window).width() + scrollLeft;

            let row_index = rowLocation(y)[2];
            let col_index = colLocation(x)[2];

            let row_index_original = Store.luckysheet_cell_selected_move_index[0],
                col_index_original = Store.luckysheet_cell_selected_move_index[1];

            if (row_index == row_index_original && col_index == col_index_original) {
                return;
            }

            let d = editor.deepCopyFlowData(Store.flowdata);
            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];

            let data = getdatabyselection(last);

            let cfg = $.extend(true, {}, Store.config);
            if (cfg["merge"] == null) {
                cfg["merge"] = {};
            }
            if (cfg["rowlen"] == null) {
                cfg["rowlen"] = {};
            }

            //选区包含部分单元格
            if (hasPartMC(cfg, last["row"][0], last["row"][1], last["column"][0], last["column"][1])) {
                if (isEditMode()) {
                    alert(locale_drag.noMerge);
                } else {
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>', locale_drag.noMerge);
                }
                return;
            }

            let row_s = last["row"][0] - row_index_original + row_index,
                row_e = last["row"][1] - row_index_original + row_index;
            let col_s = last["column"][0] - col_index_original + col_index,
                col_e = last["column"][1] - col_index_original + col_index;

            if (
                !checkProtectionLockedRangeList(
                    [{ row: [row_s, row_e], column: [col_s, col_e] }],
                    Store.currentSheetIndex,
                )
            ) {
                return;
            }

            if (row_s < 0 || y < 0) {
                row_s = 0;
                row_e = last["row"][1] - last["row"][0];
            }

            if (col_s < 0 || x < 0) {
                col_s = 0;
                col_e = last["column"][1] - last["column"][0];
            }

            if (row_e >= Store.visibledatarow[Store.visibledatarow.length - 1] || y > winH) {
                row_s = Store.visibledatarow.length - 1 - last["row"][1] + last["row"][0];
                row_e = Store.visibledatarow.length - 1;
            }

            if (col_e >= Store.visibledatacolumn[Store.visibledatacolumn.length - 1] || x > winW) {
                col_s = Store.visibledatacolumn.length - 1 - last["column"][1] + last["column"][0];
                col_e = Store.visibledatacolumn.length - 1;
            }

            //替换的位置包含部分单元格
            if (hasPartMC(cfg, row_s, row_e, col_s, col_e)) {
                if (isEditMode()) {
                    alert(locale_drag.noMerge);
                } else {
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>', locale_drag.noMerge);
                }
                return;
            }

            let borderInfoCompute = getBorderInfoCompute(Store.currentSheetIndex);

            //删除原本位置的数据
            let RowlChange = null;
            for (let r = last["row"][0]; r <= last["row"][1]; r++) {
                if (r in cfg["rowlen"]) {
                    RowlChange = true;
                }

                for (let c = last["column"][0]; c <= last["column"][1]; c++) {
                    let cell = d[r][c];

                    if (getObjType(cell) == "object" && "mc" in cell) {
                        if (cell["mc"].r + "_" + cell["mc"].c in cfg["merge"]) {
                            delete cfg["merge"][cell["mc"].r + "_" + cell["mc"].c];
                        }
                    }

                    d[r][c] = null;
                }
            }

            //边框
            if (cfg["borderInfo"] && cfg["borderInfo"].length > 0) {
                let borderInfo = [];

                for (let i = 0; i < cfg["borderInfo"].length; i++) {
                    let bd_rangeType = cfg["borderInfo"][i].rangeType;

                    if (bd_rangeType == "range") {
                        let bd_range = cfg["borderInfo"][i].range;
                        let bd_emptyRange = [];

                        for (let j = 0; j < bd_range.length; j++) {
                            bd_emptyRange = bd_emptyRange.concat(
                                conditionformat.CFSplitRange(
                                    bd_range[j],
                                    { row: last["row"], column: last["column"] },
                                    { row: [row_s, row_e], column: [col_s, col_e] },
                                    "restPart",
                                ),
                            );
                        }

                        cfg["borderInfo"][i].range = bd_emptyRange;

                        borderInfo.push(cfg["borderInfo"][i]);
                    } else if (bd_rangeType == "cell") {
                        let bd_r = cfg["borderInfo"][i].value.row_index;
                        let bd_c = cfg["borderInfo"][i].value.col_index;

                        if (
                            !(
                                bd_r >= last["row"][0] &&
                                bd_r <= last["row"][1] &&
                                bd_c >= last["column"][0] &&
                                bd_c <= last["column"][1]
                            )
                        ) {
                            borderInfo.push(cfg["borderInfo"][i]);
                        }
                    }
                }

                cfg["borderInfo"] = borderInfo;
            }
            //替换位置数据更新
            let offsetMC = {};
            for (let r = 0; r < data.length; r++) {
                for (let c = 0; c < data[0].length; c++) {
                    if (borderInfoCompute[r + last["row"][0] + "_" + (c + last["column"][0])]) {
                        let bd_obj = {
                            rangeType: "cell",
                            value: {
                                row_index: r + row_s,
                                col_index: c + col_s,
                                l: borderInfoCompute[r + last["row"][0] + "_" + (c + last["column"][0])].l,
                                r: borderInfoCompute[r + last["row"][0] + "_" + (c + last["column"][0])].r,
                                t: borderInfoCompute[r + last["row"][0] + "_" + (c + last["column"][0])].t,
                                b: borderInfoCompute[r + last["row"][0] + "_" + (c + last["column"][0])].b,
                            },
                        };

                        if (cfg["borderInfo"] == null) {
                            cfg["borderInfo"] = [];
                        }

                        cfg["borderInfo"].push(bd_obj);
                    }

                    let value = "";
                    if (data[r] != null && data[r][c] != null) {
                        value = data[r][c];
                    }

                    if (getObjType(value) == "object" && "mc" in value) {
                        let mc = $.extend(true, {}, value["mc"]);
                        if ("rs" in value["mc"]) {
                            offsetMC[mc.r + "_" + mc.c] = [r + row_s, c + col_s];

                            value["mc"].r = r + row_s;
                            value["mc"].c = c + col_s;

                            cfg["merge"][r + row_s + "_" + (c + col_s)] = value["mc"];
                        } else {
                            value["mc"].r = offsetMC[mc.r + "_" + mc.c][0];
                            value["mc"].c = offsetMC[mc.r + "_" + mc.c][1];
                        }
                    }
                    d[r + row_s][c + col_s] = value;
                }
            }

            if (RowlChange) {
                cfg = rowlenByRange(d, last["row"][0], last["row"][1], cfg);
                cfg = rowlenByRange(d, row_s, row_e, cfg);
            }

            //条件格式
            let cdformat = $.extend(
                true,
                [],
                Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"],
            );
            if (cdformat != null && cdformat.length > 0) {
                for (let i = 0; i < cdformat.length; i++) {
                    let cdformat_cellrange = cdformat[i].cellrange;
                    let emptyRange = [];
                    for (let j = 0; j < cdformat_cellrange.length; j++) {
                        let range = conditionformat.CFSplitRange(
                            cdformat_cellrange[j],
                            { row: last["row"], column: last["column"] },
                            { row: [row_s, row_e], column: [col_s, col_e] },
                            "allPart",
                        );
                        emptyRange = emptyRange.concat(range);
                    }
                    cdformat[i].cellrange = emptyRange;
                }
            }

            let rf;
            if (Store.luckysheet_select_save[0].row_focus == Store.luckysheet_select_save[0].row[0]) {
                rf = row_s;
            } else {
                rf = row_e;
            }

            let cf;
            if (Store.luckysheet_select_save[0].column_focus == Store.luckysheet_select_save[0].column[0]) {
                cf = col_s;
            } else {
                cf = col_e;
            }

            let range = [];
            range.push({ row: last["row"], column: last["column"] });
            range.push({ row: [row_s, row_e], column: [col_s, col_e] });

            last["row"] = [row_s, row_e];
            last["column"] = [col_s, col_e];
            last["row_focus"] = rf;
            last["column_focus"] = cf;

            let allParam = {
                cfg: cfg,
                RowlChange: RowlChange,
                cdformat: cdformat,
            };

            jfrefreshgrid(d, range, allParam);

            selectHightlightShow();

            $("#luckysheet-sheettable").css("cursor", "default");
            clearTimeout(Store.countfuncTimeout);
            Store.countfuncTimeout = setTimeout(function() {
                countfunc();
            }, 500);
        }

        //图表选区拖拽移动
        if (Store.chart_selection.rangeMove) {
            Store.chart_selection.rangeMoveDragged();
        }

        //图表选区拖拽拉伸
        if (!!Store.chart_selection.rangeResize) {
            Store.chart_selection.rangeResizeDragged();
        }

        //选区下拉
        if (Store.luckysheet_cell_selected_extend) {
            Store.luckysheet_cell_selected_extend = false;
            $("#luckysheet-cell-selected-extend").hide();

            if (!checkProtectionLockedRangeList(Store.luckysheet_select_save, Store.currentSheetIndex)) {
                return;
            }

            let mouse = mouseposition(event.pageX, event.pageY);
            let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            let scrollTop = $("#luckysheet-cell-main").scrollTop();

            let x = mouse[0] + scrollLeft - 5;
            let y = mouse[1] + scrollTop - 5;

            let winH = $(window).height() + scrollTop - Store.sheetBarHeight - Store.statisticBarHeight,
                winW = $(window).width() + scrollLeft;

            let row_location = rowLocation(y),
                row = row_location[1],
                row_pre = row_location[0],
                row_index = row_location[2];
            let col_location = colLocation(x),
                col = col_location[1],
                col_pre = col_location[0],
                col_index = col_location[2];

            let row_index_original = Store.luckysheet_cell_selected_extend_index[0],
                col_index_original = Store.luckysheet_cell_selected_extend_index[1];

            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let row_s = last["row"][0],
                row_e = last["row"][1];
            let col_s = last["column"][0],
                col_e = last["column"][1];

            if (row_s < 0 || y < 0) {
                row_s = 0;
                row_e = last["row"][1] - last["row"][0];
            }

            if (col_s < 0 || x < 0) {
                col_s = 0;
                col_e = last["column"][1] - last["column"][0];
            }

            if (row_e >= Store.visibledatarow[Store.visibledatarow.length - 1] || y > winH) {
                row_s = Store.visibledatarow.length - 1 - last["row"][1] + last["row"][0];
                row_e = Store.visibledatarow.length - 1;
            }

            if (col_e >= Store.visibledatacolumn[Store.visibledatacolumn.length - 1] || x > winW) {
                col_s = Store.visibledatacolumn.length - 1 - last["column"][1] + last["column"][0];
                col_e = Store.visibledatacolumn.length - 1;
            }

            //复制范围
            luckysheetDropCell.copyRange = {
                row: $.extend(true, [], last["row"]),
                column: $.extend(true, [], last["column"]),
            };
            //applyType
            let typeItemHide = luckysheetDropCell.typeItemHide();

            if (
                !typeItemHide[0] &&
                !typeItemHide[1] &&
                !typeItemHide[2] &&
                !typeItemHide[3] &&
                !typeItemHide[4] &&
                !typeItemHide[5] &&
                !typeItemHide[6]
            ) {
                luckysheetDropCell.applyType = "0";
            } else {
                luckysheetDropCell.applyType = "1";
            }

            if (Math.abs(row_index_original - row_index) > Math.abs(col_index_original - col_index)) {
                if (!(row_index >= row_s && row_index <= row_e)) {
                    if (Store.luckysheet_select_save[0].top_move >= row_pre) {
                        //当往上拖拽时
                        luckysheetDropCell.applyRange = {
                            row: [row_index, last["row"][0] - 1],
                            column: last["column"],
                        };
                        luckysheetDropCell.direction = "up";

                        row_s -= last["row"][0] - row_index;

                        //是否有数据透视表范围
                        if (pivotTable.isPivotRange(row_s, col_e)) {
                            tooltip.info(locale_drag.affectPivot, "");
                            return;
                        }
                    } else {
                        //当往下拖拽时
                        luckysheetDropCell.applyRange = {
                            row: [last["row"][1] + 1, row_index],
                            column: last["column"],
                        };
                        luckysheetDropCell.direction = "down";

                        row_e += row_index - last["row"][1];

                        //是否有数据透视表范围
                        if (pivotTable.isPivotRange(row_e, col_e)) {
                            tooltip.info(locale_drag.affectPivot, "");
                            return;
                        }
                    }
                } else {
                    return;
                }
            } else {
                if (!(col_index >= col_s && col_index <= col_e)) {
                    if (Store.luckysheet_select_save[0].left_move >= col_pre) {
                        //当往左拖拽时
                        luckysheetDropCell.applyRange = {
                            row: last["row"],
                            column: [col_index, last["column"][0] - 1],
                        };
                        luckysheetDropCell.direction = "left";

                        col_s -= last["column"][0] - col_index;

                        //是否有数据透视表范围
                        if (pivotTable.isPivotRange(row_e, col_s)) {
                            tooltip.info(locale_drag.affectPivot, "");
                            return;
                        }
                    } else {
                        //当往右拖拽时
                        luckysheetDropCell.applyRange = {
                            row: last["row"],
                            column: [last["column"][1] + 1, col_index],
                        };
                        luckysheetDropCell.direction = "right";

                        col_e += col_index - last["column"][1];

                        //是否有数据透视表范围
                        if (pivotTable.isPivotRange(row_e, col_e)) {
                            tooltip.info(locale_drag.affectPivot, "");
                            return;
                        }
                    }
                } else {
                    return;
                }
            }

            if (Store.config["merge"] != null) {
                let hasMc = false;

                for (let r = last["row"][0]; r <= last["row"][1]; r++) {
                    for (let c = last["column"][0]; c <= last["column"][1]; c++) {
                        let cell = Store.flowdata[r][c];

                        if (cell != null && cell.mc != null) {
                            hasMc = true;
                            break;
                        }
                    }
                }

                if (hasMc) {
                    if (isEditMode()) {
                        alert(locale_drag.noMerge);
                    } else {
                        tooltip.info(locale_drag.noMerge, "");
                    }

                    return;
                }

                for (let r = row_s; r <= row_e; r++) {
                    for (let c = col_s; c <= col_e; c++) {
                        let cell = Store.flowdata[r][c];

                        if (cell != null && cell.mc != null) {
                            hasMc = true;
                            break;
                        }
                    }
                }

                if (hasMc) {
                    if (isEditMode()) {
                        alert(locale_drag.noMerge);
                    } else {
                        tooltip.info(locale_drag.noMerge, "");
                    }

                    return;
                }
            }

            last["row"] = [row_s, row_e];
            last["column"] = [col_s, col_e];

            luckysheetDropCell.update();
            luckysheetDropCell.createIcon();

            $("#luckysheet-cell-selected-move").hide();

            $("#luckysheet-sheettable").css("cursor", "default");
            clearTimeout(Store.countfuncTimeout);
            Store.countfuncTimeout = setTimeout(function() {
                countfunc();
            }, 500);
        }
    });

    //禁止浏览器 右键默认菜单
    $(".luckysheet-grid-container, #luckysheet-rightclick-menu").on("contextmenu", function(e) {
        e.preventDefault();
    });

    // //禁止前台编辑(只可 框选单元格、滚动查看表格)
    // if(!Store.allowEdit){
    //     return;
    // }

    //选区拖动替换
    $("#luckysheet-cell-main div.luckysheet-cs-draghandle").mousedown(function(event) {
        if (isEditMode() || Store.allowEdit === false) {
            //此模式下禁用选区拖动
            return;
        }

        $("#luckysheet-cell-selected")
            .find(".luckysheet-cs-fillhandle")
            .css("cursor", "move")
            .end()
            .find(".luckysheet-cs-draghandle")
            .css("cursor", "move");
        $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor", "move");

        Store.luckysheet_cell_selected_move = true;
        Store.luckysheet_scroll_status = true;

        let mouse = mouseposition(event.pageX, event.pageY);
        let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

        let row_location = rowLocation(y),
            row_pre = row_location[0],
            row = row_location[1],
            row_index = row_location[2];
        let col_location = colLocation(x),
            col_pre = col_location[0],
            col = col_location[1],
            col_index = col_location[2];

        Store.luckysheet_cell_selected_move_index = [row_index, col_index];

        $("#luckysheet-cell-selected-move").css({
            left: col_pre,
            width: col - col_pre - 1,
            top: row_pre,
            height: row - row_pre - 1,
            display: "block",
        });

        event.stopPropagation();
    });

    //选区下拉
    $("#luckysheet-cell-main div.luckysheet-cs-fillhandle")
        .mousedown(function(event) {
            if (isEditMode() || Store.allowEdit === false) {
                //此模式下禁用选区下拉
                return;
            }

            $("#luckysheet-cell-selected")
                .find(".luckysheet-cs-fillhandle")
                .css("cursor", "crosshair")
                .end()
                .find(".luckysheet-cs-draghandle")
                .css("cursor", "crosshair");
            $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor", "crosshair");

            Store.luckysheet_cell_selected_extend_time = setTimeout(function() {
                Store.luckysheet_cell_selected_extend = true;
                Store.luckysheet_scroll_status = true;

                let mouse = mouseposition(event.pageX, event.pageY);
                let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft() - 5;
                let y = mouse[1] + $("#luckysheet-cell-main").scrollTop() - 5;

                let row_location = rowLocation(y),
                    row_pre = row_location[0],
                    row = row_location[1],
                    row_index = row_location[2];
                let col_location = colLocation(x),
                    col_pre = col_location[0],
                    col = col_location[1],
                    col_index = col_location[2];

                Store.luckysheet_cell_selected_extend_index = [row_index, col_index];

                $("#luckysheet-cell-selected-extend").css({
                    left: col_pre,
                    width: col - col_pre - 1,
                    top: row_pre,
                    height: row - row_pre - 1,
                    display: "block",
                });
            }, 100);

            event.stopPropagation();
        })
        .click(function() {
            clearTimeout(Store.luckysheet_cell_selected_extend_time);
            event.stopPropagation();
        })
        .dblclick(function() {
            let last = Store.luckysheet_select_save[0];

            let r0 = last.row[0],
                r1 = last.row[1],
                c0 = last.column[0],
                c1 = last.column[1];

            if (pivotTable.isPivotRange(r0, c0)) {
                return;
            }

            let dropCellState = false;
            let step = 0;

            for (let r = r1 + 1; r < Store.flowdata.length; r++) {
                if (c0 - 1 >= 0 && c1 + 1 < Store.flowdata[0].length) {
                    let cell1 = Store.flowdata[r][c0 - 1];
                    let cell2 = Store.flowdata[r][c1 + 1];

                    if (r == r1 + 1) {
                        if ((cell1 == null || isRealNull(cell1.v)) && (cell2 == null || isRealNull(cell2.v))) {
                            dropCellState = false;
                            break;
                        } else {
                            dropCellState = true;
                            step++;
                        }
                    } else {
                        if ((cell1 == null || isRealNull(cell1.v)) && (cell2 == null || isRealNull(cell2.v))) {
                            break;
                        }

                        step++;
                    }
                } else if (c0 - 1 >= 0) {
                    let cell = Store.flowdata[r][c0 - 1];

                    if (r == r1 + 1) {
                        if (cell == null || isRealNull(cell.v)) {
                            dropCellState = false;
                            break;
                        } else {
                            dropCellState = true;
                            step++;
                        }
                    } else {
                        if (cell == null || isRealNull(cell.v)) {
                            break;
                        }

                        step++;
                    }
                } else if (c1 + 1 < Store.flowdata[0].length) {
                    let cell = Store.flowdata[r][c1 + 1];

                    if (r == r1 + 1) {
                        if (cell == null || isRealNull(cell.v)) {
                            dropCellState = false;
                            break;
                        } else {
                            dropCellState = true;
                            step++;
                        }
                    } else {
                        if (cell == null || isRealNull(cell.v)) {
                            break;
                        }

                        step++;
                    }
                }
            }

            if (!dropCellState || step == 0) {
                event.stopPropagation();
                return;
            }

            //复制范围
            luckysheetDropCell.copyRange = { row: [r0, r1], column: [c0, c1] };

            //applyType
            let typeItemHide = luckysheetDropCell.typeItemHide();

            if (
                !typeItemHide[0] &&
                !typeItemHide[1] &&
                !typeItemHide[2] &&
                !typeItemHide[3] &&
                !typeItemHide[4] &&
                !typeItemHide[5] &&
                !typeItemHide[6]
            ) {
                luckysheetDropCell.applyType = "0";
            } else {
                luckysheetDropCell.applyType = "1";
            }

            luckysheetDropCell.applyRange = { row: [r1 + 1, r1 + step], column: [c0, c1] };
            luckysheetDropCell.direction = "down";

            Store.luckysheet_select_save = [{ row: [r0, r1 + step], column: [c0, c1] }];

            luckysheetDropCell.update();
            luckysheetDropCell.createIcon();

            $("#luckysheet-cell-selected-move").hide();

            $("#luckysheet-sheettable").css("cursor", "default");
            clearTimeout(Store.countfuncTimeout);
            Store.countfuncTimeout = setTimeout(function() {
                countfunc();
            }, 500);

            event.stopPropagation();
        });

    //
    $("#luckysheet-bottom-add-row, #luckysheet-bottom-add-row-input, #luckysheet-bottom-return-top").on(
        "mousedown dblclick mouseup",
        function(e) {
            e.stopPropagation();
        },
    );

    //底部添加行按钮
    $("#luckysheet-bottom-add-row").on("click", function(e) {
        $("#luckysheet-rightclick-menu").hide();
        luckysheetContainerFocus();

        let $t = $(this),
            value = $("#luckysheet-bottom-add-row-input").val();

        if (value == "") {
            value = luckysheetConfigsetting.addRowCount || 5;
        }

        if (isNaN(parseInt(value))) {
            if (isEditMode()) {
                alert(locale_info.tipInputNumber);
            } else {
                tooltip.info("error", locale_info.tipInputNumber);
            }
            return;
        }

        value = parseInt(value);
        if (value < 1 || value > 10) { // 1-10 行数据
            if (isEditMode()) {
                alert(locale_info.tipInputNumberLimit);
            } else {
                tooltip.info("error", locale_info.tipInputNumberLimit);
            }
            return;
        }

        luckysheetextendtable("row", Store.flowdata.length - 1, value);
    });

    $("#luckysheet-bottom-return-top").on("click", function(e) {
        $("#luckysheet-scrollbar-y").scrollTop(0);
    });

    //右键菜单 复制按钮 
    $("#luckysheet-copy-btn, #luckysheet-cols-copy-btn, #luckysheet-paste-btn-title").click(function(event) {
        $(this)
            .parent()
            .hide();
        //复制范围内包含部分合并单元格，提示
        if (Store.config["merge"] != null) {
            let has_PartMC = false;

            for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                let r1 = Store.luckysheet_select_save[s].row[0],
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0],
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if (has_PartMC) {
                    break;
                }
            }

            if (has_PartMC) {
                if (isEditMode()) {
                    alert(locale_drag.noPartMerge);
                } else {
                    tooltip.info(locale_drag.noPartMerge, "");
                }
                return;
            }
        }

        //多重选区 有条件格式时 提示
        let cdformat = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].luckysheet_conditionformat_save;
        if (Store.luckysheet_select_save.length > 1 && cdformat != null && cdformat.length > 0) {
            let hasCF = false;

            let cf_compute = conditionformat.getComputeMap();

            label: for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                if (hasCF) {
                    break;
                }

                let r1 = Store.luckysheet_select_save[s].row[0],
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0],
                    c2 = Store.luckysheet_select_save[s].column[1];

                for (let r = r1; r <= r2; r++) {
                    for (let c = c1; c <= c2; c++) {
                        if (conditionformat.checksCF(r, c, cf_compute) != null) {
                            hasCF = true;
                            continue label;
                        }
                    }
                }
            }

            if (hasCF) {
                if (isEditMode()) {
                    alert(locale_drag.noMulti);
                } else {
                    tooltip.info(locale_drag.noMulti, "");
                }
                return;
            }
        }

        //多重选区 行不一样且列不一样时 提示
        if (Store.luckysheet_select_save.length > 1) {
            let isSameRow = true,
                str_r = Store.luckysheet_select_save[0].row[0],
                end_r = Store.luckysheet_select_save[0].row[1];
            let isSameCol = true,
                str_c = Store.luckysheet_select_save[0].column[0],
                end_c = Store.luckysheet_select_save[0].column[1];

            for (let s = 1; s < Store.luckysheet_select_save.length; s++) {
                if (
                    Store.luckysheet_select_save[s].row[0] != str_r ||
                    Store.luckysheet_select_save[s].row[1] != end_r
                ) {
                    isSameRow = false;
                }
                if (
                    Store.luckysheet_select_save[s].column[0] != str_c ||
                    Store.luckysheet_select_save[s].column[1] != end_c
                ) {
                    isSameCol = false;
                }
            }

            if ((!isSameRow && !isSameCol) || selectIsOverlap()) {
                if (isEditMode()) {
                    alert(locale_drag.noMulti);
                } else {
                    tooltip.info(locale_drag.noMulti, "");
                }
                return;
            }
        }

        selection.copy(event);
    });

    //右键菜单 粘贴按钮
    $("#luckysheet-copy-paste, #luckysheet-cols-paste-btn, #luckysheet-paste-btn-title").click(function(event) {
        selection.paste(event, "btn");
        $(this)
            .parent()
            .hide();
    });

    //Menu bar, Chart button
    $("#luckysheet-chart-btn-title").click(function() {
        createLuckyChart();
    });

    // Right-click the menu, chart generation
    $("#luckysheetdatavisual").click(function() {
        createLuckyChart();
        $("#luckysheet-rightclick-menu").hide();
    });

    //菜单栏 数据透视表
    $("#luckysheet-pivot-btn-title").click(function(e) {
        if (!checkProtectionAuthorityNormal(Store.currentSheetIndex, "usePivotTablereports")) {
            return;
        }
        pivotTable.createPivotTable(e);
    });

    //菜单栏 截图按钮
    $("#luckysheet-chart-btn-screenshot").click(function() {
        const locale_screenshot = _locale.screenshot;
        if (Store.luckysheet_select_save.length == 0) {
            if (isEditMode()) {
                alert(locale_screenshot.screenshotTipNoSelection);
            } else {
                tooltip.info(locale_screenshot.screenshotTipTitle, locale_screenshot.screenshotTipNoSelection);
            }
            return;
        }

        if (Store.luckysheet_select_save.length > 1) {
            if (isEditMode()) {
                alert(locale_screenshot.screenshotTipHasMulti);
            } else {
                tooltip.info(locale_screenshot.screenshotTipTitle, locale_screenshot.screenshotTipHasMulti);
            }

            return;
        }

        //截图范围内包含部分合并单元格，提示
        if (Store.config["merge"] != null) {
            let has_PartMC = false;

            for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                let r1 = Store.luckysheet_select_save[s].row[0],
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0],
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if (has_PartMC) {
                    break;
                }
            }

            if (has_PartMC) {
                if (isEditMode()) {
                    alert(locale_screenshot.screenshotTipHasMerge);
                } else {
                    tooltip.info(locale_screenshot.screenshotTipTitle, locale_screenshot.screenshotTipHasMerge);
                }
                return;
            }
        }

        let st_r = Store.luckysheet_select_save[0].row[0],
            ed_r = Store.luckysheet_select_save[0].row[1];
        let st_c = Store.luckysheet_select_save[0].column[0],
            ed_c = Store.luckysheet_select_save[0].column[1];

        let scrollHeight, rh_height;
        if (st_r - 1 < 0) {
            scrollHeight = 0;
            rh_height = Store.visibledatarow[ed_r];
        } else {
            scrollHeight = Store.visibledatarow[st_r - 1];
            rh_height = Store.visibledatarow[ed_r] - Store.visibledatarow[st_r - 1];
        }

        let scrollWidth, ch_width;
        if (st_c - 1 < 0) {
            scrollWidth = 0;
            ch_width = Store.visibledatacolumn[ed_c];
        } else {
            scrollWidth = Store.visibledatacolumn[st_c - 1];
            ch_width = Store.visibledatacolumn[ed_c] - Store.visibledatacolumn[st_c - 1];
        }

        let newCanvas = $("<canvas>")
            .attr({
                width: Math.ceil(ch_width * Store.devicePixelRatio),
                height: Math.ceil(rh_height * Store.devicePixelRatio),
            })
            .css({ width: ch_width, height: rh_height });

        luckysheetDrawMain(scrollWidth, scrollHeight, ch_width, rh_height, 1, 1, null, null, newCanvas);
        let ctx_newCanvas = newCanvas.get(0).getContext("2d");

        //补上 左边框和上边框
        ctx_newCanvas.beginPath();
        ctx_newCanvas.moveTo(0, 0);
        ctx_newCanvas.lineTo(0, Store.devicePixelRatio * rh_height);
        ctx_newCanvas.lineWidth = Store.devicePixelRatio * 2;
        ctx_newCanvas.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        ctx_newCanvas.stroke();
        ctx_newCanvas.closePath();

        ctx_newCanvas.beginPath();
        ctx_newCanvas.moveTo(0, 0);
        ctx_newCanvas.lineTo(Store.devicePixelRatio * ch_width, 0);
        ctx_newCanvas.lineWidth = Store.devicePixelRatio * 2;
        ctx_newCanvas.strokeStyle = luckysheetdefaultstyle.strokeStyle;
        ctx_newCanvas.stroke();
        ctx_newCanvas.closePath();

        let image = new Image();
        let url = newCanvas.get(0).toDataURL("image/png");
        image.src = url;

        if (ch_width > rh_height) {
            image.style.width = "100%";
        } else {
            image.style.height = "100%";
        }

        let maxHeight = $(window).height() - 200;
        tooltip.screenshot(
            locale_screenshot.screenshotTipSuccess,
            '<div id="luckysheet-confirm-screenshot-save" style="height:' + maxHeight + 'px;overflow:auto;"></div>',
            url,
        );
        $("#luckysheet-confirm-screenshot-save").append(image);
        newCanvas.remove();
    });

    //截图下载
    $(document).on("click.luckysheetEvent", "a.download", function() {
        let dataURI = $("#luckysheet-confirm-screenshot-save img").attr("src");
        const locale_screenshot = _locale.screenshot;
        let binStr = atob(dataURI.split(",")[1]),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
        }

        let blob = new Blob([arr]);

        let element = document.createElement("a");
        element.setAttribute("href", URL.createObjectURL(blob));
        element.setAttribute("download", locale_screenshot.screenshotImageName + ".png");

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        let clickHandler;
        element.addEventListener(
            "click",
            (clickHandler = function() {
                requestAnimationFrame(function() {
                    URL.revokeObjectURL(element.href);
                });

                element.removeAttribute("href");
                element.removeEventListener("click", clickHandler);
            }),
        );

        document.body.removeChild(element);
    });

    //菜单栏 分列按钮
    $("#luckysheet-splitColumn-btn-title").click(function() {
        if (!checkProtectionNotEnable(Store.currentSheetIndex)) {
            return;
        }

        if (Store.luckysheet_select_save == null || Store.luckysheet_select_save.length == 0) {
            return;
        }

        const locale_splitText = _locale.splitText;

        if (Store.luckysheet_select_save.length > 1) {
            tooltip.info(locale_splitText.tipNoMulti, "");
            return;
        }

        if (Store.luckysheet_select_save[0].column[0] != Store.luckysheet_select_save[0].column[1]) {
            tooltip.info(locale_splitText.tipNoMultiColumn, "");
            return;
        }

        splitColumn.createDialog();
        splitColumn.init();
    });

    //菜单栏 插入图片按钮
    $("#luckysheet-insertImg-btn-title").click(function() {
        // *如果禁止前台编辑，则中止下一步操作
        if (!checkIsAllowEdit()) {
            tooltip.info("", locale().pivotTable.errorNotAllowEdit);
            return;
        }
        if (!checkProtectionAuthorityNormal(Store.currentSheetIndex, "editObjects")) {
            return;
        }
        $("#luckysheet-imgUpload").click();
    });
    $("#luckysheetInsertImage").click(function() {
        if (!checkProtectionAuthorityNormal(Store.currentSheetIndex, "editObjects")) {
            return;
        }
        $("#luckysheet-imgUpload").click();
        $("#luckysheet-rightclick-menu").hide();
    });
    $("#luckysheet-imgUpload").click(function(e) {
        e.stopPropagation();
    });
    $("#luckysheet-imgUpload").on("change", function(e) {
        if (!checkProtectionAuthorityNormal(Store.currentSheetIndex, "editObjects", false)) {
            return;
        }
        let file = e.currentTarget.files[0];
        imageCtrl.insertImg(file);
    });

    //菜单栏 插入链接按钮
    $("#luckysheet-insertLink-btn-title").click(function() {
        // *如果禁止前台编辑，则中止下一步操作
        if (!checkIsAllowEdit()) {
            tooltip.info("", locale().pivotTable.errorNotAllowEdit);
        }
        if (!checkProtectionNotEnable(Store.currentSheetIndex)) {
            return;
            return;
        }

        hyperlinkCtrl.createDialog();
        hyperlinkCtrl.init();
    });
    $("#luckysheetInsertLink").click(function() {
        $("#luckysheet-insertLink-btn-title").click();
        $("#luckysheet-rightclick-menu").hide();
    });

    //菜单栏 数据验证按钮
    $("#luckysheet-dataVerification-btn-title").click(function() {
        if (!checkProtectionNotEnable(Store.currentSheetIndex)) {
            return;
        }

        if (Store.luckysheet_select_save == null || Store.luckysheet_select_save.length == 0) {
            return;
        }

        dataVerificationCtrl.createDialog();
        dataVerificationCtrl.init();
    });
    $("#luckysheetDataVerification").click(function() {
        $("#luckysheet-dataVerification-btn-title").click();
        $("#luckysheet-rightclick-menu").hide();
    });

    //Cell format
    $("#luckysheetCellFormatRightClickMenu").click(function() {
        openCellFormatModel();
    });

    //冻结行列
    $("#luckysheet-freezen-btn-horizontal").click(function() {
        if ($.trim($(this).text()) == locale().freezen.freezenCancel) {
            luckysheetFreezen.saveFrozen("freezenCancel");

            if (luckysheetFreezen.freezenverticaldata != null) {
                luckysheetFreezen.cancelFreezenVertical();
                luckysheetFreezen.createAssistCanvas();
                luckysheetrefreshgrid();
            }

            if (luckysheetFreezen.freezenhorizontaldata != null) {
                luckysheetFreezen.cancelFreezenHorizontal();
                luckysheetFreezen.createAssistCanvas();
                luckysheetrefreshgrid();
            }

            luckysheetFreezen.scrollAdapt();
            // cancel 之后 勾勾取消
            $("#luckysheet-icon-freezen-menu-menuButton")
                .find(".fa.fa-check")
                .remove();
        } else {
            luckysheetFreezen.saveFrozen("freezenRow");

            if (luckysheetFreezen.freezenverticaldata != null) {
                luckysheetFreezen.cancelFreezenVertical();
                luckysheetFreezen.createAssistCanvas();
                luckysheetrefreshgrid();
            }

            if (luckysheetFreezen.freezenhorizontaldata == null) {
                luckysheetFreezen.createFreezenHorizontal();
                luckysheetFreezen.createAssistCanvas();
            }
        }
    });

    $("#luckysheet-freezen-btn-vertical").click(function() {
        if (luckysheetFreezen.freezenverticaldata != null) {
            luckysheetFreezen.saveFrozen("freezenCancel");

            luckysheetFreezen.cancelFreezenVertical();
            luckysheetrefreshgrid();
        } else {
            luckysheetFreezen.saveFrozen("freezenColumn");

            luckysheetFreezen.createFreezenVertical();
        }
        luckysheetFreezen.createAssistCanvas();
    });

    $("#luckysheet-rightclick-menu input").on("keydown", function(e) {
        e.stopPropagation();
    });

    $("#luckysheet-modal-dialog-mask").on("click dbclick mousedown mousemove mouseup", function(e) {
        e.stopPropagation();
        e.preventDefault();
    });

    //菜单栏 导出按钮
    $("#luckysheet-exportXlsx-btn-title").click(function() {

        const exportXlsxInfo =  Store.plugins.find(plugin => plugin.name === 'exportXlsx')
        if(exportXlsxInfo){
            const url = exportXlsxInfo?.config?.url;
            if(url){
                createExportDialog(url)
            }
        }else{
            tooltip.info(_locale.exportXlsx.notice, "");
        }
    });

    let copychange = function() {
        if (document.hidden || document.webkitHidden || document.msHidden) {
            Store.iscopyself = false;
        }
    };

    $(document)
        .on(
            "visibilitychange.luckysheetEvent webkitvisibilitychange.luckysheetEvent msvisibilitychange.luckysheetEvent",
            copychange,
        )
        .on("mouseleave.luckysheetEvent", function() {
            Store.iscopyself = false;
        })
        .on("mousedown.luckysheetEvent", function(event) {
            //有批注在编辑时
            luckysheetPostil.removeActivePs();

            hideMenuByCancel(event);

            //点击功能栏时 如果是单元格编辑模式 则退出编辑模式
            if (
                $(event.target).closest("#luckysheet-wa-editor").length > 0 &&
                parseInt($("#luckysheet-input-box").css("top")) > 0
            ) {
                formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
            }
        });

    //表格左上角点击 全选表格
    $("#luckysheet-left-top").click(function(event) {
        if (!checkProtectionAllSelected(Store.currentSheetIndex)) {
            return;
        }

        $("#luckysheet-wa-functionbox-confirm").click();
        Store.luckysheet_select_status = false;

        Store.luckysheet_select_save = [
            {
                row: [0, Store.flowdata.length - 1],
                column: [0, Store.flowdata[0].length - 1],
                row_focus: 0,
                column_focus: 0,
                row_select: true,
                column_select: true,
            },
        ];
        selectHightlightShow();

        clearTimeout(Store.countfuncTimeout);
        Store.countfuncTimeout = setTimeout(function() {
            countfunc();
        }, 500);

        /* 选中区域：发送网络请求 */
        server.saveParam("mv", Store.currentSheetIndex, Store.luckysheet_select_save);

        event.stopPropagation();
    });

    //回退 重做 按钮
    $("#luckysheet-icon-undo").click(function(event) {
        if ($(this).hasClass("disabled")) {
            return;
        }
        controlHistory.redo(event);
    });
    $("#luckysheet-icon-redo").click(function(event) {
        if ($(this).hasClass("disabled")) {
            return;
        }
        controlHistory.undo(event);
    });

    //模态框拖动
    $(document).on("mousedown.luckysheetEvent", "div.luckysheet-modal-dialog", function(e) {
        if (!$(e.target).is(".luckysheet-modal-dialog")) {
            return;
        }

        Store.luckysheet_model_move_state = true;

        Store.luckysheet_model_move_obj = $(e.currentTarget);
        let toffset = Store.luckysheet_model_move_obj.offset();
        Store.luckysheet_model_xy = [e.pageX - toffset.left, e.pageY - toffset.top];
    });

    //模态框关闭
    $(document).on(
        "click.luckysheetEvent",
        ".luckysheet-modal-dialog-title-close, .luckysheet-model-close-btn",
        function(e) {
            //选择文本颜色和单元格颜色弹出框取消
            if ($("#textcolorselect").is(":visible") || $("#cellcolorselect").is(":visible")) {
                $("#luckysheet-conditionformat-dialog").show();
            }
            $(e.currentTarget)
                .parents(".luckysheet-modal-dialog")
                .hide();
            $("#luckysheet-modal-dialog-mask").hide();

            //函数查找功能所有弹出框关闭和取消
            if (
                $(this)
                    .parents(".luckysheet-modal-dialog")
                    .hasClass("luckysheet-search-formula")
            ) {
                formula.dontupdate();
                luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
            }
            if (
                $(this)
                    .parents(".luckysheet-modal-dialog")
                    .hasClass("luckysheet-search-formula-parm")
            ) {
                formula.dontupdate();
                luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
            }
            if (
                $(this)
                    .parents(".luckysheet-modal-dialog")
                    .hasClass("luckysheet-search-formula-parm-select")
            ) {
                formula.dontupdate();
                luckysheetMoveHighlightCell("down", 0, "rangeOfSelect");
            }

            luckysheetContainerFocus();
        },
    );

    //左上角返回按钮
    $("#luckysheet_info_detail_title").click(function() {
        window.open(luckysheetConfigsetting.myFolderUrl, "_self");
    });

    //图表选区mousedown
    $("#luckysheet-chart-rangeShow").on("mousedown.chartRangeShowMove", ".luckysheet-chart-rangeShow-move", function(
        event,
    ) {
        Store.chart_selection.rangeMove = true;
        Store.luckysheet_scroll_status = true;

        Store.chart_selection.rangeMoveObj = $(this).parent();

        let chart_json = Store.currentChart;

        let $id = $(this)
            .parent()
            .attr("id");
        if ($id == "luckysheet-chart-rangeShow-content") {
            let row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.content.row[0];
            let col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.content.column[0];

            Store.chart_selection.rangeMoveIndex = [row_s, col_s];
        } else if ($id == "luckysheet-chart-rangeShow-rowtitle") {
            let row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.rowtitle.row[0];
            let col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.rowtitle.column[0];

            Store.chart_selection.rangeMoveIndex = [row_s, col_s];
        } else if ($id == "luckysheet-chart-rangeShow-coltitle") {
            let row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.coltitle.row[0];
            let col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.coltitle.column[0];

            Store.chart_selection.rangeMoveIndex = [row_s, col_s];
        }

        let mouse = mouseposition(event.pageX, event.pageY);
        let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
        let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();
        let type = $(this).data("type");
        if (type == "top") {
            y += 3;
        } else if (type == "right") {
            x -= 3;
        } else if (type == "bottom") {
            y -= 3;
        } else if (type == "left") {
            x += 3;
        }

        let row_index = rowLocation(y)[2];
        let col_index = colLocation(x)[2];

        Store.chart_selection.rangeMovexy = [row_index, col_index];

        event.stopPropagation();
    });

    $("#luckysheet-chart-rangeShow").on(
        "mousedown.chartRangeShowResize",
        ".luckysheet-chart-rangeShow-resize",
        function(event) {
            Store.chart_selection.rangeResize = $(this).data("type"); //开始状态resize
            Store.luckysheet_scroll_status = true;

            Store.chart_selection.rangeResizeObj = $(this).parent();

            let chart_json = Store.currentChart;
            let row_s;
            let row_e;
            let col_s;
            let col_e;

            let $id = $(this)
                .parent()
                .attr("id");
            if ($id == "luckysheet-chart-rangeShow-content") {
                if (chart_json.rangeRowCheck.exits) {
                    row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.content.row[0];
                    row_e = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.content.row[1];
                } else {
                    row_s = chart_json.rangeSplitArray.content.row[0];
                    row_e = chart_json.rangeSplitArray.content.row[0];
                }

                if (chart_json.rangeColCheck.exits) {
                    col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.content.column[0];
                    col_e = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.content.column[1];
                } else {
                    col_s = chart_json.rangeSplitArray.content.column[0];
                    col_e = chart_json.rangeSplitArray.content.column[1];
                }

                Store.chart_selection.rangeResizeIndex = { row: [row_s, row_e], column: [col_s, col_e] };
            } else if ($id == "luckysheet-chart-rangeShow-rowtitle") {
                let row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.rowtitle.row[0];
                let row_e = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.rowtitle.row[1];

                let col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.rowtitle.column[0];
                let col_e = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.rowtitle.column[1];

                Store.chart_selection.rangeResizeIndex = { row: [row_s, row_e], column: [col_s, col_e] };
            } else if ($id == "luckysheet-chart-rangeShow-coltitle") {
                let row_s = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.coltitle.row[0];
                let row_e = chart_json.rangeArray[0].row[0] + chart_json.rangeSplitArray.coltitle.row[1];

                let col_s = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.coltitle.column[0];
                let col_e = chart_json.rangeArray[0].column[0] + chart_json.rangeSplitArray.coltitle.column[1];

                Store.chart_selection.rangeResizeIndex = { row: [row_s, row_e], column: [col_s, col_e] };
            }

            let mouse = mouseposition(event.pageX, event.pageY);
            let x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
            let y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

            if (Store.chart_selection.rangeResize == "lt") {
                x += 3;
                y += 3;
            } else if (Store.chart_selection.rangeResize == "lb") {
                x += 3;
                y -= 3;
            } else if (Store.chart_selection.rangeResize == "rt") {
                x -= 3;
                y += 3;
            } else if (Store.chart_selection.rangeResize == "rb") {
                x -= 3;
                y -= 3;
            }

            let row_index = rowLocation(y)[2];
            let col_index = colLocation(x)[2];

            Store.chart_selection.rangeResizexy = [row_index, col_index];

            event.stopPropagation();
        },
    );

    $("#luckysheet-wa-calculate-size").mousedown(function(e) {
        let y = e.pageY;
        formula.functionResizeData.y = y;
        formula.functionResizeStatus = true;
        formula.functionResizeData.calculatebarHeight = Store.calculatebarHeight;
        if (formula.rangetosheet && formula.rangetosheet != null) {
            formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
        }
    });

    // 点击设置字体大小的下拉箭头，把自动聚焦输入框去除（认为下拉设置字体大小，不需要聚焦输入框）
    // //toolbar菜单
    // $("#" + Store.container + " .luckysheet-wa-editor").on("click", ".luckysheet-toolbar-zoom-combobox", function (e) {
    //     $(e.currentTarget).addClass("luckysheet-toolbar-combo-button-open");
    //     $(e.currentTarget).find(".luckysheet-toolbar-combo-button-input").focus();
    // });

    // $("#" + Store.container + " .luckysheet-wa-editor").on("blur", ".luckysheet-toolbar-combo-button-input", function (e) {
    //     $(e.currentTarget).closest(".luckysheet-toolbar-zoom-combobox").removeClass("luckysheet-toolbar-combo-button-open");
    // });

    //表格格式处理
    menuButton.initialMenuButton();

    let dpi_x = document.getElementById("testdpidiv").offsetWidth * Store.devicePixelRatio;
    let dpi_y = document.getElementById("testdpidiv").offsetHeight * Store.devicePixelRatio;

    //粘贴事件处理
    $(document).on("paste.luckysheetEvent", function(e) {
        // hz_tag
        // 变量备注：
        // cpDataArr
        // clipboardData    window中的粘贴板数据
        // txtdata          clipboardData 中的文本数据
        // locale_fontjson    字体名字与编号的映射对象，如：  "微软雅黑": 4
        // data  ？ 最终复制的数据
        // 
        // hz 添加的特殊操作：
        // 1.（lh - 20230922）z粘贴时保留换行符
        if (isEditMode()) {
            //此模式下禁用粘贴
            return;
        }
        if (selection.isPasteAction) {
            $("#luckysheet-rich-text-editor").blur();
            selection.isPasteAction = false;

            let clipboardData = window.clipboardData; //for IE
            if (!clipboardData) {
                // for chrome
                clipboardData = e.originalEvent.clipboardData;
            }

            let txtdata = clipboardData.getData("text/html") || clipboardData.getData("text/plain");
            console.log(txtdata); // hz_flag debugger1

            // navigator.clipboard.writeText(txtdata) // hz_flag
            // .then(() => {
               
            //     console.log("数据已复制到剪贴板");
            // })
            // .catch((error) => {
             
            //     console.error("复制数据到剪贴板时出错:", error);
            // });

            //如果标示是qksheet复制的内容，判断剪贴板内容是否是当前页面复制的内容
            let isEqual = true;
            if (
                txtdata.indexOf("luckysheet_copy_action_table") > -1 &&
                Store.luckysheet_copy_save["copyRange"] != null &&
                Store.luckysheet_copy_save["copyRange"].length > 0
            ) {
                //剪贴板内容解析
                let cpDataArr = [];

                let reg = new RegExp("<tr.*?>(.*?)</tr>", "gs");
                let reg2 = new RegExp("<td.*?>(.*?)</td>", "gs");

                let regArr = txtdata.match(reg) || [];

                for (let i = 0; i < regArr.length; i++) {
                    let cpRowArr = [];

                    let reg2Arr = regArr[i].match(reg2);

                    if (reg2Arr != null) {
                        for (let j = 0; j < reg2Arr.length; j++) {
                            let cpValue = reg2Arr[j].replace(/<td.*?>/gs, "").replace(/<\/td>/gs, "");
                            cpRowArr.push(cpValue);
                        }
                    }

                    cpDataArr.push(cpRowArr);
                }

                //当前页面复制区内容
                let copy_r1 = Store.luckysheet_copy_save["copyRange"][0].row[0],
                    copy_r2 = Store.luckysheet_copy_save["copyRange"][0].row[1],
                    copy_c1 = Store.luckysheet_copy_save["copyRange"][0].column[0],
                    copy_c2 = Store.luckysheet_copy_save["copyRange"][0].column[1];

                let copy_index = Store.luckysheet_copy_save["dataSheetIndex"];

                let d;
                if (copy_index == Store.currentSheetIndex) {
                    d = editor.deepCopyFlowData(Store.flowdata);
                } else {
                    d = Store.luckysheetfile[getSheetIndex(copy_index)].data;
                }

                for (let r = copy_r1; r <= copy_r2; r++) {
                    if (r - copy_r1 > cpDataArr.length - 1) {
                        break;
                    }
                    for (let c = copy_c1; c <= copy_c2; c++) {
                        let cell = d[r][c];
                        let isInlineStr = false;
                        if (cell != null && cell.mc != null && cell.mc.rs == null) {
                            continue;
                        }

                        let v;
                        if (cell != null) {
                            if (cell.ct != null && cell.ct.fa.indexOf("w") > -1) {
                                v = d[r][c].v;
                            } else {
                                v = d[r][c].m;
                            }
                        } else {
                            v = "";
                        }

                        if (v == null && d[r][c] && d[r][c].ct && d[r][c].ct.t == "inlineStr") {
                            v = d[r][c].ct.s.map((val) => val.v).join("");
                            isInlineStr = true;
                        }
                        if (v == null) {
                            v = "";
                        }
                        if (isInlineStr) {
                            const cpData = $(cpDataArr[r - copy_r1][c - copy_c1])
                                .text()
                                .replace(/\s|\n/g, " ");
                            const storeValue = v.replace(/\n/g, "").replace(/\s/g, " ");
                            if (cpData != storeValue) {
                                isEqual = false;
                                break;
                            }
                        } else {
                            if (cpDataArr[r - copy_r1][c - copy_c1] != v) {
                                isEqual = false;
                                break;
                            }
                        }
                    }
                }
            }

            const locale_fontjson = locale().fontjson;
            // hook
            if (!method.createHookFunction("rangePasteBefore", Store.luckysheet_select_save, txtdata)) {
                return;
            }

            if (
                txtdata.indexOf("luckysheet_copy_action_table") > -1 &&
                Store.luckysheet_copy_save["copyRange"] != null &&
                Store.luckysheet_copy_save["copyRange"].length > 0 &&
                isEqual
            ) {
                //剪切板内容 和 luckysheet本身复制的内容 一致
                if (Store.luckysheet_paste_iscut) {
                    Store.luckysheet_paste_iscut = false;
                    selection.pasteHandlerOfCutPaste(Store.luckysheet_copy_save);
                    selection.clearcopy(e);
                } else { // 内部粘贴直接走了这个方法
                    selection.pasteHandlerOfCopyPaste(Store.luckysheet_copy_save);
                }
            } else if (txtdata.indexOf("luckysheet_copy_action_image") > -1) {
                imageCtrl.pasteImgItem();
            } else {
                // debugger; //hz_flag
                if (txtdata.indexOf("table") > -1) {
                    $("#luckysheet-copy-content").html(txtdata);

                    let data = new Array($("#luckysheet-copy-content").find("table tr").length);
                    //debugger;
                    let colLen = 0;
                    const cellElements = "th, td";
                    $("#luckysheet-copy-content") // 这个是判断列数，判断粘贴的数据有多少列
                        .find("table tr")
                        .eq(0)
                        .find(cellElements)
                        .each(function() {
                            let colspan = parseInt($(this).attr("colspan"));
                            if (isNaN(colspan)) {
                                colspan = 1;
                            }
                            colLen += colspan;
                        });

                    for (let i = 0; i < data.length; i++) {
                        data[i] = new Array(colLen);
                    }

                    let r = 0;
                    let borderInfo = {};
                    let rowlen = {};
                    let columnlen = {};
                    let styleMap = {};
                    try{ // 兼容粘貼wps的ppt中的数据 ，将任意类名的样式保存下来
                        
                        let stylePattern = /\.([a-zA-Z0-9_\-]+)\s*\{([^\}]*)\}/mg;
                        let styleElement = $('style')[0];
                        let match;
                        while (match = stylePattern.exec(styleElement.innerHTML)) {
                            let className = match[1];
                            let styleString = match[2];
                            let styleAttributes = styleString.split(';');
                            let attributeMap = {};
                            for(let attribute of styleAttributes){
                                let keyValue = attribute.split(':').map(s => s.trim());
                                if(keyValue.length == 2){
                                    attributeMap[keyValue[0]] = keyValue[1];
                                }
                            }
                            styleMap[className] = attributeMap;
                        }
                    }
                   catch(e){}
                    $("#luckysheet-copy-content") // hz_tag 从luckysheet-copy-content 中寻找复制到的元素
                        .find("table tr")
                        .each(function() {
                            // debugger;
                            let $tr = $(this);
                            let c = 0;
                            let txt_td_p_v = null;
                            let td_p_num = 0 ;
                            let now_r =  Store.luckysheet_select_save[0]["row"][0] + r;  // 当前更改那一行 
                            let is_luckysheet_table_data_flag = false; // 用来标识luckysheet 内部粘贴的的数据标识
                            let colgroupElement = null;
                            if(this.parentElement.parentElement.getAttribute('data-type') === 'luckysheet_copy_action_table') {
                                is_luckysheet_table_data_flag = true; // 标明这个是luckysheet 内部粘贴的数据，       
                                colgroupElement = this.parentNode.parentNode.firstChild;
                            }
                            
                            // debugger;

                            // 先尝试从属性中获取
                            let row_h = null;
                            row_h = this.getAttribute('height');
                            if (!row_h) {
                                row_h = this.style.height;
                                if (row_h && row_h !== '') {
                                    rowlen[now_r] = handle_pt_or_px(row_h);
                                }
                            }else {
                                if(row_h === '0') { //尝试从table 哪里获取
                                    row_h = this.parentElement.parentElement.style.height;
                                    if(!row_h){
                                        row_h =  null;
                                    }
                                }
                                if(row_h){
                                    let parsedHeight = Math.round(parseInt(row_h) / 3.6);
                                    if (parsedHeight > 100) {
                                      rowlen[now_r] = parsedHeight;
                                    }else {
                                        rowlen[now_r] = handle_pt_or_px(row_h);
                                    }
                                    
                                }
                            }
                           
                            let col_w = "";
                            // debugger;
                            $tr.find(cellElements).each(function () { // 处理tr 中每个元素的td
                                // debugger;
                                let now_c = Store.luckysheet_select_save[0]["column"][0] + c; // 当前更改那一列 
                                if (is_luckysheet_table_data_flag) {  // 处理表格内部复制的列宽信息
                                    let colElement = colgroupElement.children[c];
                                    if (colElement) {
                                        col_w = colElement.getAttribute('width');
                                        
                                            if (col_w === '0') { //尝试从table 哪里获取
                                                col_w = this.parentElement.parentElement.style.width;
                                                if (!col_w) { // 如果还是获取不到
                                                    col_w = null;
                                                }
                                            }
                                            
                                        if(col_w ){
                                            columnlen[now_c] = handle_pt_or_px(col_w);
                                        }
                                    }

                                } else {
                                    // debugger;
                                    col_w = this.getAttribute('width');
                                    if (!col_w) {
                                        col_w = this.style.width;
                                        if (col_w && col_w !== '') {
                                            columnlen[now_c] = handle_pt_or_px(col_w);
                                        }
                                    } else {
                                        if (col_w === '0') { //尝试从table 哪里获取
                                            col_w = this.parentElement.parentElement.style.width;
                                            if (!col_w) {
                                                col_w = null;
                                            }
                                        }
                                        if (col_w) {
                                            columnlen[now_c] = handle_pt_or_px(col_w);
                                        }
                                    }
                                }
                     

                                let $td = $(this);
                            // 如果当前是p 标签并且上一个是p 标签
                                // 那么 给当前cell 添加一个换行的标识
                              
                                let cell = {};
                                let txt = $td.text();
                                let origin_v = null;
                                let special_td_flag = false; // 特殊td标识，标识是否是wps 这种特殊的格式
                                let td_many_s = []; // ct->->s的数组 cell.v.ct 中s 的值
                                let td_only_br_and_content = false ; // 当前单元格只包括 br 这种情况，如果有了这个标识，$td.find("*")就不用再执行
                                let td_br_many_s = []; // ct->->s的数组 cell.v.ct 中s 的值, 当前单元格只包括 br 这种情况
                                let td_contain_tag =  false;  // 用来标识和处理  <p><span style='font-family:微软雅黑;font-size:18pt;font-weight:bold;color:#ffffff'>序号</span > < /p> 这种情况
                                let last_p_and_now_p = false; // 用来标记两次出现了p
                                
                                if ($.trim(txt).length == 0) {
                                    cell.v = null;
                                    cell.m = "";
                                } 
                                else 
                                {
                                      // hz_flag 这个是为了处理   $(this).innerHTML = "12312312<br>2131231<br><br><br>" 这种类型的数据,这种数据每行都没有样式
                                    var content = $(this).html();
                                    // let text = $(this).text();
                                    if (/<br\s*\/?>/.test(content.trim()) && !/<\/?[^br\/][^>]*>/.test(content.trim())) {
                                        // 匹配成功，内容只包含文字和<br>标签
                                        // 1、 将里面的内容一个一个切割出来
                                        // 2、 设置 td_only_br_and_content，设置一个单独的[]存储切割出来的内容
                                        //3、 最后将对应的数据替换到ct 中

                                        // 处理1 
                                        var parts = content.split(/<br\s*\/?>/);
                                        let cell_br_s_parent = JSON.parse(JSON.stringify(get_paste_cell_style($td, cell, styleMap)));
                                        // debugger;

                                        for (var i = 0; i < parts.length; i++) {
                                            // debugger;
                                            // 深拷贝一个上面的
                                            let cell_br_s =  JSON.parse(JSON.stringify(cell_br_s_parent));
                                            console.log(parts[i]); // 这里可以处理每一个切割后的部分
                                            parts[i] = parts[i].trim(); // // 去除每个元素内的多余空格
                                            if (parts[i] === '\n') { // 只有\n 和个空格
                                                parts[i] = '\r\n';
                                            } else {
                                                parts[i] = parts[i] ;
                                            }
                                            if (parts[i] && parts[i].length == 0) {
                                                cell_br_s.v = null;
                                                cell_br_s.m = "";
                                            } else {
                                                cell_br_s.v = parts[i];
                                                cell_br_s.m = parts[i];
                                            }
                                            td_br_many_s.push(cell_br_s);

                                         
                                         
                                        }

                                          //  上面的处理无法渲染
                                        //     debugger;
                                        // cell.v = text;
                                        // cell.m = text;
                                        // cell = get_paste_cell_style($td, cell);
                                        // td_br_many_s.push(cell);
                                         td_only_br_and_content =  true;
                                      } else {
                                 

                                        // td_contain_tag =  false; 用来标识和处理  <p><span style='font-family:微软雅黑;font-size:18pt;font-weight:bold;color:#ffffff'>序号</span > < /p> 这种情况
                                        console.log(($(this).children().length));
                                        if (this.nodeType == 1 && ($(this).children().length === 1) ){ // 其中$(this).children().length是判断它的孩子而不是孩子的下一代
                                            // 跳过包含标签的文本节点
                                            td_contain_tag = true;
                                            cell = get_paste_cell_style_two_tag($td, cell,styleMap);
                                        }

                                         // debugger;
                                    // hz_tag 保留换行符
                                    // 如果$td.html()中有包含2个以上的标签，设置一个flag
                                          if ($td.find('*').length > 2 && $td.find('font').length == 0 && $td.find('p').length < 1) {
                                            //   debugger;
                                              // 设置flag
                                              special_td_flag = true;
                                              origin_v = $td.contents().first().text(); // 获取第一个子元素的文
                                          } else if ($td.contents().filter(function () {
                                              return this.nodeType === Node.TEXT_NODE && this.textContent.trim() !== '';
                                          }).length > 0) {
                                            //   debugger;
                                              // 设置flag
                                              special_td_flag = true;
                                              origin_v = $td.contents().filter(function () {
                                                  return this.nodeType === Node.TEXT_NODE && this.textContent.trim() !== '';
                                              }).first().text(); // 获取第一个非空文本节点的内容
                                          }
                                          // 不只包含<br>标签的处理逻辑
                                          // let _html = $td.html().replace(/<br>/g, '\n') +'';
                                          let _html = $td.html().replace(/<br>/g, '\r\n') + '';
                                          // let _html = $td.html().replace(/<br\s*\/?>/g, '\r\n') + '';
                                          let _div_temp = $(`<div>${_html}</div>`)
                                          let _text = _div_temp.text()
                                          // let mask = genarate($td.text());
                                          let mask = genarate(_text);

                                          cell.v = mask[2];
                                          cell.ct = mask[1];
                                          cell.m = mask[0];
                                      }
                                
                                    
                                    if(special_td_flag){
                                        cell.v =origin_v
                                        cell.m =origin_v;
                                    }   
                                    
                                  
                                   
                                }

                             
                                //hz_flag
                                if (!td_only_br_and_content && !td_contain_tag){
                                    let last_p = false ; // hz_flag 用来标识td 中 上一个兄弟节点是不是为p 标签，td 是每一个一级的元素来循环
                                    $td.find("*").each(function () { // 处理 td 中每个元素，如果有
                                        // debugger;
                                        const $td_c = $(this);
                                        // var $content = $child.contents();
                                        // 判断元素是否为标签或者元素的内容是否为标签
                                        // if ($child[0].nodeType !== 1 || ($content.length === 1 && $content[0].nodeType === 1)) {
                                        //     return; // 跳过本次操作
                                        // }
                                  
                                        console.log(($(this).children().length));
                                        console.log(($(this).children().length) > 1 );
                                        console.log(this.nodeType == 1);
                                        // if (this.nodeType == 1 && ($(this).children().length >= 1)  || ($td_c.is("br")) && !($td_c.is("font")) ){
                                        if (this.nodeType == 1 && ($(this).children().length >= 1) && !($td_c.is("font")) ){

                                            // 如果是p 标签标记一下
                                            if ($td_c.is("p")) { // 将p 标签标记出来
                                                if(last_p) {
                                                    last_p_and_now_p = true;
                                                }else {
                                                    last_p = true;
                                                }
                                            }
                                            return; // 跳过包含标签的文本节点 、br 标签
                                        }
                                        // debugger;
                                        
                                        // 处理上一个p 遗留的换行的问题，主要是ppt的 // hz_flag
                                        if(last_p_and_now_p){
                                            // 将最后一个元素取出来，将值设置为换行然后推送进去
                                            if(td_many_s.length > 0){
                                                let lastElement_cell = JSON.parse(JSON.stringify(td_many_s[td_many_s.length - 1])); // 可深刻json 类型可序列化的，函数和循环引用不可拷贝
                                                txt_td_p_v = "\r\n"; // 需要在前面
                                                lastElement_cell.v = txt_td_p_v;
                                                lastElement_cell.m = txt_td_p_v;
                                                td_many_s.push(lastElement_cell);
                                                last_p_and_now_p = false;
                                            }
                                        }
                                        let txt_td_c = $td_c.text(); // 当前文本
                                   
                                        
    
                                        // td.1 获取字体的一些属性
                                        // td.2 设置字体的一些属性
                                        let td_c_cell = {}; // td的单元格
                                        let fontSize_td_c = null;
                                        let fontFamily_td_c = null;
                                        let fontWeight_td_c = null;
                                        // let backgroundColor_td_c = null;
                                        let fontColor_td_c = null;
                                        let un_td_c = null;
                                        let it_td_c = null;
    
                                        if ($td_c.is("br")) {
                                            txt_td_c = "\r\n"; // 如果当前获取到的元素是br 标签，txt_td_c需要设置成换行换行符
                                        }
                                        // 处理td
                                        
                                        if (txt_td_c.length == 0) {
                                            // debugger;
                                            if($td_c.is("font") && txt_td_c ===''){ // 兼容luckysheet 内部复制时，数据错误的bug
                                                txt_td_c = "\r\n";
                                            }
                                            td_c_cell.v = txt_td_c;
                                            td_c_cell.m = txt_td_c;
                                        } else {
                                            // debugger;
                                            td_c_cell.v = txt_td_c;
                                            td_c_cell.m = txt_td_c;
                                        }
                                        if (td_c_cell.v) {
                                            if ($td_c.attr('class')) {
                                                let className = $td_c.attr('class');
                                                if (styleMap[className]) {
                                                    fontColor_td_c = styleMap[className]['color'];
                                                    fontWeight_td_c = styleMap[className]['font-weight'];
                                                    fontSize_td_c = styleMap[className]['font-size'];
                                                    fontFamily_td_c = styleMap[className]['font-family'];
                                                }
                                            } else {
                                                fontColor_td_c = $td_c.css("color");
                                                if (fontColor_td_c) { // 说明该标签上有内容，所以有样式
                                                    if (fontColor_td_c == "rgba(0, 0, 0, 0)") {
                                                        fontColor_td_c = null;
                                                    }
                                                }
    
                                                fontWeight_td_c = $td_c.css("font-weight");
    
                                                // 检测下划线
                                                un_td_c = $td_c.css("text-decoration");
    
                                                it_td_c = $td_c.css("font-style");
    
                                                fontSize_td_c = $td_c.css('font-size');
    
                                                if (!fontSize_td_c && fontSize_td != 0) {
                                                    fontSize_td_c = 12;
                                                } else {
                                                    if (fontSize_td_c.endsWith("px")) {
                                                        let pxValue = parseInt(fontSize_td_c, 10);
                                                        fontSize_td_c = Math.round(pxValue / 1.333);
                                                    } else {
                                                        fontSize_td_c = parseInt(fontSize_td_c, 10);
                                                    }
                                                }
    
                                                fontFamily_td_c = $td.css("font-family");
                                            }
    
    
                                            td_c_cell.fc = fontColor_td_c;
                                            if (fontWeight_td_c == "400" || fontWeight_td_c == "normal" || fontWeight_td_c == '400') {
                                                td_c_cell.bl = 0;
                                            } else {
                                                td_c_cell.bl = 1;
                                            }
                                            if (un_td_c && un_td_c.indexOf("underline") != -1) {
                                                td_c_cell.un = 1;
                                            }
                                            if (it_td_c == "normal") {
                                                td_c_cell.it = 0;
                                            } else {
                                                td_c_cell.it = 1;
                                            }
                                            td_c_cell.fs = fontSize_td_c;
                                            if (fontFamily_td_c) { // 说明该标签上有内容，所以有样式
                                                let fontFamily_td_c_temp = fontFamily_td_c.toLowerCase();
                                                fa_td_c = locale_fontjson[fontFamily_td_c_temp];
                                                if (!fa_td_c && fa_td_c !== 0) {
                                                    fa_td_c = 4;
                                                }
                                            }

                                            // 垂直对齐属性
                                            let vt = $td.css("vertical-align");
                                            if (vt == "middle") {
                                                cell.vt = 0;
                                            } else if (vt == "top" || vt == "text-top") {
                                                cell.vt = 1;
                                            } else {
                                                cell.vt = 2;
                                            }
                                            // 水平对齐属性
                                          
                                            let ht = $td.css("text-align");
                                            // if(vt == "middle" && !ht  || (!ht && (vt == "top" || vt == "text-top")) ){ // 如果水平方向的获取不到，但是垂直方向是居中，兼容wps 的水平方向上也居中
                                            //     ht == "center";
                                            // }
                                            if (ht == "center") {
                                                cell.ht = 0;
                                            } else if (ht == "right") {
                                                cell.ht = 2;
                                            } else {
                                                cell.ht = 1;
                                            }

                                            td_c_cell.ff = fontFamily_td_c;
                                            
                                        }
                                        td_many_s.push(td_c_cell);
                                    });
                                    cell = get_paste_cell_style($td, cell,styleMap);
                                    
                                }
                               

                                // hz-flag  处理行高和列宽的问题
                                while (c < colLen && data[r][c] != null) {
                                    c++;
                                }

                                if (c == colLen) {
                                    return true;
                                }
                             
                                // debugger;
                                if (special_td_flag && td_many_s.length > 1) {
                                    // debugger;
                                    let orgin_cell_copy = null;
                                    // 深拷贝cell对象
                                    orgin_cell_copy = $.extend(true, {}, cell);
                                    if (orgin_cell_copy) {
                                        delete orgin_cell_copy.bg; // 删除bg属性  
                                        orgin_cell_copy
                                    }
                                    td_many_s.unshift(orgin_cell_copy);
                                }
                                // if (td_p_num > 1) {
                                //     orgin_cell_p_copy = $.extend(true, {}, cell);
                                //     if (orgin_cell_p_copy) {
                                //         delete orgin_cell_copy.bg; // 删除bg属性  
                                //         orgin_cell_p_copy.cell = txt_td_p_v;
                                //     }
                                //     td_many_s.push(orgin_cell_p_copy); // 在开头插入元素
                                // }
                                // 如果有
                                // 参照$td.find("*")中的写法，如果special_td_flag为true 时，向td_many_s的最前面添加一个对象,对象里面的属性是参照td_c_cell
                                // debugger;
                                if (td_many_s.length > 1 || td_p_num > 1 || td_only_br_and_content) { // 说明获取到了td 下的多个数据,或者 获取到了多个p 标签td_p_num > 1
                                    // 删除cell  cell.v 下的v 属性，如果每一个为空就创建为对象，然后删除cell.v.v 属性
                                    if (!cell.hasOwnProperty('ct')) { // 没有v 属性
                                        cell.ct = {}
                                    } 
                                    if (cell.hasOwnProperty('v')) {
                                        // origin_v = cell.v
                                        delete cell.v;
                                    }
                                    // 接下来类似删除m 属性，如果每一个为空就创建为对象，然后删除cell.m.m 属性
                                    if (cell.hasOwnProperty('m')) {
                                        // origin_m = cell.ct.m
                                        delete cell.m;
                                    }

                                    // debugger;
                                    // 将数组赋值给cell.v.ct 对象
                                    if (!cell.ct) {
                                        cell.ct = { "fa": "@", "t": "inlineStr", "s": td_only_br_and_content ?td_br_many_s:td_many_s ,"t": 'inlineStr'}
                                    } else {
                                        if (!cell.ct.hasOwnProperty('t') || cell.ct.t !== "inlineStr") {
                                            cell.ct.t = 'inlineStr';
                                        }
                                        if(!cell.ct.hasOwnProperty('fa')){
                                            cell.ct.fa = "@";
                                        }
                                        // debugger;
                                        cell.ct.s = td_only_br_and_content ?td_br_many_s:td_many_s;
                                    }
                                    

                                }
                                


                                if (data[r][c] == null) {
                                    data[r][c] = cell;
                                    // debugger;
                                    let rowspan = parseInt($td.attr("rowspan"));
                                    let colspan = parseInt($td.attr("colspan"));

                                    if (isNaN(rowspan)) {
                                        rowspan = 1;
                                    }

                                    if (isNaN(colspan)) {
                                        colspan = 1;
                                    }

                                    let r_ab = Store.luckysheet_select_save[0]["row"][0] + r;
                                    let c_ab = Store.luckysheet_select_save[0]["column"][0] + c;

                                    for (let rp = 0; rp < rowspan; rp++) {
                                        for (let cp = 0; cp < colspan; cp++) {
                                            if (rp == 0) {
                                                let bt = $td.css("border-top");
                                                if (
                                                    bt != null &&
                                                    bt.length > 0 &&
                                                    bt.substr(0, 3).toLowerCase() != "0px"
                                                ) {
                                                    let width = $td.css("border-top-width");
                                                    let type = $td.css("border-top-style");
                                                    let color = $td.css("border-top-color");
                                                    let borderconfig = menuButton.getQKBorder(width, type, color);

                                                    if (borderInfo[r + rp + "_" + (c + cp)] == null) {
                                                        borderInfo[r + rp + "_" + (c + cp)] = {};
                                                    }

                                                    borderInfo[r + rp + "_" + (c + cp)].t = {
                                                        style: borderconfig[0],
                                                        color: borderconfig[1],
                                                    };
                                                }
                                            }

                                            if (rp == rowspan - 1) {
                                                let bb = $td.css("border-bottom");
                                                if (
                                                    bb != null &&
                                                    bb.length > 0 &&
                                                    bb.substr(0, 3).toLowerCase() != "0px"
                                                ) {
                                                    let width = $td.css("border-bottom-width");
                                                    let type = $td.css("border-bottom-style");
                                                    let color = $td.css("border-bottom-color");
                                                    let borderconfig = menuButton.getQKBorder(width, type, color);

                                                    if (borderInfo[r + rp + "_" + (c + cp)] == null) {
                                                        borderInfo[r + rp + "_" + (c + cp)] = {};
                                                    }

                                                    borderInfo[r + rp + "_" + (c + cp)].b = {
                                                        style: borderconfig[0],
                                                        color: borderconfig[1],
                                                    };
                                                }
                                            }

                                            if (cp == 0) {
                                                let bl = $td.css("border-left");
                                                if (
                                                    bl != null &&
                                                    bl.length > 0 &&
                                                    bl.substr(0, 3).toLowerCase() != "0px"
                                                ) {
                                                    let width = $td.css("border-left-width");
                                                    let type = $td.css("border-left-style");
                                                    let color = $td.css("border-left-color");
                                                    let borderconfig = menuButton.getQKBorder(width, type, color);

                                                    if (borderInfo[r + rp + "_" + (c + cp)] == null) {
                                                        borderInfo[r + rp + "_" + (c + cp)] = {};
                                                    }

                                                    borderInfo[r + rp + "_" + (c + cp)].l = {
                                                        style: borderconfig[0],
                                                        color: borderconfig[1],
                                                    };
                                                }
                                            }

                                            if (cp == colspan - 1) {
                                                let br = $td.css("border-right");
                                                if (
                                                    br != null &&
                                                    br.length > 0 &&
                                                    br.substr(0, 3).toLowerCase() != "0px"
                                                ) {
                                                    let width = $td.css("border-right-width");
                                                    let type = $td.css("border-right-style");
                                                    let color = $td.css("border-right-color");
                                                    let borderconfig = menuButton.getQKBorder(width, type, color);

                                                    if (borderInfo[r + rp + "_" + (c + cp)] == null) {
                                                        borderInfo[r + rp + "_" + (c + cp)] = {};
                                                    }

                                                    borderInfo[r + rp + "_" + (c + cp)].r = {
                                                        style: borderconfig[0],
                                                        color: borderconfig[1],
                                                    };
                                                }
                                            }

                                            if (rp == 0 && cp == 0) {
                                                continue;
                                            }

                                            data[r + rp][c + cp] = { mc: { r: r_ab, c: c_ab } };
                                        }
                                    }

                                    if (rowspan > 1 || colspan > 1) {
                                        let first = { rs: rowspan, cs: colspan, r: r_ab, c: c_ab };
                                        data[r][c].mc = first;
                                    }
                                }

                                c++;

                                if (c == colLen) {
                                    return true;
                                }
                            });

                            r++;
                        });

                    Store.luckysheet_selection_range = [];
                    selection.pasteHandler(data, borderInfo, rowlen, columnlen);
                    $("#luckysheet-copy-content").empty();
                }

                //复制的是图片
                else if (clipboardData.files.length == 1 && clipboardData.files[0].type.indexOf("image") > -1) {
                    imageCtrl.insertImg(clipboardData.files[0]);

                    return;
                } else {
                    txtdata = clipboardData.getData("text/plain");
                    selection.pasteHandler(txtdata);
                }
                $("#luckysheet-copy-content").empty();
            }
        } else if ($(e.target).closest("#luckysheet-rich-text-editor").length > 0) {
            // 阻止默认粘贴
            e.preventDefault();

            let clipboardData = window.clipboardData; //for IE
            if (!clipboardData) {
                // for chrome
                clipboardData = e.originalEvent.clipboardData;
            }
            let text = clipboardData.getData("text/plain");
            // 插入
            document.execCommand("insertText", false, text);
        }
    });

    //是否允许加载下一页
    if (luckysheetConfigsetting.enablePage) {
        $("#luckysheet-bottom-page-next")
            .click(function() {
                let queryExps = luckysheetConfigsetting.pageInfo.queryExps;
                let reportId = luckysheetConfigsetting.pageInfo.reportId;
                let fields = luckysheetConfigsetting.pageInfo.fields;
                let mobile = luckysheetConfigsetting.pageInfo.mobile;
                let frezon = luckysheetConfigsetting.pageInfo.frezon;
                let currentPage = luckysheetConfigsetting.pageInfo.currentPage;
                let totalPage = luckysheetConfigsetting.pageInfo.totalPage;
                let pageUrl = luckysheetConfigsetting.pageInfo.pageUrl;

                method.addDataAjax(
                    {
                        queryExps: queryExps,
                        reportId: reportId,
                        fields: fields,
                        mobile: mobile,
                        frezon: frezon,
                        pageIndex: currentPage,
                        currentPage: currentPage,
                    },
                    Store.currentSheetIndex,
                    pageUrl,
                    function() {
                        luckysheetConfigsetting.pageInfo.currentPage++;
                        if (
                            luckysheetConfigsetting.pageInfo.totalPage == luckysheetConfigsetting.pageInfo.currentPage
                        ) {
                            $("#luckysheet-bottom-page-next").hide();
                            let pageInfoFull = replaceHtml(locale_info.pageInfoFull, {
                                total: luckysheetConfigsetting.total,
                                totalPage: luckysheetConfigsetting.pageInfo.totalPage,
                            });
                            $("#luckysheet-bottom-page-info").html(pageInfoFull);
                        } else {
                            let pageInfo = replaceHtml(locale_info.pageInfo, {
                                total: luckysheetConfigsetting.total,
                                totalPage: luckysheetConfigsetting.pageInfo.totalPage,
                                currentPage: luckysheetConfigsetting.pageInfo.currentPage,
                            });
                            $("#luckysheet-bottom-page-info").html(pageInfo);
                        }
                    },
                );
            })
            .mousedown(function(e) {
                e.stopPropagation();
            });
    }

    //回到顶部
    $("#luckysheet-bottom-bottom-top")
        .click(function() {
            $("#luckysheet-scrollbar-y").scrollTop(0);
        })
        .mousedown(function(e) {
            e.stopPropagation();
        });

    $("#luckysheet-wa-editor,#luckysheet-icon-morebtn-div,.luckysheet-toolbar-button").click(function(e) {
        if (this.id != "luckysheet-icon-paintformat" && menuButton.luckysheetPaintModelOn) {
            menuButton.cancelPaintModel();
        }
    });
}
 function get_paste_cell_style($td, cell,styleMap){
    //hz_flag 
    //  debugger;  
    let fontSize = null;
    let fontFamily = null;
    let fontWeight = null;
    const locale_fontjson = locale().fontjson;
    try {
        let classNames_dom = $td.attr("class");
        let classNames = null;
        if (classNames_dom) {
            classNames = classNames_dom.split(/\s+/); //获取到该单元格类名
        }
        try {
            if (classNames && styleMap.hasOwnProperty(classNames[0]) && styleMap[classNames[0]].hasOwnProperty('font-size')) {
                fontSize = styleMap[classNames[0]]['font-size'];
                fontSize = fontSize ? parseInt(fontSize, 10) : null;
            } else {
                fontSize = $td.css("font-size");
                if (!fontSize) {
                    fontSize = $td.find('span').css('font-size');
                }
            }
            if (classNames && styleMap.hasOwnProperty(classNames[0]) && styleMap[classNames[0]].hasOwnProperty('font-weight')) {
                fontWeight = styleMap[classNames[0]]['font-weight'];
            } else {
                fontWeight = $td.css("fontWeight");
                if (!fontWeight) {
                    fontWeight = $td.find('span').css('fontWeight');
                }
            }
            if (classNames && styleMap.hasOwnProperty(classNames[0]) && styleMap[classNames[0]].hasOwnProperty('font-family')) {
                fontFamily = styleMap[classNames[0]]['font-family'];
            } else {
                fontFamily = $td.css("font-family");
                if (!fontFamily) {
                    fontFamily = $td.find('span').css('font-family');
                }
            }
        } catch (error) {
            fontSize = $td.find('p').css('font-size');
            fontWeight = $td.find('p').css('fontWeight');
            fontFamily = $td.find('p').css('font-family');
        }

        if (fontSize) {
            if (fontSize.endsWith("px")) {
                let pxValue = parseInt(fontSize, 10);
                fontSize = Math.round(pxValue / 1.333);
            } else {
                fontSize = parseInt(fontSize, 10);
            }
        }
    } catch (error) {
        // console.log(1);
    }




    let bg = $td.css("background-color");
    if (bg == "rgba(0, 0, 0, 0)") {
        bg = null;
    }
    // if(backgroundColor){
    //     bg = backgroundColor;
    // }
    cell.bg = bg;

    let bl = $td.css("font-weight");
    if (bl == 400 || bl == "normal" || bl == '400') {
        cell.bl = 0;
    } else {
        cell.bl = 1;
    }

    // 检测下划线
    let un = $td.css("text-decoration");
    if (un.indexOf("underline") != -1) {
        cell.un = 1;
    }

    let it = $td.css("font-style");
    if (it == "normal") {
        cell.it = 0;
    } else {
        cell.it = 1;
    }

    let ff = $td.css("font-family");
    // let ffs = ff.split(",");
    //debugger;
    // for (let i = 0; i < ffs.length; i++) {
    //     let fa = ffs[i].replace(/"/g, "").trim().toLowerCase();
    //     if(fontFamily){
    //         fa = fontFamily;
    //     }
    //     // let fa = $.trim(ffs[i].toLowerCase());
    //     fa = locale_fontjson[fa];
    //     if (fa == null) {
    //         cell.ff = 4; // hz_flag  默认改成微软雅黑
    //     } else {
    //         cell.ff = fa;
    //         break;
    //     }
    // }
    // debugger;
    // console.log("Microsoft YaHei")
    // console.log(fontFamily)
    // console.log(locale_fontjson);
    // console.log(locale_fontjson[fontFamily]);

    if (fontFamily) { // hz-flag 相似类型的都是hz-flag
        let lowerCaseFontFamily = fontFamily.toLowerCase();
        fa = locale_fontjson[lowerCaseFontFamily];
        cell.ff = fa;
    }
    // let fs = Math.round((parseInt($td.css("font-size")) * 72) / 96);
    // console.log($td.css("font-size"))
    // console.log($td.css())
    // let style = window.getComputedStyle($td[0]);
    // let fontSizePattern = /font-size:\s*([\d.]+)pt/;
    // let match = fontSizePattern.exec($td.attr("style"));
    // //debugger;
    // if (match && match[1]) {
    //     let fs = parseFloat(match[1]);
    //     console.log("Inline 字体大小(磅(pt)): ", fs);
    // } else {
    //     console.log("未找到对应的font-size属性");
    // }
    // let wpsFontSize = Math.round((fs * 16) / 12);
    // let excelFontSize = Math.round((fs * 12) / 9);
    // if (wpsFontSize >= 12) {
    //   fs = wpsFontSize;
    // } else {
    //   fs = excelFontSize;
    // }
    // debugger;
    let fs = Math.round((parseInt($td.css("font-size")) * 72) / 96);
    if (fontSize) {
        fs = fontSize;
    }

    cell.fs = fs;

    let fc = $td.css("color");
    cell.fc = fc;

    // 水平对齐属性
    let ht = $td.css("text-align");
    if (ht == "center") {
        cell.ht = 0;
    } else if (ht == "right") {
        cell.ht = 2;
    } else {
        cell.ht = 1;
    }

    // 垂直对齐属性
    let vt = $td.css("vertical-align");
    // if(vt == "middle" && !ht  || (!ht && (vt == "top" || vt == "text-top")) ){ // 如果水平方向的获取不到，但是垂直方向是居中，兼容wps 的水平方向上也居中
    //     cell.ht = 0;
    // }
    if (vt == "middle") {
        cell.vt = 0;
    } else if (vt == "top" || vt == "text-top") {
        cell.vt = 1;
    } else {
        cell.vt = 2;
    }
    return cell;

}
  function get_paste_cell_style_two_tag($td, cell,styleMap){
    // 给只有两个标签 这种情况获取样式 
    
    //hz_flag 
    //  debugger;  
    let fontSize = null;
    let fontFamily = null;
    let fontWeight = null;
    
    const locale_fontjson = locale().fontjson;
    try {
        let classNames_dom = $td.attr("class");
        let classNames = null;
        if (classNames_dom) {
            classNames = classNames_dom.split(/\s+/); //获取到该单元格类名
        }
        try {
            if (classNames && styleMap.hasOwnProperty(classNames[0]) && styleMap[classNames[0]].hasOwnProperty('font-size')) {
                fontSize = styleMap[classNames[0]]['font-size'];
                fontSize = fontSize ? parseInt(fontSize, 10) : null;
            } else {
                // debugger;
                fontSize = get_property_from_next($td, "font-size")
            }
            if (classNames && styleMap.hasOwnProperty(classNames[0]) && styleMap[classNames[0]].hasOwnProperty('font-weight')) {
                fontWeight = styleMap[classNames[0]]['font-weight'];
            } else {
                fontWeight = get_property_from_next($td, "fontWeight");
            }
            if (classNames && styleMap.hasOwnProperty(classNames[0]) && styleMap[classNames[0]].hasOwnProperty('font-family')) {
                fontFamily = styleMap[classNames[0]]['font-family'];
            } else {
                fontFamily = get_property_from_next($td, "font-family");
            }
        } catch (error) {
            fontSize = fontSize ? fontSize :$td.find('p').css('font-size');
            fontWeight =fontWeight? fontWeight: $td.find('p').css('fontWeight');
            fontFamily = fontFamily ?fontFamily:$td.find('p').css('font-family');
        }
        if (fontSize) {
            if (fontSize.endsWith("px")) {
                // debugger;
                let pxValue = parseInt(fontSize, 10);
                fontSize = Math.round(pxValue / 1.333);
            } else {
                fontSize = parseInt(fontSize, 10);
            }
        }
    } catch (error) {
        // console.log(1);
    }



    
    let bg = $td.css("background-color")
    if (bg == "rgba(0, 0, 0, 0)") {
        bg = null;
    }
    // if(backgroundColor){
    //     bg = backgroundColor;
    // }
    cell.bg = bg;

    
    let bl = get_property_from_next($td, "font-weight")
    if (bl == 400 || bl == "normal" || bl == '400') {
        cell.bl = 0;
    } else {
        cell.bl = 1;
    }

    // 检测下划线
    
    let un = $td.css("text-decoration");
    if (un.indexOf("underline") != -1) {
        cell.un = 1;
    }

    
    let it = $td.css("font-style");
    if (it == "normal") {
        cell.it = 0;
    } else {
        cell.it = 1;
    }

    
    // let ff = $td.css("font-family");
    // let ffs = ff.split(",");
    //debugger;
    // for (let i = 0; i < ffs.length; i++) {
    //     let fa = ffs[i].replace(/"/g, "").trim().toLowerCase();
    //     if(fontFamily){
    //         fa = fontFamily;
    //     }
    //     // let fa = $.trim(ffs[i].toLowerCase());
    //     fa = locale_fontjson[fa];
    //     if (fa == null) {
    //         cell.ff = 4; // hz_flag  默认改成微软雅黑
    //     } else {
    //         cell.ff = fa;
    //         break;
    //     }
    // }
    // debugger;
    // console.log("Microsoft YaHei")
    // console.log(fontFamily)
    // console.log(locale_fontjson);
    // console.log(locale_fontjson[fontFamily]);

    if (fontFamily) { // hz-flag 相似类型的都是hz-flag
        if(fontFamily.indexOf(",") !== -1) {
            fontFamily = '微软雅黑';
        }
      
    }else {
        fontFamily = '微软雅黑';
    }
    let lowerCaseFontFamily = fontFamily.toLowerCase();
    fa = locale_fontjson[lowerCaseFontFamily];
    if (fa || fa ===0){
        cell.ff = fa;
    }else {
        cell.ff = 4;
    }
    

    // let fs = Math.round((parseInt($td.css("font-size")) * 72) / 96);
    // console.log($td.css("font-size"))
    // console.log($td.css())
    // let style = window.getComputedStyle($td[0]);
    // let fontSizePattern = /font-size:\s*([\d.]+)pt/;
    // let match = fontSizePattern.exec($td.attr("style"));
    // //debugger;
    // if (match && match[1]) {
    //     let fs = parseFloat(match[1]);
    //     console.log("Inline 字体大小(磅(pt)): ", fs);
    // } else {
    //     console.log("未找到对应的font-size属性");
    // }
    // let wpsFontSize = Math.round((fs * 16) / 12);
    // let excelFontSize = Math.round((fs * 12) / 9);
    // if (wpsFontSize >= 12) {
    //   fs = wpsFontSize;
    // } else {
    //   fs = excelFontSize;
    // }
    // debugger;
    let fs = Math.round((parseInt($td.css("font-size")) * 72) / 96);
    if (fontSize) {
        fs = fontSize;
    }

    cell.fs = fs;

    
    let fc = get_property_from_next($td, "color");
    cell.fc = fc;

      // 垂直对齐属性

      let vt = $td.css("vertical-align");

      // if(vt == "middle" && !ht  || (!ht && (vt == "top" || vt == "text-top")) ){ // 如果水平方向的获取不到，但是垂直方向是居中，兼容wps 的水平方向上也居中
      //     cell.ht = 0;
      // }
      if (vt == "middle") {
          cell.vt = 0;
      } else if (vt == "top" || vt == "text-top") {
          cell.vt = 1;
      } else {
          cell.vt = 2;
      }
      // 水平对齐属性

      let ht = $td.css("text-align");
      if (ht == "center") {
          cell.ht = 0;
      } else if (ht == "right") {
          cell.ht = 2;
      } else {
          cell.ht = 1;
      }


    return cell;

}

function get_property_from_next($td , property){
    // 从当前元素 寻找，没有从子元素，再次时从孩子的孩子元素获取
    // 优先使用最后一代的样式
    let property_value = null;
    let property_value_td = null;
    let property_value_td_child = null;
    property_value_td = $td.css(property);
    if (property ==='font-family' &&  property_value.indexOf(",") !== -1) { // 这个可能会获取到多个字体
        property_value = null;
        // 如果该元素存在子标签，从第一个子标签获取
        property_value = $td.children().first().css(property);
        if (property_value.indexOf(",") !== -1) {
            // 如果存在下一个标签，再从下一个标签获取
            property_value = null;
            // 获取下一个标签的字体名称
            var $nextElement = $td.children().first().children();
            if ($nextElement.length > 0) {
                property_value = $nextElement.css(property);
            }
        }
        return property_value;
    }else {  // 除字体以外的其他属性
        // 如果该元素存在子标签，从第一个子标签获取,但是优先获取最后一代的数据
        property_value_td_child = $td.children().first().css(property);
        // 如果存在下一个标签，再从下一个标签获取
        property_value = null;
        // 获取下一个标签的字体名称
        var $nextElement = $td.children().first().children();
        if ($nextElement.length > 0) {
            property_value = $nextElement.css(property);
        }
    }
    if (property_value_td_child && (property_value !==0) && !(property_value) ){ // 如果property_value没有获取到，采用property_value_td
        return  property_value_td_child;
    }else if(property_value_td && (property_value !==0) && !(property_value) ){
        return property_value_td;
    }
    return property_value;
}
// function get_td_width_and_height($tr){
//     debugger;
//     // 尝试从当前元素中获取行高和列宽，
//     let r_and_c = [null,null]; // 第一个元素是行高，第二个是列宽
//     let row_h = $tr.style.heigt;
//     let col_w = $tr.style.width;

//     if(row_h && row_h.endsWith("px")){
//         let pxValue = parseInt(row_h, 10);
//         row_h = Math.round(pxValue / 1.333);
//     }else {
//         row_h = row_h?parseInt(row_h, 10):row_h;
//     }

//     // 处理列宽
//     if(col_w && col_w.endsWith("px")){
//         let pxValue = parseInt(col_w, 10);
//         col_w = Math.round(pxValue / 1.333);
//     }else {
//         col_w = col_w?parseInt(col_w, 10):col_w;
//     }

//     r_and_c[0] = (row_h);
//     r_and_c[1] = (col_w);
//     return  JSON.parse(JSON.stringify(r_and_c));
// }
function handle_pt_or_px(property) {
    // 将pt 处理成px
    if (property && property.endsWith("pt")) {
      let ptValue = parseInt(property, 10);
      property = Math.round(ptValue * 1.333);
    } else {
      property = property ? parseInt(property, 10) : property;
    }
    return property;
  }
  
// 协同编辑其他用户不在操作的时候，且已经展示了用户名10秒，则用户名框隐藏
function hideUsername() {
    let $showEle = $$(".luckysheet-multipleRange-show");

    if ($showEle.length === undefined) {
        $showEle = [$showEle];
    }

    $showEle.forEach((ele) => {
        const id = ele.id.replace("luckysheet-multipleRange-show-", "");

        if (Store.cooperativeEdit.usernameTimeout["user" + id] === null) {
            $$(".username", ele).style.display = "none";
        }
    });
}
