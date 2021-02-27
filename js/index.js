$(function () {
    //  header-top 的hover事件
    $(".consumer>div>a").hover(function () {
        $(this).parent().find("p").toggleClass("current-p");
    });
    //  header-middle模块nav的事件
    let $oNavA = $(".nav-item>a");
    let $flag = 0;
    $oNavA.click(function () {
        $(this).removeClass("nav-a");
        $(this).addClass("nav-click-a");
        $(this).parent().siblings().find(".nav-link").removeClass("nav-click-a");
        $(this).parent().siblings().find(".nav-link").addClass("nav-a");
        $(this).siblings().removeClass("d-none");
        $(this).parent().siblings().find(".nav-link-show").addClass("d-none");
        $flag = 1;
    });
    $oNavA.hover(function () {
        if ($flag === 0) {
            $(this).parent().siblings().find(".nav-link").toggleClass("nav-a");
            $(this).toggleClass("hover-line");
        } else {
            $(this).toggleClass("hover-line");
        }
    });
    //  header-middle 模块的 nav 模块的子模块
    $(".show-top>div").click(function () {
        $(this).parents(".nav-link-show").addClass("d-none");
        $(this).parents(".nav-item").siblings().find(".nav-link").removeClass("nav-a");
        $(this).parents(".nav-item").find(".nav-link").removeClass("nav-click-a");
    });
    //  移动端 header-middle 的 right 的商城事件
    $(".login>span").click(function () {
        $(".bg-mask").addClass("bg-mask-click");
        console.log("12");
    });
    let tm = TweenMax.to(".list-menu>li",2,{
        marginTop:0,
        paused:true,
    });
    let tm2 = TweenMax.to(".list-menu-end",2,{
        opacity:1,
        paused:true,
    });
    var fl = true;
    $(".store-mobile").click(function () {
        tm.restart();
        tm2.restart();
        $(this).find("span").toggleClass("click-show");
        $(this).find("span").toggleClass("store-mobile-start");
        $(".store-mobile-content").toggleClass("d-none");
        if (fl === true){
            $("body").css("overflow","hidden");
            fl = false;
        }else if (fl === false){
            $("body").css("overflow","auto");
            fl = true;
        }
    });
    $(".list-menu>li>.store-icon").click(function () {
        $(this).toggleClass("click-list");
        $(this).siblings().slideToggle();
        if ($(this).hasClass("click-list")) {
            $(this).parent().siblings().find("a").removeClass("click-list");
            $(this).parent().siblings().find(".content-list").slideUp();
        }
    });
    $(".menu-content>a").click(function () {
        $(".menu-list-box").toggleClass("menu-list-box-click");
    });
    //  header-bottom 的 right 的点击事件
    $(".header-bottom-right>li>a").click(function () {
        $(this).addClass("click-here");
        $(this).parent().siblings().find(".click-here").removeClass("click-here");
    });

//    header-bottom 的吸顶
    $(window).scroll(function (e) {
        if (scrollY >= 104) {
            $(".header-bottom").css({
                position: "fixed",
                top:"0px",
                opacity:"0.99"
            });
        } else {
            $(".header-bottom").css({
                position:"static",
                opacity: "1"
            });
        }
    });

//      第一屏ScrollMagic动画
    let controller = new ScrollMagic.Controller();
    let scene = new ScrollMagic.Scene({
        triggerElement: ".trigger-section1",
        triggerHook: "onLeave",
        duration: "150%",

    });
    scene.setTween(".section1", 3, {
        opacity: 0.5,
    });
    scene.setPin(".section1", {pushFollowers: false});
    controller.addScene(scene);
    //  第二屏轮播图
    let mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        effect: 'fade',
        autoplay: false,
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            autoplay:true,
            //  自定义分页器样式
            //  默认状态类名
            bulletClass: 'my-bullet',
            //  激活状态类名
            bulletActiveClass: 'my-bullet-active',
        },
        on: {
            init: function () {
                swiperAnimateCache(this); //隐藏动画元素
                swiperAnimate(this); //初始化完成开始动画
            },
            //  回调函数，swiper从一个slide过渡到另一个slide结束时执行。
            slideChangeTransitionEnd: function () {
                swiperAnimate(this);
                $(".three-num").css("marginTop", "-3.5 " * (this.activeIndex - 1) + "vw");
                $(".three-font").css("marginTop", "-3.5 " * (this.activeIndex - 1) + "vw");
                // console.log(this.activeIndex);
                if (this.activeIndex === 4){
                    $(".three-num").css("marginTop", "0vw");
                    $(".three-font").css("marginTop", "0vw");
                }
            },
        },

    });
//    关闭轮播
    mySwiper.autoplay.stop();
//    第二屏 ScrollMagic动画
    let scene2 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section2",
        triggerHook: "onEnter",
    });
    scene2.setVelocity([".section2-h", ".section2-content"], {
        top: "0vw",
        opacity: "1"
    }, {
        duration: 1000
    });
    controller.addScene(scene2);
    let scene21 = new ScrollMagic.Scene({
        offset: 120 + $(".section2-top").height(),
        duration: "100%",
        triggerElement: ".trigger-section2",
        triggerHook: "onLeave",
    });
    scene21.setPin(".section2-middle");
    let tlm = new TimelineMax();
    tlm.add([
        new TweenMax(".section2-img-left", 3, {
            left: "8%",
            opacity: "0",
        }),
        new TweenMax(".section2-img-right", 3, {
            right: "8%",
            opacity: "0",
        }),
        new TweenMax(".section2-text", 3, {
            opacity: "1",
            delay: 0.4
        }),
    ]);
    tlm.add(
        new TweenMax(".section2-center", 3, {
            opacity: "1",
        }),
    );
    //  *****
    scene21.setTween(tlm);
    controller.addScene(scene21);
    let scene22 = new ScrollMagic.Scene({
        triggerElement:".section2-bottom",
        triggerHook: "onCenter",
    });
    scene22.on("start",function (e) {
        if (e.scrollDirection === "FORWARD"){
            mySwiper.autoplay.start();
        }else if (e.scrollDirection === "REVERSE"){
            mySwiper.autoplay.stop();
        }

    });
    controller.addScene(scene22);
//    第三屏 ScrollMagic动画
    let scene3 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section3",
        triggerHook: "onEnter",
    });
    scene3.setVelocity([".section3-h", ".section3-content"], {
        top: "0vw",
        opacity: "1"
    }, {
        duration: 1000
    });
    controller.addScene(scene3);

    let scene31 = new ScrollMagic.Scene({
        offset: 0,
        duration: "100%",
        triggerElement: ".trigger-section3",
        triggerHook: "onLeave",

    });
    //  ***不添加pushFlowers:false会预留足够的滚动条空间以便做动画，添加后可能导致无法做完动画
    scene31.setPin(".section3");
    let current = 0;
    let tlm3 = new TimelineMax({
        //  轮播
        onComplete: function () {
            let timerId;
            timerId = setInterval(function () {
                switch (current) {
                    case 0:
                        girl2();
                        current++;
                        break;
                    case 1:
                        girl1();
                        current++;
                        break;
                    case 2:
                        girl3();
                        current = 0;
                        break;
                }
                console.log(current);

            },1000);
            scene31.on("progress",function (e) {
                if (e.scrollDirection === "REVERSE"){
                    clearInterval(timerId);
                    TweenMax.to([$(".section3-girl1"),$(".section3-girl2")],3,{
                        width:"12vw",
                        top:"4.5vw",
                    })
                }
            });
        }
    });
    tlm3.add([
        new TweenMax(".section3-phone1", 3, {
            top: "0px"
        }),
    ]);
    tlm3.add([
        new TweenMax(".section3-phone1", 3, {
            opacity: "0",
            width: "13vw"
        }),
        new TweenMax(".section3-phone2", 3, {
            opacity: "1",
            width: "13vw"
        }),

    ]);
    tlm3.add([
        new TweenMax(".section3-phone2", 3, {
            opacity: "0",
        }, {
            duration: 5000

        }),
        new TweenMax(".section3-girl3", 3, {
            opacity: "1",
        }),
        new TweenMax(".section3-girl3", 3, {
            borderRadius: "0.8vw",

        }, {
            duration: 5000
        }),

    ]);
    tlm3.add([
        new TweenMax(".section3-girl1", 3, {
            opacity: "0.5",
            left: "25%",
        }, {
            duration: 8000
        }),
        new TweenMax(".section3-girl2", 3, {
            opacity: "0.5",
            left: "75%",
        }, {
            duration: 8000
        }),
    ]);
    tlm3.add([
        new TweenMax(".section3-girl3", 3, {
            width: "18vw",
            top: "1vw"
        }),
        new TweenMax(".section3-girl1", 3, {
            left: "20%"
        }),
        new TweenMax(".section3-girl2", 3, {
            left: "80%",
        }),
    ]);
    let $imgGril = $(".section3-bottom-girl>img");
    for (let i = 0; i  < $imgGril.length; i++){
        $imgGril.eq(i).click(function () {
            if (i === 0){
                current = 1;
            }else if (i === 1){
                current = 0;
            }else if (i === 2){
                current = 2;
            }
        })
    }

    //  *****
    scene31.setTween(tlm3);
    controller.addScene(scene31);
    //    第四屏 ScrollMagic动画
    let scene4 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section4",
        triggerHook: "onEnter",
    });
    scene4.setVelocity([".section4-h", ".section4-content"], {
        top: "0vw",
        opacity: "1"
    }, {
        duration: 1000
    });
    controller.addScene(scene4);
    //    第五屏 ScrollMagic动画
    let scene5 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section5",
        triggerHook: "onEnter",
    });
    scene5.setVelocity([".section5-h", ".section5-content"], {
        top: "0vw",
        opacity: "1"
    }, {
        duration: 1000
    });
    controller.addScene(scene5);
    let scene51 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section5",
        triggerHook: "onLeave",
        //  **** 一定要设置有效范围，不然会与Velocity动画一样，不跟进滚动条进度变，触发一次性完成
        duration: "100%",
    });
    scene51.setPin(".section5");
    let tlm51 = new TimelineMax();
    tlm51.add([
        new TweenMax(".section5-top", 3, {
            opacity: "0"
        }),
        new TweenMax(".section5-bottom", 3, {
            width: "100%",
            height: "100vh",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            top: "0"
        }),
        new TweenMax(".section5-img", 3, {
            width: "100%",
            // height:"100vh",

        }),


    ]);
    scene51.setTween(tlm51);
    controller.addScene(scene51);
    //    第六屏 ScrollMagic动画
    let scene6 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section6",
        triggerHook: "onEnter",
    });
    scene6.setVelocity([".section6-h", ".section6-content"], {
        top: "0vw",
        opacity: "1"
    }, {
        duration: 1000
    });
    controller.addScene(scene6);
    let scene61 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section6",
        triggerHook: "onLeave",
        //  **** 一定要设置有效范围，不然会与Velocity动画一样，不跟进滚动条进度变，触发一次性完成
        duration: "100%",
    });
    scene61.setPin(".section6");
    let tlm61 = new TimelineMax();
    tlm61.add([
        new TweenMax(".section6-top", 3, {
            opacity: "0"
        }),
        new TweenMax(".section6-bottom", 3, {
            width: "100%",
            height: "100vh",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            top: "0"
        }),
        new TweenMax(".section6-img", 3, {
            width: "100%",
            // height:"100vh",

        }),

    ]);
    scene61.setTween(tlm61);
    controller.addScene(scene61);

    //    第七屏 ScrollMagic动画
    let scene7 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section7",
        triggerHook: "onEnter",
    });
    scene7.setVelocity([".section7-top-h", ".section7-top-content"], {
        marginTop: "0vw",
        opacity: "1"
    }, {
        duration: 1000
    });
    controller.addScene(scene7);
    let scene71 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section7",
        triggerHook: "onEnter",
        offset: 120 + $(".section7-top-img").height(),
    });
    scene71.setVelocity([".section7-bottom-h", ".section7-bottom-content"], {
        marginTop: "0vw",
        opacity: "1"
    }, {
        duration: 1000
    });
    controller.addScene(scene71);
    //    第八屏 ScrollMagic动画
    //  section8-top
    let scene8 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section8",
        triggerHook: "onEnter",
    });
    scene8.setVelocity([".section8-h", ".section8-content"], {
        marginTop: "0vw",
        opacity: "1"
    }, {
        duration: 1000
    });
    controller.addScene(scene8);
    let scene81 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section8",
        triggerHook: "onLeave",
        //  **** 一定要设置有效范围，不然会与Velocity动画一样，不跟进滚动条进度变，触发一次性完成
        duration: "100%",
        offset: -$(".header-bottom").height()
    });
    scene81.setPin(".section8");
    let tlm81 = new TimelineMax();
    tlm81.add([
        new TweenMax([".s12-metal"], 3, {
            top: "23vw"
        }),
        new TweenMax([".s12-cable"], 3, {
            top: "25vw"

        }),

    ]);
    tlm81.add([
        new TweenMax([".s12-clip"], 3, {
            opacity: "0"
        }),
    ]);
    scene81.setTween(tlm81);
    controller.addScene(scene81);
//    section8-middle
    let scene82 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section8",
        triggerHook: "onLeave",
        offset: $(".section8-top").height(),
    });
    scene82.setVelocity([".section82-h", ".section82-content"], {
        top: "0vw",
        opacity: "1"
    }, {
        duration: 1000
    });
    controller.addScene(scene82);
//    section8-bottom
    let scene83 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section8",
        triggerHook: "onLeave",
        offset: $(".section8-top").height() + $(".section8-middle").height(),
    });
    scene83.setVelocity([".section8-bottom-h", ".section8-bottom-content"], {
        marginTop: "0vw",
        opacity: "1"
    }, {
        duration: 1000
    });
    controller.addScene(scene83);


//    第九屏 ScrollMagic动画
    let scene9 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section9",
        triggerHook: "onEnter",
        duration:"100%"
    });
    scene9.setPin(".section8-bottom",{pushFollowers:false});
    controller.addScene(scene9);
    let scene91 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section9",
        triggerHook: "onEnter",

    });
    scene91.setVelocity([".section9-h", ".section9-content"], {
        top: "0vw",
        opacity: "1"
    }, {
        duration: 1000
    });
    controller.addScene(scene91);

//    第十屏 ScrollMagic动画 ##一个场景只能应用一个Velocity？？？？
    let scene10 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section10",
        triggerHook: "onEnter",
    });
    scene10.setVelocity([".section10-h", ".section10-content"], {
        marginTop: "0vw",
        opacity: "1"
    }, {
        duration: 1000
    });
    let scene11 = new ScrollMagic.Scene({
        triggerElement: ".trigger-section10",
        triggerHook: "onEnter",
    });
    scene11.setVelocity(".hw-phone", {
        opacity: "0"
    }, {
        duration: 1000
    });
    controller.addScene(scene10);
    controller.addScene(scene11);
//    第十二屏
    let timer;
    let $sec12H4First = $(".section12-h4-first");
    $(window).on("resize",function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            $sec12H4First.parent().siblings().find(".section12-h4").height($sec12H4First.height() + "px");
        },200)
    })
});


function girl1() {
    $(".section3-girl1").velocity({
        left: "20%",
        width:"18vw",
        top:"1vw",
        opacity:"1"
    });
    $(".section3-girl2").velocity({
        left: "75%",
        width:"12vw",
        top:"4.5vw",
        opacity:"0.5"
    });
    $(".section3-girl3").velocity({
        width:"12vw",
        top:"4.5vw",
        opacity:"0.5"
    });
}
function girl2() {
    $(".section3-girl1").velocity({
        left: "25%",
        width:"12vw",
        top:"4.5vw",
        opacity:"0.5"
    });
    $(".section3-girl2").velocity({
        left: "80%",
        width:"18vw",
        top:"1vw",
        opacity:"1"
    });
    $(".section3-girl3").velocity({
        width:"12vw",
        top:"4.5vw",
        opacity:"0.5"
    });
}
function girl3() {
    $(".section3-girl1").velocity({
        left: "20%",
        width:"12vw",
        top:"4.5vw",
        opacity:"0.5"
    });
    $(".section3-girl2").velocity({
        left: "80%",
        width:"12vw",
        top:"4.5vw",
        opacity:"0.5"
    });
    $(".section3-girl3").velocity({
        width:"18vw",
        top:"1vw",
        opacity:"1"
    });
}
