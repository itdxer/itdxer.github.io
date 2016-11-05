var state;
function fillBackground() {
    canvasBlocks = document.getElementById('canvas').getElementsByTagName('canvas');

    if (canvasBlocks.length > 0) {
        canvasBlocks[0].remove();
    }
    var pattern = Trianglify({
        width: window.innerWidth,
        height: window.innerHeight,
        x_colors: 'PuOr',
        cell_size: 50
    });
    document.getElementById('canvas').appendChild(pattern.canvas());
}
function onWindowResize() {
    clearTimeout(state);
    state = setTimeout(fillBackground, 100);
}

window.addEventListener('resize', fillBackground);
fillBackground();
