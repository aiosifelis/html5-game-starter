function Game(_config) {
    var config = Object.assign(
        {
            screen: document.querySelector('canvas'),
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            background: '#ffffff'
        },
        _config
    )

    var ctx = config.screen.getContext('2d')
    var fullScreen = _config.width === undefined && _config.height === undefined
    var keyState = {}
    var keys = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        SPACE: 32
    }

    var requestAnimationFrame = (function() {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60)
            }
        )
    })()

    ctx.frame = function() {}

    ctx.start = function() {
        requestAnimationFrame(ctx.start)
        var w = fullScreen ? document.documentElement.clientWidth : config.width
        var h = fullScreen
            ? document.documentElement.clientHeight
            : config.width

        fit(w, h)

        ctx.frame()
    }

    ctx.onFrame = function(frame) {
        ctx.frame = frame
    }

    ctx.UP = false
    ctx.DOWN = false
    ctx.LEFT = false
    ctx.RIGHT = false
    ctx.SPACE = false
    ctx.mouseX = 0
    ctx.mouseY = 0
    ctx.mouseDown = false

    ctx.isPressed = function(keyCode) {
        return keyState[keyCode] !== undefined
    }

    document.body.addEventListener('mousedown', function() {
        ctx.mouseDown = true
    })

    document.body.addEventListener('mouseup', function() {
        ctx.mouseDown = false
    })

    document.body.addEventListener('mousemove', function(e) {
        var rect = ctx.canvas.getBoundingClientRect()
        ctx.mouseX = fullScreen ? e.clientX : Math.round(e.clientX - rect.left)
        ctx.mouseY = fullScreen ? e.clientY : Math.round(e.clientY - rect.top)
    })

    document.body.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            case keys.UP:
                ctx.UP = true
                break
            case keys.DOWN:
                ctx.DOWN = true
                break
            case keys.LEFT:
                ctx.LEFT = true
                break
            case keys.RIGHT:
                ctx.RIGHT = true
                break
            case keys.SPACE:
                ctx.SPACE = true
                break
        }

        keyState[e.keyCode] = true
    })

    document.body.addEventListener('keyup', function(e) {
        switch (e.keyCode) {
            case keys.UP:
                ctx.UP = false
                break
            case keys.DOWN:
                ctx.DOWN = false
                break
            case keys.LEFT:
                ctx.LEFT = false
                break
            case keys.RIGHT:
                ctx.RIGHT = false
                break
            case keys.SPACE:
                ctx.SPACE = false
                break
        }
        delete keyState[e.keyCode]
    })

    function fit(w, h) {
        ctx.canvas.width = w
        ctx.canvas.height = h

        ctx.fillStyle = config.background
        ctx.fillRect(0, 0, w, h)
    }

    fit(config.width, config.height)

    return ctx
}
