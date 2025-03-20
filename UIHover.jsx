/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":13,"alignChildren":["center","top"]}},"item-4":{"id":4,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"chooseYourSub","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-5":{"id":5,"type":"Button","parentId":4,"style":{"enabled":true,"varName":null,"text":"Apply","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-6":{"id":6,"type":"Divider","parentId":0,"style":{"enabled":true,"varName":null}},"item-7":{"id":7,"type":"EditText","parentId":4,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"EditText","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"DropDownList","parentId":9,"style":{"enabled":true,"varName":null,"text":"DropDownList","listItems":"Item 1, -, Item 2","preferredSize":[0,0],"alignment":null,"selection":0,"helpTip":null}},"item-9":{"id":9,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"chooseYourVFXLayer","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-11":{"id":11,"type":"StaticText","parentId":9,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"VFXLayer","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-12":{"id":12,"type":"StaticText","parentId":9,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"StaticText","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"Button","parentId":9,"style":{"enabled":true,"varName":null,"text":"Apply","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-15":{"id":15,"type":"StaticText","parentId":17,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"subVFX","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-16":{"id":16,"type":"DropDownList","parentId":17,"style":{"enabled":true,"varName":null,"text":"DropDownList","listItems":"Item 1, -, Item 2","preferredSize":[0,0],"alignment":null,"selection":0,"helpTip":null}},"item-17":{"id":17,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Panel","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-18":{"id":18,"type":"Button","parentId":17,"style":{"enabled":true,"varName":null,"text":"Apply","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,4,7,5,6,9,11,8,12,13,17,15,16,18],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"},"activeId":17}
*/


// 检查当前脚本是否作为面板运行（dockable）

// DIALOG
// ======
var dialog = (this instanceof Panel) ? this : new Window("palette", "AE 停靠面板", undefined, {resizeable: true});
dialog.text = "SubDialogue";
dialog.alignChildren = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 13;
dialog.margins = 16;

// PANEL1
// ======
var panel1 = dialog.add("panel", undefined, undefined, { name: "panel1" });
panel1.text = "chooseYourSub";
panel1.orientation = "row";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 10;
panel1.margins = 10;

//ASS文件全局变量
var assFile;

var filePath = panel1.add('edittext {properties: {name: "edittext1"}}');
filePath.size = [150, 25];

var buttonSubChoose = panel1.add("button", undefined, undefined, { name: "buttonSubChoose" });
buttonSubChoose.text = "chooseFile";

var buttonImport = panel1.add("button", undefined, undefined, { name: "button2" });
buttonImport.text = "Import";

// DIALOG
// ======
var divider1 = dialog.add("panel", undefined, undefined, { name: "divider1" });
divider1.alignment = "fill";

// PANEL2
// ======
var panel2 = dialog.add("panel", undefined, undefined, { name: "panel2" });
panel2.text = "chooseYourVFXLayer";
panel2.orientation = "row";
panel2.alignChildren = ["left", "top"];
panel2.spacing = 10;
panel2.margins = 10;

var statictext1 = panel2.add("statictext", undefined, undefined, { name: "statictext1" });
statictext1.text = "VFXLayer";

var dropdown1_array = ["Item 1", "-", "Item 2"];
var dropdown1 = panel2.add("dropdownlist", undefined, undefined, { name: "dropdown1", items: dropdown1_array });
dropdown1.selection = 0;

var statictext2 = panel2.add("statictext", undefined, undefined, { name: "statictext2" });
statictext2.text = "StaticText";

var buttonVFXDuplicate = panel2.add("button", undefined, undefined, { name: "button2" });
buttonVFXDuplicate.text = "Apply";


// GROUP1
// ======
var group1 = dialog.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 


// PANEL3
// ======
var panel3 = group1.add("panel", undefined, undefined, {name: "panel3"}); 
panel3.text = "VFXPanel";
panel3.orientation = "row";
panel3.alignChildren = ["left", "top"];
panel3.spacing = 10;
panel3.margins = 10;

var statictext3 = panel3.add("statictext", undefined, undefined, { name: "statictext3" });
statictext3.text = "subVFX";

var funcDropdown_array = ["FadeInEffectAdder", "-", "TextAnimateFadeAdder", "-", "GlowVFXAdder"];
var funcDropdown = panel3.add("dropdownlist", undefined, undefined, { name: "dropdown2", items: funcDropdown_array });
funcDropdown.selection = 0;


// PANEL4
// ======
var panel4 = group1.add("panel", undefined, undefined, {name: "panel4"}); 
    panel4.text = "VFXParamPanel"; 
    panel4.orientation = "column"; 
    panel4.alignChildren = ["left","top"]; 
    panel4.spacing = 10; 
    panel4.margins = 10; 


var buttonVFXAdd = group1.add("button", undefined, undefined, {name: "buttonVFXAdd"}); 
buttonVFXAdd.text = "Apply";

// 创建额外的 UI（默认隐藏）
var extraGroup = panel4.add("group", undefined, {name: "group2"}); 
    extraGroup.orientation = "row"; 
    extraGroup.alignChildren = ["left","center"]; 
    extraGroup.spacing = 10; 
    extraGroup.margins = 0; 

var statictext4 = extraGroup.add("statictext", undefined, undefined, {name: "statictext4"}); 
    statictext4.text = "FadeInTime"; 

var edittextNumberFadeIn = extraGroup.add('edittext {properties: {name: "edittext2"}}'); 
    edittextNumberFadeIn.helpTip = "NumberOnly"; 
    edittextNumberFadeIn.text = 0.2; 
    edittextNumberFadeIn.preferredSize.width = 61; 
extraGroup.visible = false; // 默认隐藏


// 监听 funcDropdown 选择变化
funcDropdown.onChange = function() {
    if (funcDropdown.selection.index === 0) { // 选择 "选项 2" 时显示 UI
        extraGroup.visible = true;
    } else {
        extraGroup.visible = false;
    }
    dialog.layout.layout(true); // 重新布局 UI
};

// **手动触发 onChange 以确保 UI 初始化时正确显示**
funcDropdown.onChange();




//事件绑定
/****************************************
 * Function: buttonSubChoose
 * @author X
 * Introduction: 选择字幕文件并显示路径
 ****************************************/
buttonSubChoose.onClick = function () {
    assFile = File.openDialog("选择一个文件");
    if (assFile) {
        filePath.text = assFile.fsName; // 显示选中文件的路径
    }
};

/****************************************
 * Function: buttonImport
 * @author X
 * Introduction: ASS文件字幕数组化处理并显示
 ****************************************/
buttonImport.onClick = function () {
    var DELAY = 2;      //延时常量

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

    // 时间格式转换函数 (00:00:00.00 -> 秒)
    function parseTime(timeString) {
        var parts = timeString.split(":");
        var h = parseFloat(parts[0]) * 3600;
        var m = parseFloat(parts[1]) * 60;
        var s = parseFloat(parts[2]);
        return h + m + s;
    }
}


/****************************************
 * Function: 
 * @author X
 * Introduction: 
 ****************************************/
buttonVFXDuplicate.onClick = function () {

}

/****************************************
 * Function: buttonVFXAdd
 * @author X
 * Introduction: 给目前所有图层添加特效
 ****************************************/
buttonVFXAdd.onClick = function () {
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

                for (var i = 1; i <= comp.numLayers; i++) {
                    var layer = comp.layer(i); // 获取当前图层
                    FadeInEffectAdder(layer, layer.inPoint, layer.inPoint + fadeInTime);
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

                for (var i = 1; i <= comp.numLayers; i++) {
                    var layer = comp.layer(i); // 获取当前图层
                    GlowVFXAdder(layer);
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

/****************************************
 * Function: DuplicateVFX
 * @author X
 * Introduction: vfx层复制
 ****************************************/
function DuplicateVFX(startTime, endTime, posX, posY, textWid, layerName) {
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {

        var layer = comp.layer(layerName); // 按名称获取图层
        if (layer) {
            app.beginUndoGroup("Batch Duplicate Layers"); // 开始撤销组

            var newLayer = layer.duplicate();
            newLayer.inPoint = startTime; // 依次排列
            newLayer.outPoint = endTime; // 设置出点入点
            newLayer.property("Position").setValue([posX, posY]);

            //设置特效的fadeIn效果


            //设置特效的跟随效果
            // var particleEffect = newLayer.property("Effects").property("CC Particle Systems II");
            // if (particleEffect) {
            //     var position = particleEffect.property("Position"); // 获取 Producer 的 Position 属性
            //     if (position) {
            //         position.setValueAtTime(startTime, [posX, posY]); // 在 startTime 秒时，设置位置 
            //         position.setValueAtTime(endTime, [posX + textWid, posY]); // 在 endTime 秒时，设置位置 
            //     }
            // }

            newLayer.moveToBeginning(); // 移动到最顶层（即时间轴最上方）

            app.endUndoGroup(); // 结束撤销组
        } else {
            alert("未找到名为 " + layerName + " 的图层！");
        }
    } else {
        alert("请确保打开了合成！");
    }
}



/****************************************
 * Function: FadeInEffectAdder
 * @author X
 * Introduction: 字幕渐入
 ****************************************/
function FadeInEffectAdder(Layer, startTime, endTime) {
    app.beginUndoGroup("Add FadeIn Effect");

    var opacityProp = Layer.property("Opacity"); // 获取当前不透明度对象

    //检查是否存在关键帧
    if (opacityProp.numKeys > 0) {
        while (opacityProp.numKeys > 0) {
            opacityProp.removeKey(1); // 一直删除第一个关键帧，直到清空
        }
    } else {
        //do nothing
    }

    //不透明度渐变
    opacityProp.setValueAtTime(startTime, 0);
    opacityProp.setValueAtTime(endTime, 100);

    app.endUndoGroup();
}



/****************************************
 * Function: TextAnimateFadeAdder
 * @author X
 * Introduction: 字幕逐个渐隐
 ****************************************/
function TextAnimateFadeAdder(startTime, endTime, StextLayer) {
    if (StextLayer && StextLayer instanceof TextLayer) {
        app.beginUndoGroup("Add Text Animator Keyframes");

        // *1️ 添加 "Animate" -> "Position"
        var animators = StextLayer.property("Text").property("Animators");
        var animator = animators.addProperty("ADBE Text Animator"); // 添加 Animator
        var propGroup = animator.property("ADBE Text Animator Properties"); // 获取 Animator 组
        var opacityProp = propGroup.addProperty("ADBE Text Opacity");
        opacityProp.setValue(0); // 让默认透明（0%）

        // *2️ 确保 Range Selector 存在
        var rangeSelectors = animator.property("ADBE Text Selectors");
        var rangeSelector;
        if (rangeSelectors.numProperties == 0) {
            rangeSelector = rangeSelectors.addProperty("ADBE Text Selector"); // 添加 Range Selector
        } else {
            rangeSelector = rangeSelectors.property(1);
        }

        // *3 给 Range Selector 的 Start 添加关键帧
        var startProp = rangeSelector.property(2);

        startProp.setValueAtTime(startTime, 0);  // 0s: 影响0%的文本（文字全显）
        startProp.setValueAtTime(endTime, 100);  // 2s: 影响100%的文本（文字逐渐消失）

        app.endUndoGroup();
    } else {
        alert("请选择一个文本图层！");
    }

}


/****************************************
 * Function: GlowVFXAdder
 * @author X
 * Introduction: 添加某种特效
 ****************************************/
function GlowVFXAdder(Layer, radius, Intensity) {

    app.beginUndoGroup("Add Glow Effect");   //开始撤销组

    var glowEffect = Layer.property("Effects").addProperty("Glow"); // 添加 Glow 效果

    // 设置 Glow Radius（辉光半径）
    glowEffect.property("Glow Radius").setValue(radius);

    // 设置 Glow Intensity（辉光强度）
    glowEffect.property("Glow Intensity").setValue(Intensity);

    app.endUndoGroup();     //结束撤销组
}

function GlowVFXAdder(Layer, radius) {

    app.beginUndoGroup("Add Glow Effect");   //开始撤销组

    var glowEffect = Layer.property("Effects").addProperty("Glow"); // 添加 Glow 效果

    // 设置 Glow Radius（辉光半径）
    glowEffect.property("Glow Radius").setValue(radius);

    // 设置 Glow Intensity（辉光强度）
    glowEffect.property("Glow Intensity").setValue(1.2);

    app.endUndoGroup();     //结束撤销组
}

function GlowVFXAdder(Layer) {

    app.beginUndoGroup("Add Glow Effect");   //开始撤销组

    var glowEffect = Layer.property("Effects").addProperty("Glow"); // 添加 Glow 效果

    // 设置 Glow Radius（辉光半径）
    glowEffect.property("Glow Radius").setValue(30);

    // 设置 Glow Intensity（辉光强度）
    glowEffect.property("Glow Intensity").setValue(1.2);

    app.endUndoGroup();     //结束撤销组
}


/****************************************
 * Function: cloneObject
 * @author X
 * Introduction: 数组对象复制
 ****************************************/
function cloneObject(obj) {
    var newObj = {}; // 创建一个新对象
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]; // 复制每个属性
        }
    }
    return newObj;
}

/****************************************
 * Function: 
 * @author X
 * Introduction: 
 ****************************************/
function FloatJudge(inputValue){
    var Judgevalue = inputValue;
    var num = parseFloat(Judgevalue); // 转换为浮点数
    if (!isNaN(num) && Judgevalue.match(/^[-+]?\d+(\.\d+)?$/)) {
        //do nothing
    } else {
        num = -1;
    }
    return num;
}

//显示窗口

// 确保 UI 重新布局
dialog.layout.layout(true); // 重新计算 UI 布局
dialog.layout.resize(); // 触发窗口刷新
dialog.onResizing = dialog.onResize = function() {
    this.layout.resize();
}


// 如果是浮动窗口，则显示
if (dialog instanceof Window) {
    dialog.center();
    dialog.show();
}