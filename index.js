function calculateMonthlyAnnuity() {
    // Tampilkan progress bar
    document.querySelector('.progress-container').style.display = 'block';

    // Ambil nilai dari input pengguna
    let principal = parseFloat(document.getElementById('principal').value);
    let annualRate = parseFloat(document.getElementById('annualRate').value);
    let month = parseInt(document.getElementById('month').value);

    // Konversi suku bunga tahunan ke suku bunga bulanan
    let monthlyRate = (annualRate / 100) ;
    // Total jumlah pembayaran (dalam bulan)
    let totalPayments = month;

    // Rumus Anuitas Bulanan
    let annuityFactor = (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    let monthlyAnnuity = principal * annuityFactor;

    animateProgressBar(0, 100, 1500);
    animateNumbers(0, monthlyAnnuity, 1500);
   
}
function formatNumber(number) {
    // Format angka dengan pemisah ribuan
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function animateNumbers(start, end, duration) {
    const element = document.getElementById("monthlyAnnuity");
    const range = end - start;
    let current = start;
    const increment = range / (duration / 16); // Menghitung increment untuk setiap frame (dengan 16ms per frame)

    function updateNumber() {
        current += increment;
        element.textContent = formatNumber(current.toFixed(0)); // Mengupdate nilai yang ditampilkan dengan pemisahan ribuan

        if (current < end) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = formatNumber(end.toFixed(0)); // Pastikan angka berakhir tepat pada nilai akhir
        }
    }

    requestAnimationFrame(updateNumber);
}

function animateProgressBar(start, end, duration) {
    const progressBar = document.querySelector('.progress-bar');
    let progress = start;
    const interval = 16; // Interval update dalam ms
    const steps = duration / interval;
    const increment = (end - start) / steps;

    function updateProgress() {
        progress += increment;
        progressBar.style.width = progress + '%'; // Perbarui lebar progress bar

        if (progress < end) {
            requestAnimationFrame(updateProgress);
        } else {
            progressBar.style.width = end + '%'; // Pastikan progress bar berakhir tepat pada 100%
        }
    }

    requestAnimationFrame(updateProgress);
}



  
function resetForm() {
    document.getElementById("principal").value = '';
    document.getElementById("annualRate").value = '';
    document.getElementById("month").value = '';
    document.getElementById("monthlyAnnuity").textContent = '0';
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

