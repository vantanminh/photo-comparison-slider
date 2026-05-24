document.addEventListener('DOMContentLoaded', () => {
    // 1. Xử lý logic thanh kéo slider
    const sliderContainer = document.getElementById('imageSlider');
    const sliderInput = sliderContainer.querySelector('.slider-input');

    sliderInput.addEventListener('input', (e) => {
        sliderContainer.style.setProperty('--slider-pos', `${e.target.value}%`);
    });

    // 2. Xử lý logic đổi cặp ảnh so sánh
    const thumbButtons = document.querySelectorAll('.select-thumb');
    const cameraView = document.getElementById('cameraView');
    const iphoneView = document.getElementById('iphoneView');

    thumbButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Loại bỏ class active cũ, gán cho thumb vừa click
            document.querySelector('.select-thumb.active').classList.remove('active');
            button.classList.add('active');

            // Lấy đường dẫn ảnh từ thuộc tính data-*
            const newCameraSrc = button.getAttribute('data-camera');
            const newIphoneSrc = button.getAttribute('data-iphone');

            // Tạo hiệu ứng chuyển ảnh mượt mà bằng cách giảm opacity tạm thời
            cameraView.style.opacity = 0.3;
            iphoneView.style.opacity = 0.3;
            cameraView.style.transition = 'opacity 0.2s ease';
            iphoneView.style.transition = 'opacity 0.2s ease';

            setTimeout(() => {
                // Thay đổi nguồn ảnh thực tế
                cameraView.src = newCameraSrc;
                iphoneView.src = newIphoneSrc;
                
                // Trả lại độ sáng bừng lên sau khi ảnh đã tải xong
                cameraView.style.opacity = 1;
                iphoneView.style.opacity = 1;
            }, 200);
        });
    });
});