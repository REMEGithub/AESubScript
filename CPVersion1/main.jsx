#include "UI2.jsx";
#include "functions.jsx";

// 注意，new Window和win.show()要在同一个文件，否则会有两个窗口（AE中运行一个脚本文件就会打开一个？）
var dialog = (this instanceof Panel) ? this : new Window("palette", "AE 停靠面板", undefined, {resizeable: true});
var ui = createUI(dialog);
var win = dialog;

//ASS文件全局变量
var assFile;

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
        filePath.text = assFile.fsName; // 显示选中文件的路径
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