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
        } else if (type === 'season') {
            // Оценка для всего сезона
            form.append(`
            <div class="episode-input">
                <label for="numberOfEpisodes">Количество серий в сезоне:</label>
                <input type="number" id="numberOfEpisodes" min="1" step="1" required>
            </div>
        `);

        form.append(`
            <button type="button" onclick="generateEpisodeSliders()">Продолжить</button>`);
        }

        form.append(`
            <button type="button" onclick="calculateRating()">Оценить</button>
        `);
        form.addClass('active');

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

        $('.slider').draggable();
    }

    function generateEpisodeSliders() {
        var numberOfEpisodes = parseInt($('#numberOfEpisodes').val());
        var form = $('#ratingForm');
        form.find('.episode-input').remove(); // Удаляем поле ввода количества серий
    
        for (var i = 1; i <= numberOfEpisodes; i++) {
            form.append(`
                <div class="slider-container">
                    <label for="episode${i}">Серия ${i}:</label>
                    <div class="slider" id="episode${i}Slider"></div>
                </div>
            `);
        }
    
        // Скрыть кнопку "Продолжить"
        form.find('button').remove();
    
        // Инициализация слайдеров
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
    
        // Переместить кнопку "Оценить" вниз
        form.append(`
            <button type="button" onclick="calculateRating()">Оценить</button>`);
    }

        function calculateRating() {
        var total = 0;
        var count = 0;

        var sliders = $('.slider');
        sliders.each(function() {
            total += parseInt($(this).slider("value"));
            count++;
        });

        if ($('#numberOfEpisodes').length) {
            var numberOfEpisodes = parseInt($('#numberOfEpisodes').val());
            count += numberOfEpisodes; // Учитываем количество серий в сезоне
        }

        var average = total / count;
        var resultDiv = $('#result');
        resultDiv.html(`<p>Итоговая оценка: <strong>${average.toFixed(1)}</strong></p>`);
    }
