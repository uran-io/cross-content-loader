(function () {

    const $loader = document.querySelector('script[cross-content-script]');
    if (!$loader) {

        console.warn('(╯°□°）╯︵ ┻━┻ Loader script tag not found');
        return;

    }

    const $container = document.querySelector($loader.getAttribute('data-selector'));
    if (!$container) {

        console.warn('(⊙.☉) Container not found. This is not a panasonic product');
        return;

    }

    if (!$container.getAttribute('data-source')) {

        console.warn('(⊙.☉) Product [data-source] is not set');
        return;

    }

    const code = $container.getAttribute('data-source'),
        token = $loader.getAttribute('data-token'),
        endpoint = `http://pricelinkonline.com/dealers/backoffice/service/getRequest/${token}/${code}`;

    fetch(endpoint).then((response) => {

        if (response.ok) {

            try {

                return response.json();

            } catch (e) {

                throw e;

            }

        }

    }).then((data) => {

        if (data.codigo !== '200') {

            console.warn('¯\\_(ツ)_/¯ Product not found');
            return;

        }

        const host = `${window.location.protocol}//${window.location.host}`,
            urlEmbed = data.datos[0].url.split('#')[0];

        $container.innerHTML = `<iframe src="${urlEmbed}#${host}" width="100%" height="0" style="border: 0;"></iframe>`;

        window.addEventListener('message', (event) => {

            if (urlEmbed.indexOf(event.origin) !== -1) {

                $container.querySelector(`iframe[src="${urlEmbed}#${host}"]`).height = event.data.height;

            }

        });

    }).catch((e) => {

        console.error(e);

    });

})()
