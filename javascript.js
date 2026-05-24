document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.getElementById('imageSlider');
    const sliderInput = sliderContainer.querySelector('.slider-input');

    // Lắng nghe sự kiện di chuyển thanh kéo
    sliderInput.addEventListener('input', (e) => {
        const sliderValue = e.target.value;
        
        // Cập nhật giá trị CSS Variable (--slider-pos) trên Container
        sliderContainer.style.setProperty('--slider-pos', `${sliderValue}%`);
    });
});