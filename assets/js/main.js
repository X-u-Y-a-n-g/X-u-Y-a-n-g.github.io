// 动画工具
var iUp = (function () {
    var time = 0,
        duration = 150;
    return {
        clean: function() {
            time = 0;
        },
        up: function(element) {
            setTimeout(function () {
                element.classList.add("up");
            }, time);
            time += duration;
        }
    };
})();

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    // 移除预加载类，启动动画
    setTimeout(function() {
        document.body.classList.remove('is-preload');
    }, 100);
    
    // 执行动画
    var iUpElements = document.querySelectorAll(".iUp");
    for (var i = 0; i < iUpElements.length; i++) {
        iUp.up(iUpElements[i]);
    }

    // 头像加载完成显示
    var avatarElement = document.querySelector(".js-avatar");
    if (avatarElement) {
        avatarElement.addEventListener('load', function () {
            avatarElement.classList.add("show");
        });
    }

    // 自动滚动逻辑
    var isAutoScrolling = false;
    var lastScrollTop = 0;
    var scrollTimeout;

    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var windowHeight = window.innerHeight;
        
        // 如果正在自动滚动，或者是由于自动滚动触发的事件，则忽略

        if (isAutoScrolling) {
            return;
        }

        // 向下滚动
        if (scrollTop > lastScrollTop) {
            // 超过30%且未完全滚动到第二屏时触发
            if (scrollTop > windowHeight * 0.3 && scrollTop < windowHeight - 50) {
                isAutoScrolling = true;
                window.scrollTo({
                    top: windowHeight,
                    behavior: 'smooth'
                });
                
                // 设置延时重置标志位，时间需大于滚动动画时间
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                    isAutoScrolling = false;
                    // 更新lastScrollTop防止解开锁后立即触发反向逻辑
                    lastScrollTop = window.pageYOffset; 
                }, 800);
            }
        } 
        // 向上滚动
        else if (scrollTop < lastScrollTop) {
            // 从底部向上滚动，当回到70%位置时自动回顶
            if (scrollTop < windowHeight * 0.7 && scrollTop > 50) {
                isAutoScrolling = true;
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                    isAutoScrolling = false;
                    lastScrollTop = window.pageYOffset;
                }, 800);
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });

    // Menu Toggle Logic for Resume Page
    var menuToggle = document.querySelector('.menu-toggle');
    var navMenu = document.querySelector('.resume-nav .nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止冒泡
            
            // 切换菜单显示/隐藏
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = ''; // 清除内联样式，回归CSS控制
                navMenu.classList.remove('active');
            } else {
                navMenu.style.display = 'flex';
                navMenu.classList.add('active');
            }
        });

        // 点击菜单项后自动收起
        var menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.style.display = '';
                navMenu.classList.remove('active');
            });
        });

        // 点击页面其他地方收起菜单
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.style.display = '';
                navMenu.classList.remove('active');
            }
        });
    }

    // Language toggle
    var translations = {
        zh: {
            menu: '菜单',
            nav_about: '关于',
            nav_publications: '论文',
            nav_scholarships: '奖学金',
            nav_competitions: '竞赛',
            nav_honors: '荣誉奖项',
            nav_projects: '项目',
            nav_educations: '教育经历',
            author_name: '许洋',
            author_bio: '南开大学',
            author_address: '天津，中国',
            author_email: '邮箱',
            about_heading: '关于',
            about_paragraph: '大家好，我叫许洋，目前是南开大学计算机学院本科生。',
            scholarships_heading: '奖学金',
            competitions_heading: '竞赛',
            honors_heading: '荣誉奖项',
            projects_heading: '项目',
            educations_heading: '教育经历',
            home_resume: '简历',
            home_about: '关于',
            label_blog: '博客',
            label_email: '邮箱',
            scholarship_2024: '2024.10: 💰南开大学公能奖学金',
            scholarship_2025: '2025.10: 💰南开大学公能奖学金',
            competition_2025_1: '2025.5: 🏆南开大学火山杯AI应用创新大赛——软件赛道一等奖',
            competition_2025_2: '2025.5: 🏆南开大学校长杯创新创业大赛——三等奖',
            competition_2025_3: '2025.5: 🏆天津市挑战杯天津市大学生课外学术科技作品竞赛——一等奖',
            competition_2025_4: '2025.5: 🏆全国大学生信息安全竞赛——三等奖',
            competition_2025_5: '2025.5: 🏆中国高校计算机大赛-AIGC创新赛——一等奖',
            competition_2025_6: '2025.5: 🏆全国大学生计算机系统能力竞赛-智能计算创新设计赛——三等奖',
            competition_2025_7: '2025.5: 🏆南开大学火山杯AI应用创新大赛',
            competition_2025_7_link: '官网',
            honor_2024: '2024.11: 🎖南开大学三好学生',
            honor_2025: '2025.11: 🎖南开大学三好学生',
            education_nku: '<em>2023.09 -- </em>, <strong><a href=\"https://cc.nankai.edu.cn/\" target=\"_blank\">计算机学院</a>，<a href=\"https://www.nankai.edu.cn/\" target=\"_blank\">南开大学</a></strong>'
        },
        en: {
            menu: 'Menu',
            nav_about: 'About',
            nav_publications: 'Publications',
            nav_scholarships: 'Scholarships',
            nav_competitions: 'Competitions',
            nav_honors: 'Honors & Awards',
            nav_projects: 'Projects',
            nav_educations: 'Education',
            author_name: 'Yang Xu',
            author_bio: 'Nankai University',
            author_address: 'Tianjin, China',
            author_email: 'Email',
            about_heading: 'About',
            about_paragraph: 'Hello, I am Yang Xu, an undergraduate in the College of Computer Science and Technology at Nankai University.',
            scholarships_heading: 'Scholarships',
            competitions_heading: 'Competitions',
            honors_heading: 'Honors & Awards',
            projects_heading: 'Projects',
            educations_heading: 'Education',
            home_resume: 'Resume',
            home_about: 'About',
            label_blog: 'Blog',
            label_email: 'Email',
            scholarship_2024: '2024.10: 💰Scholarship of Public Interests and All-Round Capability, Nankai University',
            scholarship_2025: '2025.10: 💰Scholarship of Public Interests and All-Round Capability, Nankai University',
            competition_2025_1: '2025.5: 🏆Volcano Cup AI Application Innovation Competition, Nankai University (Software Track, First Prize)',
            competition_2025_2: '2025.5: 🏆President\'s Cup Innovation and Entrepreneurship Competition, Nankai University (Third Prize)',
            competition_2025_3: '2025.5: 🏆Challenge Cup Tianjin College Students Extracurricular Academic Science and Technology Works Competition, Tianjin (First Prize)',
            competition_2025_4: '2025.5: 🏆National College Student Information Security Contest, China (Third Prize)',
            competition_2025_5: '2025.5: 🏆China College Computer Contest - AIGC Innovation Competition, China (First Prize)',
            competition_2025_6: '2025.5: 🏆National College Student Computer System Ability Competition - Intelligent Computing Innovation Design Contest, China (Third Prize)',
            competition_2025_7: '2025.5: 🏆Volcano Cup AI Application Innovation Competition, Nankai University',
            competition_2025_7_link: 'Website',
            honor_2024: '2024.11: 🎖Meritorious Student, Nankai University',
            honor_2025: '2025.11: 🎖Meritorious Student, Nankai University',
            education_nku: '<em>2023.09 -- </em>, <strong><a href=\"https://cc.nankai.edu.cn/\" target=\"_blank\">College of Computer Science and Technology</a>, <a href=\"https://www.nankai.edu.cn/\" target=\"_blank\">Nankai University</a></strong>'
        }
    };

    function applyLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        document.body.setAttribute('data-lang', lang);

        var nodes = document.querySelectorAll('[data-i18n]');
        nodes.forEach(function(node) {
            var key = node.getAttribute('data-i18n');
            if (!node.dataset.i18nZh) {
                node.dataset.i18nZh = node.textContent;
            }

            var dict = translations[lang] || {};
            if (dict[key]) {
                node.textContent = dict[key];
            } else if (lang === 'zh') {
                node.textContent = node.dataset.i18nZh;
            }
        });

        var htmlNodes = document.querySelectorAll('[data-i18n-html]');
        htmlNodes.forEach(function(node) {
            var key = node.getAttribute('data-i18n-html');
            if (!node.dataset.i18nHtmlZh) {
                node.dataset.i18nHtmlZh = node.innerHTML;
            }

            var dict = translations[lang] || {};
            if (dict[key]) {
                node.innerHTML = dict[key];
            } else if (lang === 'zh') {
                node.innerHTML = node.dataset.i18nHtmlZh;
            }
        });

        var toggle = document.querySelector('.lang-toggle');
        if (toggle) {
            var label = lang === 'zh' ? toggle.getAttribute('data-label-zh') : toggle.getAttribute('data-label-en');
            toggle.textContent = label;
        }
    }

    var langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        var savedLang = localStorage.getItem('lang');
        var initialLang = savedLang || document.documentElement.getAttribute('lang') || 'zh';
        applyLanguage(initialLang);

        langToggle.addEventListener('click', function() {
            var current = document.documentElement.getAttribute('lang') || 'zh';
            var next = current === 'zh' ? 'en' : 'zh';
            localStorage.setItem('lang', next);
            applyLanguage(next);
        });
    }
});
