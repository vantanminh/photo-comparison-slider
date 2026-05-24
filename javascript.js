document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.getElementById('imageSlider');
    const sliderInput = sliderContainer.querySelector('.slider-input');
    const cameraView = document.getElementById('cameraView');
    const iphoneView = document.getElementById('iphoneView');
    const thumbButtons = document.querySelectorAll('.select-thumb');

    // HÀM NẠP ẢNH: Đọc data-* từ nút điều hướng và đưa vào Khung Slider
    function loadImagesFromTarget(button) {
        const newCameraSrc = button.getAttribute('data-camera');
        const newIphoneSrc = button.getAttribute('data-iphone');

        // Hiệu ứng mờ nhẹ khi chuyển đổi góc chụp
        cameraView.style.opacity = 0.3;
        iphoneView.style.opacity = 0.3;
        cameraView.style.transition = 'opacity 0.2s ease';
        iphoneView.style.transition = 'opacity 0.2s ease';

        setTimeout(() => {
            cameraView.src = newCameraSrc;
            iphoneView.src = newIphoneSrc;
            
            cameraView.style.opacity = 1;
            iphoneView.style.opacity = 1;
        }, 180);
    }

    // TỰ ĐỘNG CHẠY KHI VỪA MỞ TRANG: Tìm nút active đầu tiên (Góc 1) để nạp ảnh
    const initialActiveButton = document.querySelector('.select-thumb.active');
    if (initialActiveButton) {
        loadImagesFromTarget(initialActiveButton);
    }

    // 1. Lắng nghe sự kiện kéo thanh slider
    sliderInput.addEventListener('input', (e) => {
        sliderContainer.style.setProperty('--slider-pos', `${e.target.value}%`);
    });

    // 2. Lắng nghe sự kiện click trên Thanh điều hướng (Chọn góc chụp)
    thumbButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Nếu bấm vào nút đang chạy rồi thì bỏ qua
            if (button.classList.contains('active')) return;

            // Đổi class active sang nút mới bấm
            document.querySelector('.select-thumb.active').classList.remove('active');
            button.classList.add('active');

            // Gọi hàm đổi ảnh
            loadImagesFromTarget(button);
        });
    });
});