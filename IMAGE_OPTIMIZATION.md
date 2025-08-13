# Оптимизация изображений

Этот проект использует систему оптимизации изображений для улучшения производительности и экономии трафика.

## Особенности

- **WebP формат**: Современный формат с лучшим сжатием
- **JPEG fallback**: Поддержка старых браузеров
- **Responsive images**: Разные размеры для разных экранов
- **Lazy loading**: Загрузка изображений по мере необходимости
- **Lossless оптимизация**: Качество изображений не страдает

## Размеры изображений

- **thumbnail**: 300px - для миниатюр и мобильных устройств
- **full**: 1200px - для полного размера на десктопе

## Качество сжатия

- **JPEG**: 85% качество, progressive encoding
- **WebP**: 80% качество, lossless: false

## Использование

### Компонент OptimizedImage

```astro
---
import OptimizedImage from '../components/OptimizedImage.astro'
---

<OptimizedImage
  src="/images/portfolio/black-berserk"
  alt="Черно-белая татуировка"
  width="354"
  height="472"
  sizes="(max-width: 768px) 300px, 354px"
  loading="lazy"
  priority={false}
/>
```

### Параметры

- `src`: Путь к изображению (без расширения)
- `alt`: Альтернативный текст
- `width/height`: Размеры изображения
- `sizes`: CSS media queries для responsive images
- `loading`: "lazy" или "eager"
- `priority`: true для критически важных изображений
- `class`: CSS классы
- `id`: ID элемента
- `onload`: JavaScript обработчик события

## Оптимизация новых изображений

1. Поместите исходные изображения в `src/assets/` или `src/assets/portfolio/`
2. Запустите команду оптимизации:

```bash
npm run optimize-images
```

3. Оптимизированные изображения появятся в `public/images/`

## Структура файлов

```
public/images/
├── about-thumbnail.jpg
├── about-thumbnail.webp
├── about-full.jpg
├── about-full.webp
├── portfolio/
│   ├── black-berserk-thumbnail.jpg
│   ├── black-berserk-thumbnail.webp
│   ├── black-berserk-full.jpg
│   └── black-berserk-full.webp
```

## Преимущества

1. **Меньший размер файлов**: WebP на 25-35% меньше JPEG
2. **Быстрая загрузка**: Lazy loading и оптимизированные размеры
3. **Лучший UX**: Прогрессивная загрузка и fallback
4. **SEO**: Правильные alt-теги и структурированные данные
5. **Адаптивность**: Автоматический выбор размера под устройство

## Поддержка браузеров

- **WebP**: Chrome 23+, Firefox 65+, Safari 14+, Edge 18+
- **JPEG fallback**: Все браузеры
- **Picture element**: IE 9+ (с polyfill)

## Мониторинг

Для отслеживания производительности изображений используйте:
- Lighthouse Performance
- WebPageTest
- Chrome DevTools Network tab
