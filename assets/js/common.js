$(document).ready(function(){
	//setTimeout(function() { $('body').css('background-color','#fff'); }, 1000);

	$('.home-heading .main-title .letters:first-child').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter1 letter'>$&</span>"));
    });
    $('.home-heading .main-title .letters.secondletter').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter2 letter'>$&</span>"));
    });
    $('.home-heading .main-title .letters:last-child').each(function () {
        $(this).html($(this).text().replace(/([^\x00]|\w)/g, "<span class='letter3 letter'>$&</span>"));
    });
    anime.timeline()
        .add({ targets: '#stripe1', opacity: 1, delay: 500, duration: 1500, easing: "easeInOutExpo"})
        .add({ targets: '.logosymbol svg', opacity: 1, delay: 100, duration: 1000, easing: "easeInOutExpo"})
        .add({ targets: '.main-title .letter1', duration: 400, delay: () => anime.random(0, 75), easing: 'easeInOutExpo', opacity: [0, 1],translateY: ['-800%', '0%'], rotate: () => [anime.random(-50, 50), 0], reverse: true})
        .add({ targets: '.main-title .letter2', duration: 400, delay: () => anime.random(0, 75), easing: 'easeInOutExpo', opacity: [0, 1],
            translateY: ['-800%', '0%'], rotate: () => [anime.random(-50, 50), 0], reverse: true})
        .add({
            targets: '.main-title .letter3',
            duration: 400,
            delay: () => anime.random(0, 75),
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            translateY: ['-800%', '0%'],
            rotate: () => [anime.random(-50, 50), 0],
        })
});