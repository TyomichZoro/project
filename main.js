$(document).ready(function() {
    $('.category-btn').click(function() {
        var type = $(this).data('type');
        showForm(type);
    });
});

function showForm(type) {
    var form = $('#ratingForm');
    form.html(''); // Очищаем форму перед отображением

    if (type === 'series') {
        form.append(`
            <div class="slider-container">
                <label for="story">Сюжет:</label>
                <div class="slider" id="storySlider"></div>
            </div>
            <div class="slider-container">
                <label for="acting">Актерская игра:</label>
                <div class
                ="slider" id="actingSlider"></div>
                </div>
                <div class="slider-container">
                    <label for="production">Продакшн:</label>
                    <div class="slider" id="productionSlider"></div>
                </div>
            `);
        } else if (type === 'movies') {
            form.append(`
                <div class="slider-container">
                    <label for="plot">Сюжет:</label>
                    <div class="slider" id="plotSlider"></div>
                </div>
                <div class="slider-container">
                    <label for="acting">Актерская игра:</label>
                    <div class="slider" id="actingSlider"></div>
                </div>
                <div class="slider-container">
                    <label for="cinematography">Кинематография:</label>
                    <div class="slider" id="cinematographySlider"></div>
                </div>
            `);
        } else if (type === 'anime') {
            form.append(`
                <div class="slider-container">
                    <label for="story">Сюжет:</label>
                    <div class="slider" id="storySlider"></div>
                </div>
                <div class="slider-container">
                    <label for="animation">Анимация:</label>
                    <div class="slider" id="animationSlider"></div>
                </div>
                <div class="slider-container">
                    <label for="characters">Персонажи:</label>
                    <div class="slider" id="charactersSlider"></div>
                </div>
            `);
        }
    
        $('.slider').each(function() {
            var sliderId = $(this).attr('id');
            $('#' + sliderId).slider({
                range: "min",
                value: 5,
                min: 1,
                max: 10,
                slide: function(event, ui) {
                    $(this).closest('.slider-container').find('label').text($(this).closest('.slider-container').find('label').text().split(':')[0] + ': ' + ui.value);
                }
            });
        });
    
        form.append(`
            <button type="button" onclick="calculateRating('${type}')">Оценить</button>
        `);
        form.addClass('active');
    }
    
    function calculateRating(type) {
        var total = 0;
        var count = 0;
    
        var sliders = $('.slider');
        sliders.each(function() {
            total += parseInt($(this).slider("value"));
            count++;
        });
    
        var average = total / count;
        var resultDiv = $('#result');
        resultDiv.html(`<p>Итоговая оценка для ${type}: <strong>${average.toFixed(1)}</strong></p>`);
    }
    