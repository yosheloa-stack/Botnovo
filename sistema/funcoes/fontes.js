// Letras "enfeitadas" que o bot usa nos textos (negrito, negrito itálico,
// monoespaçada e versalete). Serve pra ler o texto como letra comum e pra
// escrever de volta na mesma fonte.

const SEQ = (maiuscula, minuscula, digito) => ({ maiuscula, minuscula, digito })
const BLOCOS = {
  negrito: SEQ(0x1D400, 0x1D41A, 0x1D7CE),
  italico: SEQ(0x1D468, 0x1D482, 0x1D7CE),
  mono: SEQ(0x1D670, 0x1D68A, 0x1D7F6)
}
// Versalete: ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ (s e x são as comuns).
const VERSALETE = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'

const paraComum = new Map()
for (const [fonte, b] of Object.entries(BLOCOS)) {
  for (let i = 0; i < 26; i++) {
    paraComum.set(String.fromCodePoint(b.maiuscula + i), { c: String.fromCharCode(65 + i), fonte })
    paraComum.set(String.fromCodePoint(b.minuscula + i), { c: String.fromCharCode(97 + i), fonte })
  }
  for (let i = 0; i < 10; i++) if (fonte !== 'italico') paraComum.set(String.fromCodePoint(b.digito + i), { c: String(i), fonte })
}
// Buracos do bloco negrito-itálico/mono que o Unicode preenche em outro lugar.
paraComum.set('ℎ', { c: 'h', fonte: 'italico' })
Array.from(VERSALETE).forEach((ch, i) => { if (!/[sx]/.test(ch)) paraComum.set(ch, { c: String.fromCharCode(97 + i), fonte: 'versalete' }) })

// Uma letra (já decomposta, NFD) → { c: letra comum, fonte }.
export function letraComum(ch) {
  return paraComum.get(ch) || { c: ch, fonte: 'comum' }
}

// Escreve um texto comum numa fonte (acentos viram marcas combinadas, como
// nos textos originais: 𝐂̧, ᴀ̃).
export function naFonte(texto, fonte) {
  if (fonte === 'comum' || !fonte) return texto
  return Array.from(String(texto).normalize('NFD')).map((ch) => {
    if (fonte === 'versalete') {
      const i = ch.toLowerCase().charCodeAt(0) - 97
      return ch.length === 1 && i >= 0 && i < 26 ? VERSALETE[i] : ch
    }
    const b = BLOCOS[fonte]
    const code = ch.charCodeAt(0)
    if (ch.length !== 1) return ch
    if (code >= 65 && code <= 90) return fonte === 'italico' && ch === 'H' ? '𝑯' : String.fromCodePoint(b.maiuscula + code - 65)
    if (code >= 97 && code <= 122) return fonte === 'italico' && ch === 'h' ? 'ℎ' : String.fromCodePoint(b.minuscula + code - 97)
    if (code >= 48 && code <= 57 && fonte !== 'italico') return String.fromCodePoint(b.digito + code - 48)
    return ch
  }).join('')
}

// Texto como letra comum (pra ler e comparar).
export function textoComum(texto) {
  // Letra enfeitada primeiro, inteira: o "ǫ" do versalete se desmancharia em
  // o + gancho no NFD.
  return Array.from(String(texto ?? '')).map((ch) => {
    const l = letraComum(ch)
    return l.fonte !== 'comum' ? l.c : Array.from(ch.normalize('NFD')).map((u) => letraComum(u).c).join('')
  }).join('').normalize('NFC')
}
