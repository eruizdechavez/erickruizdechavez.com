$(function() {
  $('.textfill').text(decodeURIComponent(window.location.search.replace('?', '')));
  $('.wrapper').textfill({
    maxFontPixels: 3000,
  });
});
