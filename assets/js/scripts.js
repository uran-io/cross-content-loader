(function () {

    var $loader = document.querySelector('script[cross-content-script]');
    if (!$loader) {

        console.warn('(╯°□°）╯︵ ┻━┻ Loader script tag not found');
        return;

    }

    var $container = document.querySelector($loader.getAttribute('data-selector'));
    if (!$container) {

        console.warn('(⊙.☉) Container not found. This is not a panasonic product');
        return;

    }
    var code = $container.getAttribute('data-source');
    var token = $loader.getAttribute('data-token');
    var endpoint = `https://uran.io/panasonic/service/getRequest/${token}/${code}`;

    fetch(endpoint).then((response) => {

        if (response.ok) {

            try {

                return response.json();

            } catch (e) {

                throw e;

            }

        }

    }).then((data) => {

        if (data.codigo != 200) {

            console.warn('¯\\_(ツ)_/¯ Product not found')
            return;

        }

        var host = `${window.location.protocol}//${window.location.host}`;
        var urlEmbed = data.datos[0].url;

        $container.innerHTML = `<iframe src="${urlEmbed}#${host}" width="100%" height="0" frameborder="0"></iframe>`;

        window.addEventListener('message', (event) => {

            if (urlEmbed.indexOf(event.origin) !== -1) {

                $container.querySelector(`iframe[src="${urlEmbed}#${host}"]`).height = event.data.height;

            }

        });

    }).catch((e) => {

        console.error(e);

    });

})()
