/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":13,"alignChildren":["center","top"]}},"item-4":{"id":4,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"chooseYourSub","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-5":{"id":5,"type":"Button","parentId":4,"style":{"enabled":true,"varName":null,"text":"Apply","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-6":{"id":6,"type":"Divider","parentId":0,"style":{"enabled":true,"varName":null}},"item-7":{"id":7,"type":"EditText","parentId":4,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"EditText","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"DropDownList","parentId":9,"style":{"enabled":true,"varName":null,"text":"DropDownList","listItems":"Item 1, -, Item 2","preferredSize":[0,0],"alignment":null,"selection":0,"helpTip":null}},"item-9":{"id":9,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"chooseYourVFXLayer","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-11":{"id":11,"type":"StaticText","parentId":9,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"VFXLayer","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-12":{"id":12,"type":"StaticText","parentId":9,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"StaticText","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"Button","parentId":9,"style":{"enabled":true,"varName":null,"text":"Apply","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-15":{"id":15,"type":"StaticText","parentId":17,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"subVFX","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-16":{"id":16,"type":"DropDownList","parentId":17,"style":{"enabled":true,"varName":null,"text":"DropDownList","listItems":"Item 1, -, Item 2","preferredSize":[0,0],"alignment":null,"selection":0,"helpTip":null}},"item-17":{"id":17,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Panel","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-18":{"id":18,"type":"Button","parentId":17,"style":{"enabled":true,"varName":null,"text":"Apply","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,4,7,5,6,9,11,8,12,13,17,15,16,18],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"},"activeId":17}
*/


// 检查当前脚本是否作为面板运行（dockable）

// DIALOG
// ======

function createUI(dialog){
    //var dialog = (this instanceof Panel) ? this : new Window("palette", "AE 停靠面板", undefined, {resizeable: true});
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


var checkboxSelected = panel3.add("checkbox", undefined, undefined, {name: "checkbox1"}); 
    checkboxSelected.helpTip = "only for selected Layer"; 
    checkboxSelected.text = "selectedLayer"; 


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

var statictext4e = extraGroup.add("statictext", undefined, undefined, {name: "statictext4"}); 
    statictext4e.text = "FadeInTime"; 

var edittextNumberFadeIn = extraGroup.add('edittext {properties: {name: "edittext2"}}'); 
    edittextNumberFadeIn.helpTip = "NumberOnly"; 
    edittextNumberFadeIn.text = 0.2; 
    edittextNumberFadeIn.preferredSize.width = 61; 
extraGroup.visible = false; // 默认隐藏

// 创建额外的 UI（默认隐藏）2
// GROUP 0 for radius
var extraGroup2 = panel4.add("group", undefined, {name: "group2"}); 
    extraGroup2.orientation = "row"; 
    extraGroup2.alignChildren = ["left","center"]; 
    extraGroup2.spacing = 10; 
    extraGroup2.margins = 0; 

var statictext5e = extraGroup2.add("statictext", undefined, undefined, {name: "statictext4"}); 
    statictext5e.text = "Radius"; 

var edittextRadius = extraGroup2.add('edittext {properties: {name: "edittext2"}}'); 
    edittextRadius.helpTip = "NumberOnly"; 
    edittextRadius.text = 30; 
    edittextRadius.preferredSize.width = 61; 
extraGroup2.visible = false;

// GROUP 1 for glowIntensity
var extraGroup3 = panel4.add("group", undefined, {name: "group3"}); 
    extraGroup3.orientation = "row"; 
    extraGroup3.alignChildren = ["left","center"]; 
    extraGroup3.spacing = 10; 
    extraGroup3.margins = 0; 

var statictext6e = extraGroup3.add("statictext", undefined, undefined, {name: "statictext5"}); 
    statictext6e.text = "Intensity"; 

var edittextIntensity = extraGroup3.add('edittext {properties: {name: "edittext3"}}'); 
    edittextIntensity.helpTip = "NumberOnly"; 
    edittextIntensity.text = 1.2;
    edittextIntensity.preferredSize.width = 61; 
extraGroup3.visible = false;

return {
    dialog: dialog, funcDropdown:funcDropdown, extraGroup:extraGroup, extraGroup2:extraGroup2, extraGroup3:extraGroup3,
    buttonSubChoose:buttonSubChoose, filePath:filePath, buttonImport:buttonImport, checkboxSelected:checkboxSelected,
    edittextNumberFadeIn:edittextNumberFadeIn, edittextRadius:edittextRadius, edittextIntensity:edittextIntensity,
    buttonVFXDuplicate:buttonVFXDuplicate, buttonVFXAdd:buttonVFXAdd

}

}
