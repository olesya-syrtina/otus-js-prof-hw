### Установка зависимостей

```bash
npm install
```

### Запуск проекта в режиме разработки

```bash
npm run dev
```

### Сборка проекта

```bash
npm run build
```

### Проверка кода ESLint

```bash
npm run lint
```

### Автоматическое исправление ошибок ESLint

```bash
npm run lint:fix
```

### Форматирование кода Prettier

```bash
npm run format
```

### Проверка форматирования

```bash
npm run format:check
```

## CI

При каждом `push` и `pull request` автоматически запускаются проверки:

- ESLint (`npm run lint`)
- Prettier (`npm run format:check`)
- Сборка проекта (`npm run build`)
