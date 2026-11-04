import { expect, test } from '@playwright/test';

test('表ジャケットが開き、タップで裏面に反転する', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#view-cover')).toBeVisible();
  await expect(page.locator('#cover-img')).toBeVisible();
  await page.locator('#flip').click();
  await expect(page.locator('#flip')).toHaveClass(/flipped/);
  await page.locator('#flip').click();
  await expect(page.locator('#flip')).not.toHaveClass(/flipped/);
});

test('曲目から曲を選ぶと再生画面にその曲と歌詞が出る', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '曲目' }).first().click();
  await expect(page.locator('#view-tracks')).toBeVisible();
  await expect(page.locator('#tracklist .trow')).toHaveCount(11);
  await page.locator('#tracklist .trow').nth(2).click();
  await expect(page.locator('#view-player')).toBeVisible();
  await expect(page.locator('#p-title')).toContainText('銀幕の木曽路');
  await expect(page.locator('body')).toHaveAttribute('data-track', '2');
  const lines = await page.locator('#lyrics-box p').count();
  expect(lines).toBeGreaterThan(10);
});

test('再生と一時停止で表示が切り替わる', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '全曲再生' }).click();
  await expect(page.locator('#view-player')).toBeVisible();
  await expect(page.locator('#play-lb')).toHaveText('一時停止', { timeout: 10_000 });
  await expect(page.locator('body')).toHaveAttribute('data-playing', '1');
  await page.getByRole('button', { name: '再生／一時停止' }).click();
  await expect(page.locator('#play-lb')).toHaveText('再生');
});

test('ブックレットは14ページあり、奥付まで進める', async ({ page }) => {
  await page.goto('/?debug=1');
  await page.getByRole('button', { name: 'ブックレット' }).click();
  await expect(page.locator('#view-booklet')).toBeVisible();
  await expect(page.locator('#pg-ind')).toHaveText('1 / 14');
  await expect(page.locator('#book-page')).toContainText('一夜の映画としての、このアルバム');
  await page.evaluate(() => {
    const api = (window as unknown as { __pwaTest?: { setState?: (patch: Record<string, unknown>) => void } }).__pwaTest;
    api?.setState?.({ page: 13 });
  });
  await expect(page.locator('#pg-ind')).toHaveText('14 / 14');
  await expect(page.locator('#book-page')).toContainText('奥付');
});

test('manifest と Service Worker が使える', async ({ page }) => {
  await page.goto('/');
  const href = await page.locator('link[rel="manifest"]').getAttribute('href');
  expect(href).toBeTruthy();
  const registered = await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    return !!reg.active;
  });
  expect(registered).toBe(true);
});

test('更新バナーは通常は隠れていて、「あとで」で閉じられる', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#update-banner')).toBeHidden();
  await page.evaluate(() => {
    document.getElementById('update-banner')!.hidden = false;
  });
  await page.getByRole('button', { name: 'あとで' }).click();
  await expect(page.locator('#update-banner')).toBeHidden();
});

test('ブックレットの末尾からインストール方法を開ける（使っている端末の説明が開いている）', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'ブックレット' }).click();
  await page.getByRole('button', { name: /インストールする方法/ }).click();
  const dialog = page.locator('#install-dialog');
  await expect(dialog).toBeVisible();
  // Pixel 7 のプロファイルなので Android の説明が開いている
  await expect(dialog.locator('details[data-platform="android"]')).toHaveJSProperty('open', true);
  await expect(dialog.locator('details[data-platform="ios"]')).toHaveJSProperty('open', false);
  await dialog.getByRole('button', { name: 'とじる' }).click();
  await expect(dialog).toBeHidden();
});

test('ブックレットの末尾にバージョンが表示される', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#version')).toHaveText(/^\d+\.\d+\.\d+$/);
});

test('起動できないときは「なおす」ボタンが出て、押すと起動できる（ほかのアプリのキャッシュは消えない）', async ({ page }) => {
  const APP_ID = 'kiso-album';
  await page.addInitScript((id) => {
    (window as unknown as { __bootWaitMs: number }).__bootWaitMs = 500;
    // 1回目の自動修復は済んだことにして、ボタンが出る側の動きを確かめる
    sessionStorage.setItem(`${id}:repaired-at`, String(Date.now()));
  }, APP_ID);
  // 同じサイトにある、ほかのアプリのキャッシュ（なおすときに消えてはいけない）を用意する
  await page.goto('/');
  await page.evaluate(async () => {
    await caches.open('other-app-v1');
  });
  // メインのスクリプトが読み込めない状況を作る
  await page.route('**/assets/*.js', (route) => route.abort());
  await page.goto('/');
  await expect(page.locator('#boot-error')).toBeVisible();

  await page.unroute('**/assets/*.js');
  await page.getByRole('button', { name: 'なおす' }).click();
  await expect(page.locator('#view-cover')).toBeVisible();
  await expect(page.locator('#boot-error')).toBeHidden();
  expect(await page.evaluate(() => caches.has('other-app-v1'))).toBe(true);
});

test('テスト用の入口: ?debug=1 で状態を読めて、場面を作れる', async ({ page }) => {
  await page.goto('/?debug=1');
  const state = await page.evaluate(() => {
    const api = (window as unknown as { __pwaTest?: { getState?: () => unknown } }).__pwaTest;
    return api?.getState?.();
  });
  expect(state).toMatchObject({ view: 'cover', track: -1 });
  await page.evaluate(() => {
    const api = (window as unknown as { __pwaTest?: { setState?: (patch: Record<string, unknown>) => void } }).__pwaTest;
    api?.setState?.({ track: 3 });
  });
  await expect(page.locator('#p-title')).toContainText('ニコラスケイジと木曽と私');
  await expect(page.locator('body')).toHaveAttribute('data-view', 'player');
});

test('テスト用の入口は、?debug=1 でないときは出ない', async ({ page }) => {
  await page.goto('/');
  const exposed = await page.evaluate(() => (window as unknown as { __pwaTest?: unknown }).__pwaTest !== undefined);
  expect(exposed).toBe(false);
});

test('デバッグモード: バージョンを 5 回タップで操作パネルが出る', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'ブックレット' }).click();
  const panel = page.locator('#debug-panel');
  await expect(panel).toBeHidden();
  for (let i = 0; i < 5; i++) await page.locator('#version-line').click();
  await expect(panel).toBeVisible();
  await page.getByRole('button', { name: '表ジャケットへ' }).click();
  await expect(page.locator('body')).toHaveAttribute('data-view', 'cover');
  await page.getByRole('button', { name: 'デバッグモードを終える' }).click();
  await expect(panel).toBeHidden();
});
