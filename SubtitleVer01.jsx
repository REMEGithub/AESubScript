/****************************************
 * 
 * @author X
 * @date 2025-02-10
 * NOTICE: 值得注意地是，还在大量使用var保留字的原因是【ae支持的extendscript4是基于ES3的JavaScript，不支持let，const等新特性】
 ****************************************/

(function () {
    var DELAY = 2;      //延时常量
    // 选择 ASS 文件
    var assFile = File.openDialog("选择一个 ASS 字幕文件", "*.ass");
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

    // 获取当前合成
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

        if (j < subtitles.length - 2) {
            var subtitleForTime = subtitles[j + 2];
        }
        else {
            var subtitleForTime = subtitles[subtitles.length - 1];
        }

        if (j < subtitles.length - 2) {
            textLayer.inPoint = subtitle.startTime;
            textLayer.outPoint = subtitleForTime.startTime;
        }
        else {
            textLayer.inPoint = subtitle.startTime;
            textLayer.outPoint = subtitle.endTime + DELAY;        //最后延时
        }

        textDocument.text = subtitle.text;
        textProp.setValue(textDocument); // 应用修改
        textDocument.fontSize = 67;         //修改字号
        textDocument.fillColor = [254 / 255, 254 / 255, 165 / 255];     //修改字体颜色

        //添加透明度变化关键帧
        FadeInEffectAdder(textLayer, subtitle.startTime + 0, subtitle.startTime + 0.2);
        if (j < subtitles.length - 2) {
            TextAnimateFadeAdder(subtitle.endTime, subtitleForTime.startTime, textLayer);
        }
        else {
            TextAnimateFadeAdder(subtitle.endTime, subtitle.endTime + DELAY, textLayer);
        }

        //添加Glow效果
        GlowVFXAdder(textLayer);

        // 获取文本框尺寸（bounding box）
        var textBox = textLayer.sourceRectAtTime(subtitleForTime.startTime, false);
        var textBoxWidth = textBox.width;

        var textBoxL = textLayer.sourceRectAtTime(subtitle.endTime, false);
        var textBoxWidthL = textBoxL.width;

        // 寻找字幕的起点
        var posYUp = 940;
        var posYDown = 1024;

        var posXUp = 1720 - textBoxWidth;
        var posXDown = 1820 - textBoxWidth;


        if ((j + 1) % 2 == 0 && j < subtitles.length - 2) {
            textLayer.property("Position").setValue([posXUp, posYUp]);
            SEVFX(subtitle.endTime, subtitleForTime.startTime, posXUp, posYUp, textBoxWidth);
        }
        else if (j < subtitles.length - 2) {
            textLayer.property("Position").setValue([posXDown, posYDown]);
            SEVFX(subtitle.endTime, subtitleForTime.startTime, posXDown, posYDown, textBoxWidth);
        }
        else if ((j + 1) % 2 == 0 && j >= subtitles.length - 2) {

            textLayer.property("Position").setValue([1720 - textBoxWidthL, posYUp]);
            SEVFX(subtitle.endTime, subtitle.endTime + DELAY, 1720 - textBoxWidthL, posYUp, textBoxWidthL);
        }
        else {

            textLayer.property("Position").setValue([1820 - textBoxWidthL, posYDown]);
            SEVFX(subtitle.endTime, subtitle.endTime + DELAY, 1820 - textBoxWidthL, posYDown, textBoxWidthL);
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

})();

function SEVFX(startTime, endTime, posX, posY, textWid) {
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        var layerName = "SEVFX"; // 需要复制的图层名称
        var layer = comp.layer(layerName); // 按名称获取图层
        if (layer) {
            app.beginUndoGroup("Batch Duplicate Layers"); // 开始撤销组

            var newLayer = layer.duplicate();
            newLayer.inPoint = startTime; // 依次排列
            newLayer.outPoint = endTime; // 设置出点入点
            newLayer.property("Position").setValue([posX, posY]);

            //设置特效的fadeIn效果
            FadeInEffectAdder(newLayer, startTime + 0, startTime + 0.2);

            //设置特效的跟随效果
            var particleEffect = newLayer.property("Effects").property("CC Particle Systems II");
            if (particleEffect) {
                var position = particleEffect.property("Position"); // 获取 Producer 的 Position 属性
                if (position) {
                    position.setValueAtTime(startTime, [posX, posY]); // 在 startTime 秒时，设置位置 
                    position.setValueAtTime(endTime, [posX + textWid, posY]); // 在 endTime 秒时，设置位置 
                }
            }

            newLayer.moveToBeginning(); // 移动到最顶层（即时间轴最上方）

            app.endUndoGroup(); // 结束撤销组
        } else {
            alert("未找到名为 " + layerName + " 的图层！");
        }
    } else {
        alert("请确保打开了合成！");
    }
}

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

function GlowVFXAdder(Layer) {

    app.beginUndoGroup("Add Glow Effect");   //开始撤销组

    var glowEffect = Layer.property("Effects").addProperty("Glow"); // 添加 Glow 效果

    // 设置 Glow Radius（辉光半径）
    glowEffect.property("Glow Radius").setValue(30);

    // 设置 Glow Intensity（辉光强度）
    glowEffect.property("Glow Intensity").setValue(1.2);

    app.endUndoGroup();     //结束撤销组
}

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