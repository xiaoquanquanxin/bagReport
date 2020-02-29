window.onload = function () {
    ;(function () {
        // debugger
        // addProfessionJs(a);
        // addProfessionJs(b);
        // addProfessionJs(c);
        // addProfessionJs(d);
        // addProfessionJs(e);
        a();
        b();
        c();
        d();
        e();
        f();

        //  拎包整体tab点击
        function a() {
            //  点击目标
            const $bagAsWholeUl = $('.bag-as-whole-ul');
            //  切换目标
            const $bagAsWholeMenuItem = $('.bag-as-whole-menu').find('.bag-as-whole-menu-item');
            $bagAsWholeUl.on('click', function (e) {
                //  激活当前tab的class
                $bagAsWholeUl.find('.active-tab').removeClass('active-tab');
                const $target = $(e.target);
                $target.addClass('active-tab');
                const index = $target.data('index');
                //  隐藏全部的item，展示当前的item
                $bagAsWholeMenuItem.hide().eq(index).show();
                e.stopPropagation();
            });
        }

        //  带有向上三角的大按块
        function b() {
            const $barChartControl = $('.bar-chart-control');
            $barChartControl.on('click', function (e) {
                const $target = $(e.target);
                //  先改变样式
                $target
                    .addClass('active-bar-chart')
                    .siblings()
                    .removeClass('active-bar-chart');
                //  选中的应该被控制的div的name
                const chartControlName = $target.parent().data('chart-control');
                const chartControlIndex = $target.data('chart-control-index');
                //  应该被控制的div
                const $chartControlDiv = $(`[chart-control-name='${chartControlName}']`);
                // console.log($chartControlDiv);
                //  被控制的全部的div
                const $chartControlItem = $chartControlDiv.find('[chart-control-index]');
                const $currentDiv = $chartControlDiv.find(`[chart-control-index='${chartControlIndex}']`);
                $chartControlItem.hide();
                $currentDiv.show();
                e.stopPropagation();
            })
        }

        //  日期选择
        function c() {
            //  日期选择
            const $selectDate = $('.select-date');
            //  日期选择的ul
            const $selectDateUl = $selectDate.find('ul');
            $selectDateUl.on('click', function (e) {
                const $this = $(this);
                const $parent = $this.parent();
                $parent.removeClass('select-date-open');
                e.stopPropagation();
                const $target = $(e.target);
                $parent.find('.current-date').text($target.text());
                $this.find('.bg403B3D').removeClass('bg403B3D');
                $target.addClass('bg403B3D');
            });
            //  日期选择的默认位置
            const $defaultDate = $selectDate.find('.default-date');
            $defaultDate.on('click', function (e) {
                $(this).parents().addClass('select-date-open');
                e.stopPropagation();
            });
        }

        //  各套包毛利占比
        function d() {
            const $grossProfitRatioPackage = $('#grossProfitRatioPackage');
            const arr = [
                {name: '家私', num: 42},
                {name: '家私', num: 40},
                {name: '家私', num: 16},
                {name: '家私', num: 2}];
            // const arr = [
            //     {name: '家私', num: 40},
            //     {name: '家私', num: 30},
            //     {name: '家私', num: 20},
            //     {name: '家私', num: 10}];
            //
            // const arr = [
            //     {name: '家私', num: 90},
            //     {name: '家私', num: 7},
            //     {name: '家私', num: 2},
            //     {name: '家私', num: 1}];
            // const arr = [
            //     {name: '家私', num: 30},
            //     {name: '家私', num: 28},
            //     {name: '家私', num: 22},
            //     {name: '家私', num: 20}];
            const $packageNameDiv = $grossProfitRatioPackage.find('div');
            const $packageNameList = $grossProfitRatioPackage.find('h4');
            const $packageNumList = $grossProfitRatioPackage.find('p');
            arr.forEach(function (item, index) {
                //  标题文字
                const $div = $($packageNameDiv[index]);
                $div.css({
                    width: `${item.num}%`,
                });
                const divFontSizeRate = 100;
                // console.log(`${Math.min(0.26, Math.max((item.num / divFontSizeRate), 0.2))}rem`);
                $($packageNameList[index])
                    .text(item.name)
                    .css({
                        // fontSize: `${Math.max((item.num / divFontSizeRate), 0.2)}rem`,
                        fontSize: `${Math.min(0.26, Math.max((item.num / divFontSizeRate), 0.2))}rem`,
                    });
                //  百分比
                const $p = $($packageNumList[index]);
                $p.text(`${item.num}%`);
                const pFontSizeRate = 50;
                // console.log(item.num / pFontSizeRate);
                $p.css({
                    fontSize: `${Math.min(0.66, Math.max((item.num / pFontSizeRate), 0.34))}rem`,
                });
            })
        }

        //  点击点点点,进入最新进展列表
        function e() {
            const $latestProgress = $('#latestProgress');
            $latestProgress.on('click', function (e) {
                //  去最新进展
                const url = `${window.location.origin}/messageList.html?=${Math.random()}&isWX=true`;
                wx.miniProgram.navigateTo({
                    url: `/pages/outLine/outLine?url=${encodeURIComponent(url)}`,
                });
                e.stopPropagation();
            });
        }

        //  数据说明
        function f() {
            //  数据说明按钮 带问号
            const dataDeclarationTap = $('.data-declaration-tap');
            //  确认说明按钮 —— 我知道了
            const $confirmDeclaration = $("#confirmDeclaration");
            //  确认说明弹框
            const $dateDeclarationBox = $("#dateDeclarationBox");
            //  弹出
            dataDeclarationTap.on('click', function (e) {
                e.stopPropagation();
                $dateDeclarationBox.removeClass('hide').addClass('flex');
            });
            //  隐藏
            $confirmDeclaration.on('click', function (e) {
                e.stopPropagation();
                $dateDeclarationBox.removeClass('flex').addClass('hide');
            });
            //  防止滚动
            $dateDeclarationBox.on('touchmove', function (e) {
                e.preventDefault();
            });
        }
    }());
};