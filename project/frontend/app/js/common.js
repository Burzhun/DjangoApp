$(function () {

    /*  $('.players-page_mobile-wrapp').slick({
          infinite: true,
          arrows: false,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1
      });*/
    $('.front-mobile-slick-img').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: false,
        pauseOnHover: false,
        autoplay: true,
        autoplaySpeed: 3000,
    });


    $('.mobile_img_profile').slick({
        infinite: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $('.mobile_img_profile').on("mousedown mouseup", function (event) {
        event.stopPropagation();
    })
    $('.players-slick').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 568,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    });

    Share = {
        url: '',
        title: 'Выбери настоящего Героя Men’s Health!',
        pimg: '',
        text: 'Лучший из лучших - прямо перед тобой. Голосуй - и увидишь своего фаворита на обложке Men’s Health!',

        vkontakte: function (purl, ptitle, pimg, text) {
            if (typeof ptitle == 'undefined') {
                ptitle = Share.title
            }
            if (typeof text == 'undefined') {
                text = Share.text;
            }
            url = 'http://vkontakte.ru/share.php?';
            url += 'url=' + encodeURIComponent(purl);
            url += '&title=' + encodeURIComponent(ptitle);
            url += '&description=' + encodeURIComponent(text);
            url += '&image=' + encodeURIComponent(pimg);
            url += '&noparse=true';
            Share.popup(url);
        },
        odnoklassniki: function (purl, text) {
            if (typeof text == 'undefined') {
                text = Share.text;
            }
            url = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
            url += '&st.comments=' + encodeURIComponent(text);
            url += '&st._surl=' + encodeURIComponent(purl);
            Share.popup(url);
        },
        facebook: function (purl, ptitle, pimg, text) {
            if (typeof ptitle == 'undefined') {
                ptitle = Share.title
            }
            if (typeof text == 'undefined') {
                text = Share.text;
            }
            url = 'http://www.facebook.com/sharer.php?s=100';
            url += '&p[title]=' + encodeURIComponent(ptitle);
            url += '&p[summary]=' + encodeURIComponent(text);
            url += '&p[url]=' + encodeURIComponent(purl);
            url += '&p[images][0]=' + encodeURIComponent(pimg);
            Share.popup(url);
        },
        twitter: function (purl, ptitle) {
            if (typeof ptitle == 'undefined') {
                ptitle = Share.title
            }

            url = 'http://twitter.com/share?';
            url += 'text=' + encodeURIComponent(ptitle);
            url += '&url=' + encodeURIComponent(purl);
            url += '&counturl=' + encodeURIComponent(purl);
            Share.popup(url);
        },
        telegram: function (purl, ptitle) {
            if (typeof ptitle == 'undefined') {
                ptitle = Share.title
            }
            url = 'https://t.me/share/url?url=';
            url += 'text=' + encodeURIComponent(ptitle);
            url += '&url=' + encodeURIComponent(purl);
            url += '&counturl=' + encodeURIComponent(purl);
            Share.popup(url);
        },
        mailru: function (purl, ptitle, pimg, text) {
            if (typeof ptitle == 'undefined') {
                ptitle = Share.title
            }
            if (typeof text == 'undefined') {
                text = Share.text;
            }
            url = 'http://connect.mail.ru/share?';
            url += 'url=' + encodeURIComponent(purl);
            url += '&title=' + encodeURIComponent(ptitle);
            url += '&description=' + encodeURIComponent(text);
            url += '&imageurl=' + encodeURIComponent(pimg);
            Share.popup(url)
        },

        me: function (el) {
            console.log(el.href);
            Share.popup(el.href);
            return false;
        },

        popup: function (url) {
            window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        }
    };
    var $status = $('.count_event_items');
    var $slickElement = $('.event-items');

    // $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    //     //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    //     var i = (currentSlide ? currentSlide : 0) + 1;
    //     $status.text(i + '/' + slick.slideCount);
    //
    // });
    $slickElement.slick({
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $('.wrapp_events .left-event').on('click', function () {
        $slickElement.slick('slickPrev');
    })
    $('.wrapp_events .right-event').on('click', function () {
        $slickElement.slick('slickNext');
    })


    $('.wrapp_players .left_arrow').on('click', function () {
        $(".players-slick").slick('slickPrev');
    })
    $('.wrapp_players .right_arrow').on('click', function () {
        $(".players-slick").slick('slickNext');
    })


    $('.slick_mobile .left_arrow').on('click', function () {
        $(".mobile_img_profile ").slick('slickPrev');
    })
    $('.slick_mobile .right_arrow').on('click', function () {
        $(".mobile_img_profile ").slick('slickNext');
    })


    $('.more_info-name.show_text').on('click', function () {

        if ($(this).hasClass('not-active')) {
            $(this).removeClass('not-active');
            $(this).siblings('.not-scroll').removeClass('not-active');
        } else {
            $(this).addClass('not-active');
            $(this).siblings('.not-scroll').addClass('not-active');
        }

        $(".players-slick").slick('slickNext');
    })

    $('.mobile_share_front').on('click', function () {

        $('.hide_share').toggleClass('active_share')

    });
    $('.mobile_share').on('click', function () {

        $('.hide_share').toggleClass('active_share')

    });
    $('.participants').on('click', function () {
        destination = $('.section1').offset().top;
        $('body,html').animate({scrollTop: destination}, 1100);
    });

    $('.events').on('click', function () {
        destination = $('.section2').offset().top;
        $('body,html').animate({scrollTop: destination}, 1100);
    });
    

    $('.login').on('click', function () {


        $('.wrapp_popup-login').fadeIn(300).css('display', 'flex');
        $('body').css('overflow','hidden');
    });
    $('.hero').on('click', function () {
        $('.wrapp_popup-login').fadeIn(300).css('display', 'flex');
        $('body').css('overflow','hidden');
    });
    $('.close_mob_wrapp').on('click', function () {
        $('.wrapp_popup-login').fadeOut(300);
        $('body').css('overflow','auto');
    });


    $(document).mouseup(function (e) {
        var div = $(".wrapp_popup-login  .content-popup-login");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $('.wrapp_popup-login').fadeOut(300);
            $('body').css('overflow','auto');
        }

    });

// using jQuery
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    $("body").on('click', ".players-page .player-name", function (e) {
        if (document.body.clientWidth > 800) {
            e.preventDefault();
            if ($(this).parents('.player').hasClass('player-active')) {

                $('.more_info_about').fadeOut(1);
                $(".players-page .player").removeClass('player-active');

            } else {


                $('.more_info_about').fadeOut(1);
                $(".players-page .player").removeClass('player-active');
                $(this).parents('.player').addClass('player-active');
                $(this).parent('.player').find('.more_info_about').fadeIn(300).css('display', 'flex');
            }
        }
    })

    $("body").on('click', ".players-page .player-img", function (e) {
        var player = $(this).parents('.player');
        if (player.hasClass('player_mobile')) {
            return;
        }

        if (document.body.clientWidth > 800) {
            e.preventDefault();

            if ($(this).parents('.player').hasClass('player-active')) {

                $('.more_info_about').fadeOut(1);
                $(".players-page .player").removeClass('player-active');

            } else {

                $('.more_info_about').fadeOut(1);
                $(".players-page .player").removeClass('player-active');
                $(this).parents('.player').addClass('player-active');
                $(this).parent('.player').find('.more_info_about').fadeIn(300).css('display', 'flex');
            }


        }

    });

    initParticipants();


    $(".title-hover").on('click', function () {
        $(".title-hover").removeClass('title-hover_active');
        $(this).addClass('title-hover_active');
        var why = $(this).data('why');

        if (why == 'competition') {
            $('.scroll.rules').fadeOut(1);
            $('.scroll.competition').fadeIn(100);
        } else if (why == 'rules') {
            $('.scroll.competition').fadeOut(1);
            $('.scroll.rules').fadeIn(100);
        }
    });


});
$(window).on('load', function () {
    setTimeout(function () {
        $(".more_info_about").addClass('invisible').css('opacity', 1);//.addClass('invisible');// css('display', 'none');
    }, 1000);
});
$('.photo-items label').on('click', function () {


    $.each($('.photo-items  .photo-item-mobile '), function () {
        $(this).removeClass('download');
    });

    $(this).find('.photo-item-mobile').addClass('download');
});
$('body').on('click', '.delete_img_mobile', function () {
    if (!confirm('Вы уверены? Файл удалится навсегда.')) {
        return;
    }

    var self = $(this);
    var img = $(this).parents('label').find('input');


    var data = {
        pk: img.val()
    };
    jQuery.post('/form/remove/', data, function (response) {
        if (response.succ == true) {
            self.parent().parent().remove();
        }
    });


});


$.each($('.event-items .scroll'), function () {

    var heightItem = $(this).height();
    if (heightItem > 268) {

        $(this).css('overflow-y', 'scroll');

    }


});
$(document).ready(function(){

    if(location.opened_profile_id){
        setTimeout(function() {
        var id=location.opened_profile_id;

        $( "div.player[profile_id="+id+"]" ).addClass('player-active');
        $( "div.player[profile_id="+id+"]" ).find('.more_info_about').show();
        $('html, body').animate({
                scrollTop: $( "div.player[profile_id="+id+"]" ).find('.more_info_about').offset().top
            }, 1000);
      },400);
     }

});

$('body').on('click','.vote_button',function(){
    var user_id = $(this).attr('user_id');
    $.post('/vote',{user_id:user_id},function(data){
        $(".player").each(function(){
            $(this).find('.voted_button').show();
            $(this).find('.vote_button').hide();
            var json=JSON.parse(JSON.stringify(data));
            if(data.new_rating)
                $(".count_check-mobile").text(data.new_rating);
        });
    });
});
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

$('body').on('click', '.delete_img', function () {
    if (!confirm('Вы уверены? Файл удалится навсегда.')) {
        return;
    }

    var self = $(this);
    var img = $(this).parents('label').find('input');


    var data = {
        pk: img.val()
    };
    jQuery.post('/form/remove/', data, function (response) {
        if (response.succ == true) {

            var name = img.attr('name');
            var selector = '';
            if (name == 'name-0') {
                selector = 'photo-item_big download';
            }
            self.parent().html('<label><input type="file" name="' + name + '" style="display: none;" onchange="handleFiles(this,this.files)"> <div class="photo-item ' + selector + '"><div class="photo-item-background"></div> </div><label>');


        }

    });


});


function handleFilesMobile(file) {

    var number_photo = $('.photo-items').children().length;

    if (typeof file == 'undefined' || number_photo > 4) {
        $('.add-img').addClass('add-img-not');
        return;
    }

    var data = new FormData();

    data.append('file', $(file).prop('files')[0]);

    var item = $('.photo-items');
    $.ajax({
        url: '/form/upload/',
        type: 'POST', // важно!
        data: data,
        cache: false,
        dataType: 'json',
        // отключаем обработку передаваемых данных, пусть передаются как есть
        processData: false,
        // отключаем установку заголовка типа запроса. Так jQuery скажет серверу что это строковой запрос
        contentType: false,
        // функция успешного ответа сервера
        success: function (respond, status, jqXHR) {

            // ОК - файлы загружены
            if (typeof respond.error === 'undefined') {
                // выведем пути загруженных файлов в блок '.ajax-reply'
                var files_path = respond.files;

                item.append(' <label ><div class="photo-item-mobile  "><div class="delete_img_mobile"><i class="fas fa-times"></i></div><img src="' + respond.file + '" alt=""><input type="hidden" value="' + respond.pk + '" name="image-' + number_photo + '"></div><div class="check_photo"><input type="radio" name="radio_photo" value="' + respond.pk + '"> <span class="check_photo_img">Фото профиля</span></div></label>')

            }
            // ошибка
            else {
                console.log('ОШИБКА: ' + respond.error);
            }
        },
        // функция ошибки ответа сервера
        error: function (jqXHR, status, errorThrown) {
            console.log('ОШИБКА AJAX запроса: ' + status, jqXHR);
        }

    });


}

function handleFiles(file) {


    if (typeof file == 'undefined') {
        $.each($('.photo-items  .photo-item '), function () {
            $(this).removeClass('download');
        });
        return;
    }


    var data = new FormData();

    data.append('file', $(file).prop('files')[0]);

    data.append('my_file_upload', 1);

    $.ajax({
        url: '/form/upload/',
        type: 'POST', // важно!
        data: data,
        cache: false,
        dataType: 'json',
        // отключаем обработку передаваемых данных, пусть передаются как есть
        processData: false,
        // отключаем установку заголовка типа запроса. Так jQuery скажет серверу что это строковой запрос
        contentType: false,
        // функция успешного ответа сервера
        success: function (respond, status, jqXHR) {
            // ОК - файлы загружены
            if (typeof respond.error === 'undefined') {
                // выведем пути загруженных файлов в блок '.ajax-reply'
                var files_path = respond.file;

                $(file).parent().html('<div class="photo-item download true delete_img"><img src="' + files_path + '" alt=""><input type="hidden" value="' + respond.pk + '" name="' + $(file).attr('name') + '"></div>')

                $('.photo-items  .photo-item ').eq(0).addClass('photo-item_big');


            }
            // ошибка
            else {
                console.log('ОШИБКА: ' + respond.error);
            }
        },
        // функция ошибки ответа сервера
        error: function (jqXHR, status, errorThrown) {
            console.log('ОШИБКА AJAX запроса: ' + status, jqXHR);
        }

    });


    $('body').on('click', '.photo-item.true', function () {


        var img = $(this).find('img').attr('src');
        var name = img.split('/')
        name = name[name.length - 1];

        console.log(name);
        var data = {
            name: name
        };
        jQuery.post('http://mhspc.local/app/download/delete.php', data, function (response) {
            console.log(response);

        });


        $(this).parent().html('<input type="file" style="display: none;" onchange="handleFiles(this.files)"><div class="photo-item"></div>');
        $('.photo-items  .photo-item ').eq(0).addClass('photo-item_big');


    });


}
function setNextAuthAddress(address) {
    $('.login-soc').find('a').each(function (i, item) {
        var href = $(item).attr('href');
        href = href.slice(0, href.indexOf('?next'));
        $(item).href = $(item).attr('href', href+'?next='+address);
    });
}

function initParticipants() {
    $.each($('.more_info_about  .thumb_img'), function () {
        initMoreInfo(this);
    });
}

function initMoreInfo(selector) {

    block = $(selector);
    if (!block.parent().hasClass('blank')) {
        return
    }
    var lengthItem = block.find('div').length;

    if (lengthItem >= 2) {

        $('.front_img .left_arrow').on('click', function () {
            $(this).parents('.front_img').find('.item_img').slick('slickPrev');
            console.log($(this).parents('.front_img').find('.item_img').html())
        });
        $('.front_img .right_arrow').on('click', function () {
            $(this).parents('.front_img').find('.item_img').slick('slickNext');
        });
        // // On before slide change
        // $(selector).on('init', function (event, slick) {
        //     $(selector).parent().parent().css('opacity', '0')
        //
        // });

        $(selector).siblings('.front_img').find('.item_img').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: block
        });
        $(selector).slick({
            slidesToShow: lengthItem >= 4 ? 4 : lengthItem,
            slidesToScroll: 1,
            focusOnSelect: true,
            asNavFor: $(selector).siblings('.front_img').find('.item_img')
        });

    }

    block.parent().removeClass('blank');
}