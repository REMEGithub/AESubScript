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
 * Introduction: 添加某种特效,ES3无法使用多态，不能定义多个同名函数，否则后者会覆盖前者
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