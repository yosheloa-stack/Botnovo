export function actionFailure(results) {
if (!Array.isArray(results) || results.length === 0) return null
return results.find((item) => String(item?.status || '').toLowerCase() !== 'ok') || null
}
