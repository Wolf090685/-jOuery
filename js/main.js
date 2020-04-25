$(function () {
    
// Объявление переменных

var modelSpecs,
    modelPrice,
    modelSpecsHolder,
    modelPriceHolder,
    modelPriceHolderUSD;

    modelSpecsHolder = $('#model__specs');
    modelPriceHolder = $('#modelPrice');
    modelPriceHolderUSD = $('#modelPriceUSD'); 

    modelSpecs = '';
    modelPrice = 0;

    // Калькурирование цены

function calcPrice () {
    var modelPriceEngine = $('input[name=engine]:checked', '#orderForm').val();
    var modelPriceTransmission = $('input[name=transmission]:checked', '#orderForm').val();
    var modelPricePackage = $('input[name=package]:checked', '#orderForm').val();

    modelPriceEngine = parseInt(modelPriceEngine);
    modelPriceTransmission = parseInt(modelPriceTransmission);
    modelPricePackage = parseInt(modelPricePackage);

    modelPrice = modelPriceEngine + modelPriceTransmission + modelPricePackage;
    
    modelPriceHolder.text( addSpace(modelPrice) + ' рублей');
  }

//  Компиляция комплектации

function compileSpecs () {
    var modelSpecsEngine = $('input[name=engine]:checked + label', '#orderForm').text();
    var modelSpecsTransmission = $('input[name=transmission]:checked + label', '#orderForm').text();
    var modelSpecsPackage = $('input[name=package]:checked + label', '#orderForm').text();

    modelSpecs = modelSpecsEngine + ', ' + modelSpecsTransmission + ', ' + modelSpecsPackage;

    modelSpecsHolder.text(modelSpecs);
}

// Функция для проставления пробела в числах

function addSpace(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1+x2;
}

// Функции при изменении инпутов

$('#orderForm input').on('change', function () {
    calcPrice ();
    compileSpecs ();
    calcUSD();
 });

 calcPrice ();
 compileSpecs ();
 calcUSD();

 // Изменение картинки при выборе цвета

$('.color__item').on('click', function () {
    var imgPath = $(this).attr('data-img-path');
    $('.model__inner img').fadeOut(300, function () {
        $(this).attr('src', imgPath).fadeIn(300);
    });
});

// Курс рубля к доллару

var currencyUrl = "https://www.cbr-xml-daily.ru/daily_json.js";
var rurUsdRate = 0;

function calcUSD() {
    var modelPriceUSD = modelPrice / rurUsdRate;
    modelPriceHolderUSD.text('$ ' + addSpace(modelPriceUSD.toFixed(0)));
}

$.getJSON(currencyUrl, function (data) {
    rurUsdRate = data.Valute.USD.Value;
    calcUSD();
});
});