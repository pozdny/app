/**
 * Created by user on 25.03.16.
 */
'use strict';
//задание языка
var key = "games_language";
if(!localStorage.getItem(key)) {
    localStorage.setItem(key, 'multi');
}
var storage_language = localStorage.getItem(key);
var LN;
if(storage_language === "multi"){
    //LN = localStorage.getItem(key);
    LN = navigator.language.substr(0, 2);
    if(LN !== "en" && LN !== "ru"){
        LN = "en";
    }
}
else{
    LN = (localStorage.getItem(key)) ? localStorage.getItem(key) : navigator.language.substr(0, 2);
}
var _w = {
    "global":{
        flashscreen:{
            title:{
                en:"Summer Games 2016",
                ru:"Summer Games 2016"
            },
            text:{
                en:"",
                ru:""
            }
        },
        pages_title:{
            en:{
                index:{
                    title: "Summer Games 2016",
                    toolbar: "Home"
                },
                calendar: "Calendar",
                info: "Info",
                settings: "Settings",
                notification: "Notification"
            },
            ru:{
                index:{
                    title: "Летние Игры 2016",
                    toolbar: "Главная"
                },
                calendar: "Календарь",
                info: "Информация",
                settings: "Настройки",
                notification: "Уведомление"
            }
        },
        buttons:{
            back:{
                en:"Back",
                ru:"Назад"
            },
            cancel:{
                en:"Cancel",
                ru:"Отмена"
            }
        }
    },
    "dif_filds":{
        en:{
            name:"Name",
            training_name: "Training",
            days:{
                mn:"days",
                ed:"day"
            },
            hours:{
                mn:"hours",
                ed:"hour"
            },
            minutes:{
                mn:"minutes",
                ed:"minute"
            },
            seconds:{
                mn:"seconds",
                ed:"second"
            }
        },
        ru:{
            name:"Название тренировки",
            training_name: "Тренировка",
            days:{
                mn:"days",
                ed:"day"
            },
            hours:{
                mn:"hours",
                ed:"hour"
            },
            minutes:{
                mn:"minutes",
                ed:"minute"
            },
            seconds:{
                mn:"seconds",
                ed:"second"
            }
        }
    },

    "notification": {
        en: {
            title: "Fitness Log",
            text: "It's time to log your Fitness!",
            ticker_text: "It's time to log your Fitness!"
        },
        ru: {
            title: "Fitness Log",
            text: "Самое время для фитнеса!",
            ticker_text: "Самое время для фитнеса!"
        }
    },
    "settings":{
        en:{
            sounds: "Sounds",
            notifications:"Notifications"
        },
        ru:{
            sounds: "Звуки",
            notifications:"Напоминания"
        }
    },
    "messages":{
        complete:{
            en:"Exercise finished",
            ru:"Упражнение закончено"
        },
        stop:{
            en:{
                title:"Finish exercise",
                content:"Are you sure?"
            },
            ru:{
                title:"Закончить упражнения",
                content:"Вы уверены?"
            }
        },
        select:{
            en:"Please, select at least one exercise!",
            ru:"Пожалуйста, выберите хотя бы одно упражнение!"
        },
        choose:{
            en:"Select planks",
            ru:"Выбор планок"
        },
        delete_statistic:{
            en:{
                title:"Delete all statistics",
                content:"Are you sure?"
            },
            ru:{
                title:"Удалить статистику",
                content:"Вы уверены?"
            }
        },
        default_settings:{
            en:{
                title:"Reset to defaults",
                content:"Are you sure?"
            },
            ru:{
                title:"Сброс настроек",
                content:"Вы уверены?"
            }
        },
        empty:{
            en:"No data",
            ru:"Нет данных"
        },
        delete:{
            en:"Delete",
            ru:"Удалить"
        },
        no_statistics:{
            en:"No Statistics",
            ru:"Нет статистики"
        }


    }

};
