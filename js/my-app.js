/**
 * Created by user on 25.03.16.
 */
function createArrayStorage(){
  var storage = {};
  if(storageGet(n.key_storage.categories)) {
    storage = storageGet(n.key_storage.categories);
  }

  var emptyStorage = isEmptyObject(storage);

  if(emptyStorage){
    // получаем данные по расписанию
    $$.ajax({
      url: 'content/shadule.json',
      error: function () {

      },
      success: function (result) {
        var res = JSON.parse(result);
        var shadule = res;
        // получаем данные по играм
        $$.ajax({
          url: 'content/games.json',
          error: function () {

          },
          success: function (result) {
            var res = JSON.parse(result);

            //получаем текущую дату
            var today = new Date();
            var onlyDay = getDay(today.getTime());
            var storage,
                cat = {},
                category_arr = [],
                language_arr = ["en", "ru"];
            $$.each(language_arr, function(i, val){
              category_arr = [];
              $$.each(res.games, function(z, val1){
                category_arr.push({
                  id: val1.id,
                  name:_w.games[val][z].name,
                  icon:val1.icon,
                  date:val1.date
                });
              });
              cat[val] = category_arr;
            });

            storage = {
              "settings":{
                "lenguage": n.language,
                "notifications": true,
                "sounds": true
              },
              "games":cat,
              "data":{
                "datesGame":shadule,
                "checkedGames": []
              }
            };
            $$.each(storage.data.datesGame.shadule, function(i, val){
              for(var key in val){
                $$.each(val[key], function(j, val1){
                  val1.notification = {
                    "on":false,
                    "date": 0
                  };
                });
              }
            });


            storageSet(n.key_storage.categories, storage);
            n.home = myApp.home({});
            n.settings = myApp.settings({});
            n.calendar = myApp.calendar({});
            n.info = myApp.info({});
            n.filter = myApp.filter({});
            n.searchbar = myApp.searchbar('.searchbar', {
              searchList: '.list-block-search',
              searchIn: '.item-title'
            });
          }
        });
      }

    });

  }
}

function closeSettings(){
  var activeView = myApp.getCurrentView(3);
  switch(activeView.selector){
    case ".view-main":
      if(activeView.url === '#settings'){
        backPageForSettings('index', activeView);
      }
      break;
    case ".view-calendar":
      if(activeView.url === '#settings'){
        backPageForSettings('calendar', activeView);
      }
      break;
    case ".view-info":
      if(activeView.url === '#settings'){
        backPageForSettings('info', activeView);
      }
      break;
    default: '';

  }
}

function getInfoOne(id){
  n.swiper.slideTo(Number(id) + 1, 0);
}
function playSound(sound){
  var storage;
  if(storageGet(n.key_storage.categories)){
    storage = storageGet(n.key_storage.categories);
  }
  if(storage.settings.sounds){
    sound.play();
  }
}




