return function(imageUrl, w, h)
    w = w or 64
    h = h or 64
    
    local HttpService = game:GetService("HttpService")
    
    local function request(url)
        local fn = (syn and syn.request) or (http and http.request) or request or http_request
        local resp = fn({Url = url, Method = "GET"})
        return resp.Body
    end
    
    local siteUrl = "https://biel99lol.github.io/pixel/Index.html?url=" .. HttpService:UrlEncode(imageUrl) .. "&w=" .. w .. "&h=" .. h
    
    local html = request(siteUrl)
    
    local hasteLink = nil
    for link in string.gmatch(html, "https://hastebin%.com/raw/%w+") do
        hasteLink = link
        break
    end
    
    if not hasteLink then
        error("Link nao encontrado")
    end
    
    return hasteLink
end
