const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/**
 * Hàm tải template
 *
 * Cách dùng:
 * <div id="parent"></div>
 * <script>
 *  load("#parent", "./path-to-template.html");
 * </script>
 */
function load(selector, path) {
    const cached = localStorage.getItem(path);
    if (cached) {
        $(selector).innerHTML = cached;
    }

    fetch(path)
        .then((res) => res.text())
        .then((html) => {
            if (html !== cached) {
                $(selector).innerHTML = html;
                localStorage.setItem(path, html);
            }
        })
        .finally(() => {
            window.dispatchEvent(new Event("template-loaded"));
        });
}

//
window.addEventListener("template-loaded", () => {
    //home menu
    const tabsSelector = "home-menu__tab-item";
    const contentsSelector = "home-menu__tab-content";

    const tabActive = `${tabsSelector}-active`;
    const contentActive = `${contentsSelector}-active`;

    const tabContainers = $$(".js-tabs");
    tabContainers.forEach((tabContainer) => {
        const tabs = tabContainer.querySelectorAll(`.${tabsSelector}`);
        const contents = tabContainer.querySelectorAll(`.${contentsSelector}`);
        tabs.forEach((tab, index) => {
            tab.onclick = () => {
                tabContainer.querySelector(`.${tabActive}`)?.classList.remove(tabActive);
                tabContainer.querySelector(`.${contentActive}`)?.classList.remove(contentActive);
                tab.classList.add(tabActive);
                contents[index].classList.add(contentActive);
            };
        });
    });

    // product comment
    const tabsSelector1 = "product-sub__item";
    const contentsSelector1 = "product-sub__content";

    const tabActive1 = `${tabsSelector1}-active`;
    const contentActive1 = `${contentsSelector1}-active`;

    const tabContainers1 = $$(".js-tabs");
    tabContainers1.forEach((tabContainer1) => {
        const tabs1 = tabContainer1.querySelectorAll(`.${tabsSelector1}`);
        const contents1 = tabContainer1.querySelectorAll(`.${contentsSelector1}`);
        tabs1.forEach((tab, index) => {
            tab.onclick = () => {
                tabContainer1.querySelector(`.${tabActive1}`)?.classList.remove(tabActive1);
                tabContainer1.querySelector(`.${contentActive1}`)?.classList.remove(contentActive1);
                tab.classList.add(tabActive1);
                contents1[index].classList.add(contentActive1);
            };
        });
    });
});

/**
 * JS toggle
 *
 * Cách dùng:
 * <button class="js-toggle" toggle-target="#box">Click</button>
 * <div id="box">Content show/hide</div>
 */
window.addEventListener("template-loaded", initJsToggle);

function initJsToggle() {
    $$(".js-toggle").forEach((button) => {
        const target = button.getAttribute("toggle-target");
        if (!target) {
            document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
        }
        button.onclick = (e) => {
            e.preventDefault();
            if (!$(target)) {
                return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
            }
            const isHidden = $(target).classList.contains("hide");

            requestAnimationFrame(() => {
                $(target).classList.toggle("hide", !isHidden);
                $(target).classList.toggle("show", isHidden);
            });
        };
        document.onclick = function (e) {
            if (!e.target.closest(target)) {
                const isHidden = $(target).classList.contains("hide");
                if (!isHidden) {
                    button.click();
                }
            }
        };
    });
}

window.addEventListener("template-loaded", () => {
    const links = $$(".js-dropdown-list > li > a");

    links.forEach((link) => {
        link.onclick = () => {
            if (window.innerWidth > 991) return;
            const item = link.closest("li");
            item.classList.toggle("navbar__item--active");
        };
    });
});
