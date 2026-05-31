return function(imageUrl, w, h)
    w = w or 64
    h = h or 64
    
    local HttpService = game:GetService("HttpService")
    
    local function safeReq(url, method, headers, body)
        local fn = (syn and syn.request) or (http and http.request) or request or http_request or (fluxus and fluxus.request)
        if not fn then return nil end
        local ok, r = pcall(fn, {Url = url, Method = method or "GET", Headers = headers or {}, Body = body or ""})
        return ok and r or nil
    end
    
    local proxy = "https://api.allorigins.win/raw?url=" .. HttpService:UrlEncode(imageUrl)
    local imgResponse = safeReq(proxy, "GET")
    if not imgResponse then error("Falha ao baixar imagem") end
    local imgData = imgResponse.Body
    
    local palette = {}
    local indices = {}
    local paletteMap = {}
    
    for y = 0, h - 1 do
        for x = 0, w - 1 do
            local pos = (y * w + x) * 4
            local r = string.byte(imgData, pos + 1) or 0
            local g = string.byte(imgData, pos + 2) or 0
            local b = string.byte(imgData, pos + 3) or 0
            
            local key = string.format("%d,%d,%d", r, g, b)
            if not paletteMap[key] then
                paletteMap[key] = #palette
                table.insert(palette, {r, g, b})
            end
            table.insert(indices, paletteMap[key])
        end
    end
    
    local jsonData = HttpService:JSONEncode({
        w = w,
        h = h,
        p = palette,
        i = indices
    })
    
    local hasteResponse = safeReq("https://hastebin.com/documents", "POST", {["Content-Type"] = "application/json"}, jsonData)
    if not hasteResponse then error("Falha ao enviar para hastebin") end
    local hasteData = HttpService:JSONDecode(hasteResponse.Body)
    
    return "https://hastebin.com/raw/" .. hasteData.key
end
