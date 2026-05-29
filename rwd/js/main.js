$(function(){

    function handleAccordion() {
        if (window.innerWidth >= 1920) {
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.setAttribute('open', '');
            });
        } else {
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.removeAttribute('open');
            });
        }
    }

    handleAccordion();
    window.addEventListener('resize', handleAccordion);

    if (window.innerWidth >= 1920) {
    const chatbotBanner = document.querySelector('.chatbot-banner');
    if (chatbotBanner) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bubbles = document.querySelectorAll('.bubble');
                    const character = document.querySelector('.chatbot-character');

                    // 캐릭터는 바로 등장
                    if (character) {
                        setTimeout(() => {
                            character.classList.add('visible');
                        }, 0);
                    }

                    // 말풍선 차례로 등장
                    bubbles.forEach((bubble, index) => {
                        setTimeout(() => {
                            bubble.classList.add('visible');
                        }, index * 600);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(chatbotBanner);
    }
}

    const CITIES = [
        { code: "GMP", name: "서울 김포",       country: "대한민국", region: "domestic" },
        { code: "ICN", name: "인천",            country: "대한민국", region: "domestic" },
        { code: "CJU", name: "제주",            country: "대한민국", region: "domestic" },
        { code: "PUS", name: "부산 김해",       country: "대한민국", region: "domestic" },
        { code: "KWJ", name: "광주",            country: "대한민국", region: "domestic" },
        { code: "NRT", name: "도쿄 나리타",     country: "일본",     region: "northeast asia" },
        { code: "HND", name: "도쿄 하네다",     country: "일본",     region: "northeast asia" },
        { code: "OSA", name: "오사카",          country: "일본",     region: "northeast asia" },
        { code: "FUK", name: "후쿠오카",        country: "일본",     region: "northeast asia" },
        { code: "AKJ", name: "북해도(훗카이도)",country: "일본",     region: "northeast asia" },
        { code: "OKA", name: "오키나와",        country: "일본",     region: "northeast asia" },
        { code: "CTS", name: "삿포로",          country: "일본",     region: "northeast asia" },
        { code: "PEK", name: "베이징",          country: "중국",     region: "northeast asia" },
        { code: "SHA", name: "상하이",          country: "중국",     region: "northeast asia" },
        { code: "CAN", name: "광저우",          country: "중국",     region: "northeast asia" },
        { code: "CKG", name: "충칭",            country: "중국",     region: "northeast asia" },
        { code: "HKG", name: "홍콩",            country: "홍콩",     region: "northeast asia" },
        { code: "TPE", name: "타이페이",        country: "대만",     region: "northeast asia" },
        { code: "UBN", name: "울란바타르",      country: "몽골",     region: "central asia" },
        { code: "TAS", name: "타슈켄트",        country: "우즈베키스탄", region: "central asia" },
        { code: "ALA", name: "알마티",          country: "카자흐스탄",   region: "central asia" },
        { code: "CNX", name: "치앙마이",        country: "태국",     region: "southeast asia" },
        { code: "BKK", name: "방콕",            country: "태국",     region: "southeast asia" },
        { code: "SIN", name: "싱가포르",        country: "싱가포르", region: "southeast asia" },
        { code: "DAD", name: "다낭",            country: "베트남",   region: "southeast asia" },
        { code: "HAN", name: "하노이",          country: "베트남",   region: "southeast asia" },
        { code: "CGK", name: "자카르타",        country: "인도네시아",region: "southeast asia" },
        { code: "MNL", name: "마닐라",          country: "필리핀",   region: "southeast asia" },
        { code: "CEB", name: "세부",            country: "필리핀",   region: "southeast asia" },
        { code: "BCN", name: "바르셀로나",      country: "스페인",   region: "europe" },
        { code: "BUD", name: "부다페스트",      country: "헝가리",   region: "europe" },
        { code: "IST", name: "이스탄불",        country: "튀르키예", region: "europe" },
        { code: "MXP", name: "밀라노",          country: "이탈리아", region: "europe" },
        { code: "CDG", name: "파리",            country: "프랑스",   region: "europe" },
        { code: "LHR", name: "런던",            country: "영국",     region: "europe" },
        { code: "FRA", name: "프랑크푸르트",    country: "독일",     region: "europe" },
        { code: "FRG", name: "프라하",          country: "체코",     region: "europe" },
        { code: "FCO", name: "로마",            country: "이탈리아", region: "europe" },
        { code: "VIE", name: "비엔나",          country: "오스트리아",region: "europe" },
        { code: "SYD", name: "시드니",          country: "오스트레일리아", region: "oceania" },
        { code: "MEL", name: "멜버른",          country: "오스트레일리아", region: "oceania" },
        { code: "HNL", name: "호놀룰루",        country: "미국",     region: "america" },
        { code: "LAX", name: "로스앤젤레스",    country: "미국",     region: "america" },
        { code: "JFK", name: "뉴욕",            country: "미국",     region: "america" },
        { code: "SFO", name: "샌프란시스코",    country: "미국",     region: "america" },
        { code: "SEA", name: "시애틀",          country: "미국",     region: "america" },
        { code: "YVR", name: "밴쿠버",          country: "캐나다",   region: "america" },
    ];

    var selectedCity   = null;
    var airportCodeDes = null;
    var errorTimeout   = null; // 오류창 타이머 관리용

    (function () {
        var activeRegion   = "all";
        var destBtn        = document.getElementById("destBtn");
        airportCodeDes     = destBtn.querySelector(".airport-code-des");
        var miniDrop       = document.getElementById("miniDrop");
        var miniInput      = document.getElementById("miniInput");
        var miniResults    = document.getElementById("miniResults");
        var allBtn         = document.getElementById("allBtn");
        var destOverlay    = document.getElementById("destOverlay");
        var destCloseBtn   = document.getElementById("destCloseBtn");
        var modalInput     = document.getElementById("modalInput");
        var destRegionTabs = document.getElementById("destRegionTabs");
        var destCityGrid   = document.getElementById("destCityGrid");
        var destConfirmBtn = document.getElementById("destConfirmBtn");

        function filterCities(query, region) {
            var q = query.toLowerCase();
            return CITIES.filter(function (c) {
                var matchRegion = region === "all" || c.region === region;
                var matchQuery  = !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.country.includes(q);
                return matchRegion && matchQuery;
            });
        }

        function applySelection(city) {
            selectedCity = city;
            airportCodeDes.textContent = city.code + " " + city.name;
            airportCodeDes.classList.add("filled");
        }

        function renderMini(query) {
            query = query || "";
            var list = filterCities(query, "all").slice(0, 8);
            miniResults.innerHTML = list.map(function (c) {
                var isSel = selectedCity && selectedCity.code === c.code;
                return '<div class="mini-row' + (isSel ? " sel" : "") + '" data-code="' + c.code + '">'
                    + '<span class="mini-badge">' + c.code + '</span>'
                    + '<div>'
                    +   '<div class="mini-city-name">' + c.name + '</div>'
                    +   '<div class="mini-city-country">' + c.country + '</div>'
                    + '</div>'
                    + '</div>';
            }).join("");

            miniResults.querySelectorAll(".mini-row").forEach(function (row) {
                row.addEventListener("click", function () {
                    var city = CITIES.find(function (c) { return c.code === row.dataset.code; });
                    applySelection(city);
                    hideDestError(); // 도착지 선택하면 오류 즉시 해제
                    closeMini();
                });
            });
        }

        function openMini() {
            miniDrop.classList.add("open");
            destBtn.classList.add("active");
            destBtn.setAttribute("aria-expanded", "true");
            miniInput.value = "";
            miniResults.innerHTML = "";
            hideDestError(); // 드롭다운 열면 오류 해제
            setTimeout(function () { miniInput.focus(); }, 50);
        }

        function closeMini() {
            miniDrop.classList.remove("open");
            destBtn.classList.remove("active");
            destBtn.setAttribute("aria-expanded", "false");
        }

        function renderModal(query, region) {
            query  = query  || "";
            region = region || "all";
            var list = filterCities(query, region);
            destCityGrid.innerHTML = list.map(function (c) {
                var isSel = selectedCity && selectedCity.code === c.code;
                return '<div class="dest-city-row' + (isSel ? " sel" : "") + '" data-code="' + c.code + '">'
                    + '<span class="dest-city-badge">' + c.code + '</span>'
                    + '<div>'
                    +   '<div class="dest-city-name-main">' + c.name + '</div>'
                    +   '<div class="dest-city-country">' + c.country + '</div>'
                    + '</div>'
                    + '</div>';
            }).join("");

            // [추가] 모달이 다시 그려질 때 상단 "어디로 갈까요?" 버튼의 활성화 상태를 강제로 유지
            if (destBtn) {
                destBtn.classList.add('active');
            }

            destCityGrid.querySelectorAll(".dest-city-row").forEach(function (row) {
                row.addEventListener("click", function (e) {
                    // [추가] 이벤트 버블링을 막아 상단 탭 클릭 이벤트(destRegionTabs.onclick)가 오작동하는 것을 원천 차단
                    e.stopPropagation(); 

                    selectedCity = CITIES.find(function (c) { return c.code === row.dataset.code; });
                    
                    // [유지] 도시 선택 시에도 활성화 유지
                    destBtn.classList.add('active');
                    
                    // 다시 렌더링할 때 현재 선택된 'activeRegion'을 명확히 전달합니다.
                    renderModal(modalInput.value, activeRegion);
                });
            });
        }

        function openModal() {
            closeMini();
            destBtn.classList.add('active');
            destOverlay.classList.add("open");
            modalInput.value = "";
            activeRegion = "all";
            destRegionTabs.querySelectorAll(".dest-rtab").forEach(function (t) { t.classList.remove("active"); });
            destRegionTabs.querySelector("[data-r='all']").classList.add("active");
            renderModal("", "all");
            hideDestError(); // 모달 열면 오류 해제
            setTimeout(function () { modalInput.focus(); }, 50);
        }

        function closeModal() {
            destBtn.classList.remove('active');
            destOverlay.classList.remove("open");
        }

        destBtn.addEventListener("click", function () {
            miniDrop.classList.contains("open") ? closeMini() : openMini();
        });

        miniInput.addEventListener("input", function () {
            renderMini(miniInput.value);
        });

        allBtn.addEventListener("click", openModal);
        destCloseBtn.addEventListener("click", closeModal);

        destOverlay.addEventListener("click", function (e) {
            if (e.target === destOverlay) closeModal();
        });

        destConfirmBtn.addEventListener("click", function () {
            if (selectedCity) {
                applySelection(selectedCity);
                if (selectedDeparture) {
                    var formatMD = function(dateStr) {
                        if (!dateStr) return '';
                        var parts = dateStr.split('-');
                        return parts[1] + '.' + parts[2];
                    };
                    var dateText = formatMD(selectedDeparture) + (selectedReturn ? ' - ' + formatMD(selectedReturn) : '');
                    airportCodeDes.textContent = selectedCity.code + " " + selectedCity.name + " " + dateText;
                }
            }
            closeModal();
        });

        modalInput.addEventListener("input", function () {
            renderModal(modalInput.value, activeRegion);
        });

        destRegionTabs.onclick = function (e) {
            var btn = e.target.closest(".dest-rtab");
            if (!btn) return;
            e.preventDefault();
            e.stopPropagation();
            destRegionTabs.querySelectorAll(".dest-rtab").forEach(function (t) {
                t.classList.remove("active");
            });
            btn.classList.add("active");
            activeRegion = btn.dataset.r;
            renderModal(modalInput.value, activeRegion);
            return false;
        };

        document.addEventListener("click", function (e) {
            var destBox = document.querySelector(".destination-box.pc");
            if (destBox && !destBox.contains(e.target)) closeMini();
        });
    })();

    // 오류창 표시/숨김
    var destErrorPop = document.getElementById("destErrorPop");

    function showDestError() {
        airportCodeDes.style.color = '#C51C24';
        destErrorPop.classList.add('show');
        // 기존 타이머 있으면 취소
        if (errorTimeout) clearTimeout(errorTimeout);
        errorTimeout = setTimeout(function() {
            hideDestError();
        }, 3000);
    }

    function hideDestError() {
        if (errorTimeout) {
            clearTimeout(errorTimeout);
            errorTimeout = null;
        }
        destErrorPop.classList.remove('show');
        airportCodeDes.style.color = '';
    }

    // 달력
    var departDate        = document.querySelector(".departdate.pc");
    var calendarDrop      = document.getElementById("calendarDrop");
    var calendarIsOpen    = false;
    var selectedDeparture = null;
    var selectedReturn    = null;
    var currentYear       = new Date().getFullYear();
    var currentMonth      = new Date().getMonth();

    // openCalendar / closeCalendar — 단 한 번만 선언
    function openCalendar() {
        calendarDrop.classList.add('open');
        departDate.classList.add('active');
        calendarIsOpen = true;
        renderCalendar();
    }

    function closeCalendar() {
        calendarDrop.classList.remove('open');
        departDate.classList.remove('active');
        calendarIsOpen = false;
    }

    function renderCalendar() {
        var months = [currentMonth, currentMonth + 1];
        var html = '<div class="cal-header">';
        html += '<button class="cal-nav" id="calPrev" type="button">‹</button>';
        html += '<button class="cal-nav" id="calNext" type="button">›</button>';
        html += '</div><div class="cal-months">';

        months.forEach(function(m) {
            var year        = currentYear + Math.floor(m / 12);
            var month       = ((m % 12) + 12) % 12;
            var firstDay    = new Date(year, month, 1).getDay();
            var daysInMonth = new Date(year, month + 1, 0).getDate();
            var monthNames  = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];

            html += '<div class="cal-month">';
            html += '<div class="cal-month-title">' + year + '년 ' + monthNames[month] + '</div>';
            html += '<div class="cal-grid">';
            html += '<div class="cal-day-label">일</div><div class="cal-day-label">월</div><div class="cal-day-label">화</div><div class="cal-day-label">수</div><div class="cal-day-label">목</div><div class="cal-day-label">금</div><div class="cal-day-label">토</div>';

            for (var i = 0; i < firstDay; i++) {
                html += '<div class="cal-cell empty"></div>';
            }
            for (var d = 1; d <= daysInMonth; d++) {
                var dateStr  = year + '-' + String(month+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
                var cls      = 'cal-cell';
                var today    = new Date();
                var cellDate = new Date(year, month, d);
                if (cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) cls += ' disabled';
                if (selectedDeparture === dateStr) cls += ' selected dep';
                if (selectedReturn    === dateStr) cls += ' selected ret';
                if (selectedDeparture && selectedReturn && dateStr > selectedDeparture && dateStr < selectedReturn) cls += ' in-range';
                html += '<div class="' + cls + '" data-date="' + dateStr + '">' + d + '</div>';
            }
            html += '</div></div>';
        });

        html += '</div>';
        html += '<div class="cal-footer">';
        html += '<div class="cal-selected-info">';
        html += '<span class="cal-dep-info">' + (selectedDeparture ? selectedDeparture.replace(/-/g,'.') : '출발일 선택') + '</span>';
        html += '<span class="cal-arrow">→</span>';
        html += '<span class="cal-ret-info">' + (selectedReturn ? selectedReturn.replace(/-/g,'.') : '귀국일 선택') + '</span>';
        html += '</div>';
        html += '<button class="cal-confirm-btn" id="calConfirm" type="button">선택 완료</button>';
        html += '</div>';

        calendarDrop.innerHTML = html;

        calendarDrop.querySelectorAll('.cal-cell:not(.disabled):not(.empty)').forEach(function(cell) {
            cell.addEventListener('click', function(e) {
                e.stopPropagation();
                var date = cell.dataset.date;
                if (!selectedDeparture || (selectedDeparture && selectedReturn)) {
                    selectedDeparture = date;
                    selectedReturn = null;
                } else if (date < selectedDeparture) {
                    selectedDeparture = date;
                    selectedReturn = null;
                } else {
                    selectedReturn = date;
                }
                renderCalendar();
            });
        });

        document.getElementById('calPrev').addEventListener('click', function(e) {
            e.stopPropagation();
            currentMonth--;
            renderCalendar();
        });
        document.getElementById('calNext').addEventListener('click', function(e) {
            e.stopPropagation();
            currentMonth++;
            renderCalendar();
        });
        document.getElementById('calConfirm').addEventListener('click', function(e) {
            e.stopPropagation();
            if (selectedDeparture) {
                var formatMD = function(dateStr) {
                    if (!dateStr) return '';
                    var parts = dateStr.split('-');
                    return parts[1] + '.' + parts[2];
            };
            departDate.textContent = formatMD(selectedDeparture) + (selectedReturn ? ' - ' + formatMD(selectedReturn) : '');
            departDate.classList.add("filled");
        }
            closeCalendar();

        });
        
    }

    departDate.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!selectedCity) {
            showDestError();
            return;
        }
        calendarIsOpen ? closeCalendar() : openCalendar();
    });

    document.addEventListener('click', function(e) {
        var dg = document.querySelector('.departdategroup');
        if (calendarDrop && dg && !dg.contains(e.target)) {
            closeCalendar();
        }
    });

    // 탑승 인원
    var passengerBox  = document.querySelector(".number.pc");
    var passengerDrop = document.getElementById("passengerDrop");
    var passengers    = { adult: 1, child: 0, infant: 0 };

    function makePaxRow(type, label, sub) {
        return '<div class="pax-row">'
            + '<div><div class="pax-label">' + label + '</div><div class="pax-sub-label">' + sub + '</div></div>'
            + '<div class="pax-counter">'
            + '<button class="pax-btn" type="button" data-type="' + type + '" data-action="minus">−</button>'
            + '<span class="pax-num">' + passengers[type] + '</span>'
            + '<button class="pax-btn" type="button" data-type="' + type + '" data-action="plus">+</button>'
            + '</div></div>';
    }

    function renderPassenger() {
        passengerDrop.innerHTML =
            '<div class="pax-title">탑승 인원</div>'
            + '<p class="pax-sub">예약 가능한 최대 인원은 9명이에요.</p>'
            + makePaxRow('adult',  '성인',  '만 12세 이상')
            + makePaxRow('child',  '소아',  '만 2세 ~ 12세 미만')
            + makePaxRow('infant', '유아',  '만 2세 미만')
            + '<button class="pax-confirm-btn" id="paxConfirm" type="button">선택 완료</button>';

        passengerDrop.querySelectorAll('.pax-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                var type   = btn.dataset.type;
                var action = btn.dataset.action;
                if (action === 'minus') {
                    if (type === 'adult' && passengers[type] <= 1) return;
                    if (passengers[type] <= 0) return;
                    passengers[type]--;
                } else {
                    if (passengers.adult + passengers.child + passengers.infant >= 9) return;
                    passengers[type]++;
                }
                renderPassenger();
            });
        });

        document.getElementById('paxConfirm').addEventListener('click', function(e) {
            e.stopPropagation();
            var total = passengers.adult + passengers.child + passengers.infant;
            passengerBox.textContent = '탑승객 ' + total;
            closePax();
        });
    }

    function openPax() {
        passengerDrop.classList.add('open');
        passengerBox.classList.add('active');
        renderPassenger();
    }
    function closePax() {
        passengerDrop.classList.remove('open');
        passengerBox.classList.remove('active');
    }

    passengerBox.addEventListener('click', function(e) {
        e.stopPropagation();
        passengerDrop.classList.contains('open') ? closePax() : openPax();
    });

    document.addEventListener('click', function(e) {
        if (passengerDrop && !passengerDrop.contains(e.target) && e.target !== passengerBox) {
            closePax();
        }
    });

});


$(document).ready(function () {

  var $dropdown = $('#pc-dropdown');
  var $navItems = $('.pc-nav-item');

  $navItems.on('mouseenter', function () {
    var menu = $(this).data('menu');
    $navItems.removeClass('active');
    $(this).addClass('active');
    $('.dd-panel').hide();
    $('#dd-' + menu).show();
    $dropdown.addClass('open');
  });

  // 로그인/회원가입 영역 hover시 닫힘
  $('.pc-nav-right').on('mouseenter', function () {
    closeDropdown();
  });

  // 로고 hover시 닫힘
  $('.pc-logo').on('mouseenter', function () {
    closeDropdown();
  });

  // 헤더 전체에서 마우스 떠날 때 닫힘
  $('.site-header').on('mouseleave', function () {
    closeDropdown();
  });

  function closeDropdown() {
    $dropdown.removeClass('open');
    $navItems.removeClass('active');
  }

  document.querySelector('.toggle-switch input').addEventListener('change', function() {
    const label = document.querySelector('.label-text');
    if (this.checked) {
        label.style.color = '#000000';
        label.style.fontWeight = '500';
    } else {
        label.style.color = '#444B51';
        label.style.fontWeight = '400';
    }
});

if (window.innerWidth >= 1920) {
    var banner    = document.querySelector('.promo-banner');
    var items     = banner ? banner.querySelectorAll('li') : [];
    var prevBtn   = document.querySelector('.btn-prev');
    var nextBtn   = document.querySelector('.btn-next');
    var indis     = document.querySelectorAll('.banner-indi div');
    var perPage   = 4;
    var total     = items.length;
    var pages     = Math.ceil(total / perPage);
    var current   = 0;

    function goTo(page) {
        if (page < 0) {
            current = pages - 1;
        } else if (page >= pages) {
            current = 0;
        } else {
            current = page;
        }

        var itemWidth = items[0].offsetWidth + 27;
        banner.style.transform = 'translateX(-' + (current * perPage * itemWidth) + 'px)';
        

        indis.forEach(function(d, i) { 
            d.classList.toggle('active', i === current); 
        });


        if (prevBtn && nextBtn) {
            prevBtn.disabled = false;
            nextBtn.disabled = false;
        }
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() { goTo(current - 1); });
        nextBtn.addEventListener('click', function() { goTo(current + 1); });
        indis.forEach(function(d, i) { d.addEventListener('click', function() { goTo(i); }); });
        goTo(0);
    }
}

});