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
        var shadule = JSON.parse(result);

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
                category_arr = [];
            $$.each(res, function(i, val){
              category_arr = [];
              $$.each(val, function(z, val1){
                category_arr.push({
                  name:val1.name,
                  icon:val1.icon,
                });
              });

              cat[i] = category_arr;
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
                "notificationsGame": []
              }
            };
            storageSet(n.key_storage.categories, storage);

            n.home = myApp.home({});
            n.setting = myApp.settings({});


            // получаем данные по достопримечательностям
            $$.ajax({
              url: 'content/attractions.json',
              error: function () {

              },
              success: function (result) {
                var res = JSON.parse(result);
                //получаем текущую дату
                var attractions = {},
                    category_arr = [];
                $$.each(res, function(i, val){
                  category_arr = [];
                  $$.each(val, function(z, val1){
                    category_arr.push({
                      name:val1.name,
                      content: val1.content,
                      icon:val1.icon
                    });
                  });
                  attractions[i] = category_arr;
                });
                storage.attractions = attractions;
                storageSet(n.key_storage.categories, storage);
                n.info = myApp.info({});

                // получаем данные по расписанию
                $$.ajax({
                  url: 'content/shadule.json',
                  error: function () {

                  },
                  success: function (result) {
                    var res = JSON.parse(result);
                    storage.data.datesGame = res;
                    storageSet(n.key_storage.categories, storage);
                  }

                });
              }

            });

          }
        });
      }

    });

  }
}


function getInfoOne(id){  console.log(id);
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




