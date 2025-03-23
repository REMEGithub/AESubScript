#include "UI2.jsx";
#include "functions.jsx";

// 注意，new Window和win.show()要在同一个文件，否则会有两个窗口（AE中运行一个脚本文件就会打开一个？）
var dialog = (this instanceof Panel) ? this : new Window("palette", "AE 停靠面板", undefined, {resizeable: true});
var ui = createUI(dialog);
var win = dialog;

//ASS文件全局变量
var assFile;
//延时常量
var DELAY = 2;

//显示窗口


// 监听 funcDropdown 选择变化
var funcDropdown = ui.funcDropdown
funcDropdown.onChange = function() {
    if (funcDropdown.selection.index === 0) { // 选择 "选项 1" 时显示 UI
        ui.extraGroup.visible = true;
    } else {
        ui.extraGroup.visible = false;
    }

    if (funcDropdown.selection.index === 4) { // 选择 "选项 3" 时显示 UI
        ui.extraGroup2.visible = true;
        ui.extraGroup3.visible = true;
    } else {
        ui.extraGroup2.visible = false;
        ui.extraGroup3.visible = false;
    }

    win.layout.layout(true); // 重新布局 UI
};

// **手动触发 onChange 以确保 UI 初始化时正确显示**
ui.funcDropdown.onChange();




//事件绑定
/****************************************
 * Function: buttonSubChoose
 * @author X
 * Introduction: 选择字幕文件并显示路径
 ****************************************/
ui.buttonSubChoose.onClick = function () {
    assFile = File.openDialog("选择一个文件");
    if (assFile) {
        ui.filePath.text = assFile.fsName; // 显示选中文件的路径
    }
};



/****************************************
 * Function: buttonImport
 * @author X
 * Introduction: ASS文件字幕数组化处理并显示
 ****************************************/
ui.buttonImport.onClick = function () {
    

    if (!assFile) {
        alert("未选择文件，操作取消。");
        return;
    }

    // 打开并读取文件内容
    if (!assFile.open("r")) {
        alert("无法打开文件！");
        return;
    }

    var assContent = assFile.read();
    assFile.close();

    // 解析 ASS 文件
    var assLines = assContent.split("\n");
    var subtitles = [];
    var regex = /^Dialogue: \d+,\s*(\d+:\d+:\d+\.\d+),\s*(\d+:\d+:\d+\.\d+),.*?,.*?,.*?,.*?,.*?,.*?,(.*)$/;

    for (var i = 0; i < assLines.length; i++) {
        var match = assLines[i].match(regex);
        if (match) {
            subtitles.push({
                startTime: parseTime(match[1]),
                endTime: parseTime(match[2]),
                text: match[3]
            });
        }
    }

    if (subtitles.length === 0) {
        alert("未找到任何字幕数据！");
        return;
    }


    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert("请先选择一个合成！");
        return;
    }


    app.beginUndoGroup("导入 ASS 字幕");        //撤销组的开始标志

    for (var j = 0; j < subtitles.length; j++) {
        // 创建文本图层
        var textLayer = comp.layers.addText("字幕");
        var textProp = textLayer.property("Source Text");       //查找属性:查找并返回该组的子属性，由其索引或名称指定。引用方式与表达式语法相同。以下内容均正确且等效：
        var textDocument = textProp.value;                      //拿到文本对象
        var subtitle = subtitles[j];

        //歌词变换出点处理，最后两句单独处理
        //subtitleForOutPoint作为出点参数携带变量,startTime作为出点
        if (j < subtitles.length - 2) {
            var subtitleForOutPoint = subtitles[j + 2];
        }
        else {
            var subtitleForOutPoint = cloneObject(subtitles[j]);
            subtitleForOutPoint.startTime = subtitleForOutPoint.endTime;
            subtitleForOutPoint.startTime += DELAY;
        }

        //入点出点设置
        textLayer.inPoint = subtitle.startTime;
        textLayer.outPoint = subtitleForOutPoint.startTime;

        //标记歌词结束时间
        var newMarker = new MarkerValue("e"); // 创建标记对象
        textLayer.property("ADBE Marker").setValueAtTime(subtitle.endTime, newMarker); // 在时间 endTime 秒处添加标记

        /****************************************
        *              PBLOCK                   *
        <               字幕图层预处理                 >
        *                                       *
        ****************************************/
        textDocument.text = subtitle.text;
        textProp.setValue(textDocument); // 应用修改


        // //添加透明度变化关键帧
        // FadeInEffectAdder(textLayer, subtitle.startTime + 0, subtitle.startTime + 0.2);
        // TextAnimateFadeAdder(subtitle.endTime, subtitleForOutPoint.startTime, textLayer);

        // //添加Glow效果
        // GlowVFXAdder(textLayer);

        // 获取文本框尺寸（bounding box）
        var textBox = textLayer.sourceRectAtTime(textLayer.outPoint, false);
        var textBoxWidth = textBox.width;


        /****************************************
        *              PBLOCK                   *
        <               叠层特效                 >
        *                                       *
        ****************************************/

        // 寻找字幕的起点
        var posYUp = 940;
        var posYDown = 1024;

        var posXUp = 1720 - textBoxWidth;
        var posXDown = 1820 - textBoxWidth;


        if ((j + 1) % 2 == 0) {
            textLayer.property("Position").setValue([posXUp, posYUp]);
        }
        else {
            textLayer.property("Position").setValue([posXDown, posYDown]);
        }
    }

    app.endUndoGroup();
    alert("字幕导入完成！");

    
}

/****************************************
 * Function: 
 * @author X
 * Introduction: 
 ****************************************/
ui.buttonVFXDuplicate.onClick = function () {

}

/****************************************
 * Function: buttonVFXAdd
 * @author X
 * Introduction: 给目前所有图层添加特效
 ****************************************/
var checkboxSelected = ui.checkboxSelected;
var edittextRadius = ui.edittextRadius;
var edittextIntensity = ui.edittextIntensity;
var edittextNumberFadeIn = ui.edittextNumberFadeIn;
ui.buttonVFXAdd.onClick = function () {
    app.beginUndoGroup("执行选定的函数"); // 允许撤销操作

    var comp = app.project.activeItem; // 获取当前合成
    if (!(comp && comp instanceof CompItem)) {
        alert("请先打开一个合成！");
        return;
    }


    // 获取选中的图层
    // var selectedLayer = comp.selectedLayers[0]; 
    // if (!selectedLayer) {
    //     alert("请先选择一个图层！");
    //     return;
    // }

    // 根据用户选择执行不同的函数
    switch (funcDropdown.selection.text) {
        case "FadeInEffectAdder":
            var comp = app.project.activeItem;
            if (comp && comp instanceof CompItem) {
                app.beginUndoGroup("遍历所有图层"); // 方便撤销操作

                var fadeInTime = FloatJudge(edittextNumberFadeIn.text);

                if(checkboxSelected.value){
                    for (var i = 0; i < comp.selectedLayers.length; i++) {
                        var layer = comp.selectedLayers[i]; // 获取当前图层
                        FadeInEffectAdder(layer, layer.inPoint, layer.inPoint + fadeInTime);
                    }
                }else{
                    for (var i = 1; i <= comp.numLayers; i++) {
                        var layer = comp.layer(i); // 获取当前图层
                        FadeInEffectAdder(layer, layer.inPoint, layer.inPoint + fadeInTime);
                    }
                }

                

                app.endUndoGroup();
                alert("FadeInEffectAdder添加完成");
            } else {
                alert("请先打开一个合成！");
            }

            break;
        case "TextAnimateFadeAdder":
            var comp = app.project.activeItem;
            if (comp && comp instanceof CompItem) {
                app.beginUndoGroup("遍历所有图层"); // 方便撤销操作

                if(checkboxSelected.value){
                    for (var i = 0; i < comp.selectedLayers.length; i++) {

                        var layer = comp.selectedLayers[i]; // 获取当前图层
    
                        var markers = layer.property("ADBE Marker"); // 获取标记属性
                        var markerCount = markers.numKeys; // 获取标记总数
    
                        //效果执行时间点获取
                        if (markerCount > 0) {
                            var markerTime = markers.keyTime(1); // 获取标记的时间
                        } else {
                            alert("该图层没有标记！");
                        }
                        
                        TextAnimateFadeAdder(markerTime, layer.outPoint, layer);
                    }
                }else{
                    for (var i = 1; i <= comp.numLayers; i++) {

                        var layer = comp.layer(i); // 获取当前图层
    
                        var markers = layer.property("ADBE Marker"); // 获取标记属性
                        var markerCount = markers.numKeys; // 获取标记总数
    
                        //效果执行时间点获取
                        if (markerCount > 0) {
                            var markerTime = markers.keyTime(1); // 获取标记的时间
                        } else {
                            alert("该图层没有标记！");
                        }
                        
                        TextAnimateFadeAdder(markerTime, layer.outPoint, layer);
                    }
                }

                

                app.endUndoGroup();
                alert("TextAnimateFadeAdder添加完成");
            } else {
                alert("请先打开一个合成！");
            }

            break;
        case "GlowVFXAdder":
            var comp = app.project.activeItem;
            if (comp && comp instanceof CompItem) {
                app.beginUndoGroup("遍历所有图层"); // 方便撤销操作

                if(checkboxSelected.value){
                    for (var i = 0; i < comp.selectedLayers.length; i++) {
                        var layer = comp.selectedLayers[i]; // 获取当前图层
                        GlowVFXAdder(layer,edittextRadius.text,edittextIntensity.text);
                    }
                }else{
                    for (var i = 1; i <= comp.numLayers; i++) {
                        var layer = comp.layer(i); // 获取当前图层
                        GlowVFXAdder(layer,edittextRadius.text,edittextIntensity.text);
                    }
                }

                app.endUndoGroup();
                alert("GlowVFXAdder添加完成");
            } else {
                alert("请先打开一个合成！");
            }
            break;
    }

    app.endUndoGroup();
}


//失焦检测
edittextNumberFadeIn.onDeactivate = function() {
    var inputValue = edittextNumberFadeIn.text;
    
    var num = FloatJudge(inputValue);

    if (num != -1) {
        //do nothing
    } else {
        alert("PLEASE INPUT NUMBER");
        edittextNumberFadeIn.text = 0.2;
    }
};

edittextRadius.onDeactivate = function() {
    var inputValue = edittextRadius.text;
    
    var num = FloatJudge(inputValue);

    if (num != -1) {
        //do nothing
    } else {
        alert("PLEASE INPUT NUMBER");
        edittextRadius.text = 30;
    }
};

edittextIntensity.onDeactivate = function() {
    var inputValue = edittextIntensity.text;
    
    var num = FloatJudge(inputValue);

    if (num != -1) {
        //do nothing
    } else {
        alert("PLEASE INPUT NUMBER");
        edittextIntensity.text = 1.2;
    }
};




// 确保 UI 重新布局
win.layout.layout(true); // 重新计算 UI 布局
win.layout.resize(); // 触发窗口刷新
win.onResizing = win.onResize = function() {
    this.layout.resize();
}


// 如果是浮动窗口，则显示
if (win instanceof Window) {
    win.center();
    win.show();
}