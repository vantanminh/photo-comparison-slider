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
    // --- TÍNH NĂNG XEM ẢNH PHÓNG TO (LIGHTBOX) ---
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Hàm mở khung nhìn lớn
    function openLightbox(src, captionText) {
        lightboxImg.src = src;
        lightboxCaption.textContent = captionText || "Visual Studio Showcase";
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // Khóa cuộn trang nền để trải nghiệm tốt hơn
    }

    // Hàm đóng khung nhìn lớn
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = ''; // Mở lại cuộn trang
        // Xóa src sau khi hiệu ứng ẩn hoàn tất để tránh bị giật hình ảnh cũ ở lần bấm sau
        setTimeout(() => { lightboxImg.src = ''; }, 300); 
    }

    // Lắng nghe sự kiện click trên toàn trang (Event Delegation)
    document.addEventListener('click', (e) => {
        // Chỉ xử lý nếu click trúng thẻ IMG nằm trong bộ sưu tập (gallery) hoặc thanh trượt so sánh (slider)
        if (e.target.tagName === 'IMG' && (e.target.closest('.gallery-item') || e.target.closest('.img-wrapper'))) {
            
            let captionText = e.target.alt;
            
            // Nếu là ảnh trong thư viện, lấy text từ thẻ thông tin .item-info
            const itemInfo = e.target.closest('.gallery-item')?.querySelector('.item-info');
            // Nếu là ảnh trong slider, lấy nhãn định danh (iPhone / Camera)
            const labelInfo = e.target.closest('.img-wrapper')?.querySelector('.label');
            
            if (itemInfo) {
                captionText = itemInfo.textContent;
            } else if (labelInfo) {
                captionText = `Chế độ so sánh: Ảnh từ ${labelInfo.textContent}`;
            }

            openLightbox(e.target.src, captionText);
        }
    });

    // Đóng khi click vào nút X hoặc click ra ngoài vùng ảnh (vùng nền đen mờ)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxClose) {
            closeLightbox();
        }
    });

    // Đóng nhanh bằng phím ESC (Escape) trên bàn phím cho chuyên nghiệp
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
});
