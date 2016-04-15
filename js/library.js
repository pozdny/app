/* Timeout */
function delyed(obj, time){
    setTimeout(obj, time);
}
function storageGet(name) {
    return JSON.parse(localStorage.getItem(name));
}

function storageSet(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

function storageRemoveKey(name) {
    localStorage.removeItem(name);
}

function storageClear(){
    localStorage.clear();
}
function leadingZero(number, amount) {
    amount = amount || 2;
    if (number.toString().length < amount) {
        return '0'.repeat(amount - number.toString().length) + number;
    }
    return number;
}
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
// сортировка массива
function sortArray(arr){
    arr.sort(function (a, b) {
        if (a.time > b.time) {
            return 1;
        }
        if (a.time < b.time) {
            return -1;
        }
        // a должно быть равным b
        return 0;
    });
}
// сортировка массива
function sortArrayAlfabet(arr){
    arr.sort(function (a, b) {
        var one = a.name.substr(0,1);
        var two = b.name.substr(0,1);
        if (one > two) {
            return 1;
        }
        if (one < two) {
            return -1;
        }
        // a должно быть равным b
        return 0;
    });
}
// сортировка по возрастанию
function sortArrayAsc(arr){
    arr.sort(function (a, b) {
        return b.date_create - a.date_create;
    });
}
function sortArrayAsc3(arr){
    arr.sort(function (a, b) {
        return a - b;
    });
}
function sortArrayAsc2(arr){
    arr.sort(function (a, b) {
        return b.date - a.date;
    });
}
// создание нотификации на определенную дату
function createNotificationDate(date, id, text){  console.log(date, id, text);
    n.JSAPI.cancelNotif(id);
    n.JSAPI.createUnitNotif(0,date,id,_w.notification[LN].title,text,text,1000,"");
}
function deleteNotificationDate(id){
    n.JSAPI.cancelNotif(id);
}
// создание нотификации по умолчанию
function createNotification(){
    var date  = new Date();
    var time = 86400000;
    for(var a = 1; a <= 10; a++) {
        n.JSAPI.cancelNotif(a);
        n.JSAPI.createUnitNotif(0,date.getTime()+time,a,_w.notification[LN].title,_w.notification[LN].text,_w.notification[LN].ticker_text,1000,"");
        time += time;
    }
}
function deleteNotification(){
    for(var a = 1; a <= 10; a++) {
        n.JSAPI.cancelNotif(a);
    }
}
function backPage(pageName) {
    mainView.router.back({
        pageName: pageName,
        force: true
    });
}
function backPageForSettings(pageName, view) {
    view.router.back({
        pageName: pageName,
        force: true,
        animatePages:false
    });
}
function loadPage(pageName, param) {
    var param_query;
    if(param){
        param_query = {
            exercises: param
        };
    }

    mainView.router.load({
        pageName: pageName,
        query: param_query

    });
}
function copyItem(obj){
    return JSON.parse(JSON.stringify(obj));
}
function scrollToTop(obj){
    $$(obj).scrollTo(0, 0);
}
function reloadPage(view) {
    view.router.refreshPage();
}
function clearParentContainer(pContainer){
    pContainer.html('');
}
// free version
function addPaddingBunner(){
    $$('head').append('<link rel="stylesheet" href="css/free-media.css">');
}
function getDay(date){
    // возвращаем только день
    return new Date(date).getOnlyDateTime();
}
function formatDate(time){
    return new Date(time).getShortDate();
}
Date.prototype.getFullDate = function () {
    return  leadingZero(this.getDate()) + '.' +
        leadingZero(this.getMonth() + 1) + '.' +
        this.getFullYear() + ' ' +
        leadingZero(this.getHours()) + ':' +
        leadingZero(this.getMinutes()) + ':' +
        leadingZero(this.getSeconds());
};
Date.prototype.getFullDateM = function () {
    return  leadingZero(this.getDate()) + '.' +
        leadingZero(this.getMonth() + 1) + '.' +
        this.getFullYear() + ' ' +
        leadingZero(this.getHours()) + ':' +
        leadingZero(this.getMinutes());
};
// американский формат даты
Date.prototype.getShortDate = function () {
    return  leadingZero(this.getMonth() + 1) + '/' +
        leadingZero(this.getDate())+ '/' +
        this.getFullYear();
};
// международный формат даты
Date.prototype.getShortDateM = function () {
    return leadingZero(this.getDate()) + '.' +
        leadingZero(this.getMonth() + 1) + '.' +
        this.getFullYear();
};
// формат даты c название месяца
Date.prototype.getShortDateMounth = function () {
    var month = {
        en:['Jan','Feb','Mar','Apr','May','Jun',
            'Jul','Aug','Sep','Oct','Nov','Dec'],
        ru:['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    } ;
    return leadingZero(this.getDate()) + ' ' +
        month[LN][this.getMonth()] + ' ' +
        this.getFullYear();
};
// формат даты c название месяца
Date.prototype.getShortDateMounth2 = function () {
    var month = {
        en:['January','February','March','April','May','June',
            'July','August','September','October','November','December'],
        ru:['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    };
    var day = {
        en:['Sunday', 'Monday', 'Tuesday','Wednesday','Thursday', 'Friday','Saturday'],
        ru:['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

    };
    return leadingZero(month[LN][this.getMonth()]) + ' ' + this.getDate() + ', ' + day[LN][this.getDay()];
};
// получить название дня недели
Date.prototype.getDayWeek = function () {
    var day = {
        en:['Sun', 'Mon', 'Tues','Wed','Thu', 'Fri','Sat'],
        ru:['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

    };
    return day[LN][this.getDay()];
};
// получить час минуты секунды
Date.prototype.getHoursAndMinutes = function () {
    return leadingZero(this.getHours()) + ':' +
        leadingZero(this.getMinutes()) + ':' +
        leadingZero(this.getSeconds());
};
// день в миллисекундах
Date.prototype.getOnlyDateTime = function () {
    return new Date(this.getFullYear() + '/' + leadingZero(this.getMonth() + 1) +'/' + leadingZero(this.getDate())).getTime();
};

if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
        'use strict';
        if (this === null) {
            throw new TypeError('can\'t convert ' + this + ' to object');
        }
        var str = '' + this;
        count = +count;
        if (count !== count) {
            count = 0;
        }
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count ===Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        if (str.length === 0 || count === 0) {
            return '';
        }
        // Обеспечение того, что count является 31-битным целым числом, позволяет нам значительно
        // соптимизировать главную часть функции. Впрочем, большинство современных (на август
        // 2014 года) браузеров не обрабатывают строки, длиннее 1 << 28 символов, так что:
        if (str.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var rpt = '';
        for (;;) {
            if ((count & 1) === 1) {
                rpt += str;
            }
            count >>>= 1;
            if (count === 0) {
                break;
            }
            str += str;
        }
        return rpt;
    };
}
function isEmptyObject( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}
function pointerEvent(obj, str, time){
    if(str === 'none'){
        obj.css({pointerEvents:"none"});
    }
    else{
        delyed(function(){
            obj.css({pointerEvents:"auto"});
        }, time);
    }

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
