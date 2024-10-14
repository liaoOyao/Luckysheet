import pivotTable from './pivotTable';
import luckysheetFreezen from './freezen';
import menuButton from './menuButton';
import conditionformat from './conditionformat';
import alternateformat from './alternateformat';
import cellDatePickerCtrl from './cellDatePickerCtrl';
import dataVerificationCtrl from './dataVerificationCtrl';
import {checkProtectionLocked,checkProtectionCellHidden}  from './protection';
import { chatatABC } from '../utils/util';
import { isEditMode } from '../global/validate';
import { getcellvalue,getInlineStringStyle } from '../global/getdata';
import { valueShowEs } from '../global/format';
import formula from '../global/formula';
import { luckysheetRangeLast } from '../global/cursorPos';
import cleargridelement from '../global/cleargridelement';
import {isInlineStringCell} from './inlineString';
import Store from '../store';
import server from './server';
import method from '../global/method';
import luckysheetConfigsetting from "./luckysheetConfigsetting";
import {setInputBoxHorizontalAlignment, setInputBoxVerticalAlignment} from "../controllers/customSettingHandle";

export function luckysheetupdateCell(row_index1, col_index1, d, cover, isnotfocus) {
    // hz_tag 
    // 渲染编辑输入框input的函数！！
    // 20230922：以下流程梳理是在误以为该函数是执行更新的函数时进行的总结。仍然可以用作
    //           参考，但未完成部分不会继续更新

    // 流程总结（如无特殊说明一下步骤均为luckysheet官方自带的步骤）：
    //    1.检查是否锁定 checkProtectionLocked
    //    2.检查编辑模式
    //    3.钩子函数 cellEditBefore
    //    4.编辑单元格时发送指令到后台，通知其他单元格更新为“正在输入”状态 server.saveParam
    //    5.数据验证（检查可能设置的数据）
    //    6.获取 size 与 row对象
    //    7.隐藏 #luckysheet-dropCell-icon
    //    8.获取相关变量
    //    9.pivotTable.isPivotRange
    //    10.计算真实位置？（根据冻结信息和offset相关设置）
    //    11.获取input 位置，计算input内容的尺寸
    //    12.缓存更新了的cell的位置信息（行列信息），矫正选中状态（如未选中则设置focus 与 select）
    //    13.如存在行和单元格，则开始执行修改操作
    //        - input_postition
    //    14.
    //    15.
    //    16.
    if(!checkProtectionLocked(row_index1, col_index1, Store.currentSheetIndex)){
        $("#luckysheet-functionbox-cell").blur();
        return;
    }

    if(isEditMode() || Store.allowEdit===false){//此模式下禁用单元格编辑
        return;
    }

    // 钩子函数
    if(!method.createHookFunction('cellEditBefore',Store.luckysheet_select_save)){return;}

    // 编辑单元格时发送指令到后台，通知其他单元格更新为“正在输入”状态
    server.saveParam("mv", Store.currentSheetIndex,  {op:"enterEdit",range:Store.luckysheet_select_save});

    //数据验证
    if(dataVerificationCtrl.dataVerification != null && dataVerificationCtrl.dataVerification[row_index1 + '_' + col_index1] != null){
        let dataVerificationItem = dataVerificationCtrl.dataVerification[row_index1 + '_' + col_index1];
        if(dataVerificationItem.type == 'dropdown'){
            dataVerificationCtrl.dropdownListShow();
        }
        else if(dataVerificationItem.type == 'checkbox'){
            return;
        }
    }

    // 获取 size 与 row对象
    let size = getColumnAndRowSize(row_index1, col_index1, d);
    let row = size.row, 
        row_pre = size.row_pre, 
        col = size.col, 
        col_pre = size.col_pre, 
        row_index = size.row_index, 
        col_index = size.col_index;
    // 隐藏 #luckysheet-dropCell-icon
    if($("#luckysheet-dropCell-icon").is(":visible")){
        $("#luckysheet-dropCell-icon").remove();
    }

    // 获取相关变量
    let winH = $(window).height(), winW = $(window).width();
    let container_offset = $("#" + Store.container).offset();
    let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
    let scrollTop = $("#luckysheet-cell-main").scrollTop();
    
    if (pivotTable.isPivotRange(row_index, col_index)) {
        return;
    }

    // 计算真实位置？（根据冻结信息和offset相关设置）
    let left = col_pre + container_offset.left + Store.rowHeaderWidth - scrollLeft - 2;
    if(luckysheetFreezen.freezenverticaldata != null && col_index1 <= luckysheetFreezen.freezenverticaldata[1]){
        left = col_pre + container_offset.left + Store.rowHeaderWidth - 2;
    }

    let top = row_pre + container_offset.top + Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columnHeaderHeight - scrollTop - 2;
    if(luckysheetFreezen.freezenhorizontaldata != null && row_index1 <= luckysheetFreezen.freezenhorizontaldata[1]){
        top = row_pre + container_offset.top + Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columnHeaderHeight - 2;
    }

    // 获取input 位置，计算input内容的尺寸
    let input_postition = {
        "min-width": col - col_pre+ 1- 8, 
        "min-height": row - row_pre + 1- 4,  
        
        "max-width": winW + scrollLeft - col_pre - 20 - Store.rowHeaderWidth, 
        "max-height": winH + scrollTop - row_pre - 20 - 15 - Store.toolbarHeight - Store.infobarHeight - Store.calculatebarHeight - Store.sheetBarHeight - Store.statisticBarHeight, 
        "left": left, 
        "top": top, 
    }

    let inputContentScale = {
        "transform":"scale("+ Store.zoomRatio +")",
        "transform-origin":"left top",
        "width":(100 / Store.zoomRatio) + "%",
        "height":(100 / Store.zoomRatio) + "%",
    }

    // 缓存更新了的cell的位置信息（行列信息），矫正选中状态（如未选中则设置focus 与 select）与相关样式
    Store.luckysheetCellUpdate = [row_index, col_index];
    if (!isnotfocus) {
        $("#luckysheet-rich-text-editor").focus().select();
    }
    const default_ht_str = setInputBoxHorizontalAlignment(luckysheetConfigsetting);
    const default_ht =  luckysheetConfigsetting.defaultHT;
    const default_vt =  luckysheetConfigsetting.defaultVT;
    const default_vt_str = setInputBoxVerticalAlignment(luckysheetConfigsetting);
    $("#luckysheet-input-box").removeAttr("style").css({ 
        "background-color": "rgb(255, 255, 255)", 
        "padding": "0px 2px", 
        "font-size": `${Store.defaultFontSize}pt`,
        "right": "auto", 
        "overflow-y": "auto",
        "box-sizing": "initial",
        "display":"flex",
        "text-align":default_ht_str,
        "vertical-align":default_vt_str,
    });

    if(luckysheetFreezen.freezenverticaldata != null || luckysheetFreezen.freezenhorizontaldata != null){
        $("#luckysheet-input-box").css("z-index", 10002);
    }
    
    $("#luckysheet-input-box-index").html(chatatABC(col_index) + (row_index + 1)).hide();
    $("#luckysheet-wa-functionbox-cancel, #luckysheet-wa-functionbox-confirm").addClass("luckysheet-wa-calculate-active");
    
    let value = "", isCenter=false;
    
    // 如存在行和单元格，则开始执行后续操作
    if (d[row_index] != null && d[row_index][col_index] != null) {
        let cell = d[row_index][col_index];
        let htValue = cell["ht"];
        let leftOrigin = "left", topOrigin = "top";
        if (!htValue){
            const v = default_ht;
            htValue = v;
        }
        if(htValue == "0"){ // 0 center
            input_postition = { 
                "min-width": col - col_pre + 1- 8, 
                "min-height": row - row_pre + 1- 4, 
                "max-width": winW*2/3, 
                "max-height": winH + scrollTop - row_pre - 20 - 15 - Store.toolbarHeight - Store.infobarHeight - Store.calculatebarHeight - Store.sheetBarHeight - Store.statisticBarHeight, 
                "left": col_pre + container_offset.left + Store.rowHeaderWidth - scrollLeft - 2, 
                "top":  row_pre + container_offset.top + Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columnHeaderHeight - scrollTop - 2, 
            }
        
            if(Store.zoomRatio < 1){
                leftOrigin = "center";
            }
        
            isCenter = true;
        
        } else if(htValue == "1"){ // 1 left
            input_postition = { 
                "min-width": col - col_pre + 1- 8, 
                "min-height": row - row_pre + 1- 4, 
                "max-width": winW*2/3, 
                "max-height": winH + scrollTop - row_pre - 20 - 15 - Store.toolbarHeight - Store.infobarHeight - Store.calculatebarHeight - Store.sheetBarHeight - Store.statisticBarHeight, 
                "left": col_pre + container_offset.left + Store.rowHeaderWidth - scrollLeft - 2, 
                "top":  row_pre + container_offset.top + Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columnHeaderHeight - scrollTop - 2, 
            }
        
            if(Store.zoomRatio < 1){
                leftOrigin = "left";
            }
        
        } else if(htValue == "2"){ // 2 right
            input_postition = { 
                "min-width": col - col_pre + 1- 8, 
                "min-height": row - row_pre + 1- 4, 
                "max-width": col + container_offset.left - scrollLeft  - 8, 
                "max-height": winH + scrollTop - row_pre - 20 - 15 - Store.toolbarHeight - Store.infobarHeight - Store.calculatebarHeight - Store.sheetBarHeight - Store.statisticBarHeight, 
                "right": winW - (container_offset.left + (Store.rowHeaderWidth-1) - scrollLeft) - col, 
                "top":  row_pre + container_offset.top + Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columnHeaderHeight - scrollTop - 2, 
            }
        
            if(Store.zoomRatio < 1){
                leftOrigin = "right";
            }
        }
        
        if(cell["vt"]=="0"){
            topOrigin = "center";
        } else if(cell["vt"]=="2"){
            topOrigin = "bottom";
        }else{
            topOrigin = "top";
        }
        

        inputContentScale["transform-origin"] = leftOrigin +" " + topOrigin;

        
        if (!cover) {
            if(isInlineStringCell(cell)){
                value = getInlineStringStyle(row_index, col_index, d);
            }
            else if(cell.f!=null){
                value = getcellvalue(row_index, col_index, d, "f");
            }
            else{
                value = valueShowEs(row_index, col_index, d);
                if(cell.qp=="1"){
                    value = value ? ("" + value) : value;
                }
            }
        }
        
        let style = menuButton.getStyleByCell(d, row_index, col_index);
        style = $("#luckysheet-input-box").get(0).style.cssText + style;

        $("#luckysheet-input-box").get(0).style.cssText = style;
        if($("#luckysheet-input-box").get(0).style.backgroundColor == "rgba(0, 0, 0, 0)"){
            $("#luckysheet-input-box").get(0).style.background = "rgb(255,255,255)";
        }
    }
    else{
        //交替颜色
        let af_compute = alternateformat.getComputeMap();
        var checksAF = alternateformat.checksAF(row_index, col_index, af_compute);

        //条件格式
        var cf_compute = conditionformat.getComputeMap();
        var checksCF = conditionformat.checksCF(row_index, col_index, cf_compute);

        if(checksCF != null && checksCF["cellColor"] != null){
            $("#luckysheet-input-box").get(0).style.background = checksCF["cellColor"];
        }
        else if(checksAF != null){
            $("#luckysheet-input-box").get(0).style.background = checksAF[1];
        }
    }

    // 矫正宽
    if(input_postition["min-height"] > input_postition["max-height"]){
        input_postition["min-height"] = input_postition["max-height"];
    }

    if(input_postition["min-width"] > input_postition["max-width"]){
        input_postition["min-width"] = input_postition["max-width"];
    }
   
    // if((value == null || value.toString() == "") && !cover){
    //     value = "<br/>";
    // }
    value = formula.xssDeal(value);
    if(!checkProtectionCellHidden(row_index, col_index, Store.currentSheetIndex) && value.length>0 && value.substr(0, 63)=='<span dir="auto" class="luckysheet-formula-text-color">=</span>'){
        $("#luckysheet-rich-text-editor").html("");
    }
    else{
        value = formula.ltGtSignDeal(value);
        $("#luckysheet-rich-text-editor").html(value);
        if (!isnotfocus) {
            luckysheetRangeLast($("#luckysheet-rich-text-editor")[0]);
        }
    }

    // 根据其他配置矫正样式 input_postition inputContentScale
    if(isCenter){
        let width = $("#luckysheet-input-box").width();
        if(width> input_postition["max-width"]){
            width = input_postition["max-width"];
        }

        if(width< input_postition["min-width"]){
            width = input_postition["min-width"];
        }

        let newLeft = input_postition["left"] - width/2 + (col - col_pre)/2;
        if(newLeft<2){
            newLeft = 2;
        }

        input_postition["left"] = newLeft-2;
    }

    $("#luckysheet-input-box").css(input_postition);
    $("#luckysheet-rich-text-editor").css(inputContentScale);

    //日期
    if(d[row_index1][col_index1] && d[row_index1][col_index1].ct && d[row_index1][col_index1].ct.t == 'd'){
        cellDatePickerCtrl.cellFocus(row_index1, col_index1, d[row_index1][col_index1]);
    }

    formula.rangetosheet = Store.currentSheetIndex;
    formula.createRangeHightlight();
    formula.rangeResizeTo = $("#luckysheet-rich-text-editor");
    cleargridelement();
    if(!method.createHookFunction('cellEditBeforeEnd', Store.luckysheet_select_save,Store.currentSheetIndex,d[row_index1][col_index1])){return;}
}

export function setCenterInputPosition(row_index, col_index, d){
    if(row_index==null ||col_index==null){
        return;
    }
    let cell = d[row_index][col_index];
    if(cell==null){
        return;
    }
    let htValue = cell["ht"];
    if(cell!=null && htValue != "0"){//0 center, 1 left, 2 right
        return;
    }

    let size = getColumnAndRowSize(row_index, col_index, d);
    let row = size.row, row_pre = size.row_pre, col = size.col, col_pre = size.col_pre;

    let winH = $(window).height(), winW = $(window).width();
    let container_offset = $("#" + Store.container).offset();
    let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
    let scrollTop = $("#luckysheet-cell-main").scrollTop();

    let input_postition = { 
        "min-width": col - col_pre + 1 - 8, 
        "max-width": winW*2/3, 
        "left": col_pre + container_offset.left + Store.rowHeaderWidth - scrollLeft - 2, 
    }

    let width = $("#luckysheet-input-box").width();
    if(width> input_postition["max-width"]){
        width = input_postition["max-width"];
    }

    if(width< input_postition["min-width"]){
        width = input_postition["min-width"];
    }

    let newLeft = input_postition["left"] - width/2 + (col - col_pre)/2;
    if(newLeft<2){
        newLeft = 2;
    }

    input_postition["left"] = newLeft-2;

    $("#luckysheet-input-box").css(input_postition);
}

export function getColumnAndRowSize(row_index, col_index, d){
    let row = Store.visibledatarow[row_index], 
        row_pre = row_index - 1 == -1 ? 0 : Store.visibledatarow[row_index - 1];
    let col = Store.visibledatacolumn[col_index], 
        col_pre = col_index - 1 == -1 ? 0 : Store.visibledatacolumn[col_index - 1];

    if(d == null){
        d = Store.flowdata;
    }

    let margeset = menuButton.mergeborer(d, row_index, col_index);
    if(!!margeset){
        row = margeset.row[1];
        row_pre = margeset.row[0];
        row_index = margeset.row[2];
        col = margeset.column[1];
        col_pre = margeset.column[0];
        col_index = margeset.column[2];
    }    

    return {
        row: row,
        row_pre: row_pre,
        row_index: row_index,
        col: col,
        col_pre: col_pre,
        col_index: col_index
    }
}
