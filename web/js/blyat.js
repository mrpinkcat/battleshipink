var bs = {};

bs.width = $(document).width();
bs.height = $(document).height();

bs.ratio;

bs.xTiles = 10;
bs.yTiles = 10;

bs.init = function() {
    bs.ratio = Math.ceil(bs.width / bs.xTiles);
    
    for (var y = 0; y < this.yTiles; y++) {
        $('#game').append('<div class="row" id="row-' + y + '">');
        
        for (var x = 0; x < this.xTiles; x++) {
            $('#row-' + y).append('<div class="tile" id="tile-' + y + '-' + x + '">');
            $('#tile-' + y + '-' + x).css({
                'width': bs.ratio + 'px',
                'height': bs.ratio + 'px',
                'position': 'absolute',
                'top': (y * bs.ratio) + 'px',
                'left': (x * bs.ratio) + 'px'
            });
        }
    }
};

$(document).ready(function() {
    bs.init();
});