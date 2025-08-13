# Попап-слайдер для изображений

## Описание

Реализован полноэкранный попап-слайдер для просмотра изображений портфолио. Каждая секция (черно-белые и цветные татуировки) имеет свой собственный попап с изолированным слайдером.

## Функциональность

### Основные возможности:
- **Клик по изображению** - открывает попап на весь экран
- **Слайдер Swiper** - навигация между изображениями в рамках одной секции
- **Изоляция секций** - каждая секция открывает свой попап
- **Адаптивный дизайн** - работает на всех устройствах

### Навигация в попапе:
- **Стрелки** - переключение между изображениями
- **Пагинация** - точки для быстрого перехода
- **Клавиатура** - стрелки влево/вправо для навигации
- **Escape** - закрытие попапа

### Мобильные жесты:
- **Свайп вниз** - закрытие попапа
- **Свайп влево/вправо** - навигация между изображениями

### Закрытие попапа:
- Клик по кнопке закрытия (X)
- Клик по затемненной области
- Нажатие клавиши Escape
- Свайп вниз на мобильных устройствах

## Структура файлов

```
src/
└── pages-content/index/
    ├── portfolio.astro           # Основная страница портфолио с попапами
    └── portfolio.module.css      # Стили портфолио
```

## Реализация

### В portfolio.astro:
1. Добавлены атрибуты к контейнерам изображений:
   ```astro
   <div class="imageContainer" data-section="black-works" data-index={index}>
   ```
2. Встроены попапы прямо в файл:
   ```astro
   <div class="image-popup" data-popup-id="black-works" style="display: none;">
     <!-- Содержимое попапа -->
   </div>
   ```
3. Добавлены стили для попапа в конце файла
4. Реализован JavaScript для управления попапом

### Обработчик кликов:
```javascript
const handleImageClick = (e: Event) => {
    const target = e.target as HTMLElement
    let imageContainer = target.closest('.imageContainer') as HTMLElement
    
    if (!imageContainer && target.tagName === 'IMG') {
        imageContainer = target.parentElement as HTMLElement
    }
    
    if (!imageContainer) return

    const section = imageContainer.getAttribute('data-section')
    const index = parseInt(imageContainer.getAttribute('data-index') || '0')

    if (section && typeof window.openImagePopup === 'function') {
        window.openImagePopup(section, index)
    }
}
```

## Стилизация

### Основные классы:
- `.image-popup` - основной контейнер попапа
- `.popup-overlay` - затемненная область
- `.popup-content` - контент попапа
- `.popup-swiper` - контейнер слайдера
- `.popup-image` - изображения в попапе

### Анимации:
- Плавное появление/исчезновение попапа
- Анимация загрузки изображений
- Hover-эффекты на кнопках навигации

## Технические детали

### Зависимости:
- Swiper 11.2.10
- Astro 5.9.2

### Модули Swiper:
- Navigation - стрелки навигации
- Pagination - точки пагинации

### TypeScript:
Добавлены типы для глобальных функций:
```typescript
declare global {
    interface Window {
        openImagePopup: (sectionId: string, initialIndex?: number) => void
        closeImagePopup: () => void
    }
}
```

## Производительность

- Изображения загружаются с `loading="lazy"`
- Слайдер уничтожается при закрытии попапа
- Блокировка скролла при открытом попапе
- Оптимизированные обработчики событий
