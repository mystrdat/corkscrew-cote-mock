$(function() {
  console.log('loaded!');

  // Config
  var viewCurrent = null;
  var router = ['restaurants', 'menu', 'alacarte', 'meatfish'];
  var metadata = {
    'restaurants': {
      title: 'Restaurants',
      search: 'Search for a restaurant'
    },
    'menu': {
      title: 'Côte Brasserie',
      search: 'Search for a dish',
      back: 'Menus'
    },
    'alacarte': {
      title: 'À la carte',
      search: 'Search for a dish'
    },
    'meatfish': {
      title: 'Meat & Fish',
      search: 'Search for a dish',
      location: true,
      selection: true
    }
  }

  // DOM
  var elViews = $('.view'),
      elBack = $('.back'),
      elTitle = $('.title'),
      elLocation = $('header .location'),
      elSelection = $('footer'),
      elSearch = $('.search');

  // Helpers
  function resetViews() {
    elViews.each(function() {
      $(this).removeClass('in out back');
    })
  }

  function changeView(oldView, newView, reverse) {
    if (reverse) {
      reverse = ' back';
    } else {
      reverse = '';
    }
    oldView && $('.view-' + oldView).addClass('out' + reverse);
    $('.view-' + newView).addClass('in' + reverse);
    if (metadata[newView].location) {
      elLocation.addClass('visible');
    } else {
      elLocation.removeClass('visible');
    }
    if (metadata[newView].selection) {
      elSelection.addClass('visible');
    } else {
      elSelection.removeClass('visible');
    }
    viewCurrent = newView;
  }

  function loadView(view, reverse) {
    console.log('loading view: ' + view);
    resetViews();
    changeView(viewCurrent, view, reverse);
    // Title
    elTitle.text(metadata[view].title);
    // Search
    elSearch.text(metadata[view].search);
    // Back
    if (router.indexOf(viewCurrent) > 0) {
      var prev = metadata[router[router.indexOf(viewCurrent) - 1]];
      elBack.removeClass('hidden');
      elBack.text(prev.back || prev.title);
    } else {
      elBack.addClass('hidden');
    }
  }

  function setupNavigation() {
    // Restaurants
    $('.view-restaurants .cote-brasserie').on('click', function() {
      loadView('menu');
    })
    // Menu
    $('.view-menu .alacarte').on('click', function() {
      loadView('alacarte');
    })
    // À la carte
    $('.view-alacarte .meatfish').on('click', function() {
      loadView('meatfish');
    })
    // Back
    $('.back').on('click', function() {
      if (router.indexOf(viewCurrent) > 0) {
        loadView(router[router.indexOf(viewCurrent) - 1], true)
      }
    })
  }

  function runTheShow() {
    loadView('restaurants');
    setupNavigation();
  }

  // Run the show!
  runTheShow();
});
