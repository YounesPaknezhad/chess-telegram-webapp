// تلگرام وب‌اپ API
let tg = window.Telegram.WebApp;

// اگر در محیط تلگرام نیستیم، از API استفاده نکنیم
if (tg) {
    tg.ready();
}

let board = null;
let game = new Chess();
let $status = $('#status');

// تابع به روز رسانی وضعیت بازی
let updateStatus = function() {
    let status = '';
    
    let moveColor = 'سفید';
    if (game.turn() === 'b') {
        moveColor = 'سیاه';
    }
    
    // وضعیت حرکت
    if (game.in_checkmate()) {
        status = 'بازی تمام شد، ' + moveColor + ' مات شد.';
    } else if (game.in_draw()) {
        status = 'بازی مساوی شد.';
    } else {
        status = 'نوبت ' + moveColor + ' است.';
        if (game.in_check()) {
            status += ', ' + moveColor + ' کیش است.';
        }
    }
    
    $status.html(status);
};

// تنظیمات صفحه شطرنج
let config = {
    draggable: true,
    position: 'start',
    onDrop: function(source, target) {
        // ایجاد حرکت
        let move = game.move({
            from: source,
            to: target,
            promotion: 'q' // همیشه به وزیر تبدیل شود
        });
        
        // اگر حرکت غیر مجاز بود، آن را برگردان
        if (move === null) return 'snapback';
        
        // وضعیت را به روز کنید
        updateStatus();
    }
};

// ایجاد صفحه شطرنج
board = Chessboard('board', config);
updateStatus();

// دکمه شروع مجدد
$('#startBtn').on('click', function() {
    game.reset();
    board.start();
    updateStatus();
});
