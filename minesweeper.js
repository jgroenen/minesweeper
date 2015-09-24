(function ( ) {
    function Board(options) {
        options = options || {};
        var size = options.size || 10;
        var board;
        
        function load() {
            var i, j;
            board = [];
            for (i = 0; i < size; ++i) {
                board[i] = [];
                for (j = 0; j < size; ++j) {
                    board[i].push(Math.random() < 0.5 ? 0 : 1);
                }
            }
        }
        
        function next() {
            var n, i, j, i_, j_, temp;
            for (n = 0; n < size; ++n) {
                i = Math.floor(size * Math.random());
                j = Math.floor(size * Math.random());
                i_ = ((i + ((Math.random() % 2) ? -1 : 1)) + size) % size;
                j_ = ((j + ((Math.random() % 2) ? -1 : 1)) + size) % size;
                temp = board[i][j];
                board[i][j] = board[i_][j_];
                board[i_][j_] = temp;
            }
        }
        
        function print(id) {
            var boardEl = document.createElement('div');
            boardEl.className = 'board';
            board.forEach(function (row) {
                var rowEl = document.createElement('div');
                rowEl.className = 'row';
                row.forEach(function (cell) {
                    var cellEl = document.createElement('div');
                    cellEl.className = 'cell' + (cell ? ' black' : '');
                    rowEl.appendChild(cellEl);
                });
                boardEl.appendChild(rowEl);
            });
            document.getElementById(id).innerHTML = boardEl.innerHTML;
            delete boardEl;
        }
        
        return {
            load: load,
            next: next,
            print: print
        }
    }
    
    var board = new Board();
    board.load();
    setInterval(function () {
        board.print('board');
        board.next();
    }, 1000);
})();