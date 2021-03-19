(function () {

    var $loader = document.querySelector('script[cross-content-script]');
    if (!$loader) {

        console.warn('Loader script tag not found');
        return;

    }

    var $container = document.querySelector($loader.getAttribute('data-selector'));
    if (!$container) {

        console.warn('Container not found. This is not a panasonic product');
        return;

    }
    var code = $container.getAttribute('data-source');
    var token = $loader.getAttribute('data-token');
    var endpoint = 'http://pricelinkonline.com/dealers/service.php';

    var url = new URL(endpoint),
        params = {code, token};

    Object.keys(params).forEach(function (key) {

        url.searchParams.append(key, params[key]);

    });

    fetch(url).then((response) => {

        if (response.ok) {

            try {

                return response.json();

            } catch (e) {

                throw e;

            }

        }

    }).then((data) => {

        var host = `${window.location.protocol}//${window.location.host}`;

        $container.innerHTML = `<iframe src="${data.response}#${host}" width="100%" height="0" frameborder="0"></iframe>`;

        window.addEventListener('message', (event) => {

            if (data.response.indexOf(event.origin) !== -1) {

                $container.querySelector(`iframe[src="${data.response}"]`).height = event.data.height;

            }

        });

    }).catch((e) => {

        console.error(e);

    });

})()
