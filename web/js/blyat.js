var bs = {};

bs.width = $(document).width();
bs.height = $(document).height();

bs.ratio = Math.ceil(bs.width / bs.xTiles);

bs.xTiles = 10;
bs.yTiles = 10;

bs.init = function() {
    for (var y = 0; y < this.yTiles; y++) {
        $('#game').append('<div class="row" id="row-' + y + '">');
        
        for (var x = 0; x < this.xTiles; x++) {
            $('#row-' + y).append('<div class="tile" id="tile-' + y + '-' + x + '">');
        };
    };
};

$(document).ready(function() {
    bs.init();
});