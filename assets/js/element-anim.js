/* general.js */
$(window).load(function () {
	var e = $(window).height();
	$(".navbar-nav").css("max-height", e), $(".wrapper").animsition(), $("html").removeClass("overflowhtml")
});
var controller = new ScrollMagic.Controller;
$.fn.parallax = function (e, t) {
	$el = $(this), TweenLite.to($el, .2, {
		x: -(t.clientX - window.innerWidth / 2) / e,
		y: -(t.clientY - window.innerHeight / 2) / e
	})
}, $(".home-heading h1").mousemove(function (e) {
	$(".logosymbol svg").parallax(-20, e)
}), TweenMax.staggerTo(".home-heading .logosymbol", 2.5, {
	y: 30,
	yoyo: !0,
	repeat: -1,
	autoRound: !0,
	ease: Power1.easeInOut
}, .1), TweenMax.staggerTo(".home-stripes .stripe1 ", 3, {
	y: 30,
	yoyo: !0,
	repeat: -1,
	autoRound: !0,
	ease: Power1.easeInOut
}, .1), TweenMax.staggerTo(".home-stripes .stripe2 ", 4, {
	y: 30,
	yoyo: !0,
	repeat: -1,
	autoRound: !0,
	ease: Power1.easeInOut
}, .1), TweenMax.staggerTo(".home-stripes .stripe3 ", 2.5, {
	x: 20,
	yoyo: !0,
	repeat: -1,
	autoRound: !0,
	ease: Power1.easeInOut
}, .1), TweenMax.staggerTo(".home-stripes .stripe4 ", 4, {
	x: 20,
	yoyo: !0,
	repeat: -1,
	autoRound: !0,
	ease: Power1.easeInOut
}, .1), TweenMax.staggerTo(".op-stripes .stripe1 ", 3, {
	y: 30,
	yoyo: !0,
	repeat: -1,
	autoRound: !0,
	ease: Power1.easeInOut
}, .1), TweenMax.staggerTo(".op-stripes .stripe2 ", 4, {
	x: 20,
	yoyo: !0,
	repeat: -1,
	autoRound: !0,
	ease: Power1.easeInOut
}, .1), TweenMax.staggerTo(".op-stripes .stripe3 ", 2.5, {
	x: 20,
	yoyo: !0,
	repeat: -1,
	autoRound: !0,
	ease: Power1.easeInOut
}, .1), TweenMax.staggerTo(".footer-stripes .stripe1 ", 3, {
    y: 30,
    yoyo: !0,
    repeat: -1,
    autoRound: !0,
    ease: Power1.easeInOut
}, .1), TweenMax.staggerTo(".footer-stripes .stripe2 ", 4, {
    x: 20,
    yoyo: !0,
    repeat: -1,
    autoRound: !0,
    ease: Power1.easeInOut
}, .1), TweenMax.staggerTo(".footer-stripes .stripe3 ", 2.5, {
    x: 20,
    yoyo: !0,
    repeat: -1,
    autoRound: !0,
    ease: Power1.easeInOut
}, .1);
var ouranimationpartner = TweenMax.staggerFrom(".partner-listing li:nth-child(odd)", 1, {
		y: 200,
		ease: Sine.easeOut,
		opacity: 0
	}, .5),
	ourpartner = new ScrollMagic.Scene({
		triggerElement: ".our-partner",
		offset: 100,
		reverse: !1
	}).setTween(ouranimationpartner).addTo(controller),
	ouranimationpartnereven = TweenMax.staggerFrom(".partner-listing li:nth-child(even)", 1, {
		y: 200,
		ease: Sine.easeOut,
		delay: .3,
		opacity: 0
	}, .5),
	ourpartnereven = new ScrollMagic.Scene({
		triggerElement: ".our-partner",
		offset: 100,
		reverse: !1
	}).setTween(ouranimationpartnereven).addTo(controller),
	jobcontentsence = TweenMax.staggerFrom(".job-opening .job-content", 1, {
        y: 50,
        ease: Sine.easeOut,
        delay: .3,
        opacity: 0
    }, .5),
    jobcontent = new ScrollMagic.Scene({
        triggerElement: ".job-opening",
        offset: -120,
        reverse: !1
    }).setTween(jobcontentsence).addTo(controller),
    tl = new TimelineMax({
        delay: .5
    });
    tl.from(".footer-content h2", .5, {
	    y: -50,
	    opacity: 0
	}).from(".footer-content ul li:first-child", .4, {
	    x: -50,
	    opacity: 0
	}).from(".footer-content ul li:last-child", .4, {
	    x: -100,
	    opacity: 0
	}).from(".office-address .logo img", .3, {
	    opacity: 0
	}).from(".office-address .headoffice", .4, {
	    x: -50,
	    opacity: 0
	}).from(".office-address .servicecenter", .3, {
	    x: -50,
	    opacity: 0
	});
	var footerscreen = new ScrollMagic.Scene({
	    triggerElement: "footer",
	    reverse: !1
	}).setTween(tl).addTo(controller);

	//number counter
	function numberstatatics() {
		var e = $(".statistics"),
			t = new IntersectionObserver(function (e, t) {
				e.forEach(function (e) {
					(e.isIntersecting || e.intersectionRatio > 0) && (t.unobserve(e.target), e.target.odometer.update(e.target.initialValue))
				})
			}, {
				rootMargin: "0px",
				threshold: [0]
			});
		e.each(function () {
			var e = $(this),
				o = e.text();
			if (e.length) {
				e[0].odometer = null, e[0].initialValue = o;
				for (var n = 0; n < o.length; n++) "8";
				e[0].odometer = new Odometer({
					el: e[0],
					value: "",
					format: "(,ddd).dd",
					duration: 69,
					theme: "digital"
				}), t.observe(e[0])
			}
		})
	}

$(document).ready(function () {
	$(".navbar-toggler").click(function () {
		$("body , html").toggleClass("open-menu")
	}), $("header .navbar-nav li").click(function () {
		$("header .navbar-nav li").removeClass("active"), $(this).addClass("active")
	}), $(".partner-listing li").each(function () {
		$(this).on("mousemove", function (e) {
			var t = $(this).find(".content"),
				o = e.clientX - t.parent()[0].getBoundingClientRect().right - 10,
				n = e.clientY - t.parent()[0].getBoundingClientRect().top - 10;
			TweenMax.to(t, .5, {
				x: .1 * o,
				y: .1 * n
			})
		}), $(this).on("mouseleave", function () {
			var e = $(this).find(".content");
			TweenMax.to(e, .5, {
				y: "0px",
				x: "0px",
				ease: Elastic.easeOut.config(1, .75)
			})
		})
	}), $(".what-we-do .whatwedo-content > div").each(function () {
		$(this).on("mousemove", function (e) {
			var t = $(this).find(".content"),
				o = e.clientX - t.parent()[0].getBoundingClientRect().right - 10,
				n = e.clientY - t.parent()[0].getBoundingClientRect().top - 10;
			TweenMax.to(t, .5, {
				x: .1 * o,
				y: .1 * n
			})
		}), $(this).on("mouseleave", function () {
			var e = $(this).find(".content");
			TweenMax.to(e, .5, {
				y: "0px",
				x: "0px",
				ease: Elastic.easeOut.config(1, .75)
			})
		})
	}), $("body").fadeIn(1e3);
	var e = new ScrollMagic.Controller;
	$("header").headroom({
		offset: 0,
		tolerance: 5,
		classes: {
			pinned: "slideInDown",
			unpinned: "slideOutUp"
		}
	}), $("header").headroom("destroy");
	new ScrollMagic.Scene({
		triggerElement: ".home-section"
	}).addTo(e), new ScrollMagic.Scene({
		triggerElement: ".home-section",
		offset: 100,
		triggerHook: "0"
	}).setClassToggle(".home-section", "setBackgroundHeader").addTo(e), new ScrollMagic.Scene({
		triggerElement: ".what-we-do",
		triggerHook: "onEnter",
		reverse: !1
	}).setClassToggle(".what-we-do .section-title", "fade-in").addTo(e), new ScrollMagic.Scene({
		triggerElement: ".our-partner",
		offset: 100,
		reverse: !1
	}).setClassToggle(".our-partner .section-title", "fade-in").addTo(e), new ScrollMagic.Scene({
		triggerElement: ".number-counter ",
		offset: 50,
		reverse: !1
	}).setClassToggle(".number-counter", "showcount").on("start", function () {
		numberstatatics()
	}).addTo(e), new ScrollMagic.Scene({
		triggerElement: ".job-opening",
		triggerHook: 1,
		reverse: !1
	}).setClassToggle(".job-opening .section-title", "fade-in").addTo(e);
	$(".whatwe-content .content").mousemove(function (e) {
		var t = e.clientX / $(window).width() - .5,
			o = e.clientY / $(window).height() - .5,
			n = $(".box");
		$(".coordinates");
		TweenLite.to(n, .6, {
			rotationY: 5 * t,
			rotationX: 5 * o,
			ease: Power1.easeOut,
			transformPerspective: 900,
			transformOrigin: "center"
		})
	}), $(".job-opening .job-opening-row > div").each(function() {
        $(this).on("mousemove", function(e) {
            var t = $(this).find(".job-content"),
                o = e.clientX - t.parent()[0].getBoundingClientRect().right - 10,
                n = e.clientY - t.parent()[0].getBoundingClientRect().top - 10;
            TweenMax.to(t, .5, {
                x: .1 * o,
                y: .1 * n
            })
        }), $(this).on("mouseleave", function() {
            var e = $(this).find(".job-content");
            TweenMax.to(e, .5, {
                y: "0px",
                x: "0px",
                ease: Elastic.easeOut.config(1, .75)
            })
        })
    });
	new ScrollMagic.Scene({
		triggerElement: ".our-team",
		triggerHook: 1,
		reverse: !1
	}).setClassToggle(".our-team .title", "fade-in").addTo(e), new ScrollMagic.Scene({
		triggerElement: ".ourhistory-timeline",
		triggerHook: 1,
		reverse: !1
	});
});