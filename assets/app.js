
$(document).ready(function () {
  var answerBtn = $('.btn-answer');
  var video = $('.video-obj').get(0);
  var dot = $('.loading-dot');
  var phoneAnswer = $('.phone-answer');
  var loading = true;
  var loadingContent = '';

  var pages = {
    page1: $('.page-1'),
    page2: $('.page-2')
  };

  video.addEventListener('ended', function () {
    $(video).css({
      'width': 0,
      'height': 0
    });
  }, false);

  video.addEventListener('loadedmetadata', function() {
    this.currentTime = 1;
  }, false);

  answerBtn.on('click', function (e) {
    e.preventDefault();

    phoneAnswer.addClass('connect');

    loading = false;

    video && video.play();

    var loop = true;

    function check () {
      if (!video.played || (video.played.length > 0 && loop)) {
        $('audio').get(0).pause();
        $('audio').get(0).currentTime = 0;
        pages.page1.hide();
        pages.page2.addClass('visible');
        $(document.body).css('background-color', '#000');

        phoneAnswer.removeClass('connect');
        loop = false;
      }
      if (!loop) {
        return;
      }
      setTimeout(function () {
        check();
      }, 50);
    }
    check();
  });

  /** 
   * start
   */
  if (loading) {
    loadingFn();
  }

  /**
   * functions 
   */

  function loadingFn () {
    if (!loading) {
      return;
    }
    if (loadingContent.length === 5) {
      loadingContent = '';
    }
    dot.text(loadingContent);
    loadingContent += '.';
    setTimeout(function () {
      loadingFn();
    }, 600);
  }
})
