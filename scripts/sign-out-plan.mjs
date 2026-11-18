
export async function runPreSignInSignOut({ livePreview, hasBearer, requestSignOut, clearToken }) {
  if (!hasBearer && !livePreview) {
    try { await requestSignOut(); } catch {}
    return;
  }
  try {
    await Promise.race([
      requestSignOut(),
      new Promise((resolve) => setTimeout(resolve, livePreview ? 1500 : 5000)),
    ]);
  } catch {}
  clearToken();
}

export async function runSignOut({ livePreview, hasBearer, requestSignOut, clearToken, redirect }) {
  if (livePreview) {
    try { await requestSignOut(); } catch {}
    clearToken();
    redirect();
    return;
  }
  if (!hasBearer) {
    await requestSignOut();
    clearToken();
    redirect();
    return;
  }
  await requestSignOut();
  clearToken();
  redirect();
}
