-- api.lua - Retorna link do Hastebin igual ao site
return function(imageUrl, w, h)
    w = w or 64
    h = h or 64
    
    local HttpService = game:GetService("HttpService")
    
    local proxy = "https://api.allorigins.win/raw?url=" .. HttpService:UrlEncode(imageUrl)
    
    local imgResponse = http.request({
        Url = proxy,
        Method = "GET"
    })
    
    local imgData = imgResponse.Body
    
    local palette = {}
    local indices = {}
    local paletteMap = {}
    
    local bytes = {string.byte(imgData, 1, #imgData)}
    
    for y = 0, h - 1 do
        for x = 0, w - 1 do
            local pos = (y * w + x) * 4 + 1
            local r = bytes[pos] or 0
            local g = bytes[pos + 1] or 0
            local b = bytes[pos + 2] or 0
            local a = bytes[pos + 3] or 255
            
            if a > 0 then
                local key = string.format("%d,%d,%d", r, g, b)
                if not paletteMap[key] then
                    paletteMap[key] = #palette + 1
                    palette[#palette + 1] = {r, g, b}
                end
                indices[#indices + 1] = paletteMap[key] - 1
            else
                indices[#indices + 1] = -1
            end
        end
    end
    
    local jsonData = HttpService:JSONEncode({
        w = w,
        h = h,
        p = palette,
        i = indices
    })
    
    local hasteResponse = http.request({
        Url = "https://hastebin.com/documents",
        Method = "POST",
        Body = jsonData
    })
    
    local hasteData = HttpService:JSONDecode(hasteResponse.Body)
    local hasteLink = "https://hastebin.com/raw/" .. hasteData.key
    
    return hasteLink
end
