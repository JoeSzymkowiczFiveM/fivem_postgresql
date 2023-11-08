local Await = Citizen.Await

PostgreSQL = {}

function PostgreSQL.query(params)
    local p = promise.new()
    local result = exports.fivem_postgresql:query(params)
    p:resolve(result)
    return Await(p)
end

function PostgreSQL.insert(params)
    local p = promise.new()
    local result = exports.fivem_postgresql:insert(params)
    p:resolve(result)
    return Await(p)
end

function PostgreSQL.delete(params)
    local p = promise.new()
    local result = exports.fivem_postgresql:delete(params)
    p:resolve(result)
    return Await(p)
end

function PostgreSQL.update(params)
    local p = promise.new()
    local result = exports.fivem_postgresql:update(params)
    p:resolve(result)
    return Await(p)
end

function PostgreSQL.ready(cb)
    CreateThread(function()
        while GetResourceState('fivem_postgresql') ~= 'started' do Wait(100) end
        repeat
            Wait(1000)
        until exports.fivem_postgresql:isConnected()
        cb()
    end)
end