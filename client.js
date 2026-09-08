window.__ModuleLoader__.load({
	id: "dsh-agents-board",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let store = require("@deepseek-ai/dsh-client-store");
		let primitives = require("@deepseek-ai/dsh-client-ui-primitives");

		//#region stylesheet
		const css = ".aboard-backdrop{position:fixed;inset:0;z-index:80;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--dsw-alias-label-primary) 22%,transparent)}.aboard-panel{position:absolute;display:flex;flex-direction:column;box-sizing:border-box;padding:14px 16px 16px;background:var(--dsw-specific-menu);border:1px solid var(--dsw-alias-border-l1);box-shadow:var(--dsw-elevation-prominent);border-radius:20px;--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2)}.aboard-header{display:flex;align-items:center;gap:12px;flex:none;padding-bottom:10px;cursor:move;user-select:none;touch-action:none}.aboard-title{margin:0;font-size:14px;font-weight:600;line-height:20px;color:var(--dsw-alias-label-primary)}.aboard-counters{display:flex;flex:1;gap:6px;flex-wrap:wrap;min-width:0}.aboard-counter{display:inline-flex;align-items:center;gap:5px;padding:1px 8px;border-radius:999px;background:var(--dsw-alias-fill-l2);color:var(--dsw-alias-label-secondary);font-size:12px;line-height:20px;white-space:nowrap}.aboard-counter svg{flex:none}.aboard-close{flex:none;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border:0;border-radius:8px;background:0 0;color:var(--dsw-alias-label-tertiary);cursor:pointer}.aboard-close:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-fill-l2)}.aboard-columns{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;min-height:0;flex:1}.aboard-column{display:flex;flex-direction:column;min-height:0;gap:6px}.aboard-columnHead{flex:none;display:flex;align-items:center;gap:6px;padding:0 2px;font-size:12px;font-weight:600;line-height:18px;color:var(--dsw-alias-label-secondary)}.aboard-columnCount{color:var(--dsw-alias-label-tertiary);font-weight:400}.aboard-columnBody{flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding:2px}.aboard-empty{margin:6px 2px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}.aboard-card{display:flex;flex-direction:column;gap:4px;align-items:stretch;width:100%;text-align:left;padding:8px 10px;border:1px solid var(--dsw-alias-border-l3);border-radius:10px;background:0 0;cursor:pointer;flex:none}.aboard-card:hover{background:var(--dsw-alias-fill-l2)}.aboard-cardTitleRow{display:flex;align-items:center;gap:6px;min-width:0}.aboard-cardName{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;line-height:18px;color:var(--dsw-alias-label-primary)}.aboard-cardPending{flex:none;font-size:11px;line-height:16px;color:var(--dsw-alias-state-warn-primary)}.aboard-cardMeta{display:flex;flex-wrap:wrap;gap:2px 10px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary);font-family:var(--dsw-font-mono)}.aboard-cardContext{font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary);font-family:var(--dsw-font-mono)}.aboard-cardSub{font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary)}.aboard-cardMode{flex:none;max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:10px;line-height:16px;color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l3);border-radius:999px;padding:0 6px}.aboard-progress{display:block;height:4px;border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-label-tertiary) 30%,transparent);overflow:hidden}.aboard-progressFill{display:block;height:100%;border-radius:999px;transition:width .2s ease}.aboard-progressOk{background:var(--dsw-alias-state-success-primary)}.aboard-progressWarn{background:var(--dsw-alias-state-warn-primary)}.aboard-progressHot{background:var(--dsw-alias-state-error-primary)}.aboard-grip{position:absolute;z-index:2;touch-action:none}.aboard-gripE{top:0;right:0;bottom:0;width:6px;cursor:ew-resize}.aboard-gripS{left:0;right:0;bottom:0;height:6px;cursor:ns-resize}.aboard-gripSe{right:0;bottom:0;width:16px;height:16px;cursor:nwse-resize;border-bottom-right-radius:16px;background:repeating-linear-gradient(-45deg,transparent 0 4px,var(--dsw-alias-label-tertiary) 4px 5px);opacity:.4}.aboard-button{display:inline-flex;align-items:center;gap:8px;min-height:28px;padding:3px 6px;border:0;border-radius:8px;background:0 0;color:var(--dsw-alias-label-tertiary);cursor:pointer;font-size:12px;line-height:18px}.aboard-button:hover{color:var(--dsw-alias-label-secondary)}.aboard-buttonLabel{white-space:nowrap}.aboard-settings{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:12px;border:1px solid var(--dsw-alias-border-l3);border-radius:12px}.aboard-settingsText{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}.aboard-settingsTitle{margin:0;font-size:13px;font-weight:600;line-height:18px;color:var(--dsw-alias-label-primary)}.aboard-settingsDesc{margin:0;font-size:12px;line-height:16px;color:var(--dsw-alias-label-tertiary)}.aboard-settingsControls{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:flex-end}.aboard-languageRow{display:flex;align-items:center;gap:8px}.aboard-languageLabel{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);white-space:nowrap}.aboard-segmented{display:inline-flex;align-items:stretch;border:1px solid var(--dsw-alias-border-l3);border-radius:8px;background:var(--dsw-alias-fill-l2);padding:2px;gap:2px}.aboard-segment{border:0;border-radius:6px;background:0 0;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:18px;padding:0 10px;cursor:pointer;white-space:nowrap}.aboard-segment:hover{color:var(--dsw-alias-label-secondary)}.aboard-segmentActive{background:var(--dsw-specific-menu);color:var(--dsw-alias-label-primary)}.aboard-segment:disabled{cursor:default;opacity:.5}";
		const tagId = "dsh-agents-board/board.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-agents-board";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region lib/types/client/board-model.js
		const { StateDot, Switch, IconCloseOutline16 } = primitives;
		/** Disjoint token buckets; reasoning tokens already ride `outputTokens`. */
		function totalTokens(usage) {
			if (!usage) return 0;
			return (usage.uncachedInputTokens || 0) + (usage.outputTokens || 0) + (usage.cacheReadTokens || 0) + (usage.cacheWriteTokens || 0);
		}
		/**
		 * Context occupancy percent from the newest pressure record.
		 * @returns {number|undefined} 0..100, or undefined while unmeasured.
		 */
		function contextPercent(pressure) {
			if (!pressure) return undefined;
			const used = pressure.projectedTokens ?? pressure.pressureTokens;
			if (!used || !pressure.contextWindow) return undefined;
			return Math.max(0, Math.min(100, Math.round((used / pressure.contextWindow) * 100)));
		}
		/** Progress fill class: green below 60%, yellow 60-89%, red at 90% and above. */
		function progressClass(percent) {
			if (percent >= 90) return "aboard-progressHot";
			if (percent >= 60) return "aboard-progressWarn";
			return "aboard-progressOk";
		}
		/**
		 * Subagent descendant counts per possible parent (ui-subagent lineage projection, inlined).
		 * @param {Record<string, {id:string, parentId?:string, origin?:'subagent', running:boolean}>} summaries
		 * @returns {Map<string, {count:number, runningCount:number}>}
		 */
		function indexSubagentDescendants(summaries) {
			const indexed = new Map();
			for (const descendant of Object.values(summaries)) {
				if (!descendant || descendant.origin !== "subagent") continue;
				const seen = new Set();
				let current = descendant;
				while (current && current.origin === "subagent" && current.parentId !== undefined && !seen.has(current.id)) {
					seen.add(current.id);
					const aggregate = indexed.get(current.parentId);
					if (aggregate === undefined) indexed.set(current.parentId, { count: 1, runningCount: descendant.running ? 1 : 0 });
					else {
						aggregate.count += 1;
						if (descendant.running) aggregate.runningCount += 1;
					}
					current = summaries[current.parentId];
				}
			}
			return indexed;
		}
		/**
		 * Pure board derivation over the sessions mirror.
		 * @param {object} list - SessionListState snapshot.
		 * @param {readonly string[]} archivedIds - registry-global archive set.
		 * @param {ReadonlyMap<string, unknown>} pending - pending interactions by session.
		 * @returns {{columns:{running:any[],done:any[],archive:any[]}, runningCount:number, tokensTotal:number, waiting:number, descendants:Map<any, any>}}
		 */
		function deriveBoard(list, archivedIds, pending) {
			const archived = new Set(archivedIds || []);
			const byId = list?.byId || {};
			const columns = { running: [], done: [], archive: [] };
			let tokensTotal = 0;
			let runningCount = 0;
			for (const id of list?.ids || []) {
				const row = byId[id];
				if (!row || row.blank) continue;
				tokensTotal += totalTokens(row.projectionValues && row.projectionValues.tokenUsage);
				const isArchived = archived.has(id);
				const running = row.running === true;
				if (running && !isArchived) runningCount += 1;
				columns[isArchived ? "archive" : running ? "running" : "done"].push(row);
			}
			for (const key of ["running", "done", "archive"]) {
				columns[key].sort((left, right) => right.updatedAt - left.updatedAt);
			}
			return {
				columns,
				runningCount,
				tokensTotal,
				waiting: pending ? pending.size : 0,
				descendants: indexSubagentDescendants(byId),
			};
		}
		/** Human duration: "1h 2m", "3m 40s", "12s". */
		function formatDuration(ms) {
			const total = Math.max(0, Math.floor((ms || 0) / 1000));
			if (total <= 0) return "";
			const hours = Math.floor(total / 3600);
			const minutes = Math.floor((total % 3600) / 60);
			const seconds = total % 60;
			if (hours > 0) return hours + "h " + minutes + "m";
			if (minutes > 0) return minutes + "m " + seconds + "s";
			return seconds + "s";
		}
		//#endregion
		//#region lib/types/client/panel-layout.js
		/** localStorage key carrying the board window's size and position. */
		const LAYOUT_KEY = "agents-board.layout";
		const MIN_WIDTH = 560;
		const MIN_HEIGHT = 360;
		function clampBetween(value, min, max) {
			return Math.min(Math.max(value, min), Math.max(min, max));
		}
		/** The pre-drag default: the historical 1080x720 panel, centered and clamped. */
		function defaultLayout() {
			const width = Math.min(1080, Math.max(MIN_WIDTH, window.innerWidth - 32));
			const height = Math.min(720, Math.max(MIN_HEIGHT, window.innerHeight - 32));
			return {
				width,
				height,
				left: Math.max(8, Math.floor((window.innerWidth - width) / 2)),
				top: Math.max(8, Math.floor((window.innerHeight - height) / 2))
			};
		}
		/**
		 * Restore the persisted window layout, clamped to the current viewport.
		 * @returns {{width:number, height:number, left:number, top:number}|undefined} undefined when nothing usable is stored.
		 */
		function readLayout() {
			try {
				const raw = localStorage.getItem(LAYOUT_KEY);
				if (!raw) return undefined;
				const parsed = JSON.parse(raw);
				if (!parsed || typeof parsed !== "object") return undefined;
				const vw = window.innerWidth;
				const vh = window.innerHeight;
				const width = clampBetween(Number(parsed.width), MIN_WIDTH, vw - 16);
				const height = clampBetween(Number(parsed.height), MIN_HEIGHT, vh - 16);
				const left = clampBetween(Number(parsed.left), Math.min(8, vw - 120), vw - 120);
				const top = clampBetween(Number(parsed.top), 0, vh - 40);
				if (![width, height, left, top].every(Number.isFinite)) return undefined;
				return { width, height, left, top };
			} catch {
				// Unreadable storage (private mode, quota): fall back to the default layout.
				return undefined;
			}
		}
		function writeLayout(layout) {
			try {
				localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
			} catch {
				// Unwritable storage keeps the layout session-only.
			}
		}
		/** One active drag/resize gesture, seeded with the pointer origin and the layout snapshot. */
		function applyGesture(prev, gesture, clientX, clientY) {
			const dx = clientX - gesture.startX;
			const dy = clientY - gesture.startY;
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			if (gesture.mode === "move") {
				return {
					...prev,
					left: clampBetween(gesture.start.left + dx, -(prev.width - 120), vw - 120),
					top: clampBetween(gesture.start.top + dy, 0, vh - 40)
				};
			}
			const next = { ...prev };
			if (gesture.mode === "resize-e" || gesture.mode === "resize-se") {
				next.width = clampBetween(gesture.start.width + dx, MIN_WIDTH, vw - prev.left - 8);
			}
			if (gesture.mode === "resize-s" || gesture.mode === "resize-se") {
				next.height = clampBetween(gesture.start.height + dy, MIN_HEIGHT, vh - prev.top - 8);
			}
			return next;
		}
		//#endregion
		//#region lib/types/client/locales.js
		/** English dictionary — the fallback terminus of every locale chain. */
		const en = {
			"board.title": "Agents board",
			"board.close": "Close",
			"board.resize": "Drag to resize",
			"col.running": "Working",
			"col.done": "Done",
			"col.archive": "Archive",
			"col.empty": "Nothing here",
			"counter.running": "{count} working",
			"counter.waiting": "{count} awaiting reply",
			"counter.tokens": "{count} tokens total",
			"card.waiting": "awaiting reply",
			"card.steps": "{count} steps",
			"card.turns": "{count} turns",
			"card.context": "context {percent}%",
			"card.contextUnknown": "context —",
			"card.tokens": "{count} tokens",
			"card.llm": "LLM {duration}",
			"card.subagents": "subagents: {count} ({running} running)",
			"card.parent": "subagent of {parent}",
			"card.mode": "Mode: {mode}",
			"time.now": "just now",
			"time.minAgo": "{count} min ago",
			"time.hourAgo": "{count} h ago",
			"time.dayAgo": "{count} d ago",
			"time.date": "{date}",
			"settings.title": "Agents board",
			"settings.description": "Sidebar button and overlay panel listing every agent: steps, context, tokens, subagents.",
			"settings.switch": "Show the agents board",
			"settings.language": "Language",
			"settings.languageAuto": "Auto"
		};
		/** Russian dictionary, key-identical to the English source of truth. */
		const ru = {
			"board.title": "Доска агентов",
			"board.close": "Закрыть",
			"board.resize": "Потяните, чтобы изменить размер",
			"col.running": "В работе",
			"col.done": "Готово",
			"col.archive": "Архив",
			"col.empty": "Пусто",
			"counter.running": "{count} работают",
			"counter.waiting": "{count} ждут ответа",
			"counter.tokens": "{count} токенов всего",
			"card.waiting": "ждёт ответа",
			"card.steps": "{count} шагов",
			"card.turns": "{count} ходов",
			"card.context": "контекст {percent}%",
			"card.contextUnknown": "контекст —",
			"card.tokens": "{count} токенов",
			"card.llm": "LLM {duration}",
			"card.subagents": "субагентов: {count} ({running} в работе)",
			"card.parent": "субагент «{parent}»",
			"card.mode": "Режим: {mode}",
			"time.now": "только что",
			"time.minAgo": "{count} мин назад",
			"time.hourAgo": "{count} ч назад",
			"time.dayAgo": "{count} дн назад",
			"time.date": "{date}",
			"settings.title": "Доска агентов",
			"settings.description": "Кнопка в сайдбаре и панель со всеми агентами: шаги, контекст, токены, субагенты.",
			"settings.switch": "Показывать доску агентов",
			"settings.language": "Язык",
			"settings.languageAuto": "Авто"
		};
		//#endregion
		//#region lib/types/client/components.js
		/** Stable empty map identity for sessions snapshots without pending interactions. */
		const NO_PENDING = new Map();
		/** Pick the dictionary for an explicit language; falls back to English. */
		function makeT(lang) {
			const dict = lang === "ru" ? ru : en;
			return (key, params) => {
				let text = dict[key] !== undefined ? dict[key] : en[key] !== undefined ? en[key] : key;
				if (params) {
					for (const name of Object.keys(params)) {
						text = text.split("{" + name + "}").join(String(params[name]));
					}
				}
				return text;
			};
		}
		/** `auto` (the default) means English; explicit ru overrides, everything else stays English. */
		function resolveT(board, seatT) {
			if (board.status === "ready") {
				const language = board.value && board.value.language;
				return makeT(language === "ru" ? "ru" : "en");
			}
			return seatT;
		}
		function relativeTime(updatedAt, t) {
			if (!updatedAt) return "";
			const minutes = Math.floor((Date.now() - updatedAt) / 60000);
			if (minutes < 1) return t("time.now");
			if (minutes < 60) return t("time.minAgo", { count: minutes });
			const hours = Math.floor(minutes / 60);
			if (hours < 24) return t("time.hourAgo", { count: hours });
			const days = Math.floor(hours / 24);
			if (days < 7) return t("time.dayAgo", { count: days });
			return t("time.date", { date: new Date(updatedAt).toLocaleDateString() });
		}
		/**
		 * One session card: 1) title 2) data 3) context percent 4) progress bar.
		 * The bar renders on every card; an unmeasured session shows an empty track.
		 * @param {object} props - { row, t, list, pending, descendants, actions, isArchived }
		 */
		function EntryCard({ row, t, list, pending, descendants, actions, isArchived }) {
			const values = row.projectionValues || {};
			const stats = values.sessionStats;
			const percent = contextPercent(values.contextPressure);
			const usage = values.tokenUsage;
			const sub = descendants.get(row.id);
			const parent = row.origin === "subagent" && row.parentId !== undefined
				? (list.byId[row.parentId] ? list.byId[row.parentId].displayTitle : row.parentId)
				: undefined;
			const meta = [];
			if (stats && (stats.steps > 0 || stats.turns > 0)) {
				meta.push(t("card.steps", { count: stats.steps }) + " · " + t("card.turns", { count: stats.turns }));
			}
			if (usage) meta.push(t("card.tokens", { count: totalTokens(usage).toLocaleString() }));
			const when = relativeTime(row.updatedAt, t);
			if (when) meta.push(when);
			if (stats && stats.llmMs > 0) meta.push(t("card.llm", { duration: formatDuration(stats.llmMs) }));
			return react.createElement("button", {
				type: "button",
				className: "aboard-card",
				onClick: () => actions.openSession(row.id)
			},
				react.createElement("span", { className: "aboard-cardTitleRow" },
					react.createElement(StateDot, { state: isArchived ? "idle" : row.running ? "ongoing" : "done", size: 8 }),
					react.createElement("span", { className: "aboard-cardName", title: row.displayTitle }, row.displayTitle),
					pending.has(row.id) ? react.createElement("span", { className: "aboard-cardPending" }, t("card.waiting")) : null,
					typeof values.agentPreset === "string" && values.agentPreset !== "" ? react.createElement("span", {
						className: "aboard-cardMode",
						title: t("card.mode", { mode: values.agentPreset })
					}, values.agentPreset) : null
				),
				react.createElement("span", { className: "aboard-cardMeta" }, meta.map((text, index) => react.createElement("span", { key: index }, text))),
				react.createElement("span", { className: "aboard-cardContext" },
					percent === undefined ? t("card.contextUnknown") : t("card.context", { percent })
				),
				react.createElement("span", {
					className: "aboard-progress",
					role: "progressbar",
					"aria-valuemin": 0,
					"aria-valuemax": 100,
					"aria-valuenow": percent === undefined ? 0 : percent
				},
					react.createElement("span", {
						className: "aboard-progressFill" + (percent === undefined ? "" : " " + progressClass(percent)),
						style: { width: (percent === undefined ? 0 : percent) + "%" }
					})
				),
				sub && sub.count > 0 ? react.createElement("span", { className: "aboard-cardSub" }, t("card.subagents", { count: sub.count, running: sub.runningCount })) : null,
				parent ? react.createElement("span", { className: "aboard-cardSub" }, t("card.parent", { parent })) : null
			);
		}
		/** One board column: header with count plus the card stack. */
		function Column({ titleKey, rows, emptyKey, isArchived, ...cardProps }) {
			const t = cardProps.t;
			return react.createElement("section", { className: "aboard-column" },
				react.createElement("header", { className: "aboard-columnHead" },
					react.createElement("span", null, t(titleKey)),
					react.createElement("span", { className: "aboard-columnCount" }, String(rows.length))
				),
				react.createElement("div", { className: "aboard-columnBody" },
					rows.length === 0
						? react.createElement("p", { className: "aboard-empty" }, t(emptyKey))
						: rows.map((row) => react.createElement(EntryCard, {
							key: row.id,
							row,
							isArchived,
							t: cardProps.t,
							list: cardProps.list,
							pending: cardProps.pending,
							descendants: cardProps.descendants,
							actions: cardProps.actions
						}))
				)
			);
		}
		/** The overlay surface once the board is open; owns the data hooks. */
		function BoardSurface(props) {
			const list = props.useSessions(identity);
			const workspaces = props.useWorkspaces(identity);
			const pending = props.useSessionPendingInteraction(identity) || NO_PENDING;
			const board = props.useBoard(identity);
			const t = resolveT(board, props.t);
			const [layout, setLayout] = react.useState(() => readLayout() || defaultLayout());
			const gesture = react.useRef(null);
			const [tick, setTick] = react.useState(0);
			react.useEffect(() => {
				const timer = setInterval(() => setTick((value) => value + 1), 30000);
				return () => { clearInterval(timer); };
			}, []);
			react.useEffect(() => {
				const onKey = (event) => {
					if (event.key === "Escape") props.actions.closeBoard();
				};
				window.addEventListener("keydown", onKey);
				return () => { window.removeEventListener("keydown", onKey); };
			}, [props.actions]);
			// Keep a persisted layout inside the viewport when the window shrinks.
			react.useEffect(() => {
				const onResize = () => {
					setLayout((prev) => {
						const next = {
							width: clampBetween(prev.width, MIN_WIDTH, window.innerWidth - 16),
							height: clampBetween(prev.height, MIN_HEIGHT, window.innerHeight - 16),
							left: clampBetween(prev.left, Math.min(8, window.innerWidth - 120), window.innerWidth - 120),
							top: clampBetween(prev.top, 0, Math.max(0, window.innerHeight - 40))
						};
						return next.width === prev.width && next.height === prev.height && next.left === prev.left && next.top === prev.top ? prev : next;
					});
				};
				window.addEventListener("resize", onResize);
				return () => { window.removeEventListener("resize", onResize); };
			}, []);
			const model = react.useMemo(
				() => deriveBoard(list, workspaces ? workspaces.archivedSessionIds : [], pending),
				[list, workspaces, pending]
			);
			const cardProps = {
				t,
				list,
				pending,
				descendants: model.descendants,
				actions: props.actions
			};
			const beginGesture = (mode) => (event) => {
				if (event.button !== 0) return;
				if (mode === "move" && typeof event.target.closest === "function" && event.target.closest("button")) return;
				event.preventDefault();
				gesture.current = { mode, startX: event.clientX, startY: event.clientY, start: layout };
				const onMove = (moveEvent) => {
					const active = gesture.current;
					if (!active) return;
					setLayout((prev) => applyGesture(prev, active, moveEvent.clientX, moveEvent.clientY));
				};
				const onUp = () => {
					gesture.current = null;
					window.removeEventListener("pointermove", onMove);
					window.removeEventListener("pointerup", onUp);
				};
				window.addEventListener("pointermove", onMove);
				window.addEventListener("pointerup", onUp);
			};
			react.useEffect(() => {
				writeLayout(layout);
			}, [layout]);
			return react.createElement("div", {
				className: "aboard-backdrop",
				onClick: (event) => {
					if (event.target === event.currentTarget) props.actions.closeBoard();
				}
			},
				react.createElement("div", {
					className: "aboard-panel",
					role: "dialog",
					"aria-label": t("board.title"),
					style: {
						left: layout.left + "px",
						top: layout.top + "px",
						width: layout.width + "px",
						height: layout.height + "px"
					}
				},
					react.createElement("header", { className: "aboard-header", onPointerDown: beginGesture("move") },
						react.createElement("h2", { className: "aboard-title" }, t("board.title")),
						react.createElement("div", { className: "aboard-counters" },
							react.createElement("span", { className: "aboard-counter" },
								react.createElement(StateDot, { state: model.runningCount > 0 ? "ongoing" : "idle", size: 8 }),
								t("counter.running", { count: model.runningCount })
							),
							react.createElement("span", { className: "aboard-counter" },
								react.createElement(StateDot, { state: model.waiting > 0 ? "warning" : "idle", size: 8 }),
								t("counter.waiting", { count: model.waiting })
							),
							react.createElement("span", { className: "aboard-counter" }, t("counter.tokens", { count: model.tokensTotal.toLocaleString() }))
						),
						react.createElement("button", {
							type: "button",
							className: "aboard-close",
							"aria-label": t("board.close"),
							onClick: props.actions.closeBoard
						}, react.createElement(IconCloseOutline16, { size: 16 }))
					),
					react.createElement("div", { className: "aboard-columns" },
						react.createElement(Column, { titleKey: "col.running", emptyKey: "col.empty", rows: model.columns.running, isArchived: false, ...cardProps }),
						react.createElement(Column, { titleKey: "col.done", emptyKey: "col.empty", rows: model.columns.done, isArchived: false, ...cardProps }),
						react.createElement(Column, { titleKey: "col.archive", emptyKey: "col.empty", rows: model.columns.archive, isArchived: true, ...cardProps })
					),
					react.createElement("span", { className: "aboard-grip aboard-gripE", onPointerDown: beginGesture("resize-e") }),
					react.createElement("span", { className: "aboard-grip aboard-gripS", onPointerDown: beginGesture("resize-s") }),
					react.createElement("span", { className: "aboard-grip aboard-gripSe", onPointerDown: beginGesture("resize-se"), title: t("board.resize") })
				)
			);
		}
		/** Overlay gate: hooks stay unconditional, then render null when closed or disabled. */
		function BoardOverlay(props) {
			const view = props.useView(identity);
			const board = props.useBoard(identity);
			if (!view.open || !isEnabled(board)) return null;
			return react.createElement(BoardSurface, props);
		}
		/** Sidebar footer toggle: icon dot in the rail, dot + label when expanded. */
		function BoardButton(props) {
			const view = props.useView(identity);
			const board = props.useBoard(identity);
			const runningCount = countRunning(props.useSessions(identity));
			const t = resolveT(board, props.t);
			if (!isEnabled(board)) return null;
			return react.createElement("button", {
				type: "button",
				className: "aboard-button",
				"aria-label": t("board.title"),
				"aria-expanded": view.open,
				onClick: props.actions.openBoard
			},
				react.createElement(StateDot, { state: runningCount > 0 ? "ongoing" : "idle", size: 8 }),
				props.wide ? react.createElement("span", { className: "aboard-buttonLabel" }, t("board.title")) : null
			);
		}
		/** Settings → Plugins card: framed area with the language selector and the switch. */
		function BoardSettingsCard(props) {
			const board = props.useBoard(identity);
			if (board.status !== "ready") return null;
			const t = resolveT(board, props.t);
			const enabled = board.value ? board.value.enabled !== false : true;
			const language = board.value && typeof board.value.language === "string" ? board.value.language : "auto";
			return react.createElement("div", { className: "aboard-settings" },
				react.createElement("div", { className: "aboard-settingsText" },
					react.createElement("h3", { className: "aboard-settingsTitle" }, t("settings.title")),
					react.createElement("p", { className: "aboard-settingsDesc" }, t("settings.description"))
				),
				react.createElement("div", { className: "aboard-settingsControls" },
					react.createElement("div", { className: "aboard-languageRow" },
						react.createElement("span", { className: "aboard-languageLabel" }, t("settings.language")),
						react.createElement("div", { className: "aboard-segmented", role: "group", "aria-label": t("settings.language") },
							["auto", "en", "ru"].map((code) => react.createElement("button", {
								key: code,
								type: "button",
								className: code === language ? "aboard-segment aboard-segmentActive" : "aboard-segment",
								disabled: board.writable !== true,
								"aria-pressed": code === language,
								onClick: () => props.actions.setLanguage(code)
							}, code === "auto" ? t("settings.languageAuto") : code.toUpperCase()))
						)
					),
					react.createElement(Switch, {
						checked: enabled,
						label: t("settings.switch"),
						disabled: board.writable !== true,
						title: board.writable ? undefined : t("board.title"),
						onChange: (next) => props.actions.setEnabled(next)
					})
				)
			);
		}
		function identity(value) {
			return value;
		}
		/** Treat a loading/unavailable scope as the composition default (enabled). */
		function isEnabled(board) {
			return board.status === "ready" ? (board.value ? board.value.enabled !== false : true) : true;
		}
		function countRunning(list) {
			let count = 0;
			for (const id of list?.ids || []) {
				const row = list.byId[id];
				if (row && row.running && !row.blank) count += 1;
			}
			return count;
		}
		//#endregion
		//#region lib/types/client/index.js
		const NS = "agents-board";
		const inject = ["sessions", "slots", "locale", "settingsScope"];
		/**
		 * Client plugin body: dictionaries, the settings scope, and three slot
		 * registrations sharing one inject face (scope + open-state + actions).
		 * @param {object} ctx - client plugin context.
		 */
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { en, ru }), "agents-board: dictionaries");
			const scope = ctx.settingsScope.bind({ namespace: NS });
			const view = store.createSnapshotStore({ open: false });
			const actions = {
				openBoard: () => view.set({ open: true }),
				closeBoard: () => view.set({ open: false }),
				setEnabled: (next) => {
					void scope.set("enabled", next);
				},
				setLanguage: (next) => {
					void scope.set("language", next);
				},
				openSession: (id) => {
					const address = ctx.sessions.subagentAddress(id);
					if (address !== undefined) ctx.sessions.openSubagent(address);
					else ctx.sessions.open(id);
					view.set({ open: false });
				}
			};
			const face = () => ({
				hooks: { board: scope, view },
				actions
			});
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "agents-board-overlay",
				order: 40,
				locale: NS,
				inject: face
			}, BoardOverlay));
			ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
				name: "sidebar.footer.action",
				id: "agents-board-button",
				order: 10,
				locale: NS,
				inject: face
			}, BoardButton));
			ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
				name: "settings.plugin.item",
				key: NS,
				locale: NS,
				inject: face
			}, BoardSettingsCard));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
