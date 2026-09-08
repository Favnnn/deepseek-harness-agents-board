/**
 * dsh-agents-board, Host half.
 *
 * A function plugin with NO imports: the installed copy lives outside any
 * pnpm tree, so bare imports cannot resolve here. The settings schema is a
 * hand-rolled, schemastery-compatible node — callable with a `toJSON()`
 * producing the `{ uid, refs }` envelope the settings provider serializes to
 * the wire and the web client rehydrates through `new Schema(serialized)`.
 */

export const name = 'agents-board'

/** Allowed board languages; `auto` renders the English dictionary. */
const LANGUAGES = ['auto', 'en', 'ru']

/**
 * Validate and normalize one merged settings candidate. Never throws: the
 * section must not be able to block a harness boot, so an invalid field
 * normalizes to its default instead. The wire schema (real schemastery on the
 * client) also accepts any string, so normalization is the single authority.
 * @param {unknown} candidate - merged base + user section.
 * @returns {{ enabled: boolean, language: string }} the normalized section.
 */
function resolveAgentsBoardSection(candidate) {
  if (candidate === undefined || candidate === null || typeof candidate !== 'object' || Array.isArray(candidate)) {
    return { enabled: true, language: 'auto' }
  }
  const enabled = typeof candidate.enabled === 'boolean' ? candidate.enabled : true
  const language = typeof candidate.language === 'string' && LANGUAGES.includes(candidate.language) ? candidate.language : 'auto'
  return { ...candidate, enabled, language }
}

/**
 * Build the schemastery-compatible node for `{ enabled, language }`.
 * @returns {object} callable schema with a wire `toJSON()` envelope.
 */
function createAgentsBoardSchema() {
  const envelope = {
    uid: 0,
    refs: {
      0: { type: 'object', meta: {}, dict: { enabled: 1, language: 2 } },
      1: { type: 'boolean', meta: { default: true } },
      2: { type: 'string', meta: { default: 'auto' } },
    },
  }
  const schema = (candidate) => resolveAgentsBoardSection(candidate)
  schema.type = 'object'
  schema.meta = envelope.refs[0].meta
  schema.dict = { enabled: envelope.refs[1], language: envelope.refs[2] }
  schema.toJSON = () => ({ uid: 0, refs: envelope.refs })
  return schema
}

/** Resolved board configuration for diagnostics and fallback reads. */
const boardState = { enabled: true, language: 'auto' }

/**
 * Plugin body: register the `agents-board` settings section.
 * @param {import('@deepseek-ai/cordis').Context} ctx - host plugin context.
 * @param {{ enabled?: boolean, language?: string } | undefined} config - patch row `config`.
 */
export function apply(ctx, config) {
  const resolved = resolveAgentsBoardSection(config ?? {})
  boardState.enabled = resolved.enabled
  boardState.language = resolved.language

  const settings = ctx.get('settings')
  if (settings === undefined) {
    ctx.logger?.warn?.('agents-board: settings service absent; the GUI toggle will not appear')
    return
  }

  settings.installSection(ctx, 'agents-board', createAgentsBoardSchema(), { enabled: boardState.enabled, language: boardState.language }, {
    setSource: (current) => {
      boardState.enabled = current.enabled !== false
      boardState.language = LANGUAGES.includes(current.language) ? current.language : 'auto'
    },
    onChange: () => {
      ctx.logger?.debug?.('agents-board: enabled=%s language=%s', boardState.enabled, boardState.language)
    },
  })
}

/** Current resolved board state (host-side fallback when settings are absent). */
export function readBoardState() {
  return { ...boardState }
}
