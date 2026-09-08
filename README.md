# dsh-agents-board

The agents board plugin for the DeepSeek Harness web GUI: one panel with every agent and subagent across all chats — steps, context, tokens, presets, live counters.

Plugin version: **1.4.0**.

> **Languages / Языки:** English first, the Russian original follows after the divider.
> Английская версия — полный перевод русской части; обе описывают одну и ту же версию.

---

## Installation

Requirements: an installed DeepSeek Harness (a repository clone with `pnpm install` completed) and at least one `pnpm dsh web` run on this PC (so the `%DSH_HOME%\profiles\web\` profile exists; by default `%DSH_HOME%` = `C:\<user>\.dsh`). Windows PowerShell 5.1+ ships with Windows; Node.js 22.19+/24+ is required by the harness itself, not by the installer.

```powershell
powershell -ExecutionPolicy Bypass -File install.ps1
```

The script (run from the plugin folder):

1. Copies the **whole folder** — `package.json`, `host.mjs`, `client.js`, `install.ps1`, `uninstall.ps1`, `README.md`, `cordis.patch.yml` — into `%DSH_HOME%\plugins\dsh-agents-board\`. That copy is the live plugin.
2. Adds a managed row to `%DSH_HOME%\profiles\web\cordis.patch.yml` (marked `# dsh-agents-board (managed by install.ps1)`), pointing at `…\plugins\dsh-agents-board\host.mjs`.
3. Rewrites `cordis.patch.yml` in the master folder — an informational copy of the installed row only.

Re-running is safe and idempotent: the copy and the row are refreshed, no duplicates appear. The harness **never reads** the master folder after installation — you may rename, move, or copy it to another PC; the server start is unaffected. If you changed files in the master folder, run `install.ps1` again to refresh the installed copy.

After installing, restart `pnpm dsh web` and refresh the page (F5). The client module registry is built at server start, so the very first plugin load requires a restart; every later toggle does not.

## Uninstalling

```powershell
powershell -ExecutionPolicy Bypass -File uninstall.ps1
```

The script works the same from the master folder and from the installed copy (`%DSH_HOME%\plugins\dsh-agents-board\uninstall.ps1`). It:

1. Removes the managed row from `%DSH_HOME%\profiles\web\cordis.patch.yml`.
2. Deletes the installed copy `%DSH_HOME%\plugins\dsh-agents-board\` (if the script runs from that folder and Windows blocks deleting its own folder, the leftover files are harmless — delete them manually).
3. Removes the `agents-board` section from `settings.yaml`.

The master folder is left untouched. Restart `pnpm dsh web` afterwards.

## Moving to another PC

1. Copy the whole `dsh-agents-board` folder to the other PC at any path (for example `C:\Tools\dsh-agents-board`) — USB drive, archive, network.
2. That PC needs the harness installed and `pnpm dsh web` run at least once (see the requirements above).
3. Run `powershell -ExecutionPolicy Bypass -File C:\Tools\dsh-agents-board\install.ps1` — the script locates its own folder (`$PSScriptRoot`), copies everything into `%DSH_HOME%\plugins\dsh-agents-board\`, and writes the row into the profile patch. pnpm is not needed to install the plugin.
4. Restart `pnpm dsh web` and refresh the page — the board appears on its own.

## What appears in the interface

### Sidebar button (`sidebar.footer.action`)

In the narrow rail — a status dot (blue "working" when sessions are running, gray otherwise); in the wide rail — the "Agents board" label. A click opens/closes the panel.

### The board panel (overlay)

Three columns:

| Column | Criterion |
|---|---|
| **Working** | the session is running and not archived |
| **Done** | not running, not blank, not archived |
| **Archive** | the session is in the registry-wide archive |

Inside a column, cards are sorted by last activity (freshest first). Blank placeholder sessions never reach the board. Subagents are full cards marked "subagent of «parent»"; clicking any card opens that session (subagents through their open-subagent address) and closes the panel.

Three counters in the header:

- **N working** — running sessions (not archived);
- **N awaiting reply** — sessions waiting for the user (approvals, questions);
- **N tokens total** — the sum across all sessions of all four buckets (uncached input, output, cache read, cache write).

The panel can be **moved by its header** and **resized** by the right edge, the bottom edge, and the bottom-right corner grip (with a diagonal hatch). Minimum 560×360; bounds are the browser window. Position and size are stored in the browser's `localStorage` (key `agents-board.layout`) and restored after closing the panel, reloading the page, and restarting the server; a restored value is clamped to the current window. Close with the Close button, Escape, or a click on the dimmed backdrop. The default size without a stored layout is 1080×720, centered.

### The agent card — four lines

1. **Task name** (the session title; long names truncate — the full text is in the tooltip), the status dot (running/done/archived), the "awaiting reply" mark for sessions with pending interactions, and the **preset badge** in the top-right corner — the agent preset (`creator`, `standard`, …) from the session's `agentPreset` projection; shown only when set.
2. **Data**: `steps · turns` (the `sessionStats` projection), total tokens (four disjoint buckets), last activity time ("N min ago", "N h ago", a date), and total LLM time.
3. **Context**: a line like "context 33%" — the share of the context window from the pressure projection (`projectedTokens ?? pressureTokens` over `contextWindow`); until measured — "context —".
4. **The context progress bar** — present on every card: the filled part is green below 60%, yellow from 60–89%, red at 90% and above; the unfilled remainder of the line is light gray. Until the context is measured, the bar is empty.

### The Settings → Plugins card

A framed area with two settings; both apply immediately, without a restart (values live in `~/.dsh/settings.yaml`, section `agents-board`):

- **Board language**: Auto / EN / RU. "Auto" (the default) = English; RU switches all board text to Russian.
- **Show the agents board** — the toggle. When off, the sidebar button and the panel disappear; the settings card itself remains so you can switch it back on.

## How it works

- **Two plugin files.** `host.mjs` — the host half without a single import: it registers the `agents-board` settings section (`enabled: boolean`, `language: auto|en|ru`) through the settings service; the section resolver never throws — any malformed hand edit of `settings.yaml` normalizes to defaults and cannot block the harness boot. The section schema is a hand-rolled schemastery-compatible node: it serializes into a `{uid, refs}` envelope and the client rehydrates it through real schemastery.
- **client.js** — the browser bundle in ModuleLoader format (`window.__ModuleLoader__`), `React.createElement` only (no JSX), baseline externals: react, cordis, client-store, ui-primitives. It registers three slots: `shell.overlay` (the panel), `sidebar.footer.action` (the button), `settings.plugin.item` (the settings card), plus the `en`/`ru` dictionaries (`en` is the terminal fallback).
- **Data** — client mirrors only: sessions (state + the `sessionStats`, `tokenUsage`, `contextPressure`, `agentPreset` projections), the archive (`workspaces.archivedSessionIds`), pending interactions (`sessionPendingInteraction`). Nothing is fetched on click — the board updates together with the mirrors.
- **Storage**: settings — `settings.yaml` (section `agents-board`); the window layout — the browser's `localStorage`.

## Files

| File | Role |
|---|---|
| `package.json` | manifest: name `dsh-agents-board`, `dsh.client.platform: web`, export `./client` → `client.js` |
| `host.mjs` | host half: the `agents-board` settings section (`enabled`, `language`), no imports |
| `client.js` | browser bundle: columns, counters, cards, progress bars, button, switch, drag/resize |
| `install.ps1` | one-run installation (copy into `%DSH_HOME%\plugins\` + the profile-patch row) |
| `uninstall.ps1` | one-run removal (the row + the installed copy + the settings section) |
| `cordis.patch.yml` | informational copy of the installed row (rewritten by install.ps1, not used on its own) |
| `README.md` | this file; copied into the installed folder |

## Troubleshooting

- **The board is missing after installation.** The client module registry is built at server start — restart `pnpm dsh web` and refresh the page. Check: `http://127.0.0.1:3080/plugins/dsh-agents-board/client.js` must be served (not 404).
- **The button and the panel disappeared.** The "Show the agents board" toggle in Settings → Plugins is off — switch it back on there.
- **I changed client.js / host.mjs in the master folder, nothing changed on the board.** Run `install.ps1` again (the runtime does not read the master) and refresh the page; host-half edits need a server restart, client-half edits need only F5.
- **I deleted the master folder — will the server fail to start?** It must not: the patch row points at the copy in `%DSH_HOME%\plugins\dsh-agents-board\`, the runtime does not use the master. Deleting the installed copy without uninstalling the row causes a load error — in that case remove the row from `%DSH_HOME%\profiles\web\cordis.patch.yml` or restore the folder.
- **Reset the window layout.** Clear the `agents-board.layout` key in the page's localStorage (DevTools → Application → Local Storage) — the panel returns to 1080×720, centered.

---

# Русский (оригинал)

Плагин-«доска агентов» для web GUI DeepSeek Harness: одна панель со всеми агентами и субагентами из всех чатов — шаги, контекст, токены, режимы, живые счётчики.

Версия плагина: **1.4.0**.

## Установка

Требуется: установленный DeepSeek Harness (клон репозитория с выполненным `pnpm install`) и хотя бы один запуск `pnpm dsh web` на этом ПК (чтобы существовал профиль `%DSH_HOME%\profiles\web\`; по умолчанию `%DSH_HOME%` = `C:\<пользователь>\.dsh`). Windows PowerShell 5.1+ есть в Windows по умолчанию; Node.js 22.19+/24+ нужен самому harness, не установщику.

```powershell
powershell -ExecutionPolicy Bypass -File install.ps1
```

Скрипт (запускаемый из папки плагина):

1. Копирует **всю папку** — `package.json`, `host.mjs`, `client.js`, `install.ps1`, `uninstall.ps1`, `README.md`, `cordis.patch.yml` — в `%DSH_HOME%\plugins\dsh-agents-board\`. Эта копия и есть живой плагин.
2. Добавляет управляемую строку в `%DSH_HOME%\profiles\web\cordis.patch.yml` (помечена маркером `# dsh-agents-board (managed by install.ps1)`), указывающую на `…\plugins\dsh-agents-board\host.mjs`.
3. Переписывает `cordis.patch.yml` в мастер-папке — это только информационная копия установленного ряда.

Повторный запуск безопасен и идемпотентен: копия и ряд обновляются, дублей не появляется. Папка-мастер после установки harness'ом **не читается** — её можно переименовать, переместить или скопировать на другой ПК; на запуск сервера это не влияет. Если вы изменили файлы в мастер-папке — запустите `install.ps1` заново, чтобы освежить установленную копию.

После установки перезапустите `pnpm dsh web` и обновите страницу (F5). Реестр клиентских модулей строится при старте сервера, поэтому самый первый запуск плагина требует рестарта; все последующие переключения — нет.

## Удаление

```powershell
powershell -ExecutionPolicy Bypass -File uninstall.ps1
```

Скрипт работает одинаково из мастер-папки и из установленной копии (`%DSH_HOME%\plugins\dsh-agents-board\uninstall.ps1`). Он:

1. Убирает управляемую строку из `%DSH_HOME%\profiles\web\cordis.patch.yml`.
2. Удаляет установленную копию `%DSH_HOME%\plugins\dsh-agents-board\` (если скрипт запущен из неё и Windows блокирует удаление собственной папки — оставшиеся файлы безвредны, их можно удалить вручную).
3. Убирает раздел `agents-board` из `settings.yaml`.

Мастер-папку скрипт не трогает. После удаления перезапустите `pnpm dsh web`.

## Перенос на другой ПК

1. Скопируйте всю папку `dsh-agents-board` на другой ПК в любой путь (например `C:\Tools\dsh-agents-board`) — флешкой, архивом, по сети.
2. На том ПК должен быть установлен harness и хотя бы раз запущен `pnpm dsh web` (см. требования выше).
3. Запустите `powershell -ExecutionPolicy Bypass -File C:\Tools\dsh-agents-board\install.ps1` — скрипт сам определит свою папку (`$PSScriptRoot`), скопирует всё в `%DSH_HOME%\plugins\dsh-agents-board\` и впишет строку в профильный патч. pnpm для установки плагина не нужен.
4. Перезапустите `pnpm dsh web` и обновите страницу — доска появится сама.

## Что появляется в интерфейсе

### Кнопка в сайдбаре (`sidebar.footer.action`)

В узкой панели — точка-индикатор (голубая «в работе», когда есть запущенные сессии, серая — иначе), в широкой — подпись «Доска агентов». Клик открывает/закрывает панель.

### Панель-доска (overlay)

Три колонки:

| Колонка | Критерий |
|---|---|
| **В работе** | сессия запущена (`running`) и не в архиве |
| **Готово** | не запущена, не пустая, не в архиве |
| **Архив** | сессия в глобальном архиве реестра |

Внутри колонки карточки сортируются по времени последней активности (свежие сверху). Пустые сессии-заглушки (blank) на доску не попадают. Субагенты — полноценные карточки с пометкой «субагент «родитель»»; клик по любой карточке открывает эту сессию (для субагентов — через адрес открытого субагента) и закрывает панель.

В шапке три счётчика:

- **N работают** — запущенные сессии (не в архиве);
- **N ждут ответа** — сессии, ожидающие реакции пользователя (утверждения, вопросы);
- **N токенов всего** — сумма по всем сессиям всех четырёх бакетов (uncached input, output, cache read, cache write).

Панель можно **перемещать за шапку** и **растягивать** за правый край, нижний край и правый нижний уголок (с диагональной штриховкой). Минимум 560×360, границы — текущее окно браузера. Положение и размер запоминаются в `localStorage` браузера (ключ `agents-board.layout`) и восстанавливаются после закрытия панели, перезагрузки страницы и перезапуска сервера; при нехватке места восстанавливаемое значение обрезается по текущему окну. Закрытие: кнопка «Закрыть», Escape, клик по затемнению вокруг панели. Дефолтный размер без сохранённого layout — 1080×720 по центру.

### Карточка агента — четыре строки

1. **Имя задачи** (заголовок сессии, длинные имена обрезаются; полный текст — в подсказке), точка статуса (запущена/готова/архив), пометка «ждёт ответа» для сессий с ожидающими интеракциями и **бейдж режима** в правом верхнем углу — пресет агента (`creator`, `standard`, …) из проекции сессии `agentPreset`; показывается, только если задан.
2. **Данные**: `шагов · ходов` (проекция `sessionStats`), суммарные токены (четыре disjoint-бакета), время последней активности («N мин назад», «N ч назад», дата) и суммарное время LLM.
3. **Контекст**: строка вида «контекст 33%» — доля окна контекста из проекции давления (`projectedTokens ?? pressureTokens` к `contextWindow`); пока не измерено — «контекст —».
4. **Прогресс-бар контекста** — есть у каждой карточки: заполненная часть зелёная до 60%, жёлтая 60–89%, красная от 90%; незаполненный остаток линии — ярко-серый. Пока контекст не измерен, бар пустой.

### Карточка в Settings → Plugins

Рамка с двумя настройками, обе действуют сразу, без перезапуска (значения живут в `~/.dsh/settings.yaml`, раздел `agents-board`):

- **Язык доски**: Авто / EN / RU. «Авто» (значение по умолчанию) = английский; RU переводит весь текст доски на русский.
- **Показывать доску агентов** — тумблер. В выключенном состоянии кнопка в сайдбаре и панель исчезают; сама карточка настроек остаётся, чтобы можно было включить обратно.

## Как это устроено

- **Два файла плагина.** `host.mjs` — host-половина без единого импорта: регистрирует секцию настроек `agents-board` (`enabled: boolean`, `language: auto|en|ru`) через settings-сервис; резолвер настроек никогда не бросает исключений — любая некорректная hand-правка `settings.yaml` нормализуется к дефолту и не может помешать запуску harness. Схема секции — hand-rolled узел, совместимый с schemastery: сериализуется в `{uid, refs}`-конверт и ре-гидрируется клиентом через настоящий schemastery.
- **client.js** — клиентский бандл в формате ModuleLoader (`window.__ModuleLoader__`), только `React.createElement` (без JSX), базовые внешние модули: react, cordis, client-store, ui-primitives. Регистрирует три слота: `shell.overlay` (панель), `sidebar.footer.action` (кнопка), `settings.plugin.item` (карточка настроек), плюс словари `en`/`ru` (`en` — терминальный fallback).
- **Данные** — только клиентские зеркала: сессии (`sessions` состояние + проекции `sessionStats`, `tokenUsage`, `contextPressure`, `agentPreset`), архив (`workspaces.archivedSessionIds`), ожидающие интеракции (`sessionPendingInteraction`). Ничего не запрашивается с сервера по клику — доска обновляется сама, вместе с зеркалами.
- **Хранилища**: настройки — `settings.yaml` (раздел `agents-board`), layout окна — `localStorage` браузера.

## Файлы

| Файл | Роль |
|---|---|
| `package.json` | манифест: имя `dsh-agents-board`, `dsh.client.platform: web`, экспорт `./client` → `client.js` |
| `host.mjs` | host-половина: секция настроек `agents-board` (`enabled`, `language`), без импортов |
| `client.js` | клиентский бандл: колонки, счётчики, карточки, прогресс-бары, кнопка, переключатель, drag/resize |
| `install.ps1` | подключение одним запуском (копия в `%DSH_HOME%\plugins\` + ряд в профильном патче) |
| `uninstall.ps1` | удаление одним запуском (ряд + установленная копия + раздел настроек) |
| `cordis.patch.yml` | информационная копия установленного ряда (переписывается install.ps1, сам по себе не используется) |
| `README.md` | этот файл; копируется в установленную папку |

## Устранение неполадок

- **После установки доски нет.** Реестр клиентских модулей строится при старте сервера — перезапустите `pnpm dsh web` и обновите страницу. Проверка: `http://127.0.0.1:3080/plugins/dsh-agents-board/client.js` должен отдаваться (не 404).
- **Кнопка и панель исчезли.** Выключен тумблер «Показывать доску агентов» в Settings → Plugins — включите его там же.
- **Изменил client.js / host.mjs в мастер-папке, на доске ничего не поменялось.** Запустите `install.ps1` заново (мастер не читается рантаймом) и обновите страницу; правки host-половины требуют рестарта сервера, клиентской — достаточно F5.
- **Удалил мастер-папку, сервер не стартует?** Не должен: ряд патча указывает на копию в `%DSH_HOME%\plugins\dsh-agents-board\`, мастер-папка рантаймом не используется. Удаление установленной копии без uninstall'а строки патча приведёт к ошибке загрузки — в этом случае уберите ряд из `%DSH_HOME%\profiles\web\cordis.patch.yml` или верните папку.
- **Сбросить layout окна.** Очистите ключ `agents-board.layout` в localStorage страницы (DevTools → Application → Local Storage) — панель вернётся к 1080×720 по центру.
