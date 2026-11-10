jQuery.fx.off = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

$(function () {

    $('.dropdown')
        .on('mouseenter', function () {
            $(this).find('.dropdown-menu').stop(true, true).slideDown(200);
        })
        .on('mouseleave', function () {
            $(this).find('.dropdown-menu').stop(true, true).slideUp(200);
        });

    let tabAktif = $('.tab.active').data('target');
    let sedangGeser = false;

    function bukaTab(target) {
        if (sedangGeser) return;

        $('.tab').removeClass('active')
            .filter('[data-target="' + target + '"]').addClass('active');
        if (target === tabAktif) return;

        const $semua = $('.tab-panel');
        const $lama = $(tabAktif);
        const $baru = $(target);
        const arah = $semua.index($baru) > $semua.index($lama) ? 1 : -1;
        const jarak = 80;

        tabAktif = target;
        sedangGeser = true;

        $lama.animate({ left: (-arah * jarak) + 'px', opacity: 0 }, 200, function () {
            $lama.hide().css({ left: 0, opacity: 1 });

            $baru.css({ left: (arah * jarak) + 'px', opacity: 0 })
                .show()
                .animate({ left: 0, opacity: 1 }, 300, function () {
                    sedangGeser = false;
                });
        });
    }

    $('.tab-panel').hide().first().show();

    $('.tab').on('click', function () {
        bukaTab($(this).data('target'));
    });

    $('.dropdown-menu a').on('click', function () {
        bukaTab($(this).data('tab'));
    });

    $('.card')
        .on('mouseenter', function () {
            $(this).stop().animate({ top: '-8px' }, 150);
        })
        .on('mouseleave', function () {
            $(this).stop().animate({ top: '0px' }, 150);
        });

    $('#btnInfo').on('click', function () {
        const $btn = $(this);
        $('#tipsBox').stop(true, true).slideToggle(300, function () {
            $btn.text($(this).is(':visible') ? 'Sembunyikan Tips Perawatan' : 'Tampilkan Tips Perawatan');
        });
    });

    $('#heroJudul, #heroTeks, .btn-hero').hide();
    $('#heroJudul').fadeIn(600, function () {
        $('#heroTeks').fadeIn(500, function () {
            $('.btn-hero').fadeIn(400);
        });
    });

    const $btnTop = $('#backToTop');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $btnTop.fadeIn(200);
        } else {
            $btnTop.fadeOut(200);
        }
    });
    $btnTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    $('a[href^="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (href.length < 2) return;
        const $tujuan = $(href);
        if ($tujuan.length === 0) return;
        e.preventDefault();
        $('html, body').stop().animate({ scrollTop: $tujuan.offset().top - 60 }, 500);
    });

    function tampilkanToast(pesan, tipe) {
        $('#toast')
            .stop(true, true)
            .removeClass('success error')
            .addClass(tipe)
            .text(pesan)
            .fadeIn(250)
            .delay(2500)
            .fadeOut(400);
    }

    $.validator.addMethod('nomorHp', function (value, element) {
        return this.optional(element) || /^[0-9]{10,12}$/.test(value);
    }, 'Nomor HP harus 10-12 digit angka');

    $.validator.addMethod('hurufAngka', function (value, element) {
        return this.optional(element) || (/[A-Za-z]/.test(value) && /[0-9]/.test(value));
    }, 'Password harus mengandung huruf dan angka');

    const validator = $('#formMember').validate({
        rules: {
            nama:       { required: true, minlength: 3 },
            email:      { required: true, email: true },
            hp:         { required: true, nomorHp: true },
            kota:       { required: true },
            usia:       { required: true, digits: true, min: 17 },
            password:   { required: true, minlength: 8, hurufAngka: true },
            konfirmasi: { required: true, equalTo: '#mPassword' },
            setuju:     { required: true }
        },
        messages: {
            nama:       { required: 'Nama wajib diisi', minlength: 'Nama minimal 3 karakter' },
            email:      { required: 'Email wajib diisi', email: 'Format email tidak valid' },
            hp:         { required: 'Nomor HP wajib diisi' },
            kota:       { required: 'Silakan pilih kota pengiriman' },
            usia:       { required: 'Usia wajib diisi', digits: 'Usia harus berupa angka', min: 'Usia minimal 17 tahun' },
            password:   { required: 'Password wajib diisi', minlength: 'Password minimal 8 karakter' },
            konfirmasi: { required: 'Konfirmasi password wajib diisi', equalTo: 'Password konfirmasi tidak sama' },
            setuju:     { required: 'Anda harus menyetujui syarat & ketentuan' }
        },
        errorElement: 'div',
        errorClass: 'pesan-error',
        errorPlacement: function (error, element) {
            if (element.attr('type') === 'checkbox') {
                error.appendTo(element.closest('.form-group'));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (el) {
            $(el).addClass('is-error').removeClass('is-valid');
        },
        unhighlight: function (el) {
            $(el).removeClass('is-error').addClass('is-valid');
        },
        submitHandler: function (form) {
            const nama = $('#mNama').val().trim();
            tampilkanToast('Selamat datang, ' + nama + '! Akun member berhasil dibuat.', 'success');
            $('#sukses').stop(true, true).slideDown(300).delay(3000).slideUp(300);
            form.reset();
            validator.resetForm();
            $('#formMember input, #formMember select').removeClass('is-error is-valid');
        },
        invalidHandler: function () {
            tampilkanToast('Periksa kembali data yang Anda isi.', 'error');
        }
    });

});

       